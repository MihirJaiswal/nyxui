"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  BentoComponentName,
  BentoComponentPreview,
} from "./BentoComponentPreview";

interface BentoCellDefinition {
  className: string;
  name: BentoComponentName;
}

interface BentoLayoutDefinition {
  cells: readonly BentoCellDefinition[];
  label: string;
  name: string;
}

const BENTO_LAYOUTS = [
  {
    label: "01",
    name: "Editorial",
    cells: [
      {
        name: "Keyboard",
        className:
          "min-h-52 sm:col-span-2 md:col-span-12 md:min-h-72 md:pb-4 lg:col-span-6 lg:min-h-0",
      },
      {
        name: "Glitch Button",
        className:
          "min-h-52 sm:col-span-1 md:col-span-6 lg:col-span-3 lg:min-h-0",
      },
      {
        name: "Image Ripple",
        className:
          "min-h-52 sm:col-span-1 md:col-span-6 lg:col-span-3 lg:min-h-0",
      },
      {
        name: "Terminal",
        className:
          "min-h-72 sm:col-span-1 md:col-span-6 lg:col-span-5 lg:row-span-2 lg:min-h-0",
      },
      {
        name: "Custom Pointer",
        className:
          "min-h-72 sm:col-span-1 md:col-span-6 lg:col-span-7 lg:row-span-2 lg:min-h-0",
      },
    ],
  },
  {
    label: "02",
    name: "Center stage",
    cells: [
      {
        name: "Keyboard",
        className:
          "min-h-52 sm:col-span-2 md:col-span-12 md:min-h-72 md:pb-4 lg:col-span-12 lg:min-h-0",
      },
      {
        name: "Custom Pointer",
        className:
          "min-h-52 sm:col-span-1 md:col-span-6 lg:col-span-3 lg:row-span-2 lg:min-h-0",
      },
      {
        name: "Terminal",
        className:
          "min-h-72 sm:col-span-1 md:col-span-6 lg:col-span-6 lg:row-span-2 lg:min-h-0",
      },
      {
        name: "Glitch Button",
        className:
          "min-h-52 sm:col-span-1 md:col-span-6 lg:col-span-3 lg:min-h-0",
      },
      {
        name: "Image Ripple",
        className:
          "min-h-52 sm:col-span-1 md:col-span-6 lg:col-span-3 lg:min-h-0",
      },
    ],
  },
  {
    label: "03",
    name: "Split rail",
    cells: [
      {
        name: "Terminal",
        className:
          "min-h-72 sm:col-span-1 md:col-span-6 lg:col-span-8 lg:row-span-2 lg:min-h-0",
      },
      {
        name: "Keyboard",
        className:
          "min-h-52 sm:col-span-1 md:col-span-6 md:min-h-72 lg:col-span-4 lg:min-h-0",
      },
      {
        name: "Glitch Button",
        className:
          "min-h-52 sm:col-span-1 md:col-span-6 lg:col-span-2 lg:min-h-0",
      },
      {
        name: "Image Ripple",
        className:
          "min-h-52 sm:col-span-1 md:col-span-6 lg:col-span-2 lg:min-h-0",
      },
      {
        name: "Custom Pointer",
        className:
          "min-h-52 sm:col-span-2 md:col-span-12 lg:col-span-12 lg:min-h-0",
      },
    ],
  },
] as const;

interface BentoCellProps {
  className: string;
  index: number;
  name: BentoComponentName;
  reduceMotion: boolean;
}

function BentoCell({
  className,
  index,
  name,
  reduceMotion,
}: BentoCellProps): React.ReactElement {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 18 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative isolate overflow-hidden rounded-3xl border border-border/70 bg-card/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-3 rounded-2xl border border-dashed border-border/45"
      />
      <BentoComponentPreview name={name} />
    </motion.div>
  );
}

export function ComponentBentoGrid(): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const [activeLayoutIndex, setActiveLayoutIndex] = useState(0);
  const activeLayout: BentoLayoutDefinition = BENTO_LAYOUTS[activeLayoutIndex];

  return (
    <section
      aria-label="Featured component showcase"
      className="relative left-1/2 w-screen -translate-x-1/2 border-b border-border/60"
    >
      <div className="relative mx-auto max-w-295 border-x border-border/60">
        <div className="grid border-b border-border/60 md:grid-cols-2">
          <div className="px-6 py-14 sm:px-10 md:px-12 md:py-18">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-brand">
              The component collection
            </p>
            <h2 className="max-w-xl text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
              Design basics.
              <br />
              Unforgettable{" "}
              <span className="font-caveat text-brand text-6xl">details.</span>
            </h2>
          </div>

          <div className="flex items-end border-t border-border/60 px-6 py-10 sm:px-10 md:border-l md:border-t-0 md:px-12 md:py-18">
            <p className="max-w-lg text-base leading-7 text-muted-foreground">
              From tactile controls to cinematic effects, every piece is built
              to be copied, tuned, and shipped without sanding off its
              personality.
            </p>
          </div>
        </div>

        <div className="grid grid-flow-row-dense grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:p-5 md:grid-cols-12 lg:auto-rows-52">
          {activeLayout.cells.map((cell, index) => (
            <BentoCell
              key={`${activeLayout.name}-${cell.name}`}
              className={cell.className}
              index={index}
              name={cell.name}
              reduceMotion={Boolean(shouldReduceMotion)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
