"use client"
import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
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
}: LampHeadingProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [isHovered, setIsHovered] = useState(false)

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
  }

  // Generate particles
  useEffect(() => {
    if (!showParticles) return
    const generateParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2, // Increased size
          opacity: Math.random() * 0.4 + 1, // Increased opacity
          speed: Math.random() * 2 + 0.5,
        })
      }
      setParticles(newParticles)
    }
    generateParticles()
  }, [showParticles])

  // Animate particles
  useEffect(() => {
    if (!showParticles || particles.length === 0) return
    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.speed * 0.03) % 100,
          opacity: 0.4 + Math.sin(Date.now() * 0.001 + particle.id) * 0.3, // Increased base opacity
        })),
      )
    }
    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [particles.length, showParticles])

  const gradientString = gradientColors.via
    ? `linear-gradient(90deg, ${gradientColors.from}, ${gradientColors.via}, ${gradientColors.to})`
    : `linear-gradient(90deg, ${gradientColors.from}, ${gradientColors.to})`

  // Updated flow animation for left to right movement
  const flowAnimation = {
    animate: {
      backgroundPosition: ["0% 50%", "200% 50%"],
      transition: {
        duration: animationSpeed,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  const pulseAnimation = pulseEffect
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
    : {}

  const lightRayVariants = {
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
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn("flex flex-col items-start relative overflow-visible", className)}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      {/* Regular Text (No gradient) */}
      <h2 className={cn("font-bold tracking-wide relative z-20 mb-3", className, textSizeClasses[textSize])}>{text}</h2>

      {/* Lamp Container */}
      <div className="w-full relative">
        {/* Enhanced Floating Particles */}
        {showParticles && (
          <div
            className="absolute pointer-events-none"
            style={{
              width: "100%",
              height: `${lampHeight + lineHeight + 20}px`,
              top: direction === "below" ? "0" : `-${lampHeight + 10}px`,
            }}
          >
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  background: gradientString,
                  opacity: particle.opacity,
                  filter: "blur(0.5px)",
                  boxShadow: `0 0 ${particle.size * 2}px ${gradientColors.from}40`,
                }}
                animate={{
                  y: direction === "below" ? [0, -20, 0] : [0, 20, 0],
                  opacity: [particle.opacity, particle.opacity * 0.7, particle.opacity],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + particle.id * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Improved Light Rays emerging from underline */}
        {showLightRays && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                variants={lightRayVariants}
                animate="animate"
                className="absolute"
                style={{
                  left: `${2 + i * 6.5}%`,
                  width: `${1.5 + Math.sin(i * 0.5) * 1}px`,
                  height: `${lampHeight * 0.7 + Math.sin(i) * 20}px`,
                  background:
                    direction === "below"
                      ? `linear-gradient(to bottom,
         ${gradientColors.from}EE 0%,
         ${gradientColors.from}CC 8%,
         ${gradientColors.via || gradientColors.from}AA 18%,
         ${gradientColors.to}88 30%,
         ${gradientColors.to}55 45%,
         ${gradientColors.to}33 65%,
         ${gradientColors.to}18 80%,
         ${gradientColors.to}08 90%,
         transparent 100%)`
                      : `linear-gradient(to top,
         ${gradientColors.from}EE 0%,
         ${gradientColors.from}CC 8%,
         ${gradientColors.via || gradientColors.from}AA 18%,
         ${gradientColors.to}88 30%,
         ${gradientColors.to}55 45%,
         ${gradientColors.to}33 65%,
         ${gradientColors.to}18 80%,
         ${gradientColors.to}08 90%,
         transparent 100%)`,
                  top: direction === "below" ? `${lineHeight}px` : "auto",
                  bottom: direction === "above" ? `${lineHeight}px` : "auto",
                  transformOrigin: direction === "below" ? "top" : "bottom",
                  borderRadius: "50px",
                  filter: `blur(${0.5 + Math.sin(i) * 0.3}px)`,
                  opacity: 0.7 + Math.sin(i * 0.3) * 0.2,
                }}
                transition={{
                  delay: i * 0.03,
                }}
              />
            ))}
            {/* Additional softer rays for depth */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`soft-${i}`}
                variants={lightRayVariants}
                animate="animate"
                className="absolute"
                style={{
                  left: `${5 + i * 9}%`,
                  width: `${2.5 + Math.cos(i * 0.7) * 1.2}px`,
                  height: `${lampHeight * 0.5 + Math.cos(i) * 15}px`,
                  background:
                    direction === "below"
                      ? `linear-gradient(to bottom,
         ${gradientColors.from}99 0%,
         ${gradientColors.via || gradientColors.from}77 15%,
         ${gradientColors.to}55 35%,
         ${gradientColors.to}33 55%,
         ${gradientColors.to}18 75%,
         transparent 100%)`
                      : `linear-gradient(to top,
         ${gradientColors.from}99 0%,
         ${gradientColors.via || gradientColors.from}77 15%,
         ${gradientColors.to}55 35%,
         ${gradientColors.to}33 55%,
         ${gradientColors.to}18 75%,
         transparent 100%)`,
                  top: direction === "below" ? `${lineHeight}px` : "auto",
                  bottom: direction === "above" ? `${lineHeight}px` : "auto",
                  transformOrigin: direction === "below" ? "top" : "bottom",
                  borderRadius: "50px",
                  filter: `blur(${1.5 + Math.cos(i) * 0.5}px)`,
                  opacity: 0.4 + Math.cos(i * 0.4) * 0.2,
                }}
                transition={{
                  delay: i * 0.06,
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
          }}
          className="w-full"
        />

        {/* Subtle Inner Highlight on Underline (reduced opacity) */}
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
        }}
      />
    </motion.div>
  )
}

export default LampHeading
