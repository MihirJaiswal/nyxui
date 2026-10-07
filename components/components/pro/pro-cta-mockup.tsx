"use client";

export function ProCtaMockup() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative h-full w-full select-none overflow-hidden"
    >
      <div className="absolute" style={{ right: -24, top: 40 }}>
        {/* Back plate */}
        <div
          className="absolute rounded-3xl bg-neutral-100 ring-1 ring-neutral-200 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.22)] dark:bg-[#0f0f0f] dark:ring-[#242424]"
          style={{ left: -28, top: 22, width: 340, height: 220 }}
        />
        {/* Front frame */}
        <div className="relative w-90 rounded-3xl bg-neutral-100 p-1.5 ring-1 ring-neutral-200 shadow-[0_26px_64px_-26px_rgba(0,0,0,0.28)] dark:bg-[#0f0f0f] dark:ring-[#242424] dark:shadow-[0_30px_70px_-26px_rgba(0,0,0,0.8)]">
          <div className="h-56 overflow-hidden rounded-[18px] bg-white ring-1 ring-neutral-200 dark:bg-neutral-950 dark:ring-[#242424]">
            {/* Title bar */}
            <div className="flex h-9 items-center gap-2 border-b border-neutral-200/70 px-4 dark:border-white/10">
              <span className="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="size-2 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="ml-2 flex-1 truncate rounded-md bg-neutral-100 px-2 py-0.5 font-mono text-[10px] text-neutral-400 dark:bg-neutral-900 dark:text-neutral-500">
                nyxui.com/blocks
              </span>
            </div>

            {/* Content — mini block preview */}
            <div className="relative p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold tracking-wide text-neutral-800 dark:text-neutral-100">
                    hero-section-07
                  </p>
                  <p className="font-mono text-[9.5px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                    Pro block
                  </p>
                </div>
                <span className="rounded-full bg-brand px-2 py-0.5 font-mono text-[9.5px] font-semibold tracking-wider text-brand-foreground uppercase">
                  Unlocked
                </span>
              </div>

              {/* Mock render */}
              <div className="mt-3 space-y-1.5 rounded-lg bg-neutral-50 p-3 ring-1 ring-neutral-200/70 dark:bg-neutral-900/60 dark:ring-white/5">
                <div className="h-2 w-2/3 rounded-full bg-neutral-300/90 dark:bg-neutral-700" />
                <div className="h-2 w-4/5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                <div className="mt-2.5 flex gap-1.5">
                  <div className="h-4 w-12 rounded-full bg-neutral-800 dark:bg-neutral-100" />
                  <div className="h-4 w-12 rounded-full ring-1 ring-neutral-300 ring-inset dark:ring-neutral-700" />
                </div>
              </div>

              {/* Copy line */}
              <div className="mt-3 flex items-center gap-2 rounded-md bg-neutral-950 px-2.5 py-1.5 font-mono text-[10px] text-neutral-300 dark:bg-black dark:ring-1 dark:ring-white/10">
                <span className="text-brand">$</span>
                <span className="truncate">
                  npx shadcn add https://nyxui.com/r/pro/hero-section-07.json
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edge fades — heavier bottom fade so the frame dissolves into the
          section floor rather than ending on a hard cut. */}
      <div className="absolute inset-y-0 right-0 z-10 w-20 bg-linear-to-l from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-background via-background/85 to-transparent" />
    </div>
  );
}

export default ProCtaMockup;
