"use client"
import type React from "react"
import { useRef, useEffect, useState, useMemo, useCallback } from "react"
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
  const [blobPath, setBlobPath] = useState("")
  const [prevBlobPath, setPrevBlobPath] = useState("")
  const [rotation, setRotation] = useState(0)
  const requestRef = useRef<number | null>(null)
  const previousTimeRef = useRef<number | null>(null)
  const animationProgress = useRef(0)

  const themeColors = useMemo(() => ({
    primary: {
      gradient: "from-blue-400 via-blue-600 to-indigo-700",
      glow: "shadow-blue-500/60",
      filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
    },
    secondary: {
      gradient: "from-purple-400 via-purple-600 to-violet-800",
      glow: "shadow-purple-500/60",
      filter: "drop-shadow(0 0 8px rgba(147, 51, 234, 0.5))",
    },
    accent: {
      gradient: "from-teal-300 via-teal-500 to-emerald-700",
      glow: "shadow-teal-500/60",
      filter: "drop-shadow(0 0 8px rgba(20, 184, 166, 0.5))",
    },
    success: {
      gradient: "from-green-300 via-green-500 to-emerald-700",
      glow: "shadow-green-500/60",
      filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))",
    },
    warning: {
      gradient: "from-yellow-300 via-amber-500 to-orange-600",
      glow: "shadow-amber-500/60",
      filter: "drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))",
    },
    danger: {
      gradient: "from-red-300 via-red-500 to-rose-700",
      glow: "shadow-red-500/60",
      filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))",
    },
    custom: {
      gradient: customColors ? `from-[${customColors.from}] ${customColors.via ? `via-[${customColors.via}]` : ""} to-[${customColors.to}]` : "",
      glow: customColors ? `shadow-[${customColors.from}]/60` : "shadow-blue-500/60",
      filter: `drop-shadow(0 0 8px ${customColors?.from || "rgba(59, 130, 246, 0.5)"})`
    },
  }), [customColors])

  const currentTheme = themeColors[theme]

  const sizeClasses = {
    sm: "w-32 h-32 md:w-40 md:h-40",
    md: "w-40 h-40 md:w-56 md:h-56",
    lg: "w-56 h-56 md:w-72 md:h-72",
    xl: "w-64 h-64 md:w-96 md:h-96",
    full: "w-full h-full",
  }

  const complexityFactors = useMemo(() => ({
    1: { points: 6, variance: 0.15, tension: 0.2 },
    2: { points: 8, variance: 0.25, tension: 0.3 },
    3: { points: 10, variance: 0.35, tension: 0.4 },
    4: { points: 12, variance: 0.45, tension: 0.5 },
    5: { points: 16, variance: 0.55, tension: 0.6 },
  }), []);

  const speedFactors = useMemo(() => ({
    1: 12000,
    2: 9000,
    3: 6000,
    4: 4000,
    5: 2000,
  }), []);

  const glowIntensityClasses = {
    1: "shadow-md",
    2: "shadow-lg",
    3: "shadow-xl",
    4: "shadow-2xl",
    5: "shadow-2xl shadow-xl",
  }

  const isValidNumber = useCallback((num: number) => {
    return typeof num === 'number' && !isNaN(num) && isFinite(num)
  }, [])

  const generateBlobPath = useCallback((factor: { points: number; variance: number; tension: number }, hover = false, click = false) => {
    const { points, variance, tension } = factor
    const centerX = 50
    const centerY = 50
    const baseRadius = hover ? 42 : click ? 38 : 40
    const angleStep = (Math.PI * 2) / points
    
    const blobPoints = []
    for (let i = 0; i < points; i++) {
      const angle = i * angleStep
      const waveVariation = Math.sin(i * 3) * 0.15
      const randomVariance = 1 - variance + (Math.random() * variance * 2) + waveVariation
      const radius = Math.max(baseRadius * randomVariance, 5)
      
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      blobPoints.push({ x, y })
    }
    
    let path = `M${blobPoints[0].x},${blobPoints[0].y}`
    
    for (let i = 0; i < points; i++) {
      const current = blobPoints[i]
      const next = blobPoints[(i + 1) % points]
      
      const cp1x = current.x + (next.x - blobPoints[(i - 1 + points) % points].x) * tension
      const cp1y = current.y + (next.y - blobPoints[(i - 1 + points) % points].y) * tension
      const cp2x = next.x - (blobPoints[(i + 2) % points].x - current.x) * tension
      const cp2y = next.y - (blobPoints[(i + 2) % points].y - current.y) * tension
      
      const validCp1x = isValidNumber(cp1x) ? cp1x : current.x
      const validCp1y = isValidNumber(cp1y) ? cp1y : current.y
      const validCp2x = isValidNumber(cp2x) ? cp2x : next.x
      const validCp2y = isValidNumber(cp2y) ? cp2y : next.y
      
      path += ` C${validCp1x},${validCp1y} ${validCp2x},${validCp2y} ${next.x},${next.y}`
    }
    
    path += " Z"
    return path
  }, [isValidNumber])

  const interpolatePaths = useCallback((path1: string, path2: string, progress: number) => {
    if (!path1 || !path2) return path2 || path1 || ""
    
    const extractPoints = (path: string) => {
      const regex = /([MC]) ?([^MC]+)/g
      const matches = [...path.matchAll(regex)]
      
      const points: number[][] = []
      
      for (const match of matches) {
        const [, command, coordStr] = match
        const coords = coordStr.trim().split(/[ ,]/).filter(Boolean).map(parseFloat)
        
        if (command === 'M' && coords.length >= 2) {
          const x = coords[0]
          const y = coords[1]
          if (isValidNumber(x) && isValidNumber(y)) {
            points.push([x, y])
          }
        } 
        else if (command === 'C' && coords.length >= 6) {
          const endX = coords[4]
          const endY = coords[5]
          if (isValidNumber(endX) && isValidNumber(endY)) {
            points.push([endX, endY])
          }
        }
      }
      
      return points
    }
    
    const points1 = extractPoints(path1)
    const points2 = extractPoints(path2)
    
    if (points1.length !== points2.length || points1.length === 0) {
      return path2
    }
    
    const interpolatedPoints = points1.map((point, i) => {
      if (i < points2.length) {
        const x = point[0] + (points2[i][0] - point[0]) * progress
        const y = point[1] + (points2[i][1] - point[1]) * progress
        
        return [
          isValidNumber(x) ? x : point[0],
          isValidNumber(y) ? y : point[1]
        ]
      }
      return point
    })
    
    let newPath = `M${interpolatedPoints[0][0]},${interpolatedPoints[0][1]}`
    
    for (let i = 1; i < interpolatedPoints.length; i++) {
      const prev = interpolatedPoints[i - 1]
      const curr = interpolatedPoints[i]
      
      const tension = 0.4
      const dx = curr[0] - prev[0]
      const dy = curr[1] - prev[1]
      
      const cpx1 = prev[0] + dx * tension
      const cpy1 = prev[1] + dy * tension
      const cpx2 = curr[0] - dx * tension
      const cpy2 = curr[1] - dy * tension
      
      const validCpx1 = isValidNumber(cpx1) ? cpx1 : prev[0]
      const validCpy1 = isValidNumber(cpy1) ? cpy1 : prev[1]
      const validCpx2 = isValidNumber(cpx2) ? cpx2 : curr[0]
      const validCpy2 = isValidNumber(cpy2) ? cpy2 : curr[1]
      
      newPath += ` C${validCpx1},${validCpy1} ${validCpx2},${validCpy2} ${curr[0]},${curr[1]}`
    }
    
    newPath += " Z"
    return newPath
  }, [isValidNumber])

  const animate = useCallback((time: number) => {
    if (previousTimeRef.current === null) {
      previousTimeRef.current = time;
    }
    
    const deltaTime = time - (previousTimeRef.current || 0);
    const factor = complexityFactors[complexity];
    const duration = speedFactors[speed];
    
    animationProgress.current += deltaTime / duration;
    if (animationProgress.current >= 1) {
      animationProgress.current = 0;
      setPrevBlobPath(blobPath);
      setBlobPath(generateBlobPath(factor, isHovered, isClicked));
      setRotation(prev => (prev + 30) % 360);
    }
    
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [blobPath, complexity, speed, isHovered, isClicked, complexityFactors, speedFactors, generateBlobPath]);

  useEffect(() => {
    const factor = complexityFactors[complexity]
    
    if (!blobPath) {
      const initialPath = generateBlobPath(factor, isHovered, isClicked)
      setBlobPath(initialPath)
      setPrevBlobPath(initialPath)
    }
    
    if (smooth) {
      requestRef.current = requestAnimationFrame(animate)
      return () => {
        if (requestRef.current !== null) {
          cancelAnimationFrame(requestRef.current)
        }
      }
    } else {
      const interval = setInterval(() => {
        setPrevBlobPath(blobPath)
        setBlobPath(generateBlobPath(factor, isHovered, isClicked))
        setRotation((prev) => (prev + 30) % 360)
      }, speedFactors[speed] / 6)
      
      return () => clearInterval(interval)
    }
  }, [complexity, speed, isHovered, isClicked, smooth, animate, blobPath, complexityFactors, speedFactors, generateBlobPath])

  const handleMouseEnter = () => {
    if (hoverEffect) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (hoverEffect) {
      setIsHovered(false)
    }
    if (clickEffect) {
      setIsClicked(false)
    }
  }

  const handleMouseDown = () => {
    if (clickEffect) {
      setIsClicked(true)
    }
  }

  const handleMouseUp = () => {
    if (clickEffect) {
      setIsClicked(false)
    }
  }

  const displayPath = smooth && prevBlobPath 
    ? interpolatePaths(prevBlobPath, blobPath, animationProgress.current)
    : blobPath

  return (
    <div
      ref={blobRef}
      className={cn(
        "relative flex items-center justify-center transition-all duration-500",
        sizeClasses[size],
        glow && glowIntensityClasses[glowIntensity],
        glow && currentTheme.glow,
        pulse && "animate-pulse",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        opacity: opacity / 100,
      }}
      {...props}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 8s ease-in-out",
          filter: glow ? currentTheme.filter : "none",
        }}
      >
        {effect3D && (
          <path
            d={displayPath}
            className="transition-all duration-300"
            fill="rgba(0,0,0,0.2)"
            transform="translate(3,3)"
          />
        )}
        
        <path
          d={displayPath}
          className={cn(
            "transition-all duration-300 bg-gradient-to-br",
            effect3D ? "backdrop-blur-lg" : ""
          )}
          fill="url(#blob-gradient)"
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
          <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="stop-color-from" />
            {theme === "custom" && customColors?.via && (
              <stop offset="50%" className="stop-color-via" />
            )}
            <stop offset="100%" className="stop-color-to" />
          </linearGradient>
          
          <radialGradient id="blob-radial" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          
          <filter id="blur-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>
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