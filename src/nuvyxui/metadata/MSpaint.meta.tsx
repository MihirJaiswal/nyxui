import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import MSpaintDemo from "@/nuvyxui/demos/MSpaintDemo";

import MSpaintSource from "!!raw-loader!@/nuvyxui/components/MSpaint.tsx";
import MSpaintDemoSource from "!!raw-loader!@/nuvyxui/demos/MSpaintDemo.tsx";

export const mspaintData: ComponentData = {
  name: "MS Paint",
  description:
    "A customizable drawing canvas component with paint-like interface.",
  preview: <MSpaintDemo />,
  usage: MSpaintDemoSource,
  componentCode: MSpaintSource,
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
    },
  ],
  props: [
    {
      name: "MS Paint",
      items: [
        {
          name: "Width",
          type: "number",
          default: "800",
          description: "Width of the drawing canvas container in pixels",
        },
        {
          name: "Height",
          type: "number",
          default: "500",
          description: "Height of the drawing canvas area in pixels",
        },
        {
          name: "canvasWidth",
          type: "number",
          default: "2000",
          description:
            "Width of the actual canvas element (determines draw area)",
        },
        {
          name: "canvasHeight",
          type: "number",
          default: "2000",
          description:
            "Height of the actual canvas element (determines draw area)",
        },
        {
          name: "colorPalette",
          type: "string[]",
          default: "DEFAULT_COLORS",
          description: "Array of hex color codes for the color palette",
        },
        {
          name: "title",
          type: "string",
          default: "'untitled - Paint'",
          description: "Title text displayed in the window header",
        },
        {
          name: "menuItems",
          type: "string[]",
          default: "['File', 'Edit', 'View', 'Image', 'Options', 'Help']",
          description: "Array of menu item names to display in the menu bar",
        },
        {
          name: "className",
          type: "string",
          default: "''",
          description: "Additional CSS classes to apply to the container",
        },
        {
          name: "style",
          type: "React.CSSProperties",
          default: "{}",
          description: "Additional inline styles to apply to the container",
        },
        {
          name: "onSave",
          type: "(canvas: HTMLCanvasElement) => void",
          default: "undefined",
          description: "Callback function when the save button is clicked",
        },
        {
          name: "brushSize",
          type: "number",
          default: "2",
          description: "Size of the brush used for drawing",
        },
        {
          name: "eraseSize",
          type: "number",
          default: "20",
          description: "Size of the eraser used for erasing",
        }
      ],
    }
  ],
  category: "Interactive tools",
  tags: ["Interactive"],
  examples: [],
};
