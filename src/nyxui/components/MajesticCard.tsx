"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  MotionProps, 
  HTMLMotionProps,
} from "framer-motion"

export interface MajesticCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  variant?: "parallax" | "tilt" | "float" | "magnetic" | "layered" | "morph" | "breathe" | "glow" | "wave"
  intensity?: 1 | 2 | 3 | 4 | 5
  theme?: "light" | "dark" | "glass" | "gradient" | "neon" | "cosmic" | "custom"
  customColors?: {
    background: string
    border?: string
    shadow?: string
    glow?: string
  }
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full" | "pill"
  shadow?: boolean
  shadowSize?: "sm" | "md" | "lg" | "xl" | "2xl"
  shadowType?: "standard" | "soft" | "hard" | "inner" | "glow"
  border?: boolean
  borderStyle?: "solid" | "dashed" | "dotted" | "gradient" | "glow"
  hoverEffect?: boolean
  scrollEffect?: boolean
  reduceMotion?: boolean
  confettiEffect?: boolean
  speed?: "slow" | "normal" | "fast"
  blurBackground?: boolean
  layerCount?: 1 | 2 | 3 | 4 | 5
  layerSeparation?: 1 | 2 | 3 | 4 | 5
  floatPattern?: "simple" | "complex" | "random" | "sine" | "circle"
  children: React.ReactNode
}

