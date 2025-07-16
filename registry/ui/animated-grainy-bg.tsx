"use client"
import type React from "react"
import { useRef, useMemo } from "react"
import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

export interface GrainyAnimatedBgProps {
  children?: React.ReactNode
  className?: string
  colors?: string[]
  speed?: number
  grainType?: "film" | "digital" | "vintage" | "plasma" | "scratches" | "paper"
  grainIntensity?: number
  grainSize?: number
  animationType?: "flow" | "mesh" | "waves" | "aurora" | "spiral" | "pulse"
  size?: "sm" | "md" | "lg" | "full" | number
  position?: "fixed" | "absolute" | "relative"
  zIndex?: number
  animate?: boolean
  darkMode?: boolean
  as?: "div" | "section" | "article" | "main" | "aside" | "header" | "footer"
  onClick?: () => void
}

const getSizeStyles = (size: GrainyAnimatedBgProps["size"]): React.CSSProperties => {
  if (typeof size === "number") {
    return { width: `${size}px`, height: `${size}px` }
  }
  const sizeMap = {
    sm: { width: "300px", height: "300px" },
    md: { width: "500px", height: "500px" },
    lg: { width: "800px", height: "800px" },
    full: { width: "100%", height: "100%" }
  } as const

  return sizeMap[size || "full"]
}

const getGrainSVG = (
  type: NonNullable<GrainyAnimatedBgProps["grainType"]>,
  intensity: number,
  size: number,
  darkMode: boolean,
): string => {
  const baseFreq = size / 100
  const opacity = (intensity / 100) * 0.8
  const colorMatrix = darkMode ? "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0" : "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
  const grainConfigs = {
    film: { freq: baseFreq * 0.9, octaves: 6, opacity },
    digital: { freq: baseFreq * 1.3, octaves: 2, opacity: opacity * 1.1 },
    vintage: { freq: baseFreq * 0.6, octaves: 4, opacity: opacity * 0.5 },
    plasma: { freq: baseFreq * 0.25, octaves: 8, opacity: opacity * 0.7 },
    scratches: { freq: baseFreq * 0.08, octaves: 1, opacity: opacity * 1.2 },
    paper: { freq: baseFreq * 0.7, octaves: 5, opacity: opacity * 0.35 },
  } as const
  const config = grainConfigs[type]
  const noiseType = type === "scratches" ? "turbulence" : "fractalNoise"
  return `data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='${type}'%3E%3CfeTurbulence type='${noiseType}' baseFrequency='${config.freq}' numOctaves='${config.octaves}' result='noise'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0'/%3E%3CfeColorMatrix type='matrix' values='${colorMatrix} ${config.opacity}'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23${type})'/%3E%3C/svg%3E`
}

