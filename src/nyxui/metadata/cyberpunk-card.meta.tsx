import React from "react";
import type { ComponentData } from "@/nyxui/ComponentInterfaces";
import { CyberpunkCard } from "@/nyxui/components/CyberpunkCard";
import { CyberpunkCardDemo } from "@/nyxui/demos/CyberpunkCardDemo";
import { Zap } from "lucide-react";
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/CyberpunkCard.tsx");
const CyberpunkCardSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/CyberpunkCardDemo.tsx");
const CyberpunkCardDemoSource = fs.readFileSync(demoPath, "utf8");

export const cyberpunkCardData: ComponentData = {
  name: "Cyberpunk Card",
  description:
    "A futuristic glowing card that shifts colors dynamically. Supports hover-triggered light trails around the border. Perfect for gaming or tech-related UIs.",
  preview: <CyberpunkCardDemo />,
  usage: CyberpunkCardDemoSource,
  componentCode: CyberpunkCardSource,
  dependencies: [
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework used for styling the component.",
      install: {
        npm: "npm install tailwindcss postcss autoprefixer && npx tailwindcss init -p",
        pnpm: "pnpm add tailwindcss postcss autoprefixer && pnpx tailwindcss init -p",
        yarn: "yarn add tailwindcss postcss autoprefixer && yarn tailwindcss init -p",
        bun: "bun add tailwindcss postcss autoprefixer && bun tailwindcss init -p",
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
          default: '"neon-blue" | "neon-pink" | "neon-green" | "neon-orange" | "neon-purple" | "custom"',
          description: "The color theme of the card",
        },
        {
          name: "customColors",
          type: "object",
          default: "undefined",
          description: "Custom colors for the card when theme is set to 'custom'",
        },
        {
          name: "borderStyle",
          type: "string",
          default: '"solid" | "dashed" | "glitch" | "corners"',
          description: "The border style of the card",
        },
        {
          name: "colorShift",
          type: "boolean",
          default: "true",
          description: "Whether to enable the color shift effect",
        },
        {
          name: "lightTrail",
          type: "boolean",
          default: "true",
          description: "Whether to enable the light trail effect",
        },
        {
          name: "rounded",
          type: "string",
          default: '"none" | "sm" | "md" | "lg"',
          description: "The border radius of the card",
        },
        {
          name: "glow",
          type: "boolean",
          default: "true",
          description: "Whether to show a glow effect",
        },
        {
          name: "glowIntensity",
          type: "number",
          default: "3",
          description: "The intensity of the glow effect (1-5)",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Additional CSS classes to apply",
        },
      ],
    },
  ],
  category: "Cards",
  examples: [
    {
      name: "Neon Blue Card",
      preview: (
        <CyberpunkCard theme="neon-blue" borderStyle="solid">
          <h3 className="text-lg font-bold">NEURAL INTERFACE</h3>
          <p className="text-sm opacity-70">Advanced cybernetic enhancement</p>
        </CyberpunkCard>
      ),
      filename: "NeonBlueCard.tsx",
      code: `import { CyberpunkCard } from "@/nyxui/components/CyberpunkCard";

export function NeonBlueCard() {
  return (
    <CyberpunkCard theme="neon-blue" borderStyle="solid">
      <h3 className="text-lg font-bold">NEURAL INTERFACE</h3>
      <p className="text-sm opacity-70">Advanced cybernetic enhancement</p>
    </CyberpunkCard>
  );
}`,
    },
    {
      name: "Neon Pink Card with Glitch Border",
      preview: (
        <CyberpunkCard theme="neon-pink" borderStyle="glitch">
          <h3 className="text-lg font-bold">COMBAT SYSTEM</h3>
          <p className="text-sm opacity-70">Military-grade tactical enhancement</p>
        </CyberpunkCard>
      ),
      filename: "NeonPinkCard.tsx",
      code: `import { CyberpunkCard } from "@/nyxui/components/CyberpunkCard";

export function NeonPinkCard() {
  return (
    <CyberpunkCard theme="neon-pink" borderStyle="glitch">
      <h3 className="text-lg font-bold">COMBAT SYSTEM</h3>
      <p className="text-sm opacity-70">Military-grade tactical enhancement</p>
    </CyberpunkCard>
  );
}`,
    },
    {
      name: "Neon Green Card with Corner Borders",
      preview: (
        <CyberpunkCard theme="neon-green" borderStyle="corners">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <h3 className="text-lg font-bold">STEALTH SYSTEM</h3>
          </div>
          <p className="text-sm opacity-70">Optical camouflage technology</p>
        </CyberpunkCard>
      ),
      filename: "NeonGreenCard.tsx",
      code: `import { CyberpunkCard } from "@/nyxui/components/CyberpunkCard";
import { Zap } from 'lucide-react';

export function NeonGreenCard() {
  return (
    <CyberpunkCard theme="neon-green" borderStyle="corners">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5" />
        <h3 className="text-lg font-bold">STEALTH SYSTEM</h3>
      </div>
      <p className="text-sm opacity-70">Optical camouflage technology</p>
    </CyberpunkCard>
  );
}`,
    },
    {
      name: "Neon Purple Card with Dashed Border",
      preview: (
        <CyberpunkCard theme="neon-purple" borderStyle="dashed" glowIntensity={5}>
          <h3 className="text-lg font-bold">HACKING SUITE</h3>
          <p className="text-sm opacity-70">Advanced intrusion tools</p>
        </CyberpunkCard>
      ),
      filename: "NeonPurpleCard.tsx",
      code: `import { CyberpunkCard } from "@/nyxui/components/CyberpunkCard";

export function NeonPurpleCard() {
  return (
    <CyberpunkCard theme="neon-purple" borderStyle="dashed" glowIntensity={5}>
      <h3 className="text-lg font-bold">HACKING SUITE</h3>
      <p className="text-sm opacity-70">Advanced intrusion tools</p>
    </CyberpunkCard>
  );
}`,
    },
    {
      name: "No Effects Card",
      preview: (
        <CyberpunkCard theme="neon-orange" colorShift={false} lightTrail={false} glow={false}>
          <h3 className="text-lg font-bold">BASIC CARD</h3>
          <p className="text-sm opacity-70">No special effects enabled</p>
        </CyberpunkCard>
      ),
      filename: "NoEffectsCard.tsx",
      code: `import { CyberpunkCard } from "@/nyxui/components/CyberpunkCard";

export function NoEffectsCard() {
  return (
    <CyberpunkCard theme="neon-orange" colorShift={false} lightTrail={false} glow={false}>
      <h3 className="text-lg font-bold">BASIC CARD</h3>
      <p className="text-sm opacity-70">No special effects enabled</p>
    </CyberpunkCard>
  );
}`,
    },
  ],
};