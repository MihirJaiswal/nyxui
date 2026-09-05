"use client";

import type React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { MorphLink } from "@/components/ui/morph-link";
import { TiledImage } from "./TiledImage";

export function FeaturesGrid(): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = Boolean(shouldReduceMotion);

  return (
    <section
      aria-label="NyxUI features"
      className="relative left-1/2 w-screen -translate-x-1/2 border-b border-border/60"
    >
      <div className="mx-auto max-w-295 border-x border-border/60">
        <div className="grid md:grid-cols-2">
          {/* Left: copy */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col px-6 py-10 sm:py-12 sm:px-10 md:px-12"
          >
            <div className="mb-5 flex items-center gap-2">
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand">
                Design engineering
              </p>
            </div>

            <h2 className="max-w-md text-4xl leading-tight font-medium tracking-tight text-foreground sm:text-5xl">
              Make it useful and beautiful.
              <br />
              <span className="font-caveat text-brand text-5xl sm:text-6xl">
                in the same pass.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-muted-foreground">
              Every component is designed and engineered together, spacing,
              motion, and states tuned by hand before it ships.
            </p>

            <MorphLink href="/design-engineering" className="mt-8 w-fit">
              <div className="flex items-center gap-1">
                <span>Read the full story</span>
                <ArrowUpRight className="inline size-4" />
              </div>
            </MorphLink>
          </motion.div>

          {/* Right: image */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              delay: reduceMotion ? 0 : 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center justify-center border-t border-border/60 px-6 py-6 sm:py-12 sm:px-10 md:border-t-0 md:px-12"
          >
            <TiledImage className="max-w-md" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
