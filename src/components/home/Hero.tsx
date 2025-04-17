"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Sparkles } from "lucide-react"
import TechStack from "./Tech"
import Image from "next/image"
import { Tiles } from "@/components/ui/Tiles" 
import Link from "next/link"
import { Rbutton } from "../ui/Rbutton"

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
    <div className="flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute bottom-28 md:-bottom-8 -left-8 w-44 h-32 md:w-[30rem] md:h-58 opacity-50 -z-1 overflow-hidden pointer-events-none">
        <Tiles rows={8} cols={8} className="scale-150 md:scale-110" />
        <div className="absolute hidden md:block inset-0 bg-gradient-to-br from-white dark:from-zinc-950 via-transparent to-white dark:to-zinc-950" />
      </div>
      
      <div className="absolute bottom-28 md:-bottom-8 -right-8 w-44 h-32 md:w-[30rem] md:h-58 -z-1 opacity-50 overflow-hidden pointer-events-none">
        <Tiles rows={8} cols={8} className="scale-150 md:scale-110"/>
        <div className="absolute inset-0 hidden md:block bg-gradient-to-bl from-white dark:from-zinc-950 via-transparent to-white dark:to-zinc-950" />
      </div>

      <main className="flex-1 w-full mx-auto z-10">
        <section className="space-y-8 pb-12 pt-16 md:pt-20" aria-label="Hero Section">
          <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4">
          <Badge
            variant="secondary"
            className="mb-6 inline-flex items-center text-black dark:text-white gap-2 rounded-lg border border-purple-300 px-4 py-1.5 text-sm font-semibold shadow-sm dark:border-purple-800"
          >
            <Sparkles className="h-4 w-4 text-yellow-500 dark:text-yellow-300" />
            v1.0.0 Now Available
          </Badge>
            <h1 className="text-6xl lg:text-[6rem] font-black font-sans leading-tight md:leading-snug pb-4">
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex justify-center"
              >
                <span className="relative inline-block">
                  Build
                  <Image
                    src="/underline.svg"
                    alt="underline"
                    width={0}
                    height={0}
                    priority
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="prose dark:prose-invert mx-auto max-w-3xl text-center"
            >
              <p className="font-sans text-gray-900 dark:text-gray-100 sm:text-xl tracking-wide font-medium leading-relaxed">
                Ready to use modern components built with 
                <span className="font-bold text-black dark:text-white"> React</span>, 
                <span className="font-bold text-black dark:text-white"> TypeScript</span>, 
                <span className="font-bold text-black dark:text-white"> Tailwind CSS</span>, and 
                <span className="font-bold text-black dark:text-white"> Framer Motion</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <Link href="/components" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex gap-2 items-center"
              >
                <Rbutton className="relative"><span>Browse Components</span> <ChevronRight
                  className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5 align-middle relative"
                  style={{ top: '1px' }}
                /></Rbutton>
              </motion.div>
              </Link>

              <Link href="/docs" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full text-secondary-foreground font-medium"
              >
                Documentation
              </motion.button>
              </Link>
            </motion.div>
          </div>
          <TechStack/>
        </section>
      </main>
    </div>
  )
}