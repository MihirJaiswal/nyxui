import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { LiquidMetalButtonDemo } from "@/nuvyxui/demos/LiquidMetalButtonDemo";
import LiquidMetalButtonSource from "!!raw-loader!@/nuvyxui/components/LiquidMetalButton.tsx";
import LiquidMetalButtonDemoSource from "!!raw-loader!@/nuvyxui/demos/LiquidMetalButtonDemo.tsx";

export const liquidMetalButtonData: ComponentData = {
  name: "Liquid Metal Button",
  description:
    "Buttons that behave like mercury when clicked. A fluid effect that reacts to the mouse pointer.",
  preview: <LiquidMetalButtonDemo />,
  usage: LiquidMetalButtonDemoSource,
  componentCode: LiquidMetalButtonSource,
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
  tags: ["Buttons", "Interactive"],
  props: [
    {
      name: "Liquid Metal Button",
      items: [
        {
          name: "variant",
          type: "string",
          default: '"default"',
          description:
            'The variant of the button. Possible values: "default", "outline", "ghost", "mercury", "ripple", "gradient".',
        },
        {
          name: "size",
          type: "string",
          default: '"md"',
          description:
            'The size of the button. Possible values: "xs", "sm", "md", "lg", "xl", "2xl".',
        },
        {
          name: "theme",
          type: "string",
          default: '"silver"',
          description:
            'The color theme of the button. Possible values: "silver", "gold", "copper", "mercury", "steel", "obsidian", "emerald", "ruby", "sapphire", "custom".',
        },
        {
          name: "customColors",
          type: "object",
          default: "undefined",
          description:
            'Custom colors for the button when theme is set to "custom". The object should include properties: base, highlight, shadow, and optionally text, border, and glow.',
        },
        {
          name: "intensity",
          type: "number",
          default: "3",
          description: "The intensity of the liquid effect (1-5).",
        },
        {
          name: "magnetic",
          type: "boolean",
          default: "true",
          description: "Whether to enable the magnetic pull effect.",
        },
        {
          name: "clickEffect",
          type: "boolean",
          default: "true",
          description: "Whether to enable the click animation.",
        },
        {
          name: "asChild",
          type: "boolean",
          default: "false",
          description: "Whether to render the button as a child element.",
        },
        {
          name: "hoverAnimation",
          type: "boolean",
          default: "true",
          description: "Whether to enable hover animation.",
        },
        {
          name: "textured",
          type: "boolean",
          default: "false",
          description: "Whether to apply a textured effect.",
        },
        {
          name: "icon",
          type: "React.ReactNode",
          default: "undefined",
          description: "Icon to be displayed before the children.",
        },
        {
          name: "iconAfter",
          type: "React.ReactNode",
          default: "undefined",
          description: "Icon to be displayed after the children.",
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
          description: "Content of the button.",
        }
      ],
    },
  ],

  category: "Buttons",
  examples: [],
};
