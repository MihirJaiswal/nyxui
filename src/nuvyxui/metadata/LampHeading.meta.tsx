import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { LampHeadingDemo } from "@/nuvyxui/demos/LampHeadingDemo";

import LampHeadingSource from "!!raw-loader!@/nuvyxui/components/LampHeading.tsx";
import LampHeadingDemoSource from "!!raw-loader!@/nuvyxui/demos/LampHeadingDemo.tsx";

export const lampHeadingData: ComponentData = {
  name: "Lamp heading",
  description:
    "An elegant section heading with a customizable gradient underline and a subtle lamp-like glow effect and nice little animation.",
  preview: <LampHeadingDemo />,
  usage: LampHeadingDemoSource,
  componentCode: LampHeadingSource,
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
      name: "Gradient Heading",
      items: [
        {
          name: "text",
          type: "string",
          default: '""',
          description: "The text content of the heading.",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description:
            "Additional CSS classes to apply for styling the heading, including text color, font size, and weight.",
        },
        {
          name: "gradientColors",
          type: "object",
          default: '{ from: "#ff3366", to: "#338ef7" }',
          description:
            "The gradient colors used for the underline. Object should include 'from' and 'to' color hex values.",
        },
        {
          name: "lineHeight",
          type: "number",
          default: "2",
          description: "The height of the underline in pixels.",
        },
        {
          name: "glowIntensity",
          type: "number",
          default: "0.7",
          description: "The intensity of the glow effect (0-1).",
        },
        {
          name: "glowSize",
          type: "number",
          default: "20",
          description: "The size of the glow effect in pixels.",
        },
        {
          name: "direction",
          type: "string",
          default: '"below"',
          description: "The direction of the glow effect (above or below).",
        },
      ],
    },
  ],

  category: "Typography",
  tags: ["Typography", "Effects"],
  examples: []
};
