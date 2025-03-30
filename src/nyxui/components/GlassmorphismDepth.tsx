"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export interface GlassmorphismDepthProps extends React.HTMLAttributes<HTMLDivElement> {
  depth?: 1 | 2 | 3 | 4 | 5
  theme?: "light" | "dark" | "blue" | "purple" | "teal"
  tiltEffect?: boolean
  tiltMax?: number
  hoverDepthChange?: boolean
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full"
  shadow?: boolean
  children: React.ReactNode
}

export function GlassmorphismDepth({
  depth = 3,
  theme = "light",
  tiltEffect = true,
  tiltMax = 10,
  hoverDepthChange = true,
  rounded = "lg",
  shadow = true,
  className,
  children,
  ...props
}: GlassmorphismDepthProps) {
  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.1s ease-out",
  })

  const [currentDepth, setCurrentDepth] = useState(depth)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEffect) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateY = ((x - centerX) / centerX) * tiltMax
    const rotateX = -((y - centerY) / centerY) * tiltMax

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 0.1s ease-out",
    })
  }

  const handleMouseEnter = () => {
    if (hoverDepthChange) {
      setCurrentDepth(Math.min(5, depth + 1) as 1 | 2 | 3 | 4 | 5)
    }
  }

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.5s ease-out",
    })

    if (hoverDepthChange) {
      setCurrentDepth(depth)
    }
  }

  const themeClasses = {
    light: "bg-white/30 backdrop-blur-md border-white/40 text-gray-800",
    dark: "bg-black/30 backdrop-blur-md border-white/10 text-white",
    blue: "bg-blue-500/20 backdrop-blur-md border-blue-300/30 text-blue-900 dark:text-blue-100",
    purple: "bg-purple-500/20 backdrop-blur-md border-purple-300/30 text-purple-900 dark:text-purple-100",
    teal: "bg-teal-500/20 backdrop-blur-md border-teal-300/30 text-teal-900 dark:text-teal-100",
  }

  const depthClasses = {
    1: "backdrop-blur-sm border-[0.5px]",
    2: "backdrop-blur-md border-[1px]",
    3: "backdrop-blur-lg border-[1.5px]",
    4: "backdrop-blur-xl border-[2px]",
    5: "backdrop-blur-2xl border-[2.5px]",
  }

  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  }

  return (
    <div
      className={cn(
        "relative p-6 border transition-all duration-300",
        themeClasses[theme],
        depthClasses[currentDepth],
        roundedClasses[rounded],
        shadow && "shadow-lg",
        className,
      )}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      <div
        className={cn("absolute inset-0 -z-10", roundedClasses[rounded])}
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  )
}

