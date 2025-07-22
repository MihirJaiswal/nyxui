"use client"
import type React from "react"
import { useMemo } from "react"
import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

export interface GrainyAnimatedBgProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties 
  colors?: string[]
  speed?: number
  grainType?: "digital" | "plasma" | "scratches" | "paper" | "noise" | "dust"
  grainIntensity?: number
  grainSize?: number
  animationType?: "flow" | "mesh" | "waves" | "aurora" | "spiral" | "pulse"
  size?: "sm" | "md" | "lg" | "full" | number
  position?: "fixed" | "absolute" | "relative"
  zIndex?: number
  animate?: boolean
  darkMode?: boolean
  as?: "div" | "section" | "article" | "main" | "aside" | "header" | "footer"
  grainBlendMode?: "multiply" | "overlay" | "soft-light" | "hard-light" | "screen" | "color-burn" | "normal"
}

const getSizeStyles = (size: GrainyAnimatedBgProps["size"]): React.CSSProperties => {
  if (typeof size === "number") {
    return { width: `${size}px`, height: `${size}px` }
  }
  const sizeMap = {
    sm: { width: "300px", height: "300px" },
    md: { width: "500px", height: "500px" },
    lg: { width: "800px", height: "800px" },
    full: { width: "100%", height: "100%" },
  } as const
  return sizeMap[size || "full"]
}

const getGrainSVG = (
  type: NonNullable<GrainyAnimatedBgProps["grainType"]>,
  intensity: number,
  size: number,
  darkMode: boolean,
): string => {
  const baseFreq = Math.max(0.1, size / 120)
  const opacity = Math.min(0.95, (intensity / 100) * 1.2) 
  const lightMatrix = darkMode
    ? "0 0 0 0 0.9 0 0 0 0 0.9 0 0 0 0 0.9 0 0 0" 
    : "0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.1 0 0 0"

  const grainConfigs = {
    digital: {
      freq: baseFreq * 1.8,
      octaves: 3,
      opacity: opacity * 1.5,
      seed: 5,
      type: "turbulence" as const,
    },
    plasma: {
      freq: baseFreq * 0.15,
      octaves: 12,
      opacity: opacity * 1.1,
      seed: 7,
      type: "turbulence" as const,
    },
    scratches: {
      freq: baseFreq * 0.05,
      octaves: 2,
      opacity: opacity * 1.8,
      seed: 1,
      type: "turbulence" as const,
    },
    paper: {
      freq: baseFreq * 0.6,
      octaves: 7,
      opacity: opacity * 0.7,
      seed: 4,
      type: "fractalNoise" as const,
    },
    noise: {
      freq: baseFreq * 2.2,
      octaves: 4,
      opacity: opacity * 1.4,
      seed: 8,
      type: "turbulence" as const,
    },
    dust: {
      freq: baseFreq * 0.3,
      octaves: 5,
      opacity: opacity * 1.2,
      seed: 6,
      type: "fractalNoise" as const,
    },
  } as const

  const config = grainConfigs[type]
  return `data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='${type}' x='0%25' y='0%25' width='100%25' height='100%25'%3E%3CfeTurbulence type='${config.type}' baseFrequency='${config.freq}' numOctaves='${config.octaves}' seed='${config.seed}' result='noise'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0' result='desaturated'/%3E%3CfeColorMatrix in='desaturated' type='matrix' values='${lightMatrix} ${config.opacity}' result='colored'/%3E%3CfeComposite in='colored' in2='SourceGraphic' operator='multiply' result='grain1'/%3E%3CfeTurbulence type='${config.type === "turbulence" ? "fractalNoise" : "turbulence"}' baseFrequency='${config.freq * 1.5}' numOctaves='${Math.max(1, config.octaves - 2)}' seed='${config.seed + 10}' result='noise2'/%3E%3CfeColorMatrix in='noise2' type='saturate' values='0' result='desaturated2'/%3E%3CfeColorMatrix in='desaturated2' type='matrix' values='${lightMatrix} ${config.opacity * 0.6}' result='colored2'/%3E%3CfeComposite in='grain1' in2='colored2' operator='screen' result='final'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23${type})' fill='%23${darkMode ? "ffffff" : "000000"}'/%3E%3C/svg%3E`
}

