"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "../../lib/utils"

export interface CyberpunkCardProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?:
    | "neon-blue"
    | "neon-pink"
    | "neon-green"
    | "neon-orange"
    | "neon-purple"
    | "matrix-green"
    | "cyber-red"
    | "hologram"
    | "custom"
  customColors?: {
    primary: string
    secondary: string
    accent: string
  }
  borderStyle?: "solid" | "dashed" | "glitch" | "corners" | "animated" | "circuit"
  colorShift?: boolean
  lightTrail?: boolean
  rounded?: "none" | "sm" | "md" | "lg"
  glow?: boolean
  glowIntensity?: 1 | 2 | 3 | 4 | 5
  backgroundEffect?: "none" | "circuit" | "matrix" | "scanlines" | "particles" | "waves"
  pulseAnimation?: boolean
  glitchEffect?: boolean
  hologramFlicker?: boolean
  dataStream?: boolean
  loading?: boolean
  animationSpeed?: "slow" | "normal" | "fast"
  children: React.ReactNode
}

const MatrixRain = () => {
  const [columns, setColumns] = useState<
    Array<{
      id: number
      characters: Array<{
        char: string
        opacity: number
        isLeading: boolean
      }>
      x: number
      speed: number
      height: number
    }>
  >([])

  useEffect(() => {
    const matrixChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

    const createColumn = (x: number) => ({
      id: Math.random(),
      x,
      speed: Math.random() * 3 + 1,
      height: Math.floor(Math.random() * 15) + 5,
      characters: Array.from({ length: Math.floor(Math.random() * 15) + 5 }, (_, i) => ({
        char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
        opacity: Math.max(0, 1 - i * 0.15),
        isLeading: i === 0,
      })),
    })

    // Initialize columns
    const initialColumns = Array.from({ length: 12 }, (_, i) => createColumn(i * 8.33 + Math.random() * 2))
    setColumns(initialColumns)

    const interval = setInterval(() => {
      setColumns((prevColumns) =>
        prevColumns.map((column) => {
          const newY = (column.speed * 2) % 120
          const updatedCharacters = column.characters.map((char, i) => ({
            ...char,
            char: Math.random() < 0.1 ? matrixChars[Math.floor(Math.random() * matrixChars.length)] : char.char,
            opacity: Math.max(0, 1 - i * 0.12),
          }))

          return {
            ...column,
            characters: updatedCharacters,
            speed: column.speed + 0.1,
          }
        }),
      )
    }, 100)

    const resetInterval = setInterval(() => {
      setColumns((prevColumns) => prevColumns.map((column) => (column.speed > 50 ? createColumn(column.x) : column)))
    }, 3000)

    return () => {
      clearInterval(interval)
      clearInterval(resetInterval)
    }
  }, [])

  return (
    <div className="absolute inset-0 font-mono text-xs">
      {columns.map((column, columnIndex) => (
        <div
          key={column.id}
          className="absolute top-0 flex flex-col"
          style={{
            left: `${column.x}%`,
            transform: `translateY(${((column.speed * 2) % 120) - 20}%)`,
            filter: "drop-shadow(0 0 3px currentColor)",
          }}
        >
          {column.characters.map((char, charIndex) => (
            <div
              key={charIndex}
              className={cn(
                "leading-tight transition-all duration-100",
                char.isLeading ? "text-white font-bold" : "text-green-400",
              )}
              style={{
                opacity: char.opacity,
                textShadow: char.isLeading ? "0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00" : "0 0 5px #00ff00",
                fontSize: char.isLeading ? "0.9rem" : "0.75rem",
              }}
            >
              {char.char}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export const CyberpunkCard = ({
  theme = "neon-blue",
  customColors,
  borderStyle = "solid",
  colorShift = true,
  lightTrail = true,
  rounded = "md",
  glow = true,
  glowIntensity = 3,
  backgroundEffect = "none",
  pulseAnimation = false,
  glitchEffect = false,
  hologramFlicker = false,
  dataStream = false,
  loading = false,
  animationSpeed = "normal",
  className,
  children,
  ...props
}: CyberpunkCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [colorPhase, setColorPhase] = useState(0)
  const [glitchPhase, setGlitchPhase] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([])

  const speedMultiplier = {
    slow: 0.5,
    normal: 1,
    fast: 2,
  }[animationSpeed]

  useEffect(() => {
    if (!colorShift && !glitchEffect) return
    const interval = setInterval(() => {
      if (colorShift) {
        setColorPhase((prev) => (prev + 1 * speedMultiplier) % 100)
      }
      if (glitchEffect && isHovered) {
        setGlitchPhase((prev) => (prev + 1) % 10)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [colorShift, glitchEffect, isHovered, speedMultiplier])

  useEffect(() => {
    if (backgroundEffect === "particles" && isHovered) {
      const interval = setInterval(() => {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: 1,
        }
        setParticles((prev) => [...prev.slice(-20), newParticle])
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
        }, 2000)
      }, 100)

      return () => clearInterval(interval)
    }
  }, [backgroundEffect, isHovered])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!lightTrail) return
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setParticles([])
  }

  const handleClick = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 200)
  }

  const themeColors = {
    "neon-blue": {
      primary: "from-blue-500 via-cyan-400 to-blue-600",
      secondary: "from-blue-600 via-cyan-500 to-blue-700",
      accent: "bg-cyan-400",
      text: "text-cyan-50",
      glow: "shadow-cyan-500/50",
      border: "border-cyan-400",
    },
    "neon-pink": {
      primary: "from-pink-500 via-fuchsia-400 to-pink-600",
      secondary: "from-pink-600 via-fuchsia-500 to-pink-700",
      accent: "bg-fuchsia-400",
      text: "text-pink-50",
      glow: "shadow-fuchsia-500/50",
      border: "border-fuchsia-400",
    },
    "neon-green": {
      primary: "from-green-500 via-emerald-400 to-green-600",
      secondary: "from-green-600 via-emerald-500 to-green-700",
      accent: "bg-emerald-400",
      text: "text-green-50",
      glow: "shadow-emerald-500/50",
      border: "border-emerald-400",
    },
    "neon-orange": {
      primary: "from-orange-500 via-amber-400 to-orange-600",
      secondary: "from-orange-600 via-amber-500 to-orange-700",
      accent: "bg-amber-400",
      text: "text-orange-50",
      glow: "shadow-amber-500/50",
      border: "border-amber-400",
    },
    "neon-purple": {
      primary: "from-purple-600 via-violet-500 to-purple-700",
      secondary: "from-purple-700 via-violet-600 to-purple-800",
      accent: "bg-violet-400",
      text: "text-purple-50",
      glow: "shadow-violet-500/50",
      border: "border-violet-400",
    },
    "matrix-green": {
      primary: "from-green-400 via-lime-300 to-green-500",
      secondary: "from-green-500 via-lime-400 to-green-600",
      accent: "bg-lime-400",
      text: "text-green-50",
      glow: "shadow-lime-500/50",
      border: "border-lime-400",
    },
    "cyber-red": {
      primary: "from-red-500 via-rose-400 to-red-600",
      secondary: "from-red-600 via-rose-500 to-red-700",
      accent: "bg-rose-400",
      text: "text-red-50",
      glow: "shadow-rose-500/50",
      border: "border-rose-400",
    },
    hologram: {
      primary: "from-cyan-300 via-blue-400 to-purple-500",
      secondary: "from-purple-500 via-pink-400 to-cyan-300",
      accent: "bg-cyan-300",
      text: "text-cyan-50",
      glow: "shadow-cyan-300/50",
      border: "border-cyan-300",
    },
    custom: {
      primary: "", 
      secondary: "",
      accent: "",
      text: "text-gray-50",
      glow: "",
      border: "",
    },
  }

  const currentTheme = themeColors[theme]
  const customStyles = theme === "custom" && customColors ? {
    background: `linear-gradient(to bottom right, ${customColors.primary}, ${customColors.secondary})`,
    borderColor: customColors.accent,
    boxShadow: glow ? `0 20px 25px -5px ${customColors.primary}50, 0 10px 10px -5px ${customColors.primary}40` : undefined,
  } : {}

  const borderStyles = {
    solid: "border-2",
    dashed: "border-2 border-dashed",
    glitch: `border-2 ${glitchPhase % 3 === 0 ? "border-dashed" : glitchPhase % 3 === 1 ? "border-dotted" : "border-solid"}`,
    corners:"border-0 before:content-[''] before:absolute before:w-8 before:h-8 before:border-t-2 before:border-l-2 before:top-0 before:left-0 after:content-[''] after:absolute after:w-8 after:h-8 after:border-b-2 after:border-r-2 after:bottom-0 after:right-0",
    animated:"border-2 before:content-[''] before:absolute before:inset-0 before:border-2 before:border-current before:animate-pulse before:rounded-[inherit] before:pointer-events-none",
    circuit:"border-2 border-dashed before:content-[''] before:absolute before:inset-0 before:border-2 before:border-dotted before:border-current before:animate-ping before:rounded-[inherit] before:pointer-events-none before:opacity-75",
  }

  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
  }

  const glowIntensityStyles = {
    1: "shadow-md",
    2: "shadow-lg",
    3: "shadow-xl",
    4: "shadow-2xl",
    5: "shadow-2xl drop-shadow-2xl",
  }

  const getBackgroundPattern = () => {
    const patternColor = theme === "custom" && customColors ? customColors.accent : "currentColor"
    
    switch (backgroundEffect) {
      case "circuit":
        return (
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 10,0 L 10,10 L 0,10" stroke={patternColor} strokeWidth="0.5" fill="none" />
                  <circle cx="10" cy="10" r="1" fill={patternColor} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" />
            </svg>
          </div>
        )
      case "matrix":
        return (
          <div className="absolute inset-0 overflow-hidden opacity-40">
            <MatrixRain />
          </div>
        )
      case "scanlines":
        return (
          <div className="absolute inset-0 opacity-20">
            <div 
              className="w-full h-full bg-gradient-to-b from-transparent via-current to-transparent bg-[length:100%_4px] animate-pulse" 
              style={{ color: patternColor }}
            />
          </div>
        )
      case "waves":
        return (
          <div className="absolute inset-0 opacity-30 overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent animate-pulse transform -skew-x-12" 
              style={{ color: patternColor }}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={cn(
        "relative p-6 border transition-all duration-300 overflow-hidden cursor-pointer",
        theme !== "custom" && `bg-gradient-to-br ${currentTheme.primary}`,
        borderStyles[borderStyle],
        roundedStyles[rounded],
        theme !== "custom" && currentTheme.border,
        theme !== "custom" && glow && glowIntensityStyles[glowIntensity],
        theme !== "custom" && glow && currentTheme.glow,
        currentTheme.text,
        pulseAnimation && "before:animate-pulse",
        hologramFlicker && isHovered && "animate-pulse",
        isClicked && "scale-95",
        glitchEffect && isHovered && glitchPhase % 5 === 0 && "transform skew-x-1",
        "transform-gpu",
        className,
      )}
      style={{
        ...customStyles,
        borderColor: colorShift && isHovered ? `hsl(${(colorPhase * 3.6) % 360}, 100%, 70%)` : 
          theme === "custom" && customColors ? customColors.accent : undefined,
        filter: hologramFlicker && isHovered ? `hue-rotate(${colorPhase * 3.6}deg)` : undefined,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {getBackgroundPattern()}

      {/* Particles Effect */}
      {backgroundEffect === "particles" &&
        particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full animate-ping"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              backgroundColor: theme === "custom" && customColors ? customColors.accent : "currentColor",
            }}
          />
        ))}

      {/* Light Trail */}
      {lightTrail && isHovered && (
        <div
          className="absolute w-32 h-32 rounded-full blur-xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
            opacity: 0.6,
            background: `radial-gradient(circle, ${
              theme === "custom" && customColors ? customColors.accent : currentTheme.accent.replace("bg-", "")
            } 0%, transparent 70%)`,
          }}
        />
      )}

      {dataStream && (
        <div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent animate-pulse"
          style={{ color: theme === "custom" && customColors ? customColors.accent : "currentColor" }}
        />
      )}
      
      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full animate-bounce"
                style={{ 
                  backgroundColor: theme === "custom" && customColors ? customColors.accent : "currentColor",
                  animationDelay: `${i * 0.1}s` 
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={cn(
          "relative z-10 transition-all duration-300",
          glitchEffect && isHovered && glitchPhase % 7 === 0 && "transform translate-x-1",
        )}
      >
        {children}
      </div>
      
      <div
        className={cn(
          "absolute -bottom-2 -right-2 w-16 h-16 transform rotate-45 opacity-70 transition-all duration-300",
          theme !== "custom" && currentTheme.accent,
          isHovered && "scale-110 opacity-90",
        )}
        style={{
          backgroundColor: theme === "custom" && customColors ? customColors.accent : undefined,
        }}
      />

      <div 
        className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 opacity-50" 
        style={{ borderColor: theme === "custom" && customColors ? customColors.accent : "currentColor" }}
      />
      <div 
        className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 opacity-50" 
        style={{ borderColor: theme === "custom" && customColors ? customColors.accent : "currentColor" }}
      />
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      )}
    </div>
  )
}