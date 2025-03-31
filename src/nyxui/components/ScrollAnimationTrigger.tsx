"use client"

import type React from "react"
import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

export interface ScrollAnimationTriggerProps {
  children: ReactNode
  className?: string
  effect?: "fade" | "scale" | "slide" | "color" | "rotate" | "custom"
  threshold?: number
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right"
  once?: boolean
  customProps?: Record<string, any>
  as?: React.ElementType
}

export function ScrollAnimationTrigger({
  children,
  className,
  effect = "fade",
  threshold = 0.1,
  delay = 0,
  duration = 0.5,
  direction = "up",
  once = false,
  customProps = {},
  as = "div",
}: ScrollAnimationTriggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const Component = as

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold },
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, once])

  const getAnimationProps = () => {
    const baseProps = {
      initial: {},
      animate: {},
      transition: { duration, delay, ease: "easeOut" },
    }

    switch (effect) {
      case "fade":
        baseProps.initial = { opacity: 0 }
        baseProps.animate = isInView ? { opacity: 1 } : { opacity: 0 }
        break
      case "scale":
        baseProps.initial = { scale: 0.8, opacity: 0 }
        baseProps.animate = isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
        break
      case "slide":
        const offset = 50
        const directionMap = {
          up: { y: offset },
          down: { y: -offset },
          left: { x: offset },
          right: { x: -offset },
        }
        baseProps.initial = { ...directionMap[direction], opacity: 0 }
        baseProps.animate = isInView ? { x: 0, y: 0, opacity: 1 } : { ...directionMap[direction], opacity: 0 }
        break
      case "color":
        baseProps.initial = { color: "var(--color-muted)" }
        baseProps.animate = isInView ? { color: "var(--color-primary)" } : { color: "var(--color-muted)" }
        break
      case "rotate":
        baseProps.initial = { rotate: direction === "left" ? -10 : 10, opacity: 0 }
        baseProps.animate = isInView
          ? { rotate: 0, opacity: 1 }
          : { rotate: direction === "left" ? -10 : 10, opacity: 0 }
        break
      case "custom":
        return {
          ...baseProps,
          ...customProps,
          animate: isInView ? { ...customProps.animate } : { ...customProps.initial },
        }
      default:
        break
    }

    return baseProps
  }

  return (
    <motion.div ref={ref} className={cn("scroll-animation-trigger", className)} {...getAnimationProps()}>
      {children}
    </motion.div>
  )
}

export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  return { ref, scrollYProgress }
}

export function useScrollColor(scrollYProgress: MotionValue<number>, fromColor: string, toColor: string) {
  return useTransform(scrollYProgress, [0, 1], [fromColor, toColor])
}

export function useScrollSize(scrollYProgress: MotionValue<number>, fromSize: number, toSize: number) {
  return useTransform(scrollYProgress, [0, 1], [fromSize, toSize])
}

export function useScrollRotation(scrollYProgress: MotionValue<number>, fromRotation: number, toRotation: number) {
  return useTransform(scrollYProgress, [0, 1], [fromRotation, toRotation])
}

