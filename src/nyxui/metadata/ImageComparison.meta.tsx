import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import { ImageSlider, ImageLayer, Divider } from "@/nyxui/components/ImageComparison"
import { ImageComparisonDemo } from "@/nyxui/demos/ImageComparisonDemo"
import { ArrowUpDown } from "lucide-react"
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/ImageComparison.tsx");
const ImageComparisonSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/ImageComparisonDemo.tsx");
const ImageComparisonDemoSource = fs.readFileSync(demoPath, "utf8");

export const imageComparisonData: ComponentData = {
  name: "Image Comparison",
  description:
    "An interactive image comparison slider that allows users to drag or hover to reveal two different images. Perfect for before/after comparisons with horizontal or vertical orientations.",
  preview: <ImageComparisonDemo />,
  usage: ImageComparisonDemoSource,
  componentCode: ImageComparisonSource,
  dependencies: [
    {
      name: "Framer Motion",
      description: "Animation library for React.",
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
      name: "ImageComparison",
      items: [
        {
          name: "children",
          type: "React.ReactNode",
          default: "undefined",
          description:
            "Content of the slider, typically ImageLayer components and a Divider.",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description:
            "Additional CSS classes to apply to the container.",
        },
        {
          name: "hoverControl",
          type: "boolean",
          default: "false",
          description:
            "Whether to control the slider by hovering instead of dragging.",
        },
        {
          name: "orientation",
          type: "string",
          default: '"horizontal"',
          description:
            'The orientation of the slider. Possible values: "horizontal", "vertical".',
        },
        {
          name: "defaultPosition",
          type: "number",
          default: "50",
          description:
            "The initial position of the divider as a percentage (0-100).",
        },
        {
          name: "animationConfig",
          type: "Partial<AnimationOptions>",
          default: "{ damping: 15, stiffness: 400, mass: 0.4 }",
          description:
            "Framer Motion spring animation options for the slider movement.",
        },
        {
          name: "dividerColor",
          type: "string",
          default: '"#ffffff"',
          description:
            "Color of the divider line.",
        },
      ],
    },
    {
      name: "ImageLayer",
      items: [
        {
          name: "className",
          type: "string",
          default: '""',
          description:
            "Additional CSS classes to apply to the image.",
        },
        {
          name: "alt",
          type: "string",
          default: "undefined",
          description:
            "Alt text for the image (required for accessibility).",
        },
        {
          name: "src",
          type: "string",
          default: "undefined",
          description:
            "Source URL of the image.",
        },
        {
          name: "layer",
          type: "string",
          default: "undefined",
          description:
            'Which side of the divider this image appears on. Possible values: "first", "second".',
        },
        {
          name: "loading",
          type: "string",
          default: '"eager"',
          description:
            'Image loading behavior. Possible values: "lazy", "eager".',
        },
        {
          name: "priority",
          type: "boolean",
          default: "false",
          description:
            "Whether the image should be considered high priority for loading.",
        },
      ],
    },
    {
      name: "Divider",
      items: [
        {
          name: "className",
          type: "string",
          default: '""',
          description:
            "Additional CSS classes to apply to the divider.",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "undefined",
          description:
            "Custom content to display in the handle.",
        },
        {
          name: "width",
          type: "number",
          default: "2",
          description:
            "Width of the divider line in pixels.",
        },
        {
          name: "showHandle",
          type: "boolean",
          default: "true",
          description:
            "Whether to show the handle on the divider.",
        },
        {
          name: "handleSize",
          type: "number",
          default: "24",
          description:
            "Size of the handle in pixels.",
        },
        {
          name: "handleColor",
          type: "string",
          default: "undefined",
          description:
            "Color of the handle. Defaults to divider color if not specified.",
        },
        {
          name: "handleIcon",
          type: "React.ReactNode",
          default: "undefined",
          description:
            "Custom icon to display in the handle.",
        },
        {
          name: "hitAreaSize",
          type: "number",
          default: "20",
          description:
            "Size of the invisible hit area around the divider to make it easier to grab.",
        },
      ],
    },
  ],
  
  category: "Interactive tools",
  examples: [
    {
      name: "Basic Horizontal Comparison",
      preview: (
        <div className="space-y-4 w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold">Vertical Slider</h2>
      <p className="text-gray-500">Compare images with a vertical divider.</p>
      
      <ImageSlider 
        className="h-96 border rounded-xl overflow-hidden" 
        orientation="vertical"
        defaultPosition={40}
      >
        <ImageLayer 
          src="/assets/images/image-comparison/img1.png" 
          alt="Before Image" 
          layer="first" 
        />
        <ImageLayer 
          src="/assets/images/image-comparison/img2.png" 
          alt="After Image" 
          layer="second" 
        />
        <Divider handleIcon={<ArrowUpDown size={16} />} />
      </ImageSlider>
    </div>
      ),
      filename: "BasicHorizontalSlider.tsx",
      code: `import { ImageSlider, ImageLayer, Divider } from "@/nyxui/components/ImageSlider";


export function BasicHorizontalSlider() {
  return (
    <div className="space-y-4 w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold">Vertical Slider</h2>
      <p className="text-gray-500">Compare images with a vertical divider.</p>
      
      <ImageSlider 
        className="h-96 border rounded-xl overflow-hidden" 
        orientation="vertical"
        defaultPosition={40}
      >
        <ImageLayer 
          src="/assets/images/showcase/cyberpunk-card.png" 
          alt="Before Image" 
          layer="first" 
        />
        <ImageLayer 
          src="/assets/images/showcase/dynamic-ripple.png" 
          alt="After Image" 
          layer="second" 
        />
        <Divider handleIcon={<ArrowUpDown size={16} />} />
      </ImageSlider>
    </div>
  );
}`,
    },
    {
      name: "Vertical Comparison",
      preview: (
        <div className="space-y-4 w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold">Hover Control</h2>
      <p className="text-gray-500">Simply hover over the image to reveal - no clicking required.</p>
      
      <ImageSlider 
        className="h-96 border rounded-xl overflow-hidden" 
        hoverControl={true}
        defaultPosition={20}
      >
        <ImageLayer 
          src="/assets/images/image-comparison/digi1.png" 
          alt="Original Image" 
          layer="first" 
        />
        <ImageLayer 
          src="/assets/images/image-comparison/digi2.png" 
          alt="Processed Image" 
          layer="second" 
        />
        <Divider width={4} handleSize={32} />
      </ImageSlider>
    </div>
      ),
      filename: "VerticalSlider.tsx",
      code: `import { ImageSlider, ImageLayer, Divider } from "@/nyxui/components/ImageSlider";

export function VerticalSlider() {
  return (
     <div className="space-y-4 w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold">Hover Control</h2>
      <p className="text-gray-500">Simply hover over the image to reveal - no clicking required.</p>
      
      <ImageSlider 
        className="h-96 border rounded-xl overflow-hidden" 
        hoverControl={true}
        defaultPosition={20}
      >
        <ImageLayer 
          src="/img1.png" 
          alt="Original Image" 
          layer="first" 
          className='object-contain'
        />
        <ImageLayer 
          src="/img2.png" 
          alt="Processed Image" 
          layer="second" 
        />
        <Divider width={4} handleSize={32} />
      </ImageSlider>
    </div>
  );
}`,
    },
    {
      name: "Hover-Controlled Slider",
      preview: (
        <div className="space-y-4 w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold">Custom Styling</h2>
      <p className="text-gray-500">Customize divider color, handle size, and animation speed.</p>
      
      <ImageSlider 
        className="h-96 w-full border-2 border-purple-600 rounded-xl overflow-hidden" 
        dividerColor="#10b981"
        animationConfig={{ damping: 30, stiffness: 300 }}
        defaultPosition={70}
      >
        <ImageLayer 
          src="/assets/images/image-comparison/ss.png" 
          alt="Day Image" 
          layer="first" 
        />
        <ImageLayer 
          src="/assets/images/image-comparison/ss2.png" 
          alt="Night Image" 
          layer="second" 
        />
        <Divider handleColor="#10b981" handleSize={36} width={3} />
      </ImageSlider>
    </div>
      ),
      filename: "HoverSlider.tsx",
      code: `import { ImageSlider, ImageLayer, Divider } from "@/nyxui/components/ImageSlider";

export function HoverSlider() {
  return (
    <div className="space-y-4 w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold">Custom Styling</h2>
      <p className="text-gray-500">Customize divider color, handle size, and animation speed.</p>
      
      <ImageSlider 
        className="h-96 w-full border-2 border-purple-600 rounded-xl overflow-hidden" 
        dividerColor="#10b981"
        animationConfig={{ damping: 30, stiffness: 300 }}
        defaultPosition={70}
      >
        <ImageLayer 
          src="/img1.png" 
          alt="Day Image" 
          layer="first" 
        />
        <ImageLayer 
          src="/img2.png" 
          alt="Night Image" 
          layer="second" 
        />
        <Divider handleColor="#10b981" handleSize={36} width={3} />
      </ImageSlider>
    </div>
  );
}`,
    },
  ]
}