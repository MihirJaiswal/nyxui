"use client"
import {
  ScrollAnimationTrigger,
  ScrollProgressAnimation,
  useScrollColor,
  useScrollRotation,
} from "@/nyxui/components/ScrollAnimationTrigger"
import { motion, useTransform } from "framer-motion"
import { ArrowDown, Sparkles, Zap, Layers, RefreshCw, PaintBucket, Palette } from "lucide-react"

export function ScrollAnimationTriggerDemo() {
  const cardHoverAnimation = {
    whileHover: { 
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="min-h-[60vh] relative flex flex-col items-center justify-center text-center p-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                background: i % 2 === 0 ? "#3b82f6" : "#ec4899",
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 10 + Math.random() * 20,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.h1 
          className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent"
          style={{ 
            backgroundImage: "linear-gradient(135deg, #3b82f6, #ec4899)" 
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Scroll Animation Magic
        </motion.h1>
        
        <motion.p 
          className="text-gray-600 dark:text-gray-300 mb-8 max-w-md text-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Discover beautiful animations triggered by your scrolling journey
        </motion.p>
        
        <motion.div 
          className="mt-8 p-3 rounded-full bg-blue-500 shadow-lg cursor-pointer"
          animate={{ 
            y: [0, 10, 0],
            boxShadow: [
              "0 4px 6px -1px rgba(59, 130, 246, 0.3)",
              "0 10px 15px -3px rgba(59, 130, 246, 0.5)",
              "0 4px 6px -1px rgba(59, 130, 246, 0.3)"
            ]
          }} 
          transition={{ 
            repeat: Number.POSITIVE_INFINITY, 
            duration: 1.5,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowDown className="h-6 w-6 text-white" />
        </motion.div>
      </div>

      <div className="relative h-24 overflow-hidden">
        <svg 
          className="absolute bottom-0 w-full h-24 text-white dark:text-gray-900"
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-current"
          ></path>
        </svg>
      </div>
      <div className="bg-white dark:bg-zinc-950 py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Fade effect with icon */}
          <ScrollAnimationTrigger 
            effect="fade" 
            className="flex items-center justify-center p-6 mb-12"
            delay={0.2}
          >
            <motion.div 
              className="bg-white dark:bg-zinc-800 md:p-8 p-4 rounded-2xl shadow-lg max-w-md border border-blue-100 dark:border-zinc-700"
              {...cardHoverAnimation}
            >
              <div className="flex flex-col md:flex-row gap-3 md:gap-1 items-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                  <Sparkles className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold">Fade In Effect</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-center md:text-start leading-relaxed">
                This content gently fades into view as you scroll down the page, creating a subtle
                and elegant appearance that draws attention without being distracting.
              </p>
            </motion.div>
          </ScrollAnimationTrigger>

          {/* Scale effect with icon */}
          <ScrollAnimationTrigger 
            effect="scale" 
            className="min-h-[50vh] flex items-center justify-center p-6 mb-12"
            delay={0.3}
            fromScale={0.7}
            toScale={1}
          >
            <motion.div 
              className="bg-white dark:bg-zinc-800 md:p-8 p-4 rounded-2xl shadow-lg max-w-md border border-purple-100 dark:border-zinc-700"
              {...cardHoverAnimation}
            >
              <div className="flex flex-col md:flex-row gap-3 md:gap-1 items-center mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-4">
                  <Zap className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold">Scale Effect</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-center md:text-start leading-relaxed">
                Watch as this content smoothly scales from small to full size as you scroll, 
                creating a dynamic entrance that captures attention and adds visual depth.
              </p>
            </motion.div>
          </ScrollAnimationTrigger>

          {/* Slide effect with icon */}
          <ScrollAnimationTrigger
            effect="slide"
            direction="up"
            className="flex items-center justify-center p-6 mb-24"
            delay={0.2}
          >
            <motion.div 
              className="bg-white dark:bg-zinc-800 md:p-8 p-4 rounded-2xl shadow-lg max-w-md border border-green-100 dark:border-zinc-700"
              {...cardHoverAnimation}
            >
              <div className="flex flex-col md:flex-row gap-3 md:gap-1 items-center mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mr-4">
                  <Layers className="h-6 w-6 text-green-500 dark:text-green-400" />
                </div>
                <h3 className="md:text-2xl text-xl font-bold text-center md:text-start">Slide Up Effect</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-center md:text-start leading-relaxed">
                This content slides gracefully into view from below, creating a smooth transition
                that guides the eye naturally as you explore the page content.
              </p>
            </motion.div>
          </ScrollAnimationTrigger>

          <div className="grid md:grid-cols-1 max-w-xl mx-auto gap-12 mb-24">
            {/* Color effect */}
            <ScrollAnimationTrigger
              effect="color"
              className="min-h-[40vh] flex items-center justify-center p-6"
              fromColor="#2b13c2"
              toColor="#ec4899"
            >
              <motion.div 
                className="bg-white dark:bg-zinc-800 md:p-8 p-4 rounded-2xl shadow-lg w-full border border-pink-100 dark:border-zinc-700"
                {...cardHoverAnimation}
              >
                <div className="flex flex-col md:flex-row gap-3 md:gap-1 items-center mb-4">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full mr-4">
                    <Palette className="h-6 w-6 text-pink-500 dark:text-pink-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Color Change</h3>
                </div>
                <p className="text-center md:text-start leading-relaxed">
                  Watch the text transform through vibrant colors as you scroll through this section,
                  creating a playful and engaging visual experience tied to your scroll position.
                </p>
              </motion.div>
            </ScrollAnimationTrigger>

            {/* Rotate effect */}
            <ScrollAnimationTrigger 
              effect="rotate" 
              className="min-h-[40vh] flex items-center justify-center p-6"
              delay={0.3}
              fromRotation={-15}
              toRotation={0}
            >
              <motion.div 
                className="bg-white dark:bg-zinc-800 md:p-8 p-4 rounded-2xl shadow-lg w-full border border-amber-100 dark:border-zinc-700"
                {...cardHoverAnimation}
              >
                <div className="flex flex-col md:flex-row gap-3 md:gap-1 items-center mb-4">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full mr-4">
                    <RefreshCw className="h-6 w-6 text-amber-500 dark:text-amber-400" />
                  </div>
                  <h3 className="md:text-2xl text-lg font-bold text-center md:text-start">Rotation Effect</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-center md:text-start leading-relaxed">
                  This content spins into place as you scroll, adding a dynamic and playful
                  element to the page that catches the eye.
                </p>
              </motion.div>
            </ScrollAnimationTrigger>
          </div>

          {/* Scroll progress based animation */}
          <ScrollProgressAnimationContent />

          {/* Custom effect */}
          <ScrollAnimationTrigger
            effect="custom"
            customProps={{
              initial: { x: -100, y: 100, opacity: 0, rotate: -10 },
              animate: { x: 0, y: 0, opacity: 1, rotate: 0 },
              transition: { type: "spring", stiffness: 100, damping: 10 }
            }}
            className="min-h-[50vh] flex items-center justify-center p-6 mb-24"
          >
            <motion.div 
              className="bg-gradient-to-br from-indigo-500 to-purple-600 md:p-10 p-6 rounded-2xl shadow-xl max-w-md text-white overflow-hidden relative"
              {...cardHoverAnimation}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white opacity-10"
                  style={{
                    width: 20 + i * 20,
                    height: 20 + i * 20,
                    top: Math.random() * 100 + "%",
                    left: Math.random() * 100 + "%",
                  }}
                  animate={{
                    x: [0, Math.random() * 50 - 25],
                    y: [0, Math.random() * 50 - 25],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 4 + i,
                  }}
                />
              ))}
              
              <h3 className="text-2xl text-center md:text-start font-bold mb-4 relative z-10">Custom Animation Masterpiece</h3>
              <p className="relative z-10 text-center md:text-start leading-relaxed">
                This content combines multiple animation effects for a truly unique entrance. 
                The diagonal movement with rotation creates visual interest while the interactive 
                hover state invites engagement.
              </p>
              
              <motion.button
                className="mt-6 px-6 py-2 bg-white text-purple-600 rounded-full font-medium relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </ScrollAnimationTrigger>

          <ScrollAnimationTrigger 
            effect="slide" 
            direction="up"
            className="min-h-[50vh] flex items-center justify-center p-6 text-center"
            delay={0.3}
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-pink-500">
                Bring Your UI to Life
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 text-center md:text-start mb-8">
                Implement these stunning scroll animations in your next project to create
                memorable, engaging user experiences.
              </p>
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full font-medium text-lg shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </div>
          </ScrollAnimationTrigger>
        </div>
      </div>
    </div>
  )
}

function ScrollProgressAnimationContent() {
  return (
    <ScrollProgressAnimation className="min-h-[100vh] flex flex-col items-center justify-center p-6 mb-24 relative">
      {({ scrollYProgress }) => {
        const ScrollProgressContent = () => {
          const textColor = useScrollColor(scrollYProgress, "#3b82f6", "#ec4899")
          const rotation = useScrollRotation(scrollYProgress, 0, 360)
          const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8])
          const yPosition = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 100])
          const gradientFrom = useScrollColor(scrollYProgress, "rgba(59, 130, 246, 0.1)", "rgba(236, 72, 153, 0.1)")
          const gradientTo = useScrollColor(scrollYProgress, "rgba(139, 92, 246, 0.1)", "rgba(34, 211, 238, 0.1)")
          
          return (
            <>
              <motion.div 
                className="absolute inset-0 rounded-3xl opacity-40"
                style={{
                  background: `radial-gradient(circle, ${gradientFrom}, ${gradientTo})`,
                }}
              />
              
              <motion.div
                className="bg-white dark:bg-zinc-800 md:p-10 p-6 rounded-2xl shadow-xl max-w-lg text-center relative z-10 border-2 border-transparent"
                style={{
                  scale,
                  rotate: rotation,
                  y: yPosition,
                  borderImage: "linear-gradient(to right, #3b82f6, #ec4899) 1",
                  borderImageSlice: 1,
                }}
              >
                <motion.div
                  className="absolute -top-6 -left-6 p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <PaintBucket className="h-6 w-6 text-white" />
                </motion.div>
                
                <motion.h3 
                  className="text-3xl font-bold mb-4" 
                  style={{ color: textColor }}
                >
                  Scroll Progress Magic
                </motion.h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-center md:text-start leading-relaxed mb-6">
                  Watch as this element responds to your scrolling position. The colors shift, the card rotates,
                  and the size changes based on exactly how far you&apos;ve scrolled through this section.
                </p>
                
                <motion.div 
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                >
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ 
                      width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                      background: "linear-gradient(90deg, #3b82f6, #ec4899)"
                    }}
                  />
                </motion.div>
              </motion.div>
            </>
          )
        }
        
        return <ScrollProgressContent />
      }}
    </ScrollProgressAnimation>
  )
}