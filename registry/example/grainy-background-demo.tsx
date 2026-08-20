import { GrainyBackground } from "@/registry/ui/grainy-background";
import {
  Waves,
  Orbit,
  Zap,
  Blend,
  Sparkles,
  Layers,
  type LucideIcon,
} from "lucide-react";

interface Tile {
  animationType: "flow" | "mesh" | "waves" | "aurora" | "spiral" | "pulse";
  grainType: "digital" | "plasma" | "scratches" | "paper" | "noise" | "dust";
  grainIntensity: number;
  grainSize: number;
  speed: number;
  colors: string[];
  label: string;
  sublabel: string;
  description: string;
  icon: LucideIcon;
  span?: string;
}

const tiles: Tile[] = [
  {
    animationType: "aurora",
    grainType: "plasma",
    grainIntensity: 40,
    grainSize: 120,
    speed: 0.7,
    colors: ["#4f46e5", "#3730a3", "#4338ca", "#312e81"],
    label: "Grainy gradients",
    sublabel: "Aurora · Plasma",
    description: "Animated mesh backgrounds with film-grain textures.",
    icon: Sparkles,
    span: "col-span-2 row-span-2",
  },
  {
    animationType: "mesh",
    grainType: "paper",
    grainIntensity: 35,
    grainSize: 90,
    speed: 1.2,
    colors: ["#3b82f6", "#1e40af", "#2563eb", "#1e3a8a"],
    label: "Paper",
    sublabel: "Mesh",
    description: "Soft fibrous texture.",
    icon: Layers,
  },
  {
    animationType: "pulse",
    grainType: "dust",
    grainIntensity: 45,
    grainSize: 100,
    speed: 0.9,
    colors: ["#6366f1", "#3730a3", "#4f46e5", "#312e81"],
    label: "Pulse",
    sublabel: "Dust",
    description: "Breathing concentric rings.",
    icon: Zap,
  },
  {
    animationType: "waves",
    grainType: "noise",
    grainIntensity: 30,
    grainSize: 80,
    speed: 1.4,
    colors: ["#475569", "#334155", "#3b4d63", "#1e293b"],
    label: "Waves",
    sublabel: "Noise",
    description: "Rolling horizontal bands.",
    icon: Waves,
    span: "col-span-2",
  },
  {
    animationType: "spiral",
    grainType: "scratches",
    grainIntensity: 38,
    grainSize: 110,
    speed: 0.8,
    colors: ["#7c3aed", "#5b21b6", "#6d28d9", "#4c1d95"],
    label: "Spiral",
    sublabel: "Scratches",
    description: "Counter-rotating spirals.",
    icon: Orbit,
  },
  {
    animationType: "flow",
    grainType: "digital",
    grainIntensity: 42,
    grainSize: 85,
    speed: 1.6,
    colors: ["#8b5cf6", "#6d28d9", "#7c3aed", "#5b21b6"],
    label: "Flow",
    sublabel: "Digital",
    description: "Drifting radial blobs.",
    icon: Layers,
  },
  {
    animationType: "mesh",
    grainType: "digital",
    grainIntensity: 36,
    grainSize: 95,
    speed: 1.1,
    colors: ["#3b82f6", "#4338ca", "#4f46e5", "#1e293b"],
    label: "Blend modes",
    sublabel: "Mesh · Digital",
    description: "Connected mesh nodes.",
    icon: Blend,
    span: "col-span-2",
  },
];

function TileCard({ tile }: { tile: Tile }) {
  const Icon = tile.icon;
  const isLarge = tile.span?.includes("row-span-2");
  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/10 ring-1 ring-black/5 transition-transform duration-300 hover:scale-[1.02] dark:bg-neutral-900 dark:ring-white/10 ${tile.span ?? ""}`}
    >
      {/* Grainy header */}
      <div className={`relative m-2 overflow-hidden rounded-xl flex-1`}>
        <GrainyBackground
          darkMode
          animationType={tile.animationType}
          grainType={tile.grainType}
          grainIntensity={tile.grainIntensity}
          grainSize={tile.grainSize}
          speed={tile.speed}
          colors={tile.colors}
          className="h-full"
        >
          <div
            className={`relative z-10 flex h-full flex-col justify-between ${isLarge ? "p-5" : "p-3"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                <Icon className="h-3.5 w-3.5 text-white" />
              </div>
              <span
                className={`font-medium uppercase tracking-wider text-white/60 ${isLarge ? "text-[11px]" : "text-[9px]"}`}
              >
                {tile.sublabel}
              </span>
            </div>
            <span
              className={`block font-semibold tracking-tight text-white ${isLarge ? "text-xl" : "text-sm"}`}
            >
              {tile.label}
            </span>
          </div>
        </GrainyBackground>
      </div>
      {/* Content */}
      <div className={`flex flex-col justify-end ${isLarge ? "px-4 pb-4 pt-2" : "px-3 pb-3"}`}>
        <p
          className={`leading-relaxed text-neutral-500 dark:text-neutral-400 ${isLarge ? "text-sm" : "text-[11px]"}`}
        >
          {tile.description}
        </p>
      </div>
    </div>
  );
}

export default function GrainyBgDemo() {
  return (
    <div className="w-full py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
            Six animations. Six grains. Infinite combos.
          </h2>
          <p className="max-w-md text-balance text-sm text-neutral-500">
            Animated mesh gradients with film-grain textures. Mix and match
            animation styles and grain types for unique backgrounds.
          </p>
        </div>

        {/* Grid */}
        <div className="grid auto-rows-[160px] grid-cols-2 gap-4 sm:grid-cols-4">
          {tiles.map((tile) => (
            <TileCard key={`${tile.label}-${tile.sublabel}`} tile={tile} />
          ))}
        </div>
      </div>
    </div>
  );
}
