"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Sparkles } from "lucide-react"
import TechStack from "./Tech"

export const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const textOptions = ["UI  ", "UX "]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [textOptions.length])

  return (
    <div className="flex  flex-col justify-center items-center">
      <main className="flex-1 w-full">
        <section className="space-y-8 pb-12 pt-16 md:pt-20" aria-label="Hero Section">
          <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5 mr-2 text-yellow-500" />
              v1.0.0 Now Available
            </Badge>

            <h1 className="text-5xl lg:text-[6rem] font-black font-sans leading-tight md:leading-snug pb-4">
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex justify-center"
              >
                <span className="relative inline-block">
                  Build
                  <img
                    src="/underline.svg"
                    alt="underline"
                    className="absolute left-0 bottom-1 md:bottom-2 w-full"
                  />
                </span>
              </motion.p>

                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{
                    backgroundImage:
                      "url('/bg.webp')",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "repeat",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    WebkitTextStrokeWidth: "1px",
                    WebkitTextStrokeColor: "#efcdfa",
                  }}
                >
                    Beautiful
                </motion.span>

                <div className="inline-flex items-center justify-center overflow-hidden h-[1.2em] min-w-[1.5em]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={textOptions[currentTextIndex]}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{
                        y: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                    >
                      {textOptions[currentTextIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-w-3xl mx-auto leading-normal text-gray-700 dark:text-gray-300 sm:text-xl text-center sm:leading-8"
            >
              A modern UI component library for React applications. Accessible, customizable, and developer-friendly
              with stunning animations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium"
              >
                <span>Browse Components</span>
                <ChevronRight
                  className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5 align-middle relative"
                  style={{ top: '1px' }} // Adjust this value as needed
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-medium"
              >
                Documentation
              </motion.button>
            </motion.div>
          </div>
          <TechStack/>
        </section>
      </main>
    </div>
  )
}