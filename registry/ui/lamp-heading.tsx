"use client"
import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  baseOpacity: number
  phase: number
  phaseMultiplier: number
  speedMultiplier: number
}

interface LampHeadingProps {
  text: string
  className?: string
  gradientColors?: {
    from: string
    via?: string
    to: string
  }
  lineHeight?: number
  lampHeight?: number
  glowIntensity?: number
  glowSize?: number
  animationSpeed?: number
  direction?: "above" | "below"
  showParticles?: boolean
  showLightRays?: boolean
  interactive?: boolean
  textSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
  pulseEffect?: boolean
  particleCount?: number
}

export const LampHeading = ({
  text,
  className,
  gradientColors = {
    from: "#FF33C7",
    via: "#CD35FF",
    to: "#4533F7",
  },
  lineHeight = 4,
  lampHeight = 80,
  glowIntensity = 1.0,
  glowSize = 30,
  animationSpeed = 4,
  direction = "below",
  showParticles = true,
  showLightRays = false,
  interactive = true,
  textSize = "4xl",
  pulseEffect = true,
  particleCount = 8, 
}: LampHeadingProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [isHovered, setIsHovered] = useState(false)
  const animationFrameRef = useRef<number | null>(null)
  const lastUpdateRef = useRef<number>(0)
  const particleUpdateInterval = useRef<number>(100)

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
  }

  const gradientString = useMemo(() => 
    gradientColors.via
      ? `linear-gradient(90deg, ${gradientColors.from}, ${gradientColors.via}, ${gradientColors.to})`
      : `linear-gradient(90deg, ${gradientColors.from}, ${gradientColors.to})`,
    [gradientColors.from, gradientColors.via, gradientColors.to]
  )

  const generateParticles = useCallback(() => {
    if (!showParticles) return []
    
    const newParticles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      const baseOpacity = Math.random() * 0.25 + 0.35 
      const phase = Math.random() * Math.PI * 2
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.2 + 0.6,
        opacity: baseOpacity,
        speed: Math.random() * 1.0 + 0.2, 
        baseOpacity,
        phase,
        phaseMultiplier: Math.random() * 0.1 + 0.05, 
        speedMultiplier: Math.random() * 0.008 + 0.004, 
      })
    }
    return newParticles
  }, [showParticles, particleCount])

  useEffect(() => {
    setParticles(generateParticles())
  }, [generateParticles])

  useEffect(() => {
    if (!showParticles || particles.length === 0) return

    const animateParticles = (currentTime: number) => {
      if (currentTime - lastUpdateRef.current < particleUpdateInterval.current) {
        animationFrameRef.current = requestAnimationFrame(animateParticles)
        return
      }
      
      lastUpdateRef.current = currentTime
      const time = currentTime * 0.0005 
      
      setParticles(prev => {
        const updated = []
        for (let i = 0; i < prev.length; i++) {
          const particle = prev[i]
          const newX = (particle.x + particle.speedMultiplier * 100) % 100
          const newOpacity = particle.baseOpacity + Math.sin(time + particle.phase) * particle.phaseMultiplier
          
          updated.push({
            ...particle,
            x: newX,
            opacity: Math.max(0.15, Math.min(0.6, newOpacity))
          })
        }
        return updated
      })
      
      animationFrameRef.current = requestAnimationFrame(animateParticles)
    }

    animationFrameRef.current = requestAnimationFrame(animateParticles)
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [particles.length, showParticles])

  const flowAnimation = useMemo(() => ({
    animate: {
      backgroundPosition: ["0% 50%", "200% 50%"],
      transition: {
        duration: animationSpeed,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }), [animationSpeed])

  const pulseAnimation = useMemo(() => 
    pulseEffect
      ? {
          animate: {
            scale: [1, 1.02, 1],
            opacity: [0.95, 1, 0.95],
            transition: {
              duration: animationSpeed * 0.6,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            },
          },
        }
      : {},
    [pulseEffect, animationSpeed]
  )

  const lightRayVariants = useMemo(() => ({
    animate: {
      opacity: [0.6, 1, 0.6],
      scaleY: [0.95, 1.15, 0.95],
      scaleX: [1, 1.05, 1],
      transition: {
        duration: animationSpeed * 1.2,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        staggerChildren: 0.1,
      },
    },
  }), [animationSpeed])

  const particleElements = useMemo(() => {
    if (!showParticles) return null
    
    return particles.map((particle) => (
      <div
        key={particle.id}
        className="absolute rounded-full pointer-events-none"
        style={{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          background: gradientString,
          opacity: particle.opacity,
          filter: "blur(0.3px)",
          boxShadow: `0 0 ${particle.size * 1.5}px ${gradientColors.from}30`, 
          transform: `translate3d(0, 0, 0)`, 
          willChange: 'transform, opacity', 
          animation: `particleFloat-${particle.id} ${2.5 + particle.id * 0.2}s ease-in-out infinite`,
        }}
      />
    ))
  }, [particles, showParticles, gradientString, gradientColors.from])

  useEffect(() => {
    if (!showParticles) return

    const style = document.createElement('style')
    style.textContent = particles.map(particle => `
      @keyframes particleFloat-${particle.id} {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
        33% { transform: translate3d(${Math.sin(particle.id) * 3}px, ${direction === "below" ? -8 : 8}px, 0) scale(1.05); }
        66% { transform: translate3d(${Math.sin(particle.id + 1) * 2}px, ${direction === "below" ? -4 : 4}px, 0) scale(0.95); }
      }
    `).join('')
    
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [particles, showParticles, direction])

  return (
    <motion.div
      ref={containerRef}
      className={cn("flex flex-col items-start relative overflow-visible", className)}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      <h2 className={cn("font-bold tracking-wide relative z-20 mb-3", className, textSizeClasses[textSize])}>{text}</h2>
      <div className="w-full relative">
        {showParticles && (
          <div
            className="absolute pointer-events-none"
            style={{
              width: "100%",
              height: `${lampHeight + lineHeight + 20}px`,
              top: direction === "below" ? "0" : `-${lampHeight + 10}px`,
              transform: 'translate3d(0, 0, 0)', 
              willChange: 'contents',
            }}
          >
            {particleElements}
          </div>
        )}

        {showLightRays && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => ( 
              <motion.div
                key={i}
                variants={lightRayVariants}
                animate="animate"
                className="absolute"
                style={{
                  left: `${3 + i * 12}%`,
                  width: `${1.5 + Math.sin(i * 0.5) * 0.8}px`,
                  height: `${lampHeight * 0.6 + Math.sin(i) * 15}px`,
                  background:
                    direction === "below"
                      ? `linear-gradient(to bottom,
         ${gradientColors.from}DD 0%,
         ${gradientColors.from}BB 8%,
         ${gradientColors.via || gradientColors.from}99 18%,
         ${gradientColors.to}77 30%,
         ${gradientColors.to}44 45%,
         ${gradientColors.to}22 65%,
         ${gradientColors.to}11 80%,
         ${gradientColors.to}05 90%,
         transparent 100%)`
                      : `linear-gradient(to top,
         ${gradientColors.from}DD 0%,
         ${gradientColors.from}BB 8%,
         ${gradientColors.via || gradientColors.from}99 18%,
         ${gradientColors.to}77 30%,
         ${gradientColors.to}44 45%,
         ${gradientColors.to}22 65%,
         ${gradientColors.to}11 80%,
         ${gradientColors.to}05 90%,
         transparent 100%)`,
                  top: direction === "below" ? `${lineHeight}px` : "auto",
                  bottom: direction === "above" ? `${lineHeight}px` : "auto",
                  transformOrigin: direction === "below" ? "top" : "bottom",
                  borderRadius: "50px",
                  filter: `blur(${0.4 + Math.sin(i) * 0.2}px)`,
                  opacity: 0.6 + Math.sin(i * 0.3) * 0.15,
                  transform: 'translate3d(0, 0, 0)',
                  willChange: 'transform, opacity',
                }}
                transition={{
                  delay: i * 0.04,
                }}
              />
            ))}
            {[...Array(4)].map((_, i) => ( 
              <motion.div
                key={`soft-${i}`}
                variants={lightRayVariants}
                animate="animate"
                className="absolute"
                style={{
                  left: `${8 + i * 20}%`,
                  width: `${2.0 + Math.cos(i * 0.7) * 1.0}px`,
                  height: `${lampHeight * 0.4 + Math.cos(i) * 12}px`,
                  background:
                    direction === "below"
                      ? `linear-gradient(to bottom,
         ${gradientColors.from}88 0%,
         ${gradientColors.via || gradientColors.from}66 15%,
         ${gradientColors.to}44 35%,
         ${gradientColors.to}22 55%,
         ${gradientColors.to}11 75%,
         transparent 100%)`
                      : `linear-gradient(to top,
         ${gradientColors.from}88 0%,
         ${gradientColors.via || gradientColors.from}66 15%,
         ${gradientColors.to}44 35%,
         ${gradientColors.to}22 55%,
         ${gradientColors.to}11 75%,
         transparent 100%)`,
                  top: direction === "below" ? `${lineHeight}px` : "auto",
                  bottom: direction === "above" ? `${lineHeight}px` : "auto",
                  transformOrigin: direction === "below" ? "top" : "bottom",
                  borderRadius: "50px",
                  filter: `blur(${1.2 + Math.cos(i) * 0.4}px)`,
                  opacity: 0.3 + Math.cos(i * 0.4) * 0.15,
                  transform: 'translate3d(0, 0, 0)',
                  willChange: 'transform, opacity',
                }}
                transition={{
                  delay: i * 0.08,
                  duration: animationSpeed * 1.2,
                }}
              />
            ))}
          </div>
        )}

        {/* Main Lamp Cone - Outer Layer */}
        <motion.div
          variants={flowAnimation}
          animate="animate"
          style={{
            position: "absolute",
            width: "100%",
            height: `${lampHeight}px`,
            background:
              direction === "below"
                ? `radial-gradient(ellipse 120% 100% at center top,
                   ${gradientColors.from}BB 0%,
                   ${gradientColors.via || gradientColors.from}99 10%,
                   ${gradientColors.to}77 25%,
                   ${gradientColors.to}55 45%,
                   ${gradientColors.to}33 65%,
                   ${gradientColors.to}22 80%,
                   ${gradientColors.to}11 90%,
                   transparent 100%)`
                : `radial-gradient(ellipse 120% 100% at center bottom,
                   ${gradientColors.from}BB 0%,
                   ${gradientColors.via || gradientColors.from}99 10%,
                   ${gradientColors.to}77 25%,
                   ${gradientColors.to}55 45%,
                   ${gradientColors.to}33 65%,
                   ${gradientColors.to}22 80%,
                   ${gradientColors.to}11 90%,
                   transparent 100%)`,
            top: direction === "below" ? `${lineHeight}px` : "auto",
            bottom: direction === "above" ? `${lineHeight}px` : "auto",
            left: 0,
            filter: `blur(${glowSize * 1.2}px)`,
            opacity: glowIntensity * 0.8 * (isHovered ? 1.4 : 1),
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform, opacity',
          }}
        />

        {/* Middle Lamp Cone */}
        <motion.div
          variants={flowAnimation}
          animate="animate"
          style={{
            position: "absolute",
            width: "95%",
            height: `${lampHeight * 0.8}px`,
            background:
              direction === "below"
                ? `radial-gradient(ellipse 110% 100% at center top,
                   ${gradientColors.from}DD 0%,
                   ${gradientColors.via || gradientColors.from}BB 15%,
                   ${gradientColors.to}99 35%,
                   ${gradientColors.to}66 55%,
                   ${gradientColors.to}44 75%,
                   ${gradientColors.to}22 90%,
                   transparent 100%)`
                : `radial-gradient(ellipse 110% 100% at center bottom,
                   ${gradientColors.from}DD 0%,
                   ${gradientColors.via || gradientColors.from}BB 15%,
                   ${gradientColors.to}99 35%,
                   ${gradientColors.to}66 55%,
                   ${gradientColors.to}44 75%,
                   ${gradientColors.to}22 90%,
                   transparent 100%)`,
            top: direction === "below" ? `${lineHeight}px` : "auto",
            bottom: direction === "above" ? `${lineHeight}px` : "auto",
            left: "2.5%",
            filter: `blur(${glowSize * 0.8}px)`,
            opacity: glowIntensity * 0.9 * (isHovered ? 1.3 : 1),
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform, opacity',
          }}
          transition={{
            duration: animationSpeed * 0.9,
          }}
        />

        {/* Inner Lamp Cone */}
        <motion.div
          variants={flowAnimation}
          animate="animate"
          style={{
            position: "absolute",
            width: "85%",
            height: `${lampHeight * 0.6}px`,
            background:
              direction === "below"
                ? `radial-gradient(ellipse 100% 100% at center top,
                   ${gradientColors.from}EE 0%,
                   ${gradientColors.via || gradientColors.from}DD 20%,
                   ${gradientColors.to}BB 40%,
                   ${gradientColors.to}88 60%,
                   ${gradientColors.to}55 80%,
                   transparent 100%)`
                : `radial-gradient(ellipse 100% 100% at center bottom,
                   ${gradientColors.from}EE 0%,
                   ${gradientColors.via || gradientColors.from}DD 20%,
                   ${gradientColors.to}BB 40%,
                   ${gradientColors.to}88 60%,
                   ${gradientColors.to}55 80%,
                   transparent 100%)`,
            top: direction === "below" ? `${lineHeight}px` : "auto",
            bottom: direction === "above" ? `${lineHeight}px` : "auto",
            left: "7.5%",
            filter: `blur(${glowSize * 0.4}px)`,
            opacity: glowIntensity * 1.0 * (isHovered ? 1.2 : 1),
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform, opacity',
          }}
          transition={{
            duration: animationSpeed * 1.1,
          }}
        />

        {/* Core Light Beam */}
        <motion.div
          variants={flowAnimation}
          animate="animate"
          className="hidden dark:block opacity-20"
          style={{
            position: "absolute",
            width: "70%",
            height: `${lampHeight * 0.2}px`,
            background:
              direction === "below"
                ? `linear-gradient(to bottom,
           ${gradientColors.from}FF 0%,
           ${gradientColors.via || gradientColors.from}EE 10%,
           ${gradientColors.to}DD 25%,
           ${gradientColors.to}BB 45%,
           ${gradientColors.to}88 65%,
           ${gradientColors.to}44 85%,
           transparent 100%)`
                : `linear-gradient(to top,
           ${gradientColors.from}FF 0%,
           ${gradientColors.via || gradientColors.from}EE 10%,
           ${gradientColors.to}DD 25%,
           ${gradientColors.to}BB 45%,
           ${gradientColors.to}88 65%,
           ${gradientColors.to}44 85%,
           transparent 100%)`,
            top: direction === "below" ? `${lineHeight}px` : "auto",
            bottom: direction === "above" ? `${lineHeight}px` : "auto",
            left: "15%",
            filter: `blur(${glowSize * 0.2}px)`,
            opacity: glowIntensity * 1.0 * (isHovered ? 1.1 : 1),
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform, opacity',
          }}
          transition={{
            duration: animationSpeed * 1.3,
          }}
        />

        {/* Animated Gradient Underline - The Light Source */}
        <motion.div
          variants={flowAnimation}
          animate="animate"
          {...pulseAnimation}
          style={{
            height: `${lineHeight}px`,
            background: gradientString,
            backgroundSize: "200% 100%",
            borderRadius: "50px",
            boxShadow: `
              0 0 ${glowSize}px ${gradientColors.from}80, 
              0 0 ${glowSize * 2}px ${gradientColors.to}40,
              0 0 ${glowSize * 3}px ${gradientColors.from}20
            `,
            position: "relative",
            zIndex: 10,
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform, opacity',
          }}
          className="w-full"
        />

        {/* Subtle Inner Highlight on Underline */}
        <motion.div
          variants={flowAnimation}
          animate="animate"
          className="bg-gradient-to-b from-white via-white/50 to-transparent"
          style={{
            height: `${Math.max(1, lineHeight * 0.1)}px`,
            width: "98%",
            position: "absolute",
            top: `0px`,
            left: "1%",
            right: "0",
            zIndex: 15,
            borderRadius: "100px",
            backgroundSize: "200% 100%",
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
          }}
          transition={{
            duration: animationSpeed * 0.8,
          }}
        />
      </div>

      {/* Ambient Background Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "100%",
          height: `${lampHeight + lineHeight + 60}px`,
          left: "0%",
          top: direction === "below"
            ? `${textSize === "sm" ? 32 :
              textSize === "md" ? 36 :
                textSize === "lg" ? 40 :
                  textSize === "xl" ? 40 :
                    textSize === "2xl" ? 44 :
                      textSize === "3xl" ? 48 : 52}px`
            : `-${lampHeight + (textSize === "sm" ? 32 :
              textSize === "md" ? 28 :
                textSize === "lg" ? 24 :
                  textSize === "xl" ? 24 :
                    textSize === "2xl" ? 16 :
                      textSize === "3xl" ? 12 : 8)}px`,
          background:
            direction === "below"
              ? `radial-gradient(ellipse 100% 70% at center ${lineHeight}px,
           ${gradientColors.from}25 0%,
           ${gradientColors.via || gradientColors.to}20 25%,
           ${gradientColors.to}15 50%,
           ${gradientColors.to}10 70%,
           ${gradientColors.to}05 85%,
           transparent 100%)`
              : `radial-gradient(ellipse 100% 70% at center calc(100% - ${lineHeight + 10}px),
           ${gradientColors.from}25 0%,
           ${gradientColors.via || gradientColors.to}20 25%,
           ${gradientColors.to}15 50%,
           ${gradientColors.to}10 70%,
           ${gradientColors.to}05 85%,
           transparent 100%)`,
          opacity: isHovered ? 0.9 : 0.6,
          transition: "opacity 0.4s ease",
          transform: 'translate3d(0, 0, 0)',
          willChange: 'opacity',
        }}
      />
    </motion.div>
  )
}

export default LampHeading