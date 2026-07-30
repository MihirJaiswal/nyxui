"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Blocks, ChevronRight, CheckCircle } from "lucide-react";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GlassContainer } from "@/registry/ui/apple-glass-effect";
import { GlitchButton } from "@/registry/ui/glitch-button";
import { MatrixCodeRain } from "@/registry/ui/matrix-code-rain";
import {
  Play,
  Pause,
  Copy,
  Check,
  RotateCcw,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  AnimatedBackground                                                 */
/* ------------------------------------------------------------------ */
function AnimatedBackground() {
  const [showGradient, setShowGradient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowGradient(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute -top-32 left-56 md:top-0 sm:right-1/2 lg:right-0 lg:left-auto w-[300px] h-[300px] sm:w-[500px] sm:h-[400px] lg:w-[680px] lg:h-[600px] transition-all duration-1000 ease-out ${
        showGradient
          ? "opacity-20 dark:opacity-70 scale-100"
          : "opacity-0 scale-75"
      }`}
    >
      <div className="absolute inset-0 sm:-top-50 md:inset-0 bg-gradient-to-br sm:bg-gradient-to-b lg:bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 sm:to-transparent lg:to-pink-600 rounded-full blur-3xl transform rotate-12 sm:rotate-0 lg:rotate-12 scale-150 sm:opacity-80 lg:opacity-100" />
      <div className="absolute top-10 right-10 sm:-top-12 sm:right-16 md:-top-30 lg:top-20 lg:right-20 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 rounded-full blur-2xl opacity-70" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scanner                                                            */
/* ------------------------------------------------------------------ */
interface ScanResult {
  id: string;
  type: "object" | "anomaly" | "data" | "threat";
  confidence: number;
  position: { x: number; y: number };
  label: string;
}

const cn = (...classes: (string | undefined | false)[]) =>
  classes.filter(Boolean).join(" ");

function ScannerSkeleton() {
  return (
    <div className="h-[300px] w-[300px]">
      <div className="relative overflow-hidden w-full h-full">
        <div className="w-full h-full relative overflow-hidden bg-zinc-900">
          <Image
            src="https://placehold.co/375x375"
            alt="AI Scanner Target"
            width={375}
            height={375}
            priority
            className="object-cover"
            fetchPriority="high"
            decoding="sync"
            loading="eager"
          />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 opacity-30 border-gray-400 dark:border-gray-600" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 opacity-30 border-gray-400 dark:border-gray-600" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 opacity-30 border-gray-400 dark:border-gray-600" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 opacity-30 border-gray-400 dark:border-gray-600" />
          </div>
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
  );
}

function ScannerCore() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanCycle, setScanCycle] = useState(0);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  const scanTimer = useRef<NodeJS.Timeout | null>(null);
  const completeTimer = useRef<NodeJS.Timeout | null>(null);
  const loopTimer = useRef<NodeJS.Timeout | null>(null);

  const emeraldColor = {
    scan: "bg-emerald-500",
    border: "border-emerald-500",
    cssColor: "#10b981",
  };

  const personScanResults = useMemo(
    () => [
      {
        id: "person-1",
        type: "object" as const,
        confidence: 95,
        position: { x: 50, y: 40 },
        label: "Person",
      },
    ],
    [],
  );

  const clearAllTimers = useCallback(() => {
    if (scanTimer.current) {
      clearTimeout(scanTimer.current);
      scanTimer.current = null;
    }
    if (completeTimer.current) {
      clearTimeout(completeTimer.current);
      completeTimer.current = null;
    }
    if (loopTimer.current) {
      clearTimeout(loopTimer.current);
      loopTimer.current = null;
    }
  }, []);

  const runScan = useCallback(() => {
    if (isScanning) return;

    clearAllTimers();
    setIsScanning(true);
    setScanComplete(false);
    setScanCycle((prev) => prev + 1);
    setScanResults([]);

    completeTimer.current = setTimeout(() => {
      setScanComplete(true);
      setScanResults(personScanResults);

      setTimeout(() => {
        setScanComplete(false);
        setIsScanning(false);

        loopTimer.current = setTimeout(() => {
          runScan();
        }, 1000);
      }, 2000);
    }, 2000);
  }, [isScanning, clearAllTimers, personScanResults]);

  useEffect(() => {
    if (!imageLoaded) return;
    const startTimer = setTimeout(() => {
      runScan();
    }, 1000);
    return () => clearTimeout(startTimer);
  }, [runScan, imageLoaded]);

  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  const handleImageLoad = () => setImageLoaded(true);

  const renderMatrixPattern = () => {
    const patterns = [];

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
      );
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
            const chars = [
              "0",
              "1",
              "ア",
              "カ",
              "サ",
              "タ",
              "ナ",
              "ハ",
              "マ",
              "ヤ",
              "ラ",
              "ワ",
              "0",
              "1",
            ];
            const randomChar = chars[Math.floor(Math.random() * chars.length)];
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
            );
          })}
        </motion.div>,
      );
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
        transition={{ duration: 2, ease: "easeInOut" }}
      />,
    );

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
        transition={{ duration: 2, ease: "linear" }}
      />,
    );

    return patterns;
  };

  return (
    <div className="h-[300px] w-[300px]">
      <div className="relative overflow-hidden w-full h-full">
        <div
          className={cn(
            "w-full h-full relative overflow-hidden transition-all duration-500 bg-zinc-900",
            scanComplete
              ? `ring-2 ring-offset-2 dark:ring-offset-gray-900 ${emeraldColor.border}`
              : "",
            isScanning ? "backdrop-blur-sm brightness-110 contrast-110" : "",
          )}
        >
          <Image
            src="https://placehold.co/375x375"
            alt="AI Scanner Target"
            width={375}
            height={375}
            quality={100}
            priority
            className={cn(
              "object-cover transition-all duration-500 ease-out",
              isScanning ? "hue-rotate-15 animate-pulse" : "",
            )}
            onLoad={handleImageLoad}
          />

          {isScanning && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-pulse" />
          )}

          <AnimatePresence mode="wait">
            {isScanning && renderMatrixPattern()}
          </AnimatePresence>

          {isScanning && (
            <motion.div
              className="absolute inset-0 pointer-events-none bg-emerald-500/20 dark:bg-emerald-500/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}

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
                      <div className="text-xs opacity-70">
                        {result.confidence}%
                      </div>
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
  );
}

function Scanner() {
  const [showMainComponent, setShowMainComponent] = useState(false);

  useEffect(() => {
    setShowMainComponent(false);
    const loadTimer = setTimeout(() => {
      setShowMainComponent(true);
    }, 1500);
    return () => clearTimeout(loadTimer);
  }, []);

  return (
    <div className="relative h-[300px] w-[300px]">
      <AnimatePresence>
        {!showMainComponent && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10"
          >
            <ScannerSkeleton />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMainComponent && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20"
          >
            <ScannerCore />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Matrix                                                             */
/* ------------------------------------------------------------------ */
const matrixColors = [
  "#00ff00",
  "#ff0000",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#ff8800",
  "#8800ff",
  "#0088ff",
  "#ff0088",
];

function Matrix() {
  const [color, setColor] = useState("#00ff00");

  const handleChange = () => {
    const randomColor =
      matrixColors[Math.floor(Math.random() * matrixColors.length)];
    setColor(randomColor);
  };

  return (
    <div
      className="xl:w-[350px] bg-white dark:bg-black xl:h-[303px] h-[260px] w-[320px] relative border-2"
      style={{ borderColor: color }}
    >
      <MatrixCodeRain
        color={color}
        charset="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#%@!nyxui"
        fontSize={14}
        fps={30}
        opacity={0.05}
        fullScreen={false}
        height="100%"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <GlitchButton
          className="font-mono text-lg font-bold tracking-wider z-10 drop-shadow-lg bg-black px-4 py-2 border-2"
          onClick={handleChange}
          style={{ color: color, borderColor: color }}
        >
          Change Color
        </GlitchButton>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  GlassMusicPlayer                                                   */
/* ------------------------------------------------------------------ */
function GlassMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(45);
  const [currentTime, setCurrentTime] = useState(125);
  const duration = 248;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          setProgress((newTime / duration) * 100);
          return newTime >= duration ? 0 : newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

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
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-neutral-900/40 dark:text-white/70 uppercase tracking-wider">
                Now Playing
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shuffle className="w-4 h-4 text-neutral-900/30 dark:text-white/50 hover:text-neutral-800/50 dark:hover:text-white/80 cursor-pointer transition-colors" />
              <Repeat className="w-4 h-4 text-neutral-900/30 dark:text-white/50 hover:text-neutral-800/50 dark:hover:text-white/80 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Album Art + Track Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <Image
                  src="https://placehold.co/64x64"
                  alt="Album Cover"
                  width={64}
                  height={64}
                  priority
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
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white truncate mb-1">
                Until I Found You
              </h2>
              <p className="text-sm text-neutral-900/70 dark:text-white/70 truncate mb-1">
                Stephen Sanchez
              </p>
              <p className="text-xs text-neutral-900/50 dark:text-white/50 truncate">
                Single • 2022
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="flex-1 h-1.5 bg-zinc-900/10 dark:bg-white/20 rounded-full overflow-hidden cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percentage = (x / rect.width) * 100;
                  setProgress(Math.max(0, Math.min(100, percentage)));
                  setCurrentTime(Math.floor((percentage / 100) * duration));
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
              {isPlaying ? (
                <Pause className="w-6 h-6 text-neutral-900 dark:text-white" />
              ) : (
                <Play className="w-6 h-6 text-neutral-900 dark:text-white ml-0.5" />
              )}
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <SkipForward className="w-5 h-5 text-neutral-900/80 dark:text-white/80 hover:text-white" />
            </button>
          </div>
        </div>
      </GlassContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AnimatedCodeBlock                                                  */
/* ------------------------------------------------------------------ */
function AnimatedCodeBlockDemo() {
  const COLORS = {
    keyword: "#f97583",
    default: "#e1e4e8",
    string: "#9ecbff",
    function: "#b392f0",
    property: "#79b8ff",
  };

  const codeTokens = [
    ["const", "keyword"],
    [" "],
    ["greet"],
    [" "],
    ["="],
    [" "],
    ["("],
    ["name"],
    [":"],
    [" "],
    ["string", "keyword"],
    [")"],
    [" "],
    ["=>"],
    [" "],
    ["{"],
    ["\n"],
    ["  "],
    ["return", "keyword"],
    [" "],
    ["`Welcome, ${name}! 👋`", "string"],
    [";"],
    ["\n"],
    ["}"],
    [";"],
    ["\n"],
    ["\n"],
    ["const", "keyword"],
    [" "],
    ["user"],
    [" "],
    ["="],
    [" "],
    ['"Developer"', "string"],
    [";"],
    ["\n"],
    ["const", "keyword"],
    [" "],
    ["message"],
    [" "],
    ["="],
    [" "],
    ["greet", "function"],
    ["("],
    ["user"],
    [")"],
    [";"],
    ["\n"],
    ["\n"],
    ["console", "function"],
    ["."],
    ["log", "property"],
    ["("],
    ["message"],
    [")"],
    [";"],
  ].map(([text, colorKey = "default"]) => ({
    text,
    color: COLORS[colorKey as keyof typeof COLORS],
  }));

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [copied, setCopied] = useState(false);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const totalChars = codeTokens.reduce(
    (acc, token) => acc + token.text.length,
    0,
  );
  const plainCode = codeTokens.map((token) => token.text).join("");

  useEffect(() => {
    if (isPlaying && currentPosition < totalChars) {
      timerRef.current = setTimeout(() => {
        setCurrentPosition((prev) => prev + 1);
      }, 50);
    } else if (currentPosition >= totalChars && isPlaying) {
      setIsPlaying(false);
      setCompleted(true);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentPosition, totalChars]);

  const togglePlay = () => {
    if (completed) {
      setCurrentPosition(0);
      setCompleted(false);
    }
    setIsPlaying(!isPlaying);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(plainCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderVisibleCode = () => {
    if (completed) {
      return codeTokens.map((token, i) => (
        <span key={i} style={{ color: token.color }}>
          {token.text}
        </span>
      ));
    }

    const result = [];
    let charCount = 0;
    let showCursor = false;

    for (let i = 0; i < codeTokens.length; i++) {
      const token = codeTokens[i];
      const tokenEndPos = charCount + token.text.length;

      if (currentPosition >= tokenEndPos) {
        result.push(
          <span key={i} style={{ color: token.color }}>
            {token.text}
          </span>,
        );
        charCount = tokenEndPos;
      } else if (currentPosition > charCount) {
        const visibleChars = currentPosition - charCount;
        result.push(
          <span key={i} style={{ color: token.color }}>
            {token.text.slice(0, visibleChars)}
          </span>,
        );
        showCursor = true;
        break;
      } else {
        showCursor = true;
        break;
      }
    }
    if (showCursor && isPlaying) {
      result.push(
        <span
          key="cursor"
          className="inline-block w-2 h-5 bg-blue-400 ml-0.5 animate-fade"
        />,
      );
    }

    return result;
  };

  const lines = plainCode.split("\n");
  const progress = Math.min(100, (currentPosition / totalChars) * 100);

  return (
    <div className="w-[350px] scale-80 mx-auto bg-zinc-950/50 rounded-sm overflow-hidden border border-zinc-800 shadow-xl">
      <div className="flex items-center justify-between p-3 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-zinc-300 text-sm font-medium">welcome.ts</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={togglePlay}
            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-300 transition-colors"
            title={isPlaying ? "Pause" : completed ? "Restart" : "Play"}
          >
            {completed ? (
              <RotateCcw size={16} />
            ) : isPlaying ? (
              <Pause size={16} />
            ) : (
              <Play size={16} />
            )}
          </button>
          <button
            onClick={copyCode}
            className={`p-1.5 rounded hover:bg-zinc-800 text-zinc-300 transition-colors ${copied ? "bg-green-600" : ""}`}
            title="Copy code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>
      <div className="h-0.5 bg-zinc-800">
        <div
          className="h-full bg-blue-500 transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex bg-zinc-950/50 text-zinc-100">
        <div className="py-4 px-3 text-right text-zinc-500 text-md font-mono bg-zinc-900 border-r border-zinc-800 select-none">
          {lines.map((_, i) => (
            <div key={i} className="h-6 leading-6">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="flex-1 py-4 px-4 font-mono text-sm overflow-x-auto">
          <div className="whitespace-pre leading-5">{renderVisibleCode()}</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TechStack                                                          */
/* ------------------------------------------------------------------ */
function TechStack() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const techItems = [
    {
      label: "React",
      svg: (
        <svg
          role="img"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="React"
          className="size-10"
          fill="currentColor"
        >
          <title>React</title>
          <path d="m16 13.146c-1.573 0-2.854 1.281-2.854 2.854s1.281 2.854 2.854 2.854 2.854-1.281 2.854-2.854-1.281-2.854-2.854-2.854zm-7.99 8.526-.63-.156c-4.688-1.188-7.38-3.198-7.38-5.521s2.693-4.333 7.38-5.521l.63-.156.177.625c.474 1.635 1.083 3.229 1.818 4.771l.135.281-.135.286c-.734 1.536-1.344 3.13-1.818 4.771zm-.921-9.74c-3.563 1-5.75 2.536-5.75 4.063s2.188 3.057 5.75 4.063c.438-1.391.964-2.745 1.578-4.063-.615-1.318-1.141-2.672-1.578-4.063zm16.901 9.74-.177-.625c-.474-1.635-1.083-3.229-1.818-4.766l-.135-.286.135-.286c.734-1.536 1.344-3.13 1.818-4.771l.177-.62.63.156c4.688 1.188 7.38 3.198 7.38 5.521s-2.693 4.333-7.38 5.521zm-.657-5.677c.641 1.385 1.172 2.745 1.578 4.063 3.568-1.005 5.75-2.536 5.75-4.063s-2.188-3.057-5.75-4.063c-.438 1.385-.964 2.745-1.578 4.063zm-16.255-4.068-.177-.625c-1.318-4.646-.917-7.979 1.099-9.141 1.979-1.141 5.151.208 8.479 3.625l.453.464-.453.464c-1.182 1.229-2.26 2.552-3.229 3.958l-.182.255-.313.026c-1.703.135-3.391.406-5.047.813zm2.531-8.838c-.359 0-.677.073-.943.229-1.323.766-1.557 3.422-.646 7.005 1.422-.318 2.859-.542 4.313-.672.833-1.188 1.75-2.323 2.734-3.391-2.078-2.026-4.047-3.172-5.458-3.172zm12.787 27.145c-.005 0-.005 0 0 0-1.901 0-4.344-1.427-6.875-4.031l-.453-.464.453-.464c1.182-1.229 2.26-2.552 3.229-3.958l.177-.255.313-.031c1.703-.13 3.391-.401 5.052-.813l.63-.156.177.625c1.318 4.646.917 7.974-1.099 9.135-.49.281-1.042.422-1.604.411zm-5.464-4.505c2.078 2.026 4.047 3.172 5.458 3.172h.005c.354 0 .672-.078.938-.229 1.323-.766 1.563-3.422.646-7.005-1.422.318-2.865.542-4.313.667-.833 1.193-1.75 2.323-2.734 3.396zm7.99-13.802-.63-.161c-1.661-.406-3.349-.677-5.052-.813l-.313-.026-.177-.255c-.969-1.406-2.047-2.729-3.229-3.958l-.453-.464.453-.464c3.328-3.417 6.5-4.766 8.479-3.625 2.016 1.161 2.417 4.495 1.099 9.141zm-5.255-2.276c1.521.141 2.969.365 4.313.672.917-3.583.677-6.24-.646-7.005-1.318-.76-3.797.406-6.401 2.943.984 1.073 1.896 2.203 2.734 3.391zm-10.058 20.583c-.563.01-1.12-.13-1.609-.411-2.016-1.161-2.417-4.49-1.099-9.135l.177-.625.63.156c1.542.391 3.24.661 5.047.813l.313.031.177.255c.969 1.406 2.047 2.729 3.229 3.958l.453.464-.453.464c-2.526 2.604-4.969 4.031-6.865 4.031zm-1.588-8.567c-.917 3.583-.677 6.24.646 7.005 1.318.75 3.792-.406 6.401-2.943-.984-1.073-1.901-2.203-2.734-3.396-1.453-.125-2.891-.349-4.313-.667zm7.979.838c-1.099 0-2.224-.047-3.354-.141l-.313-.026-.182-.26c-.635-.917-1.24-1.859-1.797-2.828-.563-.969-1.078-1.958-1.557-2.969l-.135-.286.135-.286c.479-1.01.995-2 1.557-2.969.552-.953 1.156-1.906 1.797-2.828l.182-.26.313-.026c2.234-.188 4.479-.188 6.708 0l.313.026.182.26c1.276 1.833 2.401 3.776 3.354 5.797l.135.286-.135.286c-.953 2.021-2.073 3.964-3.354 5.797l-.182.26-.313.026c-1.125.094-2.255.141-3.354.141zm-2.927-1.448c1.969.151 3.885.151 5.859 0 1.099-1.609 2.078-3.302 2.927-5.063-.844-1.76-1.823-3.453-2.932-5.063-1.948-.151-3.906-.151-5.854 0-1.109 1.609-2.089 3.302-2.932 5.063.849 1.76 1.828 3.453 2.932 5.063z" />
        </svg>
      ),
      color: "text-black dark:text-neutral-200",
      hoverColor: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    },
    {
      label: "Next.js",
      svg: (
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 256 256"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
        >
          <g>
            <path
              d="M119.616813,0.0688905149 C119.066276,0.118932037 117.314565,0.294077364 115.738025,0.419181169 C79.3775171,3.69690087 45.3192571,23.3131775 23.7481916,53.4631946 C11.7364614,70.2271045 4.05395894,89.2428829 1.15112414,109.384595 C0.12512219,116.415429 0,118.492153 0,128.025062 C0,137.557972 0.12512219,139.634696 1.15112414,146.665529 C8.10791789,194.730411 42.3163245,235.11392 88.7116325,250.076335 C97.0197458,252.753556 105.778299,254.580072 115.738025,255.680985 C119.616813,256.106338 136.383187,256.106338 140.261975,255.680985 C157.453763,253.779407 172.017986,249.525878 186.382014,242.194795 C188.584164,241.068861 189.00958,240.768612 188.709286,240.518404 C188.509091,240.36828 179.124927,227.782837 167.86393,212.570214 L147.393939,184.922273 L121.743891,146.965779 C107.630108,126.098464 96.0187683,109.034305 95.9186706,109.034305 C95.8185728,109.009284 95.7184751,125.873277 95.6684262,146.465363 C95.5933529,182.52028 95.5683284,183.971484 95.1178886,184.82219 C94.4672532,186.048207 93.9667644,186.548623 92.915738,187.099079 C92.114956,187.499411 91.4142717,187.574474 87.6355816,187.574474 L83.3063539,187.574474 L82.1552297,186.848872 C81.4044966,186.373477 80.8539589,185.747958 80.4785924,185.022356 L79.9530792,183.896422 L80.0031281,133.729796 L80.0782014,83.5381493 L80.8539589,82.5623397 C81.25435,82.0369037 82.1051808,81.3613431 82.7057674,81.0360732 C83.7317693,80.535658 84.1321603,80.4856165 88.4613881,80.4856165 C93.5663734,80.4856165 94.4172043,80.6857826 95.7434995,82.1369867 C96.1188661,82.5373189 110.007429,103.454675 126.623656,128.650581 C143.239883,153.846488 165.962072,188.250034 177.122972,205.139048 L197.392766,235.839522 L198.418768,235.163961 C207.502639,229.259062 217.112023,220.852086 224.719453,212.09482 C240.910264,193.504394 251.345455,170.835585 254.848876,146.665529 C255.874878,139.634696 256,137.557972 256,128.025062 C256,118.492153 255.874878,116.415429 254.848876,109.384595 C247.892082,61.3197135 213.683675,20.9362052 167.288368,5.97379012 C159.105376,3.32158945 150.396872,1.49507389 140.637341,0.394160408 C138.234995,0.143952798 121.693842,-0.131275573 119.616813,0.0688905149 L119.616813,0.0688905149 Z M172.017986,77.4831252 C173.219159,78.0836234 174.195112,79.2345784 174.545455,80.435575 C174.74565,81.0861148 174.795699,94.9976579 174.74565,126.348671 L174.670577,171.336 L166.73783,159.17591 L158.780059,147.01582 L158.780059,114.313685 C158.780059,93.1711423 158.880156,81.2862808 159.030303,80.7108033 C159.430694,79.3096407 160.306549,78.2087272 161.507722,77.5581875 C162.533724,77.0327515 162.909091,76.98271 166.837928,76.98271 C170.541544,76.98271 171.19218,77.0327515 172.017986,77.4831252 Z"
              fill="currentColor"
            />
          </g>
        </svg>
      ),
      color: "text-black dark:text-neutral-200",
      hoverColor: "text-gray-800 dark:text-white",
      bgColor: "bg-gray-500/10",
    },
    {
      label: "Tailwind CSS",
      svg: (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Tailwind css"
          className="size-10"
          fill="currentColor"
        >
          <title>Tailwind CSS</title>
          <path d="m12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.176-1.194-2.537-2.576-5.512-2.576zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.176-1.194-2.537-2.576-5.512-2.576z" />
        </svg>
      ),
      color: "text-black dark:text-neutral-200",
      hoverColor: "text-teal-400",
      bgColor: "bg-teal-500/10",
    },
    {
      label: "Motion",
      svg: (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Motion"
          className="size-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Motion</title>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12l-8 -8v16l16 -16v16l-4 -4" />
          <path d="M20 12l-8 8l-4 -4" />
        </svg>
      ),
      color: "text-black dark:text-neutral-200",
      hoverColor: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full max-w-xl md:px-4">
      <div className="max-w-4xl mt-2">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none bg-gradient-to-br from-slate-50/20 to-transparent rounded-xl"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
          }}
        />
        <div
          ref={containerRef}
          className="relative flex flex-col items-center justify-center rounded-lg"
        >
          <div className="md:px-5" style={{ perspective: "1200px" }}>
            <div className="grid grid-cols-4 gap-x-1">
              {techItems.map((item, index) => {
                const isHovered = hoveredIndex === index;
                return (
                  <motion.div
                    key={index}
                    className={`relative group flex flex-col items-center justify-center px-4 transition-all duration-300 ease-out ${item.color} hover:${item.hoverColor}`}
                    initial={{ y: 0 }}
                    whileHover={{
                      y: -8,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      },
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      zIndex: isHovered ? 50 : 10,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <motion.div
                      className={`relative px-2 rounded-xl transition-colors duration-300`}
                      animate={{
                        rotateY: isHovered ? [0, 5, 0, -5, 0] : 0,
                        rotateX: isHovered ? [0, 5, 0, -5, 0] : 0,
                      }}
                      transition={{
                        duration: isHovered ? 2 : 0.3,
                        repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      }}
                    >
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 rounded-xl opacity-30 blur-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.3 }}
                          exit={{ opacity: 0 }}
                          style={{
                            background: `radial-gradient(circle, ${getComputedColor(item.color)}, transparent 70%)`,
                          }}
                        />
                      )}
                      <motion.div>
                        {React.cloneElement(item.svg, {
                          className: `size-10 md:size-12 transition-all duration-300`,
                        })}
                      </motion.div>
                    </motion.div>
                    <AnimatePresence>
                      {isHovered && (
                        <motion.span
                          className="absolute -bottom-6 whitespace-nowrap text-xs sm:text-sm font-medium"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getComputedColor(colorClass: string) {
  switch (colorClass) {
    case "text-cyan-500":
      return "rgba(6, 182, 212, 0.5)";
    case "text-sky-500":
      return "rgba(14, 165, 233, 0.5)";
    case "text-teal-500":
      return "rgba(20, 184, 166, 0.5)";
    case "text-purple-500":
      return "rgba(168, 85, 247, 0.5)";
    case "text-slate-500":
      return "rgba(100, 116, 139, 0.5)";
    default:
      return "rgba(100, 116, 139, 0.5)";
  }
}

/* ------------------------------------------------------------------ */
/*  SocialProof                                                        */
/* ------------------------------------------------------------------ */
function SocialProof() {
  const avatars = [
    { id: 1, initials: "MJ", color: "bg-blue-500" },
    { id: 2, initials: "AK", color: "bg-purple-500" },
    { id: 3, initials: "RS", color: "bg-green-500" },
    { id: 4, initials: "TL", color: "bg-orange-500" },
    { id: 5, initials: "NP", color: "bg-pink-500" },
  ];

  return (
    <div>
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex justify-center items-center">
          <div className="flex -space-x-3">
            {avatars.map((avatar, index) => (
              <div
                key={avatar.id}
                className="relative"
                style={{ zIndex: avatars.length - index }}
              >
                <div
                  className={`rounded-full w-14 h-14 border-[2px] border-gray-200 dark:border-zinc-950 flex items-center justify-center text-white text-sm font-bold ${avatar.color}`}
                >
                  {avatar.initials}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Hero Component                                                */
/* ------------------------------------------------------------------ */
export function Hero() {
  const componentCount = 50;
  const templateCount = 12;
  const blockCount = 5;
  const hasBlocks = blockCount > 0;

  return (
    <section className="relative px-6 7xl:px-22 py-12 sm:py-16 md:py-20 lg:pt-28 lg:pb-20 flex flex-col 7xl:flex-row 7xl:container mx-auto">
      <div className="w-full 7xl:flex-1 7xl:container 7xl:mx-auto z-10">
        <div className="7xl:max-w-5xl mt-6 sm:mt-8 lg:mt-12">
          {/* Announcement Badge */}
          <div className="z-12 sm:flex items-start justify-center lg:justify-start relative">
            <Badge className="z-12 mb-4 sm:mb-6 group cursor-pointer inline-flex items-center text-black dark:text-white gap-2 rounded-full border border-gray-300 px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-semibold dark:border-gray-600 bg-background">
              <div className="border-r border-zinc-500 pr-2">
                <Blocks className="h-3 w-3 sm:h-4 sm:w-4 group-hover:fill-purple-400 dark:group-hover:fill-purple-700 group-hover:rotate-12" />
              </div>
              New! <span className="hidden sm:inline">Playground</span>
              <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:ml-4 transform transition-all duration-200" />
            </Badge>
          </div>

          {/* Massive Typography */}
          <h1 className="mb-6 text-[2.6rem] sm:text-7xl lg:text-[4.5rem] font-black leading-[1.1] md:leading-[0.95] tracking-tighter relative z-1 sm:text-center lg:text-left">
            <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-neutral-700 to-neutral-950 dark:from-zinc-100 dark:to-white">
              Next
            </span>
            <br />
            <span className="tracking-tight dark:tracking-normal md:tracking-tighter md:dark:tracking-tight">
              <span
                className="absolute inset0 z-10"
                style={{
                  backgroundImage: "url('https://placehold.co/375x375')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "repeat",
                  WebkitBackgroundClip: "text",
                  animation:
                    "bgMove 20s linear infinite, textPulse 3s ease-in-out infinite",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {" "}
                Generation
              </span>
              <span className="relative z-0 generationShadow">Generation</span>
            </span>
            <br />
            <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-neutral-700 to-neutral-950 dark:from-zinc-100 dark:to-white">
              UI Components
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
                .
              </span>
            </span>
          </h1>

          {/* Description */}
          <div className="mb-6 max-w-2xl sm:mx-auto lg:mx-0 flex items-center justify-start sm:justify-center lg:justify-start">
            <p className="text-base sm:text-center lg:text-left sm:text-lg md:text-xl text-neutral-700 dark:text-neutral-200 leading-relaxed relative z-1">
              Easily plug in the latest trending components and build stunning
              websites without stressing over design consistency or animations.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="relative z-12 mt-6 sm:mt-8 lg:mt-10 7xl:mt-6 flex w-full flex-col justify-start sm:justify-center lg:justify-start space-y-2.5 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link href="/components" rel="noopener noreferrer">
              <div>
                <Button className="relative rounded-md bg-neutral-900 dark:bg-white dark:text-black no-underline flex space-x-2 group cursor-pointer hover:shadow-2xl hover:shadow-zinc-800/50 hover:bg-neutral-800 dark:hover:bg-neutral-100 hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 ease-out shadow-zinc-900 p-px font-semibold text-white px-4 py-2 h-12 w-full items-center justify-center text-center text-sm sm:w-52">
                  <span className="transition-all duration-200 group-hover:tracking-wide">
                    Browse Components
                  </span>
                  <ChevronRight
                    className="h-4 w-4 ml-1 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:scale-110 align-middle relative"
                    style={{ top: "1px" }}
                  />
                </Button>
              </div>
            </Link>

            <Link href="/docs" rel="noopener noreferrer">
              <button className="flex h-12 w-full items-center justify-center rounded-lg border border-transparent bg-white text-sm text-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition-all duration-300 ease-out hover:shadow-[0px_8px_25px_-5px_rgba(0,0,0,0.15),0px_4px_6px_-2px_rgba(0,0,0,0.05)] hover:bg-neutral-50 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-neutral-200 sm:w-52 dark:border-neutral-600 dark:bg-black dark:text-white dark:hover:bg-neutral-900 dark:hover:border-neutral-500 dark:hover:shadow-[0px_8px_25px_-5px_rgba(255,255,255,0.1),0px_4px_6px_-2px_rgba(255,255,255,0.05)]">
                <span className="transition-all duration-200 hover:tracking-wide">
                  Documentation
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom section - responsive layout */}
        <div className="flex flex-col lg:flex-row flex-wrap lg:items-end lg:justify-between 7xl:justify-start mt-14 lg:gap-y-12 7xl:gap-12 sm:mt-16 lg:mt-18 z-1 7xl:scale-95 7xl:-ml-8 relative">
          <div className="mb-10 lg:mb-0">
            <p className="text-neutral-700 dark:text-neutral-400 text-sm sm:text-[14.5px] mb-4 text-center lg:text-left">
              Trusted by many developers
            </p>
            <SocialProof />
          </div>

          {/* TechStack */}
          <div className="hidden lg:block 7xl:hidden">
            <TechStack />
          </div>
          <div className="hidden 7xl:block 7xl:-12">
            <TechStack />
          </div>

          {/* Navigation menu */}
          <div className="flex flex-wrap mt-12 lg:mt-0 gap-4 sm:gap-x-6 text-neutral-950 dark:text-gray-50 font-mono relative z-12 justify-center lg:justify-start">
            <Link
              href="/components"
              className="flex items-center space-x-3 group hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-base sm:text-lg">
                {componentCount.toString().padStart(2, "0")} components
              </span>
              <ArrowRight className="h-4 w-4 group-hover:ml-4 transform transition-all duration-200" />
            </Link>
            <Link
              href="/templates"
              className="flex items-center group space-x-3 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-base sm:text-lg">
                {templateCount.toString().padStart(2, "0")} templates
              </span>
              <ArrowRight className="h-4 w-4 group-hover:ml-4 transform transition-all duration-200" />
            </Link>
            {hasBlocks && (
              <Link
                href="/blocks"
                className="flex items-center group space-x-3 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              >
                <span className="text-base sm:text-lg">
                  {blockCount.toString().padStart(2, "0")} blocks
                </span>
                <ArrowRight className="h-4 w-4 group-hover:ml-4 transform transition-all duration-200" />
              </Link>
            )}
          </div>
        </div>

        {/* Animated Organic Flowing Gradient */}
        <AnimatedBackground />
      </div>

      <div className="hidden 7xl:block relative z-12">
        <div className="absolute 7xl:-top-12 right-50 6xl:right-83">
          <Scanner />
        </div>
        <div className="absolute top-45 6xl:top-40 right-25 6xl:right-60 z-20">
          <Matrix />
        </div>
        <div className="absolute top-3 6xl:-top-6 right-0 z-24 hidden 7xl:block">
          <GlassMusicPlayer />
        </div>
        <div className="absolute top-60 -right-8 z-10 hidden 6xl:block">
          <AnimatedCodeBlockDemo />
        </div>
      </div>
      <div className="hidden lg:block 7xl:hidden z-12">
        <div className="absolute top-28 right-20 h-full">
          <Scanner />
        </div>
        <div className="absolute top-84 right-8 h-full z-20">
          <Matrix />
        </div>
      </div>
    </section>
  );
}

export default Hero;
