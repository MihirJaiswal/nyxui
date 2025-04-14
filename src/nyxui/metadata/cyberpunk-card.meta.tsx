import React from "react";
import type { ComponentData } from "@/nyxui/ComponentInterfaces";
import { CyberpunkCard } from "@/nyxui/components/CyberpunkCard";
import { CyberpunkCardDemo } from "@/nyxui/demos/CyberpunkCardDemo";
import { Cpu, Database, Shield, Terminal, Wifi, Zap } from "lucide-react";

import CyberpunkCardSource from '!!raw-loader!@/nyxui/components/CyberpunkCard.tsx';
import CyberpunkCardDemoSource from '!!raw-loader!@/nyxui/demos/CyberpunkCardDemo.tsx';

export const cyberpunkCardData: ComponentData = {
  name: "Cyberpunk Card",
  description:
    "A futuristic glowing card that shifts colors dynamically. Supports hover-triggered light trails around the border. Perfect for gaming or tech-related UIs.",
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
          description:
            "Whether to enable the color shift effect.",
        },
        {
          name: "lightTrail",
          type: "boolean",
          default: "true",
          description:
            "Whether to enable the light trail effect.",
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
          description:
            "Whether to show a glow effect.",
        },
        {
          name: "glowIntensity",
          type: "number",
          default: "3",
          description:
            "The intensity of the glow effect (1-5).",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description:
            "Additional CSS classes to apply.",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "undefined",
          description:
            "Content of the card.",
        },
      ],
    },
  ],
  
  category: "Cards",
  examples : [
    {
      name: "Neon Blue Neural Interface",
      preview: (
        <CyberpunkCard theme="neon-blue" borderStyle="solid" glowIntensity={4}>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-6 h-6" />
              <h3 className="text-xl font-bold tracking-wider">NEURAL INTERFACE</h3>
            </div>
            <p className="text-sm opacity-80">Advanced cybernetic enhancement system with direct neural pathway integration</p>
            <div className="flex justify-between items-center mt-4 text-xs">
              <span className="px-2 py-1 bg-blue-600/30 rounded">v4.2.1</span>
              <span className="font-mono">CERTIFIED</span>
            </div>
          </div>
        </CyberpunkCard>
      ),
      filename: "NeonBlueNeuralInterface.tsx",
      code: `import { CyberpunkCard } from "@/nyxui/components/CyberpunkCard";
  import { Cpu } from 'lucide-react';
  
  export function NeonBlueNeuralInterface() {
    return (
      <CyberpunkCard theme="neon-blue" borderStyle="solid" glowIntensity={4}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6" />
            <h3 className="text-xl font-bold tracking-wider">NEURAL INTERFACE</h3>
          </div>
          <p className="text-sm opacity-80">Advanced cybernetic enhancement system with direct neural pathway integration</p>
          <div className="flex justify-between items-center mt-4 text-xs">
            <span className="px-2 py-1 bg-blue-600/30 rounded">v4.2.1</span>
            <span className="font-mono">CERTIFIED</span>
          </div>
        </div>
      </CyberpunkCard>
    );
  }`,
    },
    {
      name: "Neon Pink Combat System",
      preview: (
        <CyberpunkCard theme="neon-pink" borderStyle="glitch" glowIntensity={4}>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6" />
              <h3 className="text-xl font-bold tracking-wider">COMBAT SYSTEM</h3>
            </div>
            <p className="text-sm opacity-80">Military-grade tactical enhancement with reactive armor and weapon synchronization</p>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="text-center p-1 bg-pink-600/20 rounded text-xs">
                <div className="font-bold">ATK</div>
                <div>96%</div>
              </div>
              <div className="text-center p-1 bg-pink-600/20 rounded text-xs">
                <div className="font-bold">DEF</div>
                <div>87%</div>
              </div>
              <div className="text-center p-1 bg-pink-600/20 rounded text-xs">
                <div className="font-bold">SYN</div>
                <div>92%</div>
              </div>
            </div>
            <div className="text-right text-xs font-mono mt-2">
              DANGER LEVEL: EXTREME
            </div>
          </div>
        </CyberpunkCard>
      ),
      filename: "NeonPinkCombatSystem.tsx",
      code: `import { CyberpunkCard } from "@/nyxui/components/CyberpunkCard";
  import { Shield } from 'lucide-react';
  
  export function NeonPinkCombatSystem() {
    return (
      <CyberpunkCard theme="neon-pink" borderStyle="glitch" glowIntensity={4}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            <h3 className="text-xl font-bold tracking-wider">COMBAT SYSTEM</h3>
          </div>
          <p className="text-sm opacity-80">Military-grade tactical enhancement with reactive armor and weapon synchronization</p>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="text-center p-1 bg-pink-600/20 rounded text-xs">
              <div className="font-bold">ATK</div>
              <div>96%</div>
            </div>
            <div className="text-center p-1 bg-pink-600/20 rounded text-xs">
              <div className="font-bold">DEF</div>
              <div>87%</div>
            </div>
            <div className="text-center p-1 bg-pink-600/20 rounded text-xs">
              <div className="font-bold">SYN</div>
              <div>92%</div>
            </div>
          </div>
          <div className="text-right text-xs font-mono mt-2">
            DANGER LEVEL: EXTREME
          </div>
        </div>
      </CyberpunkCard>
    );
  }`,
    },
    {
      name: "Neon Green Stealth System",
      preview: (
        <CyberpunkCard theme="neon-green" borderStyle="corners" rounded="lg">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6" />
              <h3 className="text-xl font-bold tracking-wider">STEALTH SYSTEM</h3>
            </div>
            <p className="text-sm opacity-80">Optical camouflage technology with thermal dampening and sound suppression</p>
            <div className="w-full bg-green-900/30 rounded-full h-2 mt-4">
              <div className="bg-green-400 h-2 rounded-full w-4/5"></div>
            </div>
            <div className="flex justify-between text-xs">
              <span>BATTERY</span>
              <span>80%</span>
            </div>
            <div className="text-xs font-mono mt-2 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              ACTIVE CAMOUFLAGE ENGAGED
            </div>
          </div>
        </CyberpunkCard>
      ),
      filename: "NeonGreenStealthSystem.tsx",
      code: `import { CyberpunkCard } from "@/nyxui/components/CyberpunkCard";
  import { Zap } from 'lucide-react';
  
  export function NeonGreenStealthSystem() {
    return (
      <CyberpunkCard theme="neon-green" borderStyle="corners" rounded="lg">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6" />
            <h3 className="text-xl font-bold tracking-wider">STEALTH SYSTEM</h3>
          </div>
          <p className="text-sm opacity-80">Optical camouflage technology with thermal dampening and sound suppression</p>
          <div className="w-full bg-green-900/30 rounded-full h-2 mt-4">
            <div className="bg-green-400 h-2 rounded-full w-4/5"></div>
          </div>
          <div className="flex justify-between text-xs">
            <span>BATTERY</span>
            <span>80%</span>
          </div>
          <div className="text-xs font-mono mt-2 flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            ACTIVE CAMOUFLAGE ENGAGED
          </div>
        </div>
      </CyberpunkCard>
    );
  }`,
    },
    {
      name: "Neon Purple Hacking Suite",
      preview: (
        <CyberpunkCard theme="neon-purple" borderStyle="dashed" glowIntensity={5}>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-6 h-6" />
              <h3 className="text-xl font-bold tracking-wider">HACKING SUITE</h3>
            </div>
            <p className="text-sm opacity-80">Advanced intrusion tools with ICE-breaking capabilities and self-modifying algorithms</p>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-purple-600/20 p-2 rounded text-xs">
                <div className="font-mono text-purple-300">ACTIVE MODULES:</div>
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li>Firewall Bypass</li>
                  <li>Neural Tracer</li>
                  <li>Quantum Decryptor</li>
                </ul>
              </div>
              <div className="bg-purple-600/20 p-2 rounded text-xs font-mono">
                <div className="text-purple-300">CONNECTION:</div>
                <div className="mt-1 animate-pulse">● SECURED</div>
                <div className="mt-3 text-purple-300">TARGET:</div>
                <div className="mt-1 truncate">Arasaka Database</div>
              </div>
            </div>
          </div>
        </CyberpunkCard>
      ),
      filename: "NeonPurpleHackingSuite.tsx",
      code: `import { CyberpunkCard } from "@/nyxui/components/CyberpunkCard";
  import { Terminal } from 'lucide-react';
  
  export function NeonPurpleHackingSuite() {
    return (
      <CyberpunkCard theme="neon-purple" borderStyle="dashed" glowIntensity={5}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-6 h-6" />
            <h3 className="text-xl font-bold tracking-wider">HACKING SUITE</h3>
          </div>
          <p className="text-sm opacity-80">Advanced intrusion tools with ICE-breaking capabilities and self-modifying algorithms</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-purple-600/20 p-2 rounded text-xs">
              <div className="font-mono text-purple-300">ACTIVE MODULES:</div>
              <ul className="list-disc pl-4 mt-1 space-y-1">
                <li>Firewall Bypass</li>
                <li>Neural Tracer</li>
                <li>Quantum Decryptor</li>
              </ul>
            </div>
            <div className="bg-purple-600/20 p-2 rounded text-xs font-mono">
              <div className="text-purple-300">CONNECTION:</div>
              <div className="mt-1 animate-pulse">● SECURED</div>
              <div className="mt-3 text-purple-300">TARGET:</div>
              <div className="mt-1 truncate">Arasaka Database</div>
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
        <CyberpunkCard theme="neon-orange" rounded="lg" glow={true} glowIntensity={3}>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Wifi className="w-6 h-6" />
              <h3 className="text-xl font-bold tracking-wider">NETWORK HUB</h3>
            </div>
            <p className="text-sm opacity-80">Distributed mesh network controller with quantum encryption</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <div className="px-2 py-1 bg-orange-600/30 rounded-full text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
                NODE_A9
              </div>
              <div className="px-2 py-1 bg-orange-600/30 rounded-full text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
                NODE_B12
              </div>
              <div className="px-2 py-1 bg-orange-600/30 rounded-full text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
                NODE_C4
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 text-xs font-mono">
              <span>BANDWIDTH: 12.8TB/s</span>
              <span className="animate-pulse">⟳ SYNCED</span>
            </div>
          </div>
        </CyberpunkCard>
      ),
      filename: "NeonOrangeNetworkHub.tsx",
      code: `import { CyberpunkCard } from "@/nyxui/components/CyberpunkCard";
  import { Wifi } from 'lucide-react';
  
  export function NeonOrangeNetworkHub() {
    return (
      <CyberpunkCard theme="neon-orange" rounded="lg" glow={true} glowIntensity={3}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Wifi className="w-6 h-6" />
            <h3 className="text-xl font-bold tracking-wider">NETWORK HUB</h3>
          </div>
          <p className="text-sm opacity-80">Distributed mesh network controller with quantum encryption</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="px-2 py-1 bg-orange-600/30 rounded-full text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
              NODE_A9
            </div>
            <div className="px-2 py-1 bg-orange-600/30 rounded-full text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
              NODE_B12
            </div>
            <div className="px-2 py-1 bg-orange-600/30 rounded-full text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-orange-300 rounded-full"></span>
              NODE_C4
            </div>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs font-mono">
            <span>BANDWIDTH: 12.8TB/s</span>
            <span className="animate-pulse">⟳ SYNCED</span>
          </div>
        </div>
      </CyberpunkCard>
    );
  }`,
    },
    {
      name: "Custom Storage Card",
      preview: (
        <CyberpunkCard 
          theme="custom" 
          customColors={{
            primary: "#2D3748",
            secondary: "#1A202C",
            accent: "#38B2AC"
          }}
          borderStyle="corners"
          colorShift={true}
          lightTrail={true}
          glow={true}
          glowIntensity={3}
          rounded="lg"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Database className="w-6 h-6 text-black dark:text-white" />
              <h3 className="text-xl font-bold tracking-wider text-black dark:text-white">MEMORY VAULT</h3>
            </div>
            <p className="text-sm opacity-80 text-black dark:text-white">Secure quantum storage solution with 8PB capacity</p>
            <div className="w-full bg-gray-700/50 rounded-full h-2 mt-4">
              <div className="bg-teal-400 h-2 rounded-full w-3/5"></div>
            </div>
            <div className="flex justify-between text-xs font-mono text-black dark:text-white">
              <span>USED: 4.8PB</span>
              <span>FREE: 3.2PB</span>
            </div>
            <div className="mt-3 p-2 bg-gray-700/30 rounded text-xs text-black dark:text-white">
              <div className="font-bold mb-1">RECENT ARCHIVES:</div>
              <div className="truncate">• Neural Backup [2025-03-28]</div>
              <div className="truncate">• Memory Fragment #37A2 [2025-03-31]</div>
            </div>
          </div>
        </CyberpunkCard>
      ),
      filename: "CustomStorageCard.tsx",
      code: `import { CyberpunkCard } from "@/nyxui/components/CyberpunkCard";
  import { Database } from 'lucide-react';
  
  export function CustomStorageCard() {
    return (
      <CyberpunkCard 
        theme="custom" 
        customColors={{
          primary: "#2D3748",
          secondary: "#1A202C",
          accent: "#38B2AC"
        }}
        borderStyle="corners"
        colorShift={true}
        lightTrail={true}
        glow={true}
        glowIntensity={3}
        rounded="lg"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Database className="w-6 h-6 text-black dark:text-white" />
            <h3 className="text-xl font-bold tracking-wider text-black dark:text-white">MEMORY VAULT</h3>
          </div>
          <p className="text-sm opacity-80 text-black dark:text-white">Secure quantum storage solution with 8PB capacity</p>
          <div className="w-full bg-gray-700/50 rounded-full h-2 mt-4">
            <div className="bg-teal-400 h-2 rounded-full w-3/5"></div>
          </div>
          <div className="flex justify-between text-xs font-mono text-black dark:text-white">
            <span>USED: 4.8PB</span>
            <span>FREE: 3.2PB</span>
          </div>
          <div className="mt-3 p-2 bg-gray-700/30 rounded text-xs text-black dark:text-white">
            <div className="font-bold mb-1">RECENT ARCHIVES:</div>
            <div className="truncate">• Neural Backup [2025-03-28]</div>
            <div className="truncate">• Memory Fragment #37A2 [2025-03-31]</div>
          </div>
        </div>
      </CyberpunkCard>
    );
  }`,
    },
  ]
};