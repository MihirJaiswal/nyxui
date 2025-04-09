import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import { AnimatedGradientBg } from "@/nyxui/components/AnimatedGradientBg"
import { AnimatedGradientBgDemo } from "@/nyxui/demos/AnimatedGradientBgDemo"
import fs from "fs"
import path from "path"

const componentPath = path.join(process.cwd(), "src/nyxui/components/AnimatedGradientBg.tsx")
const AnimatedGradientBgSource = fs.readFileSync(componentPath, "utf8")

const demoPath = path.join(process.cwd(), "src/nyxui/demos/AnimatedGradientBgDemo.tsx")
const AnimatedGradientBgDemoSource = fs.readFileSync(demoPath, "utf8")

export const animatedGradientBgData: ComponentData = {
  name: "Animated Gradient Background",
  description:
    "A dynamic animated gradient background component that supports various gradient patterns, interactive effects, and customizable properties for creating engaging UI backgrounds.",
  preview: <AnimatedGradientBgDemo />,
  usage: AnimatedGradientBgDemoSource,
  componentCode: AnimatedGradientBgSource,
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
          default: '["#4f46e5", "#ec4899", "#8b5cf6", "#06b6d4"]',
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
          type: '"radial" | "linear" | "conic" | "mesh" | "noise" | "waves"',
          default: '"radial"',
          description: "The gradient pattern to display.",
        },
        {
          name: "patternIntensity",
          type: "number",
          default: "1",
          description: "Intensity of the gradient pattern.",
        },
        {
          name: "interactive",
          type: "boolean",
          default: "false",
          description: "Enable interactive effects based on mouse movement.",
        },
        {
          name: "interactiveIntensity",
          type: "number",
          default: "0.5",
          description: "Intensity of the interactive mouse effects.",
        },
        {
          name: "opacity",
          type: "number",
          default: "0.8",
          description: "Opacity of the background.",
        },
        {
          name: "size",
          type: '"sm" | "md" | "lg" | "full" | number',
          default: '"full"',
          description: "Size of the background container.",
        },
        {
          name: "position",
          type: '"fixed" | "absolute" | "relative"',
          default: '"absolute"',
          description: "CSS position property of the container.",
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
          description: "The HTML element or component to render as.",
        },
      ],
    },
  ],
  
  category: "Effects",
  new: true,
  examples: [
    {
      name: "Radial Gradient",
      preview: (
        <div className="relative h-[500px] w-[1000px] overflow-hidden bg-transparent">
          <div className="absolute inset-0">
            <AnimatedGradientBg
              pattern="radial"
              interactive
              position="absolute"
              size="full"
              zIndex={0}
              colors={["#4f46e5", "#ec4899", "#8b5cf6", "#06b6d4"]}
            />
          </div>
          <div className="relative z-10 flex h-full items-center justify-center text-white">
            <div className="p-4 text-center">Radial Gradient</div>
          </div>
        </div>
      ),
      filename: "RadialGradient.tsx",
      code: `import { AnimatedGradientBg } from "@/nyxui/components/AnimatedGradientBg";
    
  export function RadialGradient() {
    return (
      <div className="relative h-[500px] w-[1000px] overflow-hidden bg-transparent">
        <div className="absolute inset-0">
          <AnimatedGradientBg
            pattern="radial"
            interactive
            position="absolute"
            size="full"
            zIndex={0}
            colors={["#4f46e5", "#ec4899", "#8b5cf6", "#06b6d4"]}
          />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center text-white">
          <div className="p-4 text-center">Radial Gradient</div>
        </div>
      </div>
    );
  }`,
    },
    {
      name: "Linear Gradient",
      preview: (
        <div className="relative h-[500px] w-[1000px] overflow-hidden bg-transparent">
          <div className="absolute inset-0">
            <AnimatedGradientBg
              pattern="linear"
              interactive
              position="absolute"
              size="full"
              zIndex={0}
              colors={["#f97316", "#ea580c", "#c2410c", "#9a3412"]}
            />
          </div>
          <div className="relative z-10 flex h-full items-center justify-center text-white">
            <div className="p-4 text-center">Linear Gradient</div>
          </div>
        </div>
      ),
      filename: "LinearGradient.tsx",
      code: `import { AnimatedGradientBg } from "@/nyxui/components/AnimatedGradientBg";
    
  export function LinearGradient() {
    return (
      <div className="relative h-[500px] w-[1000px] overflow-hidden bg-transparent">
        <div className="absolute inset-0">
          <AnimatedGradientBg
            pattern="linear"
            interactive
            position="absolute"
            size="full"
            zIndex={0}
            colors={["#f97316", "#ea580c", "#c2410c", "#9a3412"]}
          />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center text-white">
          <div className="p-4 text-center">Linear Gradient</div>
        </div>
      </div>
    );
  }`,
    },
    {
      name: "Conic Gradient",
      preview: (
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
      ),
      filename: "ConicGradient.tsx",
      code: `import { AnimatedGradientBg } from "@/nyxui/components/AnimatedGradientBg";
    
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
      name: "Mesh Pattern",
      preview: (
        <div className="relative h-[500px] w-[1000px] overflow-hidden bg-transparent">
          <div className="absolute inset-0">
            <AnimatedGradientBg
              pattern="mesh"
              interactive
              position="absolute"
              size="full"
              zIndex={0}
              colors={["#3b82f6", "#2563eb", "#1d4ed8", "#1e40af"]}
            />
          </div>
          <div className="relative z-10 flex h-full items-center justify-center text-white">
            <div className="p-4 text-center">Mesh Pattern</div>
          </div>
        </div>
      ),
      filename: "MeshPattern.tsx",
      code: `import { AnimatedGradientBg } from "@/nyxui/components/AnimatedGradientBg";
    
  export function MeshPattern() {
    return (
      <div className="relative h-[500px] w-[1000px] overflow-hidden bg-transparent">
        <div className="absolute inset-0">
          <AnimatedGradientBg
            pattern="mesh"
            interactive
            position="absolute"
            size="full"
            zIndex={0}
            colors={["#3b82f6", "#2563eb", "#1d4ed8", "#1e40af"]}
          />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center text-white">
          <div className="p-4 text-center">Mesh Pattern</div>
        </div>
      </div>
    );
  }`,
    },
    {
      name: "Noise Gradient",
      preview: (
        <div className="relative h-[500px] w-[1000px] overflow-hidden bg-transparent">
          <div className="absolute inset-0">
            <AnimatedGradientBg
              pattern="noise"
              interactive
              position="absolute"
              size="full"
              zIndex={0}
              colors={["#9333ea", "#8b5cf6", "#7c3aed", "#6d28d9"]}
            />
          </div>
          <div className="relative z-10 flex h-full items-center justify-center text-white">
            <div className="p-4 text-center">Noise Gradient</div>
          </div>
        </div>
      ),
      filename: "NoiseGradient.tsx",
      code: `import { AnimatedGradientBg } from "@/nyxui/components/AnimatedGradientBg";
    
  export function NoiseGradient() {
    return (
      <div className="relative h-[500px] w-[1000px] overflow-hidden bg-transparent">
        <div className="absolute inset-0">
          <AnimatedGradientBg
            pattern="noise"
            interactive
            position="absolute"
            size="full"
            zIndex={0}
            colors={["#9333ea", "#8b5cf6", "#7c3aed", "#6d28d9"]}
          />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center text-white">
          <div className="p-4 text-center">Noise Gradient</div>
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
      ),
      filename: "WavesGradient.tsx",
      code: `import { AnimatedGradientBg } from "@/nyxui/components/AnimatedGradientBg";
    
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
  ]
}
