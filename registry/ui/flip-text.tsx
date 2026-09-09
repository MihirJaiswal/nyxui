"use client";

import { cn } from "@/lib/utils";
import { motion, type Transition } from "motion/react";
import React, { useState } from "react";

export type FlipTextProps = {
  /** String whose characters flip up and away on hover. */
  text: string;
  /** Per-character animation duration, seconds. */
  duration?: number;
  /** Stagger between characters, seconds. */
  stagger?: number;
  className?: string;
  /** Classes applied to the duplicate hover layer. */
  overlayClassName?: string;
  href?: string;
  transition?: Transition;
} & Omit<
  React.ComponentPropsWithoutRef<"a">,
  | "children"
  | "style"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDrop"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
>;

const renderChar = (char: string) => (char === " " ? " " : char);

/**
 * Splits text into characters that roll up and away on hover, while a
 * duplicate layer rolls in from below — staggered letter by letter in the
 * same order on enter and leave. Renders an anchor when `href` is provided,
 * otherwise a span.
 */
export const FlipText: React.FC<FlipTextProps> = ({
  text,
  duration = 0.25,
  stagger = 0.025,
  className,
  overlayClassName,
  href,
  transition = { ease: "easeInOut" },
  ...props
}) => {
  const [hovered, setHovered] = useState(false);
  const characters = text.split("");

  const renderRow = (isOverlay: boolean) => (
    <div
      className={cn(isOverlay && "absolute inset-0", overlayClassName)}
      aria-hidden={isOverlay}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={false}
          animate={{
            y: hovered
              ? isOverlay
                ? "0%"
                : "-100%"
              : isOverlay
                ? "100%"
                : "0%",
          }}
          transition={{ ...transition, duration, delay: stagger * i }}
          className="inline-block will-change-transform"
        >
          {renderChar(char)}
        </motion.span>
      ))}
    </div>
  );

  const shared = {
    onHoverStart: () => setHovered(true),
    onHoverEnd: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
    "aria-label": text,
    className: cn(
      "relative block overflow-hidden whitespace-nowrap",
      className,
    ),
    style: { lineHeight: 1 },
  };

  if (href) {
    return (
      <motion.a href={href} {...shared} {...props}>
        {renderRow(false)}
        {renderRow(true)}
      </motion.a>
    );
  }

  return (
    <motion.span {...shared} {...props}>
      {renderRow(false)}
      {renderRow(true)}
    </motion.span>
  );
};
