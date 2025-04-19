import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { ScrollAnimationTrigger } from "@/nuvyxui/components/ScrollAnimationTrigger";
import { ScrollAnimationTriggerDemo } from "@/nuvyxui/demos/ScrollAnimationTriggerDemo";
import { Palette,RefreshCw,} from "lucide-react";

import ScrollAnimationTriggerSource from "!!raw-loader!@/nuvyxui/components/ScrollAnimationTrigger.tsx";
import ScrollAnimationTriggerDemoSource from "!!raw-loader!@/nuvyxui/demos/ScrollAnimationTriggerDemo.tsx";

export const scrollAnimationTriggerData: ComponentData = {
  name: "Scroll Animation Trigger",
  description:
    "UI elements that change color, size, or shape based on scroll progress. Text that reveals dynamically when entering the viewport.",
  preview: <ScrollAnimationTriggerDemo />,
  usage: ScrollAnimationTriggerDemoSource,
  componentCode: ScrollAnimationTriggerSource,
  dependencies: [
    {
      name: "Framer Motion + Utility Functions",
      description: "Framer Motion + Utility functions for conditional class name merging.",
      install: {
        npm: "npm install framer-motion clsx tailwind-merge",
        pnpm: "pnpm add framer-motion clsx tailwind-merge",
        yarn: "yarn add framer-motion clsx tailwind-merge",
        bun: "bun add framer-motion clsx tailwind-merge",
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
      name: "ScrollAnimationTrigger",
      items: [
        {
          name: "children",
          type: "ReactNode",
          default: "",
          description: "The content to be animated",
        },
        {
          name: "effect",
          type: "string",
          default: "fade",
          description: "The animation effect - (fade, scale, slide, color, rotate, custom)",
        },
        {
          name: "threshold",
          type: "number",
          default: "0.1",
          description: "The threshold for triggering the animation (0-1)",
        },
        {
          name: "delay",
          type: "number",
          default: "0",
          description: "Delay before the animation starts (in seconds)",
        },
        {
          name: "duration",
          type: "number",
          default: "0.5",
          description: "Duration of the animation (in seconds)",
        },
        {
          name: "direction",
          type: "string",
          default: "up",
          description: "Direction for slide animation - (up, down, left, right)",
        },
        {
          name: "once",
          type: "boolean",
          default: "false",
          description: "Whether to trigger the animation only once",
        },
        {
          name: "customProps",
          type: "object",
          default: "{}",
          description: "Custom animation properties for the 'custom' effect",
        },
        {
          name: "as",
          type: "React.ElementType",
          default: "div",
          description: "The element type to render - (div, span, etc)",
        },
        {
          name: "className",
          type: "string",
          default: "",
          description: "Additional CSS classes to apply",
        },
        {
          name: "fromColor",
          type: "string",
          default: "var(--color-muted)",
          description: "Starting color for color transition",
        },
        {
          name: "toColor",
          type: "string",
          default: "var(--color-primary)",
          description: "Ending color for color transition",
        },
        {
          name: "fromRotation",
          type: "number",
          default: "-10",
          description: "Initial rotation angle for rotate effect (default is -10, adjusted dynamically by direction if needed)",
        },
        {
          name: "toRotation",
          type: "number",
          default: "0",
          description: "Final rotation angle for rotate effect",
        },
        {
          name: "fromScale",
          type: "number",
          default: "0.8",
          description: "Initial scale value for scale effect",
        },
        {
          name: "toScale",
          type: "number",
          default: "1",
          description: "Final scale value for scale effect",
        },
      ],
    },
  ],
  tags: ["Animation", "Scroll"],
  category: "Animation",
  examples: [
    {
      name: "Rotate Effect",
      preview: (
        <div className="max-w-md mx-auto">
          <ScrollAnimationTrigger
            effect="rotate"
            className="p-3 sm:p-4 md:p-6"
            delay={0.3}
            fromRotation={-15}
            toRotation={0}
          >
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-zinc-900 dark:to-zinc-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl w-full border-t border-l border-amber-200/50 dark:border-amber-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-1/4 h-1/4 rounded-full bg-amber-300/20 dark:bg-amber-300/10 -mr-5 -mt-5 blur-xl sm:blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-1/5 h-1/5 rounded-full bg-amber-300/20 dark:bg-amber-300/10 -ml-3 -mb-3 blur-md sm:blur-xl"></div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-md border border-amber-100 dark:border-amber-900/50 relative z-10 group-hover:shadow-amber-200 dark:group-hover:shadow-amber-900/30 transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/20 dark:from-amber-500/10 dark:to-amber-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <RefreshCw className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-amber-500 dark:text-amber-400" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-start text-amber-800 dark:text-amber-300">
                  Rotation Effect
                </h3>
              </div>

              <p className="text-amber-700/80 dark:text-amber-300/90 text-center sm:text-start text-sm sm:text-base md:text-lg leading-relaxed relative z-10 mb-4 sm:mb-6">
                This content spins into place as you scroll, adding a
                dynamic and playful element to the page that catches the
                eye.
              </p>

              <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <div className="p-1.5 sm:p-2 rounded-md bg-amber-500/20 dark:bg-amber-500/10">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm bg-amber-500 dark:bg-amber-400"></div>
                </div>
                <div className="p-1.5 sm:p-2 rounded-md bg-amber-500/20 dark:bg-amber-500/10">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500 dark:bg-amber-400"></div>
                </div>
                <div className="p-1.5 sm:p-2 rounded-md bg-amber-500/20 dark:bg-amber-500/10">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-amber-500 dark:bg-amber-400"></div>
                </div>
              </div>
            </div>
          </ScrollAnimationTrigger>
        </div>
      ),
      filename: "RotateEffect.tsx",
      code: `import { ScrollAnimationTrigger } from "@/components/ScrollAnimationTrigger";
  import { RefreshCw } from "lucide-react";
  
  export function RotateEffect() {
    return (
      <div className="max-w-md mx-auto">
        <ScrollAnimationTrigger
                effect="rotate"
                className="p-3 sm:p-4 md:p-6"
                delay={0.3}
                fromRotation={-15}
                toRotation={0}
              >
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-zinc-900 dark:to-zinc-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl w-full border-t border-l border-amber-200/50 dark:border-amber-500/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-1/4 h-1/4 rounded-full bg-amber-300/20 dark:bg-amber-300/10 -mr-5 -mt-5 blur-xl sm:blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-1/5 h-1/5 rounded-full bg-amber-300/20 dark:bg-amber-300/10 -ml-3 -mb-3 blur-md sm:blur-xl"></div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mb-4 sm:mb-6">
                    <div className="p-3 sm:p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-md border border-amber-100 dark:border-amber-900/50 relative z-10 group-hover:shadow-amber-200 dark:group-hover:shadow-amber-900/30 transition-shadow duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/20 dark:from-amber-500/10 dark:to-amber-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <RefreshCw className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-amber-500 dark:text-amber-400" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-start text-amber-800 dark:text-amber-300">
                      Rotation Effect
                    </h3>
                  </div>

                  <p className="text-amber-700/80 dark:text-amber-300/90 text-center sm:text-start text-sm sm:text-base md:text-lg leading-relaxed relative z-10 mb-4 sm:mb-6">
                    This content spins into place as you scroll, adding a
                    dynamic and playful element to the page that catches the
                    eye.
                  </p>

                  <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <div className="p-1.5 sm:p-2 rounded-md bg-amber-500/20 dark:bg-amber-500/10">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm bg-amber-500 dark:bg-amber-400"></div>
                    </div>
                    <div className="p-1.5 sm:p-2 rounded-md bg-amber-500/20 dark:bg-amber-500/10">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500 dark:bg-amber-400"></div>
                    </div>
                    <div className="p-1.5 sm:p-2 rounded-md bg-amber-500/20 dark:bg-amber-500/10">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-amber-500 dark:bg-amber-400"></div>
                    </div>
                  </div>
                </div>
              </ScrollAnimationTrigger>
      </div>
    );
  }`,
    },
    {
      name: "Color Change Effect",
      preview: (
        <div className="max-w-md mx-auto">
          <ScrollAnimationTrigger
            effect="color"
            className="p-3 sm:p-4 md:p-6"
            fromColor="#2b13c2"
            toColor="#f002cc"
          >
            <div
              className="bg-white dark:bg-zinc-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl w-full overflow-hidden relative group"
              style={{
                background:
                  "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(43, 19, 194, 0.1))",
              }}
            >
              <div className="absolute inset-0 opacity-5">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <pattern
                    id="grid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 10 0 L 0 0 0 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-pink-100 dark:border-pink-900/50 relative z-10 group-hover:shadow-pink-200 dark:group-hover:shadow-pink-900/30 transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-indigo-600/20 dark:from-pink-500/10 dark:to-indigo-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Palette className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 relative z-10" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-start">
                  Color Change
                </h3>
              </div>

              <p className="text-center sm:text-start text-sm sm:text-base md:text-lg leading-relaxed relative z-10 mb-4 sm:mb-6">
                Watch the text transform through vibrant colors as you
                scroll through this section, creating a playful and engaging
                visual experience tied to your scroll position.
              </p>

              <div className="relative z-10 mt-4 sm:mt-6 p-2 sm:p-3 bg-gray-50 dark:bg-zinc-900 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-indigo-500"></span>
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-violet-500"></span>
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-fuchsia-500"></span>
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-pink-500"></span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #2b13c2, #a855f7, #ec4899)",
                      width: "60%",
                    }}
                  />
                </div>
              </div>
            </div>
          </ScrollAnimationTrigger></div>
      ),
      filename: "ColorChangeEffect.tsx",
      code: `import { ScrollAnimationTrigger } from "@/components/ScrollAnimationTrigger";
  import { Palette } from "lucide-react";
  
  export function ColorChangeEffect() {
    return (
      <div className="max-w-md mx-auto">
        <ScrollAnimationTrigger
                effect="color"
                className="p-3 sm:p-4 md:p-6"
                fromColor="#2b13c2"
                toColor="#ffffff"
              >
                <div
                  className="bg-white dark:bg-zinc-800 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-xl w-full overflow-hidden relative group"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(43, 19, 194, 0.1))",
                  }}
                >
                  <div className="absolute inset-0 opacity-5">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <pattern
                        id="grid"
                        width="10"
                        height="10"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 10 0 L 0 0 0 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                        />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center mb-4 sm:mb-6">
                    <div className="p-3 sm:p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-pink-100 dark:border-pink-900/50 relative z-10 group-hover:shadow-pink-200 dark:group-hover:shadow-pink-900/30 transition-shadow duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-indigo-600/20 dark:from-pink-500/10 dark:to-indigo-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Palette className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 relative z-10" />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-start">
                      Color Change
                    </h3>
                  </div>

                  <p className="text-center sm:text-start text-sm sm:text-base md:text-lg leading-relaxed relative z-10 mb-4 sm:mb-6">
                    Watch the text transform through vibrant colors as you
                    scroll through this section, creating a playful and engaging
                    visual experience tied to your scroll position.
                  </p>

                  <div className="relative z-10 mt-4 sm:mt-6 p-2 sm:p-3 bg-gray-50 dark:bg-zinc-900 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-indigo-500"></span>
                      <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-violet-500"></span>
                      <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-fuchsia-500"></span>
                      <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-pink-500"></span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #2b13c2, #a855f7, #ec4899)",
                          width: "60%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </ScrollAnimationTrigger>
      </div>
    );
  }`,
    },
  ],
};
