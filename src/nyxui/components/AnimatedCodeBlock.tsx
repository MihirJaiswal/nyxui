"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Play, Pause, Copy, Check, Terminal } from "lucide-react"

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
  const [displayedCode, setDisplayedCode] = useState("")
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLPreElement>(null)
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
      case "light":
        return {
          background: "bg-gray-100",
          text: "text-gray-900",
          lineNumbers: "text-gray-500",
          highlight: "bg-gray-200",
          border: "border-gray-300",
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
          text: "text-pink-400",
          lineNumbers: "text-purple-600",
          highlight: "bg-pink-900/30",
          border: "border-pink-700",
        }
      case "minimal":
        return {
          background: "bg-white",
          text: "text-gray-800",
          lineNumbers: "text-gray-400",
          highlight: "bg-gray-100",
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
        setDisplayedCode(code.substring(0, currentPosition + 1))
        setCurrentPosition(currentPosition + 1)
      }, typingSpeed)
    } else if (isPlaying && currentPosition >= code.length) {
      if (loop) {
        setTimeout(() => {
          setCurrentPosition(0)
          setDisplayedCode("")
        }, 1000)
      } else {
        setIsPlaying(false)
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isPlaying, currentPosition, code, typingSpeed, loop])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    if (onCopy) onCopy()
  }
  const displayedLines = displayedCode.split("\n")

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
            <button
              onClick={togglePlay}
              className="p-1 rounded hover:bg-gray-700 hover:bg-opacity-30 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
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

      <div className="relative">
        {blurEffect && theme === "terminal" && (
          <div className="absolute inset-0 pointer-events-none bg-green-400 opacity-[0.03] mix-blend-overlay" />
        )}

        <div className="flex">
          {showLineNumbers && (
            <div className={cn("text-xs p-4 text-right select-none min-w-[40px]", themeStyles.lineNumbers)}>
              {displayedLines.map((_, i) => (
                <div key={i} className="h-6">{i + 1}</div>
              ))}
            </div>
          )}
          <pre
            ref={codeRef}
            className="p-4 overflow-x-auto flex-1 font-mono text-sm w-full"
            style={{ position: "relative", minWidth: "100%" }}
          >
            {highlightLines.map((line) => (
              <div
                key={`highlight-${line}`}
                className={cn("absolute left-0 right-0 h-6", themeStyles.highlight)}
                style={{ 
                  top: `${(line - 1) * 24 + 16}px`,
                  zIndex: 0
                }}
              />
            ))}
            <code className="relative z-10 block whitespace-pre">
              {displayedCode}
            </code>
            {isPlaying && (
              <motion.span
                className="inline-block w-2 h-4 bg-current"
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
              />
            )}
          </pre>
        </div>
      </div>
    </div>
  )
}
