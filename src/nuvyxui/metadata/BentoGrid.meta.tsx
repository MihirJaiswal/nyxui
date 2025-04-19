import React from "react";
import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { BentoGridDemo } from "@/nuvyxui/demos/BentoGridDemo";
import BentoGridSource from "!!raw-loader!@/nuvyxui/components/BentoGrid.tsx";
import BentoGridDemoSource from "!!raw-loader!@/nuvyxui/demos/BentoGridDemo.tsx";

export const bentoGridData: ComponentData = {
  name: "Bento Grid",
  description:
    "A versatile container component inspired by bento box designs, perfect for creating modern, visually appealing grid layouts.",
  preview: <BentoGridDemo />,
  usage: BentoGridDemoSource,
  componentCode: BentoGridSource,
  dependencies: [
    {
      name: "Framer Motion",
      description: "Library for animations and interactive UI elements.",
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
        npm: "npm install clsx",
        pnpm: "pnpm add clsx",
        yarn: "yarn add clsx",
        bun: "bun add clsx",
      },
    },
  ],
  props: [
    {
      name: "Bento Grid",
      items: [
        {
          name: "dark",
          type: "boolean",
          default: "false",
          description: "Enables dark mode styling for the component.",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Additional CSS classes to apply to the component.",
        },
        {
          name: "title",
          type: "React.ReactNode",
          default: '""',
          description: "Title content to be displayed in the component.",
        },
        {
          name: "description",
          type: "React.ReactNode",
          default: '""',
          description: "Description text to be displayed in the component.",
        },
        {
          name: "component",
          type: "React.ReactNode",
          default: "undefined",
          description:
            "The main content to be rendered inside the bento grid container.",
        },
        {
          name: "fade",
          type: '("top" | "bottom")[]',
          default: "[]",
          description:
            "Adds gradient fade effects to the specified edges of the component.",
        },
        {
          name: "height",
          type: "string",
          default: '"h-88"',
          description:
            "CSS height class for the component. Only applies when isFull is false.",
        },
        {
          name: "enableTitle",
          type: "boolean",
          default: "true",
          description: "Whether to display the title element.",
        },
        {
          name: "enableDescription",
          type: "boolean",
          default: "true",
          description: "Whether to display the description element.",
        },
        {
          name: "isFull",
          type: "boolean",
          default: "false",
          description:
            "When true, the component takes up full height and displays title/description as an overlay at the bottom.",
        },
      ],
    },
  ],

  category: "Layout",
  examples: [],
};
