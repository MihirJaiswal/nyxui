import type { ComponentData } from "./ComponentInterfaces"
import DrawingCanvas from "@/nyxui/components/DrawingCanvas"
import DrawingCanvasDemo from "@/nyxui/demos/DrawingCanvasDemo"
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/DrawingCanvas.tsx");
const DrawingCanvasSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/DrawingCanvasDemo.tsx");
const DrawingCanvasDemoSource = fs.readFileSync(demoPath, "utf8");

export const drawingCanvasData: ComponentData = {
  name: "Drawing Canvas",
  description:
    "A customizable drawing canvas component with paint-like interface. Perfect for sketching, drawing tools, annotations, and interactive whiteboard applications. Features include brush and eraser tools, customizable color palette, and save functionality.",
  preview: <DrawingCanvasDemo />,
  usage: DrawingCanvasDemoSource,
  componentCode: DrawingCanvasSource,
  dependencies: [
    {
      name: "shadcn/ui Button",
      description: "UI component library used for the buttons and controls",
      install: {
        npm: "npx shadcn-ui@latest add button",
        pnpm: "pnpm dlx shadcn-ui@latest add button",
        yarn: "yarn dlx shadcn-ui@latest add button",
        bun: "bunx shadcn-ui@latest add button",
      },
    },
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
    {
      name: "lucide-react",
      description: "Icon library used for the brush, eraser, and other UI elements",
      install: {
        npm: "npm install lucide-react",
        pnpm: "pnpm add lucide-react",
        yarn: "yarn add lucide-react",
        bun: "bun add lucide-react",
      },
    },
  ],
  props: [
    {
      name: "Drawing Canvas",
      items: [
        {
          name: "width",
          type: "number",
          default: "800",
          description: "Width of the drawing canvas container in pixels",
        },
        {
          name: "height",
          type: "number",
          default: "500",
          description: "Height of the drawing canvas area in pixels",
        },
        {
          name: "initialBackgroundColor",
          type: "string",
          default: "'#FFFFFF'",
          description: "Initial background color of the canvas",
        },
        {
          name: "canvasWidth",
          type: "number",
          default: "2000",
          description: "Width of the actual canvas element (determines draw area)",
        },
        {
          name: "canvasHeight",
          type: "number",
          default: "2000",
          description: "Height of the actual canvas element (determines draw area)",
        },
        {
          name: "colorPalette",
          type: "string[]",
          default: "DEFAULT_COLORS",
          description: "Array of hex color codes for the color palette",
        },
        {
          name: "showWindowControls",
          type: "boolean",
          default: "true",
          description: "Whether to show the window-like controls (minimize, maximize, close)",
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
          name: "statusMessage",
          type: "string",
          default: "'For Help, click Help Topics on the Help Menu.'",
          description: "Status message displayed at the bottom of the component",
        },
        {
          name: "draggable",
          type: "boolean",
          default: "true",
          description: "Whether the canvas window can be dragged around",
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
      ],
    },
  ],
  category: "Input",
  examples: [],
}