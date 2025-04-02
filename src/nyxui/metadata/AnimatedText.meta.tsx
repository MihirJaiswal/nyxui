import type { ComponentData } from "@/nyxui/ComponentInterfaces";
import { AnimateText } from "@/nyxui/components/AnimatedText";
import { AnimationTextDemo } from "@/nyxui/demos/AnimatedTextDemo";
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/AnimatedText.tsx");
const AnimatedTextSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/AnimatedTextDemo.tsx");
const AnimatedTextDemoSource = fs.readFileSync(demoPath, "utf8");

export const animatedTextData: ComponentData = {
  name: "Animated Text",
  description:
    "A versatile text animation component that offers multiple animation types including cascade, flicker, blink, expand, rise, glide, elastic, and float effects.",
  preview: <AnimationTextDemo />,
  usage: AnimatedTextDemoSource,
  componentCode: AnimatedTextSource,
  dependencies: [{
    name: "Framer Motion",
    description: "Animation library for React",
    install: {
      npm: "npm install framer-motion",
      pnpm: "pnpm add framer-motion",
      yarn: "yarn add framer-motion",
      bun: "bun add framer-motion",
    },
  },],
  props: [
    {
      name: "AnimateText Props",
      items: [
        {
          name: "text",
          type: "string",
          default: '""',
          description: "The text content to be animated."
        },
        {
          name: "type",
          type: '"cascade" | "flicker" | "blink" | "expand" | "rise" | "glide" | "elastic" | "float"',
          default: '"cascade"',
          description: "Animation style to apply to the text."
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Additional CSS classes to apply to the component."
        },
        {
          name: "delay",
          type: "number",
          default: "0",
          description: "Delay before animation starts in milliseconds."
        },
        {
          name: "duration",
          type: "number",
          default: "0.5",
          description: "Duration of the animation in seconds."
        },
        {
          name: "staggerChildren",
          type: "number",
          default: "0.05",
          description: "Time between each character's animation for cascade effects."
        },
        {
          name: "once",
          type: "boolean",
          default: "true",
          description: "If true, animation plays only once when in view."
        },
        {
          name: "fontSize",
          type: "string",
          default: '"2xl"',
          description: "Font size using Tailwind CSS size classes."
        },
        {
          name: "fontWeight",
          type: "string",
          default: '"bold"',
          description: "Font weight using Tailwind CSS weight classes."
        },
        {
          name: "color",
          type: "string",
          default: '""',
          description: "Text color (uses theme colors if not specified)."
        }
      ]
    }
  ],
  category: "Typography",
  examples: [
    {
      name: "Cascade Title Animation",
      preview: (
        <div className="p-4 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg text-center">
          <AnimateText 
            text="Welcome to NyxUI" 
            type="cascade" 
            className="text-4xl font-bold text-white" 
          />
          <AnimateText 
            text="Modern Animation Library" 
            type="rise" 
            className="text-xl text-blue-200 mt-2" 
            delay={0.5}
          />
        </div>
      ),
      filename: "CascadeTitleAnimation.tsx",
      code: `import { AnimateText } from "@/nyxui/components/AnimatedText";
  
export function CascadeTitleAnimation() {
  return (
    <div className="p-4 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg text-center">
      <AnimateText 
        text="Welcome to NyxUI" 
        type="cascade" 
        className="text-4xl font-bold text-white" 
      />
      <AnimateText 
        text="Modern Animation Library" 
        type="rise" 
        className="text-xl text-blue-200 mt-2" 
        delay={0.5}
      />
    </div>
  );
}`
    },
    {
      name: "Interactive Feature Highlight",
      preview: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 border rounded-lg hover:shadow-lg transition-shadow">
            <AnimateText 
              text="Real-time Editing" 
              type="flicker" 
              className="text-lg font-semibold text-emerald-600 mb-2" 
            />
            <p className="text-gray-600 dark:text-gray-300">
              Edit your designs with instant preview feedback
            </p>
          </div>
          <div className="p-5 border rounded-lg hover:shadow-lg transition-shadow">
            <AnimateText 
              text="Responsive Design" 
              type="expand" 
              className="text-lg font-semibold text-purple-600 mb-2" 
            />
            <p className="text-gray-600 dark:text-gray-300">
              Ensure your UI looks great on all devices
            </p>
          </div>
        </div>
      ),
      filename: "FeatureHighlight.tsx",
      code: `import { AnimateText } from "@/nyxui/components/AnimatedText";
  
export function FeatureHighlight() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-5 border rounded-lg hover:shadow-lg transition-shadow">
        <AnimateText 
          text="Real-time Editing" 
          type="flicker" 
          className="text-lg font-semibold text-emerald-600 mb-2" 
        />
        <p className="text-gray-600 dark:text-gray-300">
          Edit your designs with instant preview feedback
        </p>
      </div>
      <div className="p-5 border rounded-lg hover:shadow-lg transition-shadow">
        <AnimateText 
          text="Responsive Design" 
          type="expand" 
          className="text-lg font-semibold text-purple-600 mb-2" 
        />
        <p className="text-gray-600 dark:text-gray-300">
          Ensure your UI looks great on all devices
        </p>
      </div>
    </div>
  );
}`
    },
    {
      name: "Elastic Call-to-Action",
      preview: (
        <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300 mb-3">Ready to get started?</p>
          <AnimateText 
            text="Join NyxUI Today" 
            type="elastic" 
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer" 
          />
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">
            Start building beautiful interfaces faster
          </p>
        </div>
      ),
      filename: "ElasticCTA.tsx",
      code: `import { AnimateText } from "@/nyxui/components/AnimatedText";
  
export function ElasticCTA() {
  return (
    <div className="text-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <p className="text-gray-600 dark:text-gray-300 mb-3">Ready to get started?</p>
      <AnimateText 
        text="Join NyxUI Today" 
        type="elastic" 
        className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 cursor-pointer" 
      />
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">
        Start building beautiful interfaces faster
      </p>
    </div>
  );
}`
    },
  ]
};