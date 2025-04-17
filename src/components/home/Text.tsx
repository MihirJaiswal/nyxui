import React, { useEffect, useState } from 'react';
import { Tiles } from '../ui/Tiles';
import { HTMLMotionProps, AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface WordRotateProps {
  words: string[]
  duration?: number
  framerProps?: HTMLMotionProps<"h1">
  className?: string
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
  const [index, setIndex] = useState(0)

  useEffect(() => {
     const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length)
     }, duration)

     return () => clearInterval(interval)
  }, [words, duration])

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
 )
}

const Text = () => {
  const adjectives = [
    'beautiful', 
    'powerful', 
    'scalable',
  ];
  
  return (
    <div className="flex flex-col justify-center md:py-12 space-y-8 px-4 sm:px-6 lg:px-4">
      <div className="relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-100 dark:bg-pink-900/20 rounded-full blur-3xl opacity-40"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl text-center font-extrabold leading-tight tracking-tight lg:text-7xl text-gray-900 dark:text-white">
            Build{" "}
            <span className="font-extrabold inline-block transform hover:scale-105 transition-all duration-300 relative">
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
              Faster
            </span>
            
            <span 
              className="relative z-0"
              style={{
                color: "transparent",
                WebkitTextStrokeWidth: "1px",
                textShadow: `
                  -0.5px -0.5px 0 #efcdfa,  
                  0.5px -0.5px 0 #efcdfa,
                  -0.5px 0.5px 0 #efcdfa,
                  0.5px 0.5px 0 #efcdfa
                `,
              }}
            >
              Faster
            </span>
          </span>
            {" "}and{" "}
            <span className="relative flex flex-col items-center justify-center">
            <div className="relative">
              <WordRotate
                words={adjectives}
                className="text-transparent inline-block bg-clip-text bg-gradient-to-r from-pink-600 to-purple-500 dark:from-pink-500 dark:to-purple-400"
              />
              <Image
                src="/underline.svg"
                alt="underline"
                width={300}
                height={10}
                priority
                className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 mt-1 -z-1"
              />
            </div>
          </span>
          </h1>
          <p className="mx-auto mb-8 mt-4 text-balance text-center text-base md:text-lg font-medium tracking-tight text-foreground/80">
          Increase productivity with our collection of modern components and templates.
          </p>
        </div>
        <div className="absolute -bottom-4 md:-bottom-12 -right-12 w-96 h-64 opacity-30 md:opacity-70 -z-1 overflow-hidden pointer-events-none">
          <Tiles rows={8} cols={8} className="scale-110" />
          <div className="absolute inset-0 bg-gradient-to-br dark:from-zinc-950 from-white via-white dark:via-zinc-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br dark:from-zinc-950 from-white via-white dark:via-zinc-950/60 to-transparent dark:to-zinc-950/10" />
        </div>
        <div className="absolute -bottom-4 md:-bottom-12 -left-12 w-96 h-64 opacity-30 md:opacity-70 -z-1 overflow-hidden pointer-events-none">
          <Tiles rows={8} cols={8} className="scale-110" />
          <div className="absolute inset-0 bg-gradient-to-bl dark:from-zinc-950 from-white via-white dark:via-zinc-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-bl dark:from-zinc-950 from-white via-white dark:via-zinc-950/60 to-transparent dark:to-zinc-950/10" />
        </div>
      </div>
    </div>
  );
};

export default Text;