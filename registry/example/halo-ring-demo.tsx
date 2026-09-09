"use client";

import { HaloRing } from "@/registry/ui/halo-ring";
import { AudioLines, Loader, Mic, Send } from "lucide-react";

export const HaloRingDemo = () => {
  return (
    <div className="px-4 py-16 bg-black w-full rounded-2xl">
      <HaloRing
        className="mx-auto w-full max-w-sm rounded-2xl"
        innerClassName="rounded-2xl bg-neutral-900"
        colors={["#fb923c", "#f43f5e", "#c084fc"]}
      >
        <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-t-2xl">
          {/* Gradient glow backdrop */}
          <div className="absolute inset-0 bg-linear-to-b from-orange-300/30 dark:from-orange-500/10 via-rose-300/10 dark:via-rose-500/10 to-transparent" />
          {/* Center mic button with equalizer bars radiating outside */}
          <div className="relative flex items-center justify-center">
            {/* Left bars */}
            <div className="mr-3 flex items-center gap-1">
              {[7, 5, 9, 4].map((h, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-orange-300/50"
                  style={{ height: `${h * 2}px` }}
                />
              ))}
            </div>
            {/* Center mic */}
            <span className="flex size-14 items-center justify-center rounded-full bg-linear-to-b from-orange-400 to-rose-500 p-3 shadow-lg shadow-rose-500/30">
              <Mic className="size-6 text-white" />
            </span>
            {/* Right bars */}
            <div className="ml-3 flex items-center gap-1">
              {[4, 9, 5, 7].map((h, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-orange-300/50"
                  style={{ height: `${h * 2}px` }}
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
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-neutral-800 px-3 py-2.5 animate-pulse">
              <Loader className="size-3.5 animate-spin text-neutral-500" />
              <span className="text-xs text-neutral-500">Listening…</span>
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
