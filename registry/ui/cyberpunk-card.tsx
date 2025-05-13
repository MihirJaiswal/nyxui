"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

export interface CyberpunkCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  theme?:
    | "neon-blue"
    | "neon-pink"
    | "neon-green"
    | "neon-orange"
    | "neon-purple"
    | "custom";
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  borderStyle?: "solid" | "dashed" | "glitch" | "corners";
  colorShift?: boolean;
  lightTrail?: boolean;
  rounded?: "none" | "sm" | "md" | "lg";
  glow?: boolean;
  glowIntensity?: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode;
}

export const CyberpunkCard = ({
  theme = "neon-blue",
  customColors,
  borderStyle = "solid",
  colorShift = true,
  lightTrail = true,
  rounded = "md",
  glow = true,
  glowIntensity = 3,
  className,
  children,
  ...props
}: CyberpunkCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [colorPhase, setColorPhase] = useState(0);

  useEffect(() => {
    if (!colorShift || !isHovered) return;

    const interval = setInterval(() => {
      setColorPhase((prev) => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, [colorShift, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!lightTrail) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const themeColors = {
    "neon-blue": {
      primary: "from-blue-500 to-cyan-400 dark:from-blue-600 to-cyan-500",
      secondary: "from-blue-600 to-cyan-500 dark:from-blue-700 to-cyan-600",
      accent: "bg-blue-400 dark:bg-blue-500",
      text: "text-blue-50 dark:text-blue-100",
      glow: "shadow-blue-500/50 dark:shadow-blue-600/50",
    },
    "neon-pink": {
      primary: "from-pink-500 to-purple-400 dark:from-pink-600 to-purple-500",
      secondary: "from-pink-600 to-purple-500 dark:from-pink-700 to-purple-600",
      accent: "bg-pink-400 dark:bg-pink-500",
      text: "text-pink-50 dark:text-pink-100",
      glow: "shadow-pink-500/50 dark:shadow-pink-600/50",
    },
    "neon-green": {
      primary:
        "from-green-500 to-emerald-400 dark:from-green-600 to-emerald-500",
      secondary:
        "from-green-600 to-emerald-500 dark:from-green-700 to-emerald-600",
      accent: "bg-green-400 dark:bg-green-500",
      text: "text-green-50 dark:text-green-100",
      glow: "shadow-green-500/50 dark:shadow-green-600/50",
    },
    "neon-orange": {
      primary: "from-orange-500 to-amber-400 dark:from-orange-600 to-amber-500",
      secondary:
        "from-orange-600 to-amber-500 dark:from-orange-700 to-amber-600",
      accent: "bg-orange-400 dark:bg-orange-500",
      text: "text-orange-50 dark:text-orange-100",
      glow: "shadow-orange-500/50 dark:shadow-orange-600/50",
    },
    "neon-purple": {
      primary: "from-purple-600 to-blue-500 dark:from-purple-700 to-blue-600",
      secondary: "from-purple-700 to-blue-500 dark:from-purple-700 to-blue-600",
      accent: "bg-purple-400 dark:bg-purple-500",
      text: "text-purple-50 dark:text-purple-100",
      glow: "shadow-purple-500/50 dark:shadow-purple-600/50",
    },
    custom: {
      primary: customColors
        ? `from-[${customColors.primary}] to-[${customColors.secondary}]`
        : "from-blue-500 to-cyan-400",
      secondary: customColors
        ? `from-[${customColors.secondary}] to-[${customColors.primary}]`
        : "from-blue-600 to-cyan-500",
      accent: customColors ? `bg-[${customColors.accent}]` : "bg-blue-400",
      text: "text-gray-50",
      glow: customColors
        ? `shadow-[${customColors.primary}]/50`
        : "shadow-blue-500/50",
      dark: {
        primary: customColors
          ? `from-[${customColors.primary}] to-[${customColors.secondary}]`
          : "from-blue-600 to-cyan-500",
        secondary: customColors
          ? `from-[${customColors.secondary}] to-[${customColors.primary}]`
          : "from-blue-700 to-cyan-600",
        accent: customColors ? `bg-[${customColors.accent}]` : "bg-blue-500",
        text: "text-gray-100",
        glow: customColors
          ? `shadow-[${customColors.primary}]/50`
          : "shadow-blue-600/50",
      },
    },
  };

  const currentTheme = themeColors[theme];

  const borderStyles = {
    solid: "border-2",
    dashed: "border-2 border-dashed",
    glitch:
      "before:content-[''] before:absolute before:inset-0 before:border-2 before:translate-x-1 before:translate-y-1 before:border-white/30 before:z-[-1]",
    corners:
      "border-0 before:content-[''] before:absolute before:w-8 before:h-8 before:border-t-2 before:border-l-2 before:top-0 before:left-0 after:content-[''] after:absolute after:w-8 after:h-8 after:border-b-2 after:border-r-2 after:bottom-0 after:right-0",
  };

  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
  };

  const glowIntensityStyles = {
    1: "shadow-md",
    2: "shadow-lg",
    3: "shadow-xl",
    4: "shadow-2xl",
    5: "shadow-2xl shadow-lg",
  };

  return (
    <div
      className={cn(
        "relative p-6 border transition-all duration-300 overflow-hidden",
        `bg-gradient-to-r ${currentTheme.primary}`,
        borderStyles[borderStyle],
        roundedStyles[rounded],
        glow && glowIntensityStyles[glowIntensity],
        glow && currentTheme.glow,
        currentTheme.text,
        className,
      )}
      style={{
        borderColor:
          colorShift && isHovered
            ? `hsl(${(colorPhase * 3.6) % 360}, 100%, 70%)`
            : undefined,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {lightTrail && isHovered && (
        <div
          className="absolute w-24 h-24 rounded-full bg-white/20 blur-xl pointer-events-none transition-opacity duration-700"
          style={{
            left: mousePosition.x - 48,
            top: mousePosition.y - 48,
            opacity: 0.5,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
      <div
        className={cn(
          "absolute -bottom-2 -right-2 w-16 h-16 transform rotate-45 opacity-70",
          currentTheme.accent,
        )}
      />
    </div>
  );
};
