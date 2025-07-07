'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

// Default pointer SVG component
const DefaultPointerSVG = ({ className }: { className?: string }) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="1"
    viewBox="0 0 16 16"
    className={className}
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
  </svg>
)

export const Cursor = ({
  children,
  className,
  name,
  customSVG,
  svgClassName,
  pointerColor = 'sky'
}: {
  children: React.ReactNode
  className?: string
  name: string
  customSVG?: React.ReactNode
  svgClassName?: string
  pointerColor?: 'sky' | 'red' | 'green' | 'blue' | 'purple' | 'pink' | 'yellow' | 'indigo' | string
}) => {
  const posX = useMotionValue(0)
  const posY = useMotionValue(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [mouseInside, setMouseInside] = useState<boolean>(false)
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      requestAnimationFrame(() => {
        posX.set(x)
        posY.set(y)
      })
    }
  }, [posX, posY])

  const handleMouseEnter = useCallback(() => {
    setMouseInside(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMouseInside(false)
  }, [])

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      style={{
        cursor: 'none'
      }}
      ref={containerRef}
      className={cn('relative', className)}>
      
      {children}
      <AnimatePresence>
        {mouseInside && (
          <FollowPointer 
            x={posX} 
            y={posY} 
            name={name} 
            customSVG={customSVG}
            svgClassName={svgClassName}
            pointerColor={pointerColor}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export const FollowPointer = ({ 
  x, 
  y, 
  name, 
  customSVG, 
  svgClassName,
  pointerColor = 'sky'
}: { 
  x: any
  y: any
  name: string
  customSVG?: React.ReactNode
  svgClassName?: string
  pointerColor?: string
}) => {
  const getColorClasses = (color: string) => {
    const predefinedColors = {
      sky: 'stroke-sky-600 text-sky-500 bg-sky-500',
      red: 'stroke-red-600 text-red-500 bg-red-500',
      green: 'stroke-green-600 text-green-500 bg-green-500',
      blue: 'stroke-blue-600 text-blue-500 bg-blue-500',
      purple: 'stroke-purple-600 text-purple-500 bg-purple-500',
      pink: 'stroke-pink-600 text-pink-500 bg-pink-500',
      yellow: 'stroke-yellow-600 text-yellow-500 bg-yellow-500',
      indigo: 'stroke-indigo-600 text-indigo-500 bg-indigo-500',
    }
    
    return predefinedColors[color as keyof typeof predefinedColors] || predefinedColors.sky
  }

  const colorClasses = getColorClasses(pointerColor)
  const [strokeClass, textClass, bgClass] = colorClasses.split(' ')

  return (
    <motion.div
      className="absolute z-50 h-4 w-4 rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
      }}
      initial={{
        scale: 0,
        opacity: 0
      }}
      animate={{
        scale: 1,
        opacity: 1
      }}
      exit={{
        scale: 0,
        opacity: 0
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
    >
      {customSVG ? (
        <div className={cn(
          "h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] transform",
          textClass,
          svgClassName
        )}>
          {customSVG}
        </div>
      ) : (
        <DefaultPointerSVG 
          className={cn(
            "h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] transform",
            strokeClass,
            textClass,
            svgClassName
          )}
        />
      )}
      <div className={cn(
        "w-fit rounded-full px-2 py-1 text-white pointer-events-none text-xs whitespace-nowrap",
        bgClass
      )}>
        {name || 'User'}
      </div>
    </motion.div>
  )
}
