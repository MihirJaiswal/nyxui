"use client"

import type React from "react"
import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import { cn } from "@/lib/utils"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  color: string
}

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  variant?: "liquid" | "laser" | "cosmic" | "glitch"
  intensity?: number
  liquidColor?: string
  laserColor?: string
  glitchColor1?: string
  glitchColor2?: string
  disabled?: boolean
  allowCustomBackground?: boolean
}

export function GlowCard({
  children,
  className,
  variant = "liquid",
  intensity = 0.8,
  liquidColor = "#3b82f6",
  laserColor = "#ff0000",
  glitchColor1 = "#ff0064",
  glitchColor2 = "#00ff64",
  disabled = false,
  allowCustomBackground = false,
}: GlowCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>(0)
  const waveTimeRef = useRef<number>(0)
  const frameCountRef = useRef<number>(0)
  const lastMouseMoveRef = useRef<number>(0)

  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; time: number }>>([])
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0 })

  // Memoize color conversions
  const colorData = useMemo(() => {
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16),
          }
        : { r: 59, g: 130, b: 246 }
    }

    return {
      rgb: hexToRgb(liquidColor),
      laserRgb: hexToRgb(laserColor),
      glitch1Rgb: hexToRgb(glitchColor1),
      glitch2Rgb: hexToRgb(glitchColor2),
    }
  }, [liquidColor, laserColor, glitchColor1, glitchColor2])

  // Generate cosmic particles immediately on hover
  const generateCosmicParticles = useCallback((centerX: number, centerY: number) => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * 40
      const particleType = Math.random()
      const [color, size, speed] =
        particleType < 0.3
          ? [`hsl(${Math.random() * 60 + 40}, 80%, 90%)`, Math.random() * 1.5 + 0.5, 0.3]
          : particleType < 0.6
            ? [`hsl(${Math.random() * 120 + 240}, 70%, 60%)`, Math.random() * 4 + 2, 0.8]
            : [`hsl(${Math.random() * 30 + 300}, 60%, 70%)`, Math.random() * 2 + 1, 0.5]

      newParticles.push({
        id: Math.random(),
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        size,
        life: 1,
        color,
      })
    }
    setParticles((prev) => [...prev.slice(-25), ...newParticles])
  }, [])

  // Optimized animation loop
  const animate = useCallback(() => {
    if (!isHovered) return

    const now = Date.now()
    if (now - lastMouseMoveRef.current < 16) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    waveTimeRef.current += 0.5
    frameCountRef.current += 1
    const currentFrame = frameCountRef.current

    // Handle different effects with better timing
    if (variant === "cosmic" && currentFrame % 6 === 0) {
      generateCosmicParticles(mousePos.x, mousePos.y)
    } else if (variant === "glitch" && currentFrame % 8 === 0) {
      setGlitchOffset({
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 3,
      })
    }

    // Update particles
    if (currentFrame % 3 === 0) {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * 0.5,
            y: p.y + p.vy * 0.5,
            life: p.life - 0.008,
            vx: p.vx * 0.998,
            vy: p.vy * 0.998,
          }))
          .filter((p) => p.life > 0)
          .slice(-35),
      )
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [isHovered, mousePos, variant, generateCosmicParticles])

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now()
    if (now - lastMouseMoveRef.current < 16) return
    lastMouseMoveRef.current = now

    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    // Generate initial particles immediately for cosmic effect
    if (variant === "cosmic") {
      generateCosmicParticles(mousePos.x, mousePos.y)
    }
  }, [variant, generateCosmicParticles, mousePos.x, mousePos.y])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setMousePos({ x: 50, y: 50 })
    waveTimeRef.current = 0
    frameCountRef.current = 0
    setParticles([])
    setGlitchOffset({ x: 0, y: 0 })
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
  }, [])

  const createRipple = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current || variant !== "liquid") return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setRipples((prev) => [...prev.slice(-2), { id: Date.now(), x, y, time: Date.now() }])
    },
    [variant],
  )

  // Memoize background gradient
  const backgroundGradient = useMemo(() => {
    if (allowCustomBackground) return undefined

    const gradients = {
      laser: "linear-gradient(135deg, rgba(40,10,10,0.9) 0%, rgba(30,5,5,0.95) 50%, rgba(20,0,0,0.9) 100%)",
      cosmic: "linear-gradient(135deg, rgba(10,5,30,0.95) 0%, rgba(20,10,50,0.98) 50%, rgba(5,0,25,0.95) 100%)",
      glitch: "linear-gradient(135deg, rgba(40,0,40,0.9) 0%, rgba(60,0,20,0.95) 50%, rgba(20,0,60,0.9) 100%)",
      liquid: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)",
    }
    return gradients[variant]
  }, [variant, allowCustomBackground])

  // Get border gradient
  const getBorderGradient = () => {
    const { rgb, laserRgb, glitch1Rgb, glitch2Rgb } = colorData

    return variant === "laser"
      ? `conic-gradient(from ${waveTimeRef.current * 3}deg at ${mousePos.x}% ${mousePos.y}%, rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 1) 0deg, rgba(${laserRgb.r + 100}, ${laserRgb.g}, ${laserRgb.b}, 0.8) 60deg, rgba(255, 255, 0, 0.6) 120deg, rgba(0, 255, 100, 0.8) 180deg, rgba(0, 100, 255, 1) 240deg, rgba(100, 0, 255, 0.8) 300deg, rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 1) 360deg)`
      : variant === "cosmic"
        ? `conic-gradient(from ${waveTimeRef.current}deg at ${mousePos.x}% ${mousePos.y}%, rgba(255, 20, 147, 0.8) 0deg, rgba(138, 43, 226, 0.6) 120deg, rgba(75, 0, 130, 0.8) 240deg, rgba(255, 20, 147, 0.8) 360deg)`
        : variant === "glitch"
          ? `conic-gradient(from ${waveTimeRef.current * 4}deg at ${mousePos.x}% ${mousePos.y}%, rgba(${glitch1Rgb.r}, ${glitch1Rgb.g}, ${glitch1Rgb.b}, 0.8) 0deg, rgba(${glitch2Rgb.r}, ${glitch2Rgb.g}, ${glitch2Rgb.b}, 0.6) 180deg, rgba(${glitch1Rgb.r}, ${glitch1Rgb.g}, ${glitch1Rgb.b}, 0.8) 360deg)`
          : `conic-gradient(from ${mousePos.x * 3.6}deg at ${mousePos.x}% ${mousePos.y}%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8) 0deg, rgba(${rgb.r + 50}, ${rgb.g + 30}, ${rgb.b + 60}, 0.6) 90deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4) 180deg, rgba(${rgb.r - 30}, ${rgb.g - 20}, ${rgb.b + 40}, 0.6) 270deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8) 360deg)`
  }

  // Render effects
  const renderEffects = () => {
    const { rgb, laserRgb, glitch1Rgb, glitch2Rgb } = colorData

    switch (variant) {
      case "laser":
        return (
          <>
            {/* Laser beams and crosshair */}
            {isHovered && (
              <>
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${mousePos.x}%`,
                    top: "0%",
                    transform: "translateX(-50%)",
                    width: "3px",
                    height: "100%",
                    background: `linear-gradient(to bottom, transparent 0%, rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 0.95) 10%, rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 0.95) 90%, transparent 100%)`,
                    filter: "blur(1px)",
                    zIndex: 17,
                    boxShadow: `0 0 10px rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 0.8), 0 0 20px rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 0.4)`,
                  }}
                />
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: "0%",
                    top: `${mousePos.y}%`,
                    transform: "translateY(-50%)",
                    width: "100%",
                    height: "3px",
                    background: `linear-gradient(to right, transparent 0%, rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 0.95) 10%, rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 0.95) 90%, transparent 100%)`,
                    filter: "blur(1px)",
                    zIndex: 17,
                    boxShadow: `0 0 10px rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 0.8), 0 0 20px rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 0.4)`,
                  }}
                />
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${mousePos.x}%`,
                    top: `${mousePos.y}%`,
                    transform: "translate(-50%, -50%)",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    zIndex: 18,
                    background: `radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 0.9) 30%, rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 0.6) 60%, transparent 100%)`,
                    filter: "blur(0.5px)",
                    boxShadow: `0 0 15px rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 1), 0 0 30px rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 0.6)`,
                    animation: "laser-pulse 1s ease-in-out infinite",
                  }}
                />
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${mousePos.x}%`,
                    top: `${mousePos.y}%`,
                    transform: "translate(-50%, -50%)",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    zIndex: 19,
                    border: `2px solid rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 0.6)`,
                    animation: "laser-reticle 2s linear infinite",
                  }}
                >
                  <div
                    className="absolute inset-2 border rounded-full"
                    style={{ borderColor: `rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 0.4)` }}
                  >
                    <div
                      className="absolute inset-2 border rounded-full"
                      style={{ borderColor: `rgba(${laserRgb.r}, ${laserRgb.g}, ${laserRgb.b}, 0.2)` }}
                    />
                  </div>
                </div>
              </>
            )}
            {/* Dark overlay */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-300"
              style={{
                background: isHovered
                  ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, transparent 0%, transparent ${(120 * intensity) / 8}px, rgba(0, 0, 0, 0.85) ${(120 * intensity) / 4}px)`
                  : "rgba(0, 0, 0, 0.85)",
                zIndex: 10,
              }}
            />
          </>
        )

      case "cosmic":
        return (
          <>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(138, 43, 226, 0.3) 0%, rgba(75, 0, 130, 0.2) 30%, rgba(25, 25, 112, 0.1) 60%, transparent 100%)`,
                filter: `blur(${3 + Math.sin(waveTimeRef.current * 0.02) * 2}px)`,
                animation: "cosmic-pulse 8s ease-in-out infinite",
              }}
            />
            {particles.length > 0 && (
              <div className="absolute inset-0 pointer-events-none">
                {particles.map((particle) => (
                  <div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                      left: `${particle.x}%`,
                      top: `${particle.y}%`,
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      transform: "translate(-50%, -50%)",
                      background: `radial-gradient(circle, ${particle.color} 0%, transparent 70%)`,
                      opacity: particle.life,
                      filter: `blur(${particle.size > 3 ? 2 : 0.5}px)`,
                      boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
                      animation: particle.size < 1 ? "twinkle 2s ease-in-out infinite" : undefined,
                    }}
                  />
                ))}
              </div>
            )}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `conic-gradient(from ${waveTimeRef.current * 0.5}deg at ${mousePos.x}% ${mousePos.y}%, rgba(255, 20, 147, 0.2) 0deg, rgba(138, 43, 226, 0.1) 120deg, rgba(75, 0, 130, 0.2) 240deg, rgba(255, 20, 147, 0.2) 360deg)`,
                filter: "blur(4px)",
                opacity: isHovered ? 0.8 : 0,
                transition: "opacity 1s ease",
              }}
            />
          </>
        )

      case "glitch":
        return isHovered ? (
          <>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, rgba(${glitch1Rgb.r}, ${glitch1Rgb.g}, ${glitch1Rgb.b}, 0.15) 0%, transparent 50%, rgba(${glitch2Rgb.r}, ${glitch2Rgb.g}, ${glitch2Rgb.b}, 0.15) 100%)`,
                transform: `translateX(${glitchOffset.x}px) translateY(${glitchOffset.y}px)`,
                mixBlendMode: "screen",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(45deg, rgba(${glitch1Rgb.r}, ${glitch1Rgb.g}, ${glitch1Rgb.b}, 0.1) 0%, rgba(${glitch2Rgb.r}, ${glitch2Rgb.g}, ${glitch2Rgb.b}, 0.1) 50%, transparent 100%)`,
                transform: `translateX(${-glitchOffset.x}px) translateY(${glitchOffset.y * 0.5}px)`,
                mixBlendMode: "multiply",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)",
                animation: "glitch-lines 0.1s linear infinite",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(${glitch1Rgb.r}, ${glitch1Rgb.g}, ${glitch1Rgb.b}, 0.1) 0%, rgba(${glitch2Rgb.r}, ${glitch2Rgb.g}, ${glitch2Rgb.b}, 0.05) 50%, transparent 100%)`,
                filter: "contrast(1.5) brightness(1.2)",
                animation: "glitch-noise 0.2s linear infinite",
              }}
            />
          </>
        ) : null

      case "liquid":
        return (
          <>
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-200 ease-out"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${isHovered ? 0.4 : 0.1}) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${isHovered ? 0.2 : 0.05}) 30%, transparent 70%)`,
                filter: `blur(${isHovered ? 20 : 10}px)`,
                transform: `scale(${isHovered ? 1.2 : 1})`,
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${isHovered ? 0.3 : 0}) 0%, transparent 50%)`,
                filter: "blur(40px)",
                opacity: isHovered ? 1 : 0,
              }}
            />
            {/* Ripples */}
            {ripples.map((ripple) => {
              const age = Date.now() - ripple.time
              const progress = Math.min(age / 1000, 1)
              const scale = 1 + progress * 3
              const opacity = 1 - progress
              return (
                <div
                  key={ripple.id}
                  className="absolute pointer-events-none rounded-full"
                  style={{
                    left: `${ripple.x}%`,
                    top: `${ripple.y}%`,
                    width: "20px",
                    height: "20px",
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity * 0.6}) 0%, transparent 70%)`,
                    filter: "blur(2px)",
                  }}
                />
              )
            })}
          </>
        )

      default:
        return null
    }
  }

  // Memoized container styles
  const containerStyles = useMemo(
    () => ({
      background: backgroundGradient,
      transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"],
      perspective: "1000px",
      filter: variant === "glitch" && isHovered ? `hue-rotate(${waveTimeRef.current * 2}deg) saturate(1.5)` : undefined,
    }),
    [backgroundGradient, isHovered, mousePos.x, mousePos.y, variant],
  )

  // Event listeners setup
  useEffect(() => {
    const container = containerRef.current
    if (!container || disabled) return

    container.addEventListener("mousemove", handleMouseMove, { passive: true })
    container.addEventListener("mouseenter", handleMouseEnter, { passive: true })
    container.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    if (variant === "liquid") {
      container.addEventListener("click", createRipple, { passive: true })
    }

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
      container.removeEventListener("click", createRipple)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, createRipple, variant, disabled])

  // Animation effect
  useEffect(() => {
    if (isHovered) animate()
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [animate, isHovered])

  // Ripple cleanup
  useEffect(() => {
    if (variant !== "liquid") return
    const interval = setInterval(() => {
      setRipples((prev) => prev.filter((ripple) => Date.now() - ripple.time < 1000))
    }, 100)
    return () => clearInterval(interval)
  }, [variant])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden backdrop-blur-sm cursor-pointer rounded-2xl p-6",
        "border border-white/10 transition-all duration-300 ease-out",
        !allowCustomBackground && "bg-black/20",
        isHovered && !disabled && "shadow-2xl",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      style={containerStyles}
    >
      {/* Render variant-specific effects */}
      {renderEffects()}

      {/* Universal Border Effects */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-all duration-200 rounded-2xl",
          className?.includes("rounded-") ? "" : "rounded-2xl",
        )}
        style={{
          background: getBorderGradient(),
          padding: "2px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          opacity: isHovered ? 1 : 0,
          filter: `blur(${isHovered ? 0 : 2}px)`,
        }}
      />

      {/* Enhanced Laser Border Glow */}
      {variant === "laser" && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-all duration-300 rounded-2xl",
            className?.includes("rounded-") ? "" : "rounded-2xl",
          )}
          style={{
            boxShadow: isHovered
              ? `
            0 0 15px rgba(${colorData.laserRgb.r}, ${colorData.laserRgb.g}, ${colorData.laserRgb.b}, 1),
            0 0 30px rgba(${colorData.laserRgb.r}, ${colorData.laserRgb.g}, ${colorData.laserRgb.b}, 0.9),
            0 0 45px rgba(${colorData.laserRgb.r}, ${colorData.laserRgb.g}, ${colorData.laserRgb.b}, 0.8),
            0 0 60px rgba(${colorData.laserRgb.r}, ${colorData.laserRgb.g}, ${colorData.laserRgb.b}, 0.7),
            0 0 80px rgba(${colorData.laserRgb.r}, ${colorData.laserRgb.g}, ${colorData.laserRgb.b}, 0.6),
            0 0 100px rgba(${colorData.laserRgb.r}, ${colorData.laserRgb.g}, ${colorData.laserRgb.b}, 0.5),
            inset 0 0 15px rgba(${colorData.laserRgb.r}, ${colorData.laserRgb.g}, ${colorData.laserRgb.b}, 0.6),
            inset 0 0 30px rgba(${colorData.laserRgb.r}, ${colorData.laserRgb.g}, ${colorData.laserRgb.b}, 0.4),
            inset 0 0 45px rgba(${colorData.laserRgb.r}, ${colorData.laserRgb.g}, ${colorData.laserRgb.b}, 0.2)
          `
              : "none",
            zIndex: 25,
          }}
        />
      )}

      {/* Enhanced Glitch Border Glow */}
      {variant === "glitch" && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-all duration-300 rounded-2xl",
            className?.includes("rounded-") ? "" : "rounded-2xl",
          )}
          style={{
            boxShadow: isHovered
              ? `
            0 0 20px rgba(${colorData.glitch1Rgb.r}, ${colorData.glitch1Rgb.g}, ${colorData.glitch1Rgb.b}, 0.8),
            0 0 40px rgba(${colorData.glitch2Rgb.r}, ${colorData.glitch2Rgb.g}, ${colorData.glitch2Rgb.b}, 0.6),
            0 0 60px rgba(${colorData.glitch1Rgb.r}, ${colorData.glitch1Rgb.g}, ${colorData.glitch1Rgb.b}, 0.4)
          `
              : "none",
            zIndex: 25,
          }}
        />
      )}

      <div
        className="relative z-30 transition-transform duration-200"
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes laser-pulse {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }
        
        @keyframes laser-reticle {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes cosmic-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes glitch-lines {
          0% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
          100% { transform: translateX(0); }
        }
        
        @keyframes glitch-noise {
          0% { opacity: 0.1; }
          10% { opacity: 0.2; }
          20% { opacity: 0.05; }
          30% { opacity: 0.15; }
          40% { opacity: 0.1; }
          50% { opacity: 0.25; }
          60% { opacity: 0.05; }
          70% { opacity: 0.2; }
          80% { opacity: 0.1; }
          90% { opacity: 0.15; }
          100% { opacity: 0.1; }
        }
      `}</style>
    </div>
  )
}
