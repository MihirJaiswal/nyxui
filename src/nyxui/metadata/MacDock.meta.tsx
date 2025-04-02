import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import { MacDockDemo } from "@/nyxui/demos/MacDockDemo"
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/MacDock.tsx");
const MacDockSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/MacDockDemo.tsx");
const MacDockDemoSource = fs.readFileSync(demoPath, "utf8");

export const macDockData: ComponentData = {
  name: "Mac Dock",
  description:
    "A sleek, animated dock component inspired by macOS that provides an interactive app launcher experience. Features include icon zooming on hover, tooltips, selection indicators, and customizable app icons with animation effects.",
  preview: <MacDockDemo />,
  usage: MacDockDemoSource,
  componentCode: MacDockSource,
  dependencies: [
    {
      name: "Framer Motion",
      description: "Animation library for React",
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
      name: "MacDock",
      items: [
        {
          name: "apps",
          type: "AppIcon[]",
          default: "[]",
          description: "Array of app icons to display in the dock",
          subProps: [
            {
                name: "id",
                type: "string",
                default: "required",
                description: "Unique identifier for each app icon."
              },
              {
                name: "name",
                type: "string",
                default: "required",
                description: "Display name of the app that appears in the tooltip."
              },
              {
                name: "iconSrc",
                type: "string",
                default: "required",
                description: "Source URL for the app icon image."
              },
              {
                name: "isActive",
                type: "boolean",
                default: "false",
                description: "When true, displays a white dot beneath the icon indicating it's active."
              },
              {
                name: "isSeparator",
                type: "boolean",
                default: "false",
                description: "When true, renders a vertical divider line instead of an icon."
              },
              {
                name: "onClick",
                type: "() => void",
                default: "undefined",
                description: "Callback function that executes when the icon is clicked."
              },
              {
                name: "children",
                type: "ReactNode",
                default: "undefined",
                description: "Optional content to render inside the app icon when it's in the animated state."
              }
          ]
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes to apply to the dock container",
        },
      ],
    },
    {
      name: "AppIcon (Interface)",
      items: [
        {
          name: "id",
          type: "string",
          default: "required",
          description: "Unique identifier for the app icon",
        },
        {
          name: "name",
          type: "string",
          default: "required",
          description: "Name of the app displayed in the tooltip",
        },
        {
          name: "iconSrc",
          type: "string",
          default: "required",
          description: "URL to the icon image",
        },
        {
          name: "isActive",
          type: "boolean",
          default: "false",
          description: "Whether the app is currently active",
        },
        {
          name: "isSeparator",
          type: "boolean",
          default: "false",
          description: "Whether this item should be rendered as a separator instead of an icon",
        },
        {
          name: "onClick",
          type: "() => void",
          default: "undefined",
          description: "Function to execute when the icon is clicked",
        },
        {
          name: "children",
          type: "ReactNode",
          default: "undefined",
          description: "Optional content to display when the icon is active/selected",
        },
      ],
    },
  ],
  category: "Navigation",
  examples: []
}