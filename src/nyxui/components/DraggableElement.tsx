"use client"

import React, { useState, useRef, useEffect, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export interface DraggableElementProps {
  children: ReactNode
  className?: string
  dragConstraints?: "parent" | "window" | { top?: number; right?: number; bottom?: number; left?: number }
  dragElastic?: number
  dragMomentum?: boolean
  dragTransition?: {
    bounceStiffness?: number
    bounceDamping?: number
  }
  onDragStart?: () => void
  onDragEnd?: () => void
  onDrag?: (event: MouseEvent | TouchEvent | PointerEvent, info: any) => void
  initialPosition?: { x: number; y: number }
  lockAxis?: "x" | "y" | "none"
  zIndex?: number
  disabled?: boolean
  boundaryPadding?: number
  snapToGrid?: boolean
  gridSize?: number
  style?: React.CSSProperties
}

export function DraggableElement({
  children,
  className,
  dragConstraints = "parent",
  dragElastic = 0.5,
  dragMomentum = true,
  dragTransition = {
    bounceStiffness: 400,
    bounceDamping: 40,
  },
  onDragStart,
  onDragEnd,
  onDrag,
  initialPosition = { x: 0, y: 0 },
  lockAxis = "none",
  zIndex = 10,
  disabled = false,
  boundaryPadding = 0,
  snapToGrid = false,
  gridSize = 20,
  style,
}: DraggableElementProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const x = useMotionValue(initialPosition.x)
  const y = useMotionValue(initialPosition.y)

  const springConfig = { damping: 40, stiffness: 400 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const scaleMotion = useMotionValue(1)
  useEffect(() => {
    scaleMotion.set(isDragging ? 1.05 : 1)
  }, [isDragging, scaleMotion])

  // Calculate constraints
  const getConstraints = () => {
    if (typeof dragConstraints === "object") {
      return dragConstraints
    }

    if (dragConstraints === "window") {
      return {
        top: boundaryPadding,
        left: boundaryPadding,
        right: window.innerWidth - boundaryPadding,
        bottom: window.innerHeight - boundaryPadding,
      }
    }

    return containerRef.current || false
  }

  const handleDragStart = () => {
    setIsDragging(true)
    if (onDragStart) onDragStart()
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    if (onDragEnd) onDragEnd()
    if (snapToGrid) {
      const newX = Math.round(x.get() / gridSize) * gridSize
      const newY = Math.round(y.get() / gridSize) * gridSize

      x.set(newX)
      y.set(newY)
    }
  }

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: any) => {
    if (onDrag) onDrag(event, info)
  }

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        drag={disabled ? false : lockAxis === "none" ? true : lockAxis}
        dragElastic={dragElastic}
        dragMomentum={dragMomentum}
        dragTransition={dragTransition}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        initial={{ x: initialPosition.x, y: initialPosition.y }}
        style={{
          x: snapToGrid ? springX : x,
          y: snapToGrid ? springY : y,
          zIndex: isDragging ? zIndex + 10 : zIndex,
          scale: scaleMotion,
          ...style,
        }}
        whileDrag={{
          scale: 1.05,
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
        className={cn(
          "draggable-element cursor-grab active:cursor-grabbing touch-none",
          isDragging && "z-50",
          className,
        )}
      >
        {children}
      </motion.div>
    </div>
  )
}