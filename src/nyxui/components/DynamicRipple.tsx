"use client"
import type React from "react"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface Drop {
  x: number
  y: number
  radius: number
  maxRadius: number
  speed: number
  opacity: number
  color: string
}

export interface DynamicRippleProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: "blue" | "purple" | "green" | "amber" | "rose" | "custom"
  customColors?: {
    primary: string
    secondary: string
  }
  intensity?: 1 | 2 | 3 | 4 | 5
  speed?: 1 | 2 | 3 | 4 | 5
  reactToCursor?: boolean
  autoAnimate?: boolean
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full"
  gradientOverlay?: boolean
  children: React.ReactNode
}

export function DynamicRipple({
  theme = "blue",
  customColors,
  intensity = 3,
  speed = 3,
  reactToCursor = true,
  autoAnimate = true,
  rounded = "lg",
  gradientOverlay = true,
  className,
  children,
  ...props
}: DynamicRippleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number>(0)
  const dropsRef = useRef<Drop[]>([])

  const themeColors = {
    blue: {
      primary: "rgba(59, 130, 246, 0.7)",
      secondary: "rgba(6, 182, 212, 0.7)",
      overlay: "from-blue-500/10 to-cyan-500/10",
    },
    purple: {
      primary: "rgba(139, 92, 246, 0.7)",
      secondary: "rgba(216, 180, 254, 0.7)",
      overlay: "from-purple-500/10 to-pink-500/10",
    },
    green: {
      primary: "rgba(16, 185, 129, 0.7)",
      secondary: "rgba(110, 231, 183, 0.7)",
      overlay: "from-green-500/10 to-emerald-500/10",
    },
    amber: {
      primary: "rgba(245, 158, 11, 0.7)",
      secondary: "rgba(252, 211, 77, 0.7)",
      overlay: "from-amber-500/10 to-yellow-500/10",
    },
    rose: {
      primary: "rgba(244, 63, 94, 0.7)",
      secondary: "rgba(251, 113, 133, 0.7)",
      overlay: "from-rose-500/10 to-pink-500/10",
    },
    custom: {
      primary: customColors?.primary || "rgba(59, 130, 246, 0.7)",
      secondary: customColors?.secondary || "rgba(6, 182, 212, 0.7)",
      overlay: "from-gray-500/10 to-gray-400/10",
    },
  }

  const currentTheme = themeColors[theme]

  const intensityFactors = {
    1: { size: 0.6, opacity: 0.3, count: 3 },
    2: { size: 0.8, opacity: 0.4, count: 5 },
    3: { size: 1.0, opacity: 0.5, count: 7 },
    4: { size: 1.2, opacity: 0.6, count: 9 },
    5: { size: 1.5, opacity: 0.7, count: 12 },
  }

  const speedFactors = {
    1: 0.5,
    2: 0.75,
    3: 1.0,
    4: 1.25,
    5: 1.5,
  }

  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  }

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const updateDimensions = () => {
      if (!containerRef.current) return

      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })

      if (canvasRef.current) {
        canvasRef.current.width = width
        canvasRef.current.height = height
      }
    }

    updateDimensions()

    const container = containerRef.current
    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !dimensions.width || !dimensions.height) return

    const currentIntensityFactors = intensityFactors[intensity]
    const currentSpeedFactor = speedFactors[speed]

    const createDrop = (x: number, y: number, userInitiated = false) => {
      const maxRadius = Math.min(dimensions.width, dimensions.height) * 0.3 * currentIntensityFactors.size

      return {
        x,
        y,
        radius: 0,
        maxRadius,
        speed: currentSpeedFactor * (userInitiated ? 1.5 : 1),
        opacity: currentIntensityFactors.opacity * (userInitiated ? 1.2 : 1),
        color: Math.random() > 0.5 ? currentTheme.primary : currentTheme.secondary,
      }
    }

    if (autoAnimate) {
      const initialDrops = Array.from({ length: currentIntensityFactors.count }).map(() => {
        const x = Math.random() * dimensions.width
        const y = Math.random() * dimensions.height
        return createDrop(x, y)
      })

      dropsRef.current = initialDrops
    }

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!reactToCursor || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      let clientX, clientY

      if ("touches" in e) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }

      const x = clientX - rect.left
      const y = clientY - rect.top

      dropsRef.current.push(createDrop(x, y, true))

      if (dropsRef.current.length > 20) {
        dropsRef.current = dropsRef.current.slice(-20)
      }
    }

    const container = containerRef.current
    if (reactToCursor && container) {
      container.addEventListener("mousemove", handlePointerMove)
      container.addEventListener("touchmove", handlePointerMove)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handlePointerMove)
        container.removeEventListener("touchmove", handlePointerMove)
      }
    }
  }, [
    dimensions, 
    intensity, 
    speed, 
    reactToCursor, 
    autoAnimate, 
    currentTheme.primary, 
    currentTheme.secondary,
    intensityFactors,
    speedFactors
  ])

  useEffect(() => {
    if (!canvasRef.current || !dimensions.width || !dimensions.height) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const currentIntensityFactors = intensityFactors[intensity]
    const currentSpeedFactor = speedFactors[speed]

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)
      dropsRef.current = dropsRef.current.filter((drop) => {
        drop.radius += drop.speed
        ctx.beginPath()
        ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2)
        ctx.strokeStyle = drop.color
        ctx.lineWidth = 2
        ctx.globalAlpha = Math.max(0, drop.opacity * (1 - drop.radius / drop.maxRadius))
        ctx.stroke()
        return drop.radius < drop.maxRadius
      })

      if (autoAnimate && Math.random() < 0.05 * currentSpeedFactor) {
        const x = Math.random() * dimensions.width
        const y = Math.random() * dimensions.height

        dropsRef.current.push({
          x,
          y,
          radius: 0,
          maxRadius: Math.min(dimensions.width, dimensions.height) * 0.2 * currentIntensityFactors.size,
          speed: currentSpeedFactor,
          opacity: currentIntensityFactors.opacity,
          color: Math.random() > 0.5 ? currentTheme.primary : currentTheme.secondary,
        })
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [
    dimensions, 
    intensity, 
    speed, 
    autoAnimate, 
    currentTheme.primary, 
    currentTheme.secondary,
    intensityFactors,
    speedFactors
  ])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", roundedStyles[rounded], className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      {gradientOverlay && (
        <div
          className={cn("absolute inset-0 bg-gradient-to-br opacity-30 pointer-events-none", currentTheme.overlay)}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}