"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import { StringifyOptions } from "querystring"

interface CardProps {
  logo: string
  mainImage: string
  title: string
  children?: React.ReactNode
  className?: StringifyOptions
  width?: number | string
  height?: {
    collapsed: number
    expanded: number
  }
  logoSize?: number
  logoPosition?: {
    expanded: number
  }
  shineIntensity?: number
  backgroundColor?: string
  borderColor?: string
  borderWidth?: string
  textColor?: string
  glowColor?: string
  glowGradient?: string
  titlePosition?: number
}

export default function ThreeDLayeredCard({
  logo,
  mainImage,
  title,
  children,
  className,
  width = 288,
  height = {
    collapsed: 130,
    expanded: 300,
  },
  logoSize = 64,
  logoPosition = {
    expanded: 15,
  },
  shineIntensity = 0.3,
  backgroundColor = "bg-gradient-to-b from-[#FF9901] via-[#DF911A] to-[#724f13]",
  borderColor,
  borderWidth = "0",
  textColor = "white",
  glowColor = "rgba(255, 165, 0, 0.1)",
  glowGradient = "#fde047",
  titlePosition = 90,
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                           window.innerWidth < 768 || 
                           ('ontouchstart' in window)
      setIsMobile(isMobileDevice)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Constants for image sizing
  const IMAGE_SIZE = 128
  const HALF_IMAGE_SIZE = IMAGE_SIZE / 2
  const HALF_LOGO_SIZE = logoSize / 2

  // Mouse position tracking for 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring animations for smooth movement
  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 })
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 })

  // Transform mouse position to rotation values (reduced for mobile)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [isMobile ? "-6deg" : "-12deg", isMobile ? "6deg" : "12deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [isMobile ? "6deg" : "12deg", isMobile ? "-6deg" : "-12deg"])

  // Smooth lens effect that increases/decreases based on mouse position
  const lensOverlay = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [
      // Hovering up - darker overlay
      `linear-gradient(180deg, 
        rgba(0, 0, 0, ${shineIntensity * 0.4}) 0%, 
        rgba(0, 0, 0, ${shineIntensity * 0.2}) 50%, 
        rgba(0, 0, 0, ${shineIntensity * 0.1}) 100%)`,
      // Hovering down - brighter white overlay
      `linear-gradient(180deg, 
        rgba(255, 255, 255, ${shineIntensity * 0.2}) 0%, 
        rgba(255, 255, 255, ${shineIntensity * 0.5}) 50%, 
        rgba(255, 255, 255, ${shineIntensity * 0.8}) 100%)`,
    ],
  )

  // Dynamic movement for logo and text based on tilt direction (reduced for mobile)
  const logoMovement = isMobile ? (logoSize < 30 ? 4 : logoSize < 50 ? 6 : 8) : (logoSize < 30 ? 8 : logoSize < 50 ? 12 : 15)
  const logoMoveX = useTransform(mouseXSpring, [-0.5, 0.5], [logoMovement, -logoMovement])
  const logoMoveY = useTransform(mouseYSpring, [-0.5, 0.5], [logoMovement, -logoMovement])
  const textMoveX = useTransform(mouseXSpring, [-0.5, 0.5], [isMobile ? 8 : 15, isMobile ? -8 : -15])
  const textMoveY = useTransform(mouseYSpring, [-0.5, 0.5], [isMobile ? 8 : 15, isMobile ? -8 : -15])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isMobile) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false)
      x.set(0)
      y.set(0)
    }
  }

  // Mobile touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) {
      e.preventDefault()
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isMobile) {
      e.preventDefault()
      setIsExpanded(!isExpanded)
      
      // Add a subtle tilt effect for mobile tap
      if (!isExpanded) {
        x.set(0.1)
        y.set(0.1)
        setTimeout(() => {
          x.set(0)
          y.set(0)
        }, 300)
      }
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault()
      setIsExpanded(!isExpanded)
    }
  }

  // Determine if card should be expanded (hover for desktop, tap state for mobile)
  const shouldBeExpanded = isMobile ? isExpanded : isHovered

  const borderStyle = borderColor && borderWidth !== "0"
    ? {
        border: `${borderWidth} solid ${borderColor}`,
        borderRadius: "0.375rem",
      }
    : {}

  const widthStyle = typeof width === 'number' ? `${width}px` : width

  const getExpandedLogoPosition = () => {
    if (logoPosition?.expanded !== undefined) {
      const minTop = -logoSize / 2
      const maxTop = height.expanded - logoSize + 20
      return `${Math.max(minTop, Math.min(logoPosition.expanded, maxTop))}px`
    }
    
    // Default positioning based on logo size
    const basePosition = logoSize < 30 ? 25 : logoSize < 50 ? 18 : logoSize < 70 ? 12 : 8
    return `${basePosition}px`
  }

  // Calculate collapsed state logo 
  const getCollapsedLogoPosition = () => {
    const availableSpaceAboveTitle = titlePosition - 20
    const logoTop = availableSpaceAboveTitle - logoSize
    
    if (logoTop < 10) {
      return `${Math.max(10, (availableSpaceAboveTitle - logoSize) / 2)}px`
    }
    
    return `${Math.max(10, logoTop)}px`
  }

  // Fixed title position
  const getCollapsedTitlePosition = () => {
    return `${titlePosition}px`
  }

  const isTitleVisible = () => {
    const titleTop = titlePosition
    const titleHeight = 24
    return (titleTop + titleHeight) <= height.collapsed
  }

  return (
    <motion.div
      ref={ref}
      className={`relative cursor-pointer ${className} ${isMobile ? 'touch-manipulation' : ''}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        width: widthStyle,
        height: `${height.collapsed}px`,
        zIndex: shouldBeExpanded ? 50 : 1,
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {/* Card content with overflow hidden and max-height animation */}
      <motion.div
        className="relative w-full border rounded-md shadow-2xl"
        style={{
          rotateY: rotateY,
          rotateX: rotateX,
          transformStyle: "preserve-3d",
          overflow: "hidden",
          position: shouldBeExpanded ? "absolute" : "relative",
          top: shouldBeExpanded ? `${-(height.expanded - height.collapsed) / 2}px` : "auto",
          left: shouldBeExpanded ? "0" : "auto",
          right: shouldBeExpanded ? "0" : "auto",
          ...borderStyle,
        }}
        animate={{
          height: shouldBeExpanded ? `${height.expanded}px` : `${height.collapsed}px`,
          boxShadow: shouldBeExpanded 
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 20px ${glowColor}`
            : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        transition={{
          type: "spring",
          stiffness: isMobile ? 300 : 400,
          damping: isMobile ? 30 : 25,
          mass: 0.8,
        }}
      >
        {/* Dynamic height inner container */}
        <motion.div 
          className="relative w-full"
          style={{
            height: shouldBeExpanded ? `${height.expanded}px` : `${height.collapsed}px`,
            minHeight: shouldBeExpanded ? `${height.expanded}px` : `${height.collapsed}px`,
          }}
          animate={{
            height: shouldBeExpanded ? `${height.expanded}px` : `${height.collapsed}px`,
          }}
          transition={{
            type: "spring",
            stiffness: isMobile ? 300 : 400,
            damping: isMobile ? 30 : 25,
            mass: 0.8,
          }}
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 ${backgroundColor}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />

          {/* Smooth linear lens effect overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: lensOverlay,
              mixBlendMode: "overlay",
              zIndex: 25,
            }}
          />

          {/* Glass lens effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 25%, transparent 50%, transparent 75%, rgba(255,255,255,0.03) 100%)",
              mixBlendMode: "soft-light",
              zIndex: 24,
            }}
            animate={{
              opacity: shouldBeExpanded ? 0.6 : 0.3,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          />

          {/* Mobile tap indicator */}
          {isMobile && (
            <motion.div
              className="absolute top-2 right-2 pointer-events-none"
              style={{
                zIndex: 35,
                color: textColor,
                fontSize: "12px",
                opacity: 0.7,
              }}
              animate={{
                opacity: shouldBeExpanded ? 0 : 0.7,
                rotate: shouldBeExpanded ? 45 : 0,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </motion.div>
          )}

          {/* Logo */}
          <motion.div
            className="absolute"
            style={{
              transform: "translateZ(60px)",
              transformStyle: "preserve-3d",
              left: `calc(50% - ${HALF_LOGO_SIZE}px)`,
              width: `${logoSize}px`,
              height: `${logoSize}px`,
              zIndex: 30,
            }}
            initial={{
              top: getCollapsedLogoPosition(),
              opacity: 1,
            }}
            animate={{
              top: shouldBeExpanded 
                ? getExpandedLogoPosition() 
                : getCollapsedLogoPosition(),
            }}
            transition={{
              type: "spring",
              stiffness: isMobile ? 300 : 400,
              damping: isMobile ? 30 : 25,
              mass: 0.8,
            }}
          >
            <motion.div
              style={{
                x: shouldBeExpanded ? logoMoveX : 0,
                y: shouldBeExpanded ? logoMoveY : 0,
                width: `${logoSize}px`,
                height: `${logoSize}px`,
              }}
              className="relative"
            >
              <Image 
                src={logo} 
                alt="Logo" 
                fill 
                className="object-contain"
                quality={100}
                sizes={`${logoSize}px`}
              />
            </motion.div>
          </motion.div>

          {/* Compact state title */}
          {isTitleVisible() && (
            <motion.div
              className="absolute font-bold text-center"
              style={{
                transform: "translateZ(40px)",
                transformStyle: "preserve-3d",
                width: "calc(100% - 1rem)",
                left: "0.5rem",
                right: "0.5rem",
                top: getCollapsedTitlePosition(),
                zIndex: 30,
                color: textColor,
              }}
              initial={{
                opacity: 1,
                y: 0,
              }}
              animate={{
                opacity: shouldBeExpanded ? 0 : 1,
                y: shouldBeExpanded ? -20 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 0.7,
              }}
            >
              <h2 className="drop-shadow-lg text-sm leading-tight overflow-hidden text-ellipsis">
                {title}
              </h2>
            </motion.div>
          )}

          <motion.div
            className="absolute text-center"
            style={{
              transform: "translateZ(40px)",
              transformStyle: "preserve-3d",
              width: "calc(100% - 2rem)",
              left: "1rem",
              top: "65%",
              zIndex: 30,
              color: textColor,
            }}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: shouldBeExpanded ? 1 : 0,
              y: shouldBeExpanded ? 0 : 20,
            }}
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 28,
              mass: 0.8,
            }}
          >
            <motion.div
              style={{
                x: shouldBeExpanded ? textMoveX : 0,
                y: shouldBeExpanded ? textMoveY : 0,
              }}
              className="flex flex-col items-center justify-center h-full"
            >
              {children}
            </motion.div>
          </motion.div>

          {/* Main character image */}
          <motion.div
            className="absolute"
            style={{
              transform: "translateZ(20px)",
              transformStyle: "preserve-3d",
              left: `calc(50% - ${HALF_IMAGE_SIZE}px)`,
              top: `calc(50% - ${HALF_IMAGE_SIZE + 21}px)`,
              width: `${IMAGE_SIZE}px`,
              height: `${IMAGE_SIZE}px`,
              zIndex: 20,
            }}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: shouldBeExpanded ? 1 : 0,
              scale: shouldBeExpanded ? 1 : 0.8,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              mass: 0.6,
            }}
          >
            <div
              className="relative"
              style={{
                width: `${IMAGE_SIZE}px`,
                height: `${IMAGE_SIZE}px`,
              }}
            >
              <Image 
                src={mainImage} 
                alt="Character" 
                fill 
                quality={100}
                className="object-contain mask-b-from-25"
                sizes={`${IMAGE_SIZE}px`}
              />
            </div>
            {/* Glow effect */}
            <div
              className="blur-xl absolute right-0 top-1 rounded-full -z-10"
              style={{
                backgroundColor: glowGradient,
                width: `${IMAGE_SIZE}px`,
                height: `${IMAGE_SIZE}px`,
              }}
            />
          </motion.div>

          {/* Light reflection effect */}
          <motion.div
            className="absolute inset-0 rounded-md"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.03) 100%)",
              zIndex: 5,
            }}
            animate={{
              opacity: shouldBeExpanded ? 0.4 : 0.2,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom glow effect */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 pointer-events-none"
        style={{
          bottom: shouldBeExpanded ? `${-20 - (height.expanded - height.collapsed)}px` : "-20px",
          width: "180px",
          height: "25px",
          zIndex: -1,
        }}
        initial={{
          opacity: 0,
          scale: 1,
        }}
        animate={{
          opacity: shouldBeExpanded ? 0.25 : 0,
          scale: shouldBeExpanded ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 30,
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `radial-gradient(ellipse 100% 100% at 50% 0%, ${glowColor} 0%, rgba(255, 20, 147, 0.03) 30%, rgba(255, 165, 0, 0.01) 60%, transparent 100%)`,
            filter: "blur(8px)",
          }}
        />
      </motion.div>
    </motion.div>
  )
}