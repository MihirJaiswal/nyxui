import React from "react";
import type { ComponentData } from "@/nyxui/ComponentInterfaces";
import { DynamicRipple } from "@/nyxui/components/DynamicRipple";
import { DynamicRippleDemo } from "@/nyxui/demos/DynamicRippleDemo";
import { Droplets } from "lucide-react";
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/DynamicRipple.tsx");
const DynamicRippleSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/DynamicRippleDemo.tsx");
const DynamicRippleDemoSource = fs.readFileSync(demoPath, "utf8");

export const dynamicRippleData: ComponentData = {
  name: "Dynamic Ripple",
  description:
    "A fluid, water ripple effect that reacts to cursor movement or touch. Can be used in cards, buttons, or section dividers. Works well with gradient-based morphing.",
  preview: <DynamicRippleDemo />,
  usage: DynamicRippleDemoSource,
  componentCode: DynamicRippleSource,
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
      name: "Dynamic Ripple",
      items: [
        {
          name: "theme",
          type: "string",
          default: '"blue" | "purple" | "green" | "amber" | "rose" | "custom"',
          description: "The color theme of the ripple effect",
        },
        {
          name: "customColors",
          type: "object",
          default: "undefined",
          description: "Custom colors for the ripple when theme is set to 'custom'",
        },
        {
          name: "intensity",
          type: "number",
          default: "3",
          description: "The intensity of the ripple effect (1-5)",
        },
        {
          name: "speed",
          type: "number",
          default: "3",
          description: "The speed of the ripple animation (1-5)",
        },
        {
          name: "reactToCursor",
          type: "boolean",
          default: "true",
          description: "Whether to enable the ripple effect on cursor movement",
        },
        {
          name: "autoAnimate",
          type: "boolean",
          default: "true",
          description: "Whether to enable the automatic ripple animation",
        },
        {
          name: "rounded",
          type: "string",
          default: '"none" | "sm" | "md" | "lg" | "xl" | "full"',
          description: "The border radius of the component",
        },
        {
          name: "gradientOverlay",
          type: "boolean",
          default: "true",
          description: "Whether to apply a gradient overlay",
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
  category: "Effects",
  examples: [
    {
      name: "Basic Blue Ripple",
      preview: (
        <DynamicRipple theme="blue" intensity={3} speed={3} className="p-6">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Water Ripple Effect</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">Move your cursor over this card to create ripples</p>
        </DynamicRipple>
      ),
      filename: "BasicRipple.tsx",
      code: `import { DynamicRipple } from "@/nyxui/components/DynamicRipple";
import { Droplets } from 'lucide-react';

export function BasicRipple() {
  return (
    <DynamicRipple theme="blue" intensity={3} speed={3} className="p-6">
      <div className="flex items-center gap-2">
        <Droplets className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Water Ripple Effect</h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Move your cursor over this card to create ripples
      </p>
    </DynamicRipple>
  );
}`,
    },
    {
      name: "High Intensity Purple Ripple",
      preview: (
        <DynamicRipple theme="purple" intensity={5} speed={2} className="p-6">
          <h3 className="text-lg font-semibold">High Intensity Ripple</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Maximum intensity with slower speed</p>
        </DynamicRipple>
      ),
      filename: "HighIntensityRipple.tsx",
      code: `import { DynamicRipple } from "@/nyxui/components/DynamicRipple";

export function HighIntensityRipple() {
  return (
    <DynamicRipple theme="purple" intensity={5} speed={2} className="p-6">
      <h3 className="text-lg font-semibold">High Intensity Ripple</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Maximum intensity with slower speed
      </p>
    </DynamicRipple>
  );
}`,
    },
    {
      name: "Fast Green Ripple",
      preview: (
        <DynamicRipple theme="green" intensity={2} speed={5} className="p-6">
          <h3 className="text-lg font-semibold">Fast Ripple</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Low intensity with maximum speed</p>
        </DynamicRipple>
      ),
      filename: "FastRipple.tsx",
      code: `import { DynamicRipple } from "@/nyxui/components/DynamicRipple";

export function FastRipple() {
  return (
    <DynamicRipple theme="green" intensity={2} speed={5} className="p-6">
      <h3 className="text-lg font-semibold">Fast Ripple</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Low intensity with maximum speed
      </p>
    </DynamicRipple>
  );
}`,
    },
    {
      name: "Circular Amber Ripple",
      preview: (
        <DynamicRipple theme="amber" rounded="full" className="p-6 aspect-square flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Circular Ripple</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">With rounded full style</p>
          </div>
        </DynamicRipple>
      ),
      filename: "CircularRipple.tsx",
      code: `import { DynamicRipple } from "@/nyxui/components/DynamicRipple";

export function CircularRipple() {
  return (
    <DynamicRipple theme="amber" rounded="full" className="p-6 aspect-square flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-lg font-semibold">Circular Ripple</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          With rounded full style
        </p>
      </div>
    </DynamicRipple>
  );
}`,
    },
    {
      name: "Auto-Animation Disabled",
      preview: (
        <DynamicRipple theme="rose" autoAnimate={false} className="p-6">
          <h3 className="text-lg font-semibold">Cursor-Only Ripple</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Only reacts to cursor movement, no automatic animation
          </p>
        </DynamicRipple>
      ),
      filename: "CursorOnlyRipple.tsx",
      code: `import { DynamicRipple } from "@/nyxui/components/DynamicRipple";

export function CursorOnlyRipple() {
  return (
    <DynamicRipple theme="rose" autoAnimate={false} className="p-6">
      <h3 className="text-lg font-semibold">Cursor-Only Ripple</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Only reacts to cursor movement, no automatic animation
      </p>
    </DynamicRipple>
  );
}`,
    },
  ],
};