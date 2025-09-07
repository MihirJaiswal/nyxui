'use client'
import { useState, useEffect } from "react";

export const AnimatedBackground = () => {
  const [showGradient, setShowGradient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGradient(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`absolute -top-32 left-56 md:top-0 sm:right:1/2 lg:right-0 lg:left-auto w-[300px] h-[300px] sm:w-[500px] sm:h-[400px] lg:w-[680px] lg:h-[600px] transition-all duration-1000 ease-out ${
      showGradient 
        ? 'opacity-20 dark:opacity-70 scale-100' 
        : 'opacity-0 scale-75'
    }`}>
      <div className="absolute inset-0 sm:-top-50 md:inset-0 bg-gradient-to-br sm:bg-gradient-to-b lg:bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 sm:to-transparent lg:to-pink-600 rounded-full blur-3xl transform rotate-12 sm:rotate-0 lg:rotate-12 scale-150 sm:opacity-80 lg:opacity-100" />
      <div className="absolute top-10 right-10 sm:-top-12 sm:right-16 md:-top-30 lg:top-20 lg:right-20 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-full blur-2xl opacity-70" />
    </div>
  );
}
