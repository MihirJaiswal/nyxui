"use client";

import { cn } from "@/lib/utils";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import React, { useEffect } from "react";

export type HaloRingProps = {
  /** Card content rendered inside the glow. */
  children: React.ReactNode;
  /** Time in seconds per full rotation. */
  speed?: number;
  /**
   * Colors for the rotating sweep, as CSS colors. Distributed evenly across
   * the visible arc with alpha fades on both ends. Defaults to a rainbow
   * tuned for neutral-dark surfaces.
   */
  colors?: string[];
  /**
   * Override the full conic-gradient string. Identical stops get reused for
   * the inner halo; wrap in a template so the `turn` variable still drives
   * rotation. Takes precedence over `colors`.
   */
  gradient?: string;
  /** Extra classes on the outermost wrapper (radius, max width). */
  className?: string;
  /** Extra classes on the inner content pane (card bg, padding hint). */
  innerClassName?: string;
  /**
   * Halo intensity — the radial mask fade range as `[innerStart, outerEnd]`
   * percentages (0–100). Lower values pull the glow tighter to the rim; raise
   * `innerStart` to let more color reach the card center.
   */
  haloRange?: [number, number];
  /** Halo blur radius in px. */
  haloBlur?: number;
  /** Halo opacity (0–1). */
  haloOpacity?: number;
};

const DEFAULT_COLORS = [
  "#f472b6",
  "#c084fc",
  "#818cf8",
  "#38bdf8",
  "#2dd4bf",
  "#fbbf24",
];

/**
 * Appends an alpha channel to a hex color (`#rgb`/`#rrggbb`). Non-hex colors
 * are returned unchanged — the fade stop then interpolates natively.
 */
function withAlpha(color: string, alpha: string): string {
  const hex = color.trim();
  if (hex.length === 4) {
    const [r, g, b] = hex.slice(1);
    return `#${r}${r}${g}${g}${b}${b}${alpha}`;
  }
  if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
    return `${hex}${alpha}`;
  }
  return color;
}

/** Evenly spaces colors across the 10%–46% arc with alpha-ramped ends. */
function buildStops(colors: string[]): string {
  const stops: string[] = ["transparent 0%"];
  stops.push(`${withAlpha(colors[0], "00")} 5%`, `${colors[0]} 10%`);

  const last = colors.length - 1;
  colors.forEach((color, i) => {
    if (i === 0 || i === last) return;
    stops.push(`${color} ${Math.round(10 + (36 * i) / last)}%`);
  });

  stops.push(
    `${colors[last]} 46%`,
    `${withAlpha(colors[last], "00")} 52%`,
    "transparent 56%",
  );
  return stops.join(", ");
}

/**
 * Rotating conic-gradient border with a soft inner glow halo. The border
 * wraps content in a `p-px` layout so the gradient shows as a 1px rim; a
 * separate blurred copy inside spills color over the card surface, giving
 * the "AI signal" effect used by Claude/Cursor marketing.
 */
export const HaloRing: React.FC<HaloRingProps> = ({
  children,
  speed = 3,
  colors = DEFAULT_COLORS,
  gradient,
  className,
  innerClassName,
  haloRange = [62, 96],
  haloBlur = 24,
  haloOpacity = 0.6,
}) => {
  const turn = useMotionValue(0);

  useEffect(() => {
    const controls = animate(turn, 1, {
      ease: "linear",
      duration: speed,
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [speed, turn]);

  const stops = buildStops(colors);
  const defaultGradient = useMotionTemplate`conic-gradient(from ${turn}turn, ${stops})`;

  const haloMask = `radial-gradient(ellipse 100% 100% at 50% 50%, transparent ${haloRange[0]}%, black ${haloRange[1]}%)`;

  return (
    <div className={cn("relative p-px", className)}>
      {/* Rotating rim */}
      <motion.div
        style={{ backgroundImage: gradient ?? defaultGradient }}
        aria-hidden
        className="absolute inset-0 rounded-[inherit]"
      />

      {/* Inner card with halo spill */}
      <div className="relative overflow-hidden rounded-[inherit]">
        <div className={cn("relative", innerClassName)}>{children}</div>
        <motion.div
          style={{
            backgroundImage: gradient ?? defaultGradient,
            WebkitMaskImage: haloMask,
            maskImage: haloMask,
            opacity: haloOpacity,
            filter: `blur(${haloBlur}px)`,
          }}
          aria-hidden
          className="pointer-events-none absolute inset-[-20%] z-10"
        />
      </div>
    </div>
  );
};
