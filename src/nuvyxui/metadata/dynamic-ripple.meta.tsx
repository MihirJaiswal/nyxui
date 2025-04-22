import React from "react";
import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { DynamicRippleDemo } from "@/nuvyxui/demos/DynamicRippleDemo";

import DynamicRippleSource from "!!raw-loader!@/nuvyxui/components/DynamicRipple.tsx";
import DynamicRippleDemoSource from "!!raw-loader!@/nuvyxui/demos/DynamicRippleDemo.tsx";

export const dynamicRippleData: ComponentData = {
  name: "Dynamic Ripple",
  description:
    "A fluid, water ripple effect that reacts to cursor movement or touch. Can be used in cards, buttons, or section dividers.",
  preview: <DynamicRippleDemo />,
  usage: DynamicRippleDemoSource,
  componentCode: DynamicRippleSource,
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
      name: "Dynamic Ripple",
      items: [
        {
          name: "theme",
          type: "string",
          default: '"blue"',
          description:
            'The color theme of the ripple effect. Possible values: "blue", "purple", "green", "amber", "rose", "custom".',
        },
        {
          name: "customColors",
          type: "object",
          default: "undefined",
          description:
            'Custom colors for the ripple when theme is set to "custom". The object should include properties: primary and secondary.',
        },
        {
          name: "intensity",
          type: "number",
          default: "3",
          description: "The intensity of the ripple effect (1-5).",
        },
        {
          name: "speed",
          type: "number",
          default: "3",
          description: "The speed of the ripple animation (1-5).",
        },
        {
          name: "reactToCursor",
          type: "boolean",
          default: "true",
          description:
            "Whether to enable the ripple effect on cursor movement.",
        },
        {
          name: "autoAnimate",
          type: "boolean",
          default: "true",
          description: "Whether to enable the automatic ripple animation.",
        },
        {
          name: "rounded",
          type: "string",
          default: '"lg"',
          description:
            'The border radius of the component. Possible values: "none", "sm", "md", "lg", "xl", "full".',
        },
        {
          name: "gradientOverlay",
          type: "boolean",
          default: "true",
          description: "Whether to apply a gradient overlay.",
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
          description: "Content to be rendered inside the ripple component.",
        },
      ],
    },
  ],

  category: "Effects",
  tags: ["Effects", "Interactive"],
  examples: []
};
