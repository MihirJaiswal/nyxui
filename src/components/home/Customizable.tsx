"use client"

import React, { useState, useEffect } from "react";
import { Sun, Moon, Zap, Star, Sparkles, Copy, Check, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from "next/image";

interface MajesticCardProps {
  theme: string;
  children: React.ReactNode;
  rounded?: string;
  shadow?: boolean;
  blurBackground?: boolean;
}

const MajesticCard = ({ theme, children, rounded, shadow,}: MajesticCardProps) => {
  const getThemeStyles = () => {
    const baseStyles = "transition-all duration-300";
    const shadowStyles = shadow ? "shadow-xl" : "";
    const roundedStyles = rounded === "xl" ? "rounded-xl" : "rounded-md";
    
    switch (theme) {
      case "light":
        return `bg-white border border-gray-200 ${shadowStyles} ${roundedStyles} ${baseStyles}`;
      case "dark":
        return `bg-gray-900 border border-gray-800 text-white ${shadowStyles} ${roundedStyles} ${baseStyles}`;
      case "glass":
        return `bg-white/20 backdrop-blur-xl border border-white/20 text-white ${shadowStyles} ${roundedStyles} ${baseStyles}`;
      case "gradient":
        return `bg-gradient-to-br from-purple-500 to-pink-500 text-white ${shadowStyles} ${roundedStyles} ${baseStyles}`;
      case "neon":
        return `bg-black border-2 border-green-400 text-green-400 ${shadowStyles} ${roundedStyles} ${baseStyles}`;
      case "cosmic":
        return `bg-gradient-to-br from-indigo-900 to-purple-900 text-white border border-indigo-500/30 ${shadowStyles} ${roundedStyles} ${baseStyles}`;
      case "darkest":
        return `bg-black border border-gray-800 text-white ${shadowStyles} ${roundedStyles} ${baseStyles}`;
      default:
        return `bg-white border border-gray-200 ${shadowStyles} ${roundedStyles} ${baseStyles}`;
    }
  };
  
  return (
    <div className={getThemeStyles()}>
      {children}
    </div>
  );
};

const CardThemeCustomizer = () => {
  const [theme, setTheme] = useState("gradient");
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("preview");
  const [slideDirection, setSlideDirection] = useState("right");
  const [themeIndex, setThemeIndex] = useState(0);

  const themeOptions = [
    {
      name: "Gradient",
      value: "gradient",
      icon: <Sparkles className="h-3.5 w-3.5" />,
      color: "text-purple-400",
    },
    {
      name: "Neon",
      value: "neon",
      icon: <Zap className="h-3.5 w-3.5" />,
      color: "text-green-400",
    },
    {
      name: "Cosmic",
      value: "cosmic",
      icon: <Star className="h-3.5 w-3.5" />,
      color: "text-indigo-400",
    },
  ];

const handleThemeChange = (newTheme: string) => {
  const currentIndex = themeOptions.findIndex(opt => opt.value === theme);
  const newIndex = themeOptions.findIndex(opt => opt.value === newTheme);
  
  setSlideDirection(newIndex > currentIndex ? "right" : "left");
  setThemeIndex(newIndex);
  setTheme(newTheme);
};

  const slideNext = () => {
    const nextIndex = (themeIndex + 1) % themeOptions.length;
    setSlideDirection("right");
    setThemeIndex(nextIndex);
    setTheme(themeOptions[nextIndex].value);
  };

  const slidePrev = () => {
    const prevIndex = (themeIndex - 1 + themeOptions.length) % themeOptions.length;
    setSlideDirection("left");
    setThemeIndex(prevIndex);
    setTheme(themeOptions[prevIndex].value);
  };

  const generateCode = () => {
    return `<MajesticCard 
  variant="tilt" 
  theme="${theme}" 
  intensity={3} 
  shadow 
  rounded="xl"
${theme === "glass" ? "  blurBackground" : ""}>
  <div className="overflow-hidden">
    <div className="h-40 w-full overflow-hidden">
      <Image
          src="/api/placeholder/400/320" 
          alt="Card image" 
          width={400}
          height={320}
          loading="lazy"
          quality={100} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">Premium Card</h3>
        <Star className="h-5 w-5 text-amber-300" fill="#FBBF24" />
      </div>
      <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
        Elegant cards with beautiful effects
      </p>
      <button className="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white py-1.5 rounded-md flex items-center justify-center gap-2 transition-colors">
        <span>Explore Now</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  </div>
</MajesticCard>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    setCopied(false);
  }, [theme]);

  const currentTheme = themeOptions.find((option) => option.value === theme) || themeOptions[0];

  const cardContent = (
    <div className="overflow-hidden">
      <div className="h-40 w-full overflow-hidden">
        <Image
          src="/api/placeholder/400/320" 
          alt="Card image" 
          width={400}
          height={320}
          loading="lazy"
          quality={100}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium">Premium Card</h3>
          <Star className="h-5 w-5 text-amber-300" fill="#FBBF24" />
        </div>
        
        <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
          Elegant cards with beautiful effects
        </p>
        
        <button className="w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white py-1.5 rounded-md flex items-center justify-center gap-2 transition-colors">
          <span>Explore Now</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  const slideVariants = {
    enterRight: {
      x: 300,
      opacity: 0,
    },
    enterLeft: {
      x: -300,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      }
    },
    exitRight: {
      x: 300,
      opacity: 0,
      transition: {
        duration: 0.2,
      }
    },
    exitLeft: {
      x: -300,
      opacity: 0,
      transition: {
        duration: 0.2,
      }
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex md:hidden justify-center mb-6">
          <div className="inline-flex rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === "preview" 
                  ? "bg-purple-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span>Preview</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-6 py-3 text-sm font-medium transition-all duration-200 ${
                activeTab === "code" 
                  ? "bg-purple-600 text-white" 
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Code</span>
              </div>
            </button>
          </div>
        </div>
        
        <div className="hidden md:flex flex-col lg:flex-row justify-center items-end gap-8">
          <div>
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              {themeOptions.map(option => (
                <button 
                  key={option.value}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-full transition-all ${
                    theme === option.value 
                      ? `border-${option.value === "dark" ? "slate" : option.value === "light" ? "amber" : "blue"}-400 ${option.color}` 
                      : 'border-gray-300 opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => handleThemeChange(option.value)}
                >
                  {option.icon}
                  <span className="text-sm font-medium">{option.name}</span>
                </button>
              ))}
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="w-[330px] h-[340px] relative perspective-1000 overflow-hidden">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={theme}
                    variants={slideVariants}
                    initial={slideDirection === "right" ? "enterRight" : "enterLeft"}
                    animate="center"
                    exit={slideDirection === "right" ? "exitLeft" : "exitRight"}
                    className="absolute inset-0"
                  >
                    <MajesticCard
                      theme={theme}
                      shadow
                      rounded="xl"
                      blurBackground={theme === "glass"}
                    >
                      {cardContent}
                    </MajesticCard>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          <div className="flex-1 rounded-lg overflow-hidden border border-zinc-300">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-300">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-1.5 rounded-md border border-zinc-300 hover:border-zinc-400 text-xs"
                  title="Toggle syntax theme"
                >
                  {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className="border border-zinc-300 hover:border-zinc-400 p-1.5 rounded-md text-xs flex items-center gap-1 transition-colors"
                  title="Copy code"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy Code"}
                </motion.button>
              </div>
            </div>
            
            <div className="overflow-auto max-h-[25rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SyntaxHighlighter
                    language="jsx"
                    style={isDarkMode ? vscDarkPlus : prism}
                    showLineNumbers
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      fontSize: '0.875rem',
                      borderRadius: 0,
                    }}
                  >
                    {generateCode()}
                  </SyntaxHighlighter>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        <div className="md:hidden">
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center justify-center w-full mb-4">
              <button 
                onClick={slidePrev}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <div className="mx-3 text-sm font-medium">
                {currentTheme.name}
              </div>
              
              <button 
                onClick={slideNext}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {themeOptions.map(option => (
                <button 
                  key={option.value}
                  className={`flex items-center gap-1 px-3 py-1.5 border rounded-full transition-all ${
                    theme === option.value 
                      ? `border-${option.value === "dark" ? "slate" : option.value === "light" ? "amber" : "blue"}-400 ${option.color}` 
                      : 'border-gray-300 opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => handleThemeChange(option.value)}
                >
                  {option.icon}
                  <span className="text-xs font-medium">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {activeTab === "preview" && (
            <div className="flex justify-center">
              <div className="w-full max-w-xs relative overflow-hidden">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={theme}
                    variants={slideVariants}
                    initial={slideDirection === "right" ? "enterRight" : "enterLeft"}
                    animate="center"
                    exit={slideDirection === "right" ? "exitLeft" : "exitRight"}
                    className="w-full"
                  >
                    <MajesticCard
                      theme={theme}
                      shadow
                      rounded="xl"
                      blurBackground={theme === "glass"}
                    >
                      {cardContent}
                    </MajesticCard>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
          
          {activeTab === "code" && (
            <div className="rounded-lg overflow-hidden border border-zinc-300">
              <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-300">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-1 rounded-md border border-zinc-300 hover:border-zinc-400 text-xs"
                    title="Toggle syntax theme"
                  >
                    {isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="border border-zinc-300 hover:border-zinc-400 p-1 rounded-md text-xs flex items-center gap-1 transition-colors"
                    title="Copy code"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span className="text-xs">{copied ? "Copied" : "Copy"}</span>
                  </motion.button>
                </div>
              </div>
              
              <div className="overflow-auto max-h-[60vh]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SyntaxHighlighter
                      language="jsx"
                      style={isDarkMode ? vscDarkPlus : prism}
                      showLineNumbers
                      customStyle={{
                        margin: 0,
                        padding: '0.75rem',
                        fontSize: '0.7rem',
                        borderRadius: 0,
                      }}
                    >
                      {generateCode()}
                    </SyntaxHighlighter>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardThemeCustomizer;