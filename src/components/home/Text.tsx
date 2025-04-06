import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Tiles } from '../ui/Tiles';
import Image from 'next/image';

const Text = () => {
  const adjectives = [
    'beautiful', 
    'powerful', 
    'scalable',
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % adjectives.length);
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }, 300);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [adjectives.length]);
  
  return (
    <div className="flex flex-col justify-center md:py-16 space-y-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-100 dark:bg-pink-900/20 rounded-full blur-3xl opacity-40"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl font-bold leading-tight tracking-tight lg:text-7xl text-gray-900 dark:text-white">
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
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "#efcdfa",
            }}
            >
            Faster
            </span> 
            <br/>
            &{" "}
            
            <span className="relative font-extrabold inline-block h-12 lg:h-20">
              <span 
                className={`text-pink-600 dark:text-pink-500 relative absolute left-0 transition-all duration-300 ${
                  isAnimating ? 'opacity-0 transform -translate-y-6' : 'opacity-100 transform translate-y-0'
                }`}
              >
                {adjectives[currentIndex]}
                <Image
                  src="/underline.svg"
                  alt="underline"
                  width={0}
                  height={0}
                  priority
                  className="absolute left-0 bottom-1 md:bottom-0 w-full -z-1"
                />
              </span>
            </span>
          </h1>
          
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Increase productivity with our collection of professionally crafted components and templates.
          </p>
          
          <div className="mt-10 w-full flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
              Get started
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="absolute -bottom-4 md:-bottom-12 -right-12 w-96 h-96 opacity-30 md:opacity-70 -z-1 overflow-hidden pointer-events-none">
          <Tiles rows={8} cols={8} className="scale-110" />
          <div className="absolute inset-0 bg-gradient-to-br dark:from-zinc-950 from-white via-transparent to-background" />
        </div>
      </div>
    </div>
  );
};

export default Text;