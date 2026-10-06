"use client";

/**
 * Playground wrapper for `AnimateText`.
 *
 * The real component animates in when it scrolls into view via
 * motion/react's `useInView`. That's the right behaviour for consumers but
 * fails in the playground: the preview mounts inside a Suspense boundary
 * where `useInView` returns a stale `false` and the component never
 * reaches "visible". This wrapper reuses the exact variant definitions
 * from the real component and plays unconditionally.
 *
 * Replay-on-prop-change strategy: key the motion elements by `type`.
 * React 18's automatic batching makes the obvious "setState('hidden') →
 * requestAnimationFrame setState('visible')" trick racy — both state
 * updates can collapse into one commit and motion never sees a label
 * change, so the animation silently doesn't play. Keyed remount
 * sidesteps it entirely: new element → `initial="hidden"` → `animate=
 * "visible"` → transition always plays. Safe in the wrapper because
 * there's no `useInView` whose observer could race with mount timing.
 *
 * Only the render structure is duplicated — the animation DEFINITIONS
 * come from `registry/ui/animated-text` so changes there flow through
 * here automatically.
 */

import { motion } from "motion/react";
import { animationVariants } from "@/registry/ui/animated-text";

type AnimationType =
  | "blink"
  | "rise"
  | "expand"
  | "glide"
  | "cascade"
  | "flicker"
  | "elastic"
  | "float";

interface PlaygroundAnimateTextProps {
  text: string;
  type?: AnimationType;
  custom?: number;
  className?: string;
}

export default function AnimateTextPlayground({
  text,
  type = "elastic",
  custom = 1,
  className = "",
}: PlaygroundAnimateTextProps) {
  const { container, child } = animationVariants[type];
  const letters = Array.from(text);

  if (type === "cascade" || type === "flicker") {
    return (
      <h2
        key={type}
        className={`mt-6 text-3xl font-bold text-black dark:text-neutral-100 py-4 px-4 md:text-4xl ${className}`}
      >
        {text.split(" ").map((word, wordIndex) => (
          <motion.span
            className="inline-block mr-[0.25em] whitespace-nowrap"
            aria-hidden="true"
            key={wordIndex}
            initial="hidden"
            animate="visible"
            variants={container}
            transition={{
              delayChildren: wordIndex * 0.13,
              staggerChildren: 0.025,
            }}
          >
            {word.split("").map((character, charIndex) => (
              <motion.span
                aria-hidden="true"
                key={charIndex}
                variants={child}
                className="inline-block -mr-[0.01em]"
              >
                {character}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </h2>
    );
  }

  return (
    <motion.h2
      key={type}
      style={{ display: "flex", overflow: "hidden" }}
      role="heading"
      variants={container}
      initial="hidden"
      animate="visible"
      custom={custom}
      className={`mt-6 text-3xl font-bold text-black dark:text-neutral-100 py-4 px-4 md:text-4xl ${className}`}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? " " : letter}
        </motion.span>
      ))}
    </motion.h2>
  );
}