const getGradientPattern = (
  pattern: NonNullable<GrainyAnimatedBgProps["animationType"]>,
  colors: string[],
  darkMode = false,
): string => {
  const defaultColors = darkMode
    ? ["#1a1a2e", "#16213e", "#0f3460", "#533483"]
    : ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"]

  const finalColors = colors.length > 0 ? colors : defaultColors
  const baseOpacity = darkMode ? "85" : "75"
  const lightOpacity = darkMode ? "65" : "55"
  const heavyOpacity = darkMode ? "95" : "90"
  const ultraLightOpacity = darkMode ? "45" : "35"
  const gradientPatterns = {
    flow: (): string => {
      const gradients: string[] = []
      finalColors.forEach((color, i) => {
        const angle = (360 / finalColors.length) * i
        const x = 50 + Math.cos((angle * Math.PI) / 180) * 35
        const y = 50 + Math.sin((angle * Math.PI) / 180) * 35
        gradients.push(
          `radial-gradient(circle at ${x}% ${y}%, ${color}${heavyOpacity} 0%, ${color}${baseOpacity} 25%, ${color}${lightOpacity} 50%, transparent 75%)`,
        )
      })
      finalColors.forEach((color, i) => {
        const offset = 180 / finalColors.length
        const angle = (360 / finalColors.length) * i + offset
        const x = 50 + Math.cos((angle * Math.PI) / 180) * 25
        const y = 50 + Math.sin((angle * Math.PI) / 180) * 25
        gradients.push(
          `radial-gradient(ellipse 150% 100% at ${x}% ${y}%, ${color}${lightOpacity} 0%, ${color}${ultraLightOpacity} 40%, transparent 70%)`,
        )
      })

      return gradients.join(", ")
    },

    mesh: (): string => {
      const gradients: string[] = []
      const meshPoints: { x: number; y: number; color: string }[] = []

      // Generate strategic mesh points
      finalColors.forEach((color, i) => {
        const angle = i * 137.508 
        const radius = Math.sqrt(i + 1) * 15
        const x = 50 + Math.cos((angle * Math.PI) / 180) * radius
        const y = 50 + Math.sin((angle * Math.PI) / 180) * radius
        const clampedX = Math.max(15, Math.min(85, x))
        const clampedY = Math.max(15, Math.min(85, y))

        meshPoints.push({ x: clampedX, y: clampedY, color })
      })

      // Primary mesh nodes
      meshPoints.forEach((point, i) => {
        const { x, y, color } = point
        gradients.push(
          `radial-gradient(circle at ${x}% ${y}%, ${color}${heavyOpacity} 0%, ${color}${baseOpacity} 20%, ${color}${lightOpacity} 45%, ${color}${ultraLightOpacity} 65%, transparent 85%)`,
        )
      })
      meshPoints.forEach((point1, i) => {
        meshPoints.forEach((point2, j) => {
          if (i < j) {
            const distance = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2))
            if (distance < 45) {
              const angle = (Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180) / Math.PI
              gradients.push(
                `linear-gradient(${angle}deg, ${point1.color}${ultraLightOpacity} 0%, ${point2.color}${ultraLightOpacity} 100%)`,
              )
            }
          }
        })
      })

      return gradients.join(", ")
    },

    waves: (): string => {
      const gradients: string[] = []
      finalColors.forEach((color, i) => {
        const waveOffset = ((i * 720) / finalColors.length) % 360
        const x = 50 + Math.sin((waveOffset * Math.PI) / 180) * 45
        const y = (i / Math.max(finalColors.length - 1, 1)) * 100
        gradients.push(
          `radial-gradient(ellipse 400% 60% at ${x}% ${y}%, ${color}${heavyOpacity} 0%, ${color}${baseOpacity} 30%, ${color}${lightOpacity} 60%, transparent 80%)`,
        )
      })
      // Vertical waves
      finalColors.forEach((color, i) => {
        const waveOffset = (i * 540) / finalColors.length + 90
        const y = 50 + Math.cos((waveOffset * Math.PI) / 180) * 40
        const x = (i / Math.max(finalColors.length - 1, 1)) * 100
        gradients.push(
          `radial-gradient(ellipse 60% 300% at ${x}% ${y}%, ${color}${baseOpacity} 0%, ${color}${lightOpacity} 35%, transparent 65%)`,
        )
      })

      return gradients.join(", ")
    },

    aurora: (): string => {
      const gradients: string[] = []
      finalColors.forEach((color, i) => {
        const curtainAngle = 88 + (i * 6) / finalColors.length - 3
        const intensity = i % 2 === 0 ? heavyOpacity : baseOpacity

        gradients.push(`linear-gradient(${curtainAngle}deg,
          transparent 0%,
          ${color}${ultraLightOpacity} 10%,
          ${color}${lightOpacity} 20%,
          ${color}${baseOpacity} 35%,
          ${color}${intensity} 50%,
          ${color}${baseOpacity} 65%,
          ${color}${lightOpacity} 80%,
          ${color}${ultraLightOpacity} 90%,
          transparent 100%)`)
      })

      // Aurora waves
      finalColors.forEach((color, i) => {
        const waveY = 15 + (i * 70) / finalColors.length
        gradients.push(`radial-gradient(ellipse 1000% 30% at 50% ${waveY}%,
          ${color}${baseOpacity} 0%,
          ${color}${lightOpacity} 20%,
          ${color}${ultraLightOpacity} 40%,
          transparent 70%)`)
      })
      return gradients.join(", ")
    },

    spiral: (): string => {
      const gradients: string[] = []
      finalColors.forEach((color, i) => {
        const spiralAngle = (i * 360) / finalColors.length + i * 60
        const radius = 15 + (i * 20) / finalColors.length
        const x = 50 + Math.cos((spiralAngle * Math.PI) / 180) * radius
        const y = 50 + Math.sin((spiralAngle * Math.PI) / 180) * radius
        gradients.push(
          `radial-gradient(circle at ${x}% ${y}%, ${color}${heavyOpacity} 0%, ${color}${baseOpacity} 30%, ${color}${lightOpacity} 60%, transparent 80%)`,
        )
      })
      // Counter spiral
      finalColors.forEach((color, i) => {
        const spiralAngle = -((i * 360) / finalColors.length) + i * 45
        const radius = 10 + (i * 15) / finalColors.length
        const x = 50 + Math.cos((spiralAngle * Math.PI) / 180) * radius
        const y = 50 + Math.sin((spiralAngle * Math.PI) / 180) * radius
        gradients.push(
          `radial-gradient(ellipse 120% 80% at ${x}% ${y}%, ${color}${lightOpacity} 0%, ${color}${ultraLightOpacity} 50%, transparent 75%)`,
        )
      })
      return gradients.join(", ")
    },

    pulse: (): string => {
      const gradients: string[] = []
      // Concentric pulses
      finalColors.forEach((color, i) => {
        const ringRadius = 15 + (i * 70) / finalColors.length
        gradients.push(`radial-gradient(circle at 50% 50%, 
          transparent ${ringRadius - 15}%, 
          ${color}${lightOpacity} ${ringRadius - 5}%,
          ${color}${heavyOpacity} ${ringRadius}%, 
          ${color}${baseOpacity} ${ringRadius + 5}%,
          ${color}${lightOpacity} ${ringRadius + 15}%,
          transparent ${ringRadius + 25}%)`)
      })

      // Pulse nodes
      finalColors.forEach((color, i) => {
        const angle = (i * 360) / finalColors.length
        const x = 50 + Math.cos((angle * Math.PI) / 180) * 25
        const y = 50 + Math.sin((angle * Math.PI) / 180) * 25
        gradients.push(
          `radial-gradient(circle at ${x}% ${y}%, ${color}${heavyOpacity} 0%, ${color}${baseOpacity} 25%, ${color}${lightOpacity} 50%, transparent 75%)`,
        )
      })

      return gradients.join(", ")
    },
  } as const
  return gradientPatterns[pattern]()
}

