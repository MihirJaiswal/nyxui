"use client";

import { motion, useReducedMotion } from "motion/react";

export function LandingHeroIntro(): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto max-w-3xl px-6 text-center"
    >
      <h1 className="text-balance text-4xl font-medium dark:font-normal tracking-[-0.03em] sm:text-7xl leading-[0.68]">
        Build interfaces
        <br />
        that feel{" "}
        <span className="font-caveat text-brand tracking-[-0.04em] text-8xl font-bold">
          alive.
        </span>
      </h1>
      <p className="mx-auto pt-2 max-w-4xl text-pretty text-base text-foreground/80 sm:text-xl lg:text-2xl">
        Easily plug in the latest trending components without stressing over
        design or animations.
      </p>
    </motion.div>
  );
}
