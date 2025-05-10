"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, animate, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export type MarqueeProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
  fadeEdges?: boolean;
  fadeWidth?: number;
  pauseOnTap?: boolean;
  draggable?: boolean;
};

export function Marquee({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
  fadeEdges = false,
  fadeWidth = 64,
  pauseOnTap = true,
  draggable = true,
}: MarqueeProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);
  const dragStartPosition = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const currentRef = containerRef.current;

    const updateDimensions = () => {
      if (currentRef) {
        const rect = currentRef.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height,
        });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(currentRef);

    return () => {
      resizeObserver.unobserve(currentRef);
      resizeObserver.disconnect();
    };
  }, []);

  const { width, height } = dimensions;

  useEffect(() => {
    let controls;

    if (isPaused || isDragging || (!width && !height)) {
      return () => {};
    }

    const size = direction === "horizontal" ? width : height;
    const contentSize = size + gap;

    if (!size) return () => {};

    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;
    const distanceToTravel = Math.abs(to - from);
    const duration = distanceToTravel / currentSpeed;

    if (isTransitioning) {
      const remainingDistance = Math.abs(translation.get() - to);
      const transitionDuration = remainingDistance / currentSpeed;

      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration: transitionDuration,
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [
    key,
    translation,
    currentSpeed,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
    isPaused,
    isDragging,
  ]);

  const fadeGradientStyles = (() => {
    if (!fadeEdges) return {};

    const size = direction === "horizontal" ? width : height;
    if (size === 0) return {};

    const fadePercentage = Math.min(100, Math.round((fadeWidth / size) * 100));

    if (direction === "horizontal") {
      return {
        maskImage: `linear-gradient(to right, transparent, black ${fadePercentage}%, black ${
          100 - fadePercentage
        }%, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to right, transparent, black ${fadePercentage}%, black ${
          100 - fadePercentage
        }%, transparent 100%)`,
      };
    } else {
      return {
        maskImage: `linear-gradient(to bottom, transparent, black ${fadePercentage}%, black ${
          100 - fadePercentage
        }%, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, transparent, black ${fadePercentage}%, black ${
          100 - fadePercentage
        }%, transparent 100%)`,
      };
    }
  })();

  const handleTap = () => {
    if (pauseOnTap && !isDragging) {
      setIsPaused(!isPaused);
      setIsTransitioning(true);
      setKey((prevKey) => prevKey + 1);
    }
  };

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        },
      }
    : {};

  const handleDragStart = () => {
    if (!draggable) return;

    setIsDragging(true);
    dragStartPosition.current = translation.get();
  };

  const handleDragEnd = () => {
    if (!draggable) return;

    setIsDragging(false);
    setIsTransitioning(true);
    setKey((prevKey) => prevKey + 1);
  };

  const dragConstraints = (() => {
    const contentSize = direction === "horizontal" ? width : height;

    return {
      left: -contentSize,
      right: contentSize,
      top: -contentSize,
      bottom: contentSize,
    };
  })();

  return (
    <div
      className={cn(
        "overflow-hidden relative",
        className,
        (pauseOnTap || draggable) && "cursor-pointer",
        isDragging && "cursor-grabbing",
      )}
      style={fadeGradientStyles}
      onClick={handleTap}
    >
      <motion.div
        className={cn("flex w-max", draggable && "cursor-grab")}
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          flexDirection: direction === "horizontal" ? "row" : "column",
          gap: `${gap}px`,
        }}
        ref={containerRef}
        {...hoverProps}
        drag={draggable ? (direction === "horizontal" ? "x" : "y") : false}
        dragConstraints={dragConstraints}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragElastic={0.1}
        dragMomentum={false}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
