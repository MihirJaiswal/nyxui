"use client"
import React, { useRef, useEffect, useState, useMemo, useCallback, useId } from "react"
import { cn } from "@/lib/utils"

export interface MorphingBlobProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "custom"
  customColors?: {
    from: string
    via?: string
    to: string
  }
  size?: "sm" | "md" | "lg" | "xl" | "full"
  complexity?: 1 | 2 | 3 | 4 | 5
  speed?: 1 | 2 | 3 | 4 | 5
  hoverEffect?: boolean
  clickEffect?: boolean
  pulse?: boolean
  glow?: boolean
  glowIntensity?: 1 | 2 | 3 | 4 | 5
  opacity?: number
  smooth?: boolean
  effect3D?: boolean
  children?: React.ReactNode
}
type ComplexityFactor = {
  points: number;
  variance: number;
  tension: number;
};
const COMPLEXITY_FACTORS = {
  1: { points: 6, variance: 0.15, tension: 0.25 },
  2: { points: 8, variance: 0.25, tension: 0.35 },
  3: { points: 10, variance: 0.3, tension: 0.4 },
  4: { points: 12, variance: 0.35, tension: 0.45 },
  5: { points: 16, variance: 0.4, tension: 0.5 },
}

const SPEED_FACTORS = {
  1: 15000, // Slower
  2: 12000,
  3: 9000,
  4: 6000,
  5: 3000, // Faster
}

const SIZE_CLASSES = {
  sm: "w-32 h-32 md:w-40 md:h-40",
  md: "w-48 h-48 md:w-64 md:h-64",
  lg: "w-64 h-64 md:w-80 md:h-80",
  xl: "w-80 h-80 md:w-[32rem] md:h-[32rem]",
  full: "w-full h-full",
}

