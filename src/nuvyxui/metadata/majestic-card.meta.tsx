import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { MajesticCardDemo } from "@/nuvyxui/demos/MajesticCardDemo";

import MajesticCardSource from "!!raw-loader!@/nuvyxui/components/MajesticCard.tsx";
import MajesticCardDemoSource from "!!raw-loader!@/nuvyxui/demos/MajesticCardDemo.tsx";

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
            'The animation variant. Possible values: "parallax", "tilt", "float", "magnetic", "layered", "morph", "breathe", "glow", "wave".',
        },
        {
          name: "intensity",
          type: "number",
          default: "3",
          description: "The intensity of the effect (1-5).",
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
            "Custom colors object with properties: background, and optionally border, shadow, and glow.",
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
          description: "Whether to show a shadow effect.",
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
          description: "Whether to show a border.",
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
          name: "confettiEffect",
          type: "boolean",
          default: "false",
          description: "Adds a confetti animation effect on hover.",
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
          description: "Applies a backdrop blur effect to the background.",
        },
        {
          name: "layerCount",
          type: "number",
          default: "3",
          description: "Number of layers for layered variant (1-5).",
        },
        {
          name: "layerSeparation",
          type: "number",
          default: "2",
          description: "Distance between layers for layered variant (1-5).",
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
  examples: [],
};
