import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import { ThreeDCard } from "@/nyxui/components/3DCard"
import { ThreeDCardDemo } from "@/nyxui/demos/3DCardDemo"
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/3DCard.tsx");
const ThreeDCardSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/3DCardDemo.tsx");
const ThreeDCardDemoSource = fs.readFileSync(demoPath, "utf8");

export const threeDCardData: ComponentData = {
  name: "3D Card",
  description:
    "An interactive 3D card component with dynamic rotation, glare effects, and layered depth. Perfect for creating immersive UI elements, product showcases, and interactive cards.",
  preview: <ThreeDCardDemo />,
  usage: ThreeDCardDemoSource,
  componentCode: ThreeDCardSource,
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
    {
      name: "Framer Motion",
      description: "Production-ready motion library for React used for animations and gestures.",
      install: {
        npm: "npm install framer-motion",
        pnpm: "pnpm add framer-motion",
        yarn: "yarn add framer-motion",
        bun: "bun add framer-motion",
      }
    }
  ],
  props: [
    {
      name: "ThreeDCard",
      items: [
        {
          name: "depth",
          type: "number",
          default: "50",
          description: "The depth effect in pixels for the 3D card",
        },
        {
          name: "perspective",
          type: "number",
          default: "1000",
          description: "The perspective value in pixels for the 3D effect",
        },
        {
          name: "rotationIntensity",
          type: "number",
          default: "15",
          description: "The intensity of the rotation effect (degrees)",
        },
        {
          name: "glareIntensity",
          type: "number",
          default: "0.2",
          description: "The intensity of the glare effect (0-1)",
        },
        {
          name: "shadowIntensity",
          type: "number",
          default: "0.8",
          description: "The intensity of the shadow effect (0-1)",
        },
        {
          name: "hoverScale",
          type: "number",
          default: "1.05",
          description: "The scale factor when hovering over the card",
        },
        {
          name: "borderRadius",
          type: "string | number",
          default: '"1rem"',
          description: "The border radius of the card",
        },
        {
          name: "backgroundColor",
          type: "string",
          default: '"white"',
          description: "The background color of the card",
        },
        {
          name: "glareColor",
          type: "string",
          default: '"rgba(255, 255, 255, 0.8)"',
          description: "The color of the glare effect",
        },
        {
          name: "shadowColor",
          type: "string",
          default: '"rgba(0, 0, 0, 0.2)"',
          description: "The color of the shadow effect",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Whether the card is disabled",
        },
        {
          name: "clickable",
          type: "boolean",
          default: "false",
          description: "Whether the card is clickable",
        },
        {
          name: "onClick",
          type: "() => void",
          default: "undefined",
          description: "Function to call when the card is clicked",
        },
        {
          name: "width",
          type: "string | number",
          default: "undefined",
          description: "The width of the card",
        },
        {
          name: "height",
          type: "string | number",
          default: "undefined",
          description: "The height of the card",
        },
        {
          name: "layers",
          type: "Array<{ content: React.ReactNode; depth: number; className?: string }>",
          default: "[]",
          description: "Additional 3D layers to render at different depths",
        },
        {
          name: "as",
          type: "React.ElementType",
          default: '"div"',
          description: "The HTML element to render as",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes to apply",
        },
      ],
    },
  ],
  category: "Cards",
  examples: [
    {
      name: "Product Card",
      preview: (
        <ThreeDCard 
          depth={60} 
          glareIntensity={0.3} 
          hoverScale={1.07} 
          borderRadius="1.25rem"
          backgroundColor="#f5f5f5"
          className="w-64 h-80"
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                <span className="text-white text-4xl">✨</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">Premium Headphones</h3>
              <p className="text-sm text-gray-600 mt-1">Immersive sound experience with noise cancellation</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-blue-600">$299.99</span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium">Add to Cart</button>
              </div>
            </div>
          </div>
        </ThreeDCard>
      ),
      filename: "ProductCard.tsx",
      code: `import { ThreeDCard } from "@/nyxui/components/ThreeDCard";

export function ProductCard() {
  return (
    <ThreeDCard 
      depth={60} 
      glareIntensity={0.3} 
      hoverScale={1.07} 
      borderRadius="1.25rem"
      backgroundColor="#f5f5f5"
      className="w-64 h-80"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-4xl">✨</span>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold text-gray-800">Premium Headphones</h3>
          <p className="text-sm text-gray-600 mt-1">Immersive sound experience with noise cancellation</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="font-bold text-blue-600">$299.99</span>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium">Add to Cart</button>
          </div>
        </div>
      </div>
    </ThreeDCard>
  );
}`,
    },
    {
      name: "Dashboard Widget",
      preview: (
        <ThreeDCard 
          depth={40} 
          glareIntensity={0.15}
          rotationIntensity={10}
          borderRadius="1rem"
          backgroundColor="#1e1e2e"
          glareColor="rgba(255, 255, 255, 0.05)"
          shadowColor="rgba(0, 0, 0, 0.3)"
          className="w-72 h-64"
        >
          <div className="p-5 text-white h-full flex flex-col">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Monthly Revenue</h3>
              <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">+24%</span>
            </div>
            <div className="mt-3 text-3xl font-bold">$52,389</div>
            <div className="text-xs text-gray-400">Compared to $42,183 last month</div>
            <div className="flex-1 flex items-end">
              <div className="w-full h-20 flex items-end space-x-2">
                {[40, 65, 55, 70, 85, 60, 75, 90, 80].map((height, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-gradient-to-t from-purple-600 to-blue-400 rounded-sm"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </ThreeDCard>
      ),
      filename: "DashboardWidget.tsx",
      code: `import { ThreeDCard } from "@/nyxui/components/ThreeDCard";

export function DashboardWidget() {
  return (
    <ThreeDCard 
      depth={40} 
      glareIntensity={0.15}
      rotationIntensity={10}
      borderRadius="1rem"
      backgroundColor="#1e1e2e"
      glareColor="rgba(255, 255, 255, 0.05)"
      shadowColor="rgba(0, 0, 0, 0.3)"
      className="w-72 h-64"
    >
      <div className="p-5 text-white h-full flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Monthly Revenue</h3>
          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">+24%</span>
        </div>
        <div className="mt-3 text-3xl font-bold">$52,389</div>
        <div className="text-xs text-gray-400">Compared to $42,183 last month</div>
        <div className="flex-1 flex items-end">
          <div className="w-full h-20 flex items-end space-x-2">
            {[40, 65, 55, 70, 85, 60, 75, 90, 80].map((height, i) => (
              <div 
                key={i} 
                className="flex-1 bg-gradient-to-t from-purple-600 to-blue-400 rounded-sm"
                style={{ height: \`\${height}%\` }}
              />
            ))}
          </div>
        </div>
      </div>
    </ThreeDCard>
  );
}`,
    },
    {
      name: "Multi-Layer Card",
      preview: (
        <ThreeDCard 
          depth={80} 
          rotationIntensity={20}
          hoverScale={1.08}
          borderRadius="1rem"
          backgroundColor="#000"
          glareColor="rgba(255, 255, 255, 0.3)"
          shadowColor="rgba(0, 0, 0, 0.5)"
          className="w-80 h-96"
          layers={[
            {
              depth: 20,
              content: (
                <div className="absolute inset-10 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl blur-md" />
              )
            },
            {
              depth: 40,
              content: (
                <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-blue-500/40 rounded-full blur-sm" />
              )
            },
            {
              depth: 60,
              content: (
                <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-cyan-400/40 rounded-full blur-sm" />
              )
            }
          ]}
        >
          <div className="p-6 h-full flex flex-col justify-center items-center text-white">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Multi-Layer Effect</h2>
            <p className="text-center text-gray-300">Experience true depth with multiple floating layers that create an immersive 3D effect.</p>
            <button className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity">Explore Now</button>
          </div>
        </ThreeDCard>
      ),
      filename: "MultiLayerCard.tsx",
      code: `import { ThreeDCard } from "@/nyxui/components/ThreeDCard";

export function MultiLayerCard() {
  return (
    <ThreeDCard 
      depth={80} 
      rotationIntensity={20}
      hoverScale={1.08}
      borderRadius="1rem"
      backgroundColor="#000"
      glareColor="rgba(255, 255, 255, 0.3)"
      shadowColor="rgba(0, 0, 0, 0.5)"
      className="w-80 h-96"
      layers={[
        {
          depth: 20,
          content: (
            <div className="absolute inset-10 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-xl blur-md" />
          )
        },
        {
          depth: 40,
          content: (
            <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-blue-500/40 rounded-full blur-sm" />
          )
        },
        {
          depth: 60,
          content: (
            <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-cyan-400/40 rounded-full blur-sm" />
          )
        }
      ]}
    >
      <div className="p-6 h-full flex flex-col justify-center items-center text-white">
        <div className="text-6xl mb-4">🚀</div>
        <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Multi-Layer Effect</h2>
        <p className="text-center text-gray-300">Experience true depth with multiple floating layers that create an immersive 3D effect.</p>
        <button className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity">Explore Now</button>
      </div>
    </ThreeDCard>
  );
}`,
    },
    {
      name: "Image Gallery",
      preview: (
        <ThreeDCard 
          depth={55} 
          glareIntensity={0.25}
          rotationIntensity={12}
          hoverScale={1.04}
          borderRadius="0.5rem"
          backgroundColor="#ffffff"
          className="w-64 h-80 overflow-hidden"
        >
          <div className="h-full">
            <div className="h-3/5 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <div className="text-white text-4xl">🏔️</div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800">Mountain Getaway</h3>
              <p className="text-sm text-gray-600 mt-2">Beautiful mountain views with pristine lakes and hiking trails.</p>
              <div className="mt-3 flex space-x-1">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                <span className="w-2 h-2 rounded-full bg-gray-300"></span>
              </div>
            </div>
          </div>
        </ThreeDCard>
      ),
      filename: "ImageGallery.tsx",
      code: `import { ThreeDCard } from "@/nyxui/components/ThreeDCard";

export function ImageGallery() {
  return (
    <ThreeDCard 
      depth={55} 
      glareIntensity={0.25}
      rotationIntensity={12}
      hoverScale={1.04}
      borderRadius="0.5rem"
      backgroundColor="#ffffff"
      className="w-64 h-80 overflow-hidden"
    >
      <div className="h-full">
        <div className="h-3/5 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
          <div className="text-white text-4xl">🏔️</div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-gray-800">Mountain Getaway</h3>
          <p className="text-sm text-gray-600 mt-2">Beautiful mountain views with pristine lakes and hiking trails.</p>
          <div className="mt-3 flex space-x-1">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          </div>
        </div>
      </div>
    </ThreeDCard>
  );
}`,
    },
    {
      name: "Clickable Card",
      preview: (
        <ThreeDCard 
          depth={30} 
          glareIntensity={0.2}
          rotationIntensity={8}
          hoverScale={1.03}
          borderRadius="0.75rem"
          backgroundColor="#f8f9fa"
          clickable={true}
          className="w-72 h-28"
        >
          <div className="p-4 flex items-center h-full">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center mr-4">
              <span className="text-white text-lg">🔔</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">New Notification</h3>
              <p className="text-sm text-gray-500 mt-1">You have a new message from Sarah</p>
            </div>
          </div>
        </ThreeDCard>
      ),
      filename: "ClickableCard.tsx",
      code: `import { ThreeDCard } from "@/nyxui/components/ThreeDCard";

export function ClickableCard() {
  return (
    <ThreeDCard 
      depth={30} 
      glareIntensity={0.2}
      rotationIntensity={8}
      hoverScale={1.03}
      borderRadius="0.75rem"
      backgroundColor="#f8f9fa"
      clickable={true}
      className="w-72 h-28"
    >
      <div className="p-4 flex items-center h-full">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center mr-4">
          <span className="text-white text-lg">🔔</span>
        </div>
        <div>
          <h3 className="font-medium text-gray-800">New Notification</h3>
          <p className="text-sm text-gray-500 mt-1">You have a new message from Sarah</p>
        </div>
      </div>
    </ThreeDCard>
  );
}`,
    },
  ],
}