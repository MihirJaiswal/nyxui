"use client";

import { HaloRing } from "@/registry/ui/halo-ring";
import { AudioLines, Mic, Send } from "lucide-react";
import { motion } from "motion/react";

const leftBars = [7, 5, 9, 4];
const rightBars = [4, 9, 5, 7];

const barMotion = (delay: number) => ({
  animate: { scaleY: [1, 0.35, 1.4, 0.6, 1] },
  transition: {
    duration: 1.4,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
  },
});

export const HaloRingDemo = () => {
  return (
    <div className="w-full rounded-2xl bg-black px-4 py-16">
      <HaloRing
        className="mx-auto w-full max-w-sm rounded-2xl"
        innerClassName="rounded-2xl bg-neutral-900"
        colors={["#fb923c", "#f43f5e", "#c084fc"]}
      >
        <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-t-2xl">
          {/* Gradient glow backdrop */}
          <div className="absolute inset-0 bg-linear-to-b from-orange-300/30 via-rose-300/10 to-transparent" />
          {/* Center mic button with equalizer bars radiating outside */}
          <div className="relative flex items-center justify-center">
            {/* Left bars */}
            <div className="mr-3 flex items-center gap-1">
              {leftBars.map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1 origin-center rounded-full bg-orange-300/50"
                  style={{ height: `${h * 2}px` }}
                  {...barMotion(i * 0.15)}
                />
              ))}
            </div>
            {/* Center mic */}
            <motion.span
              className="flex size-14 items-center justify-center rounded-full bg-linear-to-b from-orange-400 to-rose-500 p-3 shadow-lg shadow-rose-500/30"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Mic className="size-6 text-white" />
            </motion.span>
            {/* Right bars */}
            <div className="ml-3 flex items-center gap-1">
              {rightBars.map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1 origin-center rounded-full bg-orange-300/50"
                  style={{ height: `${h * 2}px` }}
                  {...barMotion(0.6 + i * 0.15)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 px-5 pb-5">
          <p className="text-sm font-medium text-white">Voice Mode</p>
          <p className="text-sm leading-relaxed text-neutral-400">
            Speak naturally, it transcribes, answers, and remembers the thread
            of conversation.
          </p>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-neutral-800 px-3 py-2.5">
              <AudioLines className="size-3.5 animate-pulse text-neutral-500" />
              <span className="flex items-center gap-1 text-xs text-neutral-500">
                Listening
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    .
                  </motion.span>
                ))}
              </span>
            </div>
            <span className="flex size-9 items-center justify-center rounded-xl border border-neutral-800 transition-colors hover:bg-neutral-800">
              <AudioLines className="size-4 text-neutral-400" />
            </span>
            <span className="flex size-9 items-center justify-center rounded-xl bg-orange-500 transition-colors hover:bg-orange-400">
              <Send className="size-4 text-white" />
            </span>
          </div>
        </div>
      </HaloRing>
    </div>
  );
};
