import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { AnimatedGradientBg } from "@/nuvyxui/components/AnimatedGradientBg";
import { AnimatedGradientBgDemo } from "@/nuvyxui/demos/AnimatedGradientBgDemo";

import AnimatedGradientBgSource from "!!raw-loader!@/nuvyxui/components/AnimatedGradientBg.tsx";
import AnimatedGradientBgDemoSource from "!!raw-loader!@/nuvyxui/demos/AnimatedGradientBgDemo.tsx";

export const animatedGradientBgData: ComponentData = {
  name: "Animated Gradient Background",
  description:
    "A dynamic animated gradient background component that supports various gradient patterns.",
  preview: <AnimatedGradientBgDemo />,
  usage: AnimatedGradientBgDemoSource,
  componentCode: AnimatedGradientBgSource,
  dependencies: [
    {
      name: "Framer Motion + Utility Functions",
      description: "Framer Motion + Utility functions for conditional class name merging.",
      install: {
        npm: "npm install framer-motion clsx tailwind-merge",
        pnpm: "pnpm add framer-motion clsx tailwind-merge",
        yarn: "yarn add framer-motion clsx tailwind-merge",
        bun: "bun add framer-motion clsx tailwind-merge",
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
  tags: [ "Background", "Animation" ],
  props: [
    {
      name: "Animated Gradient Background",
      items: [
        {
          name: "children",
          type: "React.ReactNode",
          default: "undefined",
          description: "Content to render on top of the gradient background.",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Additional CSS classes to apply to the container.",
        },
        {
          name: "colors",
          type: "string[]",
          default: 'initialColors',
          description: "Array of colors to use in the gradient.",
        },
        {
          name: "speed",
          type: "number",
          default: "1",
          description: "Speed factor for the gradient animation.",
        },
        {
          name: "blur",
          type: "number",
          default: "60",
          description: "Blur effect applied to the background.",
        },
        {
          name: "pattern",
          type: "string",
          default: '"radial"',
          description:
            "The gradient pattern to display (radial, linear, conic, mesh, noise, waves).",
        },
        {
          name: "intensity",
          type: "number",
          default: "1",
          description: "Intensity of the gradient pattern.",
        },
        {
          name: "opacity",
          type: "number",
          default: "0.8",
          description: "Opacity of the background.",
        },
        {
          name: "size",
          type: "string",
          default: '"full"',
          description:
            "Size of the background container (sm, md, lg, full, number).",
        },
        {
          name: "position",
          type: "string",
          default: '"absolute"',
          description:
            "CSS position property of the container (fixed, absolute, relative).",
        },
        {
          name: "zIndex",
          type: "number",
          default: "-1",
          description: "z-index of the background container.",
        },
        {
          name: "animate",
          type: "boolean",
          default: "true",
          description: "Enable or disable background animation.",
        },
        {
          name: "as",
          type: "React.ElementType",
          default: '"div"',
          description: "The HTML element or component to render as div, section, article, main, aside, header, footer.",
        },
        {
          name: "onClick",
          type: "() => void",
          default: "undefined",
          description: "Click event handler (if any) for the background.",
        },
      ],
    },
  ],

  category: "Background",
  examples: [
    {
      name: "Conic Gradient",
      preview: (
        <div className="relative h-[500px] w-[1000px] overflow-hidden bg-transparent">
          <div className="absolute inset-0">
            <AnimatedGradientBg
              pattern="conic"
              position="absolute"
              size="full"
              zIndex={0}
              colors={["#10b981", "#059669", "#047857", "#065f46"]}
            />
          </div>
          <div className="relative z-10 flex h-full items-center justify-center text-white">
            <div className="p-4 text-center">Conic Gradient</div>
          </div>
        </div>
      ),
      filename: "ConicGradient.tsx",
      code: `import { AnimatedGradientBg } from "@/nuvyxui/components/AnimatedGradientBg";
    
  export function ConicGradient() {
    return (
      <div className="relative h-[500px] w-[1000px] overflow-hidden bg-transparent">
        <div className="absolute inset-0">
          <AnimatedGradientBg
            pattern="conic"
            interactive
            position="absolute"
            size="full"
            zIndex={0}
            colors={["#10b981", "#059669", "#047857", "#065f46"]}
          />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center text-white">
          <div className="p-4 text-center">Conic Gradient</div>
        </div>
      </div>
    );
  }`,
    },
    {
      name: "Waves Gradient",
      preview: (
        <div className="relative h-[500px] w-[1000px] overflow-hidden bg-transparent">
          <div className="absolute inset-0">
            <AnimatedGradientBg
              pattern="waves"
              position="absolute"
              size="full"
              zIndex={0}
              colors={["#f43f5e", "#e11d48", "#be123c", "#9f1239"]}
            />
          </div>
          <div className="relative z-10 flex h-full items-center justify-center text-white">
            <div className="p-4 text-center">Waves Gradient</div>
          </div>
        </div>
      ),
      filename: "WavesGradient.tsx",
      code: `import { AnimatedGradientBg } from "@/nuvyxui/components/AnimatedGradientBg";
    
  export function WavesGradient() {
    return (
      <div className="relative h-[500px] w-[1000px] overflow-hidden bg-transparent">
        <div className="absolute inset-0">
          <AnimatedGradientBg
            pattern="waves"
            interactive
            position="absolute"
            size="full"
            zIndex={0}
            colors={["#f43f5e", "#e11d48", "#be123c", "#9f1239"]}
          />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center text-white">
          <div className="p-4 text-center">Waves Gradient</div>
        </div>
      </div>
    );
  }`,
    },
  ],
};
