"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

export type ScribbleVariant = "circle" | "underline" | "box" | "highlight";

export type ScribbleCircleProps = {
  word: string;
  variant?: ScribbleVariant;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
};

const SHARED_CLASSES = "text-4xl md:text-5xl font-medium";

const CircleSvg: React.FC<{ stroke: string; strokeWidth: number }> = ({
  stroke,
  strokeWidth,
}) => (
  <svg
    viewBox="0 0 286 73"
    fill="none"
    preserveAspectRatio="none"
    className="absolute -left-3 -right-3 -top-3 bottom-0 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)] translate-y-1"
  >
    <motion.path
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 1.25, ease: "easeInOut" }}
      d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  </svg>
);

const UnderlineSvg: React.FC<{ stroke: string; strokeWidth: number }> = ({
  stroke,
  strokeWidth,
}) => (
  <svg
    viewBox="0 0 286 24"
    fill="none"
    preserveAspectRatio="none"
    className="absolute -left-1 -right-1 -bottom-2 h-3 w-[calc(100%+0.5rem)]"
  >
    <motion.path
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      d="M3 12C40 4 90 18 143 10C196 2 246 20 283 8"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  </svg>
);

const BoxSvg: React.FC<{ stroke: string; strokeWidth: number }> = ({
  stroke,
  strokeWidth,
}) => (
  <svg
    viewBox="0 0 300 90"
    fill="none"
    preserveAspectRatio="none"
    className="absolute -left-3 -right-3 -top-3 bottom-0 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)] translate-y-1"
  >
    <motion.path
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
      d="M10 10C90 4 210 2 290 8C296 32 294 58 288 80C200 86 100 88 12 78C4 54 6 28 10 10C40 6 20 8 10 10"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HighlightSvg: React.FC<{ stroke: string }> = ({ stroke }) => (
  <svg
    viewBox="0 0 286 50"
    preserveAspectRatio="none"
    className="absolute -left-2 -right-2 -top-1 -bottom-1 h-[calc(100%+0.5rem)] w-[calc(100%+1rem)]"
  >
    <motion.path
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ originX: 0 }}
      d="M4 6C60 2 130 10 143 6C180 12 230 4 282 8L282 44C220 48 140 42 143 46C90 48 40 42 4 44Z"
      fill={stroke}
      fillOpacity={0.55}
    />
  </svg>
);

export const ScribbleCircle: React.FC<ScribbleCircleProps> = ({
  word,
  variant = "circle",
  stroke = "#FACC15",
  strokeWidth = 3,
  className,
}) => {
  if (variant === "highlight") {
    return (
      <span
        className={cn("relative inline-block px-1", SHARED_CLASSES, className)}
      >
        <HighlightSvg stroke={stroke} />
        <span className="relative">{word}</span>
      </span>
    );
  }

  return (
    <span className={cn("relative", SHARED_CLASSES, className)}>
      {word}
      {variant === "circle" && (
        <CircleSvg stroke={stroke} strokeWidth={strokeWidth} />
      )}
      {variant === "underline" && (
        <UnderlineSvg stroke={stroke} strokeWidth={strokeWidth} />
      )}
      {variant === "box" && (
        <BoxSvg stroke={stroke} strokeWidth={strokeWidth} />
      )}
    </span>
  );
};

// Convenience aliases — all delegate to ScribbleCircle with preset variant.
export const ScribbleUnderline: React.FC<
  Omit<ScribbleCircleProps, "variant">
> = (props) => <ScribbleCircle {...props} variant="underline" />;

export const ScribbleBox: React.FC<Omit<ScribbleCircleProps, "variant">> = (
  props,
) => <ScribbleCircle {...props} variant="box" />;

export const ScribbleHighlight: React.FC<
  Omit<ScribbleCircleProps, "variant" | "strokeWidth">
> = (props) => <ScribbleCircle {...props} variant="highlight" />;
