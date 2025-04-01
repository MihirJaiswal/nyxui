import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import { MatrixCodeRain } from "@/nyxui/components/MatrixCodeRain"
import { MatrixCodeRainDemo } from "@/nyxui/demos/MatrixCodeRainDemo"
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/MatrixCodeRain.tsx");
const MatrixCodeRainSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/MatrixCodeRainDemo.tsx");
const MatrixCodeRainDemoSource = fs.readFileSync(demoPath, "utf8");

export const matrixCodeRainData: ComponentData = {
  name: "Matrix Code Rain",
  description:
    "A customizable Matrix-style digital rain effect that can be used as a background or in a container. Creates the iconic falling character animation from 'The Matrix' with configurable colors, characters, and animation speed.",
  preview: <MatrixCodeRainDemo />,
  usage: MatrixCodeRainDemoSource,
  componentCode: MatrixCodeRainSource,
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
      name: "clsx",
      description: "A tiny utility for constructing className strings conditionally.",
      install: {
        npm: "npm install clsx",
        pnpm: "pnpm add clsx",
        yarn: "yarn add clsx",
        bun: "bun add clsx",
      },
    },
  ],
  props: [
    {
      name: "MatrixCodeRain",
      items: [
        {
          name: "color",
          type: "string",
          default: '"#00ff00"',
          description: "The color of the matrix characters",
        },
        {
          name: "charset",
          type: "string",
          default: '"0123#!$^&456789ABCDEFRLY"',
          description: "The set of characters to display in the animation",
        },
        {
          name: "fontSize",
          type: "number",
          default: "16",
          description: "The size of the characters in pixels",
        },
        {
          name: "fps",
          type: "number",
          default: "20",
          description: "Frames per second - controls animation speed",
        },
        {
          name: "opacity",
          type: "number",
          default: "0.05",
          description: "The opacity of the fade effect (0-1)",
        },
        {
          name: "fullScreen",
          type: "boolean",
          default: "false",
          description: "Whether to display the effect as a fullscreen background",
        },
        {
          name: "width",
          type: "string",
          default: '"100%"',
          description: "The width of the container when not in fullscreen mode",
        },
        {
          name: "height",
          type: "string",
          default: '"400px"',
          description: "The height of the container when not in fullscreen mode",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Additional CSS classes to apply to the container",
        },
      ],
    },
  ],
  category: "Effects",
  examples: [
    {
      name: "Default Matrix Effect",
      preview: (
        <MatrixCodeRain 
          color="#00ff00"
          fontSize={16}
          fps={20}
          height="300px"
        />
      ),
      filename: "DefaultMatrix.tsx",
      code: `import { MatrixCodeRain } from "@/nyxui/components/MatrixCodeRain";
  
export function DefaultMatrix() {
  return (
    <MatrixCodeRain 
      color="#00ff00"
      fontSize={16}
      fps={20}
      height="300px"
    />
  );
}`,
    },
    {
      name: "Cyberpunk Theme",
      preview: (
        <MatrixCodeRain 
          color="#ff00ff"
          charset="01?!×÷@#$%&*HACK"
          fontSize={20}
          fps={30}
          opacity={0.08}
          height="300px"
        />
      ),
      filename: "CyberpunkMatrix.tsx",
      code: `import { MatrixCodeRain } from "@/nyxui/components/MatrixCodeRain";
  
export function CyberpunkMatrix() {
  return (
    <MatrixCodeRain 
      color="#ff00ff"
      charset="01?!×÷@#$%&*HACK"
      fontSize={20}
      fps={30}
      opacity={0.08}
      height="300px"
    />
  );
}`,
    },
    {
      name: "Blue Tech Background",
      preview: (
        <div className="relative h-64 rounded-lg overflow-hidden">
          <MatrixCodeRain 
            color="#0088ff"
            fontSize={14}
            fps={15}
            opacity={0.03}
            fullScreen={false}
            height="256px"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-xl font-bold bg-black/30 px-4 py-2 rounded-lg">
              Tech Dashboard
            </div>
          </div>
        </div>
      ),
      filename: "BlueTechBackground.tsx",
      code: `import { MatrixCodeRain } from "@/nyxui/components/MatrixCodeRain";
  
export function BlueTechBackground() {
  return (
    <div className="relative h-64 rounded-lg overflow-hidden">
      <MatrixCodeRain 
        color="#0088ff"
        fontSize={14}
        fps={15}
        opacity={0.03}
        fullScreen={false}
        height="256px"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-xl font-bold bg-black/30 px-4 py-2 rounded-lg">
          Tech Dashboard
        </div>
      </div>
    </div>
  );
}`,
    },
    {
      name: "Fullscreen Background",
      preview: (
        <div className="relative h-64 rounded-lg overflow-hidden">
          <MatrixCodeRain 
            color="#00ff88"
            fontSize={18}
            fps={25}
            opacity={0.06}
            height="256px"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white bg-black/50 p-4 rounded-lg max-w-sm text-center">
              <h3 className="text-lg font-bold mb-2">Fullscreen Mode</h3>
              <p className="text-sm">Set fullScreen=true to make this effect cover the entire viewport as a background</p>
            </div>
          </div>
        </div>
      ),
      filename: "FullscreenMatrix.tsx",
      code: `import { MatrixCodeRain } from "@/nyxui/components/MatrixCodeRain";

export function FullscreenMatrix() {
  return (
    <MatrixCodeRain 
      color="#00ff88"
      fontSize={18}
      fps={25}
      opacity={0.06}
      fullScreen={true}
    />
  );
}`,
    },
    {
      name: "Custom Characters",
      preview: (
        <MatrixCodeRain 
          color="#ffcc00"
          charset="①②③④⑤⑥⑦⑧⑨⑩⓪"
          fontSize={22}
          fps={15}
          height="300px"
        />
      ),
      filename: "CustomCharactersMatrix.tsx",
      code: `import { MatrixCodeRain } from "@/nyxui/components/MatrixCodeRain";
  
export function CustomCharactersMatrix() {
  return (
    <MatrixCodeRain 
      color="#ffcc00"
      charset="①②③④⑤⑥⑦⑧⑨⑩⓪"
      fontSize={22}
      fps={15}
      height="300px"
    />
  );
}`,
    },
    {
      name: "Slow Motion Effect",
      preview: (
        <MatrixCodeRain 
          color="#00ddff"
          charset="01001101"
          fontSize={16}
          fps={8}
          opacity={0.1}
          height="300px"
        />
      ),
      filename: "SlowMotionMatrix.tsx",
      code: `import { MatrixCodeRain } from "@/nyxui/components/MatrixCodeRain";
  
export function SlowMotionMatrix() {
  return (
    <MatrixCodeRain 
      color="#00ddff"
      charset="01001101"
      fontSize={16}
      fps={8}
      opacity={0.1}
      height="300px"
    />
  );
}`,
    },
  ],
}