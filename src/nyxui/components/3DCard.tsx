"use client"
import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export interface ThreeDCardProps {
  children: React.ReactNode
  className?: string
  depth?: number
  perspective?: number
  rotationIntensity?: number
  glareIntensity?: number
  shadowIntensity?: number
  hoverScale?: number
  borderRadius?: string | number
  backgroundColor?: string
  glareColor?: string
  shadowColor?: string
  disabled?: boolean
  clickable?: boolean
  onClick?: () => void
  width?: string | number
  height?: string | number
  layers?: Array<{
    content: React.ReactNode
    depth: number
    className?: string
  }>
  as?: React.ElementType
}

export function ThreeDCard({
  children,
  className,
  depth = 50,
  perspective = 1000,
  rotationIntensity = 15,
  glareIntensity = 0.2,
  shadowIntensity = 0.8,
  hoverScale = 1.05,
  borderRadius = "1rem",
  backgroundColor = "white",
  glareColor = "rgba(255, 255, 255, 0.8)",
  shadowColor = "rgba(0, 0, 0, 0.2)",
  disabled = false,
  clickable = false,
  onClick,
  width,
  height,
  layers = [],
  as = "div",
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 300 }
  const rotateXInput = useTransform(mouseY, [-0.5, 0.5], [rotationIntensity, -rotationIntensity])
  const rotateYInput = useTransform(mouseX, [-0.5, 0.5], [-rotationIntensity, rotationIntensity])
  const rotateX = useSpring(rotateXInput, springConfig)
  const rotateY = useSpring(rotateYInput, springConfig)

  useEffect(() => {
    if (!isHovered && !disabled) {
      mouseX.set(0)
      mouseY.set(0)
    }
  }, [isHovered, mouseX, mouseY, disabled])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return

    const rect = cardRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const normalizedX = (e.clientX - centerX) / rect.width
      const normalizedY = (e.clientY - centerY) / rect.height

      mouseX.set(normalizedX)
      mouseY.set(normalizedY)
    }
  }

  const handleClick = () => {
    if (clickable && onClick && !disabled) {
      onClick()
    }
  }

  const Component = motion(as) as React.ElementType || motion.div

  return (
    <Component
      ref={cardRef}
      className={cn(
        "three-d-card relative",
        clickable && !disabled && "cursor-pointer",
        disabled && "opacity-70 cursor-not-allowed",
        className,
      )}
      style={{
        perspective: `${perspective}px`,
        width,
        height,
      }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <motion.div
        className="w-full h-full"
        style={{
          rotateX: disabled ? 0 : rotateX,
          rotateY: disabled ? 0 : rotateY,
          transformStyle: "preserve-3d",
          borderRadius,
          backgroundColor,
          boxShadow:
            isHovered && !disabled
              ? `0 ${depth / 2}px ${depth}px ${shadowColor}`
              : `0 ${depth / 4}px ${depth / 2}px ${shadowColor}`,
        }}
        animate={{
          scale: isHovered && !disabled ? hoverScale : 1,
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <div
          className="w-full h-full"
          style={{
            borderRadius,
            overflow: "hidden",
          }}
        >
          {children}
        </div>

        {!disabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(${
                135 + (mouseX.get() || 0) * 30
              }deg, ${glareColor} 0%, rgba(255, 255, 255, 0) 80%)`,
              borderRadius,
              opacity: useTransform(mouseY, [-0.5, 0, 0.5], [0, glareIntensity, 0]),
              mixBlendMode: "overlay",
            }}
          />
        )}

        {layers.map((layer, index) => (
          <motion.div
            key={index}
            className={cn("absolute inset-0 pointer-events-none", layer.className)}
            style={{
              transform: `translateZ(${layer.depth}px)`,
              transformStyle: "preserve-3d",
              borderRadius,
            }}
          >
            {layer.content}
          </motion.div>
        ))}
      </motion.div>
    </Component>
  )
}
