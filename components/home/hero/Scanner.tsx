"use client"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"
import Image from "next/image"

interface ScanResult {
  id: string
  type: "object" | "anomaly" | "data" | "threat"
  confidence: number
  position: { x: number; y: number }
  label: string
}

export const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasScanned, setHasScanned] = useState(false)
  const [scanCycle, setScanCycle] = useState(0)
   //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [progress, setProgress] = useState(0)
  const [scanResults, setScanResults] = useState<ScanResult[]>([])
   //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPhase, setCurrentPhase] = useState<string>("Initializing")
   //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showIndicators, setShowIndicators] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const scanTimer = useRef<NodeJS.Timeout | null>(null)
  const completeTimer = useRef<NodeJS.Timeout | null>(null)
  const progressTimer = useRef<NodeJS.Timeout | null>(null)
  const loopTimer = useRef<NodeJS.Timeout | null>(null)

  // Memoize arrays to prevent unnecessary re-renders
  const personScanResults = useMemo(() => [
    {
      id: "person-1",
      type: "object" as const,
      confidence: 95,
      position: { x: 50, y: 40 }, 
      label: "Person"
    }
  ], [])

  const phases = useMemo(() => [
    "Initializing Scanner",
    "Analyzing Structure", 
    "Processing Data",
    "Identifying Objects",
    "Finalizing Results",
  ], [])

  const scanSpeed = 2
  const scanColor = "emerald"
  // Removed unused scanType variable
  const autoScan = true
  const loop = true
  const showScanResults = true
  const scanIntensity = "medium"

  const colorMap = {
    emerald: {
      scan: "bg-emerald-500",
      glow: "bg-emerald-500/20 dark:bg-emerald-500/10",
      border: "border-emerald-500",
      gradient: "from-emerald-500/80 to-emerald-300/40",
      cssColor: "#10b981",
    },
  }

  const intensityMap = {
    medium: { glowIntensity: 0.6, scanLines: 2 },
  }

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
      setScanResults(personScanResults)

      setTimeout(() => {
        setScanComplete(false)
        setIsScanning(false)
        setShowIndicators(false)

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
    personScanResults,
    loop,
    autoScan,
    clearAllTimers,
  ])

  // Auto scan effect - now includes all dependencies
  useEffect(() => {
    if (autoScan && !isScanning) {
      runScan()
    }
    return () => {
      clearAllTimers()
    }
  }, [autoScan, isScanning, runScan, clearAllTimers])

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      clearAllTimers()
    }
  }, [clearAllTimers])

  const selectedColor = colorMap[scanColor]
  const intensity = intensityMap[scanIntensity]

  const renderScanPattern = () => {
    const patterns = []
    
    // Matrix scan pattern
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
    
    return patterns
  }

  return (
    <div className="h-[300px] w-[300px]">
      <div
        ref={ref}
        className="relative overflow-hidden cursor-pointer"
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
          {/* Use Next.js Image component instead of img tag */}
          <Image
            src="/assets/images/landing-page/img.webp"
            alt="Scanning image"
            fill
            className={cn(
              "object-cover transition-all duration-300",
              isScanning ? "hue-rotate-15 animate-pulse" : "",
            )}
            priority
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
    </div>
  )
}