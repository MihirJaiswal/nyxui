"use client";

import type React from "react";
import { motion, useReducedMotion } from "motion/react";
import AnimatedLogo from "@/components/home/newsletter/animated-logo";

export function AnimatedLogoSection(): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = Boolean(shouldReduceMotion);

  return (
    <section
      aria-label="The Nyx mark"
      className="relative left-1/2 w-screen -translate-x-1/2 border-b border-border/60"
    >
      <div className="mx-auto max-w-295 border-x border-border/60">
        <div className="grid items-center gap-10 px-6 py-16 sm:px-10 md:grid-cols-[1fr_auto] md:px-12 md:py-20">
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-widest text-brand">
              The mark
            </p>
            <h2 className="max-w-xl text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
              Drawn in a single
              <br />
              <span className="text-foreground/65">
                {" "}
                <span className="font-caveat text-brand text-6xl">stroke.</span>
              </span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
              The Nyx mark animates from a bare outline to the finished glyph —
              pure SVG, no JavaScript animation library, and it respects
              reduced-motion out of the box.
            </p>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              delay: reduceMotion ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex justify-center text-brand md:justify-end"
          >
            <AnimatedLogo
              width={220}
              height={195}
              strokeWidth={20}
              durationMs={2600}
              triggerOnce
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
