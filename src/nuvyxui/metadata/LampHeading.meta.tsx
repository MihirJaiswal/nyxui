import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { LampHeading }  from "@/nuvyxui/components/LampHeading";
import { LampHeadingDemo } from "@/nuvyxui/demos/LampHeadingDemo";

import LampHeadingSource from '!!raw-loader!@/nuvyxui/components/LampHeading.tsx';
import LampHeadingDemoSource from '!!raw-loader!@/nuvyxui/demos/LampHeadingDemo.tsx';

export const lampHeadingData: ComponentData = {
  name: "lamp heading",
  description:
    "An elegant section heading with a customizable gradient underline and a subtle lamp-like glow effect and nice little animation. Ideal for creating visually engaging section dividers on dark backgrounds.",
  preview: <LampHeadingDemo />,
  usage: LampHeadingDemoSource,
  componentCode: LampHeadingSource,
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
      name: "Gradient Heading",
      items: [
        {
          name: "text",
          type: "string",
          default: '""',
          description:
            "The text content of the heading.",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description:
            "Additional CSS classes to apply for styling the heading, including text color, font size, and weight.",
        },
        {
          name: "gradientColors",
          type: "object",
          default: '{ from: "#ff3366", to: "#338ef7" }',
          description:
            "The gradient colors used for the underline. Object should include 'from' and 'to' color hex values.",
        },
        {
          name: "lineHeight",
          type: "number",
          default: "2",
          description:
            "The height of the underline in pixels.",
        },
        {
          name: "glowIntensity",
          type: "number",
          default: "0.7",
          description:
            "The intensity of the glow effect (0-1).",
        },
        {
          name: "glowSize",
          type: "number",
          default: "20",
          description:
            "The size of the glow effect in pixels.",
        },
      ],
    },
  ],
  
  category: "Typography",
  examples: [
    {
      name: "AI Features Heading",
      preview: (
        <div className="p-8">
          <LampHeading
            text="AI Features"
            className="text-2xl font-bold"
            gradientColors={{ from: "#ff3366", to: "#338ef7" }}
            lineHeight={2.5}
            glowIntensity={0.8}
            glowSize={20}
          />
        </div>
      ),
      filename: "AIFeaturesHeading.tsx",
      code: `import { LampHeading } from "@/nuvyxui/components/LampHeading";
      
export function AIFeaturesHeading() {
  return (
    <div className="p-8">
      <LampHeading
        text="AI Features"
        className="text-2xl font-bold"
        gradientColors={{ from: "#ff3366", to: "#338ef7" }}
        lineHeight={2.5}
        glowIntensity={0.8}
        glowSize={20}
      />
    </div>
  );
}`,
    },
    {
      name: "Analytics Dashboard Heading",
      preview: (
        <div className="p-8">
          <LampHeading
            text="Analytics Dashboard"
            className="text-xl font-medium"
            gradientColors={{ from: "#00c6ff", to: "#0072ff" }}
            lineHeight={2}
            glowIntensity={0.7}
            glowSize={15}
          />
        </div>
      ),
      filename: "AnalyticsDashboardHeading.tsx",
      code: `import { LampHeading } from "@/nuvyxui/components/LampHeading";
      
export function AnalyticsDashboardHeading() {
  return (
    <div className="p-8">
      <LampHeading
        text="Analytics Dashboard"
        className="text-xl font-medium"
        gradientColors={{ from: "#00c6ff", to: "#0072ff" }}
        lineHeight={2}
        glowIntensity={0.7}
        glowSize={15}
      />
    </div>
  );
}`,
    },
    {
      name: "Energy Performance Heading",
      preview: (
        <div className="p-8">
          <LampHeading
            text="Energy Performance"
            className="text-2xl"
            gradientColors={{ from: "#11998e", to: "#38ef7d" }}
            lineHeight={2.5}
            glowIntensity={0.8}
            glowSize={25}
          />
        </div>
      ),
      filename: "EnergyPerformanceHeading.tsx",
      code: `import { LampHeading } from "@/nuvyxui/components/LampHeading";
      
export function EnergyPerformanceHeading() {
  return (
    <div className="p-8">
      <LampHeading
        text="Energy Performance"
        className="text-2xl"
        gradientColors={{ from: "#11998e", to: "#38ef7d" }}
        lineHeight={2.5}
        glowIntensity={0.8}
        glowSize={25}
      />
    </div>
  );
}`,
    },
    {
      name: "Neural Network Training Heading",
      preview: (
        <div className="p-8">
          <LampHeading
            text="Neural Network Training"
            className="text-xl font-semibold"
            gradientColors={{ from: "#8E2DE2", to: "#4A00E0" }}
            lineHeight={2}
            glowIntensity={0.9}
            glowSize={20}
          />
        </div>
      ),
      filename: "NeuralNetworkTrainingHeading.tsx",
      code: `import { LampHeading } from "@/nuvyxui/components/LampHeading";
      
export function NeuralNetworkTrainingHeading() {
  return (
    <div className="p-8">
      <LampHeading
        text="Neural Network Training"
        className="text-xl font-semibold"
        gradientColors={{ from: "#8E2DE2", to: "#4A00E0" }}
        lineHeight={2}
        glowIntensity={0.9}
        glowSize={20}
      />
    </div>
  );
}`,
    },
  ]
};