const GLOW_INTENSITY_CLASSES = {
  1: "shadow-sm",
  2: "shadow-md",
  3: "shadow-lg",
  4: "shadow-xl",
  5: "shadow-2xl",
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

function isValidNumber(num: number): boolean {
  return typeof num === "number" && !isNaN(num) && isFinite(num)
}

export function MorphingBlob({
  theme = "primary",
  customColors,
  size = "md",
  complexity = 3,
  speed = 3,
  hoverEffect = true,
  clickEffect = true,
  pulse = false,
  glow = true,
  glowIntensity = 3,
  opacity = 100,
  smooth = true,
  effect3D = false,
  className,
  children,
  ...props
}: MorphingBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [paths, setPaths] = useState({ current: "", previous: "" })
  const [rotation, setRotation] = useState(0)
  const animationRef = useRef<number | null>(null)
  const previousTimeRef = useRef<number | null>(null)
  const animationProgress = useRef(0)
  const instanceId = useId()
  const gradientId = `blob-gradient-${theme}-${instanceId.replace(/:/g, '')}`

  // Memoize theme colors to prevent recalculation
  const themeColors = useMemo(() => ({
    primary: {
      from: "#4F46E5", via: "#6366F1", to: "#818CF8",
      glow: "shadow-indigo-500/40",
      filter: "drop-shadow(0 0 10px rgba(99, 102, 241, 0.4))",
    },
    secondary: {
      from: "#9333EA", via: "#A855F7", to: "#C084FC",
      glow: "shadow-purple-500/40",
      filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.4))",
    },
    accent: {
      from: "#0D9488", via: "#14B8A6", to: "#2DD4BF",
      glow: "shadow-teal-500/40",
      filter: "drop-shadow(0 0 10px rgba(20, 184, 166, 0.4))",
    },
    success: {
      from: "#16A34A", via: "#22C55E", to: "#4ADE80",
      glow: "shadow-green-500/40",
      filter: "drop-shadow(0 0 10px rgba(34, 197, 94, 0.4))",
    },
    warning: {
      from: "#D97706", via: "#F59E0B", to: "#FBBF24",
      glow: "shadow-amber-500/40",
      filter: "drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))",
    },
    danger: {
      from: "#DC2626", via: "#EF4444", to: "#F87171",
      glow: "shadow-red-500/40",
      filter: "drop-shadow(0 0 10px rgba(239, 68, 68, 0.4))",
    },
    custom: {
      from: customColors?.from || "#000000",
      via: customColors?.via || "#000000",
      to: customColors?.to || "#02001c",
      glow: "shadow-blue-500/40",
      filter: `drop-shadow(0 0 10px ${customColors?.from ? hexToRgba(customColors.from, 0.4) : "rgba(59, 130, 246, 0.4)"})`,
    },
  }), [customColors])

  const currentTheme = themeColors[theme]
  const complexityFactor = COMPLEXITY_FACTORS[complexity]
  const speedValue = SPEED_FACTORS[speed]
  const generateBlobPath = useCallback((factor: ComplexityFactor, hover = false, click = false) => {
    const { points, variance, tension } = factor
    const centerX = 50
    const centerY = 50
    const baseRadius = hover ? 42 : click ? 38 : 40
    const angleStep = (Math.PI * 2) / points
    const blobPoints = []
    for (let i = 0; i < points; i++) {
      const angle = i * angleStep
      const waveVariation = Math.sin(i * 3) * 0.08 + Math.sin(i * 5) * 0.05 + Math.sin(i * 7) * 0.03
      const randomVariance = 1 - variance + Math.random() * variance * 2 + waveVariation
      const radius = Math.max(baseRadius * randomVariance, baseRadius * 0.6)

      blobPoints.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      })
    }
    let path = `M${blobPoints[0].x},${blobPoints[0].y}`
    for (let i = 0; i < points; i++) {
      const current = blobPoints[i]
      const next = blobPoints[(i + 1) % points]
      const prev = blobPoints[(i - 1 + points) % points]
      const nextNext = blobPoints[(i + 2) % points]
      
      const cp1x = current.x + (next.x - prev.x) * tension
      const cp1y = current.y + (next.y - prev.y) * tension
      const cp2x = next.x - (nextNext.x - current.x) * tension
      const cp2y = next.y - (nextNext.y - current.y) * tension
      
      const validCp1x = isValidNumber(cp1x) ? cp1x : current.x
      const validCp1y = isValidNumber(cp1y) ? cp1y : current.y
      const validCp2x = isValidNumber(cp2x) ? cp2x : next.x
      const validCp2y = isValidNumber(cp2y) ? cp2y : next.y

      path += ` C${validCp1x},${validCp1y} ${validCp2x},${validCp2y} ${next.x},${next.y}`
    }

    return path + " Z"
  }, [])
  const interpolatePaths = useCallback((path1: string, path2: string, progress: number) => {
    if (!path1 || !path2) return path2 || path1 || ""
    const extractPoints = (path: string) => {
      const regex = /([MC]) ?([^MC]+)/g
      const points = []
      let match

      while ((match = regex.exec(path)) !== null) {
        const [, command, coordStr] = match
        const coords = coordStr.trim().split(/[ ,]/).filter(Boolean).map(parseFloat)
        if (command === "M" && coords.length >= 2) {
          points.push([coords[0], coords[1]])
        } else if (command === "C" && coords.length >= 6) {
          points.push([coords[4], coords[5]])
        }
      }

      return points
    }

    const points1 = extractPoints(path1)
    const points2 = extractPoints(path2)

    if (points1.length !== points2.length || points1.length === 0) {
      return path2
    }
    const easeProgress = easeInOutCubic(progress)
    const interpolatedPoints = points1.map((point, i) => {
      if (i < points2.length) {
        const x = point[0] + (points2[i][0] - point[0]) * easeProgress
        const y = point[1] + (points2[i][1] - point[1]) * easeProgress
        return [isValidNumber(x) ? x : point[0], isValidNumber(y) ? y : point[1]]
      }
      return point
    })
    let newPath = `M${interpolatedPoints[0][0]},${interpolatedPoints[0][1]}`
    const tension = 0.4

    for (let i = 0; i < interpolatedPoints.length; i++) {
      const curr = interpolatedPoints[i]
      const next = interpolatedPoints[(i + 1) % interpolatedPoints.length]
      const prev = interpolatedPoints[(i - 1 + interpolatedPoints.length) % interpolatedPoints.length]
      const nextNext = interpolatedPoints[(i + 2) % interpolatedPoints.length]
      const cpx1 = curr[0] + (next[0] - prev[0]) * tension
      const cpy1 = curr[1] + (next[1] - prev[1]) * tension
      const cpx2 = next[0] - (nextNext[0] - curr[0]) * tension
      const cpy2 = next[1] - (nextNext[1] - curr[1]) * tension
      const validCpx1 = isValidNumber(cpx1) ? cpx1 : curr[0]
      const validCpy1 = isValidNumber(cpy1) ? cpy1 : curr[1]
      const validCpx2 = isValidNumber(cpx2) ? cpx2 : next[0]
      const validCpy2 = isValidNumber(cpy2) ? cpy2 : next[1]
      newPath += ` C${validCpx1},${validCpy1} ${validCpx2},${validCpy2} ${next[0]},${next[1]}`
    }

    return newPath + " Z"
  }, [])

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current === null) {
      previousTimeRef.current = time
      animationRef.current = requestAnimationFrame(animate)
      return
    }
    const deltaTime = time - previousTimeRef.current
    const duration = speedValue
    animationProgress.current += deltaTime / duration
    if (animationProgress.current >= 1) {
      animationProgress.current = 0
      setPaths((prev) => ({
        previous: prev.current,
        current: generateBlobPath(complexityFactor, isHovered, isClicked),
      }))

      setRotation((prev) => (prev + 15 + Math.random() * 30) % 360)
    }

    previousTimeRef.current = time
    animationRef.current = requestAnimationFrame(animate)
  }, [speedValue, complexityFactor, isHovered, isClicked, generateBlobPath])

  useEffect(() => {
    if (!paths.current) {
      const initialPath = generateBlobPath(complexityFactor, isHovered, isClicked)
      setPaths({ current: initialPath, previous: initialPath })
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
    if (smooth) {
      animationRef.current = requestAnimationFrame(animate)
      return () => {
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = null
        }
      }
    } else {
      const interval = setInterval(() => {
        setPaths((prev) => ({
          previous: prev.current,
          current: generateBlobPath(complexityFactor, isHovered, isClicked),
        }))
        setRotation((prev) => (prev + 15 + Math.random() * 30) % 360)
      }, speedValue / 6)
      return () => clearInterval(interval)
    }
  }, [
    complexity,
    speed,
    isHovered,
    isClicked,
    smooth,
    animate,
    complexityFactor,
    speedValue,
    generateBlobPath,
    paths
  ])

  useEffect(() => {
    setPaths((prev) => ({
      previous: prev.current,
      current: generateBlobPath(complexityFactor, isHovered, isClicked),
    }));
    setRotation((prev) => (prev + 15 + Math.random() * 30) % 360);
    animationProgress.current = 0;
  }, [isHovered, isClicked, generateBlobPath, complexityFactor]);

  const handleMouseEvents = useMemo(() => ({
    onMouseEnter: () => hoverEffect && setIsHovered(true),
    onMouseLeave: () => {
      if (hoverEffect) setIsHovered(false)
      if (clickEffect) setIsClicked(false)
    },
    onMouseDown: () => clickEffect && setIsClicked(true),
    onMouseUp: () => clickEffect && setIsClicked(false),
    onTouchStart: () => clickEffect && setIsClicked(true),
    onTouchEnd: () => clickEffect && setIsClicked(false),
  }), [hoverEffect, clickEffect])

  const displayPath = smooth && paths.previous
    ? interpolatePaths(paths.previous, paths.current, animationProgress.current)
    : paths.current

  return (
    <div
      ref={blobRef}
      className={cn(
        "relative flex items-center justify-center transition-all duration-500",
        SIZE_CLASSES[size],
        glow && GLOW_INTENSITY_CLASSES[glowIntensity],
        glow && currentTheme.glow,
        pulse && "animate-pulse",
        className,
      )}
      style={{
        opacity: opacity / 100,
        willChange: "transform, opacity",
      }}
      {...handleMouseEvents}
      {...props}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 8s ease-in-out",
          filter: glow ? currentTheme.filter : "none",
          willChange: "transform, filter",
        }}
        aria-hidden="true"
      >
        {effect3D && (
          <path
            d={displayPath}
            className="transition-all duration-300"
            fill="rgba(0,0,0,0.15)"
            transform="translate(3,3) scale(0.99)"
          />
        )}
        <path
          d={displayPath}
          className="transition-all duration-300"
          fill={`url(#${gradientId})`}
        />
        {effect3D && (
          <path
            d={displayPath}
            className="transition-all duration-300"
            fill="rgba(255,255,255,0.1)"
            transform="translate(-1.5,-1.5) scale(0.98)"
          />
        )}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={currentTheme.from} />
            {currentTheme.via && <stop offset="50%" stopColor={currentTheme.via} />}
            <stop offset="100%" stopColor={currentTheme.to} />
          </linearGradient>
        </defs>
      </svg>
      {children && (
        <div className="relative z-10 flex items-center justify-center text-white transition-all duration-300">
          {children}
        </div>
      )}
    </div>
  )
}