import type { ComponentData } from "@/nyxui/ComponentInterfaces"
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
      name: "Glassmorphism Depth",
      items: [
        {
          name: "depth",
          type: "1 | 2 | 3 | 4 | 5",
          default: "3",
          description: "The depth level of the glassmorphism effect.",
        },
        {
          name: "theme",
          type: "string",
          default: '"light"',
          description:
            'The color theme of the glassmorphism effect. Possible values: "light", "dark", "blue", "purple", "teal".',
        },
        {
          name: "tiltEffect",
          type: "boolean",
          default: "true",
          description: "Whether to enable the tilt effect on hover.",
        },
        {
          name: "tiltMax",
          type: "number",
          default: "10",
          description: "The maximum tilt angle in degrees.",
        },
        {
          name: "hoverDepthChange",
          type: "boolean",
          default: "true",
          description: "Whether to enable the depth change on hover.",
        },
        {
          name: "rounded",
          type: "string",
          default: '"lg"',
          description:
            'The border radius of the component. Possible values: "none", "sm", "md", "lg", "xl", "full".',
        },
        {
          name: "shadow",
          type: "boolean",
          default: "true",
          description: "Whether to show a shadow effect.",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Additional CSS classes to apply.",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "undefined",
          description: "Content to be rendered inside the component.",
        },
      ],
    },
  ],
  
  category: "Effects",
  examples : [
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
      name: "Dark Theme with Extra Blur",
      preview: (
        <GlassmorphismDepth theme="dark" depth={5}>
          <h3 className="text-lg font-semibold">Dark Theme</h3>
          <p className="text-sm opacity-70">Maximum depth glass effect</p>
        </GlassmorphismDepth>
      ),
      filename: "DarkThemeExtraBlur.tsx",
      code: `import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth";
  
  export function DarkThemeExtraBlur() {
    return (
      <GlassmorphismDepth theme="dark" depth={5}>
        <h3 className="text-lg font-semibold">Dark Theme</h3>
        <p className="text-sm opacity-70">Maximum depth glass effect</p>
      </GlassmorphismDepth>
    );
  }`,
    },
    {
      name: "Blue Theme with Enhanced Tilt",
      preview: (
        <GlassmorphismDepth theme="blue" depth={3} tiltMax={15}>
          <h3 className="text-lg font-semibold">Enhanced Tilt</h3>
          <p className="text-sm opacity-70">More responsive tilt effect</p>
        </GlassmorphismDepth>
      ),
      filename: "EnhancedTilt.tsx",
      code: `import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth";
  
  export function EnhancedTilt() {
    return (
      <GlassmorphismDepth theme="blue" depth={3} tiltMax={15}>
        <h3 className="text-lg font-semibold">Enhanced Tilt</h3>
        <p className="text-sm opacity-70">More responsive tilt effect</p>
      </GlassmorphismDepth>
    );
  }`,
    },
    {
      name: "Purple No Tilt with Minimal Depth",
      preview: (
        <GlassmorphismDepth 
          theme="purple" 
          depth={1} 
          tiltEffect={false} 
          hoverDepthChange={false}
        >
          <h3 className="text-lg font-semibold">Static Effect</h3>
          <p className="text-sm opacity-70">No tilt or depth changes</p>
        </GlassmorphismDepth>
      ),
      filename: "StaticPurple.tsx",
      code: `import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth";
  
  export function StaticPurple() {
    return (
      <GlassmorphismDepth 
        theme="purple" 
        depth={1} 
        tiltEffect={false} 
        hoverDepthChange={false}
      >
        <h3 className="text-lg font-semibold">Static Effect</h3>
        <p className="text-sm opacity-70">No tilt or depth changes</p>
      </GlassmorphismDepth>
    );
  }`,
    },
    {
      name: "Teal Card with Extra Rounded Corners",
      preview: (
        <GlassmorphismDepth theme="teal" depth={3} rounded="xl">
          <h3 className="text-lg font-semibold">Extra Rounded</h3>
          <p className="text-sm opacity-70">With teal theme and xl corners</p>
        </GlassmorphismDepth>
      ),
      filename: "TealExtraRounded.tsx",
      code: `import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth";
  
  export function TealExtraRounded() {
    return (
      <GlassmorphismDepth theme="teal" depth={3} rounded="xl">
        <h3 className="text-lg font-semibold">Extra Rounded</h3>
        <p className="text-sm opacity-70">With teal theme and xl corners</p>
      </GlassmorphismDepth>
    );
  }`,
    },
    {
      name: "Circular Blue Button",
      preview: (
        <GlassmorphismDepth 
          theme="blue" 
          depth={2} 
          rounded="full"
          className="h-24 w-24 flex items-center justify-center p-0"
        >
          <span className="text-xl font-bold">Click</span>
        </GlassmorphismDepth>
      ),
      filename: "CircularButton.tsx",
      code: `import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth";
  
  export function CircularButton() {
    return (
      <GlassmorphismDepth 
        theme="blue" 
        depth={2} 
        rounded="full"
        className="h-24 w-24 flex items-center justify-center p-0"
      >
        <span className="text-xl font-bold">Click</span>
      </GlassmorphismDepth>
    );
  }`,
    },
    {
      name: "No Shadow Light Card",
      preview: (
        <GlassmorphismDepth 
          theme="light" 
          depth={4} 
          shadow={false}
        >
          <h3 className="text-lg font-semibold">No Shadow</h3>
          <p className="text-sm opacity-70">High depth but no shadow effect</p>
        </GlassmorphismDepth>
      ),
      filename: "NoShadowCard.tsx",
      code: `import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth";
  
  export function NoShadowCard() {
    return (
      <GlassmorphismDepth 
        theme="light" 
        depth={4} 
        shadow={false}
      >
        <h3 className="text-lg font-semibold">No Shadow</h3>
        <p className="text-sm opacity-70">High depth but no shadow effect</p>
      </GlassmorphismDepth>
    );
  }`,
    },
    {
      name: "Dark Theme No Hover Depth Change",
      preview: (
        <GlassmorphismDepth 
          theme="dark" 
          depth={3} 
          hoverDepthChange={false}
        >
          <h3 className="text-lg font-semibold">Tilt Only</h3>
          <p className="text-sm opacity-70">Tilt effect without depth change</p>
        </GlassmorphismDepth>
      ),
      filename: "TiltOnlyCard.tsx",
      code: `import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth";
  
  export function TiltOnlyCard() {
    return (
      <GlassmorphismDepth 
        theme="dark" 
        depth={3} 
        hoverDepthChange={false}
      >
        <h3 className="text-lg font-semibold">Tilt Only</h3>
        <p className="text-sm opacity-70">Tilt effect without depth change</p>
      </GlassmorphismDepth>
    );
  }`,
    },
    {
      name: "Sharp Edges Card",
      preview: (
        <GlassmorphismDepth 
          theme="purple" 
          depth={2} 
          rounded="none"
        >
          <h3 className="text-lg font-semibold">Sharp Edges</h3>
          <p className="text-sm opacity-70">No rounded corners</p>
        </GlassmorphismDepth>
      ),
      filename: "SharpEdgesCard.tsx",
      code: `import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth";
  
  export function SharpEdgesCard() {
    return (
      <GlassmorphismDepth 
        theme="purple" 
        depth={2} 
        rounded="none"
      >
        <h3 className="text-lg font-semibold">Sharp Edges</h3>
        <p className="text-sm opacity-70">No rounded corners</p>
      </GlassmorphismDepth>
    );
  }`,
    },
    {
      name: "Interactive Info Card",
      preview: (
        <GlassmorphismDepth 
          theme="teal" 
          depth={2} 
          tiltMax={20}
          className="flex flex-col gap-2"
        >
          <h3 className="text-lg font-semibold">Interactive Info Card</h3>
          <p className="text-sm opacity-70">Highly responsive tilt for interactive elements</p>
          <button className="mt-2 px-4 py-2 bg-teal-500/30 rounded-md border border-teal-300/30">
            Learn More
          </button>
        </GlassmorphismDepth>
      ),
      filename: "InteractiveInfoCard.tsx",
      code: `import { GlassmorphismDepth } from "@/nyxui/components/GlassmorphismDepth";
  
  export function InteractiveInfoCard() {
    return (
      <GlassmorphismDepth 
        theme="teal" 
        depth={2} 
        tiltMax={20}
        className="flex flex-col gap-2"
      >
        <h3 className="text-lg font-semibold">Interactive Info Card</h3>
        <p className="text-sm opacity-70">Highly responsive tilt for interactive elements</p>
        <button className="mt-2 px-4 py-2 bg-teal-500/30 rounded-md border border-teal-300/30">
          Learn More
        </button>
      </GlassmorphismDepth>
    );
  }`,
    },
  ]
}

