'use client'

import React, { useState, useEffect } from "react"
import {
  Sun,
  Moon,
  Check,
  Copy,
  Eye,
  Code,
  Volume2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {  
  vscDarkPlus
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from "next-themes"
import { MusicPlayer } from "@/nuvyxui/components/MusicPlayer"

const lightTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: '#000000'
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: '#000000'
  }
};
const pitchBlackTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: '#09090B', 
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: '#09090B', 
  }
};

const nightTheme = pitchBlackTheme;

const MusicCardThemeCustomizer = () => {
  const { theme: systemTheme, setTheme } = useTheme()
  const [cardTheme, setCardTheme] = useState("spotify")
  const [copied, setCopied] = useState(false)
  const [syntaxDarkMode, setSyntaxDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState("preview")
  const [slideDirection, setSlideDirection] = useState("right")
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const isDarkMode = mounted && (systemTheme === 'dark' || (systemTheme === 'system' && syntaxDarkMode))

  const themeOptions = [
    {
      name: "Spotify",
      value: "spotify",
      icon: <Volume2 className="h-3.5 w-3.5" />,
      color: "text-green-400"
    },
    {
      name: "Cosmic",
      value: "cosmic",
      icon: <Volume2 className="h-3.5 w-3.5" />,
      color: "text-indigo-400"
    },
    {
      name: "Nebula",
      value: "nebula",
      icon: <Volume2 className="h-3.5 w-3.5" />,
      color: "text-purple-400"
    }
  ];

  const borderColors: Record<string, string> = {
    cosmic: 'border-indigo-400',
    nebula: 'border-purple-400',
    default: 'border-green-400',
  };

  const handleThemeChange = (newTheme: string) => {
    if (isAnimating || newTheme === cardTheme) return

    const currentIndex = themeOptions.findIndex(opt => opt.value === cardTheme)
    const newIndex = themeOptions.findIndex(opt => opt.value === newTheme)

    setIsAnimating(true)
    setSlideDirection(newIndex > currentIndex ? "right" : "left")
    setCardTheme(newTheme)

    setTimeout(() => {
      setIsAnimating(false)
    }, 400)
  }

  const toggleDarkMode = () => {
    if (!mounted) return
    
    if (systemTheme === 'dark') {
      setTheme('light')
    } else if (systemTheme === 'light') {
      setTheme('dark')
    } else {
      setSyntaxDarkMode(!syntaxDarkMode)
    }
  }

  const generateCode = () => {
    return `import { MusicPlayer } from "@/components/ui/music-player"

export default function PlayerExample() {
  return (
    <MusicPlayer
      theme="${cardTheme}"
      rounded="xl"
      artwork="/cover.png"
      trackTitle="Blinding Lights"
      artist="The Weeknd"
      album="After Hours"
      initialTime={45}
      totalDuration={217}
      controls={
      {shuffle: true, repeat: true, heart: true}
      }
    />
  )
}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    setCopied(false)
  }, [cardTheme])

  const slideVariants = {
    enterRight: {
      x: 300,
      opacity: 0
    },
    enterLeft: {
      x: -300,
      opacity: 0
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
  }

  if (!mounted) {
    return null;
  }

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
                    cardTheme === option.value
                      ? `${borderColors[option.value] || borderColors.default} ${option.color}`
                      : 'border-gray-300 dark:border-gray-700 opacity-70 hover:opacity-100'
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
              <div
                className="w-[330px] h-[400px] relative overflow-hidden"
                style={{ perspective: "1200px" }}
              >
                <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                  <motion.div
                    key={cardTheme}
                    variants={slideVariants}
                    initial={slideDirection === "right" ? "enterRight" : "enterLeft"}
                    animate="center"
                    exit={slideDirection === "right" ? "exitLeft" : "exitRight"}
                    className="absolute inset-0 will-change-transform"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <MusicPlayer 
                      theme={cardTheme} 
                      artwork="/assets/images/music-player/song.jpg"
                      shadow 
                      rounded="xl"
                      trackTitle="Blinding Lights"
                      artist="The Weeknd"
                      album="After Hours"
                      initialTime={45}
                      totalDuration={217}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="w-full lg:flex-1 rounded-lg overflow-hidden border border-zinc-300 dark:border-zinc-700 mt-6 lg:mt-0 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleDarkMode}
                  className="p-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-xs"
                  title="Toggle theme"
                >
                  {isDarkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className="border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 p-1.5 rounded-md text-xs flex items-center gap-1 transition-colors"
                  title="Copy code"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy Code"}
                </motion.button>
              </div>
            </div>
            <div className="overflow-hidden" style={{ height: '28rem' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={cardTheme}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SyntaxHighlighter
                    language="tsx"
                    style={isDarkMode ? nightTheme : lightTheme}
                    showLineNumbers
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      fontSize: '0.875rem',
                      borderRadius: 0,
                      height: '28rem',
                      minHeight: '28rem'
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
                    cardTheme === option.value
                      ? `border-${option.value === "cosmic" ? "indigo" : option.value === "nebula" ? "purple" : "green"}-400 ${option.color}`
                      : 'border-gray-300 dark:border-gray-700 opacity-70 hover:opacity-100'
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
              <div
                className="w-full max-w-xs relative overflow-hidden"
                style={{ perspective: "1200px" }}
              >
                <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                  <motion.div
                    key={cardTheme}
                    variants={slideVariants}
                    initial={slideDirection === "right" ? "enterRight" : "enterLeft"}
                    animate="center"
                    exit={slideDirection === "right" ? "exitLeft" : "exitRight"}
                    className="w-full will-change-transform"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <MusicPlayer 
                      theme={cardTheme} 
                      shadow 
                      rounded="xl"
                      initialTime={45}
                      totalDuration={217} 
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="rounded-lg overflow-hidden border border-zinc-300 dark:border-zinc-700">
              <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-300 dark:border-zinc-700 bg-white dark:bg-black">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleDarkMode}
                    className="p-1 rounded-md border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-xs"
                    title="Toggle theme"
                  >
                    {isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 p-1 rounded-md text-xs flex items-center gap-1 transition-colors"
                    title="Copy code"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span className="text-xs">{copied ? "Copied" : "Copy"}</span>
                  </motion.button>
                </div>
              </div>

              <div className="overflow-auto" style={{ height: '60vh', minHeight: '400px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cardTheme}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SyntaxHighlighter
                      language="tsx"
                      style={isDarkMode ? nightTheme : lightTheme}
                      customStyle={{
                        margin: 0,
                        padding: '0.75rem',
                        fontSize: '0.7rem',
                        borderRadius: 0,
                        minHeight: '400px'
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
                relative px-5 py-2 flex items-center justify-center gap-2 transition-all duration-200 rounded-md bg-black dark:bg-zinc-800 border border-black dark:border-zinc-700
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
  )
}

export default MusicCardThemeCustomizer