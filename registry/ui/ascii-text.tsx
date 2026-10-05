"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type AsciiAnimation =
  | "none"
  | "wave"
  | "glitch"
  | "typewriter"
  | "pulse"
  | "scan";

interface AsciiTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "color"> {
  /** Text to render. Unsupported characters are skipped rather than substituted. */
  text?: string;
  /** How the glyphs animate. */
  animation?: AsciiAnimation;
  /** Animation rate multiplier. */
  speed?: number;
  /** Glyph size in px. Ignored while autoFit is on. */
  fontSize?: number;
  /** Scale the glyphs so one line of text fills the container width. */
  autoFit?: boolean;
  /** Blank columns between letters. */
  letterSpacing?: number;
  /** Any CSS colour. Defaults to the inherited text colour. */
  color?: string;
  /** Add a soft glow behind the glyphs. */
  glow?: boolean;
  /** Characters used for a lit cell, darkest to lightest. */
  ramp?: string;
  className?: string;
}

const GLYPH_HEIGHT = 6;

// 8x6 block font. Every glyph is exactly 8 columns wide so the grid stays
// rectangular and column-wise effects line up across letters.
const FONT: Record<string, string[]> = {
  A: ["  ████  ", " ██  ██ ", "████████", "██    ██", "██    ██", "██    ██"],
  B: ["███████ ", "██    ██", "███████ ", "██    ██", "██    ██", "███████ "],
  C: [" ███████", "██      ", "██      ", "██      ", "██      ", " ███████"],
  D: ["███████ ", "██    ██", "██    ██", "██    ██", "██    ██", "███████ "],
  E: ["████████", "██      ", "██████  ", "██      ", "██      ", "████████"],
  F: ["████████", "██      ", "██████  ", "██      ", "██      ", "██      "],
  G: [" ███████", "██      ", "██  ████", "██    ██", "██    ██", " ███████"],
  H: ["██    ██", "██    ██", "████████", "██    ██", "██    ██", "██    ██"],
  I: ["████████", "   ██   ", "   ██   ", "   ██   ", "   ██   ", "████████"],
  J: ["████████", "      ██", "      ██", "      ██", "██    ██", " ███████"],
  K: ["██    ██", "██  ██  ", "████    ", "██  ██  ", "██    ██", "██    ██"],
  L: ["██      ", "██      ", "██      ", "██      ", "██      ", "████████"],
  M: ["██    ██", "████████", "██ ██ ██", "██    ██", "██    ██", "██    ██"],
  N: ["██    ██", "███   ██", "██ ██ ██", "██   ███", "██    ██", "██    ██"],
  O: [" ███████", "██    ██", "██    ██", "██    ██", "██    ██", " ███████"],
  P: ["███████ ", "██    ██", "███████ ", "██      ", "██      ", "██      "],
  Q: [" ██████ ", "██    ██", "██    ██", "██ ██ ██", "██   ███", " ███████"],
  R: ["███████ ", "██    ██", "███████ ", "██   ██ ", "██    ██", "██    ██"],
  S: [" ███████", "██      ", " ██████ ", "      ██", "      ██", "███████ "],
  T: ["████████", "   ██   ", "   ██   ", "   ██   ", "   ██   ", "   ██   "],
  U: ["██    ██", "██    ██", "██    ██", "██    ██", "██    ██", " ███████"],
  V: ["██    ██", "██    ██", "██    ██", " ██  ██ ", "  ████  ", "   ██   "],
  W: ["██    ██", "██    ██", "██    ██", "██ ██ ██", "████████", "██    ██"],
  X: ["██    ██", " ██  ██ ", "  ████  ", "  ████  ", " ██  ██ ", "██    ██"],
  Y: ["██    ██", " ██  ██ ", "  ████  ", "   ██   ", "   ██   ", "   ██   "],
  Z: ["████████", "      ██", "    ██  ", "  ██    ", "██      ", "████████"],
  "0": [" ██████ ", "██    ██", "██    ██", "██    ██", "██    ██", " ██████ "],
  "1": ["   ██   ", "  ███   ", "   ██   ", "   ██   ", "   ██   ", " ██████ "],
  "2": [" ██████ ", "██    ██", "     ██ ", "   ██   ", " ██     ", "████████"],
  "3": [" ██████ ", "██    ██", "    ███ ", "      ██", "██    ██", " ██████ "],
  "4": ["██    ██", "██    ██", "████████", "      ██", "      ██", "      ██"],
  "5": ["████████", "██      ", "███████ ", "      ██", "██    ██", " ██████ "],
  "6": [" ██████ ", "██      ", "███████ ", "██    ██", "██    ██", " ██████ "],
  "7": ["████████", "      ██", "     ██ ", "    ██  ", "   ██   ", "   ██   "],
  "8": [" ██████ ", "██    ██", " ██████ ", "██    ██", "██    ██", " ██████ "],
  "9": [" ██████ ", "██    ██", " ███████", "      ██", "      ██", " ██████ "],
  ".": ["        ", "        ", "        ", "        ", "   ██   ", "   ██   "],
  ",": ["        ", "        ", "        ", "   ██   ", "   ██   ", "  ██    "],
  "!": ["   ██   ", "   ██   ", "   ██   ", "   ██   ", "        ", "   ██   "],
  "?": [" ██████ ", "██    ██", "     ██ ", "   ██   ", "        ", "   ██   "],
  "-": ["        ", "        ", "████████", "        ", "        ", "        "],
  "+": ["        ", "   ██   ", "████████", "   ██   ", "        ", "        "],
  "=": ["        ", "████████", "        ", "████████", "        ", "        "],
  ":": ["        ", "   ██   ", "        ", "        ", "   ██   ", "        "],
  "'": ["   ██   ", "   ██   ", "        ", "        ", "        ", "        "],
  "/": ["      ██", "     ██ ", "    ██  ", "   ██   ", "  ██    ", " ██     "],
  "\\": [
    " ██     ",
    "  ██    ",
    "   ██   ",
    "    ██  ",
    "     ██ ",
    "      ██",
  ],
  "*": ["        ", "██ ██ ██", " ██████ ", "██ ██ ██", "        ", "        "],
  "<": ["     ██ ", "   ██   ", " ██     ", "   ██   ", "     ██ ", "        "],
  ">": [" ██     ", "   ██   ", "     ██ ", "   ██   ", " ██     ", "        "],
  "(": ["    ██  ", "  ██    ", "  ██    ", "  ██    ", "  ██    ", "    ██  "],
  ")": ["  ██    ", "    ██  ", "    ██  ", "    ██  ", "    ██  ", "  ██    "],
  "[": ["  ████  ", "  ██    ", "  ██    ", "  ██    ", "  ██    ", "  ████  "],
  "]": ["  ████  ", "    ██  ", "    ██  ", "    ██  ", "    ██  ", "  ████  "],
  "#": [" ██  ██ ", "████████", " ██  ██ ", "████████", " ██  ██ ", "        "],
  "@": [" ██████ ", "██    ██", "██ ██ ██", "██ ████ ", "██      ", " ██████ "],
  _: ["        ", "        ", "        ", "        ", "        ", "████████"],
  " ": ["        ", "        ", "        ", "        ", "        ", "        "],
};

