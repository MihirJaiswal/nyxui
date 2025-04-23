import React from "react";
import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { CyberpunkCard } from "@/nuvyxui/components/CyberpunkCard";
import { CyberpunkCardDemo } from "@/nuvyxui/demos/CyberpunkCardDemo";
import { Shield, Terminal, Wifi, Zap } from "lucide-react";

import CyberpunkCardSource from "!!raw-loader!@/nuvyxui/components/CyberpunkCard.tsx";
import CyberpunkCardDemoSource from "!!raw-loader!@/nuvyxui/demos/CyberpunkCardDemo.tsx";
import Image from "next/image";

export const cyberpunkCardData: ComponentData = {
  name: "Cyberpunk Card",
  description:
    "A futuristic glowing card that shifts colors dynamically. Supports hover-triggered light trails around the border.",
  preview: <CyberpunkCardDemo />,
  usage: CyberpunkCardDemoSource,
  componentCode: CyberpunkCardSource,
  dependencies: [
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
      name: "Cyberpunk Card",
      items: [
        {
          name: "theme",
          type: "string",
          default: '"neon-blue"',
          description:
            'The color theme of the card. Possible values: "neon-blue", "neon-pink", "neon-green", "neon-orange", "neon-purple", "custom".',
        },
        {
          name: "customColors",
          type: "object",
          default: "undefined",
          description:
            'Custom colors for the card when theme is set to "custom". The object should include properties: primary, secondary, and accent.',
        },
        {
          name: "borderStyle",
          type: "string",
          default: '"solid"',
          description:
            'The border style of the card. Possible values: "solid", "dashed", "glitch", "corners".',
        },
        {
          name: "colorShift",
          type: "boolean",
          default: "true",
          description: "Whether to enable the color shift effect.",
        },
        {
          name: "lightTrail",
          type: "boolean",
          default: "true",
          description: "Whether to enable the light trail effect.",
        },
        {
          name: "rounded",
          type: "string",
          default: '"md"',
          description:
            'The border radius of the card. Possible values: "none", "sm", "md", "lg".',
        },
        {
          name: "glow",
          type: "boolean",
          default: "true",
          description: "Whether to show a glow effect.",
        },
        {
          name: "glowIntensity",
          type: "number",
          default: "3",
          description: "The intensity of the glow effect (1-5).",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Additional CSS classes to apply.",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "undefined",
          description: "Content of the card.",
        },
      ],
    },
  ],

  category: "Cards",
  tags: ["Card", "Effects"],
  examples: [
    {
      name: "Neon Purple Hacking Suite",
      preview: (
        <CyberpunkCard
          theme="neon-purple"
          borderStyle="dashed"
          glowIntensity={5}
          className="lg:scale-85"
        >
          <div className="space-y-2 sm:space-y-4">
            <div className="relative flex items-center justify-between bg-purple-900/70 px-2 sm:px-3 py-1 sm:py-2 rounded border-b border-purple-500/50">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <Terminal className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  <span className="absolute -top-1 -right-1 w-1 h-1 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-ping"></span>
                </div>
                <h3 className="text-sm sm:text-base md:text-xl font-bold tracking-wider text-white">
                  HACKING SUITE
                </h3>
              </div>
              <div className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple-800/40 rounded text-xs border border-purple-500/30 flex items-center gap-1 sm:gap-2">
                <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 bg-green-400 rounded-full"></span>
                <span className="text-green-300 font-mono text-xs">ONLINE</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm opacity-90 border-l-2 border-purple-200 pl-2 sm:pl-3 py-1 italic text-purple-100">
              Advanced intrusion tools with ICE-breaking capabilities and
              self-modifying algorithms
            </p>

            <div className="w-full h-1.5 sm:h-2 bg-[#120917] rounded overflow-hidden">
              <div className="h-full bg-purple-100 w-3/4"
                style={{ boxShadow: "0 0 8px rgb(207, 156, 255)" }}></div>
            </div>

            <div className="flex justify-between text-xs font-mono text-purple-100">
              <span className="text-[10px] sm:text-xs">SYSTEM INTEGRITY: 75%</span>
              <span className="text-[10px] sm:text-xs">UPTIME: 13:42:06</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-2 sm:mt-4">
              <div className="bg-[#0F090F] p-2 sm:p-3 rounded border border-purple-600/30 relative overflow-hidden">
                <div className="flex items-center justify-center">
                  <Image
                    src="/assets/images/cyberpunk-card/img2.jpg"
                    alt="logo1"
                    width={200}
                    height={200}
                    className="w-full h-auto max-h-32 sm:max-h-full object-contain"
                    quality={100}
                    loading='lazy'
                  />
                </div>
              </div>

              <div className="bg-purple-900/70 p-2 sm:p-3 rounded border border-purple-600/30 font-mono relative overflow-hidden">
                <div className="absolute inset-0 opacity-5"
                  style={{ backgroundSize: "20px 20px", backgroundImage: "linear-gradient(to right,rgb(210, 163, 255) 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)" }}></div>

                <div className="text-purple-100 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></span>
                  CONNECTION:
                </div>

                <div className="mt-1 flex items-center gap-1 sm:gap-2 bg-purple-800/30 px-1 sm:px-2 py-0.5 sm:py-1 rounded border-l border-r border-purple-500/30 text-xs">
                  <span className="inline-block w-1.5 h-1.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-green-300">SECURED</span>
                </div>

                <div className="mt-2 sm:mt-3 text-purple-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></span>
                  TARGET:
                </div>

                <div className="mt-1 truncate bg-purple-800/30 px-1 sm:px-2 py-0.5 sm:py-1 rounded border-l border-r border-purple-500/30 animate-pulse text-xs">
                  Arasaka Database
                </div>

                <div className="mt-2 sm:mt-3 text-purple-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></span>
                  PING:
                </div>

                <div className="mt-1 flex justify-between text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 bg-purple-800/30 rounded border-l border-r border-purple-500/30">
                  <span>127ms</span>
                  <span>|||||||||||||</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-purple-600/30">
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple-800/30 rounded-full border border-purple-500/30">
                  ICE: 3/7
                </span>
                <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple-800/30 rounded-full border border-purple-500/30">
                  CPU: 42%
                </span>
              </div>
              <div className="animate-pulse text-green-300">
                SYSTEM READY
              </div>
            </div>
          </div>
        </CyberpunkCard>
      ),
      filename: "NeonPurpleHackingSuite.tsx",
      code: `import { CyberpunkCard } from "@/nuvyxui/components/CyberpunkCard";
  import { Terminal } from 'lucide-react';
  
  export function NeonPurpleHackingSuite() {
    return (
      <CyberpunkCard
  theme="neon-purple"
  borderStyle="dashed"
  glowIntensity={5}
>
  <div className="space-y-2 sm:space-y-4">
    <div className="relative flex items-center justify-between bg-purple-900/70 px-2 sm:px-3 py-1 sm:py-2 rounded border-b border-purple-500/50">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative">
          <Terminal className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          <span className="absolute -top-1 -right-1 w-1 h-1 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-ping"></span>
        </div>
        <h3 className="text-sm sm:text-base md:text-xl font-bold tracking-wider text-white">
          HACKING SUITE
        </h3>
      </div>
      <div className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple-800/40 rounded text-xs border border-purple-500/30 flex items-center gap-1 sm:gap-2">
        <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 bg-green-400 rounded-full"></span>
        <span className="text-green-300 font-mono text-xs">ONLINE</span>
      </div>
    </div>
    
    <p className="text-xs sm:text-sm opacity-90 border-l-2 border-purple-200 pl-2 sm:pl-3 py-1 italic text-purple-100">
      Advanced intrusion tools with ICE-breaking capabilities and
      self-modifying algorithms
    </p>

    <div className="w-full h-1.5 sm:h-2 bg-[#120917] rounded overflow-hidden">
      <div className="h-full bg-purple-100 w-3/4"
        style={{ boxShadow: "0 0 8px rgb(207, 156, 255)" }}></div>
    </div>
    
    <div className="flex justify-between text-xs font-mono text-purple-100">
      <span className="text-[10px] sm:text-xs">SYSTEM INTEGRITY: 75%</span>
      <span className="text-[10px] sm:text-xs">UPTIME: 13:42:06</span>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-2 sm:mt-4">
      <div className="bg-[#0F090F] p-2 sm:p-3 rounded border border-purple-600/30 relative overflow-hidden">
        <div className="flex items-center justify-center">
          <Image
            src="/assets/images/cyberpunk-card/img2.jpg"
            alt="logo1"
            width={200}
            height={200}
            className="w-full h-auto max-h-32 sm:max-h-full object-contain"
            quality={100}
            loading='lazy'
          />
        </div>
      </div>

      <div className="bg-purple-900/70 p-2 sm:p-3 rounded border border-purple-600/30 font-mono relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundSize: "20px 20px", backgroundImage: "linear-gradient(to right,rgb(210, 163, 255) 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)" }}></div>

        <div className="text-purple-100 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
          <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></span>
          CONNECTION:
        </div>

        <div className="mt-1 flex items-center gap-1 sm:gap-2 bg-purple-800/30 px-1 sm:px-2 py-0.5 sm:py-1 rounded border-l border-r border-purple-500/30 text-xs">
          <span className="inline-block w-1.5 h-1.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-green-300">SECURED</span>
        </div>

        <div className="mt-2 sm:mt-3 text-purple-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
          <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></span>
          TARGET:
        </div>

        <div className="mt-1 truncate bg-purple-800/30 px-1 sm:px-2 py-0.5 sm:py-1 rounded border-l border-r border-purple-500/30 animate-pulse text-xs">
          Arasaka Database
        </div>

        <div className="mt-2 sm:mt-3 text-purple-100 flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
          <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></span>
          PING:
        </div>

        <div className="mt-1 flex justify-between text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 bg-purple-800/30 rounded border-l border-r border-purple-500/30">
          <span>127ms</span>
          <span>|||||||||||||</span>
        </div>
      </div>
    </div>
    
    <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-purple-600/30">
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
        <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple-800/30 rounded-full border border-purple-500/30">
          ICE: 3/7
        </span>
        <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-purple-800/30 rounded-full border border-purple-500/30">
          CPU: 42%
        </span>
      </div>
      <div className="animate-pulse text-green-300">
        SYSTEM READY
      </div>
    </div>
  </div>
</CyberpunkCard>
    );
  }`,
    },
    {
      name: "Neon Orange NetworkHub",
      preview: (
        <CyberpunkCard
          theme="neon-orange"
          rounded="md"
          glow={true}
          glowIntensity={4}
          borderStyle="glitch"
        >
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <Wifi className="w-6 h-6 text-purple-50" />
                <h3 className="text-xl font-bold tracking-wider text-white">NETWORK HUB</h3>
              </div>
              <div className="px-2 py-1 bg-orange-900/30 rounded-sm text-xs border border-orange-500/50">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                ONLINE
              </div>
            </div>
            <p className="text-sm text-orange-100/80 border-l-2 border-white pl-3">
              Distributed mesh network controller with quantum encryption
            </p>
            <div className="relative w-full h-36 mx-auto bg-black/40 rounded border border-purple-500/30 p-3 overflow-hidden">
              <div className="absolute inset-0"
                style={{ backgroundImage: "url('/assets/images/cyberpunk-card/img1.jpg')", backgroundSize: "contain", backgroundPosition: "center", backgroundClip: "border-box", backgroundRepeat: "repeat" }}>
                <div className="bg-black absolute inset-0 opacity-50"></div>
              </div>

              <div className="flex items-center justify-center h-full relative">
                <div className="w-12 h-12 rounded-full bg-orange-500/30 border-2 border-orange-500 flex items-center justify-center animate-pulse">
                  <Shield className="w-6 h-6 text-orange-300" />
                </div>

                <div className="absolute h-px w-24 bg-gradient-to-r from-orange-500 to-transparent" style={{ transform: 'rotate(45deg) translateX(30px)' }}></div>
                <div className="absolute h-px w-24 bg-gradient-to-r from-orange-500 to-transparent" style={{ transform: 'rotate(135deg) translateX(30px)' }}></div>
                <div className="absolute h-px w-24 bg-gradient-to-r from-orange-500 to-transparent" style={{ transform: 'rotate(225deg) translateX(30px)' }}></div>
                <div className="absolute h-px w-24 bg-gradient-to-r from-orange-500 to-transparent" style={{ transform: 'rotate(315deg) translateX(30px)' }}></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <div className="px-2 py-1 bg-orange-900/30 rounded-full text-xs flex items-center gap-1 border border-orange-500/50">
                <span className="w-2 h-2 bg-orange-300 rounded-full animate-pulse"></span>
                NODE_A9
              </div>
              <div className="px-2 py-1 bg-orange-900/30 rounded-full text-xs flex items-center gap-1 border border-orange-500/50">
                <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
                NODE_B12
              </div>
              <div className="px-2 py-1 bg-orange-900/30 rounded-full text-xs flex items-center gap-1 border border-orange-500/50">
                <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
                NODE_C4
              </div>
              <div className="px-2 py-1 bg-orange-900/30 rounded-full text-xs flex items-center gap-1 border border-orange-500/50">
                <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
                NODE_D7
              </div>
            </div>

            <div className="flex justify-between items-center mt-2 text-xs font-mono border-t border-orange-500/50 pt-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-400" />
                <span>BANDWIDTH: <span className="text-white">12.8TB/s</span></span>
              </div>
              <span className="animate-pulse flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                SYNCED
              </span>
            </div>
          </div>
        </CyberpunkCard>
      ),
      filename: "NeonOrangeNetworkHub.tsx",
      code: `import { CyberpunkCard } from "@/nuvyxui/components/CyberpunkCard";
  import { Wifi } from 'lucide-react';
  
  export function NeonOrangeNetworkHub() {
    return (
      <CyberpunkCard
          theme="neon-orange"
          rounded="md"
          glow={true}
          glowIntensity={4}
          borderStyle="glitch"
        >
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <Wifi className="w-6 h-6 text-purple-50" />
                <h3 className="text-xl font-bold tracking-wider text-white">NETWORK HUB</h3>
              </div>
              <div className="px-2 py-1 bg-orange-900/30 rounded-sm text-xs border border-orange-500/50">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                ONLINE
              </div>
            </div>
            <p className="text-sm text-orange-100/80 border-l-2 border-white pl-3">
              Distributed mesh network controller with quantum encryption
            </p>
            <div className="relative w-full h-36 mx-auto bg-black/40 rounded border border-purple-500/30 p-3 overflow-hidden">
              <div className="absolute inset-0"
                style={{ backgroundImage: "url('/assets/images/cyberpunk-card/img1.jpg')", backgroundSize: "contain", backgroundPosition: "center", backgroundClip: "border-box", backgroundRepeat: "repeat" }}>
                  <div className="bg-black absolute inset-0 opacity-50"></div>
                </div>

              <div className="flex items-center justify-center h-full relative">
                <div className="w-12 h-12 rounded-full bg-orange-500/30 border-2 border-orange-500 flex items-center justify-center animate-pulse">
                  <Shield className="w-6 h-6 text-orange-300" />
                </div>

                <div className="absolute h-px w-24 bg-gradient-to-r from-orange-500 to-transparent" style={{ transform: 'rotate(45deg) translateX(30px)' }}></div>
                <div className="absolute h-px w-24 bg-gradient-to-r from-orange-500 to-transparent" style={{ transform: 'rotate(135deg) translateX(30px)' }}></div>
                <div className="absolute h-px w-24 bg-gradient-to-r from-orange-500 to-transparent" style={{ transform: 'rotate(225deg) translateX(30px)' }}></div>
                <div className="absolute h-px w-24 bg-gradient-to-r from-orange-500 to-transparent" style={{ transform: 'rotate(315deg) translateX(30px)' }}></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <div className="px-2 py-1 bg-orange-900/30 rounded-full text-xs flex items-center gap-1 border border-orange-500/50">
                <span className="w-2 h-2 bg-orange-300 rounded-full animate-pulse"></span>
                NODE_A9
              </div>
              <div className="px-2 py-1 bg-orange-900/30 rounded-full text-xs flex items-center gap-1 border border-orange-500/50">
                <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
                NODE_B12
              </div>
              <div className="px-2 py-1 bg-orange-900/30 rounded-full text-xs flex items-center gap-1 border border-orange-500/50">
                <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
                NODE_C4
              </div>
              <div className="px-2 py-1 bg-orange-900/30 rounded-full text-xs flex items-center gap-1 border border-orange-500/50">
                <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
                NODE_D7
              </div>
            </div>

            <div className="flex justify-between items-center mt-2 text-xs font-mono border-t border-orange-500/50 pt-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-400" />
                <span>BANDWIDTH: <span className="text-white">12.8TB/s</span></span>
              </div>
              <span className="animate-pulse flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                SYNCED
              </span>
            </div>
          </div>
        </CyberpunkCard>
    );
  }`,
    }
  ],
};
