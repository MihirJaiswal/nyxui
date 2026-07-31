import { GrainyBackground } from "@/registry/ui/grainy-background";
import { Waves, Orbit, Zap, Blend } from "lucide-react";

export default function GrainyBgDemo() {
  return (
    <div className="w-full py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
            Six animations. Six grains. Infinite combos.
          </h2>
        </div>

        <div className="grid auto-rows-[160px] grid-cols-2 gap-4 sm:grid-cols-4">
          {/* Featured — large aurora tile */}
          <div className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl sm:col-span-2">
            <GrainyBackground
              darkMode
              animationType="aurora"
              grainType="plasma"
              grainIntensity={40}
              grainSize={120}
              speed={0.7}
              colors={["#7c3aed", "#2563eb", "#db2777", "#06b6d4"]}
              className="h-full"
            >
              <div className="relative z-10 flex h-full flex-col justify-between p-6">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-white/70">
                    Aurora · Plasma
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    Grainy gradients
                  </h3>
                  <p className="mt-1 text-sm text-white/60">
                    Animated mesh backgrounds with film-grain textures.
                  </p>
                </div>
              </div>
            </GrainyBackground>
          </div>

          {/* Mesh · paper */}
          <div className="relative overflow-hidden rounded-2xl">
            <GrainyBackground
              animationType="mesh"
              grainType="paper"
              grainIntensity={35}
              grainSize={90}
              speed={1.2}
              colors={["#10b981", "#059669", "#34d399", "#6ee7b7"]}
              className="h-full"
            >
              <div className="relative z-10 flex h-full flex-col justify-between p-4">
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/70">
                  Mesh
                </span>
                <span className="text-lg font-semibold text-white">Paper</span>
              </div>
            </GrainyBackground>
          </div>

          {/* Pulse · dust */}
          <div className="relative overflow-hidden rounded-2xl">
            <GrainyBackground
              darkMode
              animationType="pulse"
              grainType="dust"
              grainIntensity={45}
              grainSize={100}
              speed={0.9}
              colors={["#1e40af", "#7c3aed", "#0ea5e9", "#6366f1"]}
              className="h-full"
            >
              <div className="relative z-10 flex h-full flex-col justify-between p-4">
                <Zap className="h-4 w-4 text-white/80" />
                <span className="text-lg font-semibold text-white">Pulse</span>
              </div>
            </GrainyBackground>
          </div>

          {/* Waves · noise — wide */}
          <div className="relative col-span-2 overflow-hidden rounded-2xl">
            <GrainyBackground
              animationType="waves"
              grainType="noise"
              grainIntensity={30}
              grainSize={80}
              speed={1.4}
              colors={["#f97316", "#ef4444", "#fbbf24", "#fb923c"]}
              className="h-full"
            >
              <div className="relative z-10 flex h-full items-center justify-between p-4">
                <div>
                  <Waves className="mb-2 h-4 w-4 text-white/80" />
                  <span className="text-lg font-semibold text-white">
                    Waves
                  </span>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
                  Noise grain
                </span>
              </div>
            </GrainyBackground>
          </div>

          {/* Spiral · scratches */}
          <div className="relative overflow-hidden rounded-2xl">
            <GrainyBackground
              darkMode
              animationType="spiral"
              grainType="scratches"
              grainIntensity={38}
              grainSize={110}
              speed={0.8}
              colors={["#059669", "#0891b2", "#10b981", "#34d399"]}
              className="h-full"
            >
              <div className="relative z-10 flex h-full flex-col justify-between p-4">
                <Orbit className="h-4 w-4 text-white/80" />
                <span className="text-lg font-semibold text-white">Spiral</span>
              </div>
            </GrainyBackground>
          </div>

          {/* Flow · digital */}
          <div className="relative overflow-hidden rounded-2xl">
            <GrainyBackground
              animationType="flow"
              grainType="digital"
              grainIntensity={42}
              grainSize={85}
              speed={1.6}
              colors={["#ec4899", "#8b5cf6", "#d946ef", "#f472b6"]}
              className="h-full"
            >
              <div className="relative z-10 flex h-full flex-col justify-between p-4">
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/70">
                  Flow
                </span>
                <span className="text-lg font-semibold text-white">
                  Digital
                </span>
              </div>
            </GrainyBackground>
          </div>

          {/* Mesh · digital — wide bottom-right */}
          <div className="relative col-span-2 overflow-hidden rounded-2xl">
            <GrainyBackground
              animationType="mesh"
              grainType="digital"
              grainIntensity={36}
              grainSize={95}
              speed={1.1}
              colors={["#0ea5e9", "#6366f1", "#8b5cf6", "#22d3ee"]}
              className="h-full"
            >
              <div className="relative z-10 flex h-full items-center justify-between p-4">
                <div>
                  <Blend className="mb-2 h-4 w-4 text-white/80" />
                  <span className="text-lg font-semibold text-white">
                    Blend modes
                  </span>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
                  Mesh · Digital
                </span>
              </div>
            </GrainyBackground>
          </div>
        </div>
      </div>
    </div>
  );
}