export function MajesticCard({
  variant = "tilt",
  intensity = 3,
  theme = "light",
  customColors,
  rounded = "lg",
  shadow = true,
  shadowSize = "md",
  shadowType = "standard",
  border = false,
  borderStyle = "solid",
  hoverEffect = true,
  scrollEffect = false,
  reduceMotion = false,
  confettiEffect = false,
  speed = "normal",
  blurBackground = false,
  layerCount = 3,
  layerSeparation = 2,
  floatPattern = "simple",
  className,
  children,
  ...props
}: MajesticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [layers, setLayers] = useState<HTMLElement[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showConfetti, setShowConfetti] = useState(false)
  const [generatedLayers, setGeneratedLayers] = useState<React.ReactNode[]>([])
  const [floatPhase, setFloatPhase] = useState(0)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const scale = useMotionValue(1)
  const floatY = useMotionValue(0)
  const floatX = useMotionValue(0)
  const rotate = useMotionValue(0)
  
  const springConfig = {
    stiffness: speed === "fast" ? 700 : speed === "slow" ? 200 : 400,
    damping: speed === "fast" ? 20 : speed === "slow" ? 40 : 30,
  }
  
  const floatSpringConfig = {
    stiffness: 50,
    damping: 30,
    mass: 1.5,
  }
  
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)
  const springScale = useSpring(scale, springConfig)
  const springFloatY = useSpring(floatY, floatSpringConfig)
  const springFloatX = useSpring(floatX, floatSpringConfig)
  const springRotate = useSpring(rotate, {
    stiffness: 60,
    damping: 20,
    mass: 1,
  })
  
  const borderRadius = useTransform(
    springScale,
    [1, 1.05],
    [getBaseRadius(), variant === "morph" && isHovered ? "40% 60% 60% 40% / 60% 30% 70% 40%" : getBaseRadius()]
  )

  function getBaseRadius() {
    switch (rounded) {
      case "none": return "0px";
      case "sm": return "0.125rem";
      case "md": return "0.375rem";
      case "lg": return "0.5rem";
      case "xl": return "0.75rem";
      case "full": return "9999px";
      case "pill": return "9999px";
      default: return "0.5rem";
    }
  }

  const themeStyles = {
    light: {
      background: "bg-white dark:bg-gray-800",
      border: "border-gray-200 dark:border-gray-700",
      shadow: "shadow-gray-200/70 dark:shadow-gray-900/70",
      glow: "shadow-white/20 dark:shadow-white/10",
    },
    dark: {
      background: "bg-gray-900 dark:bg-gray-950 text-white",
      border: "border-gray-800 dark:border-gray-900",
      shadow: "shadow-gray-900/50 dark:shadow-black/50",
      glow: "shadow-gray-800/30 dark:shadow-gray-800/20",
    },
    glass: {
      background: "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md",
      border: "border-white/20 dark:border-gray-800/20",
      shadow: "shadow-gray-200/50 dark:shadow-gray-900/50",
      glow: "shadow-white/30 dark:shadow-gray-700/30",
    },
    gradient: {
      background: "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900",
      border: "border-blue-100 dark:border-gray-700",
      shadow: "shadow-blue-200/50 dark:shadow-gray-900/50",
      glow: "shadow-blue-300/50 dark:shadow-blue-900/30",
    },
    neon: {
      background: "bg-gray-950 text-white",
      border: "border-indigo-500",
      shadow: "shadow-indigo-500/50",
      glow: "shadow-indigo-500/70",
    },
    cosmic: {
      background: "bg-gradient-to-br from-purple-900 via-violet-800 to-blue-900 text-white",
      border: "border-purple-500/30",
      shadow: "shadow-purple-700/50",
      glow: "shadow-purple-500/70",
    },
    custom: {
      background: customColors?.background ? `bg-[${customColors.background}]` : "bg-white",
      border: customColors?.border ? `border-[${customColors.border}]` : "border-gray-200",
      shadow: customColors?.shadow ? `shadow-[${customColors.shadow}]` : "shadow-gray-200",
      glow: customColors?.glow ? `shadow-[${customColors.glow}]` : "shadow-white/20",
    },
  }

  const currentTheme = themeStyles[theme]

  const getBorderStyles = () => {
    if (!border) return "";
    
    switch (borderStyle) {
      case "gradient":
        return "border-2 bg-gradient-to-r from-blue-500 to-purple-500 border-transparent bg-clip-border";
      case "glow":
        return `border ${currentTheme.border} shadow-[0_0_10px_3px_rgba(255,255,255,0.3)] shadow-${theme === "neon" ? "indigo" : theme === "cosmic" ? "purple" : "blue"}-500/30`;
      case "dashed":
        return `border-dashed border-2 ${currentTheme.border}`;
      case "dotted":
        return `border-dotted border-2 ${currentTheme.border}`;
      default:
        return `border ${currentTheme.border}`;
    }
  }

  const getShadowStyles = () => {
    if (!shadow) return "";
    
    const sizes = {
      sm: "shadow-sm",
      md: "shadow",
      lg: "shadow-lg",
      xl: "shadow-xl",
      "2xl": "shadow-2xl",
    };
    
    switch (shadowType) {
      case "soft":
        return `${sizes[shadowSize]} ${currentTheme.shadow} blur-lg`;
      case "hard":
        return `${sizes[shadowSize]} ${currentTheme.shadow}`;
      case "inner":
        return `inner-shadow ${currentTheme.shadow}`;
      case "glow":
        return isHovered ? `shadow-[0_0_20px_5px] ${currentTheme.glow}` : `shadow-[0_0_10px_2px] ${currentTheme.glow}`;
      default:
        return `${sizes[shadowSize]} ${currentTheme.shadow}`;
    }
  }

  const intensityFactors = {
    1: 0.2,
    2: 0.4,
    3: 0.6,
    4: 0.8,
    5: 1.0,
  }

  const separationFactors = {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
  }

  useEffect(() => {
    if (variant === "layered") {
      const newLayers = [];
      const separationDistance = separationFactors[layerSeparation];
      const layerOpacities = [0.1, 0.2, 0.3, 0.4];
      const layerScales = [0.98, 0.96, 0.94, 0.92];
      
      for (let i = 0; i < Math.min(layerCount, 4); i++) {
        newLayers.push(
          <motion.div
            key={`layer-${i}`}
            className={cn(
              "absolute inset-0 pointer-events-none",
              currentTheme.background, 
              i === 0 ? getBorderStyles() : "",
              rounded !== "none" ? roundedStyles[rounded] : ""
            )}
            style={{
              zIndex: -1 - i,
              opacity: layerOpacities[i],
              scale: layerScales[i],
              y: i * separationDistance,
              x: 0,
              transformStyle: "preserve-3d",
            }}
            data-layer={i + 1}
          />
        );
      }
      
      setGeneratedLayers(newLayers);
    }
  }, [variant, layerCount, layerSeparation, theme, border, borderStyle, rounded]);

  useEffect(() => {
    if (variant === "layered" && cardRef.current) {
      const layerElements = Array.from(cardRef.current.querySelectorAll("[data-layer]"))
      setLayers(layerElements as HTMLElement[])
    }
  }, [variant, generatedLayers])

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setDimensions({ width: rect.width, height: rect.height })
    }
  }, [children])

  useEffect(() => {
    if ((variant === "float" || variant === "wave") && !reduceMotion) {
      let animationFrame: number;
      let lastTime = 0;
      const floatSpeed = speed === "slow" ? 0.5 : speed === "fast" ? 2 : 1;
      
      const animate = (time: number) => {
        if (!lastTime) lastTime = time;
        const delta = (time - lastTime) / 1000;
        lastTime = time;
        
        setFloatPhase(prev => (prev + delta * floatSpeed) % (Math.PI * 2));
        
        animationFrame = requestAnimationFrame(animate);
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [variant, reduceMotion, speed]);
  
  useEffect(() => {
    if ((variant === "float" || variant === "wave") && !reduceMotion) {
      const factor = intensityFactors[intensity];
      
      switch (floatPattern) {
        case "simple":
          floatY.set(Math.sin(floatPhase) * 10 * factor);
          break;
        case "complex":
          floatY.set(Math.sin(floatPhase) * 8 * factor);
          floatX.set(Math.sin(floatPhase * 0.5) * 5 * factor);
          rotate.set(Math.sin(floatPhase * 0.3) * 2 * factor);
          break;
        case "random":
          if (floatPhase % 0.5 < 0.05) {
            floatY.set(Math.sin(floatPhase) * (5 + Math.random() * 5) * factor);
            floatX.set((Math.random() - 0.5) * 10 * factor);
          }
          break;
        case "sine":
          floatY.set(Math.sin(floatPhase) * 12 * factor);
          break;
        case "circle":
          floatX.set(Math.sin(floatPhase) * 10 * factor);
          floatY.set(Math.cos(floatPhase) * 10 * factor);
          break;
        default:
          floatY.set(Math.sin(floatPhase) * 10 * factor);
      }
    }
  }, [floatPhase, variant, intensity, floatPattern, reduceMotion, floatX, floatY, rotate, intensityFactors]);

  useEffect(() => {
    if (!cardRef.current || !hoverEffect || reduceMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY
      
      setMousePosition({ 
        x: (e.clientX - rect.left) / rect.width, 
        y: (e.clientY - rect.top) / rect.height 
      })

      const factor = intensityFactors[intensity]

      if (variant === "tilt" || variant === "morph" || variant === "breathe") {
        rotateX.set(-mouseY * 0.01 * factor)
        rotateY.set(mouseX * 0.01 * factor)
      } else if (variant === "magnetic") {
        x.set(mouseX * 0.1 * factor)
        y.set(mouseY * 0.1 * factor)
      } else if (variant === "layered") {
        layers.forEach((layer) => {
          const depth = Number.parseFloat(layer.getAttribute("data-layer") || "1")
          const moveX = mouseX * 0.02 * depth * factor
          const moveY = mouseY * 0.02 * depth * factor
          
          layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${moveX * 0.02}deg) scale(${1 - (depth * 0.01 * factor)})`
        })
      } else if (variant === "wave") {
        const dx = mouseX / rect.width
        const dy = mouseY / rect.height
        const distance = Math.sqrt(dx * dx + dy * dy)
        const waveIntensity = Math.max(0, 1 - distance) * factor * 15
        
        rotateX.set(-dy * waveIntensity)
        rotateY.set(dx * waveIntensity)
      }
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
      rotateX.set(0)
      rotateY.set(0)
      scale.set(1)

      if (variant === "layered") {
        layers.forEach((layer) => {
          layer.style.transform = ""
        })
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    cardRef.current.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      if (cardRef.current) {
        cardRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [variant, intensity, hoverEffect, layers, reduceMotion, x, y, rotateX, rotateY, scale, intensityFactors])

  useEffect(() => {
    if (!scrollEffect || reduceMotion) return

    const handleScroll = () => {
      setScrollPosition(window.scrollY)
      
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const visiblePercentage = Math.min(
          Math.max(0, (windowHeight - rect.top) / windowHeight),
          Math.max(0, (rect.bottom) / windowHeight)
        )
        
        const factor = intensityFactors[intensity]
        
        if (variant === "float" || variant === "parallax") {
          y.set(-scrollPosition * 0.05 * factor * visiblePercentage)
        }
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollScale = 1 + (visiblePercentage * 0.05 * factor)
          scale.set(Math.min(scrollScale, 1.1))
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrollEffect, variant, intensity, reduceMotion, y, scale, intensityFactors])

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (!reduceMotion) {
      scale.set(1.02)
      
      if (confettiEffect) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 1500)
      }
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (!reduceMotion) {
      scale.set(1)
    }
  }
  const Confetti = () => {
    return showConfetti ? (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() * 10 + 5
          const color = [
            "bg-red-500", "bg-blue-500", "bg-green-500", 
            "bg-yellow-500", "bg-purple-500", "bg-pink-500"
          ][Math.floor(Math.random() * 6)]
          const left = Math.random() * 100
          const animationDuration = (Math.random() * 1 + 0.5).toFixed(1)
          
          return (
            <div
              key={i}
              className={`absolute ${color} rounded-full opacity-70`}
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: "-20px",
                animation: `confetti ${animationDuration}s ease-out forwards`,
                animationDelay: `${Math.random() * 0.3}s`
              }}
            />
          )
        })}
      </div>
    ) : null
  }
  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
    pill: "rounded-full",
  }
  const getAnimationClasses = () => {
    if (reduceMotion) return ""
    
    if (variant === "breathe") {
      return "animate-pulse"
    }
    return ""
  }

  const getGlowGradient = () => {
    if (variant !== "glow" || !isHovered) return ""
    
    const x = mousePosition.x * 100
    const y = mousePosition.y * 100
    
    return (
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-inherit"
        style={{
          background: `radial-gradient(circle at ${x}% ${y}%, ${
            theme === "neon" ? "rgba(99, 102, 241, 0.7)" :
            theme === "cosmic" ? "rgba(147, 51, 234, 0.7)" :
            "rgba(147, 197, 253, 0.5)"
          }, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          borderRadius: "inherit"
        }}
      />
    )
  }

  useEffect(() => {
    if (!confettiEffect && variant !== "float" && variant !== "wave") return

    const style = document.createElement('style')
    style.innerHTML = `
      @keyframes confetti {
        0% { transform: translateY(0) rotate(0); opacity: 1; }
        100% { transform: translateY(300px) rotate(720deg); opacity: 0; }
      }
      
      .inner-shadow {
        box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
      }
      
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
      }
      
      @keyframes floatComplex {
        0% { transform: translate(0px, 0px) rotate(0deg); }
        25% { transform: translate(5px, -10px) rotate(1deg); }
        50% { transform: translate(0px, -15px) rotate(0deg); }
        75% { transform: translate(-5px, -10px) rotate(-1deg); }
        100% { transform: translate(0px, 0px) rotate(0deg); }
      }
      
      @keyframes floatWave {
        0% { transform: translateX(0px); }
        25% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0px); }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [confettiEffect, variant])

  // Create motion-specific props
  const motionProps: HTMLMotionProps<"div"> = {
    ref: cardRef,
    style: {
      x: variant === "float" || variant === "wave" 
        ? springFloatX 
        : scrollEffect 
          ? springY 
          : springX,
      y: variant === "float" || variant === "wave" 
        ? springFloatY 
        : springY,
      rotate: variant === "float" || variant === "wave" 
        ? springRotate 
        : 0,
      rotateX: springRotateX,
      rotateY: springRotateY,
      scale: springScale,
      borderRadius: borderRadius,
      transformStyle: "preserve-3d",
      perspective: "1000px",
    },
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  }

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden transition-colors duration-300",
        currentTheme.background,
        getBorderStyles(),
        getShadowStyles(),
        getAnimationClasses(),
        blurBackground && "backdrop-blur-md",
        className,
      )}
      {...motionProps}
      {...props}
    >
      {variant === "layered" && generatedLayers}
      
      {variant === "glow" && getGlowGradient()}
      
      {isHovered && (theme === "glass" || borderStyle === "gradient") && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
          style={{
            opacity: 0.1,
            transform: "rotate(30deg) translateX(-200%)",
            width: "150%",
            height: "200%",
            top: "-50%",
            left: 0,
            animation: "shine 2s ease-in-out infinite",
          }}
        />
      )}
      
      {variant === "wave" && isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`wave-${i}`}
              className="absolute bottom-0 left-0 right-0 h-8 opacity-30"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${
                  theme === "neon" 
                    ? "rgba(99, 102, 241, 0.7)" 
                    : theme === "cosmic" 
                    ? "rgba(147, 51, 234, 0.7)" 
                    : "rgba(147, 197, 253, 0.7)"
                } 50%, transparent 100%)`,
                animation: `floatWave ${1.5 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                bottom: `${i * 10}px`,
                opacity: 0.3 - (i * 0.05),
              }}
            />
          ))}
        </div>
      )}
      
      {confettiEffect && <Confetti />}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}