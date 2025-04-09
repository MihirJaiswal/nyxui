"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Play, Pause, Copy, Check, Terminal, RotateCcw } from "lucide-react"

export interface AnimatedCodeBlockProps {
  code: string;
  language?: string;
  theme?: "dark" | "light" | "terminal" | "cyberpunk" | "minimal" | "nyx";
  typingSpeed?: number;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  title?: string;
  className?: string;
  autoPlay?: boolean
  loop?: boolean
  blurEffect?: boolean
  showControls?: boolean
  onCopy?: () => void
}

export function AnimatedCodeBlock({
  code,
  language = "javascript",
  theme = "dark",
  typingSpeed = 50,
  showLineNumbers = true,
  highlightLines = [],
  title,
  className,
  autoPlay = false,
  loop = false,
  blurEffect = false,
  showControls = true,
  onCopy,
}: AnimatedCodeBlockProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [copied, setCopied] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const codeRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const getThemeStyles = () => {
    switch (theme) {
      case "dark":
        return {
          background: "bg-gray-900",
          text: "text-gray-100",
          lineNumbers: "text-gray-500",
          highlight: "bg-gray-800",
          border: "border-gray-700",
        }
      case "minimal":
        return {
          background: "bg-yellow-100",
          text: "text-gray-900",
          lineNumbers: "text-gray-500",
          highlight: "bg-yellow-200",
          border: "border-yellow-300",
        }
      case "terminal":
        return {
          background: "bg-black",
          text: "text-green-400",
          lineNumbers: "text-green-700",
          highlight: "bg-green-900/30",
          border: "border-green-900",
        }
      case "cyberpunk":
        return {
          background: "bg-purple-950",
          text: "text-pink-300",
          lineNumbers: "text-purple-600",
          highlight: "bg-pink-900/30",
          border: "border-pink-700",
        }
      case "light":
        return {
          background: "bg-white",
          text: "text-gray-800",
          lineNumbers: "text-gray-400",
          highlight: "bg-gray-200",
          border: "border-gray-200",
        }
      case "nyx":
        return {
          background: "bg-black",
          text: "text-purple-100",
          lineNumbers: "text-purple-500",
          highlight: "bg-purple-900/30",
          border: "border-purple-700",
        }
      default:
        return {
          background: "bg-gray-900",
          text: "text-gray-100",
          lineNumbers: "text-gray-500",
          highlight: "bg-gray-800",
          border: "border-gray-700",
        }
    }
  }

  const themeStyles = getThemeStyles()

  useEffect(() => {
    if (isPlaying && currentPosition < code.length) {
      timerRef.current = setTimeout(() => {
        setCurrentPosition(currentPosition + 1)
      }, typingSpeed)
    } else if (isPlaying && currentPosition >= code.length) {
      if (loop) {
        setTimeout(() => {
          setCurrentPosition(0)
        }, 1000)
      } else {
        setIsPlaying(false)
        setCompleted(true)
        setIsPaused(false)
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isPlaying, currentPosition, code, typingSpeed, loop])

  const togglePlay = () => {
    if (isPlaying) {
      setIsPaused(true)
    } else if (completed) {
      restartAnimation()
    } else {
      setIsPaused(false)
    }
    setIsPlaying(!isPlaying)
  }

  const restartAnimation = () => {
    setCurrentPosition(0)
    setIsPlaying(true)
    setCompleted(false)
    setIsPaused(false)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    if (onCopy) onCopy()
  }
  
  const codeLines = code.split("\n")
  const renderLines = () => {
    let remainingChars = currentPosition
    const result = []
    
    for (let i = 0; i < codeLines.length; i++) {
      const line = codeLines[i]
      const lineLength = line.length + 1 
      
      if (remainingChars <= 0) {
        result.push("")
      } else if (remainingChars >= lineLength) {
        result.push(line)
        remainingChars -= lineLength
      } else {
        result.push(line.substring(0, remainingChars))
        remainingChars = 0
      }
    }
    
    return result
  }
  
  const displayedLines = completed ? code.split("\n") : renderLines()
  
  const getCursorLineIndex = () => {
    if (!isPlaying && !isPaused) return -1
    
    let charsProcessed = 0
    for (let i = 0; i < codeLines.length; i++) {
      const lineLength = codeLines[i].length + 1 
      charsProcessed += lineLength
      
      if (currentPosition < charsProcessed) {
        return i
      }
    }
    
    return codeLines.length - 1
  }
  
  const cursorLineIndex = getCursorLineIndex()

  return (
    <div
      className={cn(
        "animated-code-block rounded-lg overflow-hidden",
        themeStyles.background,
        themeStyles.text,
        themeStyles.border,
        "border",
        className,
      )}
    >
      <div className="flex items-center justify-between p-2 border-b border-opacity-20">
        <div className="flex items-center gap-2">
          <Terminal size={16} />
          <span className="text-sm font-medium">{title || language}</span>
        </div>
        {showControls && (
          <div className="flex items-center gap-2">
            {completed ? (
              <button
                onClick={restartAnimation}
                className="p-1 rounded hover:bg-gray-700 hover:bg-opacity-30 transition-colors"
                aria-label="Repeat animation"
              >
                <RotateCcw size={14} />
              </button>
            ) : (
              <button
                onClick={togglePlay}
                className="p-1 rounded hover:bg-gray-700 hover:bg-opacity-30 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
            )}
            <button
              onClick={copyCode}
              className="p-1 rounded hover:bg-gray-700 hover:bg-opacity-30 transition-colors"
              aria-label="Copy code"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden">
        {blurEffect && theme === "terminal" && (
          <div className="absolute inset-0 pointer-events-none bg-green-400 opacity-[0.03] mix-blend-overlay" />
        )}

        <div className="overflow-x-auto">
          <div className="flex min-w-full">
            {showLineNumbers && (
              <div className={cn("text-xs py-4 px-2 text-right select-none", themeStyles.lineNumbers)}>
                {codeLines.map((_, i) => (
                  <div key={i} className="h-6 flex items-center justify-end">{i + 1}</div>
                ))}
              </div>
            )}

            <div className="relative py-4 flex-grow" ref={codeRef}>
              {highlightLines.map((lineNum) => (
                <div
                  key={`highlight-${lineNum}`}
                  className={cn("absolute left-0 right-0 h-6", themeStyles.highlight)}
                  style={{ top: `${(lineNum - 1) * 24 + 16}px` }}
                />
              ))}

              <div className="relative z-10 px-4 font-mono text-sm">
                {codeLines.map((line, i) => (
                  <div key={i} className="h-6 whitespace-pre">
                    {displayedLines[i] || ""}
                    {i === cursorLineIndex && (
                      <motion.span
                        className="inline-block w-2 h-5 bg-current -mb-0.5"
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}