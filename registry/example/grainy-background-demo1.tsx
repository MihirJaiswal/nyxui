import { GrainyBackground } from "@/registry/ui/grainy-background";
import { ArrowRight } from "lucide-react";

export default function GrainyBackgroundDemo1() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <GrainyBackground
        darkMode
        animationType="mesh"
        grainType="plasma"
        grainIntensity={35}
        grainSize={120}
        speed={1.4}
        colors={["#1e1b4b", "#0c4a6e", "#2e1065", "#0a0a0a"]}
        position="relative"
        className="inset-0"
      >
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-8 py-20 text-center sm:px-12">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Start building today.
          </h2>
          <p className="mt-4 max-w-[400px] text-pretty text-[15px] leading-relaxed text-white/55">
            Install the registry, pick a component, ship it. No setup, no
            config, no friction.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-white to-neutral-200 px-6 py-2.5 text-[13px] font-semibold text-neutral-950 shadow-sm shadow-black/20 transition-all hover:shadow-md hover:shadow-black/25">
              Get started
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <button className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-2.5 text-[13px] font-medium text-white/70 backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/[0.08] hover:text-white">
              View docs
              <ArrowRight className="h-3.5 w-3.5 text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/70" />
            </button>
          </div>
        </div>
      </GrainyBackground>
    </div>
  );
}
