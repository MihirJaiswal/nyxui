"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Sparkles } from "lucide-react";
import TechStack from "./Tech";
import Image from "next/image";
import Link from "next/link";
import { Rbutton } from "../ui/Rbutton";

export const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const textOptions = ["UI  ", "UX "];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textOptions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [textOptions.length]);

  return (
    <div className="flex flex-col justify-center items-center relative overflow-hidden">
      <main className="flex-1 w-full mx-auto z-10">
        <section
          className="space-y-8 pb-12 pt-16 md:pt-20"
          aria-label="Hero Section"
        >
          <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4">
            <Badge
              variant="secondary"
              className="mb-6 inline-flex items-center text-black dark:text-white gap-2 rounded-lg border border-purple-300 px-4 py-1.5 text-sm font-semibold shadow-sm dark:border-gray-600"
            >
              <Sparkles className="h-4 w-4 text-yellow-500 dark:text-yellow-300" />
              v1.0.0 Now Available
            </Badge>
            <h1 className="text-[2.95rem] md:text-5xl lg:text-[6rem] font-black tracking-wide leading-snug pb-4">
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex justify-center"
                >
                  <span className="relative">
                    Build
                    <Image
                      src="/underline.svg"
                      alt="underline"
                      width={0}
                      height={0}
                      priority
                      className="absolute left-0 bottom-1 md:bottom-3 w-full"
                    />
                  </span>
                </motion.p>

                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <span
                    className="absolute inset-0 z-10"
                    style={{
                      backgroundImage: "url('/bg.webp')",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "repeat",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Beautiful
                  </span>
                  <span
                    className="relative z-0"
                    style={{
                      color: "transparent",
                      textShadow: `
                          -1px -1px 0 #efcdfa,  
                          1px -1px 0 #efcdfa,
                          -1px 1px 0 #efcdfa,
                          1px 1px 0 #efcdfa
                        `,
                    }}
                  >
                    Beautiful
                  </span>
                </motion.span>

                <div className="inline-flex items-center justify-center overflow-hidden h-[1.2em] min-w-[1.6em]">
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
              className="mx-auto max-w-3xl text-center"
            >
              <p className="text-gray-900 dark:text-gray-100 sm:text-xl tracking-wide font-medium leading-relaxed">
                Ready to use modern components built with
                <span className="font-bold text-black dark:text-white">
                  {" "}
                  React
                </span>
                ,
                <span className="font-bold text-black dark:text-white">
                  {" "}
                  TypeScript
                </span>
                ,
                <span className="font-bold text-black dark:text-white">
                  {" "}
                  Tailwind CSS
                </span>
                , and
                <span className="font-bold text-black dark:text-white">
                  {" "}
                  Framer Motion
                </span>
                .
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative mt-8 flex w-full flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
            >
              <Link href="/components" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Rbutton className="relative bg-slate-900 dark:bg-white dark:text-black no-underline flex space-x-2 group cursor-pointer hover:shadow-2xl transition duration-200 shadow-zinc-900 p-px font-semibold text-white px-4 py-2 h-14 w-full items-center justify-center rounded-2xl text-center text-sm sm:w-52">
                    <span>Browse Components</span>{" "}
                    <ChevronRight
                      className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5 align-middle relative"
                      style={{ top: "1px" }}
                    />
                  </Rbutton>
                </motion.div>
              </Link>

              <Link href="/docs" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-14 w-full items-center justify-center rounded-2xl border border-transparent bg-white text-sm text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200 hover:shadow-lg sm:w-52 dark:border-neutral-600 dark:bg-black dark:text-white"
                >
                  Documentation
                </motion.button>
              </Link>
            </motion.div>
          </div>
          <TechStack />
        </section>
      </main>
    </div>
  );
};
