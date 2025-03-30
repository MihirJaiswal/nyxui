import React from "react";
import type { ComponentData } from "./ComponentInterfaces";
import { GradientButton } from "@/nyxui/components/GradientButton";
import { GradientButtonDemo } from "@/nyxui/demos/GradientButtonDemo";
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/GradientButton.tsx");
const GradientButtonSource = fs.readFileSync(componentPath, "utf8");;

export const gradientButtonData: ComponentData = {
  name: "Gradient Button",
  description: "Modern buttons with gradient backgrounds and hover effects.",
  preview: <GradientButtonDemo />,
  usage: `import { GradientButton } from "@/nyxui/components/GradientButton";

export function GradientButtonDemo() {
  return (
    <>
      <GradientButton variant="animated">Animated Gradient</GradientButton>
      <GradientButton variant="fill">Gradient Fill</GradientButton>
      <GradientButton variant="slide-up">Slide Up Effect</GradientButton>
    </>
  );
}`,
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
    {
      name: "clsx",
      description: "A utility for constructing className strings conditionally.",
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
      name: "Gradient Button",
      items: [
        {
          name: "variant",
          type: "string",
          default: '"animated" | "fill" | "slide-up"',
          description: "Button style variant",
        },
        {
          name: "size",
          type: "string",
          default: '"default" | "sm" | "lg"',
          description: "Button size",
        },
        {
          name: "gradientFrom",
          type: "string",
          default: '"pink-500"',
          description: "Starting gradient color",
        },
        {
          name: "gradientTo",
          type: "string",
          default: '"violet-600"',
          description: "Ending gradient color",
        },
      ],
    },
  ],
  category: "Buttons",
  examples: [
    {
      name: "Animated Gradient Button",
      preview: (
        <GradientButton variant="animated">
          Animated Gradient
        </GradientButton>
      ),
      filename: "GradientButton.tsx",
      code: `import { GradientButton } from "@/nyxui/components/GradientButton";

export function AnimatedGradientButton() {
  return (
    <GradientButton variant="animated">
      Animated Gradient
    </GradientButton>
  );
}`,
    },
    {
      name: "Slide Up Effect Button",
      preview: (
        <GradientButton variant="slide-up">Slide Up Effect</GradientButton>
      ),
      filename: "GradientButton.tsx",
      code: `import { GradientButton } from "@/nyxui/components/GradientButton";

export function SlideUpButton() {
  return (
    <GradientButton variant="slide-up">
      Slide Up Effect
    </GradientButton>
  );
}`,
    },
  ],
};
