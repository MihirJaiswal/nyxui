"use client"
import React, { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

export interface PerspectiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  imageClassName?: string
  intensity?: number
  perspective?: number
  shine?: boolean
  shadow?: boolean
  border?: boolean
  borderColor?: string
  borderWidth?: number
  borderRadius?: string | number
  glare?: boolean
  glareOpacity?: number
  glareColor?: string
  glarePosition?: "top" | "center"
  parallax?: boolean
  parallaxItems?: React.ReactNode
  disabled?: boolean
  priority?: boolean
}

export function PerspectiveImage({
  src,
  alt,
  width,
  height,
  className,
  imageClassName,
  intensity = 15,
  perspective = 1000,
  shine = true,
  shadow = true,
  border = false,
  borderColor = "rgba(255, 255, 255, 0.2)",
  borderWidth = 1,
  borderRadius = "0.5rem",
  glare = true,
  glareOpacity = 0.2,
  glareColor = "rgba(255, 255, 255, 0.8)",
  glarePosition = "top",
  parallax = false,
  parallaxItems,
  disabled = false,
  priority = false,
}: PerspectiveImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity])
  const springConfig = { damping: 20, stiffness: 300 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)
  const opacityT = useTransform(mouseX, [-0.5, 0, 0.5], [0, 0.5, 0])
  const opacityY = useTransform(
    mouseY,
    [-0.5, 0, 0.5],
    glarePosition === "top" ? [glareOpacity, 0, 0] : [0, glareOpacity, 0]
  )
  
  useEffect(() => {
    if (!isHovering && !disabled) {
      mouseX.set(0)
      mouseY.set(0)
    }
  }, [isHovering, mouseX, mouseY, disabled])
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const normalizedX = (e.clientX - centerX) / rect.width
    const normalizedY = (e.clientY - centerY) / rect.height

    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn("perspective-image relative inline-block", !disabled && "cursor-pointer", className)}
      style={{
        perspective: `${perspective}px`,
        width: width ? `${width}px` : "auto",
        height: height ? `${height}px` : "auto",
        borderRadius: borderRadius,
        overflow: "hidden",
      }}
      onMouseEnter={() => !disabled && setIsHovering(true)}
      onMouseLeave={() => !disabled && setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX: disabled ? 0 : springRotateX,
          rotateY: disabled ? 0 : springRotateY,
          transformStyle: "preserve-3d",
          borderRadius: borderRadius,
          border: border ? `${borderWidth}px solid ${borderColor}` : "none",
          boxShadow: shadow ? "0 30px 60px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          className={cn("w-full h-full object-cover", imageClassName)}
          style={{ borderRadius: borderRadius }}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
        {shine && !disabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)",
              borderRadius: borderRadius,
              opacity: opacityT,
              mixBlendMode: "overlay",
            }}
          />
        )}
        {glare && !disabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                glarePosition === "top"
                  ? `linear-gradient(to bottom, ${glareColor} 0%, transparent 80%)`
                  : `radial-gradient(circle at 50% 50%, ${glareColor} 0%, transparent 80%)`,
              borderRadius: borderRadius,
              opacity: opacityY,
              mixBlendMode: "overlay",
            }}
          />
        )}
        {parallax && parallaxItems && (
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ borderRadius: borderRadius, transformStyle: "preserve-3d" }}
          >
            {React.Children.map(parallaxItems, (child, index) => {
              if (!React.isValidElement(child)) return null

              const zIndex = (index + 1) * 20
              const element = child as React.ReactElement<{ style?: React.CSSProperties }>
              const mergedStyle: React.CSSProperties = {
                ...element.props.style,
                position: "absolute",
                transform: `translateZ(${zIndex}px)`,
              }
              return React.cloneElement(element, { style: mergedStyle })
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
