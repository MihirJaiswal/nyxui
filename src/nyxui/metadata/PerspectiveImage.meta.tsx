import type { ComponentData } from "./ComponentInterfaces"
import { PerspectiveImage } from "@/nyxui/components/PerspectiveImage"
import { PerspectiveImageDemo } from "@/nyxui/demos/PerspectiveImageDemo"

export const perspectiveImageData: ComponentData = {
  name: "3D Perspective Image",
  description:
    "Images that tilt and rotate dynamically when hovered. Can create a depth illusion effect similar to parallax. Works well for product showcases and eCommerce sites.",
  preview: <PerspectiveImageDemo />,
  usage: `import { PerspectiveImage } from "@/components/PerspectiveImage"

export function MyComponent() {
  return (
    <PerspectiveImage
      src="/path/to/image.jpg"
      alt="Product image"
      width={400}
      height={300}
      intensity={15}
      shine={true}
      shadow={true}
    />
  )
}`,
  componentCode: `// Full component code available in the PerspectiveImage.tsx file`,
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
          type: "string",
          default: '"top" | "center"',
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
          type: "ReactNode",
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
      name: "Dynamic Tilt",
      preview: (
        <div className="flex justify-center p-4">
          <PerspectiveImage
            src="https://www.coolkatana.com/cdn/shop/articles/16856.jpg?v=1721716639"
            alt="Dynamic Tilt Image"
            width={320}
            height={240}
            intensity={18}
            perspective={900}
            shine={true}
            shadow={true}
            glare={true}
            glareOpacity={0.25}
            borderRadius="10px"
          />
        </div>
      ),
      filename: "DynamicTilt.tsx",
      code: `import { PerspectiveImage } from "@/components/PerspectiveImage";
  
  export function DynamicTilt() {
    return (
      <div className="flex justify-center p-4">
        <PerspectiveImage
          src="/placeholder.svg?height=300&width=400"
          alt="Dynamic Tilt Image"
          width={320}
          height={240}
          intensity={18}
          perspective={900}
          shine={true}
          shadow={true}
          glare={true}
          glareOpacity={0.25}
          borderRadius="10px"
        />
      </div>
    );
  }`,
    },
    {
      name: "Framed Image",
      preview: (
        <div className="flex justify-center p-4">
          <PerspectiveImage
            src="https://images6.alphacoders.com/132/1325915.png"
            alt="Framed Image"
            width={350}
            height={250}
            intensity={12}
            perspective={1100}
            shine={false}
            shadow={true}
            border={true}
            borderColor="rgba(200, 200, 200, 0.5)"
            borderWidth={3}
            borderRadius="16px"
            glare={false}
          />
        </div>
      ),
      filename: "FramedImage.tsx",
      code: `import { PerspectiveImage } from "@/components/PerspectiveImage";
  
  export function FramedImage() {
    return (
      <div className="flex justify-center p-4">
        <PerspectiveImage
          src="/placeholder.svg?height=300&width=400"
          alt="Framed Image"
          width={350}
          height={250}
          intensity={12}
          perspective={1100}
          shine={false}
          shadow={true}
          border={true}
          borderColor="rgba(200, 200, 200, 0.5)"
          borderWidth={3}
          borderRadius="16px"
          glare={false}
        />
      </div>
    );
  }`,
    },
  ]
  
}

