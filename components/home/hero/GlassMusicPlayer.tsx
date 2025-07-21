"use client"
import { GlassContainer } from "@/registry/ui/apple-glass-effect"
import { Pause, Play, SkipBack, SkipForward, Shuffle, Repeat } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

function GlassMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(45)
  const [currentTime, setCurrentTime] = useState(125) 
  const duration = 248

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1
          setProgress((newTime / duration) * 100)
          return newTime >= duration ? 0 : newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  return (
    <div className="">
      <GlassContainer
        blur={60}
        highlightOpacity={0.8}
        innerGlowOpacity={1}
        specularIntensity={0.8}
        className="h-66 w-76 px-6 py-5 bg-white/5"
      >
        <div className="h-full flex flex-col justify-between">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-neutral-900/40 dark:text-white/70 uppercase tracking-wider">Now Playing</span>
            </div>
            <div className="flex items-center gap-2">
              <Shuffle className="w-4 h-4 text-neutral-900/30 dark:text-white/50 hover:text-neutral-800/50 dark:hover:text-white/80 cursor-pointer transition-colors" />
              <Repeat className="w-4 h-4 text-neutral-900/30 dark:text-white/50 hover:text-neutral-800/50 dark:hover:text-white/80 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Album Art and Track Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <Image
                  src="/assets/images/landing-page/cover.jpeg"
                  alt="Album Cover"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              {isPlaying && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white truncate mb-1">Until I Found You</h2>
              <p className="text-sm text-neutral-900/70 dark:text-white/70 truncate mb-1">Stephen Sanchez</p>
              <p className="text-xs text-neutral-900/50 dark:text-white/50 truncate">Single • 2022</p>
            </div> 
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="flex-1 h-1.5 bg-zinc-900/10 dark:bg-white/20 rounded-full overflow-hidden cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const percentage = (x / rect.width) * 100
                  setProgress(Math.max(0, Math.min(100, percentage)))
                  setCurrentTime(Math.floor((percentage / 100) * duration))
                }}
              >
                <div
                  className="h-full bg-gradient-to-r from-white to-white/90 rounded-full transition-all duration-200 relative group-hover:from-blue-400 group-hover:to-blue-300"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-neutral-900/50 dark:text-white/50">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <SkipBack className="w-5 h-5 text-neutral-900/80 dark:text-white/80 hover:text-white" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 bg-white/60 dark:bg-white/15 hover:bg-white/25 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/20 shadow-lg hover:scale-105"
            >
              {isPlaying ? <Pause className="w-6 h-6 text-neutral-900 dark:text-white" /> : <Play className="w-6 h-6 text-neutral-900 dark:text-white ml-0.5" />}
            </button>

            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <SkipForward className="w-5 h-5 text-neutral-900/80 dark:text-white/80 hover:text-white" />
            </button>
          </div>
        </div>
      </GlassContainer>
    </div>
  )
}

export default GlassMusicPlayer
