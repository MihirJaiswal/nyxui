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
      ],
    },
  ],
  category: "Background",
  examples : [
  {
    name: "Cyberpunk Theme",
    preview: (
      <div className="h-[500px] flex items-center justify-center w-full relative overflow-hidden">
        <MatrixCodeRain 
          color="#ff00ff"
          charset="01?!×÷@#$%&*HACK"
          fontSize={20}
          fps={30}
          opacity={0.08}
          height="500px"
          width="1000px"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl font-bold bg-black/80 border border-white px-4 py-2 rounded-lg">
            Cyberpunk Matrix
          </div>
        </div>
      </div>
    ),
    filename: "CyberpunkMatrix.tsx",
    code: `import { MatrixCodeRain } from "@/nyxui/components/MatrixCodeRain";

export function CyberpunkMatrix() {
  return (
    <div className="h-[500px] flex items-center justify-center w-full relative overflow-hidden">
      <MatrixCodeRain 
        color="#ff00ff"
        charset="01?!×÷@#$%&*HACK"
        fontSize={20}
        fps={30}
        opacity={0.08}
        height="500px"
        width="1000px"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-xl font-bold bg-black/80 border border-white px-4 py-2 rounded-lg">
          Cyberpunk Matrix
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    name: "Blue Tech Background",
    preview: (
      <div className="relative h-[500px] rounded-lg overflow-hidden flex items-center justify-center">
        <MatrixCodeRain 
          color="#0088ff"
          fontSize={10}
          fps={15}
          opacity={0.03}
          fullScreen={false}
          height="500px"
          width="1000px"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl font-bold bg-black/80 border border-white px-4 py-2 rounded-lg">
            Tech Dashboard
          </div>
        </div>
      </div>
    ),
    filename: "BlueTechBackground.tsx",
    code: `import { MatrixCodeRain } from "@/nyxui/components/MatrixCodeRain";

export function BlueTechBackground() {
  return (
    <div className="relative h-64 rounded-lg overflow-hidden flex items-center justify-center">
      <MatrixCodeRain 
        color="#0088ff"
        fontSize={10}
        fps={15}
        opacity={0.03}
        fullScreen={false}
        height="500px"
        width="1000px"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-xl font-bold bg-black/80 border border-white px-4 py-2 rounded-lg">
          Tech Dashboard
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    name: "Custom Characters",
    preview: (
      <div className="h-[500px] flex items-center justify-center w-full relative overflow-hidden">
        <MatrixCodeRain 
          color="#ffcc00"
          charset="①②③④⑤⑥⑦⑧⑨⑩⓪"
          fontSize={22}
          fps={15}
          height="500px"
          width="1000px"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl font-bold bg-black/80 border border-white px-4 py-2 rounded-lg">
            Custom Characters
          </div>
        </div>
      </div>
    ),
    filename: "CustomCharactersMatrix.tsx",
    code: `import { MatrixCodeRain } from "@/nyxui/components/MatrixCodeRain";

export function CustomCharactersMatrix() {
  return (
    <div className="h-[500px] flex items-center justify-center w-full relative overflow-hidden">
      <MatrixCodeRain 
        color="#ffcc00"
        charset="①②③④⑤⑥⑦⑧⑨⑩⓪"
        fontSize={22}
        fps={15}
        height="500px"
        width="1000px"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-xl font-bold bg-black/80 border border-white px-4 py-2 rounded-lg">
          Custom Characters
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    name: "Slow Motion Effect",
    preview: (
      <div className="h-[500px] flex items-center justify-center w-full relative overflow-hidden">
        <MatrixCodeRain 
          color="#00ddff"
          charset="01001101"
          fontSize={16}
          fps={8}
          opacity={0.1}
          height="500px"
          width="1000px"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl font-bold bg-black/80 border border-white px-4 py-2 rounded-lg">
            Slow Motion
          </div>
        </div>
      </div>
    ),
    filename: "SlowMotionMatrix.tsx",
    code: `import { MatrixCodeRain } from "@/nyxui/components/MatrixCodeRain";

export function SlowMotionMatrix() {
  return (
    <div className="h-[500px] flex items-center justify-center w-full relative overflow-hidden">
      <MatrixCodeRain 
        color="#00ddff"
        charset="01001101"
        fontSize={16}
        fps={8}
        opacity={0.1}
        height="500px"
        width="1000px"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-xl font-bold bg-black/80 border border-white px-4 py-2 rounded-lg">
          Slow Motion
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    name: "Red Alert Mode",
    preview: (
      <div className="h-[500px] flex items-center justify-center w-full relative overflow-hidden">
        <MatrixCodeRain 
          color="#ff3300"
          charset="WARNING!ALERT"
          fontSize={18}
          fps={25}
          opacity={0.08}
          height="500px"
          width="1000px"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl font-bold bg-black/80 border border-white px-4 py-2 rounded-lg">
            Red Alert
          </div>
        </div>
      </div>
    ),
    filename: "RedAlertMatrix.tsx",
    code: `import { MatrixCodeRain } from "@/nyxui/components/MatrixCodeRain";

export function RedAlertMatrix() {
  return (
    <div className="h-[500px] flex items-center justify-center w-full relative overflow-hidden">
      <MatrixCodeRain 
        color="#ff3300"
        charset="WARNING!ALERT"
        fontSize={18}
        fps={25}
        opacity={0.08}
        height="500px"
        width="1000px"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-xl font-bold bg-black/80 border border-white px-4 py-2 rounded-lg">
          Red Alert
        </div>
      </div>
    </div>
  );
}`,
  },
  {
    name: "Hieroglyphic Style",
    preview: (
      <div className="h-[500px] flex items-center justify-center w-full relative overflow-hidden">
        <MatrixCodeRain 
          color="#d4af37"
          charset="𓀀𓀁𓀂𓀃𓀄𓀅𓀆𓀇𓀈𓀉𓀊𓀋𓀌𓀍𓀎𓀏"
          fontSize={24}
          fps={12}
          opacity={0.07}
          height="500px"
          width="1000px"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl font-bold bg-black/80 border border-white px-4 py-2 rounded-lg">
            Hieroglyphic
          </div>
        </div>
      </div>
    ),
    filename: "HieroglyphicMatrix.tsx",
    code: `import { MatrixCodeRain } from "@/nyxui/components/MatrixCodeRain";

export function HieroglyphicMatrix() {
  return (
    <div className="h-[500px] flex items-center justify-center w-full relative overflow-hidden">
      <MatrixCodeRain 
        color="#d4af37"
        charset="𓀀𓀁𓀂𓀃𓀄𓀅𓀆𓀇𓀈𓀉𓀊𓀋𓀌𓀍𓀎𓀏"
        fontSize={24}
        fps={12}
        opacity={0.07}
        height="500px"
        width="1000px"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-xl font-bold bg-black/80 border border-white px-4 py-2 rounded-lg">
          Hieroglyphic
        </div>
      </div>
    </div>
  );
}`,
  },
]
}