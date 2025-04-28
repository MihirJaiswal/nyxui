import React from "react";
import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import InteractiveKeyboardDemo from "@/nuvyxui/demos/KeyboardDemo";

import InteractiveKeyboardSource from "!!raw-loader!@/nuvyxui/components/Keyboard.tsx";
import InteractiveKeyboardDemoSource from "!!raw-loader!@/nuvyxui/demos/KeyboardDemo.tsx";

export const interactiveKeyboardData: ComponentData = {
  name: "Keyboard",
  description:
    "A customizable interactive keyboard component with various themes, layouts, and animation options.",
  preview: <InteractiveKeyboardDemo />,
  usage: InteractiveKeyboardDemoSource,
  componentCode: InteractiveKeyboardSource,
  dependencies: [
    {
        name: "Lucide React",
        description: "Icon library used for terminal icons.",
        install: {
          npm: "npm install lucide-react",
          yarn: "yarn add lucide-react",
          pnpm: "pnpm install lucide-react",
          bun: "bun install lucide-react",
        },
    }
  ],
  new: true,
  props: [
    {
      name: "Interactive Keyboard",
      items: [
        {
          name: "layout",
          type: "string",
          default: "standard",
          description: "Keyboard layout (standard or compact)",
        },
        {
          name: "showFunctionKeys",
          type: "boolean",
          default: "true",
          description: "Show function keys (F1-F12) row",
        },
        {
          name: "showNavigationCluster",
          type: "boolean",
          default: "true",
          description: "Show navigation key cluster",
        },
        {
          name: "activeKeys",
          type: "string[]",
          default: "[]",
          description: "Array of key codes to highlight as active",
        },
        {
          name: "activeKeyGlowColor",
          type: "string",
          default: "#6366f1",
          description: "Glow color for active keys",
        },
        {
          name: "activeKeyGlowIntensity",
          type: "number",
          default: "0.8",
          description: "Intensity of glow effect for active keys (0-1)",
        },
        {
          name: "theme",
          type: "string",
          default: "cyberpunk",
          description: "Keyboard theme (cyberpunk, minimal, retro, mechanical, neon, pastel)",
        },
        {
          name: "keyColor",
          type: "string",
          default: "#2a2a2a",
          description: "Base color for keyboard keys",
        },
        {
          name: "keyTextColor",
          type: "string",
          default: "#ffffff",
          description: "Text color for keyboard keys",
        },
        {
          name: "accentColor",
          type: "string",
          default: "#6366f1",
          description: "Accent color for special keys and highlights",
        },
        {
          name: "keyPressedColor",
          type: "string",
          default: "#333333",
          description: "Color for pressed keys",
        },
        {
          name: "keyPressAnimationDuration",
          type: "number",
          default: "150",
          description: "Duration of key press animation in milliseconds",
        },
        {
          name: "onKeyPress",
          type: "function",
          default: "() => {}",
          description: "Callback function when a key is pressed (code: string, key?: string) => void",
        },
        {
          name: "onKeyRelease",
          type: "function",
          default: "() => {}",
          description: "Callback function when a key is released (code: string, key?: string) => void",
        },
        {
          name: "className",
          type: "string",
          default: "",
          description: "Additional CSS classes to apply",
        },
        {
          name: "allowPhysicalKeyboard",
          type: "boolean",
          default: "true",
          description: "Allow physical keyboard integration",
        },
        {
          name: "perspective",
          type: "number",
          default: "1000",
          description: "CSS perspective value for 3D effect",
        },
        {
          name: "rotateX",
          type: "number",
          default: "10",
          description: "X-axis rotation angle in degrees",
        },
      ],
    },
  ],
  category: "Interactive tools",
  tags: ["Mock", "Interactive"],
  examples: []
};