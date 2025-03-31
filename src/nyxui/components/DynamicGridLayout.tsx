"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export interface GridItem {
  id: string | number
  content: ReactNode
  size?: "small" | "medium" | "large" | "wide" | "tall" | "featured"
  priority?: number
  className?: string
}

export interface DynamicGridLayoutProps {
  items: GridItem[]
  className?: string
  gap?: number
  animationDuration?: number
  breakpoints?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  adaptiveHeight?: boolean
  morphEffect?: boolean
  itemClassName?: string
}

export function DynamicGridLayout({
  items,
  className,
  gap = 16,
  animationDuration = 0.5,
  breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  adaptiveHeight = true,
  morphEffect = true,
  itemClassName,
}: DynamicGridLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState<"mobile" | "tablet" | "desktop" | "widescreen">("desktop")
  const [gridItems, setGridItems] = useState(items)
  const [containerWidth, setContainerWidth] = useState(0)

  // Detect layout based on container width
  useEffect(() => {
    const updateLayout = () => {
      if (!containerRef.current) return

      const width = containerRef.current.offsetWidth
      setContainerWidth(width)

      if (width < breakpoints.sm!) {
        setLayout("mobile")
      } else if (width < breakpoints.md!) {
        setLayout("tablet")
      } else if (width < breakpoints.lg!) {
        setLayout("desktop")
      } else {
        setLayout("widescreen")
      }
    }

    // Initial update
    updateLayout()

    // Add resize listener
    const resizeObserver = new ResizeObserver(updateLayout)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [breakpoints])

  // Update grid items when items prop changes
  useEffect(() => {
    setGridItems(items)
  }, [items])

  // Get grid template based on layout
  const getGridTemplate = () => {
    switch (layout) {
      case "mobile":
        return {
          gridTemplateColumns: "1fr",
          gridAutoRows: "auto",
        }
      case "tablet":
        return {
          gridTemplateColumns: "repeat(2, 1fr)",
          gridAutoRows: "auto",
        }
      case "desktop":
        return {
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "auto",
        }
      case "widescreen":
        return {
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "auto",
        }
      default:
        return {
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "auto",
        }
    }
  }

  // Get item span based on size and layout
  const getItemSpan = (size: GridItem["size"]) => {
    // Default spans
    let colSpan = 1
    let rowSpan = 1

    // Adjust spans based on size and layout
    switch (size) {
      case "small":
        colSpan = 1
        rowSpan = 1
        break
      case "medium":
        colSpan = layout === "mobile" ? 1 : 1
        rowSpan = 1
        break
      case "large":
        colSpan = layout === "mobile" ? 1 : layout === "tablet" ? 2 : 2
        rowSpan = layout === "mobile" ? 1 : 2
        break
      case "wide":
        colSpan = layout === "mobile" ? 1 : 2
        rowSpan = 1
        break
      case "tall":
        colSpan = 1
        rowSpan = 2
        break
      case "featured":
        colSpan = layout === "mobile" ? 1 : layout === "tablet" ? 2 : 2
        rowSpan = 2
        break
      default:
        colSpan = 1
        rowSpan = 1
    }

    return { colSpan, rowSpan }
  }

  // Sort items by priority
  const sortedItems = [...gridItems].sort((a, b) => (b.priority || 0) - (a.priority || 0))

  return (
    <div ref={containerRef} className={cn("dynamic-grid-layout w-full", className)}>
      <motion.div
        className="grid w-full"
        style={{
          ...getGridTemplate(),
          gap: `${gap}px`,
        }}
        initial={false}
        animate={{ opacity: 1 }}
      >
        <AnimatePresence>
          {sortedItems.map((item) => {
            const { colSpan, rowSpan } = getItemSpan(item.size)

            return (
              <motion.div
                key={item.id}
                layout={morphEffect}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: animationDuration,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className={cn("overflow-hidden", itemClassName, item.className)}
                style={{
                  gridColumn: `span ${colSpan}`,
                  gridRow: `span ${rowSpan}`,
                }}
              >
                {item.content}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

