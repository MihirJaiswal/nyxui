import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import { LiquidMetalButtonDemo } from "@/nyxui/demos/LiquidMetalButtonDemo"
import { LiquidMetalButton } from "@/nyxui/components/LiquidMetalButton"
import { ArrowRight, Download, Leaf, Mail, ShieldCheck, Sparkles, Star } from "lucide-react"
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/LiquidMetalButton.tsx");
const LiquidMetalButtonSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/LiquidMetalButtonDemo.tsx");
const LiquidMetalButtonDemoSource = fs.readFileSync(demoPath, "utf8");

export const liquidMetalButtonData: ComponentData = {
  name: "Liquid Metal Button",
  description:
    "Buttons that behave like mercury when clicked. A fluid effect that reacts to the mouse pointer. Can be combined with neon cyberpunk themes.",
  preview: <LiquidMetalButtonDemo />,
  usage: LiquidMetalButtonDemoSource,
  componentCode: LiquidMetalButtonSource,
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
      name: "@radix-ui/react-slot",
      description: "Used for the asChild pattern to allow rendering as different elements.",
      install: {
        npm: "npm install @radix-ui/react-slot",
        pnpm: "pnpm add @radix-ui/react-slot",
        yarn: "yarn add @radix-ui/react-slot",
        bun: "bun add @radix-ui/react-slot",
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
          default: '"default" | "outline" | "ghost" | "mercury" | "ripple"',
          description: "The variant of the button",
        },
        {
          name: "size",
          type: "string",
          default: '"sm" | "md" | "lg" | "xl"',
          description: "The size of the button",
        },
        {
          name: "theme",
          type: "string",
          default: '"silver" | "gold" | "copper" | "mercury" | "steel" | "custom"',
          description: "The color theme of the button",
        },
        {
          name: "customColors",
          type: "object",
          default: "undefined",
          description: "Custom colors for the button when theme is set to 'custom'",
        },
        {
          name: "intensity",
          type: "number",
          default: "3",
          description: "The intensity of the liquid effect (1-5)",
        },
        {
          name: "magnetic",
          type: "boolean",
          default: "true",
          description: "Whether to enable the magnetic pull effect",
        },
        {
          name: "clickEffect",
          type: "boolean",
          default: "true",
          description: "Whether to enable the click animation",
        },
        {
          name: "asChild",
          type: "boolean",
          default: "false",
          description: "Whether to render the button as a child element",
        },
        {
          name: "rounded",
          type: "string",
          default: '"none" | "sm" | "md" | "lg" | "full"',
          description: "The border radius of the button",
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
         <div className="flex items-center"><Download className="mr-2 h-5 w-5" /><span>Download Files</span></div>
        </LiquidMetalButton>
      ),
      filename: "MercuryButton.tsx",
      code: `import { LiquidMetalButton } from "@/nyxui/components/LiquidMetalButton";
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
      code: `import { LiquidMetalButton } from "@/nyxui/components/LiquidMetalButton";
  
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
          <div className="flex items-center"><Star className="mr-2 h-5 w-5" /><span>Add to Favorites</span></div>
        </LiquidMetalButton>
      ),
      filename: "RippleButton.tsx",
      code: `import { LiquidMetalButton } from "@/nyxui/components/LiquidMetalButton";
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
          <div className="flex items-center"><Mail className="mr-2 h-4 w-4" /><span>Subscribe</span></div>
        </LiquidMetalButton>
      ),
      filename: "OutlineButton.tsx",
      code: `import { LiquidMetalButton } from "@/nyxui/components/LiquidMetalButton";
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
          <div className="flex items-center"><Star className="mr-2 h-5 w-5" /><span>Premium</span></div>
        </LiquidMetalButton>
      ),
      filename: "RoundedButton.tsx",
      code: `import { LiquidMetalButton } from "@/nyxui/components/LiquidMetalButton";
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
          <div className="flex items-center"><ShieldCheck className="mr-2 h-5 w-5" /><span>Secure Connection</span></div>
        </LiquidMetalButton>
      ),
      filename: "ObsidianButton.tsx",
      code: `import { LiquidMetalButton } from "@/nyxui/components/LiquidMetalButton";
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
          <div className="flex items-center"><Leaf className="mr-2 h-4 w-4" /><span>Eco Friendly</span></div>
        </LiquidMetalButton>
      ),
      filename: "EmeraldButton.tsx",
      code: `import { LiquidMetalButton } from "@/nyxui/components/LiquidMetalButton";
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
          <div className="flex items-center"><ArrowRight className="ml-2 h-5 w-5" /><span>Get Started</span></div>
        </LiquidMetalButton>
      ),
      filename: "RubyButton.tsx",
      code: `import { LiquidMetalButton } from "@/nyxui/components/LiquidMetalButton";
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
            text: "text-purple-950",
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
      ),
      filename: "CustomButton.tsx",
      code: `import { LiquidMetalButton } from "@/nyxui/components/LiquidMetalButton";
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
          text: "text-purple-950",
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
  ]
}

