"use client"

import { useState, useEffect, useRef } from "react"
import { Download, FileCode, Zap, Settings } from "lucide-react"
import { motion } from "framer-motion"
import { DynamicRipple } from "@/registry/ui/dynamic-ripple"

// Main Component
export default function DownloadCompleteSection() {
   const [activeCard, setActiveCard] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [cardOrder, setCardOrder] = useState([0, 1, 2, 3])
  const componentRef = useRef<HTMLDivElement>(null)

  const cards = [
    {
      icon: <Download className="h-5 w-5" />,
      title: "Install Component",
      description: "Add to your project",
      theme: "blue" as const,
      bgColor: "bg-blue-900/30 dark:bg-blue-900/30 bg-blue-50/80",
      borderColor: "border-blue-500/30 dark:border-blue-500/30 border-blue-200",
      iconColor: "text-blue-400 dark:text-blue-400 text-blue-600",
      descColor: "text-blue-300 dark:text-blue-300 text-blue-500",
      textColor: "text-white dark:text-gray-900",
      time: "8 minutes ago",
    },
    {
      icon: <FileCode className="h-5 w-5" />,
      title: "Import Components",
      description: "Start using in code",
      theme: "purple" as const,
      bgColor: "bg-purple-900/30 dark:bg-purple-900/30 bg-purple-50/80",
      borderColor: "border-purple-500/30 dark:border-purple-500/30 border-purple-200",
      iconColor: "text-purple-400 dark:text-purple-400 text-purple-600",
      descColor: "text-purple-300 dark:text-purple-300 text-purple-500",
      textColor: "text-white dark:text-gray-900",
      time: "5 minutes ago",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Configure Settings",
      description: "Customize your experience",
      theme: "green" as const,
      bgColor: "bg-green-900/30 dark:bg-green-900/30 bg-green-50/80",
      borderColor: "border-green-500/30 dark:border-green-500/30 border-green-200",
      iconColor: "text-green-400 dark:text-green-400 text-green-600",
      descColor: "text-green-300 dark:text-green-300 text-green-500",
      textColor: "text-white dark:text-gray-900",
      time: "2 minutes ago",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Build Amazing UIs",
      description: "Create stunning interfaces",
      theme: "amber" as const,
      bgColor: "bg-amber-900/30 dark:bg-amber-900/30 bg-amber-50/80",
      borderColor: "border-amber-500/30 dark:border-amber-500/30 border-amber-200",
      iconColor: "text-amber-400 dark:text-amber-400 text-amber-600",
      descColor: "text-amber-300 dark:text-amber-300 text-amber-500",
      textColor: "text-white dark:text-gray-900",
      time: "Just now",
    },
  ]

  // Simplified hover detection - removed MutationObserver complexity
  const handleMouseEnter = () => {
    setIsHovering(true)
    // Start animation immediately on hover
    setActiveCard(0)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  // Immediate animation rotation when hovering
  useEffect(() => {
    if (!isHovering) return

    // Start first rotation immediately, then continue with intervals
    let currentIndex = 0
    
    const rotateCards = () => {
      setCardOrder((prev) => {
        const newOrder = [...prev.slice(1), prev[0]]
        return newOrder
      })
      currentIndex = (currentIndex + 1) % cards.length
      setActiveCard(currentIndex)
    }

    // Start first rotation after a short delay for smooth transition
    const initialTimeout = setTimeout(rotateCards, 300)
    
    // Then continue with regular intervals
    const interval = setInterval(rotateCards, 1500) // Reduced from 2000ms for faster animation

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [cards.length, isHovering])

  // Reset order when not hovering
  useEffect(() => {
    if (!isHovering) {
      setCardOrder([0, 1, 2, 3])
      setActiveCard(0)
    }
  }, [isHovering])

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 360 },
    active: { scale: 1.3, rotate: 720 },
  }

  return (
    <div 
      className="h-96 flex items-center justify-center px-3 sm:px-12 py-6 rounded-lg -mt-4" 
      ref={componentRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="col-span-3 row-span-4">
        <div className="h-full space-y-6">
          {cardOrder.map((cardIndex) => {
            const card = cards[cardIndex]
            const isActive = activeCard === cardIndex

            return (
              <motion.div
                key={cardIndex}
                layout
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <DynamicRipple
                  theme={card.theme}
                  intensity={isActive ? 5 : isHovering ? 4 : 3}
                  speed={isActive ? 5 : isHovering ? 4 : 3}
                  autoAnimate={isHovering || isActive}
                  reactToCursor={true}
                  className={`
                    border ${card.borderColor} ${card.bgColor} backdrop-blur-sm p-4 cursor-pointer group mt-6 rounded-lg
                    transform transition-all duration-300 ease-out
                    hover:scale-105 hover:-translate-y-1
                    ${isActive ? "ring-2 ring-white/20 shadow-xl shadow-white/10" : ""}
                  `}
                >
                  <div className="flex items-center space-x-3 relative overflow-hidden">
                    <motion.div
                      className={`${card.iconColor} transition-all duration-300 relative z-10`}
                      variants={iconVariants}
                      animate={isActive ? "active" : isHovering ? "hover" : "initial"}
                      transition={{ duration: 0.3 }}
                    >
                      {card.icon}
                    </motion.div>

                    <div className="flex-1 z-10">
                      <motion.p
                        className={`text-sm transition-all duration-300 
                          ${isActive ? "font-semibold text-black dark:text-white" : "text-neutral-700 dark:text-neutral-300"}
                        `}
                        animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {card.title}
                      </motion.p>
                      <p className={`${card.descColor} text-xs transition-all duration-300`}>{card.description}</p>
                    </div>

                    <div
                      className={`
                      text-xs transition-all duration-300 z-10 hidden 2xl:block "
                      ${isActive ? "dark:text-white text-gray-900 font-medium" : "text-gray-700 dark:text-gray-300"}
                    `}
                    >
                      {card.time}
                    </div>
                  </div>
                </DynamicRipple>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}