// Enhanced gradient patterns that use ALL colors from the array
const getGradientPattern = (
  pattern: NonNullable<GrainyAnimatedBgProps["animationType"]>,
  colors: string[],
  darkMode = false,
): string => {
  const defaultColor = darkMode ? "#2d1b69" : "#ff6b6b"
  const finalColors = colors.length > 0 ? colors : [defaultColor]
  const baseOpacity = darkMode ? "70" : "60"
  const lightOpacity = darkMode ? "50" : "40"
  const heavyOpacity = darkMode ? "85" : "75"
  const ultraLightOpacity = darkMode ? "30" : "25"
  const getColor = (index: number) => finalColors[index % finalColors.length]

  const gradientPatterns = {
    flow: (): string => {
      const gradients: string[] = []
      finalColors.forEach((color, i) => {
        const angle = (360 / finalColors.length) * i
        const x = 50 + Math.cos(angle * Math.PI / 180) * 30
        const y = 50 + Math.sin(angle * Math.PI / 180) * 30
        gradients.push(`radial-gradient(circle at ${x}% ${y}%, ${color}${baseOpacity} 0%, ${color}20 40%, transparent 70%)`)
      })
      const colorStops = finalColors.map((color, i) =>
        `${color}${lightOpacity} ${(i / Math.max(finalColors.length - 1, 1)) * 100}%`
      ).join(', ')
      gradients.push(`linear-gradient(135deg, ${colorStops})`)
      return gradients.join(', ')
    },

    mesh: (): string => {
      const gradients: string[] = []
      const numNodes = finalColors.length
      const meshPoints: { x: number; y: number; color: string; size: number }[] = []
      // Generate mesh nodes with strategic positioning
      finalColors.forEach((color, i) => {
        const angle = i * 137.508
        const radius = Math.sqrt(i) * 12
        const x = 50 + Math.cos(angle * Math.PI / 180) * radius
        const y = 50 + Math.sin(angle * Math.PI / 180) * radius
        const clampedX = Math.max(10, Math.min(90, x))
        const clampedY = Math.max(10, Math.min(90, y))

        meshPoints.push({
          x: clampedX,
          y: clampedY,
          color,
          size: 120 + (i % 3) * 40
        })
      })

      meshPoints.forEach((point, i) => {
        const { x, y, color, size } = point
        gradients.push(`radial-gradient(circle at ${x}% ${y}%, ${color}${heavyOpacity} 0%, ${color}${baseOpacity} 20%, ${color}${lightOpacity} 40%, ${color}${ultraLightOpacity} 60%, transparent 80%)`)
        gradients.push(`radial-gradient(circle at ${x}% ${y}%, transparent 40%, ${color}${ultraLightOpacity} 45%, ${color}20 60%, transparent 85%)`)
      })

      meshPoints.forEach((point1, i) => {
        meshPoints.forEach((point2, j) => {
          if (i < j) {
            const distance = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2))
            if (distance < 40) {
              const midX = (point1.x + point2.x) / 2
              const midY = (point1.y + point2.y) / 2
              const angle = Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI
              gradients.push(`linear-gradient(${angle}deg, ${point1.color}${ultraLightOpacity} 0%, ${point2.color}${ultraLightOpacity} 50%, transparent 100%)`)
              gradients.push(`radial-gradient(ellipse 150% 50% at ${midX}% ${midY}%, ${point1.color}${ultraLightOpacity} 0%, transparent 70%)`)
            }
          }
        })
      })

      finalColors.forEach((color, i) => {
        const x = 20 + (i * 60 / finalColors.length)
        const y = 80 - (i * 60 / finalColors.length)
        gradients.push(`radial-gradient(ellipse 300% 100% at ${x}% ${y}%, transparent 0%, ${color}${ultraLightOpacity} 30%, transparent 70%)`)
      })

      gradients.push(`repeating-linear-gradient(0deg, transparent 0%, ${finalColors[0]}10 1px, transparent 2px, transparent 20px)`)
      gradients.push(`repeating-linear-gradient(90deg, transparent 0%, ${finalColors[1] || finalColors[0]}10 1px, transparent 2px, transparent 20px)`)
      return gradients.join(', ')
    },

    waves: (): string => {
      const gradients: string[] = []

      finalColors.forEach((color, i) => {
        const waveOffset = (i * 720 / finalColors.length) % 360
        const x = 50 + Math.sin(waveOffset * Math.PI / 180) * 40
        const y = (i / Math.max(finalColors.length - 1, 1)) * 100
        gradients.push(`radial-gradient(ellipse 300% 80% at ${x}% ${y}%, ${color}${heavyOpacity} 0%, ${color}40 30%, transparent 60%)`)
      })

      finalColors.forEach((color, i) => {
        const waveOffset = (i * 540 / finalColors.length) + 90
        const y = 50 + Math.cos(waveOffset * Math.PI / 180) * 35
        const x = (i / Math.max(finalColors.length - 1, 1)) * 100
        gradients.push(`radial-gradient(ellipse 80% 200% at ${x}% ${y}%, ${color}${lightOpacity} 0%, transparent 50%)`)
      })

      return gradients.join(', ')
    },

    aurora: (): string => {
      const gradients: string[] = []
      finalColors.forEach((color, i) => {
        const curtainAngle = 88 + (i * 8 / finalColors.length) - 4
        const intensity = i % 2 === 0 ? heavyOpacity : baseOpacity
        gradients.push(`linear-gradient(${curtainAngle}deg, 
      transparent 0%, 
      ${color}${ultraLightOpacity} 15%, 
      ${color}${lightOpacity} 25%, 
      ${color}${intensity} 40%, 
      ${color}${heavyOpacity} 50%, 
      ${color}${intensity} 60%, 
      ${color}${lightOpacity} 75%, 
      ${color}${ultraLightOpacity} 85%, 
      transparent 100%)`)
        const secondaryAngle = curtainAngle + (i % 2 === 0 ? 3 : -3)
        gradients.push(`linear-gradient(${secondaryAngle}deg, 
      transparent 0%, 
      ${color}${ultraLightOpacity} 20%, 
      ${color}${lightOpacity} 35%, 
      ${color}${baseOpacity} 50%, 
      ${color}${lightOpacity} 65%, 
      ${color}${ultraLightOpacity} 80%, 
      transparent 100%)`)
      })

      finalColors.forEach((color, i) => {
        const waveY = 20 + (i * 60 / finalColors.length)
        const waveIntensity = i % 3 === 0 ? baseOpacity : lightOpacity

        gradients.push(`radial-gradient(ellipse 800% 40% at 50% ${waveY}%, 
      ${color}${waveIntensity} 0%, 
      ${color}${lightOpacity} 15%, 
      ${color}${ultraLightOpacity} 35%, 
      transparent 60%)`)
        gradients.push(`radial-gradient(ellipse 600% 25% at 30% ${waveY + 5}%, 
      ${color}${ultraLightOpacity} 0%, 
      ${color}20 25%, 
      transparent 50%)`)

        gradients.push(`radial-gradient(ellipse 600% 25% at 70% ${waveY - 3}%, 
      ${color}${ultraLightOpacity} 0%, 
      ${color}20 25%, 
      transparent 50%)`)
      })

      finalColors.forEach((color, i) => {
        const coronaX = 25 + (i * 50 / finalColors.length)
        const coronaY = 35 + Math.sin(i * 2.5) * 15
        const nextColor = getColor(i + 1)
        gradients.push(`radial-gradient(ellipse 80% 120% at ${coronaX}% ${coronaY}%, 
      ${color}${heavyOpacity} 0%, 
      ${color}${baseOpacity} 20%, 
      ${color}${lightOpacity} 40%, 
      ${color}${ultraLightOpacity} 60%, 
      transparent 80%)`)

        gradients.push(`radial-gradient(ellipse 150% 200% at ${coronaX}% ${coronaY}%, 
      ${color}${lightOpacity} 0%, 
      ${color}${ultraLightOpacity} 30%, 
      transparent 60%)`)

        gradients.push(`radial-gradient(ellipse 100% 80% at ${coronaX + 15}% ${coronaY + 10}%, 
      ${nextColor}${ultraLightOpacity} 0%, 
      ${nextColor}20 40%, 
      transparent 70%)`)
      })

      const scatterColor1 = getColor(0)
      const scatterColor2 = getColor(Math.floor(finalColors.length / 2))
      const scatterColor3 = getColor(finalColors.length - 1)

      gradients.push(`radial-gradient(ellipse 200% 400% at 50% 0%, 
    ${scatterColor1}${ultraLightOpacity} 0%, 
    ${scatterColor1}20 30%, 
    transparent 70%)`)

      gradients.push(`radial-gradient(ellipse 250% 300% at 20% 100%, 
    ${scatterColor2}${ultraLightOpacity} 0%, 
    ${scatterColor2}15 25%, 
    transparent 60%)`)
      gradients.push(`radial-gradient(ellipse 200% 350% at 80% 100%, 
    ${scatterColor3}${ultraLightOpacity} 0%, 
    ${scatterColor3}15 25%, 
    transparent 60%)`)

      finalColors.forEach((color, i) => {
        for (let j = 0; j < 3; j++) {
          const particleX = 20 + (i * 60 / finalColors.length) + (j * 20)
          const particleY = 30 + Math.sin(i + j) * 20
          const particleSize = 15 + (j * 5)

          gradients.push(`radial-gradient(circle at ${particleX}% ${particleY}%, 
        ${color}${ultraLightOpacity} 0%, 
        ${color}15 ${particleSize}%, 
        transparent ${particleSize + 10}%)`)
        }
      })
      const horizonColor = getColor(1)
      gradients.push(`linear-gradient(0deg, 
    ${horizonColor}${ultraLightOpacity} 0%, 
    ${horizonColor}20 5%, 
    transparent 15%)`)
      gradients.push(`linear-gradient(180deg, 
    ${scatterColor1}${ultraLightOpacity} 0%, 
    ${scatterColor1}15 10%, 
    transparent 25%)`)
      return gradients.join(', ')
    },

    spiral: (): string => {
      const gradients: string[] = []
      // Create spiral pattern using all colors
      finalColors.forEach((color, i) => {
        const spiralAngle = (i * 360 / finalColors.length) + (i * 45)
        const radius = 20 + (i * 15 / finalColors.length)
        const x = 50 + Math.cos(spiralAngle * Math.PI / 180) * radius
        const y = 50 + Math.sin(spiralAngle * Math.PI / 180) * radius
        gradients.push(`radial-gradient(circle at ${x}% ${y}%, ${color}${baseOpacity} 0%, ${color}30 25%, transparent 50%)`)
      })

      // Add counter-spiral
      finalColors.forEach((color, i) => {
        const spiralAngle = -(i * 360 / finalColors.length) + (i * 60)
        const radius = 15 + (i * 10 / finalColors.length)
        const x = 50 + Math.cos(spiralAngle * Math.PI / 180) * radius
        const y = 50 + Math.sin(spiralAngle * Math.PI / 180) * radius
        gradients.push(`radial-gradient(ellipse 80% 120% at ${x}% ${y}%, ${color}${lightOpacity} 0%, transparent 40%)`)
      })

      return gradients.join(', ')
    },

    pulse: (): string => {
      const gradients: string[] = []
      finalColors.forEach((color, i) => {
        const ringRadius = 20 + (i * 60 / finalColors.length)
        gradients.push(`radial-gradient(circle at 50% 50%, transparent ${ringRadius - 10}%, ${color}${baseOpacity} ${ringRadius}%, ${color}30 ${ringRadius + 10}%, transparent ${ringRadius + 20}%)`)
      })

      finalColors.forEach((color, i) => {
        const angle = (i * 360 / finalColors.length)
        const x = 50 + Math.cos(angle * Math.PI / 180) * 20
        const y = 50 + Math.sin(angle * Math.PI / 180) * 20
        gradients.push(`radial-gradient(circle at ${x}% ${y}%, ${color}${lightOpacity} 0%, ${color}20 30%, transparent 60%)`)
      })

      return gradients.join(', ')
    }
  } as const

  return gradientPatterns[pattern]()
}
const defaultColors = {
  light: ["#ff6b6b", "#4ecdc4", "#45b7d1"],
  dark: ["#2d1b69", "#11998e", "#0f3460"],
}

