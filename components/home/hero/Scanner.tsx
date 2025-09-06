"use client"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"
import Image from "next/image"

interface ScanResult {
  id: string
  type: "object" | "anomaly" | "data" | "threat"
  confidence: number
  position: { x: number; y: number }
  label: string
}

const cn = (...classes: (string | undefined | false)[]) => {
  return classes.filter(Boolean).join(' ')
}

const ScannerSkeleton = () => {
  return (
    <div className="h-[300px] w-[300px]">
      <div className="relative overflow-hidden w-full h-full">
        <div className="w-full h-full relative overflow-hidden bg-zinc-900">
          <Image
            src="/assets/images/landing-page/img.webp"
            alt="AI Scanner Target"
            width={300}
            height={300}
            priority
            className="w-full h-full object-cover"
            fetchPriority="high"
            decoding="sync"
            loading="eager"
          />
          {/* Static corner brackets */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 opacity-30 border-gray-400 dark:border-gray-600" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 opacity-30 border-gray-400 dark:border-gray-600" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 opacity-30 border-gray-400 dark:border-gray-600" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 opacity-30 border-gray-400 dark:border-gray-600" />
          </div>
          
          {/* Subtle loading indicator overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-xs font-mono bg-white/90 dark:bg-black/90 px-3 py-2 rounded backdrop-blur-sm border border-green-600">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-600"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
                <span className="text-green-600">INITIALIZING...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main scanner component (lazy loaded after page load)
const ScannerCore = ({ onImageLoad }: { onImageLoad?: () => void }) => {
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [scanCycle, setScanCycle] = useState(0)
  const [scanResults, setScanResults] = useState<ScanResult[]>([])
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const scanTimer = useRef<NodeJS.Timeout | null>(null)
  const completeTimer = useRef<NodeJS.Timeout | null>(null)
  const loopTimer = useRef<NodeJS.Timeout | null>(null)

  const emeraldColor = {
    scan: "bg-emerald-500",
    border: "border-emerald-500",
    cssColor: "#10b981",
  }

  const personScanResults = useMemo(() => [
    {
      id: "person-1",
      type: "object" as const,
      confidence: 95,
      position: { x: 50, y: 40 },
      label: "Person"
    }
  ], [])

  const clearAllTimers = useCallback(() => {
    if (scanTimer.current) {
      clearTimeout(scanTimer.current)
      scanTimer.current = null
    }
    if (completeTimer.current) {
      clearTimeout(completeTimer.current) 
      completeTimer.current = null
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
    setScanResults([])

    completeTimer.current = setTimeout(() => {
      setScanComplete(true)
      setScanResults(personScanResults)

      setTimeout(() => {
        setScanComplete(false)
        setIsScanning(false)

        loopTimer.current = setTimeout(() => {
          runScan()
        }, 1000)
      }, 2000)
    }, 2000)
  }, [isScanning, clearAllTimers, personScanResults])

  useEffect(() => {
    if (!imageLoaded) return
    
    const startTimer = setTimeout(() => {
      runScan()
    }, 1000)

    return () => clearTimeout(startTimer)
  }, [runScan, imageLoaded])

  useEffect(() => {
    return () => clearAllTimers()
  }, [clearAllTimers])

  const handleImageLoad = () => {
    setImageLoaded(true)
    onImageLoad?.()
  }

  const renderMatrixPattern = () => {
    const patterns = []
    
    for (let i = 0; i < 12; i++) {
      patterns.push(
        <motion.div
          key={`matrix-line-${i}-${scanCycle}`}
          className="absolute top-0 bottom-0 w-0.5"
          style={{
            left: `${(i * 100) / 12}%`,
            background: `linear-gradient(to bottom, transparent, ${emeraldColor.cssColor}, transparent)`,
            boxShadow: `0 0 8px ${emeraldColor.cssColor}`,
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scaleY: [0, 1, 1, 1],
          }}
          transition={{
            duration: 2,
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
            color: emeraldColor.cssColor,
            textShadow: `0 0 8px ${emeraldColor.cssColor}`,
            fontFamily: "monospace",
          }}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{
            y: "100%",
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.4,
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
            linear-gradient(90deg, ${emeraldColor.cssColor}20 1px, transparent 1px),
            linear-gradient(${emeraldColor.cssColor}20 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0.3, 0] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      />,
    )

    patterns.push(
      <motion.div
        key={`matrix-wave-${scanCycle}`}
        className="absolute left-0 right-0 h-8"
        style={{
          background: `linear-gradient(to bottom, transparent, ${emeraldColor.cssColor}40, transparent)`,
          boxShadow: `0 0 20px ${emeraldColor.cssColor}60`,
        }}
        initial={{ top: "-10%", opacity: 0 }}
        animate={{
          top: "110%",
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          ease: "linear",
        }}
      />,
    )
    
    return patterns
  }

  return (
    <div className="h-[300px] w-[300px]">
      <div className="relative overflow-hidden w-full h-full">
        <div
          className={cn(
            "w-full h-full relative overflow-hidden transition-all duration-500",
            scanComplete ? `ring-2 ring-offset-2 dark:ring-offset-gray-900 ${emeraldColor.border}` : "",
            isScanning ? "backdrop-blur-sm brightness-110 contrast-110" : "",
          )}
        >
          <Image
            src="/assets/images/landing-page/img.webp"
            alt="AI Scanner Target"
            width={300}
            height={300}
            quality={100}
            loading="lazy"
            className={cn(
              "w-full h-full object-cover transition-all duration-500 ease-out",
              isScanning ? "hue-rotate-15 animate-pulse" : "",
            )}
            onLoad={handleImageLoad}
          />

          {/* Scan overlay effects */}
          {isScanning && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-pulse" />
          )}

          {/* Matrix scan pattern */}
          <AnimatePresence mode="wait">
            {isScanning && renderMatrixPattern()}
          </AnimatePresence>
          
          {/* Scanning glow effect */}
          {isScanning && (
            <motion.div
              className="absolute inset-0 pointer-events-none bg-emerald-500/20 dark:bg-emerald-500/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Scan results indicators */}
          {scanComplete && scanResults.length > 0 && (
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
                    <div className="w-3 h-3 rounded-full border-2 animate-pulse border-emerald-500 bg-emerald-500/20" />
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-mono text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap">
                      {result.label}
                      <div className="text-xs opacity-70">{result.confidence}%</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Status indicator */}
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
                    className="w-2 h-2 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
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
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 opacity-30 border-emerald-500" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 opacity-30 border-emerald-500" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 opacity-30 border-emerald-500" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 opacity-30 border-emerald-500" />
          </div>

          {isScanning && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  ${emeraldColor.cssColor}10 2px,
                  ${emeraldColor.cssColor}10 4px
                )`,
              }}
              animate={{
                opacity: [0, 0.3, 0, 0.2, 0],
                x: [0, 2, -2, 1, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          )}
          
          {/* Auto scan indicator */}
          <motion.div
            className="absolute top-2 left-2 flex items-center gap-1 text-xs font-mono text-white bg-black/60 px-2 py-1 rounded backdrop-blur-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-emerald-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span>AUTO</span>
            <span className="text-xs opacity-70">∞</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export const Scanner = () => {
  const [showMainComponent, setShowMainComponent] = useState(false)
  const [mainImageLoaded, setMainImageLoaded] = useState(false)
  
  useEffect(() => {
    const loadMainComponent = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          setShowMainComponent(true)
        }, { timeout: 3000 })
      } else {
        setTimeout(() => {
          setShowMainComponent(true)
        }, 2000)
      }
    }
    
    if (document.readyState === 'complete') {
      loadMainComponent()
    } else {
      window.addEventListener('load', loadMainComponent, { once: true })
      return () => window.removeEventListener('load', loadMainComponent)
    }
  }, [])

  const handleMainImageLoad = () => {
    setMainImageLoaded(true)
  }
  
  return (
    <div className="relative h-[300px] w-[300px]">
      <AnimatePresence>
        {(!showMainComponent || !mainImageLoaded) && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10"
          >
            <ScannerSkeleton />
          </motion.div>
        )}
      </AnimatePresence>

      {/*Main component */}
      {showMainComponent && (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: mainImageLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-20"
        >
          <ScannerCore onImageLoad={handleMainImageLoad} />
        </motion.div>
      )}
    </div>
  )
}

export default Scanner