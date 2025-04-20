import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { MatrixCodeRain } from "@/nuvyxui/components/MatrixCodeRain";
import { MatrixCodeRainDemo } from "@/nuvyxui/demos/MatrixCodeRainDemo";

import MatrixCodeRainSource from "!!raw-loader!@/nuvyxui/components/MatrixCodeRain.tsx";
import MatrixCodeRainDemoSource from "!!raw-loader!@/nuvyxui/demos/MatrixCodeRainDemo.tsx";

export const matrixCodeRainData: ComponentData = {
  name: "Matrix Code Rain",
  description:
    "A customizable Matrix-style digital rain effect that can be used as a background or in a container.",
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
  tags: ["Background", "Animation"],
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
          default: '"0123#!$^&456789ABC"',
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
          description:
            "Whether to display the effect as a fullscreen background",
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
          description:
            "The height of the container when not in fullscreen mode",
        },
      ],
    },
  ],
  category: "Background",
  examples: [
    {
      name: "Custom Characters",
      preview: (
        <div className="h-[500px] flex items-center justify-center w-full relative overflow-hidden">
          <MatrixCodeRain
            color="#b30000"
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
      code: `import { MatrixCodeRain } from "@/nuvyxui/components/MatrixCodeRain";

export function CustomCharactersMatrix() {
  return (
    <div className="h-[500px] flex items-center justify-center w-full relative overflow-hidden">
      <MatrixCodeRain 
        color="#b30000"
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
      name: "Hieroglyphic Style",
      preview: (
        <div className="h-[500px] flex items-center justify-center w-full relative overflow-hidden">
          <MatrixCodeRain
            color="#0088ff"
            charset="𓀀𓀁𓀂𓀃𓀄𓀅𓀆𓀇𓀈𓀉𓀊𓀋𓀌𓀍𓀎𓀏"
            fontSize={24}
            fps={12}
            opacity={0.03}
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
      code: `import { MatrixCodeRain } from "@/nuvyxui/components/MatrixCodeRain";

export function HieroglyphicMatrix() {
  return (
    <div className="h-[500px] flex items-center justify-center w-full relative overflow-hidden">
      <MatrixCodeRain 
        color="#0088ff"
        charset="𓀀𓀁𓀂𓀃𓀄𓀅𓀆𓀇𓀈𓀉𓀊𓀋𓀌𓀍𓀎𓀏"
        fontSize={14}
        fps={12}
        opacity={0.03}
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
  ],
};
