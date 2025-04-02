import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import { MajesticCard } from "@/nyxui/components/MajesticCard"
import { MajesticCardDemo } from "@/nyxui/demos/MajesticCardDemo"
import { Activity, Badge, CloudLightning, HeartPulse, MessageCircle, MoreVertical, Share2, Smartphone } from "lucide-react"
import fs from "fs";
import path from "path";
import { Button } from "@/components/ui/button";

const componentPath = path.join(process.cwd(), "src/nyxui/components/MajesticCard.tsx");
const MajesticCardSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/MajesticCardDemo.tsx");
const MajesticCardDemoSource = fs.readFileSync(demoPath, "utf8");


export const MajesticCardData: ComponentData = {
  name: "Majestic Card",
  description:
    "Cards that float in layers when scrolling. Tilt and rotate subtly based on mouse movement. Adds realistic depth to UI components.",
  preview: <MajesticCardDemo />,
  usage: MajesticCardDemoSource,
  componentCode: MajesticCardSource,
  dependencies: [
    {
      name: "Framer Motion",
      description: "Production-ready motion library for React for creating animations and interactive UI elements.",
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
            'The animation variant. Possible values: "parallax", "tilt", "float", "magnetic", "layered", "morph", "breathe", "glow", "wave".',
        },
        {
          name: "intensity",
          type: "number",
          default: "3",
          description:
            "The intensity of the effect (1-5).",
        },
        {
          name: "theme",
          type: "string",
          default: '"light"',
          description:
            'The color theme. Possible values: "light", "dark", "glass", "gradient", "neon", "cosmic", "custom".',
        },
        {
          name: "customColors",
          type: "object",
          default: "undefined",
          description:
            'Custom colors object with properties: background, and optionally border, shadow, and glow.',
        },
        {
          name: "rounded",
          type: "string",
          default: '"lg"',
          description:
            'Border radius. Possible values: "none", "sm", "md", "lg", "xl", "full", "pill".',
        },
        {
          name: "shadow",
          type: "boolean",
          default: "true",
          description:
            "Whether to show a shadow effect.",
        },
        {
          name: "shadowSize",
          type: "string",
          default: '"md"',
          description:
            'Shadow size. Possible values: "sm", "md", "lg", "xl", "2xl".',
        },
        {
          name: "shadowType",
          type: "string",
          default: '"standard"',
          description:
            'Shadow type. Possible values: "standard", "soft", "hard", "inner", "glow".',
        },
        {
          name: "border",
          type: "boolean",
          default: "false",
          description:
            "Whether to show a border.",
        },
        {
          name: "borderStyle",
          type: "string",
          default: '"solid"',
          description:
            'Border style. Possible values: "solid", "dashed", "dotted", "gradient", "glow".',
        },
        {
          name: "hoverEffect",
          type: "boolean",
          default: "true",
          description:
            "Whether to enable the hover effect.",
        },
        {
          name: "scrollEffect",
          type: "boolean",
          default: "false",
          description:
            "Whether to enable scroll-based animations.",
        },
        {
          name: "reduceMotion",
          type: "boolean",
          default: "false",
          description:
            "Reduce or disable animations for accessibility.",
        },
        {
          name: "confettiEffect",
          type: "boolean",
          default: "false",
          description:
            "Adds a confetti animation effect on hover.",
        },
        {
          name: "speed",
          type: "string",
          default: '"normal"',
          description:
            'Animation speed. Possible values: "slow", "normal", "fast".',
        },
        {
          name: "blurBackground",
          type: "boolean",
          default: "false",
          description:
            "Applies a backdrop blur effect to the background.",
        },
        {
          name: "layerCount",
          type: "number",
          default: "3",
          description:
            "Number of layers for layered variant (1-5).",
        },
        {
          name: "layerSeparation",
          type: "number",
          default: "2",
          description:
            "Distance between layers for layered variant (1-5).",
        },
        {
          name: "floatPattern",
          type: "string",
          default: '"simple"',
          description:
            'Float animation pattern. Possible values: "simple", "complex", "random", "sine", "circle".',
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description:
            "Additional CSS classes to apply.",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "undefined",
          description:
            "The content to display inside the card.",
        },
      ],
    },
  ],
  
  category: "Cards",
  examples: [
    {
      name: "Interactive Wave Dashboard Card",
      preview: (
        <MajesticCard 
          variant="wave" 
          theme="glass" 
          intensity={3} 
          shadow 
          shadowSize="lg" 
          rounded="lg" 
          floatPattern="complex"
          className="p-6 w-full"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 dark:text-white">Activity Overview</h3>
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Daily Active Users</p>
                <span className="text-green-500 text-sm font-medium">+12.5%</span>
              </div>
              <div className="flex items-end space-x-1">
                {[35, 58, 45, 65, 72, 53, 80].map((h, i) => (
                  <div 
                    key={i} 
                    className="bg-blue-500 dark:bg-blue-600 rounded-t w-full" 
                    style={{ height: `${h}px` }}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-sm flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Revenue</p>
                <div className="flex items-center">
                  <span className="text-xl font-bold text-gray-800 dark:text-white">$24.3k</span>
                  <span className="ml-2 text-xs text-green-500">+8.1%</span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-sm flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Conversion</p>
                <div className="flex items-center">
                  <span className="text-xl font-bold text-gray-800 dark:text-white">3.6%</span>
                  <span className="ml-2 text-xs text-red-500">-1.2%</span>
                </div>
              </div>
            </div>
          </div>
        </MajesticCard>
      ),
      filename: "InteractiveWaveDashboardCard.tsx",
      code: `import { MajesticCard } from "@/nyxui/components/MajesticCard";
  import { Activity } from 'lucide-react';
  
  export function InteractiveWaveDashboardCard() {
    return (
      <MajesticCard 
        variant="wave" 
        theme="glass" 
        intensity={3} 
        shadow 
        shadowSize="lg" 
        rounded="lg" 
        floatPattern="complex"
        className="p-6 w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 dark:text-white">Activity Overview</h3>
          <Activity className="h-5 w-5 text-blue-500" />
        </div>
        
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Daily Active Users</p>
              <span className="text-green-500 text-sm font-medium">+12.5%</span>
            </div>
            <div className="flex items-end space-x-1">
              {[35, 58, 45, 65, 72, 53, 80].map((h, i) => (
                <div 
                  key={i} 
                  className="bg-blue-500 dark:bg-blue-600 rounded-t w-full" 
                  style={{ height: \`\${h}px\` }}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-sm flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Revenue</p>
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-800 dark:text-white">$24.3k</span>
                <span className="ml-2 text-xs text-green-500">+8.1%</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-sm flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Conversion</p>
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-800 dark:text-white">3.6%</span>
                <span className="ml-2 text-xs text-red-500">-1.2%</span>
              </div>
            </div>
          </div>
        </div>
      </MajesticCard>
    );
  }`
    },
    {
      name: "Weather Card",
      preview: (
        <MajesticCard 
          variant="float" 
          floatPattern="complex" 
          theme="neon" 
          intensity={4} 
          shadow 
          shadowType="glow" 
          rounded="xl"
          className="w-full"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Weather</h3>
              <Badge className="bg-indigo-900 text-indigo-100">Now</Badge>
            </div>
            <div className="flex items-center justify-center mb-4">
              <CloudLightning className="w-16 h-16 text-indigo-300" />
            </div>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-white">23°</div>
              <div className="text-indigo-300 text-sm">Thunderstorms</div>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs text-indigo-200">
              <div>
                <div>Mon</div>
                <div className="font-medium">21°</div>
              </div>
              <div>
                <div>Tue</div>
                <div className="font-medium">24°</div>
              </div>
              <div>
                <div>Wed</div>
                <div className="font-medium">22°</div>
              </div>
              <div>
                <div>Thu</div>
                <div className="font-medium">25°</div>
              </div>
            </div>
          </div>
        </MajesticCard>
      ),
      filename: "WeatherCard.tsx",
      code: `import { MajesticCard } from "@/nyxui/components/MajesticCard";
  import { Badge } from "@/components/ui/badge";
  import { CloudLightning } from "lucide-react";
  
  export function WeatherCard() {
    return (
      <MajesticCard 
        variant="float" 
        floatPattern="complex" 
        theme="neon" 
        intensity={4} 
        shadow 
        shadowType="glow" 
        rounded="xl"
        className="w-full"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Weather</h3>
            <Badge className="bg-indigo-900 text-indigo-100">Now</Badge>
          </div>
          <div className="flex items-center justify-center mb-4">
            <CloudLightning className="w-16 h-16 text-indigo-300" />
          </div>
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-white">23°</div>
            <div className="text-indigo-300 text-sm">Thunderstorms</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-xs text-indigo-200">
            <div>
              <div>Mon</div>
              <div className="font-medium">21°</div>
            </div>
            <div>
              <div>Tue</div>
              <div className="font-medium">24°</div>
            </div>
            <div>
              <div>Wed</div>
              <div className="font-medium">22°</div>
            </div>
            <div>
              <div>Thu</div>
              <div className="font-medium">25°</div>
            </div>
          </div>
        </div>
      </MajesticCard>
    );
  }`
    },
      {
        name: "App Showcase Card",
        preview: (
          <MajesticCard 
            variant="float" 
            theme="glass" 
            intensity={3} 
            shadow 
            shadowSize="lg" 
            rounded="xl"
            blurBackground
            className="w-full"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">NyxUI Mobile</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">UI Component Library</p>
                </div>
              </div>
              <div className="relative h-40 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="w-20 h-36 bg-white dark:bg-zinc-700 rounded-xl shadow-lg relative overflow-hidden border-4 border-gray-300 dark:border-gray-600">
                  <div className="absolute inset-0 flex flex-col">
                    <div className="h-4 bg-gray-200 dark:bg-zinc-800"></div>
                    <div className="flex-grow p-1">
                      <div className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded mb-1"></div>
                      <div className="w-3/4 h-2 bg-blue-200 dark:bg-blue-900 rounded mb-1"></div>
                      <div className="w-1/2 h-2 bg-blue-200 dark:bg-blue-900 rounded mb-2"></div>
                      <div className="w-full h-8 bg-purple-200 dark:bg-purple-900 rounded mb-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Download App
              </Button>
            </div>
          </MajesticCard>
        ),
        filename: "AppShowcaseCard.tsx",
        code: `import { MajesticCard } from "@/nyxui/components/MajesticCard";
      import { Button } from "@/components/ui/button";
      import { Smartphone } from "lucide-react";
      
      export function AppShowcaseCard() {
        return (
          <MajesticCard 
            variant="float" 
            theme="glass" 
            intensity={3} 
            shadow 
            shadowSize="lg" 
            rounded="xl"
            blurBackground
            className="w-full"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">NyxUI Mobile</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">UI Component Library</p>
                </div>
              </div>
              <div className="relative h-40 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="w-20 h-36 bg-white dark:bg-zinc-700 rounded-xl shadow-lg relative overflow-hidden border-4 border-gray-300 dark:border-gray-600">
                  <div className="absolute inset-0 flex flex-col">
                    <div className="h-4 bg-gray-200 dark:bg-zinc-800"></div>
                    <div className="flex-grow p-1">
                      <div className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded mb-1"></div>
                      <div className="w-3/4 h-2 bg-blue-200 dark:bg-blue-900 rounded mb-1"></div>
                      <div className="w-1/2 h-2 bg-blue-200 dark:bg-blue-900 rounded mb-2"></div>
                      <div className="w-full h-8 bg-purple-200 dark:bg-purple-900 rounded mb-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Download App
              </Button>
            </div>
          </MajesticCard>
        );
      }`
      },
      {
        name: "Social Media Card",
        preview: (
          <MajesticCard 
            variant="breathe" 
            theme="dark" 
            intensity={2} 
            shadow 
            shadowSize="lg" 
            rounded="xl"
            className="w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mr-3 flex items-center justify-center">
                    <HeartPulse className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Social Connect</h3>
                    <p className="text-xs text-gray-400">5 minutes ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Just launched our new design system with interactive cards! 🚀 Check out these amazing hover effects.
              </p>
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 hover:text-pink-500">
                    <HeartPulse className="h-4 w-4" />
                    <span>72</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500">
                    <MessageCircle className="h-4 w-4" />
                    <span>14</span>
                  </button>
                </div>
                <button className="hover:text-green-500">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </MajesticCard>
        ),
        filename: "SocialMediaCard.tsx",
        code: `import { MajesticCard } from "@/nyxui/components/MajesticCard";
      import { Button } from "@/components/ui/button";
      import { HeartPulse, MoreVertical, MessageCircle, Share2 } from "lucide-react";
      
      export function SocialMediaCard() {
        return (
          <MajesticCard 
            variant="breathe" 
            theme="dark" 
            intensity={2} 
            shadow 
            shadowSize="lg" 
            rounded="xl"
            className="w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mr-3 flex items-center justify-center">
                    <HeartPulse className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Social Connect</h3>
                    <p className="text-xs text-gray-400">5 minutes ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Just launched our new design system with interactive cards! 🚀 Check out these amazing hover effects.
              </p>
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 hover:text-pink-500">
                    <HeartPulse className="h-4 w-4" />
                    <span>72</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500">
                    <MessageCircle className="h-4 w-4" />
                    <span>14</span>
                  </button>
                </div>
                <button className="hover:text-green-500">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </MajesticCard>
        );
      }`
      },
  ]
}