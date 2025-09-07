"use client"
import { useState, useEffect, useRef, lazy, Suspense } from "react"
import { Download, FileCode, Zap, Settings } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

// Lazy load the DynamicRipple component
const DynamicRipple = lazy(() => 
  import("@/registry/ui/dynamic-ripple").then(module => ({ 
    default: module.DynamicRipple 
  }))
)

// Fallback component for loading state
const RippleFallback = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn(className, "animate-pulse")}>
    {children}
  </div>
)

// Main Component
export default function DownloadCompleteSection() {
  const [activeCard, setActiveCard] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [cardOrder, setCardOrder] = useState([0, 1, 2, 3])
  const [shouldLoadRipple, setShouldLoadRipple] = useState(false)
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
      color: "#3B82F6",
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
      color: "#8B5CF6",
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
      color: "#10B981",
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
      color: "#F59E0B",
      time: "Just now",
    },
  ]

  const handleMouseEnter = () => {
    setIsHovering(true)
    setActiveCard(0)
    // Trigger lazy loading when user starts interacting
    if (!shouldLoadRipple) {
      setShouldLoadRipple(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  // Load ripple component on mount with a small delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadRipple(true)
    }, 100) // Small delay to prioritize initial render

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isHovering) return
    let currentIndex = 0

    const rotateCards = () => {
      setCardOrder((prev) => {
        const newOrder = [...prev.slice(1), prev[0]]
        return newOrder
      })
      currentIndex = (currentIndex + 1) % cards.length
      setActiveCard(currentIndex)
    }

    const initialTimeout = setTimeout(rotateCards, 300)
    const interval = setInterval(rotateCards, 1500)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [cards.length, isHovering])

  useEffect(() => {
    if (!isHovering) {
      setCardOrder([0, 1, 2, 3])
      setActiveCard(0)
    }
  }, [isHovering])

  return (
    <div
      className="h-full flex items-center justify-center px-3 sm:px-12 py-6 rounded-lg -mt-4"
      ref={componentRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="col-span-3 row-span-4">
        <div className="h-full space-y-6">
          {cardOrder.map((cardIndex) => {
            const card = cards[cardIndex]
            const isActive = activeCard === cardIndex
            
            const cardContent = (
              <div className="flex flex-row items-center gap-3 relative overflow-hidden">
                <motion.div
                  className="flex size-10 items-center justify-center rounded-2xl text-white relative z-10"
                  style={{
                    backgroundColor: card.color,
                  }}
                  animate={isActive ? "active" : isHovering ? "hover" : "initial"}
                  transition={{ duration: 0.3 }}
                >
                  {card.icon}
                </motion.div>
                <div className="flex flex-col overflow-hidden flex-1 z-10">
                  <div className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
                    <motion.span
                      className="text-sm sm:text-lg"
                      transition={{ duration: 0.2 }}
                    >
                      {card.title}
                    </motion.span>
                    <span className="mx-1">·</span>
                    <span className="text-xs text-gray-500 hidden 2xl:block">{card.time}</span>
                  </div>
                  <p className="text-sm font-normal dark:text-white/60 text-gray-600">{card.description}</p>
                </div>
              </div>
            )

            return (
              <motion.div key={cardIndex} layout transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                {shouldLoadRipple ? (
                  <Suspense
                    fallback={
                      <RippleFallback
                        className={cn(
                          "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 mt-6",
                          "transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1",
                          "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                          "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                          isActive ? "ring-2 ring-white/20 shadow-xl shadow-white/10 -translate-y-1" : "",
                        )}
                      >
                        {cardContent}
                      </RippleFallback>
                    }
                  >
                    <DynamicRipple
                      theme={card.theme}
                      intensity={isActive ? 5 : isHovering ? 4 : 3}
                      speed={isActive ? 5 : isHovering ? 4 : 3}
                      autoAnimate={isHovering || isActive}
                      reactToCursor={true}
                      className={cn(
                        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 mt-6",
                        "transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1",
                        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                        isActive ? "ring-2 ring-white/20 shadow-xl shadow-white/10 -translate-y-1" : "",
                      )}
                    >
                      {cardContent}
                    </DynamicRipple>
                  </Suspense>
                ) : (
                  // Render without ripple initially
                  <div
                    className={cn(
                      "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 mt-6",
                      "transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1",
                      "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                      "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                      isActive ? "ring-2 ring-white/20 shadow-xl shadow-white/10 -translate-y-1" : "",
                    )}
                  >
                    {cardContent}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}