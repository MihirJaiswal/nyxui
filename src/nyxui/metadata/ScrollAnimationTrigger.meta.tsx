import type { ComponentData } from "./ComponentInterfaces"
import { ScrollAnimationTrigger } from "@/nyxui/components/ScrollAnimationTrigger"
import { ScrollAnimationTriggerDemo } from "@/nyxui/demos/ScrollAnimationTriggerDemo"
import { ArrowUp, FileBadge2, Lightbulb, Maximize, Palette, RotateCw, Sparkles, Star } from "lucide-react"

export const scrollAnimationTriggerData: ComponentData = {
  name: "Scroll Animation Trigger",
  description:
    "UI elements that change color, size, or shape based on scroll progress. Text that reveals dynamically when entering the viewport. Ideal for storytelling-based UI experiences.",
  preview: <ScrollAnimationTriggerDemo />,
  usage: `import { ScrollAnimationTrigger } from "@/components/ScrollAnimationTrigger"

export function MyComponent() {
  return (
    <ScrollAnimationTrigger effect="fade">
      <div>This content will fade in when scrolled into view</div>
    </ScrollAnimationTrigger>
  )
}`,
  componentCode: `// Full component code available in the ScrollAnimationTrigger.tsx file`,
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
      name: "ScrollAnimationTrigger",
      items: [
        {
          name: "effect",
          type: "string",
          default: '"fade" | "scale" | "slide" | "color" | "rotate" | "custom"',
          description: "The animation effect to apply",
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
          default: '"up" | "down" | "left" | "right"',
          description: "Direction for slide animations",
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
          description: "The element type to render",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Additional CSS classes to apply",
        },
      ],
    },
  ],
  category: "Animation",
  examples: [
    {
      name: "Fade In Effect",
      preview: (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-blue-900/30 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
              <FileBadge2 className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-sm font-medium text-blue-500 dark:text-blue-400">Animation</div>
          </div>
          <ScrollAnimationTrigger 
            effect="fade" 
            threshold={0.2} 
            delay={0.2}
          >
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Fade In Animation</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              This content smoothly fades into view as it enters the viewport, creating a clean and 
              elegant transition that enhances the user experience.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                Learn more
              </button>
            </div>
          </ScrollAnimationTrigger>
        </div>
      ),
      filename: "FadeInEffect.tsx",
      code: `import { ScrollAnimationTrigger } from "@/components/ScrollAnimationTrigger";
  import { FileBadge2 } from "lucide-react";
  
  export function FadeInEffect() {
    return (
      <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-blue-100 dark:border-blue-900/30 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
            <FadeIn className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-sm font-medium text-blue-500 dark:text-blue-400">Animation</div>
        </div>
        <ScrollAnimationTrigger 
          effect="fade" 
          threshold={0.2} 
          delay={0.2}
        >
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Fade In Animation</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            This content smoothly fades into view as it enters the viewport, creating a clean and 
            elegant transition that enhances the user experience.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              Learn more
            </button>
          </div>
        </ScrollAnimationTrigger>
      </div>
    );
  }`,
    },
    {
      name: "Slide Up Effect",
      preview: (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-green-100 dark:border-green-900/30 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-3">
              <ArrowUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-sm font-medium text-green-500 dark:text-green-400">Motion</div>
          </div>
          <ScrollAnimationTrigger 
            effect="slide" 
            direction="up" 
            threshold={0.2}
            duration={0.6}
          >
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Slide Up Animation</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              This content gracefully slides up into position as you scroll, creating a natural flow 
              that guides the user through your content.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Smooth</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Responsive</span>
              </div>
            </div>
          </ScrollAnimationTrigger>
        </div>
      ),
      filename: "SlideUpEffect.tsx",
      code: `import { ScrollAnimationTrigger } from "@/components/ScrollAnimationTrigger";
  import { ArrowUp } from "lucide-react";
  
  export function SlideUpEffect() {
    return (
      <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-green-100 dark:border-green-900/30 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full mr-3">
            <ArrowUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-sm font-medium text-green-500 dark:text-green-400">Motion</div>
        </div>
        <ScrollAnimationTrigger 
          effect="slide" 
          direction="up" 
          threshold={0.2}
          duration={0.6}
        >
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Slide Up Animation</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            This content gracefully slides up into position as you scroll, creating a natural flow 
            that guides the user through your content.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Smooth</span>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Responsive</span>
            </div>
          </div>
        </ScrollAnimationTrigger>
      </div>
    );
  }`,
    },
    {
      name: "Custom Animation",
      preview: (
        <div className="p-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg relative overflow-hidden group">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-white/20 rounded-full mr-3">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm font-medium text-white/80">Premium</div>
            </div>
            
            <ScrollAnimationTrigger
              effect="custom"
              customProps={{
                initial: { x: -100, y: 100, opacity: 0, rotate: -10, scale: 0.9 },
                animate: { x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 },
                transition: { type: "spring", stiffness: 100, damping: 12, delay: 0.2 }
              }}
            >
              <h3 className="text-xl font-bold mb-3 text-white">Custom Animation</h3>
              <p className="text-white/80 leading-relaxed">
                This content uses complex custom animations with diagonal movement, rotation, and scaling
                for maximum visual impact.
              </p>
              <div className="mt-6 flex space-x-3">
                <button className="px-4 py-2 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
                  Get started
                </button>
                <button className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-opacity-30 transition-colors">
                  Learn more
                </button>
              </div>
            </ScrollAnimationTrigger>
          </div>
          
          {/* Interactive hover element */}
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      ),
      filename: "CustomAnimation.tsx",
      code: `import { ScrollAnimationTrigger } from "@/components/ScrollAnimationTrigger";
  import { Sparkles } from "lucide-react";
  
  export function CustomAnimation() {
    return (
      <div className="p-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg relative overflow-hidden group">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-white/20 rounded-full mr-3">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="text-sm font-medium text-white/80">Premium</div>
          </div>
          
          <ScrollAnimationTrigger
            effect="custom"
            customProps={{
              initial: { x: -100, y: 100, opacity: 0, rotate: -10, scale: 0.9 },
              animate: { x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 },
              transition: { type: "spring", stiffness: 100, damping: 12, delay: 0.2 }
            }}
          >
            <h3 className="text-xl font-bold mb-3 text-white">Custom Animation</h3>
            <p className="text-white/80 leading-relaxed">
              This content uses complex custom animations with diagonal movement, rotation, and scaling
              for maximum visual impact.
            </p>
            <div className="mt-6 flex space-x-3">
              <button className="px-4 py-2 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
                Get started
              </button>
              <button className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-opacity-30 transition-colors">
                Learn more
              </button>
            </div>
          </ScrollAnimationTrigger>
        </div>
        
        {/* Interactive hover element */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    );
  }`,
    },
    // New Examples
    {
      name: "Scale Effect",
      preview: (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-amber-100 dark:border-amber-900/30 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mr-3">
              <Maximize className="h-5 w-5 text-amber-500" />
            </div>
            <div className="text-sm font-medium text-amber-500 dark:text-amber-400">Scale</div>
          </div>
          <ScrollAnimationTrigger 
            effect="scale" 
            threshold={0.2} 
            duration={0.7}
          >
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Scale Animation</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Watch as this content smoothly scales from small to full size as you scroll,
              creating an eye-catching effect that emphasizes important information.
            </p>
            <div className="mt-4 flex justify-end">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </span>
            </div>
          </ScrollAnimationTrigger>
        </div>
      ),
      filename: "ScaleEffect.tsx",
      code: `import { ScrollAnimationTrigger } from "@/components/ScrollAnimationTrigger";
  import { Maximize, Star } from "lucide-react";
  
  export function ScaleEffect() {
    return (
      <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-amber-100 dark:border-amber-900/30 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mr-3">
            <Maximize className="h-5 w-5 text-amber-500" />
          </div>
          <div className="text-sm font-medium text-amber-500 dark:text-amber-400">Scale</div>
        </div>
        <ScrollAnimationTrigger 
          effect="scale" 
          threshold={0.2} 
          duration={0.7}
        >
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Scale Animation</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Watch as this content smoothly scales from small to full size as you scroll,
            creating an eye-catching effect that emphasizes important information.
          </p>
          <div className="mt-4 flex justify-end">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </span>
          </div>
        </ScrollAnimationTrigger>
      </div>
    );
  }`,
    },
    {
      name: "Color Change Effect",
      preview: (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-pink-100 dark:border-pink-900/30 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-full mr-3">
              <Palette className="h-5 w-5 text-pink-500" />
            </div>
            <div className="text-sm font-medium text-pink-500 dark:text-pink-400">Color</div>
          </div>
          <ScrollAnimationTrigger 
            effect="color" 
            threshold={0.2} 
            duration={0.8}
          >
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Color Change Animation</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              This content transforms through a beautiful color transition as it enters your view,
              creating a visually engaging experience.
            </p>
            <div className="mt-4 flex">
              <div className="flex space-x-1">
                <div className="w-6 h-6 rounded-full bg-pink-500"></div>
                <div className="w-6 h-6 rounded-full bg-purple-500"></div>
                <div className="w-6 h-6 rounded-full bg-indigo-500"></div>
                <div className="w-6 h-6 rounded-full bg-blue-500"></div>
              </div>
            </div>
          </ScrollAnimationTrigger>
        </div>
      ),
      filename: "ColorChangeEffect.tsx",
      code: `import { ScrollAnimationTrigger } from "@/components/ScrollAnimationTrigger";
  import { Palette } from "lucide-react";
  
  export function ColorChangeEffect() {
    return (
      <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-pink-100 dark:border-pink-900/30 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-full mr-3">
            <Palette className="h-5 w-5 text-pink-500" />
          </div>
          <div className="text-sm font-medium text-pink-500 dark:text-pink-400">Color</div>
        </div>
        <ScrollAnimationTrigger 
          effect="color" 
          threshold={0.2} 
          duration={0.8}
        >
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Color Change Animation</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            This content transforms through a beautiful color transition as it enters your view,
            creating a visually engaging experience.
          </p>
          <div className="mt-4 flex">
            <div className="flex space-x-1">
              <div className="w-6 h-6 rounded-full bg-pink-500"></div>
              <div className="w-6 h-6 rounded-full bg-purple-500"></div>
              <div className="w-6 h-6 rounded-full bg-indigo-500"></div>
              <div className="w-6 h-6 rounded-full bg-blue-500"></div>
            </div>
          </div>
        </ScrollAnimationTrigger>
      </div>
    );
  }`,
    },
    {
      name: "Rotate Effect",
      preview: (
        <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-cyan-100 dark:border-cyan-900/30 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mr-3">
              <RotateCw className="h-5 w-5 text-cyan-500" />
            </div>
            <div className="text-sm font-medium text-cyan-500 dark:text-cyan-400">Rotate</div>
          </div>
          <ScrollAnimationTrigger 
            effect="rotate" 
            direction="right"
            threshold={0.2} 
            duration={0.7}
          >
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-full h-full bg-cyan-50 dark:bg-cyan-900/20 rounded-lg transform rotate-3"></div>
              <div className="relative p-4 bg-white dark:bg-gray-700 rounded-lg border border-cyan-100 dark:border-cyan-900/30">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Rotation Animation</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  This content rotates into place as you scroll, creating a playful and dynamic element 
                  that adds personality to your page.
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center">
                    <RotateCw className="h-6 w-6 text-cyan-500" />
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimationTrigger>
        </div>
      ),
      filename: "RotateEffect.tsx",
      code: `import { ScrollAnimationTrigger } from "@/components/ScrollAnimationTrigger";
  import { RotateCw } from "lucide-react";
  
  export function RotateEffect() {
    return (
      <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-cyan-100 dark:border-cyan-900/30 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mr-3">
            <RotateCw className="h-5 w-5 text-cyan-500" />
          </div>
          <div className="text-sm font-medium text-cyan-500 dark:text-cyan-400">Rotate</div>
        </div>
        <ScrollAnimationTrigger 
          effect="rotate" 
          direction="right"
          threshold={0.2} 
          duration={0.7}
        >
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-full h-full bg-cyan-50 dark:bg-cyan-900/20 rounded-lg transform rotate-3"></div>
            <div className="relative p-4 bg-white dark:bg-gray-700 rounded-lg border border-cyan-100 dark:border-cyan-900/30">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Rotation Animation</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                This content rotates into place as you scroll, creating a playful and dynamic element 
                that adds personality to your page.
              </p>
              <div className="mt-4 flex justify-center">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center">
                  <RotateCw className="h-6 w-6 text-cyan-500" />
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimationTrigger>
      </div>
    );
  }`,
    },
    {
      name: "Combined Effects",
      preview: (
        <div className="p-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-white/20 rounded-full mr-3">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm font-medium text-white/90">Advanced</div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <ScrollAnimationTrigger 
                effect="slide" 
                direction="left"
                threshold={0.2} 
                delay={0.1}
              >
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <h3 className="text-lg font-bold mb-2">Slide From Left</h3>
                  <p className="text-white/80 text-sm">
                    This panel slides in from the left side of the screen.
                  </p>
                </div>
              </ScrollAnimationTrigger>
              
              <ScrollAnimationTrigger 
                effect="slide" 
                direction="right"
                threshold={0.2} 
                delay={0.3}
              >
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <h3 className="text-lg font-bold mb-2">Slide From Right</h3>
                  <p className="text-white/80 text-sm">
                    This panel slides in from the right side of the screen.
                  </p>
                </div>
              </ScrollAnimationTrigger>
              
              <ScrollAnimationTrigger 
                effect="scale"
                threshold={0.2} 
                delay={0.5}
              >
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <h3 className="text-lg font-bold mb-2">Scale Up</h3>
                  <p className="text-white/80 text-sm">
                    This panel scales up from a smaller size.
                  </p>
                </div>
              </ScrollAnimationTrigger>
              
              <ScrollAnimationTrigger 
                effect="fade"
                threshold={0.2} 
                delay={0.7}
              >
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <h3 className="text-lg font-bold mb-2">Fade In</h3>
                  <p className="text-white/80 text-sm">
                    This panel fades in after all others appear.
                  </p>
                </div>
              </ScrollAnimationTrigger>
            </div>
          </div>
        </div>
      ),
      filename: "CombinedEffects.tsx",
      code: `import { ScrollAnimationTrigger } from "@/components/ScrollAnimationTrigger";
  import { Lightbulb } from "lucide-react";
  
  export function CombinedEffects() {
    return (
      <div className="p-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-white/20 rounded-full mr-3">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <div className="text-sm font-medium text-white/90">Advanced</div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <ScrollAnimationTrigger 
              effect="slide" 
              direction="left"
              threshold={0.2} 
              delay={0.1}
            >
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <h3 className="text-lg font-bold mb-2">Slide From Left</h3>
                <p className="text-white/80 text-sm">
                  This panel slides in from the left side of the screen.
                </p>
              </div>
            </ScrollAnimationTrigger>
            
            <ScrollAnimationTrigger 
              effect="slide" 
              direction="right"
              threshold={0.2} 
              delay={0.3}
            >
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <h3 className="text-lg font-bold mb-2">Slide From Right</h3>
                <p className="text-white/80 text-sm">
                  This panel slides in from the right side of the screen.
                </p>
              </div>
            </ScrollAnimationTrigger>
            
            <ScrollAnimationTrigger 
              effect="scale"
              threshold={0.2} 
              delay={0.5}
            >
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <h3 className="text-lg font-bold mb-2">Scale Up</h3>
                <p className="text-white/80 text-sm">
                  This panel scales up from a smaller size.
                </p>
              </div>
            </ScrollAnimationTrigger>
            
            <ScrollAnimationTrigger 
                effect="fade"
                threshold={0.2} 
                delay={0.7}
              >
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <h3 className="text-lg font-bold mb-2">Fade In</h3>
                  <p className="text-white/80 text-sm">
                    This panel fades in after all others appear.
                  </p>
                </div>
              </ScrollAnimationTrigger>
            </div>
          </div>
        </div>
      ),
    }`
    }  
] 
}

