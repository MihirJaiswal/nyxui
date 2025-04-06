'use client'
import React, { useState, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, Repeat, Shuffle, MoreHorizontal, Sun, Moon, Check, Copy, Eye, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from "next/image";

interface SpotifyCardProps {
  theme: string;
  children: React.ReactNode;
  rounded?: string;
  shadow?: boolean;
}

const SpotifyCard = ({ theme, children, rounded, shadow }: SpotifyCardProps) => {
  const getThemeStyles = () => {
    const baseStyles = "transition-all duration-300";
    const shadowStyles = shadow ? "shadow-xl" : "";
    const roundedStyles = rounded === "xl" ? "rounded-xl" : "rounded-md";
    
    switch (theme) {
      case "spotify":
        return `
          bg-emerald-50 text-emerald-900
          dark:bg-gradient-to-br dark:from-emerald-900 dark:to-emerald-700 dark:text-white
          ${shadowStyles} ${roundedStyles} ${baseStyles}
        `.replace(/\s+/g,' ').trim();
    
      case "neon":
        return `
          bg-white text-green-600 border-2 border-green-400
          dark:bg-black dark:text-green-400 dark:border-green-400
          ${shadowStyles} ${roundedStyles} ${baseStyles}
        `.replace(/\s+/g,' ').trim();
    
      case "cosmic":
        return `
          bg-indigo-50 text-indigo-900 border border-indigo-200
          dark:bg-gradient-to-br dark:from-indigo-950 dark:to-blue-950 dark:text-white dark:border-indigo-300
          ${shadowStyles} ${roundedStyles} ${baseStyles}
        `.replace(/\s+/g,' ').trim();
    
      default:
        return `
          bg-white text-zinc-900
          dark:bg-zinc-900 dark:text-white
          ${shadowStyles} ${roundedStyles} ${baseStyles}
        `.replace(/\s+/g,' ').trim();
    }
  };
  
  return (
    <div className={getThemeStyles()}>
      {children}
    </div>
  );
};

const MusicCardThemeCustomizer = () => {
  const [theme, setTheme] = useState("gradient");
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("preview");
  const [slideDirection, setSlideDirection] = useState("right");
  const [themeIndex, setThemeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(45);
  const [isAnimating, setIsAnimating] = useState(false);
  const songDuration = 217; 

  const themeOptions = [
    {
      name: "Spotify",
      value: "gradient",
      icon: <Volume2 className="h-3.5 w-3.5" />,
      color: "text-green-400",
      bg: "bg-green-800"
    },
    {
      name: "Neon",
      value: "neon",
      icon: <Volume2 className="h-3.5 w-3.5" />,
      color: "text-green-400",
    },
    {
      name: "Cosmic",
      value: "cosmic",
      icon: <Volume2 className="h-3.5 w-3.5" />,
      color: "text-indigo-400",
    },
  ];

  const handleThemeChange = (newTheme: string) => {
    if (isAnimating || newTheme === theme) return;
    
    const currentIndex = themeOptions.findIndex(opt => opt.value === theme);
    const newIndex = themeOptions.findIndex(opt => opt.value === newTheme);
    
    setIsAnimating(true);
    setSlideDirection(newIndex > currentIndex ? "right" : "left");
    setThemeIndex(newIndex);
    setTheme(newTheme);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(time => {
          if (time >= songDuration) {
            setIsPlaying(false);
            return 0;
          }
          return time + 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const slideNext = () => {
    if (isAnimating) return;
    
    const nextIndex = (themeIndex + 1) % themeOptions.length;
    setIsAnimating(true);
    setSlideDirection("right");
    setThemeIndex(nextIndex);
    setTheme(themeOptions[nextIndex].value);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  const slidePrev = () => {
    if (isAnimating) return;
    
    const prevIndex = (themeIndex - 1 + themeOptions.length) % themeOptions.length;
    setIsAnimating(true);
    setSlideDirection("left");
    setThemeIndex(prevIndex);
    setTheme(themeOptions[prevIndex].value);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  const generateCode = () => {
    return `<SpotifyCard 
  theme="${theme}" 
  shadow 
  rounded="xl">
  <div className="overflow-hidden">
    <div className="w-full h-64 relative">
      <Image
        src="/api/placeholder/400/256"
        alt="Album artwork"
        width={400}
        height={256}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    </div>
    
    <div className="p-6 flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold mb-1">Blinding Lights</h3>
          <p className="text-sm text-gray-400">The Weeknd • After Hours</p>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Heart className="h-6 w-6" />
        </button>
      </div>
      
      <div className="mb-5">
        <div className="relative h-1.5 bg-gray-700 rounded-full overflow-hidden cursor-pointer">
          <div 
            className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
            style={{ width: '20%' }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">0:45</span>
          <span className="text-xs text-gray-400">3:37</span>
        </div>
      </div>
      
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Shuffle className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-5">
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipBack className="h-6 w-6" />
            </button>
            <button className="bg-white text-black rounded-full p-3 hover:scale-105 transition-transform">
              <Play className="h-6 w-6 fill-current" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <SkipForward className="h-6 w-6" />
            </button>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Repeat className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</SpotifyCard>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    setCopied(false);
  }, [theme]);

  const cardContent = (
    <div className="overflow-hidden">
      <div className="w-full h-44 relative">
        <Image
          src="/assets/images/song.png"
          alt="Album artwork"
          width={400}
          height={256}
          className="w-full h-full object-cover rounded-t-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>
      
      <div className="p-6 flex flex-col">
          <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Blinding Lights</h3>
            <p className="text-sm text-gray-400">The Weeknd • After Hours</p>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <Heart className="h-6 w-6" />
          </button>
        </div>
        
        <div className="mb-2">
          <div className="relative h-1 bg-gray-700 rounded-full overflow-hidden cursor-pointer">
            <div 
              className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
              style={{ width: `${(currentTime / songDuration) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
            <span className="text-xs text-gray-400">{formatTime(songDuration)}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <button className="text-gray-400 hover:text-white transition-colors">
              <Shuffle className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-5">
              <button className="text-gray-400 hover:text-white transition-colors">
                <SkipBack className="h-6 w-6" />
              </button>
              <button 
                className="bg-white text-black rounded-full p-3 hover:scale-105 transition-transform"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? 
                  <Pause className="h-6 w-6" /> : 
                  <Play className="h-6 w-6 fill-current" />
                }
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <SkipForward className="h-6 w-6" />
              </button>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors">
              <Repeat className="h-5 w-5" />
            </button>
          </div>
        </div>
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
        stiffness: 350,
        damping: 30,
        mass: 1,
        duration: 0.4
      }
    },
    exitRight: {
      x: 300,
      opacity: 0,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3
      }
    },
    exitLeft: {
      x: -300,
      opacity: 0,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3
      }
    }
  };

  return (
    <div className="px-6">
      <div className="max-w-6xl mx-auto">  
        <div className="hidden md:flex flex-col lg:flex-row justify-center items-center lg:items-end gap-16">
          <div className="w-full lg:w-auto">
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              {themeOptions.map(option => (
                <button 
                  key={option.value}
                  className={`flex bg-white dark:bg-black items-center gap-2 px-4 py-2 border rounded-full transition-all ${
                    theme === option.value 
                      ? `border-${option.value === "neon" ? "green" : option.value === "cosmic" ? "indigo" : "green"}-400 ${option.color}` 
                      : 'border-gray-300 opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => handleThemeChange(option.value)}
                  disabled={isAnimating}
                >
                  {option.icon}
                  <span className="text-sm font-medium">{option.name}</span>
                </button>
              ))}
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="w-[330px] h-[400px] relative overflow-hidden" style={{ perspective: "1200px" }}>
                <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                  <motion.div
                    key={theme}
                    variants={slideVariants}
                    initial={slideDirection === "right" ? "enterRight" : "enterLeft"}
                    animate="center"
                    exit={slideDirection === "right" ? "exitLeft" : "exitRight"}
                    className="absolute inset-0 will-change-transform"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <SpotifyCard
                      theme={theme}
                      shadow
                      rounded="xl"
                    >
                      {cardContent}
                    </SpotifyCard>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          
          <div className="w-full lg:flex-1 rounded-lg overflow-hidden border border-zinc-300 mt-6 lg:mt-0 overflow-hidden">
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
            <div className="overflow-hidden max-h-[25rem] md:max-h-[20rem] lg:max-h-[28rem]">
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
                    className="overflow-hidden scrollbar-hide"
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
            <div className="flex flex-wrap gap-2 justify-center">
              {themeOptions.map(option => (
                <button 
                  key={option.value}
                  className={`flex bg-white dark:bg-black items-center gap-1 px-3 py-1.5 border rounded-full transition-all ${
                    theme === option.value 
                      ? `border-${option.value === "neon" ? "green" : option.value === "cosmic" ? "indigo" : "green"}-400 ${option.color}` 
                      : 'border-gray-300 opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => handleThemeChange(option.value)}
                  disabled={isAnimating}
                >
                  {option.icon}
                  <span className="text-xs font-medium">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {activeTab === "preview" && (
            <div className="flex justify-center">
              <div className="w-full max-w-xs relative overflow-hidden" style={{ perspective: "1200px" }}>
                <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                  <motion.div
                    key={theme}
                    variants={slideVariants}
                    initial={slideDirection === "right" ? "enterRight" : "enterLeft"}
                    animate="center"
                    exit={slideDirection === "right" ? "exitLeft" : "exitRight"}
                    className="w-full will-change-transform"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <SpotifyCard
                      theme={theme}
                      shadow
                      rounded="xl"
                    >
                      {cardContent}
                    </SpotifyCard>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
          
          {activeTab === "code" && (
            <div className="rounded-lg overflow-hidden border border-zinc-300">
              <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-300 bg-white dark:bg-black">
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

<div className="flex justify-center my-6 md:hidden">
  <button
    onClick={() => setActiveTab(activeTab === "code" ? "preview" : "code")}
    className={`
      relative px-5 py-2 flex items-center justify-center gap-2 transition-all duration-200 rounded-md bg-black border border-black dark:border-gray-100
      focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500
      ${activeTab === "code"
        ? "text-gray-300"
        : "text-gray-300 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
      }
    `}
    aria-label={activeTab === "code" ? "Show Preview" : "Show Code"}
  >
    {activeTab === "code" ? (
      <>
        <Eye className="w-5 h-5" aria-hidden="true" />
        <span>Preview</span>
      </>
    ) : (
      <>
        <Code className="w-5 h-5" aria-hidden="true" />
        <span>Code</span>
      </>
    )}
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default MusicCardThemeCustomizer;