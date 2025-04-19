"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface ImageScannerProps {
  image: string;
  alt?: string;
  scanDirection?: "horizontal" | "vertical";
  scanSpeed?: number;
  scanColor?: "emerald" | "blue" | "purple" | "amber" | "red";
  scanType?: "line" | "corners" | "both";
  className?: string;
  onScanComplete?: () => void;
  autoScan?: boolean;
  scanDelay?: number;
  scanAtScroll?: boolean;
  repeating?: boolean;
  triggerScan?: boolean;
}

export const ImageScanner = ({
  image,
  alt = "Scanning image",
  scanDirection = "horizontal",
  scanSpeed = 2,
  scanColor = "emerald",
  scanType = "both",
  className,
  onScanComplete,
  autoScan = false,
  scanDelay = 0,
  scanAtScroll = false,
  repeating = false,
  triggerScan = false,
}: ImageScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [scanCycle, setScanCycle] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const scanTimer = useRef<NodeJS.Timeout | null>(null);
  const completeTimer = useRef<NodeJS.Timeout | null>(null);

  const colorMap = {
    emerald: {
      scan: "bg-emerald-500",
      glow: "bg-emerald-500/20 dark:bg-emerald-500/10",
      border: "border-emerald-500",
    },
    blue: {
      scan: "bg-blue-500",
      glow: "bg-blue-500/20 dark:bg-blue-500/10",
      border: "border-blue-500",
    },
    purple: {
      scan: "bg-purple-500",
      glow: "bg-purple-500/20 dark:bg-purple-500/10",
      border: "border-purple-500",
    },
    amber: {
      scan: "bg-amber-500",
      glow: "bg-amber-500/20 dark:bg-amber-500/10",
      border: "border-amber-500",
    },
    red: {
      scan: "bg-red-500",
      glow: "bg-red-500/20 dark:bg-red-500/10",
      border: "border-red-500",
    },
  };

  const runScan = () => {
    if (!isScanning) {
      setIsScanning(true);
      setScanCycle((prev) => prev + 1);

      completeTimer.current = setTimeout(() => {
        setScanComplete(true);
        setHasScanned(true);
        if (onScanComplete) onScanComplete();

        setTimeout(() => {
          setScanComplete(false);
          setIsScanning(false);
          if (repeating) {
            scanTimer.current = setTimeout(runScan, 1000);
          }
        }, 1000);
      }, scanSpeed * 1000);
    }
  };

  useEffect(() => {
    if (!scanAtScroll || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasScanned && !isScanning) {
          runScan();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanAtScroll, hasScanned, isScanning]);

  useEffect(() => {
    if (autoScan && !hasScanned) {
      scanTimer.current = setTimeout(runScan, scanDelay * 1000);
    }

    return () => {
      if (scanTimer.current) clearTimeout(scanTimer.current);
      if (completeTimer.current) clearTimeout(completeTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoScan, scanDelay, hasScanned]);

  useEffect(() => {
    if (triggerScan && !isScanning) {
      runScan();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerScan]);

  useEffect(() => {
    if (repeating && !isScanning && !scanComplete) {
      runScan();
    }

    return () => {
      if (scanTimer.current) clearTimeout(scanTimer.current);
      if (completeTimer.current) clearTimeout(completeTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repeating]);

  useEffect(() => {
    return () => {
      if (scanTimer.current) clearTimeout(scanTimer.current);
      if (completeTimer.current) clearTimeout(completeTimer.current);
    };
  }, []);

  const startScan = () => {
    if (!isScanning && !autoScan && !repeating) {
      runScan();
    }
  };
  const selectedColor = colorMap[scanColor] || colorMap.emerald;

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onClick={!autoScan && !scanAtScroll && !repeating ? startScan : undefined}
    >
      <div
        className={cn(
          "w-full h-full relative overflow-hidden",
          scanComplete ? "ring-2 ring-offset-2 dark:ring-offset-gray-900" : "",
          scanComplete ? selectedColor.border : ""
        )}
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={alt}
          height={500}
          width={500}
          quality={100}
          className="w-full h-full object-cover"
        />
        <AnimatePresence mode="wait">
          {isScanning && (
            <>
              {(scanType === "line" || scanType === "both") && (
                <motion.div
                  key={`scanline-${scanCycle}`}
                  className={cn(
                    "absolute pointer-events-none",
                    scanDirection === "horizontal"
                      ? "left-0 right-0 h-1"
                      : "top-0 bottom-0 w-1",
                    selectedColor.scan
                  )}
                  initial={
                    scanDirection === "horizontal"
                      ? { top: 0, opacity: 0.7 }
                      : { left: 0, opacity: 0.7 }
                  }
                  animate={
                    scanDirection === "horizontal"
                      ? { top: "100%", opacity: 0.7 }
                      : { left: "100%", opacity: 0.7 }
                  }
                  exit={
                    scanDirection === "horizontal"
                      ? { top: "100%", opacity: 0 }
                      : { left: "100%", opacity: 0 }
                  }
                  transition={{
                    duration: scanSpeed,
                    ease: "linear",
                  }}
                />
              )}
              {(scanType === "corners" || scanType === "both") && (
                <>
                  <motion.div
                    key={`corner-tl-${scanCycle}`}
                    className={cn(
                      "absolute top-0 left-0 w-6 h-6 pointer-events-none",
                      "border-t-2 border-l-2",
                      selectedColor.border
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    key={`corner-tr-${scanCycle}`}
                    className={cn(
                      "absolute top-0 right-0 w-6 h-6 pointer-events-none",
                      "border-t-2 border-r-2",
                      selectedColor.border
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    key={`corner-bl-${scanCycle}`}
                    className={cn(
                      "absolute bottom-0 left-0 w-6 h-6 pointer-events-none",
                      "border-b-2 border-l-2",
                      selectedColor.border
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    key={`corner-br-${scanCycle}`}
                    className={cn(
                      "absolute bottom-0 right-0 w-6 h-6 pointer-events-none",
                      "border-b-2 border-r-2",
                      selectedColor.border
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </>
              )}
              <motion.div
                key={`glow-${scanCycle}`}
                className={cn(
                  "absolute inset-0 pointer-events-none",
                  selectedColor.glow
                )}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.5, 0],
                  transition: {
                    repeat: 0,
                    duration: scanSpeed / 2,
                    repeatType: "reverse",
                  },
                }}
                exit={{ opacity: 0 }}
              />
            </>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {scanComplete && (
            <motion.div
              className={cn(
                "absolute inset-0 pointer-events-none",
                selectedColor.glow
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
