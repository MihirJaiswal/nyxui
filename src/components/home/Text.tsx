import React, { useEffect, useState } from 'react';
import { HTMLMotionProps, AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
        <div className="relative z-10">
          <h1 className="text-5xl text-center font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
            Build faster and
            <span className="relative flex flex-col items-center justify-center">
            <div className="relative">
              <WordRotate
                words={adjectives}
                className="text-transparent inline-block bg-clip-text bg-gradient-to-r from-pink-600 to-purple-500 dark:from-pink-500 dark:to-purple-400"
              />
            </div>
          </span>
          </h1>
          <p className="mx-auto mb-8 mt-4 text-balance text-center text-base md:text-lg font-medium tracking-tight text-foreground/80">
          Increase productivity with our collection of modern components and templates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Text;