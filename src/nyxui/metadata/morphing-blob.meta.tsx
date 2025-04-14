import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import { MorphingBlob } from "@/nyxui/components/MorphingBlob"
import { MorphingBlobDemo } from "@/nyxui/demos/MorphingBlobDemo"
import { Atom, Brain, Rocket, Shield, Star, Zap } from "lucide-react"

import MorphingBlobSource from '!!raw-loader!@/nyxui/components/MorphingBlob.tsx';
import MorphingBlobDemoSource from '!!raw-loader!@/nyxui/demos/MorphingBlobDemo.tsx';

export const morphingBlobData: ComponentData = {
  name: "Morphing Blob",
  description:
    "Interactive blob elements that change shape dynamically. Works as background visuals, buttons, or section transitions. Inspired by AI-generated abstract designs.",
  preview: <MorphingBlobDemo />,
  usage: MorphingBlobDemoSource,
  componentCode: MorphingBlobSource,
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
      name: "Morphing Blob",
      items: [
        {
          name: "theme",
          type: "string",
          default: '"primary"',
          description:
            'The color theme of the blob. Possible values: "primary", "secondary", "accent", "success", "warning", "danger", "custom".',
        },
        {
          name: "customColors",
          type: "object",
          default: "undefined",
          description:
            'Custom colors for the blob when theme is set to "custom". The object should include properties: from, to, and optionally via.',
        },
        {
          name: "size",
          type: "string",
          default: '"md"',
          description:
            'The size of the blob. Possible values: "sm", "md", "lg", "xl", "full".',
        },
        {
          name: "complexity",
          type: "number",
          default: "3",
          description: "The complexity of the blob shape (1-5).",
        },
        {
          name: "speed",
          type: "number",
          default: "3",
          description: "The speed of the morphing animation (1-5).",
        },
        {
          name: "hoverEffect",
          type: "boolean",
          default: "true",
          description: "Whether to enable the hover effect.",
        },
        {
          name: "clickEffect",
          type: "boolean",
          default: "true",
          description: "Whether to enable the click effect.",
        },
        {
          name: "pulse",
          type: "boolean",
          default: "false",
          description: "Whether to enable the pulse animation.",
        },
        {
          name: "glow",
          type: "boolean",
          default: "true",
          description: "Whether to show a glow effect.",
        },
        {
          name: "glowIntensity",
          type: "number",
          default: "3",
          description: "The intensity of the glow effect (1-5).",
        },
        {
          name: "opacity",
          type: "number",
          default: "100",
          description: "The opacity of the blob (percentage).",
        },
        {
          name: "smooth",
          type: "boolean",
          default: "true",
          description:
            "Whether to enable smooth transitions in the morphing animation.",
        },
        {
          name: "effect3D",
          type: "boolean",
          default: "false",
          description: "Whether to enable a 3D effect on the blob.",
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
          description:
            "Content to be rendered inside the blob component.",
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

