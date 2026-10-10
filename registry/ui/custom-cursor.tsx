"use client";

import React, { useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

// Default pointer SVG component
const DefaultPointerSVG = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="1"
    viewBox="0 0 16 16"
    className={className}
    style={style}
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
  </svg>
);

export const Cursor = ({
  children,
  className,
  name,
  customSVG,
  svgClassName,
  cursorColor = "sky",
}: {
  children: React.ReactNode;
  className?: string;
  name: string;
  customSVG?: React.ReactNode;
  svgClassName?: string;
  /** Named preset ("sky", "red", ...) or any CSS color (e.g. "rose", "#e11d48"). */
  cursorColor?: string;
}) => {
  const posX = useMotionValue(0);
  const posY = useMotionValue(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [mouseInside, setMouseInside] = useState<boolean>(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        posX.set(e.clientX - rect.left);
        posY.set(e.clientY - rect.top);
      }
    },
    [posX, posY],
  );

  const handleMouseEnter = useCallback(() => {
    setMouseInside(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseInside(false);
  }, []);

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      style={{
        cursor: "none",
      }}
      ref={containerRef}
      className={cn("relative", className)}
    >
      {children}
      <AnimatePresence>
        {mouseInside && (
          <FollowCursor
            x={posX}
            y={posY}
            name={name}
            customSVG={customSVG}
            svgClassName={svgClassName}
            cursorColor={cursorColor}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export const FollowCursor = ({
  x,
  y,
  name,
  customSVG,
  svgClassName,
  cursorColor = "sky",
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  name: string;
  customSVG?: React.ReactNode;
  svgClassName?: string;
  cursorColor?: string;
}) => {
  // Named presets map to hex; anything else is treated as a raw CSS color.
  // Inline styles (not interpolated Tailwind classes) so arbitrary colors
  // work in any build without safelisting.
  const COLOR_PRESETS: Record<string, string> = {
    sky: "#0ea5e9",
    red: "#ef4444",
    green: "#22c55e",
    blue: "#3b82f6",
    purple: "#a855f7",
    pink: "#ec4899",
    yellow: "#eab308",
    indigo: "#6366f1",
  };

  const getColorStyles = (color: string): React.CSSProperties => {
    const base = COLOR_PRESETS[color] ?? color;
    return { color: base };
  };

  const colorStyles = getColorStyles(cursorColor);

  return (
    <motion.div
      className="absolute z-50 h-4 w-4 rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
      }}
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    >
      {customSVG ? (
        <div
          className={cn(
            "h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] transform",
            svgClassName,
          )}
          style={colorStyles}
        >
          {customSVG}
        </div>
      ) : (
        <DefaultPointerSVG
          className={cn(
            "h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] transform",
            svgClassName,
          )}
          style={colorStyles}
        />
      )}
      <div
        className={cn(
          "w-fit rounded-full px-2 py-1 text-white pointer-events-none text-xs whitespace-nowrap",
        )}
        style={{ backgroundColor: colorStyles.color }}
      >
        {name}
      </div>
    </motion.div>
  );
};
