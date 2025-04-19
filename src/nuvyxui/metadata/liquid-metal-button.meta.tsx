import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { LiquidMetalButtonDemo } from "@/nuvyxui/demos/LiquidMetalButtonDemo";
import { LiquidMetalButton } from "@/nuvyxui/components/LiquidMetalButton";
import {
  ArrowRight,
  Download,
  Leaf,
  Mail,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import LiquidMetalButtonSource from "!!raw-loader!@/nuvyxui/components/LiquidMetalButton.tsx";
import LiquidMetalButtonDemoSource from "!!raw-loader!@/nuvyxui/demos/LiquidMetalButtonDemo.tsx";

export const liquidMetalButtonData: ComponentData = {
  name: "Liquid Metal Button",
  description:
    "Buttons that behave like mercury when clicked. A fluid effect that reacts to the mouse pointer. Can be combined with neon cyberpunk themes.",
  preview: <LiquidMetalButtonDemo />,
  usage: LiquidMetalButtonDemoSource,
  componentCode: LiquidMetalButtonSource,
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
      name: "Liquid Metal Button",
      items: [
        {
          name: "variant",
          type: "string",
          default: '"default"',
          description:
            'The variant of the button. Possible values: "default", "outline", "ghost", "mercury", "ripple", "gradient".',
        },
        {
          name: "size",
          type: "string",
          default: '"md"',
          description:
            'The size of the button. Possible values: "xs", "sm", "md", "lg", "xl", "2xl".',
        },
        {
          name: "theme",
          type: "string",
          default: '"silver"',
          description:
            'The color theme of the button. Possible values: "silver", "gold", "copper", "mercury", "steel", "obsidian", "emerald", "ruby", "sapphire", "custom".',
        },
        {
          name: "customColors",
          type: "object",
          default: "undefined",
          description:
            'Custom colors for the button when theme is set to "custom". The object should include properties: base, highlight, shadow, and optionally text, border, and glow.',
        },
        {
          name: "intensity",
          type: "number",
          default: "3",
          description: "The intensity of the liquid effect (1-5).",
        },
        {
          name: "magnetic",
          type: "boolean",
          default: "true",
          description: "Whether to enable the magnetic pull effect.",
        },
        {
          name: "clickEffect",
          type: "boolean",
          default: "true",
          description: "Whether to enable the click animation.",
        },
        {
          name: "asChild",
          type: "boolean",
          default: "false",
          description: "Whether to render the button as a child element.",
        },
        {
          name: "rounded",
          type: "string",
          default: '"md"',
          description:
            'The border radius of the button. Possible values: "none", "sm", "md", "lg", "full".',
        },
        {
          name: "shadow",
          type: "boolean | string",
          default: "true",
          description:
            'Whether to show a shadow effect. Can be a boolean or a specific shadow size: "sm", "md", "lg", "xl".',
        },
        {
          name: "hoverAnimation",
          type: "boolean",
          default: "true",
          description: "Whether to enable hover animation.",
        },
        {
          name: "textured",
          type: "boolean",
          default: "false",
          description: "Whether to apply a textured effect.",
        },
        {
          name: "icon",
          type: "React.ReactNode",
          default: "undefined",
          description: "Icon to be displayed before the children.",
        },
        {
          name: "iconAfter",
          type: "React.ReactNode",
          default: "undefined",
          description: "Icon to be displayed after the children.",
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
          description: "Content of the button.",
        },
        {
          name: "onClick",
          type: "(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void",
          default: "undefined",
          description:
            "Callback function to be called when the button is clicked.",
        },
      ],
    },
  ],

  category: "Buttons",
  examples: [
    {
      name: "Shimmering Mercury Effect",
      preview: (
        <LiquidMetalButton
          variant="mercury"
          theme="mercury"
          size="lg"
          intensity={4}
          shadow="xl"
          hoverAnimation={true}
        >
          <div className="flex items-center">
            <Download className="mr-2 h-5 w-5" />
            <span>Download Files</span>
          </div>
        </LiquidMetalButton>
      ),
      filename: "MercuryButton.tsx",
      code: `import { LiquidMetalButton } from "@/nuvyxui/components/LiquidMetalButton";
  import { Download } from 'lucide-react';
  
  export function MercuryButton() {
    return (
      <LiquidMetalButton 
        variant="mercury"   
        theme="mercury" 
        size="lg"
        intensity={4}
        shadow="xl"
        hoverAnimation={true}
      >
        <div className="flex items-center"><Download className="mr-2 h-5 w-5" /><span>Download Files</span></div>
      </LiquidMetalButton>
    );
  }`,
    },
    {
      name: "Luxurious Gold Button",
      preview: (
        <LiquidMetalButton
          variant="default"
          theme="gold"
          size="md"
          textured={true}
          shadow="lg"
          rounded="md"
        >
          Premium Access
        </LiquidMetalButton>
      ),
      filename: "GoldButton.tsx",
      code: `import { LiquidMetalButton } from "@/nuvyxui/components/LiquidMetalButton";
  
  export function GoldButton() {
    return (
      <LiquidMetalButton 
        variant="default" 
        theme="gold" 
        size="md"
        textured={true}
        shadow="lg"
        rounded="md"
      >
        Premium Access
      </LiquidMetalButton>
    );
  }`,
    },
    {
      name: "Dynamic Ripple Effect",
      preview: (
        <LiquidMetalButton
          variant="ripple"
          theme="steel"
          size="lg"
          intensity={5}
          shadow="xl"
          clickEffect={true}
        >
          <div className="flex items-center">
            <Star className="mr-2 h-5 w-5" />
            <span>Add to Favorites</span>
          </div>
        </LiquidMetalButton>
      ),
      filename: "RippleButton.tsx",
      code: `import { LiquidMetalButton } from "@/nuvyxui/components/LiquidMetalButton";
  import { Star } from 'lucide-react';
  
  export function RippleButton() {
    return (
      <LiquidMetalButton 
        variant="ripple" 
        theme="steel" 
        size="lg" 
        intensity={5}
        shadow="xl"
        clickEffect={true}
      >
        <div className="flex items-center"><Star className="mr-2 h-5 w-5" /><span>Add to Favorites</span></div>
      </LiquidMetalButton>
    );
  }`,
    },
    {
      name: "Elegant Copper Outline",
      preview: (
        <LiquidMetalButton
          variant="outline"
          theme="copper"
          size="md"
          shadow="md"
          hoverAnimation={true}
          rounded="lg"
        >
          <div className="flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            <span>Subscribe</span>
          </div>
        </LiquidMetalButton>
      ),
      filename: "OutlineButton.tsx",
      code: `import { LiquidMetalButton } from "@/nuvyxui/components/LiquidMetalButton";
  import { Mail } from 'lucide-react';
  
  export function OutlineButton() {
    return (
      <LiquidMetalButton 
        variant="outline" 
        theme="copper" 
        size="md"
        shadow="md"
        hoverAnimation={true}
        rounded="lg"
      >
        <div className="flex items-center"><Mail className="mr-2 h-4 w-4" /><span>Subscribe</span></div>
      </LiquidMetalButton>
    );
  }`,
    },
    {
      name: "Premium Circular Button",
      preview: (
        <LiquidMetalButton
          variant="mercury"
          theme="silver"
          size="lg"
          rounded="full"
          shadow="xl"
          textured={true}
          intensity={4}
        >
          <div className="flex items-center">
            <Star className="mr-2 h-5 w-5" />
            <span>Premium</span>
          </div>
        </LiquidMetalButton>
      ),
      filename: "RoundedButton.tsx",
      code: `import { LiquidMetalButton } from "@/nuvyxui/components/LiquidMetalButton";
  import { Star } from 'lucide-react';
  
  export function RoundedButton() {
    return (
      <LiquidMetalButton 
        variant="mercury" 
        theme="silver" 
        size="lg" 
        rounded="full"
        shadow="xl"
        textured={true}
        intensity={4}
      >
        <div className="flex items-center"><Star className="mr-2 h-5 w-5" /><span>Premium</span></div>
      </LiquidMetalButton>
    );
  }`,
    },
    {
      name: "Obsidian Dark Button",
      preview: (
        <LiquidMetalButton
          variant="default"
          theme="obsidian"
          size="lg"
          shadow="lg"
          textured={true}
          hoverAnimation={true}
        >
          <div className="flex items-center">
            <ShieldCheck className="mr-2 h-5 w-5" />
            <span>Secure Connection</span>
          </div>
        </LiquidMetalButton>
      ),
      filename: "ObsidianButton.tsx",
      code: `import { LiquidMetalButton } from "@/nuvyxui/components/LiquidMetalButton";
  import { ShieldCheck } from 'lucide-react';
  
  export function ObsidianButton() {
    return (
      <LiquidMetalButton 
        variant="default" 
        theme="obsidian" 
        size="lg"
        shadow="lg"
        textured={true}
        hoverAnimation={true}
      >
        <div className="flex items-center"><ShieldCheck className="mr-2 h-5 w-5" /><span>Secure Connection</span></div>
      </LiquidMetalButton>
    );
  }`,
    },
    {
      name: "Emerald Gradient Button",
      preview: (
        <LiquidMetalButton
          variant="gradient"
          theme="emerald"
          size="md"
          shadow="lg"
          rounded="lg"
          hoverAnimation={true}
        >
          <div className="flex items-center">
            <Leaf className="mr-2 h-4 w-4" />
            <span>Eco Friendly</span>
          </div>
        </LiquidMetalButton>
      ),
      filename: "EmeraldButton.tsx",
      code: `import { LiquidMetalButton } from "@/nuvyxui/components/LiquidMetalButton";
  import { Leaf } from 'lucide-react';
  
  export function EmeraldButton() {
    return (
      <LiquidMetalButton 
        variant="gradient" 
        theme="emerald" 
        size="md"
        shadow="lg"
        rounded="lg"
        hoverAnimation={true}
      >
        <div className="flex items-center"><Leaf className="mr-2 h-4 w-4" /><span>Eco Friendly</span></div>
      </LiquidMetalButton>
    );
  }`,
    },
    {
      name: "Ruby Action Button",
      preview: (
        <LiquidMetalButton
          variant="ripple"
          theme="ruby"
          size="lg"
          shadow="xl"
          clickEffect={true}
          intensity={4}
        >
          <div className="flex items-center">
            <ArrowRight className="ml-2 h-5 w-5" />
            <span>Get Started</span>
          </div>
        </LiquidMetalButton>
      ),
      filename: "RubyButton.tsx",
      code: `import { LiquidMetalButton } from "@/nuvyxui/components/LiquidMetalButton";
  import { ArrowRight } from 'lucide-react';
  
  export function RubyButton() {
    return (
      <LiquidMetalButton 
        variant="ripple" 
        theme="ruby" 
        size="lg"
        shadow="xl"
        clickEffect={true}
        intensity={4}
      >
        <div className="flex items-center"><ArrowRight className="ml-2 h-5 w-5" /><span>Get Started</span></div>
      </LiquidMetalButton>
    );
  }`,
    },
    {
      name: "Custom Themed Button",
      preview: (
        <LiquidMetalButton
          variant="default"
          theme="custom"
          customColors={{
            base: "bg-gradient-to-b from-purple-300 via-purple-400 to-purple-600",
            highlight: "rgba(230, 200, 255, 0.8)",
            shadow: "rgba(80, 0, 120, 0.4)",
            text: "text-purple-950 dark:text-purple-200",
            border: "border-purple-500",
            glow: "shadow-purple-500/50",
          }}
          size="lg"
          shadow="lg"
          rounded="md"
          textured={true}
        >
          <div className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5" />
            <span>Custom Magic</span>
          </div>
        </LiquidMetalButton>
      ),
      filename: "CustomButton.tsx",
      code: `import { LiquidMetalButton } from "@/nuvyxui/components/LiquidMetalButton";
  import { Sparkles } from 'lucide-react';
  
  export function CustomButton() {
    return (
      <LiquidMetalButton 
        variant="default" 
        theme="custom" 
        customColors={{
          base: "bg-gradient-to-b from-purple-300 via-purple-400 to-purple-600",
          highlight: "rgba(230, 200, 255, 0.8)",
          shadow: "rgba(80, 0, 120, 0.4)",
          text: "text-purple-950 dark:text-purple-200",
          border: "border-purple-500",
          glow: "shadow-purple-500/50"
        }}
        size="lg"
        shadow="lg"
        rounded="md"
        textured={true}
      >
        <div className="flex items-center"><Sparkles className="mr-2 h-5 w-5" /><span>Custom Magic</span></div>
      </LiquidMetalButton>
    );
  }`,
    },
  ],
};
