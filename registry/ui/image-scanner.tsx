"use client"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Activity, CheckCircle } from "lucide-react"

export interface ImageScannerProps {
  image: string
  alt?: string
  scanSpeed?: number
  scanColor?: "emerald" | "blue" | "purple" | "amber" | "red" | "cyan" | "pink"
  scanType?: "default" | "grid" | "radar" | "pulse" | "wave" | "matrix"
  className?: string
  onScanComplete?: (results?: ScanResult[]) => void
  autoScan?: boolean
  scanDelay?: number
  scanAtScroll?: boolean
  showDataOverlay?: boolean
  showProgress?: boolean
  scanIntensity?: "low" | "medium" | "high" | "extreme"
  showScanResults?: boolean
  loop?: boolean
  scanResults?: ScanResult[]
  triggerScan?: boolean
  disableClickToScan?: boolean
}

interface ScanResult {
  id: string
  type: "object" | "anomaly" | "data" | "threat"
  confidence: number
  position: { x: number; y: number }
  label: string
}

export const ImageScanner = ({
  image,
  alt = "Scanning image",
  scanSpeed = 2,
  scanColor = "emerald",
  scanType = "default",
  className,
  onScanComplete,
  autoScan = false,
  scanDelay = 0,
  scanAtScroll = false,
  showDataOverlay = true,
  showProgress = true,
  scanIntensity = "medium",
  showScanResults = true,
  loop = false,
  scanResults: externalScanResults,
  triggerScan,
  disableClickToScan = false,
}: ImageScannerProps) => {
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [hasScanned, setHasScanned] = useState(false)
  const [scanCycle, setScanCycle] = useState(0)
  const [progress, setProgress] = useState(0)
  const [scanResults, setScanResults] = useState<ScanResult[]>([])
  const [currentPhase, setCurrentPhase] = useState<string>("Initializing")
  const [showIndicators, setShowIndicators] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const scanTimer = useRef<NodeJS.Timeout | null>(null)
  const completeTimer = useRef<NodeJS.Timeout | null>(null)
  const progressTimer = useRef<NodeJS.Timeout | null>(null)
  const loopTimer = useRef<NodeJS.Timeout | null>(null)

  const colorMap = {
    emerald: {
      scan: "bg-emerald-500",
      glow: "bg-emerald-500/20 dark:bg-emerald-500/10",
      border: "border-emerald-500",
      gradient: "from-emerald-500/80 to-emerald-300/40",
      cssColor: "#10b981",
    },
    blue: {
      scan: "bg-blue-500",
      glow: "bg-blue-500/20 dark:bg-blue-500/10",
      border: "border-blue-500",
      gradient: "from-blue-500/80 to-blue-300/40",
      cssColor: "#3b82f6",
    },
    purple: {
      scan: "bg-purple-500",
      glow: "bg-purple-500/20 dark:bg-purple-500/10",
      border: "border-purple-500",
      gradient: "from-purple-500/80 to-purple-300/40",
      cssColor: "#8b5cf6",
    },
    amber: {
      scan: "bg-amber-500",
      glow: "bg-amber-500/20 dark:bg-amber-500/10",
      border: "border-amber-500",
      gradient: "from-amber-500/80 to-amber-300/40",
      cssColor: "#f59e0b",
    },
    red: {
      scan: "bg-red-500",
      glow: "bg-red-500/20 dark:bg-red-500/10",
      border: "border-red-500",
      gradient: "from-red-500/80 to-red-300/40",
      cssColor: "#ef4444",
    },
    cyan: {
      scan: "bg-cyan-500",
      glow: "bg-cyan-500/20 dark:bg-cyan-500/10",
      border: "border-cyan-500",
      gradient: "from-cyan-500/80 to-cyan-300/40",
      cssColor: "#06b6d4",
    },
    pink: {
      scan: "bg-pink-500",
      glow: "bg-pink-500/20 dark:bg-pink-500/10",
      border: "border-pink-500",
      gradient: "from-pink-500/80 to-pink-300/40",
      cssColor: "#ec4899",
    },
  }

  const intensityMap = {
    low: { glowIntensity: 0.3, scanLines: 1 },
    medium: { glowIntensity: 0.6, scanLines: 2 },
    high: { glowIntensity: 0.8, scanLines: 3 },
    extreme: { glowIntensity: 1.0, scanLines: 5 },
  }

  const phases = [
    "Initializing Scanner",
    "Analyzing Structure",
    "Processing Data",
    "Identifying Objects",
    "Finalizing Results",
  ]

  const generateScanResults = useCallback((): ScanResult[] => {
    if (externalScanResults) return externalScanResults

    const results: ScanResult[] = []
    const resultTypes = ["object", "anomaly", "data", "threat"] as const
    const labels = {
      object: ["Person", "Vehicle", "Building", "Equipment"],
      anomaly: ["Unknown Signal", "Interference", "Distortion"],
      data: ["Metadata", "Timestamp", "Location Data"],
      threat: ["Security Risk", "Unauthorized Access", "Suspicious Activity"],
    }

    for (let i = 0; i < Math.floor(Math.random() * 5) + 2; i++) {
      const type = resultTypes[Math.floor(Math.random() * resultTypes.length)]
      results.push({
        id: `result-${i}`,
        type,
        confidence: Math.floor(Math.random() * 30) + 70,
        position: {
          x: Math.floor(Math.random() * 80) + 10,
          y: Math.floor(Math.random() * 80) + 10,
        },
        label: labels[type][Math.floor(Math.random() * labels[type].length)],
      })
    }
    return results
  }, [externalScanResults])

  const clearAllTimers = useCallback(() => {
    if (scanTimer.current) {
      clearTimeout(scanTimer.current)
      scanTimer.current = null
    }
    if (completeTimer.current) {
      clearTimeout(completeTimer.current)
      completeTimer.current = null
    }
    if (progressTimer.current) {
      clearInterval(progressTimer.current)
      progressTimer.current = null
    }
    if (loopTimer.current) {
      clearTimeout(loopTimer.current)
      loopTimer.current = null
    }
  }, [])

  const runScan = useCallback(() => {
    if (isScanning) return

    clearAllTimers()
    setIsScanning(true)
    setScanComplete(false)
    setScanCycle((prev) => prev + 1)
    setProgress(0)
    setCurrentPhase(phases[0])
    setScanResults([])
    setShowIndicators(true)

    // Progress simulation
    if (showProgress) {
      let currentProgress = 0
      progressTimer.current = setInterval(() => {
        currentProgress += Math.random() * 15 + 5
        if (currentProgress >= 100) {
          currentProgress = 100
          if (progressTimer.current) {
            clearInterval(progressTimer.current)
            progressTimer.current = null
          }
        }
        setProgress(currentProgress)
      }, 200)
    }

    // Phase progression
    phases.forEach((phase, index) => {
      setTimeout(
        () => {
          setCurrentPhase(phase)
        },
        (scanSpeed * 1000 * index) / phases.length,
      )
    })

    // Complete scan
    completeTimer.current = setTimeout(() => {
      setScanComplete(true)
      setHasScanned(true)
      const results = generateScanResults()
      setScanResults(results)

      if (onScanComplete) onScanComplete(results)

      setTimeout(() => {
        setScanComplete(false)
        setIsScanning(false)
        setShowIndicators(false)

        if (progressTimer.current) {
          clearInterval(progressTimer.current)
          progressTimer.current = null
        }

        if (loop || autoScan) {
          loopTimer.current = setTimeout(() => {
            runScan()
          }, 1000)
        }
      }, 2000)
    }, scanSpeed * 1000)
  }, [
    isScanning,
    scanSpeed,
    phases,
    showProgress,
    generateScanResults,
    onScanComplete,
    loop,
    autoScan,
    clearAllTimers,
  ])

  // Intersection Observer for scroll trigger
  useEffect(() => {
    if (!scanAtScroll || !ref.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !hasScanned && !isScanning) {
          runScan()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [scanAtScroll, hasScanned, isScanning, runScan])

  // Auto scan effect
  useEffect(() => {
    if (autoScan && !isScanning) {
      scanTimer.current = setTimeout(() => {
        runScan()
      }, scanDelay * 1000)
    }
    return () => {
      if (scanTimer.current) {
        clearTimeout(scanTimer.current)
        scanTimer.current = null
      }
    }
  }, [autoScan, scanDelay, runScan, isScanning])

  // Trigger scan effect
  useEffect(() => {
    if (triggerScan && !isScanning) {
      runScan()
    }
  }, [triggerScan, isScanning, runScan])

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers()
    }
  }, [clearAllTimers])

  const selectedColor = colorMap[scanColor] || colorMap.emerald
  const intensity = intensityMap[scanIntensity]

  const renderScanPattern = () => {
    const patterns = []
    switch (scanType) {
      case "grid":
        for (let i = 0; i < intensity.scanLines; i++) {
          patterns.push(
            <motion.div
              key={`grid-h-${i}-${scanCycle}`}
              className={cn("absolute left-0 right-0 h-0.5", selectedColor.scan)}
              style={{ top: `${(i + 1) * (100 / (intensity.scanLines + 1))}%` }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
              transition={{ duration: scanSpeed, delay: i * 0.2 }}
            />,
            <motion.div
              key={`grid-v-${i}-${scanCycle}`}
              className={cn("absolute top-0 bottom-0 w-0.5", selectedColor.scan)}
              style={{ left: `${(i + 1) * (100 / (intensity.scanLines + 1))}%` }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 0] }}
              transition={{ duration: scanSpeed, delay: i * 0.2 + 0.1 }}
            />,
          )
        }
        break
      case "radar":
        patterns.push(
          <motion.div
            key={`radar-sweep-${scanCycle}`}
            className="absolute top-1/2 left-1/2 origin-left pointer-events-none"
            style={{
              width: "50%",
              height: "2px",
              transformOrigin: "left center",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ rotate: 0 }}
            animate={{
               rotate: 380,
               opacity: [1,1,1,1,0]
              }}
            transition={{
              duration: scanSpeed,
              ease: "linear",
              repeat: 0,
            }}
          >
            <div
              className={cn("w-full h-full", selectedColor.scan)}
              style={{
                background: `linear-gradient(to right, ${selectedColor.cssColor}, transparent)`,
                boxShadow: `0 0 10px ${selectedColor.cssColor}`,
              }}
            />
          </motion.div>,
          <motion.div
            key={`radar-center-${scanCycle}`}
            className={cn(
              "absolute top-1/2 left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2",
              selectedColor.scan,
            )}
            style={{
              boxShadow: `0 0 8px ${selectedColor.cssColor}`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
          />,
          <motion.div
            key={`radar-ring1-${scanCycle}`}
            className={cn(
              "absolute top-1/2 left-1/2 w-24 h-24 rounded-full border transform -translate-x-1/2 -translate-y-1/2",
              selectedColor.border,
            )}
            style={{
              borderColor: `${selectedColor.cssColor}60`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          />,
          <motion.div
            key={`radar-ring2-${scanCycle}`}
            className={cn(
              "absolute top-1/2 left-1/2 w-36 h-36 rounded-full border transform -translate-x-1/2 -translate-y-1/2",
              selectedColor.border,
            )}
            style={{
              borderColor: `${selectedColor.cssColor}40`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.7 }}
          />,
          <motion.div
            key={`radar-ring3-${scanCycle}`}
            className={cn(
              "absolute top-1/2 left-1/2 w-48 h-48 rounded-full border transform -translate-x-1/2 -translate-y-1/2",
              selectedColor.border,
            )}
            style={{
              borderColor: `${selectedColor.cssColor}20`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.9 }}
          />,
          <motion.div
            key={`radar-trail-${scanCycle}`}
            className="absolute top-1/2 left-1/2 origin-left pointer-events-none"
            style={{
              width: "50%",
              height: "50%",
              transformOrigin: "left center",
              transform: "translate(-50%, -50%)",
              background: `conic-gradient(from 0deg, transparent, ${selectedColor.cssColor}20, transparent)`,
              borderRadius: "0 100% 100% 0",
            }}
            initial={{ rotate: 0, opacity: 0.5 }}
            animate={{ rotate: 360, opacity: 0.5 }}
            transition={{
              duration: scanSpeed,
              ease: "linear",
              repeat: 0,
            }}
          />,
        )
        break
      case "pulse":
        for (let i = 0; i < 3; i++) {
          patterns.push(
            <motion.div
              key={`pulse-${i}-${scanCycle}`}
              className={cn("absolute inset-0 border-2 rounded-full", selectedColor.border)}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.5, 2], opacity: [1, 0.5, 0] }}
              transition={{ duration: scanSpeed, delay: i * 0.3 }}
            />,
          )
        }
        break
      case "wave":
        patterns.push(
          <motion.div
            key={`wave-${scanCycle}`}
            className={cn("absolute inset-0 bg-gradient-to-r", selectedColor.gradient)}
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: scanSpeed, ease: "easeInOut" }}
          />,
        )
        break
      case "matrix":
        for (let i = 0; i < 12; i++) {
          patterns.push(
            <motion.div
              key={`matrix-line-${i}-${scanCycle}`}
              className="absolute top-0 bottom-0 w-0.5"
              style={{
                left: `${(i * 100) / 12}%`,
                background: `linear-gradient(to bottom, transparent, ${selectedColor.cssColor}, transparent)`,
                boxShadow: `0 0 8px ${selectedColor.cssColor}`,
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scaleY: [0, 1, 1, 1],
              }}
              transition={{
                duration: scanSpeed,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />,
          )
        }

        for (let col = 0; col < 8; col++) {
          patterns.push(
            <motion.div
              key={`matrix-cascade-${col}-${scanCycle}`}
              className="absolute top-0 text-xs font-mono leading-tight"
              style={{
                left: `${(col * 100) / 8 + 1}%`,
                color: selectedColor.cssColor,
                textShadow: `0 0 8px ${selectedColor.cssColor}`,
                fontFamily: "monospace",
              }}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{
                y: "100%",
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: scanSpeed * 1.2,
                delay: col * 0.1,
                ease: "linear",
              }}
            >
              {Array.from({ length: 20 }, (_, row) => {
                const chars = ["0", "1", "ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ", "0", "1"]
                const randomChar = chars[Math.floor(Math.random() * chars.length)]
                return (
                  <motion.div
                    key={`char-${row}`}
                    className="block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.7, 0] }}
                    transition={{
                      duration: 0.5,
                      delay: row * 0.05,
                      repeat: 0,
                    }}
                  >
                    {randomChar}
                  </motion.div>
                )
              })}
            </motion.div>,
          )
        }

        patterns.push(
          <motion.div
            key={`matrix-grid-${scanCycle}`}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(90deg, ${selectedColor.cssColor}20 1px, transparent 1px),
                linear-gradient(${selectedColor.cssColor}20 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0.3, 0] }}
            transition={{
              duration: scanSpeed,
              ease: "easeInOut",
            }}
          />,
        )

        patterns.push(
          <motion.div
            key={`matrix-wave-${scanCycle}`}
            className="absolute left-0 right-0 h-8"
            style={{
              background: `linear-gradient(to bottom, transparent, ${selectedColor.cssColor}40, transparent)`,
              boxShadow: `0 0 20px ${selectedColor.cssColor}60`,
            }}
            initial={{ top: "-10%", opacity: 0 }}
            animate={{
              top: "110%",
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: scanSpeed,
              ease: "linear",
            }}
          />,
        )
        break
        default: 
        // Single scanline moving from top to bottom
        patterns.push(
          <motion.div
            key={`scanline-${scanCycle}`}
            className={cn(
              "absolute left-0 right-0 h-1 pointer-events-none",
              selectedColor.scan,
            )}
            initial={{ top: 0, opacity: 0.7 }}
            animate={{ top: "100%", opacity: 0.7 }}
            transition={{ duration: scanSpeed, ease: "linear" }}
          />,
        )

        // Corners
        const corners = [
          { position: "top-0 left-0", borders: "border-t-2 border-l-2" },
          { position: "top-0 right-0", borders: "border-t-2 border-r-2" },
          { position: "bottom-0 left-0", borders: "border-b-2 border-l-2" },
          { position: "bottom-0 right-0", borders: "border-b-2 border-r-2" },
        ]

        corners.forEach((corner, index) => {
          patterns.push(
            <motion.div
              key={`corner-${index}-${scanCycle}`}
              className={cn(
                "absolute w-8 h-8 pointer-events-none",
                corner.position,
                corner.borders,
                selectedColor.border,
              )}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            />,
          )
        })
    }
    return patterns
  }

  const startScan = () => {
    if (!disableClickToScan) {
      runScan()
    }
  }

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className, !disableClickToScan && "cursor-pointer")}
      onClick={!disableClickToScan ? startScan : undefined}
    >
      <div
        className={cn(
          "w-full h-full relative overflow-hidden transition-all duration-300",
          scanComplete ? "ring-2 ring-offset-2 dark:ring-offset-gray-900" : "",
          scanComplete ? selectedColor.border : "",
          isScanning ? "backdrop-blur-sm" : "",
          isScanning ? "brightness-110 contrast-110" : "",
        )}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={alt}
          height={500}
          width={500}
          quality={100}
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            isScanning ? "hue-rotate-15 animate-pulse" : "",
          )}
        />

        {isScanning && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-pulse" />
        )}

        <AnimatePresence mode="wait">{isScanning && renderScanPattern()}</AnimatePresence>
        
        {isScanning && (
          <motion.div
            className={cn("absolute inset-0 pointer-events-none", selectedColor.glow)}
            initial={{ opacity: 0 }}
            animate={{ opacity: intensity.glowIntensity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {showDataOverlay && showIndicators && (isScanning || scanComplete) && (
          <motion.div
            className="absolute top-4 left-4 right-4 text-xs font-mono text-white bg-black/60 p-2 rounded backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-3 h-3" />
              <span>SCANNER ACTIVE</span>
            </div>
            <div className="text-xs opacity-80">
              {isScanning && !scanComplete && `Phase: ${currentPhase}`}
              {scanComplete && "Analysis Complete"}
            </div>
            {showProgress && isScanning && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <motion.div
                    className={cn("h-1 rounded-full", selectedColor.scan)}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}

        {showScanResults && scanComplete && scanResults.length > 0 && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {scanResults.map((result) => (
              <motion.div
                key={result.id}
                className="absolute"
                style={{
                  left: `${result.position.x}%`,
                  top: `${result.position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="relative">
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full border-2 animate-pulse",
                      result.type === "threat"
                        ? "border-red-500 bg-red-500/20"
                        : result.type === "anomaly"
                          ? "border-amber-500 bg-amber-500/20"
                          : result.type === "data"
                            ? "border-blue-500 bg-blue-500/20"
                            : "border-emerald-500 bg-emerald-500/20",
                    )}
                  />
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-mono text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap">
                    {result.label}
                    <div className="text-xs opacity-70">{result.confidence}%</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {(isScanning || scanComplete) && (
          <motion.div
            className="absolute bottom-4 right-4 flex items-center gap-2 text-xs font-mono text-white bg-black/60 px-3 py-1 rounded backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {isScanning && !scanComplete && (
              <>
                <motion.div
                  className={cn("w-2 h-2 rounded-full", selectedColor.scan)}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                />
                <span>SCANNING</span>
              </>
            )}
            {scanComplete && (
              <>
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>COMPLETE</span>
              </>
            )}
          </motion.div>
        )}

        <div className="absolute inset-0 pointer-events-none">
          <div className={cn("absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 opacity-30", selectedColor.border)} />
          <div className={cn("absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 opacity-30", selectedColor.border)} />
          <div className={cn("absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 opacity-30", selectedColor.border)} />
          <div className={cn("absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 opacity-30", selectedColor.border)} />
        </div>

        {isScanning && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                ${selectedColor.cssColor}10 2px,
                ${selectedColor.cssColor}10 4px
              )`,
            }}
            animate={{
              opacity: [0, 0.3, 0, 0.2, 0],
              x: [0, 2, -2, 1, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        )}
        
        {autoScan && (
          <motion.div
            className="absolute top-2 left-2 flex items-center gap-1 text-xs font-mono text-white bg-black/60 px-2 py-1 rounded backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className={cn("w-2 h-2 rounded-full", selectedColor.scan)}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
            <span>AUTO</span>
            {loop && <span className="text-xs opacity-70">∞</span>}
          </motion.div>
        )}
      </div>
    </div>
  )
}
