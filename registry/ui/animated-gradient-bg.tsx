"use client";

import React, { useRef, useMemo } from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

export interface AnimatedGradientBgProps {
  children?: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
  blur?: number;
  pattern?: "radial" | "linear" | "conic" | "waves";
  intensity?: number;
  opacity?: number;
  size?: "sm" | "md" | "lg" | "full" | number;
  position?: "fixed" | "absolute" | "relative";
  zIndex?: number;
  animate?: boolean;
  as?: "div" | "section" | "article" | "main" | "aside" | "header" | "footer";
  onClick?: () => void;
}

type PatternType = AnimatedGradientBgProps["pattern"];

const getSizeStyles = (
  size: AnimatedGradientBgProps["size"],
): React.CSSProperties => {
  if (typeof size === "number") {
    return { width: `${size}px`, height: `${size}px` };
  }
  switch (size) {
    case "sm":
      return { width: "300px", height: "300px" };
    case "md":
      return { width: "500px", height: "500px" };
    case "lg":
      return { width: "800px", height: "800px" };
    default:
      return { width: "100%", height: "100%" };
  }
};

function getGradientPattern(
  pattern: PatternType,
  colors: string[],
  intensity: number,
): string {
  const list = colors.join(", ");
  switch (pattern) {
    case "radial":
      return `radial-gradient(circle at center, ${list})`;
    case "linear":
      return `linear-gradient(45deg, ${list})`;
    case "conic":
      return `conic-gradient(from 0deg at center, ${list})`;
    case "waves":
      return `
        repeating-linear-gradient(45deg, ${colors[0]} 0, transparent 40%),
        repeating-linear-gradient(-45deg, ${colors[1]} 0, transparent 50%)
      `;
    default:
      return `radial-gradient(circle at center, ${list})`;
  }
}

const initialColors = ["#4f46e5", "#ec4899", "#8b5cf6", "#06b6d4"];

export const AnimatedGradientBg: React.FC<AnimatedGradientBgProps> = ({
  children,
  className,
  colors = initialColors,
  speed = 1,
  blur = 60,
  pattern = "radial",
  intensity = 1,
  opacity = 0.8,
  size = "full",
  position = "absolute",
  zIndex = -1,
  animate = true,
  as = "div",
  onClick,
}: AnimatedGradientBgProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const gradient = useMemo(
    () => getGradientPattern(pattern, colors, intensity),
    [pattern, colors, intensity],
  );

  const variants: Variants = useMemo(
    () => ({
      animate: {
        backgroundPosition: ["0% 0%", "100% 100%"],
        transition: {
          duration: 10 / speed,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        },
      },
      static: { backgroundPosition: "0% 0%" },
    }),
    [speed],
  );

  const commonProps: HTMLMotionProps<"div"> = {
    ref: containerRef,
    className: cn("animated-gradient-bg overflow-hidden", className),
    onClick,
    style: {
      ...getSizeStyles(size),
      position,
      zIndex,
      opacity,
      backgroundImage: gradient,
      backgroundSize: "200% 200%",
      filter: `blur(${blur}px)`,
    },
    variants,
    animate: animate ? "animate" : "static",
  };

  switch (as) {
    case "section":
      return (
        <motion.section {...commonProps}>
          {children}
        </motion.section>
      );
    case "article":
      return (
        <motion.article {...commonProps}>
          {children}
        </motion.article>
      );
    case "main":
      return (
        <motion.main {...commonProps}>
          {children}
        </motion.main>
      );
    case "aside":
      return (
        <motion.aside {...commonProps}>
          {children}
        </motion.aside>
      );
    case "header":
      return (
        <motion.header {...commonProps}>
          {children}
        </motion.header>
      );
    case "footer":
      return (
        <motion.footer {...commonProps}>
          {children}
        </motion.footer>
      );
    default:
      return (
        <motion.div {...commonProps}>
          {children}
        </motion.div>
      );
  }
};
