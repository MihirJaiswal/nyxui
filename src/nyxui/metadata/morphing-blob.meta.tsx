import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import { MorphingBlob } from "@/nyxui/components/MorphingBlob"
import { MorphingBlobDemo } from "@/nyxui/demos/MorphingBlobDemo"
import { Atom, Brain, Rocket, Shield, Sparkles, Star, Zap } from "lucide-react"
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/MorphingBlob.tsx");
const MorphingBlobSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/MorphingBlobDemo.tsx");
const MorphingBlobDemoSource = fs.readFileSync(demoPath, "utf8");

export const morphingBlobData: ComponentData = {
  name: "Morphing Blob",
  description:
    "Interactive blob elements that change shape dynamically. Works as background visuals, buttons, or section transitions. Inspired by AI-generated abstract designs.",
  preview: <MorphingBlobDemo />,
  usage: MorphingBlobDemoSource,
  componentCode: MorphingBlobSource,
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
      name: "Morphing Blob",
      items: [
        {
          name: "theme",
          type: "string",
          default: '"primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "custom"',
          description: "The color theme of the blob",
        },
        {
          name: "customColors",
          type: "object",
          default: "undefined",
          description: "Custom colors for the blob when theme is set to 'custom'",
        },
        {
          name: "size",
          type: "string",
          default: '"sm" | "md" | "lg" | "xl" | "full"',
          description: "The size of the blob",
        },
        {
          name: "complexity",
          type: "number",
          default: "3",
          description: "The complexity of the blob shape (1-5)",
        },
        {
          name: "speed",
          type: "number",
          default: "3",
          description: "The speed of the morphing animation (1-5)",
        },
        {
          name: "hoverEffect",
          type: "boolean",
          default: "true",
          description: "Whether to enable the hover effect",
        },
        {
          name: "clickEffect",
          type: "boolean",
          default: "true",
          description: "Whether to enable the click effect",
        },
        {
          name: "pulse",
          type: "boolean",
          default: "false",
          description: "Whether to enable the pulse animation",
        },
        {
          name: "glow",
          type: "boolean",
          default: "true",
          description: "Whether to show a glow effect",
        },
        {
          name: "glowIntensity",
          type: "number",
          default: "3",
          description: "The intensity of the glow effect (1-5)",
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
      name: "Hero Blob",
      preview: (
        <MorphingBlob 
          theme="primary" 
          size="lg" 
          complexity={4} 
          speed={3} 
          glowIntensity={4}
          effect3D={true}
        >
          <div className="text-center p-6">
            <Rocket className="h-10 w-10 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Get Started</h3>
            <p className="text-sm opacity-90 max-w-[180px]">
              Beautiful animated backgrounds for modern UIs
            </p>
          </div>
        </MorphingBlob>
      ),
      filename: "HeroBlob.tsx",
      code: `import { MorphingBlob } from "@/nyxui/components/MorphingBlob";
  import { Rocket } from 'lucide-react';
  
  export function HeroBlob() {
    return (
      <MorphingBlob 
        theme="primary" 
        size="lg" 
        complexity={4} 
        speed={3} 
        glowIntensity={4}
        effect3D={true}
      >
        <div className="text-center p-6">
          <Rocket className="h-10 w-10 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Get Started</h3>
          <p className="text-sm opacity-90 max-w-[180px]">
            Beautiful animated backgrounds for modern UIs
          </p>
        </div>
      </MorphingBlob>
    );
  }`,
    },
    {
      name: "Interactive Icon",
      preview: (
        <MorphingBlob 
          theme="secondary" 
          size="md" 
          complexity={3} 
          speed={4}
          hoverEffect={true}
          clickEffect={true}
          glowIntensity={4}
        >
          <Zap className="h-8 w-8" />
        </MorphingBlob>
      ),
      filename: "InteractiveIcon.tsx",
      code: `import { MorphingBlob } from "@/nyxui/components/MorphingBlob";
  import { Zap } from 'lucide-react';
  
  export function InteractiveIcon() {
    return (
      <MorphingBlob 
        theme="secondary" 
        size="md" 
        complexity={3} 
        speed={4}
        hoverEffect={true}
        clickEffect={true}
        glowIntensity={4}
      >
        <Zap className="h-8 w-8" />
      </MorphingBlob>
    );
  }`,
    },
    {
      name: "Pulsing Feature Card",
      preview: (
        <MorphingBlob 
          theme="success" 
          size="lg" 
          pulse 
          glowIntensity={4}
          effect3D={true}
        >
          <div className="text-center p-6">
            <Shield className="h-10 w-10 mx-auto mb-3" />
            <h4 className="text-xl font-bold mb-2">Security</h4>
            <p className="text-sm opacity-90 max-w-[180px]">
              Enterprise-grade protection for your applications
            </p>
          </div>
        </MorphingBlob>
      ),
      filename: "PulsingFeatureCard.tsx",
      code: `import { MorphingBlob } from "@/nyxui/components/MorphingBlob";
  import { Shield } from 'lucide-react';
  
  export function PulsingFeatureCard() {
    return (
      <MorphingBlob 
        theme="success" 
        size="lg" 
        pulse 
        glowIntensity={4}
        effect3D={true}
      >
        <div className="text-center p-6">
          <Shield className="h-10 w-10 mx-auto mb-3" />
          <h4 className="text-xl font-bold mb-2">Security</h4>
          <p className="text-sm opacity-90 max-w-[180px]">
            Enterprise-grade protection for your applications
          </p>
        </div>
      </MorphingBlob>
    );
  }`,
    },
    {
      name: "Vibrant Gradient",
      preview: (
        <MorphingBlob 
          theme="custom" 
          customColors={{
            from: "#8A2387",
            via: "#E94057",
            to: "#F27121",
          }}
          size="lg"
          complexity={5}
          speed={2}
          glowIntensity={5}
        >
          <div className="text-center p-6">
            <Star className="h-10 w-10 mx-auto mb-3" />
            <h4 className="text-xl font-bold mb-2">Premium</h4>
            <p className="text-sm opacity-90 max-w-[180px]">
              Elevate your UI with custom gradient effects
            </p>
          </div>
        </MorphingBlob>
      ),
      filename: "VibrantGradient.tsx",
      code: `import { MorphingBlob } from "@/nyxui/components/MorphingBlob";
  import { Star } from 'lucide-react';
  
  export function VibrantGradient() {
    return (
      <MorphingBlob 
        theme="custom" 
        customColors={{
          from: "#8A2387",
          via: "#E94057",
          to: "#F27121",
        }}
        size="lg"
        complexity={5}
        speed={2}
        glowIntensity={5}
      >
        <div className="text-center p-6">
          <Star className="h-10 w-10 mx-auto mb-3" />
          <h4 className="text-xl font-bold mb-2">Premium</h4>
          <p className="text-sm opacity-90 max-w-[180px]">
            Elevate your UI with custom gradient effects
          </p>
        </div>
      </MorphingBlob>
    );
  }`,
    },
    {
      name: "3D Effect Blob",
      preview: (
        <MorphingBlob 
          theme="warning" 
          size="lg" 
          complexity={4}
          speed={3}
          glowIntensity={4}
          effect3D={true}
        >
          <div className="text-center p-6">
            <Brain className="h-10 w-10 mx-auto mb-3" />
            <h4 className="text-xl font-bold mb-2">AI Integration</h4>
            <p className="text-sm opacity-90 max-w-[180px]">
              Smart, adaptive components that learn and respond
            </p>
          </div>
        </MorphingBlob>
      ),
      filename: "Effect3DBlob.tsx",
      code: `import { MorphingBlob } from "@/nyxui/components/MorphingBlob";
  import { Brain } from 'lucide-react';
  
  export function Effect3DBlob() {
    return (
      <MorphingBlob 
        theme="warning" 
        size="lg" 
        complexity={4}
        speed={3}
        glowIntensity={4}
        effect3D={true}
      >
        <div className="text-center p-6">
          <Brain className="h-10 w-10 mx-auto mb-3" />
          <h4 className="text-xl font-bold mb-2">AI Integration</h4>
          <p className="text-sm opacity-90 max-w-[180px]">
            Smart, adaptive components that learn and respond
          </p>
        </div>
      </MorphingBlob>
    );
  }`,
    },
    {
      name: "App Button",
      preview: (
        <MorphingBlob 
          theme="accent" 
          size="md"
          complexity={3}
          speed={2}
          glowIntensity={3}
          className="cursor-pointer"
        >
          <div className="flex items-center space-x-2 px-4 py-2">
            <Atom className="h-5 w-5" />
            <span className="font-medium">Launch App</span>
          </div>
        </MorphingBlob>
      ),
      filename: "AppButton.tsx",
      code: `import { MorphingBlob } from "@/nyxui/components/MorphingBlob";
  import { Atom } from 'lucide-react';
  
  export function AppButton() {
    return (
      <MorphingBlob 
        theme="accent" 
        size="md"
        complexity={3}
        speed={2}
        glowIntensity={3}
        className="cursor-pointer"
      >
        <div className="flex items-center space-x-2 px-4 py-2">
          <Atom className="h-5 w-5" />
          <span className="font-medium">Launch App</span>
        </div>
      </MorphingBlob>
    );
  }`,
    },
  ],
}

