import React, { useEffect, useState } from 'react';
import { ChevronRight, Github } from 'lucide-react';
import { Tiles } from '../ui/Tiles';
import Link from 'next/link';
import { HTMLMotionProps, AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Rbutton } from '../ui/Rbutton';
import { LiquidMetalButton } from '@/nuvyxui/components/LiquidMetalButton';

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
    <div className="flex flex-col justify-center md:py-16 space-y-8 px-4 sm:px-6 lg:px-4">
      <div className="relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-100 dark:bg-pink-900/20 rounded-full blur-3xl opacity-40"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight lg:text-7xl text-gray-900 dark:text-white">
            Build{" "}
            <span className="font-extrabold inline-block transform hover:scale-105 transition-all duration-300"
            style={{
              backgroundImage:
                "url('/bg.webp')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextStrokeWidth: "0.5px",
              WebkitTextStrokeColor: "#efcdfa",
            }}
            >
            Faster
            </span> 
           
            <br/>
            
            <span className="relative font-extrabold flex items-center gap-4 py-12 h-6">
            and{" "}
              <span><WordRotate
                words={adjectives}
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-500 dark:from-pink-500 dark:to-purple-400"
              /></span>
            </span>
          </h1>
          
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Increase productivity with our collection of professionally crafted components and templates.
          </p>
          
          <div className="mt-10 w-full flex flex-col sm:flex-row items-center gap-4">
            <Link href="/components" rel="noopener noreferrer">
            <Rbutton><span>Get started</span> <ChevronRight className='ml-2 h-3 w-5' /></Rbutton>
            </Link>
            <Link 
              href="https://github.com/MihirJaiswal/nuvyxui" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between p-2 rounded-full"
            >
             <LiquidMetalButton 
                variant="default" 
                theme="custom" 
                customColors={{
                  base: "bg-gradient-to-b from-purple-300 via-purple-400 to-pink-600",
                  highlight: "rgba(230, 200, 255, 0.8)",
                  shadow: "rgba(80, 0, 120, 0.4)",
                  text: "font-normal tracking-wide",
                }}
                size="md"
                shadow="md"
                rounded="md"
                textured={true}
                className='py-2.5'
              >
                <div className="flex items-center"><Github className="mr-2 h-5 w-5 text-pink-500" /><span>GitHub</span></div>
              </LiquidMetalButton>
            </Link>
          </div>
        </div>
        <div className="absolute -bottom-4 md:-bottom-12 -right-12 w-96 h-64 opacity-30 md:opacity-70 -z-1 overflow-hidden pointer-events-none">
          <Tiles rows={8} cols={8} className="scale-110" />
          <div className="absolute inset-0 bg-gradient-to-br dark:from-zinc-950 from-white via-white dark:via-zinc-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br dark:from-zinc-950 from-white via-white dark:via-zinc-950/60 to-transparent dark:to-zinc-950/10" />
        </div>
      </div>
    </div>
  );
};

export default Text;