const defaultColors = {
  light: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"],
  dark: ["#1a1a2e", "#16213e", "#0f3460", "#533483"],
}

export const AnimatedGrainyBg: React.FC<GrainyAnimatedBgProps> = ({
  children,
  className,
  style,  
  colors,
  speed = 1,
  grainType = "digital",
  grainIntensity = 60, 
  grainSize = 100, 
  animationType = "mesh",
  size = "full",
  position = "relative",
  zIndex = 0,
  animate = true,
  darkMode = false,
  as = "div",
  grainBlendMode = "soft-light", 
}) => {
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
    const baseSpeed = 25 / speed
    const animationConfigs = {
      flow: {
        backgroundPosition: ["0% 0%", "100% 100%", "0% 100%", "100% 0%", "0% 0%"],
        backgroundSize: ["400% 400%", "600% 600%", "400% 400%"],
        duration: baseSpeed,
      },
      mesh: {
        backgroundPosition: ["0% 0%", "15% 35%", "35% 15%", "50% 50%", "35% 15%", "15% 35%", "0% 0%"], // Reduced movement
        backgroundSize: ["350% 350%", "400% 400%", "350% 350%"], // Less dramatic size changes
        duration: baseSpeed * 1.5,
      },
      waves: {
        backgroundPosition: ["0% 0%", "100% 0%", "100% 100%", "0% 100%", "0% 0%"],
        backgroundSize: ["500% 500%", "700% 700%", "500% 500%"],
        duration: baseSpeed * 0.9,
      },
      aurora: {
        backgroundPosition: ["0% 0%", "20% 80%", "80% 20%", "100% 100%", "80% 20%", "20% 80%", "0% 0%"],
        backgroundSize: ["600% 600%", "900% 900%", "600% 600%"],
        duration: baseSpeed * 2,
      },
      spiral: {
        backgroundPosition: ["50% 50%", "100% 0%", "0% 100%", "100% 100%", "50% 50%"],
        backgroundSize: ["400% 400%", "650% 650%", "400% 400%"],
        duration: baseSpeed * 1.4,
      },
      pulse: {
        backgroundPosition: ["50% 50%", "50% 50%", "50% 50%"],
        backgroundSize: ["300% 300%", "900% 900%", "300% 300%"],
        duration: baseSpeed * 0.7,
      },
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
          (grainIntensity / 100) * 0.8,
          (grainIntensity / 100) * 0.6,
          (grainIntensity / 100) * 0.9,
          grainIntensity / 100,
        ],
        scale: [1, 1.01, 1.02, 1.01, 1], 
        transition: {
          duration: 8 / speed,
          ease: [0.25, 0.1, 0.25, 1] as const,
          repeat: Number.POSITIVE_INFINITY,
        },
      },
      static: { opacity: grainIntensity / 100, scale: 1 },
    }),
    [grainIntensity, speed],
  )

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionComponent = motion[as] as any

  return (
    <MotionComponent
      className={cn("enhanced-grainy-animated-bg overflow-hidden", className)}
      style={{
        ...getSizeStyles(size),
        ...style, 
        position,
        zIndex,
        backgroundColor: darkMode ? "#0a0a0a" : "#ffffff",
        pointerEvents: "auto",
        isolation: "isolate",
      }}
    >
      {/* Base gradient layer */}
      <motion.div
        className="absolute inset-0"
        variants={variants}
        animate={animate ? "animate" : "static"}
        style={{
          backgroundImage: gradient,
          backgroundSize: "400% 400%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Primary grain layer */}
      <motion.div
        className="absolute inset-0"
        variants={grainVariants}
        animate={animate ? "animate" : "static"}
        style={{
          backgroundImage: `url("${grainSVG}")`,
          backgroundSize: `${grainSize * 2}px ${grainSize * 2}px`,
          pointerEvents: "none",
          zIndex: 2,
          mixBlendMode: grainBlendMode,
          opacity: Math.min(0.8, grainIntensity / 100),
        }}
      />
      {/* Content layer */}
      <div
        className="relative w-full h-full z-10"
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