import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { AnimateText } from "@/nuvyxui/components/AnimatedText";
import { AnimationTextDemo } from "@/nuvyxui/demos/AnimatedTextDemo";

import AnimatedTextSource from "!!raw-loader!@/nuvyxui/components/AnimatedText.tsx";
import AnimatedTextDemoSource from "!!raw-loader!@/nuvyxui/demos/AnimatedTextDemo.tsx";

export const animatedTextData: ComponentData = {
  name: "Animated Text",
  description:
    "A versatile text animation component that offers multiple animation types.",
  preview: <AnimationTextDemo />,
  usage: AnimatedTextDemoSource,
  componentCode: AnimatedTextSource,
  dependencies: [
    {
      name: "Framer Motion",
      description: "Animation library for React",
      install: {
        npm: "npm install framer-motion",
        pnpm: "pnpm add framer-motion",
        yarn: "yarn add framer-motion",
        bun: "bun add framer-motion",
      },
    },
  ],
  props: [
    {
      name: "AnimateText Props",
      items: [
        {
          name: "text",
          type: "string",
          default: '""',
          description: "The text content to be animated.",
        },
        {
          name: "type",
          type: '"cascade" | "flicker" | "blink" | "expand" | "rise" | "glide" | "elastic" | "float"',
          default: '"cascade"',
          description: "Animation style to apply to the text.",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Additional CSS classes to apply to the component.",
        },
        {
          name: "delay",
          type: "number",
          default: "0",
          description: "Delay before animation starts in milliseconds.",
        },
        {
          name: "duration",
          type: "number",
          default: "0.5",
          description: "Duration of the animation in seconds.",
        },
        {
          name: "staggerChildren",
          type: "number",
          default: "0.05",
          description:
            "Time between each character's animation for cascade effects.",
        },
        {
          name: "once",
          type: "boolean",
          default: "true",
          description: "If true, animation plays only once when in view.",
        },
        {
          name: "fontSize",
          type: "string",
          default: '"2xl"',
          description: "Font size using Tailwind CSS size classes.",
        },
        {
          name: "fontWeight",
          type: "string",
          default: '"bold"',
          description: "Font weight using Tailwind CSS weight classes.",
        },
        {
          name: "color",
          type: "string",
          default: '""',
          description: "Text color (uses theme colors if not specified).",
        },
      ],
    },
  ],
  category: "Typography",
  examples: [
    {
      name: "Cascade Title Animation",
      preview: (
        <div className="p-8 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 rounded-xl text-center shadow-lg border border-blue-700">
          <AnimateText
            text="Welcome to NuvyxUI"
            type="cascade"
            className="text-5xl font-extrabold text-white tracking-tight"
          />
          <AnimateText
            text="Modern UI Library"
            type="rise"
            className="text-xl font-medium text-blue-100 mt-4 opacity-90"
            delay={0.5}
          />
        </div>
      ),
      filename: "CascadeTitleAnimation.tsx",
      code: `import { AnimateText } from "@/nuvyxui/components/AnimatedText";
  
export function CascadeTitleAnimation() {
  return (
    <div className="p-8 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 rounded-xl text-center shadow-lg border border-blue-700">
      <AnimateText 
        text="Welcome to NuvyxUI" 
        type="cascade" 
        className="text-5xl font-extrabold text-white tracking-tight" 
      />
      <AnimateText 
        text="Modern UI Library" 
        type="rise" 
        className="text-xl font-medium text-blue-100 mt-4 opacity-90" 
        delay={0.5}
      />
    </div>
  );
}`,
    },
    {
      name: "Interactive Feature Highlight",
      preview: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <div className="p-6 border border-emerald-200 dark:border-emerald-800 rounded-xl hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 transform hover:-translate-y-1">
            <AnimateText
              text="Modern UI Components"
              type="flicker"
              className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-3"
            />
            <p className="text-gray-700 dark:text-gray-200">
              Build beautiful interfaces with ease
            </p>
          </div>
          <div className="p-6 border border-purple-200 dark:border-purple-800 rounded-xl hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 transform hover:-translate-y-1">
            <AnimateText
              text="Responsive Design"
              type="expand"
              className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3"
            />
            <p className="text-gray-700 dark:text-gray-200">
              Ensure your UI looks great on all devices
            </p>
          </div>
        </div>
      ),
      filename: "FeatureHighlight.tsx",
      code: `import { AnimateText } from "@/nuvyxui/components/AnimatedText";
  
export function FeatureHighlight() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
      <div className="p-6 border border-emerald-200 dark:border-emerald-800 rounded-xl hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 transform hover:-translate-y-1">
        <AnimateText 
          text="Modern UI Components" 
          type="flicker" 
          className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-3" 
        />
        <p className="text-gray-700 dark:text-gray-200">
          Build beautiful interfaces with ease
        </p>
      </div>
      <div className="p-6 border border-purple-200 dark:border-purple-800 rounded-xl hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 transform hover:-translate-y-1">
        <AnimateText 
          text="Responsive Design" 
          type="expand" 
          className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3" 
        />
        <p className="text-gray-700 dark:text-gray-200">
          Ensure your UI looks great on all devices
        </p>
      </div>
    </div>
  );
}`,
    },
    {
      name: "Elastic Call-to-Action",
      preview: (
        <div className="text-center p-8 bg-gradient-to-t from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-300 mb-4 font-medium">
            Build fast and beautiful
          </p>
          <AnimateText
            text="Let's make web beautiful"
            type="elastic"
            className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
          />
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 max-w-md mx-auto">
            Start building beautiful interfaces faster than ever before
          </p>
        </div>
      ),
      filename: "ElasticCTA.tsx",
      code: `import { AnimateText } from "@/nuvyxui/components/AnimatedText";
  
export function ElasticCTA() {
  return (
    <div className="text-center p-8 bg-gradient-to-t from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <p className="text-gray-600 dark:text-gray-300 mb-4 font-medium">Build fast and beautiful</p>
      <AnimateText 
        text="Let's make web beautiful" 
        type="elastic" 
        className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors" 
      />
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 max-w-md mx-auto">
        Start building beautiful interfaces faster than ever before
      </p>
    </div>
  );
}`,
    },
  ],
};
