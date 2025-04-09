import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import { GlitchButtonDemo } from "@/nyxui/demos/GlitchButtonDemo"
import { GlitchButton } from "@/nyxui/components/GlitchButton"
import { ArrowRight, Download, Info, Mail, Power, ShieldCheck } from "lucide-react"
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/GlitchButton.tsx");
const GlitchButtonSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/GlitchButtonDemo.tsx");
const GlitchButtonDemoSource = fs.readFileSync(demoPath, "utf8");

export const glitchButtonData: ComponentData = {
  name: "Glitch Button",
  description:
    "Cyberpunk-inspired buttons with glitch effects that can be triggered on hover or click. Features customizable colors, intensities, and animations for a digital distortion effect.",
  preview: <GlitchButtonDemo />,
  usage: GlitchButtonDemoSource,
  componentCode: GlitchButtonSource,
  dependencies: [
    {
      name: "Tailwind Merge",
      description: "Utility function for conditional class name merging.",
      install: {
        npm: "npm install tailwind-merge",
        pnpm: "pnpm add tailwind-merge",
        yarn: "yarn add tailwind-merge",
        bun: "bun add tailwind-merge",
      },
    },
  ],
  
  props: [
    {
      name: "Glitch Button",
      items: [
        {
          name: "glitchIntensity",
          type: "string",
          default: '"medium"',
          description:
            'The intensity of the glitch effect. Possible values: "low", "medium", "high".',
        },
        {
          name: "glitchOnHover",
          type: "boolean",
          default: "true",
          description:
            "Whether to trigger glitch effects when hovering over the button.",
        },
        {
          name: "borderColor",
          type: "string",
          default: '"white"',
          description:
            "Custom border color for the glitch effect.",
        },
        {
          name: "glitchAlways",
          type: "boolean",
          default: "false",
          description:
            "Whether to continuously display the glitch effect regardless of hover/click state.",
        },
        {
          name: "glitchColors",
          type: "object",
          default: "{ primary: '#ef00ef', secondary: '#00ffff' }",
          description:
            "Custom colors for the glitch effect. The object should include properties: primary and secondary.",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description:
            "Additional CSS classes to apply. Background and text colors are detected from these classes.",
        },
        {
          name: "onClick",
          type: "function",
          default: "undefined",
          description:
            "Function to call when the button is clicked.",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "undefined",
          description:
            "Content of the button.",
        },
      ],
    },
  ],
  
  category: "Buttons",
  examples: [
    {
      name: "Default Cyberpunk Style",
      preview: (
        <GlitchButton 
          glitchIntensity="medium" 
          glitchOnHover={true}
        >
          SYSTEM ACCESS
        </GlitchButton>
      ),
      filename: "DefaultGlitchButton.tsx",
      code: `import { GlitchButton } from "@/nyxui/components/GlitchButton";
  
export function DefaultGlitchButton() {
  return (
    <GlitchButton 
      glitchIntensity="medium" 
      glitchOnHover={true}
    >
      SYSTEM ACCESS
    </GlitchButton>
  );
}`,
    },
    {
      name: "Continuous Glitch Effect",
      preview: (
        <GlitchButton 
          glitchIntensity="low" 
          glitchAlways={true}
        >
          <div className="flex items-center"><Power className="mr-2 h-5 w-5" /><span>SYSTEM ACTIVE</span></div>
        </GlitchButton>
      ),
      filename: "AlwaysGlitchButton.tsx",
      code: `import { GlitchButton } from "@/nyxui/components/GlitchButton";
import { Power } from 'lucide-react';
  
export function AlwaysGlitchButton() {
  return (
    <GlitchButton 
      glitchIntensity="low" 
      glitchAlways={true}
    >
      <div className="flex items-center"><Power className="mr-2 h-5 w-5" /><span>SYSTEM ACTIVE</span></div>
    </GlitchButton>
  );
}`,
    },
    {
      name: "High Intensity Download Button",
      preview: (
        <GlitchButton 
          glitchIntensity="high" 
          glitchOnHover={true}
          className="bg-black text-green-400 rounded-md"
        >
          <div className="flex items-center"><Download className="mr-2 h-5 w-5" /><span>DOWNLOAD</span></div>
        </GlitchButton>
      ),
      filename: "HighIntensityButton.tsx",
      code: `import { GlitchButton } from "@/nyxui/components/GlitchButton";
import { Download } from 'lucide-react';
  
export function HighIntensityButton() {
  return (
    <GlitchButton 
      glitchIntensity="high" 
      glitchOnHover={true}
      className="bg-black text-green-400 rounded-md"
    >
      <div className="flex items-center"><Download className="mr-2 h-5 w-5" /><span>DOWNLOAD</span></div>
    </GlitchButton>
  );
}`,
    },
    {
      name: "Custom Colors Warning Button",
      preview: (
        <GlitchButton 
          glitchIntensity="medium" 
          glitchOnHover={true}
          glitchColors={{
            primary: '#ff3e00',
            secondary: '#ffcc00'
          }}
          className="bg-red-900 text-yellow-300 rounded-lg"
        >
          <div className="flex items-center"><ShieldCheck className="mr-2 h-5 w-5" /><span>WARNING</span></div>
        </GlitchButton>
      ),
      filename: "WarningGlitchButton.tsx",
      code: `import { GlitchButton } from "@/nyxui/components/GlitchButton";
import { ShieldCheck } from 'lucide-react';
  
export function WarningGlitchButton() {
  return (
    <GlitchButton 
      glitchIntensity="medium" 
      glitchOnHover={true}
      glitchColors={{
        primary: '#ff3e00',
        secondary: '#ffcc00'
      }}
      className="bg-red-900 text-yellow-300 rounded-lg"
    >
      <div className="flex items-center"><ShieldCheck className="mr-2 h-5 w-5" /><span>WARNING</span></div>
    </GlitchButton>
  );
}`,
    },
    {
      name: "Neon Blue Subscribe Button",
      preview: (
        <GlitchButton 
          glitchIntensity="medium" 
          glitchOnHover={true}
          glitchColors={{
            primary: '#00aaff',
            secondary: '#0044ff'
          }}
          className="bg-blue-950 text-blue-300"
        >
          <div className="flex items-center"><Mail className="mr-2 h-5 w-5" /><span>SUBSCRIBE</span></div>
        </GlitchButton>
      ),
      filename: "NeonBlueButton.tsx",
      code: `import { GlitchButton } from "@/nyxui/components/GlitchButton";
import { Mail } from 'lucide-react';
  
export function NeonBlueButton() {
  return (
    <GlitchButton 
      glitchIntensity="medium" 
      glitchOnHover={true}
      glitchColors={{
        primary: '#00aaff',
        secondary: '#0044ff'
      }}
      className="bg-blue-950 text-blue-300"
    >
      <div className="flex items-center"><Mail className="mr-2 h-5 w-5" /><span>SUBSCRIBE</span></div>
    </GlitchButton>
  );
}`,
    },
    {
      name: "Call To Action Button",
      preview: (
        <GlitchButton 
          glitchIntensity="high"
          glitchOnHover={true}
          className="bg-slate-900 text-white text-xl"
        >
          <div className="flex items-center gap-2">
            <span>ENTER THE VOID</span>
            <ArrowRight className="h-5 w-5" />
          </div>
        </GlitchButton>
      ),
      filename: "CTAGlitchButton.tsx",
      code: `import { GlitchButton } from "@/nyxui/components/GlitchButton";
import { ArrowRight } from 'lucide-react';
  
export function CTAGlitchButton() {
  return (
    <GlitchButton 
      glitchIntensity="high"
      glitchOnHover={true}
      className="bg-slate-900 text-white text-xl"
    >
      <div className="flex items-center gap-2">
        <span>ENTER THE VOID</span>
        <ArrowRight className="h-5 w-5" />
      </div>
    </GlitchButton>
  );
}`,
    },
    {
      name: "Info Button with Subtle Glitch",
      preview: (
        <GlitchButton 
          glitchIntensity="low"
          glitchOnHover={true}
          glitchColors={{
            primary: '#5500ff',
            secondary: '#00ddff'
          }}
          className="bg-indigo-800 text-indigo-100 rounded-lg"
        >
          <div className="flex items-center"><Info className="mr-2 h-5 w-5" /><span>MORE INFO</span></div>
        </GlitchButton>
      ),
      filename: "InfoGlitchButton.tsx",
      code: `import { GlitchButton } from "@/nyxui/components/GlitchButton";
import { Info } from 'lucide-react';
  
export function InfoGlitchButton() {
  return (
    <GlitchButton 
      glitchIntensity="low"
      glitchOnHover={true}
      glitchColors={{
        primary: '#5500ff',
        secondary: '#00ddff'
      }}
      className="bg-indigo-800 text-indigo-100 rounded-lg"
    >
      <div className="flex items-center"><Info className="mr-2 h-5 w-5" /><span>MORE INFO</span></div>
    </GlitchButton>
  );
}`,
    },
  ]
}