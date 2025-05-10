import React, { useEffect, useState } from "react";
import { HTMLMotionProps, AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Particles } from "../ui/particles";

interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: HTMLMotionProps<"h1">;
  className?: string;
}

export function WordRotate({
  words,
  duration = 2500,
  framerProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h1
          key={words[index]}
          className={cn(className)}
          {...framerProps}
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}

const Text = () => {
  const adjectives = ["beautiful", "powerful", "scalable"];

  return (
    <div className="flex flex-col justify-center md:py-12 space-y-8 px-4 sm:px-6 lg:px-4">
      <div className="relative">
        <div className="relative z-10 max-w-4xl mx-auto py-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
            <div className="inline-flex justify-center items-baseline flex-wrap mt-2">
              <span>Ship products</span>
              <span className="ml-3 relative">
                <div
                  className="w-48 md:w-64 lg:w-72 md:text-left text-center bg-gradient-to-tl from-purple-200 via-white to-white dark:from-purple-950 dark:via-zinc-950 dark:to-zinc-950 border-r border-b border-gray-100 dark:border-gray-800 mt-3"
                  style={{
                    transition: "all 0.1s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.animation = "shake 2s ease-in-out";
                    const wordRotate = e.currentTarget.querySelector(
                      ".word-rotate-container",
                    );
                    if (wordRotate) {
                      wordRotate.classList.add("text-shrink");
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.animation = "none";
                    const wordRotate = e.currentTarget.querySelector(
                      ".word-rotate-container",
                    );
                    if (wordRotate) {
                      wordRotate.classList.remove("text-shrink");
                    }
                  }}
                >
                  <style jsx>{`
                    @keyframes shake {
                      0%,
                      100% {
                        transform: translateX(0);
                      }
                      2%,
                      6%,
                      10%,
                      14%,
                      18%,
                      22%,
                      26%,
                      30%,
                      34%,
                      38%,
                      42%,
                      46% {
                        transform: translateX(-8px);
                      }
                      4%,
                      8%,
                      12%,
                      16%,
                      20%,
                      24%,
                      28%,
                      32%,
                      36%,
                      40%,
                      44% {
                        transform: translateX(8px);
                      }
                      50%,
                      60%,
                      70% {
                        transform: translateX(4px);
                      }
                      55%,
                      65%,
                      75% {
                        transform: translateX(-4px);
                      }
                      80%,
                      90% {
                        transform: translateX(2px);
                      }
                      85%,
                      95% {
                        transform: translateX(-2px);
                      }
                    }

                    .text-shrink {
                      transform: scale(0.8);
                      transition: transform 0.5s ease;
                    }
                  `}</style>
                  <Particles
                    className="absolute inset-0 z-0"
                    quantity={100}
                    ease={80}
                    color="#ffffff"
                    refresh
                  />
                  <div className="word-rotate-container transition-transform duration-500">
                    <WordRotate words={adjectives} />
                  </div>
                </div>
              </span>
            </div>
          </h1>
          <div className="flex flex-col items-center">
            <p className="mx-auto mb-8 mt-4 text-balance text-center text-base md:text-lg font-medium tracking-tight text-foreground/80">
              Increase productivity with our collection of modern components and
              templates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text;
