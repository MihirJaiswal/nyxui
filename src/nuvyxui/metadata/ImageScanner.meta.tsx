import type { ComponentData } from "@/nuvyxui/ComponentInterfaces"
import { ImageScanner } from "@/nuvyxui/components/ImageScanner"
import { ImageScannerDemo } from "@/nuvyxui/demos/ImageScannerDemo"

import ImageScannerSource from '!!raw-loader!@/nuvyxui/components/ImageScanner.tsx';
import ImageScannerDemoSource from '!!raw-loader!@/nuvyxui/demos/ImageScannerDemo.tsx';

export const imageScannerData: ComponentData = {
  name: "Image Scanner",
  description:
    "A dynamic component that applies interactive scanning effects to images, supporting various scan patterns, directions, and customizable properties for creating engaging visual elements.",
  preview: <ImageScannerDemo />,
  usage: ImageScannerDemoSource,
  componentCode: ImageScannerSource,
  dependencies: [
    {
      name: "Framer Motion",
      description: "Animation library used for creating fluid scanning effects.",
      install: {
        npm: "npm install framer-motion",
        pnpm: "pnpm add framer-motion",
        yarn: "yarn add framer-motion",
        bun: "bun add framer-motion",
      },
    },
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
      name: "Image Scanner",
      items: [
        {
          name: "image",
          type: "string",
          default: "undefined",
          description: "URL or path to the image to be scanned.",
        },
        {
          name: "alt",
          type: "string",
          default: '"Scanning image"',
          description: "Alternative text for the image.",
        },
        {
          name: "scanDirection",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Direction of the scanning effect.",
        },
        {
          name: "scanSpeed",
          type: "number",
          default: "2",
          description: "Speed of the scanning animation in seconds.",
        },
        {
          name: "scanColor",
          type: '"emerald" | "blue" | "purple" | "amber" | "red"',
          default: '"emerald"',
          description: "Color of the scanning effect.",
        },
        {
          name: "scanType",
          type: '"line" | "corners" | "both"',
          default: '"both"',
          description: "Type of scanning visual effect to display.",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes to apply to the container.",
        },
        {
          name: "onScanComplete",
          type: "() => void",
          default: "undefined",
          description: "Callback function triggered when scanning is complete.",
        },
        {
          name: "autoScan",
          type: "boolean",
          default: "false",
          description: "Automatically start scanning when component mounts.",
        },
        {
          name: "scanDelay",
          type: "number",
          default: "0",
          description: "Delay in seconds before starting the auto scan.",
        },
        {
          name: "scanAtScroll",
          type: "boolean",
          default: "false",
          description: "Trigger scan when component is scrolled into view.",
        },
        {
          name: "repeating",
          type: "boolean",
          default: "false",
          description: "Enable repeated scanning in a loop.",
        },
        {
          name: "triggerScan",
          type: "boolean",
          default: "false",
          description: "Externally trigger the scanning effect.",
        },
      ],
    },
  ],
  
  category: "Interactive tools",
  examples: [
    {
      name: "Horizontal Line Scan",
      preview: (
        <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Repeating</h1>
          <ImageScanner 
            image="/assets/images/image-scanner/resume.png" 
            scanDirection="horizontal" 
            scanColor="emerald"
            repeating
          />
        </div>
      ),
      filename: "HorizontalLineScan.tsx",
      code: `import { ImageScanner } from "@/nuvyxui/components/ImageScanner";
    
export function HorizontalLineScan() {
  return (
    <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Repeating with line only</h1>
          <ImageScanner 
            image="/img.png" 
            scanDirection="horizontal" 
            scanColor="emerald"
            repeating
          />
        </div>
  );
}`,
    },
    {
      name: "Vertical Line Scan",
      preview: (
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-center">Scan on scroll</h1>
          <ImageScanner 
            image="/assets/images/image-scanner/id.png" 
            scanDirection="vertical"
            scanColor="red"
            scanAtScroll
            repeating
          />
        </div>
      ),
      filename: "VerticalLineScan.tsx",
      code: `import { ImageScanner } from "@/nuvyxui/components/ImageScanner";
    
export function VerticalLineScan() {
  return (
    <div className="w-full max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-center">Scan on scroll</h1>
          <ImageScanner 
            image="/img2.jpg" 
            scanDirection="vertical"
            scanColor="red"
            scanAtScroll
            repeating
          />
        </div>
  );
}`,
    },
  ]
}