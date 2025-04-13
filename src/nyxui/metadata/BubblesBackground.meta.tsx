import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import BubbleBackground from "@/nyxui/components/BubbleBackground"
import {BubblesBackgroundDemo} from "@/nyxui/demos/BubblesBackgroundDemo"
import fs from "fs"
import path from "path"

const componentPath = path.join(process.cwd(), "src/nyxui/components/BubbleBackground.tsx")
const BubbleBackgroundSource = fs.readFileSync(componentPath, "utf8")

const demoPath = path.join(process.cwd(), "src/nyxui/demos/BubblesBackgroundDemo.tsx")
const BubblesBackgroundDemoSource = fs.readFileSync(demoPath, "utf8")

export const bubbleBackgroundData: ComponentData = {
  name: "Bubbles Background",
  description:
    "An interactive fluid bubble background component with animated colorful blobs that respond to user interaction, perfect for creating engaging and playful UI backgrounds.",
  preview: <BubblesBackgroundDemo />,
  usage: BubblesBackgroundDemoSource,
  componentCode: BubbleBackgroundSource,
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
      name: "Bubble Background",
      items: [
        {
          name: "backgroundColorA",
          type: "string",
          default: '"rgb(108, 0, 162)"',
          description: "First color for the background gradient.",
        },
        {
          name: "backgroundColorB",
          type: "string",
          default: '"rgb(0, 17, 82)"',
          description: "Second color for the background gradient.",
        },
        {
          name: "bubbleColors",
          type: "object",
          default: `{
            colorA: "18, 113, 255",
            colorB: "221, 74, 255", 
            colorC: "100, 220, 255",
            colorD: "200, 50, 50",
            colorE: "180, 180, 50",
            interactive: "148, 100, 255"
          }`,
          description: "RGB color values for different bubbles and the interactive bubble.",
        },
        {
          name: "blendMode",
          type: "string",
          default: '"hard-light"',
          description: "CSS blend mode for the bubble elements.",
        },
        {
          name: "bubbleSize",
          type: "string",
          default: '"80%"',
          description: "Size of the bubble elements relative to the container.",
        },
      ],
    },
  ],
  
  category: "Background",
  new: true,
  examples: [
    {
      name: "Default Bubble Background",
      preview: (
        <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
          <BubbleBackground />
        </div>
      ),
      filename: "DefaultBubbleBackground.tsx",
      code: `import { BubbleBackground } from "@/nyxui/components/BubbleBackground";
    
  export function DefaultBubbleBackground() {
    return (
      <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
        <BubbleBackground />
      </div>
    );
  }`,
    },
    {
      name: "Custom Colors",
      preview: (
        <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
          <BubbleBackground
            backgroundColorA="rgb(0, 78, 146)"
            backgroundColorB="rgb(0, 28, 73)"
            bubbleColors={{
              colorA: "0, 153, 255",
              colorB: "72, 202, 228",
              colorC: "0, 180, 216",
              colorD: "144, 224, 239",
              colorE: "72, 149, 239",
              interactive: "0, 119, 182"
            }}
          />
        </div>
      ),
      filename: "OceanBubbles.tsx",
      code: `import { BubbleBackground } from "@/nyxui/components/BubbleBackground";
    
  export function OceanBubbles() {
    return (
      <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
        <BubbleBackground
          backgroundColorA="rgb(0, 78, 146)"
          backgroundColorB="rgb(0, 28, 73)"
          bubbleColors={{
            colorA: "0, 153, 255",
            colorB: "72, 202, 228",
            colorC: "0, 180, 216",
            colorD: "144, 224, 239",
            colorE: "72, 149, 239",
            interactive: "0, 119, 182"
          }}
        />
      </div>
    );
  }`,
    },
    {
      name: "Sunset Theme",
      preview: (
        <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
          <BubbleBackground
            backgroundColorA="rgb(252, 70, 107)"
            backgroundColorB="rgb(63, 94, 251)"
            bubbleColors={{
              colorA: "252, 70, 107",
              colorB: "254, 130, 68",
              colorC: "255, 207, 115",
              colorD: "240, 169, 135",
              colorE: "251, 215, 134",
              interactive: "242, 112, 89"
            }}
            blendMode="screen"
          />
        </div>
      ),
      filename: "SunsetBubbles.tsx",
      code: `import { BubbleBackground } from "@/nyxui/components/BubbleBackground";
    
  export function SunsetBubbles() {
    return (
      <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
        <BubbleBackground
          backgroundColorA="rgb(252, 70, 107)"
          backgroundColorB="rgb(63, 94, 251)"
          bubbleColors={{
            colorA: "252, 70, 107",
            colorB: "254, 130, 68",
            colorC: "255, 207, 115",
            colorD: "240, 169, 135",
            colorE: "251, 215, 134",
            interactive: "242, 112, 89"
          }}
          blendMode="screen"
        />
      </div>
    );
  }`,
    },
    {
      name: "Neon Theme",
      preview: (
        <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
          <BubbleBackground
            backgroundColorA="rgb(0, 0, 0)"
            backgroundColorB="rgb(20, 20, 20)"
            bubbleColors={{
              colorA: "255, 0, 153",
              colorB: "0, 255, 179",
              colorC: "255, 0, 255",
              colorD: "0, 255, 255",
              colorE: "255, 255, 0",
              interactive: "0, 255, 0"
            }}
            blendMode="screen"
            bubbleSize="85%"
          />
        </div>
      ),
      filename: "NeonBubbles.tsx",
      code: `import { BubbleBackground } from "@/nyxui/components/BubbleBackground";
    
  export function NeonBubbles() {
    return (
      <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
        <BubbleBackground
          backgroundColorA="rgb(0, 0, 0)"
          backgroundColorB="rgb(20, 20, 20)"
          bubbleColors={{
            colorA: "255, 0, 153",
            colorB: "0, 255, 179",
            colorC: "255, 0, 255",
            colorD: "0, 255, 255",
            colorE: "255, 255, 0",
            interactive: "0, 255, 0"
          }}
          blendMode="screen"
          bubbleSize="85%"
        />
      </div>
    );
  }`,
    },
    {
      name: "Pastel Theme",
      preview: (
        <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
          <BubbleBackground
            backgroundColorA="rgb(255, 245, 245)"
            backgroundColorB="rgb(245, 245, 255)"
            bubbleColors={{
              colorA: "249, 188, 188",
              colorB: "188, 209, 246",
              colorC: "203, 249, 188",
              colorD: "244, 188, 249",
              colorE: "249, 236, 188",
              interactive: "188, 249, 245"
            }}
            blendMode="multiply"
          />
        </div>
      ),
      filename: "PastelBubbles.tsx",
      code: `import { BubbleBackground } from "@/nyxui/components/BubbleBackground";
    
  export function PastelBubbles() {
    return (
      <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
        <BubbleBackground 
          backgroundColorA="rgb(255, 245, 245)"
          backgroundColorB="rgb(245, 245, 255)"
          bubbleColors={{
            colorA: "249, 188, 188",
            colorB: "188, 209, 246",
            colorC: "203, 249, 188",
            colorD: "244, 188, 249",
            colorE: "249, 236, 188",
            interactive: "188, 249, 245"
          }}
          blendMode="multiply"
        />
      </div>
    );
  }`,
    },
    {
      name: "With Custom Link",
      preview: (
        <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
          <BubbleBackground/>
        </div>
      ),
      filename: "BubbleBackgroundWithLink.tsx",
      code: `import { BubbleBackground } from "@/nyxui/components/BubbleBackground";
    
  export function BubbleBackgroundWithLink() {
    return (
      <div className="relative h-[400px] w-[1000px] overflow-hidden bg-transparent">
        <BubbleBackground/>
      </div>
    );
  }`,
    },
  ]
}