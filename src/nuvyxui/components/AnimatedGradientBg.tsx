"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface AnimatedGradientBgProps {
  children?: React.ReactNode
  className?: string
  colors?: string[]
  speed?: number
  blur?: number
  pattern?: "radial" | "linear" | "conic" | "mesh" | "noise" | "waves"
  patternIntensity?: number
  interactive?: boolean
  interactiveIntensity?: number
  opacity?: number
  size?: "sm" | "md" | "lg" | "full" | number
  position?: "fixed" | "absolute" | "relative"
  zIndex?: number
  animate?: boolean
  as?: React.ElementType
  onClick?: () => void
}

export function AnimatedGradientBg({
  children,
  className,
  colors = ["#4f46e5", "#ec4899", "#8b5cf6", "#06b6d4"],
  speed = 1,
  blur = 60,
  pattern = "radial",
  patternIntensity = 1,
  interactive = false,
  opacity = 0.8,
  size = "full",
  position = "absolute",
  zIndex = -1,
  animate = true,
  as = "div",
  onClick
}: AnimatedGradientBgProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
  }
  const getSizeStyles = () => {
    if (typeof size === "number") {
      return { width: `${size}px`, height: `${size}px` }
    }
    switch (size) {
      case "sm":
        return { width: "300px", height: "300px" }
      case "md":
        return { width: "500px", height: "500px" }
      case "lg":
        return { width: "800px", height: "800px" }
      case "full":
      default:
        return { width: "100%", height: "100%" }
    }
  }
  
  const getGradientPattern = () => {
    const baseColors = colors.join(", ")
    const adjustedColors = interactive && isHovered ? colors.join(", ") : baseColors
    const focalPoint = dimensions.width && dimensions.height ? `${dimensions.width / 2}px ${dimensions.height / 2}px` : "center"
    switch (pattern) {
      case "radial":
        return `radial-gradient(circle at ${interactive && isHovered ? `${mousePosition.x * 100}% ${mousePosition.y * 100}%` : focalPoint}, ${adjustedColors})`
      case "linear":
        return `linear-gradient(${interactive && isHovered ? `${mousePosition.x * 360}deg` : "45deg"}, ${adjustedColors})`
      case "conic":
        return `conic-gradient(from ${interactive && isHovered ? `${mousePosition.x * 360}deg` : "0deg"} at ${interactive && isHovered ? `${mousePosition.x * 100}% ${mousePosition.y * 100}%` : "center"}, ${adjustedColors})`
      case "mesh":
        return `
          radial-gradient(at 40% 20%, ${colors[0]} 0px, transparent ${100 * patternIntensity}px),
          radial-gradient(at 80% 0%, ${colors[1]} 0px, transparent ${150 * patternIntensity}px),
          radial-gradient(at 0% 50%, ${colors[2]} 0px, transparent ${100 * patternIntensity}px),
          radial-gradient(at 80% 50%, ${colors[3]} 0px, transparent ${150 * patternIntensity}px),
          radial-gradient(at 0% 100%, ${colors[0]} 0px, transparent ${120 * patternIntensity}px),
          radial-gradient(at 80% 100%, ${colors[1]} 0px, transparent ${120 * patternIntensity}px),
          radial-gradient(at 0% 0%, ${colors[2]} 0px, transparent ${100 * patternIntensity}px)
        `
      case "noise":
        return `linear-gradient(45deg, ${adjustedColors})`
      case "waves":
        return `
          linear-gradient(${interactive && isHovered ? `${mousePosition.x * 360}deg` : "45deg"}, ${colors[0]} 0%, transparent 40%),
          linear-gradient(${interactive && isHovered ? `${mousePosition.x * 360 + 60}deg` : "135deg"}, ${colors[1]} 10%, transparent 50%),
          linear-gradient(${interactive && isHovered ? `${mousePosition.x * 360 + 120}deg` : "225deg"}, ${colors[2]} 20%, transparent 60%),
          linear-gradient(${interactive && isHovered ? `${mousePosition.x * 360 + 180}deg` : "315deg"}, ${colors[3]} 30%, transparent 70%)
        `
      default:
        return `radial-gradient(circle at ${focalPoint}, ${adjustedColors})`
    }
  }
  const variants = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        duration: 10 / speed,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    },
    static: {
      backgroundPosition: "0% 0%",
    },
  }
  const Component = (motion[as as keyof typeof motion] || motion.div) as React.ElementType
  return (
    <Component
      ref={containerRef}
      className={cn("animated-gradient-bg overflow-hidden", className)}
      onClick={onClick}
      style={{
        ...getSizeStyles(),
        position,
        zIndex,
        opacity,
        backgroundImage: getGradientPattern(),
        backgroundSize: "200% 200%",
        filter: `blur(${blur}px)`,
      }}
      variants={variants}
      animate={animate ? "animate" : "static"}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {pattern === "noise" && (
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: `${100 * patternIntensity}px ${100 * patternIntensity}px`,
          }}
        />
      )}
      {children}
    </Component>
  )
}
