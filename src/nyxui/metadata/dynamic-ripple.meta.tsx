import React from "react";
import type { ComponentData } from "@/nyxui/ComponentInterfaces";
import { DynamicRipple } from "@/nyxui/components/DynamicRipple";
import { DynamicRippleDemo } from "@/nyxui/demos/DynamicRippleDemo";
import { Check, Droplets, Palette, ShieldCheck } from "lucide-react";
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/DynamicRipple.tsx");
const DynamicRippleSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/DynamicRippleDemo.tsx");
const DynamicRippleDemoSource = fs.readFileSync(demoPath, "utf8");

export const dynamicRippleData: ComponentData = {
  name: "Dynamic Ripple",
  description:
    "A fluid, water ripple effect that reacts to cursor movement or touch. Can be used in cards, buttons, or section dividers. Works well with gradient-based morphing.",
  preview: <DynamicRippleDemo />,
  usage: DynamicRippleDemoSource,
  componentCode: DynamicRippleSource,
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
      name: "Dynamic Ripple",
      items: [
        {
          name: "theme",
          type: "string",
          default: '"blue"',
          description:
            'The color theme of the ripple effect. Possible values: "blue", "purple", "green", "amber", "rose", "custom".',
        },
        {
          name: "customColors",
          type: "object",
          default: "undefined",
          description:
            'Custom colors for the ripple when theme is set to "custom". The object should include properties: primary and secondary.',
        },
        {
          name: "intensity",
          type: "number",
          default: "3",
          description: "The intensity of the ripple effect (1-5).",
        },
        {
          name: "speed",
          type: "number",
          default: "3",
          description: "The speed of the ripple animation (1-5).",
        },
        {
          name: "reactToCursor",
          type: "boolean",
          default: "true",
          description:
            "Whether to enable the ripple effect on cursor movement.",
        },
        {
          name: "autoAnimate",
          type: "boolean",
          default: "true",
          description:
            "Whether to enable the automatic ripple animation.",
        },
        {
          name: "rounded",
          type: "string",
          default: '"lg"',
          description:
            'The border radius of the component. Possible values: "none", "sm", "md", "lg", "xl", "full".',
        },
        {
          name: "gradientOverlay",
          type: "boolean",
          default: "true",
          description:
            "Whether to apply a gradient overlay.",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description:
            "Additional CSS classes to apply.",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "undefined",
          description:
            "Content to be rendered inside the ripple component.",
        },
      ],
    },
  ],
  
  category: "Effects",
  examples: [
    {
      name: "Basic Blue Ripple",
      preview: (
        <DynamicRipple theme="blue" intensity={3} speed={3} className="p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Water Ripple Effect</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">Move your cursor over this card to create ripples</p>
        </DynamicRipple>
      ),
      filename: "BasicRipple.tsx",
      code: `import { DynamicRipple } from "@/nyxui/components/DynamicRipple";
  import { Droplets } from 'lucide-react';
  
  export function BasicRipple() {
    return (
      <DynamicRipple theme="blue" intensity={3} speed={3} className="p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Water Ripple Effect</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Move your cursor over this card to create ripples
        </p>
      </DynamicRipple>
    );
  }`,
    },
    {
      name: "Custom Colors Ripple",
      preview: (
        <DynamicRipple 
          theme="custom" 
          customColors={{ 
            primary: "rgba(79, 70, 229, 0.7)", 
            secondary: "rgba(236, 72, 153, 0.7)" 
          }} 
          intensity={4} 
          speed={3} 
          className="p-6 border border-purple-200 dark:border-purple-800"
        >
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold">Custom Gradient Colors</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Indigo to pink custom color blend
          </p>
        </DynamicRipple>
      ),
      filename: "CustomColorsRipple.tsx",
      code: `import { DynamicRipple } from "@/nyxui/components/DynamicRipple";
  import { Palette } from 'lucide-react';
  
  export function CustomColorsRipple() {
    return (
      <DynamicRipple 
        theme="custom" 
        customColors={{ 
          primary: "rgba(79, 70, 229, 0.7)", 
          secondary: "rgba(236, 72, 153, 0.7)" 
        }} 
        intensity={4} 
        speed={3} 
        className="p-6 border border-purple-200 dark:border-purple-800"
      >
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold">Custom Gradient Colors</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Indigo to pink custom color blend
        </p>
      </DynamicRipple>
    );
  }`,
    },
    {
      name: "High Intensity Purple Ripple",
      preview: (
        <DynamicRipple theme="purple" intensity={5} speed={2} className="p-6 border border-purple-200 dark:border-purple-800">
          <h3 className="text-lg font-semibold">High Intensity Ripple</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Maximum intensity with slower speed</p>
        </DynamicRipple>
      ),
      filename: "HighIntensityRipple.tsx",
      code: `import { DynamicRipple } from "@/nyxui/components/DynamicRipple";
  
  export function HighIntensityRipple() {
    return (
      <DynamicRipple theme="purple" intensity={5} speed={2} className="p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold">High Intensity Ripple</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Maximum intensity with slower speed
        </p>
      </DynamicRipple>
    );
  }`,
    },
    {
      name: "Fast Green Ripple",
      preview: (
        <DynamicRipple theme="green" intensity={2} speed={5} className="p-6 border border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold">Fast Ripple</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Low intensity with maximum speed</p>
        </DynamicRipple>
      ),
      filename: "FastRipple.tsx",
      code: `import { DynamicRipple } from "@/nyxui/components/DynamicRipple";
  
  export function FastRipple() {
    return (
      <DynamicRipple theme="green" intensity={2} speed={5} className="p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold">Fast Ripple</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Low intensity with maximum speed
        </p>
      </DynamicRipple>
    );
  }`,
    },
    {
      name: "Circular Amber Ripple",
      preview: (
        <DynamicRipple theme="amber" rounded="full" className="p-6 aspect-square flex items-center justify-center border border-amber-200 dark:border-amber-800">
          <div className="text-center">
            <h3 className="text-lg font-semibold">Circular Ripple</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">With rounded full style</p>
          </div>
        </DynamicRipple>
      ),
      filename: "CircularRipple.tsx",
      code: `import { DynamicRipple } from "@/nyxui/components/DynamicRipple";
  
  export function CircularRipple() {
    return (
      <DynamicRipple theme="amber" rounded="full" className="p-6 aspect-square flex items-center justify-center border border-amber-200 dark:border-amber-800">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Circular Ripple</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            With rounded full style
          </p>
        </div>
      </DynamicRipple>
    );
  }`,
    },
    {
      name: "Auto-Animation Disabled",
      preview: (
        <DynamicRipple theme="rose" autoAnimate={false} className="p-6 border border-rose-200 dark:border-rose-800">
          <h3 className="text-lg font-semibold">Cursor-Only Ripple</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Only reacts to cursor movement, no automatic animation
          </p>
        </DynamicRipple>
      ),
      filename: "CursorOnlyRipple.tsx",
      code: `import { DynamicRipple } from "@/nyxui/components/DynamicRipple";
  
  export function CursorOnlyRipple() {
    return (
      <DynamicRipple theme="rose" autoAnimate={false} className="p-6 border border-rose-200 dark:border-rose-800">
        <h3 className="text-lg font-semibold">Cursor-Only Ripple</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Only reacts to cursor movement, no automatic animation
        </p>
      </DynamicRipple>
    );
  }`,
    },
    {
      name: "Interactive Card with Gradient Disabled",
      preview: (
        <DynamicRipple theme="blue" gradientOverlay={false} className="p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Clean Interface</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Ripple effect without gradient overlay for cleaner UI
            </p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </DynamicRipple>
      ),
      filename: "NoGradientRipple.tsx",
      code: `import { DynamicRipple } from "@/nyxui/components/DynamicRipple";
  
  export function NoGradientRipple() {
    return (
      <DynamicRipple theme="blue" gradientOverlay={false} className="p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Clean Interface</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Ripple effect without gradient overlay for cleaner UI
          </p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors">
            Learn More
          </button>
        </div>
      </DynamicRipple>
    );
  }`,
    },
    {
      name: "Feature Card with Subtle Effect",
      preview: (
        <DynamicRipple theme="green" intensity={1} speed={1} className="p-6 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-semibold">Security Features</h3>
          </div>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>End-to-end encryption</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Two-factor authentication</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5" />
              <span>Secure cloud backup</span>
            </li>
          </ul>
        </DynamicRipple>
      ),
      filename: "FeatureCard.tsx",
      code: `import { DynamicRipple } from "@/nyxui/components/DynamicRipple";
  import { ShieldCheck, Check } from 'lucide-react';
  
  export function FeatureCard() {
    return (
      <DynamicRipple theme="green" intensity={1} speed={1} className="p-6 border border-green-200 dark:border-green-800">
        <div className="flex items-center gap-3 mb-3">
          <ShieldCheck className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-semibold">Security Features</h3>
        </div>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-500 mt-0.5" />
            <span>End-to-end encryption</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-500 mt-0.5" />
            <span>Two-factor authentication</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-500 mt-0.5" />
            <span>Secure cloud backup</span>
          </li>
        </ul>
      </DynamicRipple>
    );
  }`,
    },
    {
      name: "Pricing Card",
      preview: (
        <DynamicRipple theme="purple" rounded="xl" className="p-6 border border-purple-200 dark:border-purple-800">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold">Premium Plan</h3>
            <div className="mt-2">
              <span className="text-3xl font-bold">$29</span>
              <span className="text-gray-500">/month</span>
            </div>
          </div>
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-purple-500" />
              <span className="text-sm">Unlimited projects</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-purple-500" />
              <span className="text-sm">Priority support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-purple-500" />
              <span className="text-sm">Custom reporting</span>
            </div>
          </div>
          <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
            Subscribe Now
          </button>
        </DynamicRipple>
      ),
      filename: "PricingCard.tsx",
      code: `import { DynamicRipple } from "@/nyxui/components/DynamicRipple";
  import { Check } from 'lucide-react';
  
  export function PricingCard() {
    return (
      <DynamicRipple theme="purple" rounded="xl" className="p-6 border border-purple-200 dark:border-purple-800">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold">Premium Plan</h3>
          <div className="mt-2">
            <span className="text-3xl font-bold">$29</span>
            <span className="text-gray-500">/month</span>
          </div>
        </div>
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-purple-500" />
            <span className="text-sm">Unlimited projects</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-purple-500" />
            <span className="text-sm">Priority support</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-purple-500" />
            <span className="text-sm">Custom reporting</span>
          </div>
        </div>
        <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
          Subscribe Now
        </button>
      </DynamicRipple>
    );
  }`,
    },
    {
      name: "Interactive CTA Button",
      preview: (
        <div className="p-4 flex justify-center border border-rose-200 dark:border-rose-800">
          <DynamicRipple 
            theme="rose" 
            intensity={4} 
            speed={4} 
            rounded="lg" 
            className="px-6 py-3 bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors text-center"
          >
            <span>Get Started Today</span>
          </DynamicRipple>
        </div>
      ),
      filename: "RippleButton.tsx",
      code: `import { DynamicRipple } from "@/nyxui/components/DynamicRipple";
  
  export function RippleButton() {
    return (
      <div className="p-4 flex justify-center border border-rose-200 dark:border-rose-800">
        <DynamicRipple 
          theme="rose" 
          intensity={4} 
          speed={4} 
          rounded="lg" 
          className="px-6 py-3 bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors text-center"
        >
          <span>Get Started Today</span>
        </DynamicRipple>
      </div>
    );
  }`,
    }
  ]
};