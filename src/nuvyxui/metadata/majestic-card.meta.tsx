import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { MajesticCardDemo } from "@/nuvyxui/demos/MajesticCardDemo";
import { MajesticCard } from "@/nuvyxui/components/MajesticCard";
import MajesticCardSource from "!!raw-loader!@/nuvyxui/components/MajesticCard.tsx";
import MajesticCardDemoSource from "!!raw-loader!@/nuvyxui/demos/MajesticCardDemo.tsx";
import { CloudLightning, CloudRain, Sun, Thermometer, Wind } from "lucide-react";

export const MajesticCardData: ComponentData = {
  name: "Majestic Card",
  description:
    "Cards that float in layers when scrolling. Tilt and rotate subtly based on mouse movement.",
  preview: <MajesticCardDemo />,
  usage: MajesticCardDemoSource,
  componentCode: MajesticCardSource,
  dependencies: [
    {
      name: "Framer Motion",
      description:
        "Production-ready motion library for React for creating animations and interactive UI elements.",
      install: {
        npm: "npm install framer-motion",
        pnpm: "pnpm add framer-motion",
        yarn: "yarn add framer-motion",
        bun: "bun add framer-motion",
      },
    },
    {
      name: "Utility Functions",
      description: "Utility functions for conditional class name merging.",
      install: {
        npm: "npm install clsx tailwind-merge",
        pnpm: "pnpm add clsx tailwind-merge",
        yarn: "yarn add clsx tailwind-merge",
        bun: "bun add clsx tailwind-merge",
      },
      setup: {
        description: "Create a utils.ts file with the cn utility function",
        file: "/lib/utils.ts",
        code: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
      },
    },
  ],
  props: [
    {
      name: "Majestic Card",
      items: [
        {
          name: "variant",
          type: "string",
          default: '"tilt"',
          description:
            'The animation variant. Possible values: "float", "magnetic", "breathe", "glow".',
        },
        {
          name: "intensity",
          type: "number",
          default: "3",
          description: "The intensity of the effect (1-5).",
        },
        {
          name: "glowColor",
          type: "string",
          default: "#93c5fd80",
          description:
            "The color of the glow effect.",
        },
        {
          name: "hoverEffect",
          type: "boolean",
          default: "true",
          description: "Whether to enable the hover effect.",
        },
        {
          name: "scrollEffect",
          type: "boolean",
          default: "false",
          description: "Whether to enable scroll-based animations.",
        },
        {
          name: "reduceMotion",
          type: "boolean",
          default: "false",
          description: "Reduce or disable animations for accessibility.",
        },
        {
          name: "speed",
          type: "string",
          default: '"normal"',
          description:
            'Animation speed. Possible values: "slow", "normal", "fast".',
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes to apply.",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "undefined",
          description: "The content to display inside the card.",
        },
      ],
    },
  ],

  category: "Cards",
  tags: ["Card", "Animation", "Interactive"],
  examples: [
    {
      name: "Weather Card",
      preview: (
        <div className="flex flex-col items-center py-12">
          <MajesticCard
            variant="float"
            intensity={4}
            className="w-full h-full  rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col items-center rounded-2xl max-w-lg mx-auto">
              <MajesticCard variant="glow" intensity={2} className="w-full bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 border border-indigo-500/20" >
                <div className="p-8 h-full flex flex-col relative">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-white">Weather Forecast</h3>
                        <p className="text-indigo-200 text-sm">14:25</p>
                      </div>
                      <div className="bg-indigo-600/80 text-indigo-100 text-sm px-3 py-1 rounded-full flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        Live
                      </div>
                    </div>
                    <div className="flex items-center justify-center mb-8">
                      <div className="flex items-center">
                        <MajesticCard variant="magnetic" className="bg-transparent border-none">
                          <CloudLightning className="w-32 h-32 text-indigo-300 drop-shadow-lg" />
                        </MajesticCard>
                        <div className="ml-4">
                          <div className="text-6xl font-bold text-white mb-1">23°C</div>
                          <div className="text-indigo-200 text-lg font-medium">Thunderstorm</div>
                          <div className="text-indigo-300 text-sm">Indore, India</div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                      <div className="bg-white/10 rounded-xl p-3">
                        <Wind className="w-5 h-5 text-blue-200 mx-auto mb-1" />
                        <div className="text-xs text-indigo-200">Wind</div>
                        <div className="text-white font-medium">12 km/h</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <CloudRain className="w-5 h-5 text-blue-200 mx-auto mb-1" />
                        <div className="text-xs text-indigo-200">Rain</div>
                        <div className="text-white font-medium">80%</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <Thermometer className="w-5 h-5 text-blue-200 mx-auto mb-1" />
                        <div className="text-xs text-indigo-200">Feels like</div>
                        <div className="text-white font-medium">25°C</div>
                      </div>
                    </div>
                    <div className="bg-indigo-900/30 p-4 rounded-xl backdrop-blur-sm border border-indigo-500/20">
                      <h4 className="text-indigo-100 font-medium mb-3 text-sm">4-Day Forecast</h4>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="p-2 bg-indigo-800/20 rounded-lg">
                          <div className="mb-1 text-indigo-200 font-medium">Mon</div>
                          <Sun className="w-5 h-5 text-amber-300 mx-auto mb-1" />
                          <div className="font-bold text-lg text-white">21°</div>
                        </div>
                        <div className="p-2 bg-indigo-800/20 rounded-lg">
                          <div className="mb-1 text-indigo-200 font-medium">Tue</div>
                          <CloudLightning className="w-5 h-5 text-blue-300 mx-auto mb-1" />
                          <div className="font-bold text-lg text-white">24°</div>
                        </div>
                        <div className="p-2 bg-indigo-800/20 rounded-lg">
                          <div className="mb-1 text-indigo-200 font-medium">Wed</div>
                          <CloudRain className="w-5 h-5 text-blue-200 mx-auto mb-1" />
                          <div className="font-bold text-lg text-white">22°</div>
                        </div>
                        <div className="p-2 bg-indigo-800/20 rounded-lg">
                          <div className="mb-1 text-indigo-200 font-medium">Thu</div>
                          <Sun className="w-5 h-5 text-amber-300 mx-auto mb-1" />
                          <div className="font-bold text-lg text-white">25°</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </MajesticCard>
            </div>
          </MajesticCard>
        </div>
      ),
      filename: "IronManTech.tsx",
      code: `import MajesticCard from "@/nuvyxui/components/MajesticCard";
import { CloudLightning, CloudRain, Sun, Thermometer, Wind } from "lucide-react";
  
export function IronManTech() {
  return (
    <div className="flex flex-col items-center py-12">
      <MajesticCard
        variant="float"
        intensity={4}
        className="w-full h-full  rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col items-center rounded-2xl max-w-lg mx-auto">
          <MajesticCard variant="glow" intensity={2} className="w-full bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950 border border-indigo-500/20" >
            <div className="p-8 h-full flex flex-col relative">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Weather Forecast</h3>
                    <p className="text-indigo-200 text-sm">14:25</p>
                  </div>
                  <div className="bg-indigo-600/80 text-indigo-100 text-sm px-3 py-1 rounded-full flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Live
                  </div>
                </div>
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center">
                    <MajesticCard variant="magnetic" className="bg-transparent border-none">
                      <CloudLightning className="w-32 h-32 text-indigo-300 drop-shadow-lg" />
                    </MajesticCard>
                    <div className="ml-4">
                      <div className="text-6xl font-bold text-white mb-1">23°C</div>
                      <div className="text-indigo-200 text-lg font-medium">Thunderstorm</div>
                      <div className="text-indigo-300 text-sm">Indore, India</div>
                    </div>
                  </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                      <div className="bg-white/10 rounded-xl p-3">
                        <Wind className="w-5 h-5 text-blue-200 mx-auto mb-1" />
                        <div className="text-xs text-indigo-200">Wind</div>
                        <div className="text-white font-medium">12 km/h</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <CloudRain className="w-5 h-5 text-blue-200 mx-auto mb-1" />
                        <div className="text-xs text-indigo-200">Rain</div>
                        <div className="text-white font-medium">80%</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3">
                        <Thermometer className="w-5 h-5 text-blue-200 mx-auto mb-1" />
                        <div className="text-xs text-indigo-200">Feels like</div>
                        <div className="text-white font-medium">25°C</div>
                      </div>
                    </div>
                    <div className="bg-indigo-900/30 p-4 rounded-xl backdrop-blur-sm border border-indigo-500/20">
                      <h4 className="text-indigo-100 font-medium mb-3 text-sm">4-Day Forecast</h4>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="p-2 bg-indigo-800/20 rounded-lg">
                          <div className="mb-1 text-indigo-200 font-medium">Mon</div>
                          <Sun className="w-5 h-5 text-amber-300 mx-auto mb-1" />
                          <div className="font-bold text-lg text-white">21°</div>
                        </div>
                        <div className="p-2 bg-indigo-800/20 rounded-lg">
                          <div className="mb-1 text-indigo-200 font-medium">Tue</div>
                          <CloudLightning className="w-5 h-5 text-blue-300 mx-auto mb-1" />
                          <div className="font-bold text-lg text-white">24°</div>
                        </div>
                        <div className="p-2 bg-indigo-800/20 rounded-lg">
                          <div className="mb-1 text-indigo-200 font-medium">Wed</div>
                          <CloudRain className="w-5 h-5 text-blue-200 mx-auto mb-1" />
                          <div className="font-bold text-lg text-white">22°</div>
                        </div>
                        <div className="p-2 bg-indigo-800/20 rounded-lg">
                          <div className="mb-1 text-indigo-200 font-medium">Thu</div>
                          <Sun className="w-5 h-5 text-amber-300 mx-auto mb-1" />
                          <div className="font-bold text-lg text-white">25°</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MajesticCard>
          </div>
        </MajesticCard>
    </div>
    );
  }`,
    },
  ],
};
