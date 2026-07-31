import { GrainyBackground } from "@/registry/ui/grainy-background";
import { ArrowUpRight } from "lucide-react";

export default function GrainyBackgroundDemo1() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <GrainyBackground
        darkMode
        animationType="aurora"
        grainType="plasma"
        grainIntensity={42}
        grainSize={130}
        speed={0.7}
        colors={["#7c3aed", "#2563eb", "#db2777", "#06b6d4"]}
        position="relative"
        className="inset-0"
      >
        <div className="relative z-10 mx-auto flex min-h-[480px] max-w-4xl flex-col items-start justify-center px-8 py-16 sm:px-12">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 backdrop-blur-md">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/80">
              Feel the web
            </span>
          </div>

          <h1 className="text-balance pr-4 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            Interfaces that
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text pr-1 italic text-transparent">
              feel alive
            </span>
          </h1>

          <p className="mt-6 max-w-md text-pretty text-[15px] leading-relaxed text-white/65">
            A registry of animated, grainy-gradient backgrounds and interactive
            components for building modern, tactile web experiences.
          </p>

          <div className="mt-10 flex items-center gap-5">
            <button className="group inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-neutral-950 transition-transform duration-200 hover:scale-[1.03]">
              Browse components
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button className="inline-flex items-center gap-2 text-[13px] font-medium text-white/80 transition-colors hover:text-white">
              View registry
            </button>
          </div>

          <div className="mt-14 flex items-center gap-6 text-[11px] uppercase tracking-wider text-white/40">
            <span>Motion</span>
            <span className="h-3 w-px bg-white/20" />
            <span>React</span>
            <span className="h-3 w-px bg-white/20" />
            <span>Tailwind v4</span>
          </div>
        </div>
      </GrainyBackground>
    </div>
  );
}
