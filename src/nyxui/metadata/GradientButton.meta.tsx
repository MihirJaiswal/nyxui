import React from "react";
import type { ComponentData } from "./ComponentInterfaces";
import { GradientButton } from "@/nyxui/components/GradientButton";
import { GradientButtonDemo } from "@/nyxui/demos/GradientButtonDemo";
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/GradientButton.tsx");
const GradientButtonSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/GradientButtonDemo.tsx");
const GradientButtonDemoSource = fs.readFileSync(demoPath, "utf8");

export const gradientButtonData: ComponentData = {
  name: "Gradient Button",
  description: "Modern buttons with stunning gradient effects, animations and customizable themes.",
  preview: <GradientButtonDemo />,
  usage: GradientButtonDemoSource,
  componentCode: GradientButtonSource,
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
    },
  ],
  props: [
    {
      name: "Gradient Button",
      items: [
        {
          name: "variant",
          type: "string",
          default: '"pulse" | "glow" | "sweep" | "shine" | "outline"',
          description: "Button animation and style variant",
        },
        {
          name: "size",
          type: "string",
          default: '"xs" | "sm" | "md" | "lg" | "xl"',
          description: "Button size",
        },
        {
          name: "theme",
          type: "string",
          default: '"sunset" | "ocean" | "forest" | "neon" | "berry" | "custom"',
          description: "Pre-defined gradient theme",
        },
        {
          name: "customGradient",
          type: "string",
          default: "undefined",
          description: "Custom gradient CSS for use with theme='custom'",
        },
        {
          name: "rounded",
          type: "string",
          default: '"md" | "lg" | "full" | "none"',
          description: "Button corner radius",
        },
        {
          name: "shadow",
          type: "boolean",
          default: "true",
          description: "Whether to show drop shadow",
        },
        {
          name: "hoverEffect",
          type: "string",
          default: '"scale" | "brightness" | "contrast" | "none"',
          description: "Additional hover effect to apply",
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
  category: "Buttons",
  examples: [
    {
      name: "Pulse Effect Button",
      preview: (
        <GradientButton variant="pulse" theme="sunset">
          Pulse Effect
        </GradientButton>
      ),
      filename: "GradientButton.tsx",
      code: `import { GradientButton } from "@/nyxui/components/GradientButton";

export function PulseButton() {
  return (
    <GradientButton variant="pulse" theme="sunset">
      Pulse Effect
    </GradientButton>
  );
}`,
    },
    {
      name: "Glow Effect Button",
      preview: (
        <GradientButton variant="glow" theme="ocean" size="lg">
          Glow Effect
        </GradientButton>
      ),
      filename: "GradientButton.tsx",
      code: `import { GradientButton } from "@/nyxui/components/GradientButton";

export function GlowButton() {
  return (
    <GradientButton variant="glow" theme="ocean" size="lg">
      Glow Effect
    </GradientButton>
  );
}`,
    },
    {
      name: "Shine Effect Button",
      preview: (
        <GradientButton variant="shine" theme="forest" rounded="full">
          Shine Effect
        </GradientButton>
      ),
      filename: "GradientButton.tsx",
      code: `import { GradientButton } from "@/nyxui/components/GradientButton";

export function ShineButton() {
  return (
    <GradientButton variant="shine" theme="forest" rounded="full">
      Shine Effect
    </GradientButton>
  );
}`,
    },
    {
      name: "Sweep Effect Button",
      preview: (
        <GradientButton variant="sweep" theme="neon" size="sm">
          Sweep Effect
        </GradientButton>
      ),
      filename: "GradientButton.tsx",
      code: `import { GradientButton } from "@/nyxui/components/GradientButton";

export function SweepButton() {
  return (
    <GradientButton variant="sweep" theme="neon" size="sm">
      Sweep Effect
    </GradientButton>
  );
}`,
    },
    {
      name: "Outline Effect Button",
      preview: (
        <GradientButton variant="outline" theme="berry" hoverEffect="scale">
          Outline Effect
        </GradientButton>
      ),
      filename: "GradientButton.tsx",
      code: `import { GradientButton } from "@/nyxui/components/GradientButton";

export function OutlineButton() {
  return (
    <GradientButton variant="outline" theme="berry" hoverEffect="scale">
      Outline Effect
    </GradientButton>
  );
}`,
    },
    {
      name: "Custom Gradient Button",
      preview: (
        <GradientButton 
          variant="glow" 
          theme="custom" 
          customGradient="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
          Custom Gradient
        </GradientButton>
      ),
      filename: "GradientButton.tsx",
      code: `import { GradientButton } from "@/nyxui/components/GradientButton";

export function CustomGradientButton() {
  return (
    <GradientButton 
      variant="glow" 
      theme="custom" 
      customGradient="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
      Custom Gradient
    </GradientButton>
  );
}`,
    },
  ],
};