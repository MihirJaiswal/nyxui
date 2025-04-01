import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import { PerspectiveImage } from "@/nyxui/components/PerspectiveImage"
import { PerspectiveImageDemo } from "@/nyxui/demos/PerspectiveImageDemo"
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/PerspectiveImage.tsx");
const PerspectiveImageSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/PerspectiveImageDemo.tsx");
const PerspectiveImageDemoSource = fs.readFileSync(demoPath, "utf8");

export const perspectiveImageData: ComponentData = {
  name: "3D Perspective Image",
  description:
    "Images that tilt and rotate dynamically when hovered. Can create a depth illusion effect similar to parallax. Works well for product showcases and eCommerce sites.",
  preview: <PerspectiveImageDemo />,
  usage: PerspectiveImageDemoSource,
  componentCode: PerspectiveImageSource,
  dependencies: [
    {
      name: "Framer Motion",
      description: "Production-ready motion library for React for creating animations and interactive UI elements.",
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
      name: "PerspectiveImage",
      items: [
        {
          name: "src",
          type: "string",
          default: "required",
          description: "Source URL of the image",
        },
        {
          name: "alt",
          type: "string",
          default: "required",
          description: "Alt text for the image",
        },
        {
          name: "width",
          type: "number",
          default: "undefined",
          description: "Width of the image in pixels",
        },
        {
          name: "height",
          type: "number",
          default: "undefined",
          description: "Height of the image in pixels",
        },
        {
          name: "intensity",
          type: "number",
          default: "15",
          description: "Intensity of the tilt effect",
        },
        {
          name: "perspective",
          type: "number",
          default: "1000",
          description: "Perspective value for the 3D effect",
        },
        {
          name: "shine",
          type: "boolean",
          default: "true",
          description: "Whether to show a shine effect on hover",
        },
        {
          name: "shadow",
          type: "boolean",
          default: "true",
          description: "Whether to show a shadow effect",
        },
        {
          name: "border",
          type: "boolean",
          default: "false",
          description: "Whether to show a border",
        },
        {
          name: "borderColor",
          type: "string",
          default: '"rgba(255, 255, 255, 0.2)"',
          description: "Color of the border if enabled",
        },
        {
          name: "borderWidth",
          type: "number",
          default: "1",
          description: "Width of the border in pixels if enabled",
        },
        {
          name: "borderRadius",
          type: "string | number",
          default: '"0.5rem"',
          description: "Border radius of the image",
        },
        {
          name: "glare",
          type: "boolean",
          default: "true",
          description: "Whether to show a glare effect on hover",
        },
        {
          name: "glareOpacity",
          type: "number",
          default: "0.2",
          description: "Opacity of the glare effect",
        },
        {
          name: "glareColor",
          type: "string",
          default: '"rgba(255, 255, 255, 0.8)"',
          description: "Color of the glare effect",
        },
        {
          name: "glarePosition",
          type: '"top" | "center"',
          default: '"top"',
          description: "Position of the glare effect",
        },
        {
          name: "parallax",
          type: "boolean",
          default: "false",
          description: "Whether to enable parallax layers",
        },
        {
          name: "parallaxItems",
          type: "React.ReactNode",
          default: "undefined",
          description: "React nodes to use as parallax layers",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Whether the effect is disabled",
        },
        {
          name: "priority",
          type: "boolean",
          default: "false",
          description: "Whether the image should be prioritized for loading",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Additional CSS classes for the container",
        },
        {
          name: "imageClassName",
          type: "string",
          default: '""',
          description: "Additional CSS classes for the image",
        },
      ],
    },
  ],
  
  category: "Effects",
  examples: [
    {
      name: "Glossy Product Card",
      preview: (
        <div className="flex justify-center p-8 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl">
          <div className="relative">
            <PerspectiveImage
              src="https://raw.githubusercontent.com/MihirJaiswal/monsterpedia/refs/heads/main/public/pikachu.jpg"
              alt="Pikachu Product Display"
              width={320}
              height={240}
              intensity={20}
              perspective={1200}
              shine={true}
              shadow={true}
              glare={true}
              glareOpacity={0.35}
              borderRadius="12px"
              className="z-10"
            />
            <div className="absolute -bottom-4 inset-x-0 h-8 bg-black/50 blur-xl rounded-full z-0" />
          </div>
        </div>
      ),
      filename: "GlossyProductCard.tsx",
      code: `import { PerspectiveImage } from "@/components/PerspectiveImage";
  
  export function GlossyProductCard() {
    return (
      <div className="flex justify-center p-8 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl">
        <div className="relative">
          <PerspectiveImage
            src="https://raw.githubusercontent.com/MihirJaiswal/monsterpedia/refs/heads/main/public/pikachu.jpg"
            alt="Pikachu Product Display"
            width={320}
            height={240}
            intensity={20}
            perspective={1200}
            shine={true}
            shadow={true}
            glare={true}
            glareOpacity={0.35}
            borderRadius="12px"
            className="z-10"
          />
          <div className="absolute -bottom-4 inset-x-0 h-8 bg-black/50 blur-xl rounded-full z-0" />
        </div>
      </div>
    );
  }`,
    },
    {
      name: "Elegant Gallery Frame",
      preview: (
        <div className="flex justify-center p-6 bg-stone-100">
          <div className="p-3 bg-white rounded-2xl shadow-lg">
            <PerspectiveImage
              src="https://raw.githubusercontent.com/MihirJaiswal/monsterpedia/refs/heads/main/public/pikachu.jpg"
              alt="Pikachu Gallery Display"
              width={350}
              height={250}
              intensity={12}
              perspective={1100}
              shine={false}
              shadow={true}
              border={true}
              borderColor="rgba(220, 220, 220, 0.8)"
              borderWidth={4}
              borderRadius="8px"
              glare={true}
              glarePosition="center"
              glareOpacity={0.15}
              glareColor="rgba(255, 255, 255, 0.9)"
              imageClassName="grayscale hover:grayscale-0 transition-all duration-300"
            />
            <div className="mt-3 text-center font-serif text-sm text-gray-700">Pikachu, 2025</div>
          </div>
        </div>
      ),
      filename: "ElegantGalleryFrame.tsx",
      code: `import { PerspectiveImage } from "@/components/PerspectiveImage";
  
  export function ElegantGalleryFrame() {
    return (
      <div className="flex justify-center p-6 bg-stone-100">
        <div className="p-3 bg-white rounded-2xl shadow-lg">
          <PerspectiveImage
            src="https://raw.githubusercontent.com/MihirJaiswal/monsterpedia/refs/heads/main/public/pikachu.jpg"
            alt="Pikachu Gallery Display"
            width={350}
            height={250}
            intensity={12}
            perspective={1100}
            shine={false}
            shadow={true}
            border={true}
            borderColor="rgba(220, 220, 220, 0.8)"
            borderWidth={4}
            borderRadius="8px"
            glare={true}
            glarePosition="center"
            glareOpacity={0.15}
            glareColor="rgba(255, 255, 255, 0.9)"
            imageClassName="grayscale hover:grayscale-0 transition-all duration-300"
          />
          <div className="mt-3 text-center font-serif text-sm text-gray-700">Pikachu, 2025</div>
        </div>
      </div>
    );
  }`,
    },
    {
      name: "Interactive Game Card",
      preview: (
        <div className="flex justify-center p-6 bg-gradient-to-r from-yellow-400 to-amber-500">
          <div className="relative">
            <PerspectiveImage
              src="https://raw.githubusercontent.com/MihirJaiswal/monsterpedia/refs/heads/main/public/pikachu.jpg"
              alt="Pikachu Character Card"
              width={300}
              height={400}
              intensity={25}
              perspective={800}
              shine={true}
              shadow={true}
              border={true}
              borderColor="rgba(255, 215, 0, 0.6)"
              borderWidth={2}
              borderRadius="16px"
              glare={true}
              glareOpacity={0.4}
              parallax={true}
              parallaxItems={
                <>
                  <div style={{ top: '10%', left: '10%', fontSize: '24px', fontWeight: 'bold', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Pikachu
                  </div>
                  <div style={{ bottom: '10%', right: '10%', backgroundColor: 'rgba(0,0,0,0.7)', padding: '8px 12px', borderRadius: '20px', color: 'yellow', fontWeight: 'bold' }}>
                    HP: 100
                  </div>
                  <div style={{ top: '20%', right: '10%', backgroundColor: 'rgba(255,255,255,0.9)', padding: '6px', borderRadius: '50%' }}>
                    ⚡
                  </div>
                </>
              }
            />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-amber-600 text-white font-bold rounded-full shadow-lg">
              Collect Now!
            </div>
          </div>
        </div>
      ),
      filename: "InteractiveGameCard.tsx",
      code: `import { PerspectiveImage } from "@/components/PerspectiveImage";
  
  export function InteractiveGameCard() {
    return (
      <div className="flex justify-center p-6 bg-gradient-to-r from-yellow-400 to-amber-500">
        <div className="relative">
          <PerspectiveImage
            src="https://raw.githubusercontent.com/MihirJaiswal/monsterpedia/refs/heads/main/public/pikachu.jpg"
            alt="Pikachu Character Card"
            width={300}
            height={400}
            intensity={25}
            perspective={800}
            shine={true}
            shadow={true}
            border={true}
            borderColor="rgba(255, 215, 0, 0.6)"
            borderWidth={2}
            borderRadius="16px"
            glare={true}
            glareOpacity={0.4}
            parallax={true}
            parallaxItems={
              <>
                <div style={{ top: '10%', left: '10%', fontSize: '24px', fontWeight: 'bold', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  Pikachu
                </div>
                <div style={{ bottom: '10%', right: '10%', backgroundColor: 'rgba(0,0,0,0.7)', padding: '8px 12px', borderRadius: '20px', color: 'yellow', fontWeight: 'bold' }}>
                  HP: 100
                </div>
                <div style={{ top: '20%', right: '10%', backgroundColor: 'rgba(255,255,255,0.9)', padding: '6px', borderRadius: '50%' }}>
                  ⚡
                </div>
              </>
            }
          />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-amber-600 text-white font-bold rounded-full shadow-lg">
            Collect Now!
          </div>
        </div>
      </div>
    );
  }`,
    },
  ]
  
}