export const AnimatedGrainyBg: React.FC<GrainyAnimatedBgProps> = ({
  children,
  className,
  colors,
  speed = 1,
  grainType = "film",
  grainIntensity = 30,
  grainSize = 80,
  animationType = "mesh",
  size = "full",
  position = "relative",
  zIndex = 0,
  animate = true,
  darkMode = false,
  as = "div",
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const finalColors = colors || defaultColors[darkMode ? "dark" : "light"]
  const gradient = useMemo(
    () => getGradientPattern(animationType, finalColors, darkMode),
    [animationType, finalColors, darkMode],
  )
  const grainSVG = useMemo(
    () => getGrainSVG(grainType, grainIntensity, grainSize, darkMode),
    [grainType, grainIntensity, grainSize, darkMode],
  )

  const variants: Variants = useMemo(() => {
    const baseSpeed = 20 / speed
    const animationConfigs = {
      flow: {
        backgroundPosition: ["0% 0%", "100% 100%", "0% 100%", "100% 0%", "0% 0%"],
        backgroundSize: ["400% 400%", "600% 600%", "400% 400%"],
        duration: baseSpeed,
      },
      mesh: {
        backgroundPosition: ["0% 0%", "30% 70%", "70% 30%", "100% 100%", "70% 30%", "30% 70%", "0% 0%"],
        backgroundSize: ["350% 350%", "450% 450%", "350% 350%", "500% 500%", "350% 350%"],
        duration: baseSpeed * 1.4,
      },
      waves: {
        backgroundPosition: ["0% 0%", "100% 0%", "100% 100%", "0% 100%", "0% 0%"],
        backgroundSize: ["500% 500%", "700% 700%", "500% 500%"],
        duration: baseSpeed * 0.8,
      },
      aurora: {
        backgroundPosition: ["0% 0%", "20% 80%", "80% 20%", "100% 100%", "80% 20%", "20% 80%", "0% 0%"],
        backgroundSize: ["600% 600%", "800% 800%", "600% 600%", "900% 900%", "600% 600%"],
        duration: baseSpeed * 1.8,
      },
      spiral: {
        backgroundPosition: ["50% 50%", "100% 0%", "0% 100%", "100% 100%", "50% 50%"],
        backgroundSize: ["400% 400%", "600% 600%", "400% 400%"],
        duration: baseSpeed * 1.3,
      },
      pulse: {
        backgroundPosition: ["50% 50%", "50% 50%", "50% 50%"],
        backgroundSize: ["300% 300%", "800% 800%", "300% 300%"],
        duration: baseSpeed * 0.6,
      }
    }
    const config = animationConfigs[animationType] || animationConfigs.mesh

    return {
      animate: {
        ...config,
        transition: {
          duration: config.duration,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        },
      },
      static: {
        backgroundPosition: "0% 0%",
        backgroundSize: "400% 400%",
      },
    }
  }, [speed, animationType])

  const grainVariants: Variants = useMemo(
    () => ({
      animate: {
        opacity: [
          grainIntensity / 100,
          (grainIntensity / 100) * 0.7,
          (grainIntensity / 100) * 0.4,
          (grainIntensity / 100) * 0.9,
          grainIntensity / 100,
        ],
        scale: [1, 1.02, 1.05, 1.01, 1],
        rotate: [0, 1, -1, 0.5, 0],
        transition: {
          duration: 12 / speed,
          ease: [0.25, 0.1, 0.25, 1] as const,
          repeat: Number.POSITIVE_INFINITY,
        },
      },
      static: { opacity: grainIntensity / 100, scale: 1, rotate: 0 },
    }),
    [grainIntensity, speed],
  )
  const MotionComponent = motion[as] as any

  return (
    <MotionComponent
      ref={containerRef}
      className={cn("grainy-animated-bg overflow-hidden", className)}
      onClick={onClick}
      style={{
        ...getSizeStyles(size),
        position,
        zIndex,
        backgroundColor: darkMode ? "#0a0a0a" : "#ffffff",
        pointerEvents: "auto",
        isolation: "isolate",
      }}
    >
      {/* Base gradient layer */}
      <motion.div className="absolute inset-0"
        variants={variants}
        animate={animate ? "animate" : "static"}
        style={{
          backgroundImage: gradient,
          backgroundSize: "400% 400%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <motion.div className="absolute inset-0"
        variants={grainVariants}
        animate={animate ? "animate" : "static"}
        style={{
          backgroundImage: `url("${grainSVG}")`,
          backgroundSize: "256px 256px",
          pointerEvents: "none",
          zIndex: 2,
          mixBlendMode: "multiply",
          opacity: grainIntensity / 150,
        }}
      />
      <div className={`relative w-full h-full z-10 ${className}`}
        style={{
          pointerEvents: "auto",
          position: "relative",
        }}
      >
        {children}
      </div>
    </MotionComponent>
  )
}