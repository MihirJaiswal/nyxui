'use client'
import React, { useState } from 'react';
import { GlitchButton } from '../components/GlitchButton';
import { Power, Download, Mail, ArrowRight, Menu, Info} from 'lucide-react';
import { MoonIcon } from '@radix-ui/react-icons';

export const GlitchButtonDemo = () => {
  const [showInteractive, setShowInteractive] = useState(false);
  
  const handleToggleInteractive = () => {
    setShowInteractive(!showInteractive);
  };

  return (
    <div className="flex flex-col items-center p-3 sm:p-4 md:p-6 lg:p-8 gap-4 sm:gap-6 lg:gap-8 w-full mx-auto">
      {/* Basic Examples */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">
        <div className="flex flex-col items-center p-3 sm:p-4 md:p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-lg sm:text-xl mb-3 sm:mb-4 font-semibold text-center">Always Glitching</h2>
          <GlitchButton 
            glitchAlways={true}
            glitchIntensity="medium"
            className="text-sm sm:text-base"
          >
            <div className="flex items-center"><Power className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /><span>ACTIVE</span></div>
          </GlitchButton>
        </div>
        
        <div className="flex flex-col items-center p-3 sm:p-4 md:p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-lg sm:text-xl mb-3 sm:mb-4 font-semibold text-center">Custom Colors</h2>
          <GlitchButton 
            glitchColors={{ primary: '#be21ed', secondary: '#00ffcc' }}
            glitchIntensity="medium"
            className="text-sm sm:text-base bg-purple-950 "
          >
            <div className="flex items-center"><MoonIcon className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /><span>NYX UI</span></div>
          </GlitchButton>
        </div>
        
        <div className="flex flex-col items-center p-3 sm:p-4 md:p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 rounded-lg sm:col-span-2 lg:col-span-1">
          <h2 className="text-lg sm:text-xl mb-3 sm:mb-4 font-semibold text-center">Download Button</h2>
          <GlitchButton 
            className="bg-black text-green-400 rounded-md text-sm sm:text-base"
          >
            <div className="flex items-center"><Download className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /><span>DOWNLOAD</span></div>
          </GlitchButton>
        </div>
      </div>

      <div className="w-full mt-2 sm:mt-4">
        <GlitchButton
          onClick={handleToggleInteractive}
          className="bg-blue-800 text-blue-200 rounded-lg mx-auto text-sm sm:text-base"
        >
          <div className="flex items-center">
            <Menu className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            <span>{showInteractive ? 'HIDE INTERACTIVE DEMO' : 'SHOW INTERACTIVE DEMO'}</span>
          </div>
        </GlitchButton>
      </div>

      {/* Interactive Demo Section */}
      {showInteractive && (
        <div className="w-full p-3 sm:p-4 md:p-6 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6 font-semibold text-center">Interactive Demo</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="flex flex-col gap-3 sm:gap-4">
              <h3 className="text-base sm:text-lg font-medium">Button Collection</h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                <GlitchButton 
                  className="bg-indigo-800 text-indigo-100 rounded-lg text-sm sm:text-base"
                >
                  <div className="flex items-center"><Info className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /><span>INFO</span></div>
                </GlitchButton>
                
                <GlitchButton 
                  className="bg-blue-950 text-blue-300 text-sm sm:text-base"
                  glitchColors={{ primary: '#00aaff', secondary: '#0044ff' }}
                >
                  <div className="flex items-center"><Mail className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /><span>MAIL</span></div>
                </GlitchButton>
                
                <GlitchButton 
                  className="bg-slate-900 text-white text-sm sm:text-base"
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span>NEXT</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </GlitchButton>
                
                <GlitchButton 
                  glitchAlways={true}
                  className="bg-rose-900 text-rose-200 rounded-md text-sm sm:text-base"
                >
                  ERROR
                </GlitchButton>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 sm:gap-4 mt-4 lg:mt-0">
              <h3 className="text-base sm:text-lg font-medium">Featured Design</h3>
              <div className="flex items-center justify-center h-full">
                <GlitchButton 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-cyan-950 to-blue-900 text-cyan-300 rounded-xl p-3 sm:p-4 md:p-6"
                  glitchColors={{ primary: '#00ffaa', secondary: '#aa00ff' }}
                >
                  ENTER
                </GlitchButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}