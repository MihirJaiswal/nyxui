"use client"
import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import { motion } from "motion/react"
import { cn } from "../../lib/utils"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
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

const TEXT_SIZE_CLASSES = {
  sm: "text-sm",
  md: "text-base", 
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
} as const

const TEXT_SIZE_OFFSETS = {
  sm: 32, md: 36, lg: 40, xl: 40, "2xl": 44, "3xl": 48, "4xl": 52
} as const

export const LampHeading = ({
  text,
  className,
  gradientColors = { from: "#FF33C7", via: "#CD35FF", to: "#4533F7" },
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
  const gradientString = useMemo(() => 
    gradientColors.via
      ? `linear-gradient(90deg, ${gradientColors.from}, ${gradientColors.via}, ${gradientColors.to})`
      : `linear-gradient(90deg, ${gradientColors.from}, ${gradientColors.to})`,
    [gradientColors]
  )

  const isBelow = direction === "below"

  const generateParticles = useCallback(() => {
    if (!showParticles) return []
    
    return Array.from({ length: particleCount }, (_, i) => {
      const baseOpacity = Math.random() * 0.25 + 0.35
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.2 + 0.6,
        opacity: baseOpacity,
        baseOpacity,
        phase: Math.random() * Math.PI * 2,
        phaseMultiplier: Math.random() * 0.1 + 0.05,
        speedMultiplier: Math.random() * 0.008 + 0.004,
      }
    })
  }, [showParticles, particleCount])

  useEffect(() => {
    setParticles(generateParticles())
  }, [generateParticles])

  // Animate particles
  useEffect(() => {
    if (!showParticles || particles.length === 0) return

    const animateParticles = (currentTime: number) => {
      if (currentTime - lastUpdateRef.current < 100) {
        animationFrameRef.current = requestAnimationFrame(animateParticles)
        return
      }
      
      lastUpdateRef.current = currentTime
      const time = currentTime * 0.0005
      
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedMultiplier * 100) % 100,
        opacity: Math.max(0.15, Math.min(0.6, 
          particle.baseOpacity + Math.sin(time + particle.phase) * particle.phaseMultiplier
        ))
      })))
      
      animationFrameRef.current = requestAnimationFrame(animateParticles)
    }

    animationFrameRef.current = requestAnimationFrame(animateParticles)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [particles.length, showParticles])

  // Add particle animations to DOM
  useEffect(() => {
    if (!showParticles) return

    const style = document.createElement('style')
    style.textContent = particles.map(particle => `
      @keyframes particleFloat-${particle.id} {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
        33% { transform: translate3d(${Math.sin(particle.id) * 3}px, ${isBelow ? -8 : 8}px, 0) scale(1.05); }
        66% { transform: translate3d(${Math.sin(particle.id + 1) * 2}px, ${isBelow ? -4 : 4}px, 0) scale(0.95); }
      }
    `).join('')
    
    document.head.appendChild(style)
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [particles, showParticles, isBelow])

  // Create radial gradient helper
  const createRadialGradient = useCallback((opacities: string[], size = "120% 100%") => {
    const position = isBelow ? "center top" : "center bottom"
    const { from, via, to } = gradientColors
    
    // Match original gradient distribution
    const stops = opacities.map((opacity, i) => {
      const percentage = i === 0 ? 0 :
                        i === 1 ? 10 :
                        i === 2 ? 25 :
                        i === 3 ? 45 :
                        i === 4 ? 65 :
                        i === 5 ? 80 :
                        i === 6 ? 90 :
                        100
      
      const color = i === 0 ? from :
                   i === 1 && via ? via :
                   to
      
      return `${color}${opacity} ${percentage}%`
    }).join(', ')
    
    return `radial-gradient(ellipse ${size} at ${position}, ${stops})`
  }, [gradientColors, isBelow])

  // Animation variants
  const flowAnimation = useMemo(() => ({
    animate: {
      backgroundPosition: ["0% 50%", "200% 50%"],
      transition: {
        duration: animationSpeed,
        ease: "linear",
        repeat: Infinity,
      },
    },
  }), [animationSpeed])

  const pulseAnimation = useMemo(() => 
    pulseEffect ? {
      animate: {
        scale: [1, 1.02, 1],
        opacity: [0.95, 1, 0.95],
        transition: {
          duration: animationSpeed * 0.6,
          ease: "easeInOut",
          repeat: Infinity,
        },
      },
    } : {},
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
        repeat: Infinity,
        staggerChildren: 0.1,
      },
    },
  }), [animationSpeed])

  // Common style props
  const getPositionStyles = (top?: boolean) => ({
    top: (isBelow && top) || (!isBelow && !top) ? `${lineHeight}px` : "auto",
    bottom: (!isBelow && top) || (isBelow && !top) ? `${lineHeight}px` : "auto",
    transform: 'translate3d(0, 0, 0)',
    willChange: 'transform, opacity' as const,
  })

  // Render particles
  const renderParticles = () => {
    if (!showParticles) return null
    
    return (
      <div
        className="absolute pointer-events-none"
        style={{
          width: "100%",
          height: `${lampHeight + lineHeight + 20}px`,
          top: isBelow ? "0" : `-${lampHeight + 10}px`,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'contents',
        }}
      >
        {particles.map((particle) => (
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
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform, opacity',
              animation: `particleFloat-${particle.id} ${2.5 + particle.id * 0.2}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    )
  }

  // Render light rays
  const renderLightRays = () => {
    if (!showLightRays) return null

    const gradientDirection = isBelow ? "to bottom" : "to top"
    const createLightGradient = (opacities: string[]) => {
      const { from, via, to } = gradientColors
      const stops = [
        `${from}${opacities[0]} 0%`,
        `${from}${opacities[1]} 8%`,
        `${via || from}${opacities[2]} 18%`,
        `${to}${opacities[3]} 30%`,
        `${to}${opacities[4]} 45%`,
        `${to}${opacities[5]} 65%`,
        `${to}${opacities[6]} 80%`,
        `${to}${opacities[7]} 90%`,
      ].join(', ')
      return `linear-gradient(${gradientDirection}, ${stops}, transparent 100%)`
    }

    return (
      <div className="absolute inset-0 pointer-events-none">
        {/* Main rays */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            variants={lightRayVariants}
            animate="animate"
            className="absolute"
            style={{
              left: `${3 + i * 12}%`,
              width: `${1.5 + Math.sin(i * 0.5) * 0.8}px`,
              height: `${lampHeight * 0.6 + Math.sin(i) * 15}px`,
              background: createLightGradient(['DD', 'BB', '99', '77', '44', '22', '11', '05']),
              ...getPositionStyles(true),
              transformOrigin: isBelow ? "top" : "bottom",
              borderRadius: "50px",
              filter: `blur(${0.4 + Math.sin(i) * 0.2}px)`,
              opacity: 0.6 + Math.sin(i * 0.3) * 0.15,
            }}
            transition={{ delay: i * 0.04 }}
          />
        ))}
        
        {/* Soft rays */}
        {Array.from({ length: 4 }, (_, i) => (
          <motion.div
            key={`soft-${i}`}
            variants={lightRayVariants}
            animate="animate"
            className="absolute"
            style={{
              left: `${8 + i * 20}%`,
              width: `${2.0 + Math.cos(i * 0.7)}px`,
              height: `${lampHeight * 0.4 + Math.cos(i) * 12}px`,
              background: createLightGradient(['88', '66', '44', '22', '11']),
              ...getPositionStyles(true),
              transformOrigin: isBelow ? "top" : "bottom",
              borderRadius: "50px",
              filter: `blur(${1.2 + Math.cos(i) * 0.4}px)`,
              opacity: 0.3 + Math.cos(i * 0.4) * 0.15,
            }}
            transition={{
              delay: i * 0.08,
              duration: animationSpeed * 1.2,
            }}
          />
        ))}
      </div>
    )
  }

  // Lamp cone layers configuration
  const lampLayers = [
    { 
      width: "100%", 
      height: lampHeight, 
      left: "0", 
      opacity: 0.8, 
      blur: glowSize * 1.2, 
      opacities: ['BB', '99', '77', '55', '33', '22', '11'], 
      duration: 1,
      size: "120% 100%"
    },
    { 
      width: "95%", 
      height: lampHeight * 0.8, 
      left: "2.5%", 
      opacity: 0.9, 
      blur: glowSize * 0.8, 
      opacities: ['DD', 'BB', '99', '66', '44', '22'], 
      duration: 0.9,
      size: "110% 100%"
    },
    { 
      width: "85%", 
      height: lampHeight * 0.6, 
      left: "7.5%", 
      opacity: 1.0, 
      blur: glowSize * 0.4, 
      opacities: ['EE', 'DD', 'BB', '88', '55'], 
      duration: 1.1,
      size: "100% 100%"
    },
  ]

  return (
    <motion.div
      ref={containerRef}
      className={cn("flex flex-col items-start relative overflow-visible", className)}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      <h2 className={cn("font-bold tracking-wide relative z-20 mb-3", className, TEXT_SIZE_CLASSES[textSize])}>
        {text}
      </h2>
      
      <div className="w-full relative">
        {renderParticles()}
        {renderLightRays()}

        {/* Lamp cone layers */}
        {lampLayers.map((layer, index) => (
          <motion.div
            key={index}
            variants={flowAnimation}
            animate="animate"
            style={{
              position: "absolute",
              width: layer.width,
              height: `${layer.height}px`,
              left: layer.left,
              background: createRadialGradient(layer.opacities, layer.size),
              ...getPositionStyles(true),
              filter: `blur(${layer.blur}px)`,
              opacity: layer.opacity * glowIntensity * (isHovered ? (index === 0 ? 1.4 : index === 1 ? 1.3 : 1.2) : 1),
            }}
            transition={{ duration: animationSpeed * layer.duration }}
          />
        ))}

        {/* Core light beam */}
        <motion.div
          variants={flowAnimation}
          animate="animate"
          className="hidden dark:block opacity-20"
          style={{
            position: "absolute",
            width: "70%",
            height: `${lampHeight * 0.2}px`,
            left: "15%",
            background: `linear-gradient(${isBelow ? 'to bottom' : 'to top'}, ${gradientColors.from}FF 0%, ${gradientColors.via || gradientColors.from}EE 10%, ${gradientColors.to}DD 25%, ${gradientColors.to}BB 45%, ${gradientColors.to}88 65%, ${gradientColors.to}44 85%, transparent 100%)`,
            ...getPositionStyles(true),
            filter: `blur(${glowSize * 0.2}px)`,
            opacity: glowIntensity * (isHovered ? 1.1 : 1),
          }}
          transition={{ duration: animationSpeed * 1.3 }}
        />

        {/* Main gradient underline */}
        <motion.div
          variants={flowAnimation}
          animate="animate"
          {...pulseAnimation}
          className="w-full"
          style={{
            height: `${lineHeight}px`,
            background: gradientString,
            backgroundSize: "200% 100%",
            borderRadius: "50px",
            boxShadow: `0 0 ${glowSize}px ${gradientColors.from}80, 0 0 ${glowSize * 2}px ${gradientColors.to}40, 0 0 ${glowSize * 3}px ${gradientColors.from}20`,
            position: "relative",
            zIndex: 10,
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform, opacity',
          }}
        />

        {/* Inner highlight */}
        <motion.div
          variants={flowAnimation}
          animate="animate"
          className="bg-gradient-to-b from-white via-white/50 to-transparent"
          style={{
            height: `${Math.max(1, lineHeight * 0.1)}px`,
            width: "98%",
            position: "absolute",
            top: "0px",
            left: "1%",
            zIndex: 15,
            borderRadius: "100px",
            backgroundSize: "200% 100%",
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
          }}
          transition={{ duration: animationSpeed * 0.8 }}
        />
      </div>

      {/* Ambient background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "100%",
          height: `${lampHeight + lineHeight + 60}px`,
          left: "0%",
          top: isBelow 
            ? `${TEXT_SIZE_OFFSETS[textSize]}px`
            : `-${lampHeight + (TEXT_SIZE_OFFSETS[textSize] - 24)}px`,
          background: `radial-gradient(ellipse 100% 70% at center ${isBelow ? `${lineHeight}px` : `calc(100% - ${lineHeight + 10}px)`}, ${gradientColors.from}25 0%, ${gradientColors.via || gradientColors.to}20 25%, ${gradientColors.to}15 50%, ${gradientColors.to}10 70%, ${gradientColors.to}05 85%, transparent 100%)`,
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