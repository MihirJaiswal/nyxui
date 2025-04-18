"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MajesticCard } from "@/nuvyxui/components/MajesticCard";

export const TwitterCard = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  
  return (
    <MajesticCard
      variant="glow"
      intensity={4}
      rounded="xl"
      shadow
      shadowSize="xl"
      shadowType="glow"
      hoverEffect
      speed="normal"
      className="w-full max-w-full h-full mx-auto bg-white dark:bg-gray-950 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 dark:bg-gray-950 dark:border-gray-600 dark:from-gray-950 dark:via-gray-950 dark:to-gray-950 border-none"
    >
      <div className="p-3 sm:p-5" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src="https://raw.githubusercontent.com/MihirJaiswal/digibazaar-frontend/refs/heads/main/public/mihir.jpg"
                  alt="Mihir Jaiswal"
                  width={500}
                  height={500}
                  loading="lazy"
                  quality={100}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="truncate">
                <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">Mihir Jaiswal</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">@mihirjaiswal</p>
              </div>
              <svg height="20" width="20" className="flex-shrink-0 ml-1" fill="currentColor" viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg">
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mt-3 sm:mt-4">
          <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">
            Once you go Tailwind, there is no going back 😆 <span className="font-bold ">#webdev</span> <span className="font-bold">#tailwindcss</span>
          </p>
          <div className="mt-2 sm:mt-3 border border-zinc-300/50 dark:border-purple-900/50 bg-black rounded-lg p-2 sm:p-3 text-xs sm:text-sm font-mono overflow-hidden">
            <MajesticCard
              variant={isHovering ? "magnetic" : "wave"}
              intensity={4}
              className="hidden md:block bg-black dark:bg-black border-none shadow-none"
            >
              <div className="flex items-center p-1 sm:p-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                <div className="flex space-x-1 mr-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs dark:text-white">Card.tsx</span>
              </div>
              <div className="text-gray-700 text-xs p-1 sm:p-2 dark:text-gray-300 overflow-x-auto">
                <pre className="text-xs text-gray-200">
                  <code>
                    {`<div className="max-w-sm p-6">
  <p className="text-gray-600">
    Hover on this!
  </p>
  <button className="bg-blue-500">
    Click me
  </button>
</div>`}
                  </code>
                </pre>
              </div>
            </MajesticCard>
            <div className="md:hidden border border-gray-300 dark:border-gray-800 p-2 rounded-md">
              <div className="flex items-center p-1 sm:p-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                <div className="flex space-x-1 mr-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-white">Card.tsx</span>
              </div>
              <div className="text-gray-700 text-xs p-1 sm:p-2 dark:text-gray-300 overflow-x-auto">
                <pre className="text-xs">
                  <code>
                    {`<div className="max-w-sm p-6">
  <p className="text-gray-600">
    Tap on the card
  </p>
  <button className="bg-blue-500">
    Click me
  </button>
</div>`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 sm:mt-4 flex items-center justify-between text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <button className="flex items-center space-x-1 group">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xs sm:text-sm group-hover:text-red-500 transition-colors">42</span>
            </button>
            <button className="flex items-center space-x-1 group">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-green-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="text-xs sm:text-sm group-hover:text-green-500 transition-colors">24</span>
            </button>
            <button className="flex items-center space-x-1 group">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-xs sm:text-sm group-hover:text-blue-500 transition-colors">16</span>
            </button>
          </div>
          <button className="flex items-center space-x-1 text-xs sm:text-sm hover:text-blue-500 transition-colors">
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>Share</span>
          </button>
        </div>
      </div>
      <div className="px-3 sm:px-5 py-2 sm:py-3 border-t border-purple-200 dark:border-gray-800 flex justify-between items-center">
        <span className="text-xxs sm:text-xs text-gray-500 dark:text-gray-400">1:24 PM · Apr 7, 2025</span>
        <Link href="https://www.linkedin.com/in/mihir-jaiswal-322898287/">
          <button className="font-medium py-1 px-2 sm:px-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-1 sm:gap-2 text-xxs sm:text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" className="sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            Connect
          </button>
        </Link>
      </div>
    </MajesticCard>
  );
};