const DEFAULT_RAMP = "░▒▓█";

/**
 * Lays the text out into a rectangular on/off grid.
 *
 * Unknown characters are dropped rather than substituted. The original of this
 * component fell back to a hardcoded glyph, so any unsupported character
 * silently rendered as the letter E.
 */
function buildGrid(text: string, letterSpacing: number): boolean[][] {
  const glyphs = text
    .toUpperCase()
    .split("")
    .map((ch) => FONT[ch])
    .filter((g): g is string[] => Boolean(g));

  if (glyphs.length === 0) return [];

  const gap = " ".repeat(Math.max(0, letterSpacing));
  const rows: boolean[][] = [];

  for (let row = 0; row < GLYPH_HEIGHT; row++) {
    const line = glyphs.map((g) => g[row]).join(gap);
    rows.push(line.split("").map((ch) => ch !== " "));
  }

  return rows;
}

export function AsciiText({
  text = "NYX UI",
  animation = "wave",
  speed = 1,
  fontSize = 14,
  autoFit = true,
  letterSpacing = 2,
  color,
  glow = false,
  ramp = DEFAULT_RAMP,
  className,
  style,
  ...rest
}: AsciiTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState("");
  const [fitSize, setFitSize] = useState<number | null>(null);

  const grid = useMemo(
    () => buildGrid(text, letterSpacing),
    [text, letterSpacing],
  );

  const cols = grid[0]?.length ?? 0;

  // Keep the animation reading the latest values without rebuilding the loop,
  // so changing speed mid-flight does not restart the animation.
  const liveRef = useRef({ animation, speed, ramp, grid });
  liveRef.current = { animation, speed, ramp, grid };

  useEffect(() => {
    if (grid.length === 0) {
      setFrame("");
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    const start = performance.now();

    const render = (now: number) => {
      const {
        animation: mode,
        speed: rate,
        ramp: chars,
        grid: g,
      } = liveRef.current;
      const t = reduceMotion ? 0 : ((now - start) / 1000) * rate;
      const last = chars.length - 1;
      const lit = chars[last] ?? "█";
      const rows = g.length;
      const width = g[0]?.length ?? 0;

      const out: string[] = [];

      for (let y = 0; y < rows; y++) {
        let line = "";
        for (let x = 0; x < width; x++) {
          if (!g[y][x]) {
            line += " ";
            continue;
          }

          switch (mode) {
            case "wave": {
              // Travelling sine picks a density from the ramp per column.
              const v = (Math.sin(x * 0.18 - t * 3 + y * 0.25) + 1) / 2;
              line += chars[Math.round(v * last)] ?? lit;
              break;
            }
            case "pulse": {
              const v = (Math.sin(t * 2.2) + 1) / 2;
              line += chars[Math.round(v * last)] ?? lit;
              break;
            }
            case "scan": {
              // A bright band sweeps down the glyphs.
              const band = ((t * 0.6) % 1) * rows;
              const d = Math.abs(y - band);
              const v = Math.max(0, 1 - d / 2);
              line += chars[Math.round(v * last)] ?? lit;
              break;
            }
            case "glitch": {
              // Deterministic hash, so the noise does not reshuffle every frame.
              const seed =
                Math.sin(x * 12.9898 + y * 78.233 + Math.floor(t * 8)) *
                43758.5453;
              const n = seed - Math.floor(seed);

              // Glitched cells must land strictly below the brightest rung,
              // otherwise they render identically to an unglitched cell and the
              // whole effect is invisible.
              if (n > 0.96) {
                line += " ";
              } else if (n > 0.82) {
                const dim = Math.floor(((n - 0.82) / 0.14) * last);
                line +=
                  chars[Math.min(Math.max(last - 1, 0), Math.max(0, dim))] ??
                  lit;
              } else {
                line += lit;
              }
              break;
            }
            case "typewriter": {
              const revealed = (t * 12) % (width + 12) | 0;
              line += x <= revealed ? lit : " ";
              break;
            }
            default:
              line += lit;
          }
        }
        out.push(line);
      }

      setFrame(out.join("\n"));

      if (mode !== "none" && !reduceMotion) {
        raf = requestAnimationFrame(render);
      }
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
    // Only the shape of the grid needs a restart; the rest is read from the ref.
  }, [grid.length, cols, animation]);

  // Fit one line of glyphs to the container. A monospace cell is ~0.6em wide.
  useEffect(() => {
    if (!autoFit || cols === 0) return;
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const width = el.clientWidth;
      if (width > 0) setFitSize(Math.max(4, width / (cols * 0.62)));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [autoFit, cols]);

  const size = autoFit ? (fitSize ?? fontSize) : fontSize;

  return (
    <div
      ref={containerRef}
      className={cn("w-full overflow-hidden", className)}
      style={style}
      role="img"
      aria-label={text}
      {...rest}
    >
      <pre
        aria-hidden
        className="m-0 w-full text-center font-mono leading-none whitespace-pre select-none"
        style={{
          fontSize: `${size}px`,
          color,
          textShadow: glow ? "0 0 0.5em currentColor" : undefined,
        }}
      >
        {frame}
      </pre>
    </div>
  );
}
