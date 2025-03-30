import type { ComponentData } from "./ComponentInterfaces"
import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth"
import { GlassmorphismDepthDemo } from "@/nyxui/demos/GlassmorphismDepthDemo"
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/GlassmorphismDepth.tsx");
const GlassmorphismDepthSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/GlassmorphismDepthDemo.tsx");
const GlassmorphismDepthDemoSource = fs.readFileSync(demoPath, "utf8");

export const glassmorphismDepthData: ComponentData = {
  name: "Glassmorphism Depth",
  description:
    "A layered, glassy depth effect component that changes perspective when hovered. Great for dashboards and analytics.",
  preview: <GlassmorphismDepthDemo />,
  usage: GlassmorphismDepthDemoSource,
  componentCode: GlassmorphismDepthSource,
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
      name: "Glassmorphism Depth",
      items: [
        {
          name: "depth",
          type: "1 | 2 | 3 | 4 | 5",
          default: "3",
          description: "The depth level of the glassmorphism effect",
        },
        {
          name: "theme",
          type: "string",
          default: '"light" | "dark" | "blue" | "purple" | "teal"',
          description: "The color theme of the glassmorphism effect",
        },
        {
          name: "tiltEffect",
          type: "boolean",
          default: "true",
          description: "Whether to enable the tilt effect on hover",
        },
        {
          name: "tiltMax",
          type: "number",
          default: "10",
          description: "The maximum tilt angle in degrees",
        },
        {
          name: "hoverDepthChange",
          type: "boolean",
          default: "true",
          description: "Whether to enable the depth change on hover",
        },
        {
          name: "rounded",
          type: "string",
          default: '"none" | "sm" | "md" | "lg" | "xl" | "full"',
          description: "The border radius of the component",
        },
        {
          name: "shadow",
          type: "boolean",
          default: "true",
          description: "Whether to show a shadow effect",
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
      name: "Light Theme",
      preview: (
        <GlassmorphismDepth theme="light" depth={3}>
          <h3 className="text-lg font-semibold">Light Theme</h3>
          <p className="text-sm opacity-70">Default glass effect</p>
        </GlassmorphismDepth>
      ),
      filename: "LightTheme.tsx",
      code: `import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth";

export function LightTheme() {
  return (
    <GlassmorphismDepth theme="light" depth={3}>
      <h3 className="text-lg font-semibold">Light Theme</h3>
      <p className="text-sm opacity-70">Default glass effect</p>
    </GlassmorphismDepth>
  );
}`,
    },
    {
      name: "Dark Theme",
      preview: (
        <GlassmorphismDepth theme="dark" depth={4}>
          <h3 className="text-lg font-semibold">Dark Theme</h3>
          <p className="text-sm opacity-70">Deep glass effect</p>
        </GlassmorphismDepth>
      ),
      filename: "DarkTheme.tsx",
      code: `import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth";

export function DarkTheme() {
  return (
    <GlassmorphismDepth theme="dark" depth={4}>
      <h3 className="text-lg font-semibold">Dark Theme</h3>
      <p className="text-sm opacity-70">Deep glass effect</p>
    </GlassmorphismDepth>
  );
}`,
    },
    {
      name: "Blue Theme with Enhanced Tilt",
      preview: (
        <GlassmorphismDepth theme="blue" depth={3} tiltMax={15}>
          <h3 className="text-lg font-semibold">Enhanced Tilt</h3>
          <p className="text-sm opacity-70">With blue theme</p>
        </GlassmorphismDepth>
      ),
      filename: "EnhancedTilt.tsx",
      code: `import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth";

export function EnhancedTilt() {
  return (
    <GlassmorphismDepth theme="blue" depth={3} tiltMax={15}>
      <h3 className="text-lg font-semibold">Enhanced Tilt</h3>
      <p className="text-sm opacity-70">With blue theme</p>
    </GlassmorphismDepth>
  );
}`,
    },
    {
      name: "No Tilt Effect",
      preview: (
        <GlassmorphismDepth theme="purple" depth={2} tiltEffect={false}>
          <h3 className="text-lg font-semibold">No Tilt</h3>
          <p className="text-sm opacity-70">Only depth change on hover</p>
        </GlassmorphismDepth>
      ),
      filename: "NoTilt.tsx",
      code: `import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth";

export function NoTilt() {
  return (
    <GlassmorphismDepth theme="purple" depth={2} tiltEffect={false}>
      <h3 className="text-lg font-semibold">No Tilt</h3>
      <p className="text-sm opacity-70">Only depth change on hover</p>
    </GlassmorphismDepth>
  );
}`,
    },
    {
      name: "Rounded Full",
      preview: (
        <GlassmorphismDepth theme="teal" depth={3} rounded="full">
          <h3 className="text-lg font-semibold">Rounded Full</h3>
          <p className="text-sm opacity-70">Circular glass effect</p>
        </GlassmorphismDepth>
      ),
      filename: "RoundedFull.tsx",
      code: `import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth";

export function RoundedFull() {
  return (
    <GlassmorphismDepth theme="teal" depth={3} rounded="full">
      <h3 className="text-lg font-semibold">Rounded Full</h3>
      <p className="text-sm opacity-70">Circular glass effect</p>
    </GlassmorphismDepth>
  );
}`,
    },
  ],
}

