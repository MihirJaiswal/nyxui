import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import { FloatingCard } from "@/nyxui/components/FloatingCard"
import { FloatingCardDemo } from "@/nyxui/demos/FloatingCardDemo"
import { Activity, Badge, CloudLightning, Globe, HeartPulse, LineChart, MessageCircle, MoreVertical, MountainSnowIcon, Share2, Shield, Smartphone, Sparkles, Star } from "lucide-react"
import fs from "fs";
import path from "path";
import { Button } from "@/components/ui/button";

const componentPath = path.join(process.cwd(), "src/nyxui/components/FloatingCard.tsx");
const FloatingCardSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/FloatingCardDemo.tsx");
const FloatingCardDemoSource = fs.readFileSync(demoPath, "utf8");


export const floatingCardData: ComponentData = {
  name: "Majestic Card",
  description:
    "Cards that float in layers when scrolling. Tilt and rotate subtly based on mouse movement. Adds realistic depth to UI components.",
  preview: <FloatingCardDemo />,
  usage: FloatingCardDemoSource,
  componentCode: FloatingCardSource,
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
      name: "Floating Card",
      items: [
        {
          name: "variant",
          type: "string",
          default: '"tilt"',
          description: "The animation variant: parallax, tilt, float, magnetic, layered, morph, breathe, glow, or wave",
        },
        {
          name: "intensity",
          type: "number",
          default: "3",
          description: "The intensity of the floating effect (1-5)",
        },
        {
          name: "theme",
          type: "string",
          default: '"light"',
          description: "The color theme: light, dark, glass, gradient, neon, cosmic, or custom",
        },
        {
          name: "customColors",
          type: "object",
          default: "undefined",
          description: "Custom colors object with background, border, shadow, and glow properties",
        },
        {
          name: "rounded",
          type: "string",
          default: '"lg"',
          description: "Border radius: none, sm, md, lg, xl, full, or pill",
        },
        {
          name: "shadow",
          type: "boolean",
          default: "true",
          description: "Whether to show a shadow effect",
        },
        {
          name: "shadowSize",
          type: "string",
          default: '"md"',
          description: "Shadow size: sm, md, lg, xl, or 2xl",
        },
        {
          name: "shadowType",
          type: "string",
          default: '"standard"',
          description: "Shadow type: standard, soft, hard, inner, or glow",
        },
        {
          name: "border",
          type: "boolean",
          default: "false",
          description: "Whether to show a border",
        },
        {
          name: "borderStyle",
          type: "string",
          default: '"solid"',
          description: "Border style: solid, dashed, dotted, gradient, or glow",
        },
        {
          name: "hoverEffect",
          type: "boolean",
          default: "true",
          description: "Whether to enable the hover effect",
        },
        {
          name: "scrollEffect",
          type: "boolean",
          default: "false",
          description: "Whether to enable scroll-based animations",
        },
        {
          name: "reduceMotion",
          type: "boolean",
          default: "false",
          description: "Reduces or disables animations for accessibility",
        },
        {
          name: "confettiEffect",
          type: "boolean",
          default: "false",
          description: "Adds a confetti animation effect on hover",
        },
        {
          name: "speed",
          type: "string",
          default: '"normal"',
          description: "Animation speed: slow, normal, or fast",
        },
        {
          name: "blurBackground",
          type: "boolean",
          default: "false",
          description: "Applies a backdrop blur effect to the background",
        },
        {
          name: "layerCount",
          type: "number",
          default: "3",
          description: "Number of layers for layered variant (1-5)",
        },
        {
          name: "layerSeparation",
          type: "number",
          default: "2",
          description: "Distance between layers for layered variant (1-5)",
        },
        {
          name: "floatPattern",
          type: "string",
          default: '"simple"',
          description: "Float animation pattern: simple, complex, random, sine, or circle",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes to apply",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "undefined",
          description: "The content to display inside the card",
        },
      ],
    },
  ],
  category: "Cards",
  examples: [
    {
      name: "Interactive Wave Dashboard Card",
      preview: (
        <FloatingCard 
          variant="wave" 
          theme="glass" 
          intensity={3} 
          shadow 
          shadowSize="lg" 
          rounded="lg" 
          floatPattern="complex"
          className="p-6 w-full"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 dark:text-white">Activity Overview</h3>
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Daily Active Users</p>
                <span className="text-green-500 text-sm font-medium">+12.5%</span>
              </div>
              <div className="flex items-end space-x-1">
                {[35, 58, 45, 65, 72, 53, 80].map((h, i) => (
                  <div 
                    key={i} 
                    className="bg-blue-500 dark:bg-blue-600 rounded-t w-full" 
                    style={{ height: `${h}px` }}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-sm flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Revenue</p>
                <div className="flex items-center">
                  <span className="text-xl font-bold text-gray-800 dark:text-white">$24.3k</span>
                  <span className="ml-2 text-xs text-green-500">+8.1%</span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-sm flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Conversion</p>
                <div className="flex items-center">
                  <span className="text-xl font-bold text-gray-800 dark:text-white">3.6%</span>
                  <span className="ml-2 text-xs text-red-500">-1.2%</span>
                </div>
              </div>
            </div>
          </div>
        </FloatingCard>
      ),
      filename: "InteractiveWaveDashboardCard.tsx",
      code: `import { FloatingCard } from "@/nyxui/components/FloatingCard";
  import { Activity } from 'lucide-react';
  
  export function InteractiveWaveDashboardCard() {
    return (
      <FloatingCard 
        variant="wave" 
        theme="glass" 
        intensity={3} 
        shadow 
        shadowSize="lg" 
        rounded="lg" 
        floatPattern="complex"
        className="p-6 w-full"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 dark:text-white">Activity Overview</h3>
          <Activity className="h-5 w-5 text-blue-500" />
        </div>
        
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Daily Active Users</p>
              <span className="text-green-500 text-sm font-medium">+12.5%</span>
            </div>
            <div className="flex items-end space-x-1">
              {[35, 58, 45, 65, 72, 53, 80].map((h, i) => (
                <div 
                  key={i} 
                  className="bg-blue-500 dark:bg-blue-600 rounded-t w-full" 
                  style={{ height: \`\${h}px\` }}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-sm flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Revenue</p>
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-800 dark:text-white">$24.3k</span>
                <span className="ml-2 text-xs text-green-500">+8.1%</span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-md p-3 shadow-sm flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Conversion</p>
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-800 dark:text-white">3.6%</span>
                <span className="ml-2 text-xs text-red-500">-1.2%</span>
              </div>
            </div>
          </div>
        </div>
      </FloatingCard>
    );
  }`
    },
    {
      name: "Premium Plan Card",
      preview: (
        <FloatingCard 
          variant="breathe" 
          theme="cosmic" 
          intensity={3} 
          shadow 
          shadowType="glow" 
          border 
          rounded="xl"
          hoverEffect
          className="w-full"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-violet-800 text-violet-100 hover:bg-violet-700">Premium</Badge>
              <Star className="h-5 w-5 text-amber-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Pro Plan</h3>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-3xl font-bold text-white">$49</span>
              <span className="text-gray-300 mb-1">/month</span>
            </div>
            <ul className="space-y-2 mb-6">
              {["Unlimited projects", "Priority support", "Advanced analytics", "Team collaboration"].map((feature, i) => (
                <li key={i} className="flex items-center text-gray-200">
                  <Shield className="h-4 w-4 text-violet-400 mr-2" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
              Get Started
            </Button>
          </div>
        </FloatingCard>
      ),
      filename: "PremiumPlanCard.tsx",
      code: `import { FloatingCard } from "@/nyxui/components/FloatingCard";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import { Star, Shield } from "lucide-react";
  
  export function PremiumPlanCard() {
    return (
      <FloatingCard 
        variant="breathe" 
        theme="cosmic" 
        intensity={3} 
        shadow 
        shadowType="glow" 
        border 
        rounded="xl"
        hoverEffect
        className="w-full"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-violet-800 text-violet-100 hover:bg-violet-700">Premium</Badge>
            <Star className="h-5 w-5 text-amber-300" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Pro Plan</h3>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-3xl font-bold text-white">$49</span>
            <span className="text-gray-300 mb-1">/month</span>
          </div>
          <ul className="space-y-2 mb-6">
            {["Unlimited projects", "Priority support", "Advanced analytics", "Team collaboration"].map((feature, i) => (
              <li key={i} className="flex items-center text-gray-200">
                <Shield className="h-4 w-4 text-violet-400 mr-2" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
            Get Started
          </Button>
        </div>
      </FloatingCard>
    );
  }`
    },
    {
      name: "Weather Card",
      preview: (
        <FloatingCard 
          variant="float" 
          floatPattern="complex" 
          theme="neon" 
          intensity={4} 
          shadow 
          shadowType="glow" 
          rounded="xl"
          className="w-full"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Weather</h3>
              <Badge className="bg-indigo-900 text-indigo-100">Now</Badge>
            </div>
            <div className="flex items-center justify-center mb-4">
              <CloudLightning className="w-16 h-16 text-indigo-300" />
            </div>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold text-white">23°</div>
              <div className="text-indigo-300 text-sm">Thunderstorms</div>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs text-indigo-200">
              <div>
                <div>Mon</div>
                <div className="font-medium">21°</div>
              </div>
              <div>
                <div>Tue</div>
                <div className="font-medium">24°</div>
              </div>
              <div>
                <div>Wed</div>
                <div className="font-medium">22°</div>
              </div>
              <div>
                <div>Thu</div>
                <div className="font-medium">25°</div>
              </div>
            </div>
          </div>
        </FloatingCard>
      ),
      filename: "WeatherCard.tsx",
      code: `import { FloatingCard } from "@/nyxui/components/FloatingCard";
  import { Badge } from "@/components/ui/badge";
  import { CloudLightning } from "lucide-react";
  
  export function WeatherCard() {
    return (
      <FloatingCard 
        variant="float" 
        floatPattern="complex" 
        theme="neon" 
        intensity={4} 
        shadow 
        shadowType="glow" 
        rounded="xl"
        className="w-full"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Weather</h3>
            <Badge className="bg-indigo-900 text-indigo-100">Now</Badge>
          </div>
          <div className="flex items-center justify-center mb-4">
            <CloudLightning className="w-16 h-16 text-indigo-300" />
          </div>
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-white">23°</div>
            <div className="text-indigo-300 text-sm">Thunderstorms</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-xs text-indigo-200">
            <div>
              <div>Mon</div>
              <div className="font-medium">21°</div>
            </div>
            <div>
              <div>Tue</div>
              <div className="font-medium">24°</div>
            </div>
            <div>
              <div>Wed</div>
              <div className="font-medium">22°</div>
            </div>
            <div>
              <div>Thu</div>
              <div className="font-medium">25°</div>
            </div>
          </div>
        </div>
      </FloatingCard>
    );
  }`
    },
    {
        name: "Analytics Dashboard Card",
        preview: (
          <FloatingCard 
            variant="tilt" 
            theme="glass" 
            intensity={4} 
            shadow 
            shadowSize="lg" 
            rounded="lg"
            blurBackground
            className="w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Analytics Dashboard</h3>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Live</Badge>
              </div>
              <div className="space-y-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Revenue</span>
                  <span className="text-sm font-medium">$12,546</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Users</span>
                  <span className="text-sm font-medium">2,845</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "64%" }}></div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View Full Report
              </Button>
            </div>
          </FloatingCard>
        ),
        filename: "AnalyticsDashboardCard.tsx",
        code: `import { FloatingCard } from "@/nyxui/components/FloatingCard";
      import { Badge } from "@/components/ui/badge";
      import { Button } from "@/components/ui/button";
      import { LineChart } from "lucide-react";
      
      export function AnalyticsDashboardCard() {
        return (
          <FloatingCard 
            variant="tilt" 
            theme="glass" 
            intensity={4} 
            shadow 
            shadowSize="lg" 
            rounded="lg"
            blurBackground
            className="w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Analytics Dashboard</h3>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Live</Badge>
              </div>
              <div className="space-y-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Revenue</span>
                  <span className="text-sm font-medium">$12,546</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Users</span>
                  <span className="text-sm font-medium">2,845</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "64%" }}></div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View Full Report
              </Button>
            </div>
          </FloatingCard>
        );
      }`
      },
      {
        name: "App Showcase Card",
        preview: (
          <FloatingCard 
            variant="float" 
            theme="glass" 
            intensity={3} 
            shadow 
            shadowSize="lg" 
            rounded="xl"
            blurBackground
            className="w-full"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">NyxUI Mobile</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">UI Component Library</p>
                </div>
              </div>
              <div className="relative h-40 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="w-20 h-36 bg-white dark:bg-zinc-700 rounded-xl shadow-lg relative overflow-hidden border-4 border-gray-300 dark:border-gray-600">
                  <div className="absolute inset-0 flex flex-col">
                    <div className="h-4 bg-gray-200 dark:bg-zinc-800"></div>
                    <div className="flex-grow p-1">
                      <div className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded mb-1"></div>
                      <div className="w-3/4 h-2 bg-blue-200 dark:bg-blue-900 rounded mb-1"></div>
                      <div className="w-1/2 h-2 bg-blue-200 dark:bg-blue-900 rounded mb-2"></div>
                      <div className="w-full h-8 bg-purple-200 dark:bg-purple-900 rounded mb-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Download App
              </Button>
            </div>
          </FloatingCard>
        ),
        filename: "AppShowcaseCard.tsx",
        code: `import { FloatingCard } from "@/nyxui/components/FloatingCard";
      import { Button } from "@/components/ui/button";
      import { Smartphone } from "lucide-react";
      
      export function AppShowcaseCard() {
        return (
          <FloatingCard 
            variant="float" 
            theme="glass" 
            intensity={3} 
            shadow 
            shadowSize="lg" 
            rounded="xl"
            blurBackground
            className="w-full"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">NyxUI Mobile</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">UI Component Library</p>
                </div>
              </div>
              <div className="relative h-40 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="w-20 h-36 bg-white dark:bg-zinc-700 rounded-xl shadow-lg relative overflow-hidden border-4 border-gray-300 dark:border-gray-600">
                  <div className="absolute inset-0 flex flex-col">
                    <div className="h-4 bg-gray-200 dark:bg-zinc-800"></div>
                    <div className="flex-grow p-1">
                      <div className="w-full h-2 bg-blue-200 dark:bg-blue-900 rounded mb-1"></div>
                      <div className="w-3/4 h-2 bg-blue-200 dark:bg-blue-900 rounded mb-1"></div>
                      <div className="w-1/2 h-2 bg-blue-200 dark:bg-blue-900 rounded mb-2"></div>
                      <div className="w-full h-8 bg-purple-200 dark:bg-purple-900 rounded mb-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Download App
              </Button>
            </div>
          </FloatingCard>
        );
      }`
      },
      {
        name: "Testimonial Card",
        preview: (
          <FloatingCard 
            variant="tilt" 
            theme="light" 
            intensity={2} 
            shadow 
            rounded="lg"
            border
            borderStyle="solid"
            className="w-full"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-700 rounded-full mr-3"></div>
                <div>
                  <h3 className="font-medium">Anshita Rathore</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Designer</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex mb-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400" fill="#facc15" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  "The FloatingCard component has transformed our dashboard UI. The subtle animations add a layer of polish that really impresses our clients."
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                Verified Purchase - March 15, 2025
              </p>
            </div>
          </FloatingCard>
        ),
        filename: "TestimonialCard.tsx",
        code: `import { FloatingCard } from "@/nyxui/components/FloatingCard";
      import { Star } from "lucide-react";
      
      export function TestimonialCard() {
        return (
          <FloatingCard 
            variant="tilt" 
            theme="light" 
            intensity={2} 
            shadow 
            rounded="lg"
            border
            borderStyle="solid"
            className="w-full"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-zinc-700 rounded-full mr-3"></div>
                <div>
                  <h3 className="font-medium">Sarah Johnson</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Product Designer</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex mb-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400" fill="#facc15" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  "The FloatingCard component has transformed our dashboard UI. The subtle animations add a layer of polish that really impresses our clients."
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                Verified Purchase - March 15, 2025
              </p>
            </div>
          </FloatingCard>
        );
      }`
      },
      {
        name: "Social Media Card",
        preview: (
          <FloatingCard 
            variant="breathe" 
            theme="dark" 
            intensity={2} 
            shadow 
            shadowSize="lg" 
            rounded="xl"
            className="w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mr-3 flex items-center justify-center">
                    <HeartPulse className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Social Connect</h3>
                    <p className="text-xs text-gray-400">5 minutes ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Just launched our new design system with interactive cards! 🚀 Check out these amazing hover effects.
              </p>
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 hover:text-pink-500">
                    <HeartPulse className="h-4 w-4" />
                    <span>72</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500">
                    <MessageCircle className="h-4 w-4" />
                    <span>14</span>
                  </button>
                </div>
                <button className="hover:text-green-500">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </FloatingCard>
        ),
        filename: "SocialMediaCard.tsx",
        code: `import { FloatingCard } from "@/nyxui/components/FloatingCard";
      import { Button } from "@/components/ui/button";
      import { HeartPulse, MoreVertical, MessageCircle, Share2 } from "lucide-react";
      
      export function SocialMediaCard() {
        return (
          <FloatingCard 
            variant="breathe" 
            theme="dark" 
            intensity={2} 
            shadow 
            shadowSize="lg" 
            rounded="xl"
            className="w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mr-3 flex items-center justify-center">
                    <HeartPulse className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Social Connect</h3>
                    <p className="text-xs text-gray-400">5 minutes ago</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Just launched our new design system with interactive cards! 🚀 Check out these amazing hover effects.
              </p>
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 hover:text-pink-500">
                    <HeartPulse className="h-4 w-4" />
                    <span>72</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500">
                    <MessageCircle className="h-4 w-4" />
                    <span>14</span>
                  </button>
                </div>
                <button className="hover:text-green-500">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </FloatingCard>
        );
      }`
      },
      {
        name: "Morphing Card",
        preview: (
          <FloatingCard 
            variant="morph" 
            theme="gradient" 
            intensity={5} 
            shadow 
            shadowSize="lg" 
            rounded="lg"
            hoverEffect
            confettiEffect
            className="w-full"
          >
            <div className="p-5 text-center">
              <div className="mb-3 mx-auto w-12 h-12 flex items-center justify-center bg-indigo-100 rounded-full">
                <Sparkles className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Morphing Shape</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Hover to see the shape transform with confetti
              </p>
              <Button size="sm" className="w-full">Try Me!</Button>
            </div>
          </FloatingCard>
        ),
        filename: "MorphingCard.tsx",
        code: `import { FloatingCard } from "@/nyxui/components/FloatingCard";
      import { Button } from "@/components/ui/button";
      import { Sparkles } from "lucide-react";
      
      export function MorphingCard() {
        return (
          <FloatingCard 
            variant="morph" 
            theme="gradient" 
            intensity={5} 
            shadow 
            shadowSize="lg" 
            rounded="lg"
            hoverEffect
            confettiEffect
            className="w-full"
          >
            <div className="p-5 text-center">
              <div className="mb-3 mx-auto w-12 h-12 flex items-center justify-center bg-indigo-100 rounded-full">
                <Sparkles className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Morphing Shape</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Hover to see the shape transform with confetti
              </p>
              <Button size="sm" className="w-full">Try Me!</Button>
            </div>
          </FloatingCard>
        );
      }`
      },
      {
        name: "Layered Effect Card",
        preview: (
          <FloatingCard 
            variant="layered" 
            theme="light" 
            intensity={5} 
            shadow 
            shadowType="glow" 
            rounded="xl" 
            layerCount={5}
            layerSeparation={5}
            className="w-full p-8"
          >
            <div className="relative h-64 overflow-hidden">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  3D Layered Effect
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Move your cursor to explore the depth
                </p>
              </div>
      
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: <MountainSnowIcon />, title: "Background", layer: "0.4", color: "bg-amber-100 text-amber-800" },
                  { icon: <Globe />, title: "Middle", layer: "0.7", color: "bg-blue-100 text-blue-800" },
                  { icon: <Star />, title: "Foreground", layer: "1", color: "bg-violet-100 text-violet-800" }
                ].map((item, i) => (
                  <div key={i} data-layer={item.layer} className="flex flex-col items-center transition-transform duration-300 ease-out p-4 rounded-lg shadow-md bg-white">
                    <div className={`mb-3 p-3 rounded-full ${item.color}`}>
                      {item.icon}
                    </div>
                    <h4 className="font-medium text-gray-800">{item.title}</h4>
                    <p className="text-xs text-center mt-2 text-gray-500">
                      Layer {item.layer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FloatingCard>
        ),
        filename: "LayeredEffectCard.tsx",
        code: `import { FloatingCard } from "@/nyxui/components/FloatingCard";
      import { MountainSnow, Globe, Star } from "lucide-react";
      
      export function LayeredEffectCard() {
        return (
          <FloatingCard 
            variant="layered" 
            theme="light" 
            intensity={5} 
            shadow 
            shadowType="glow" 
            rounded="xl" 
            layerCount={5}
            layerSeparation={5}
            className="w-full p-8"
          >
            <div className="relative h-64 overflow-hidden">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  3D Layered Effect
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Move your cursor to explore the depth
                </p>
              </div>
      
              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: <MountainSnow />, title: "Background", layer: "0.4", color: "bg-amber-100 text-amber-800" },
                  { icon: <Globe />, title: "Middle", layer: "0.7", color: "bg-blue-100 text-blue-800" },
                  { icon: <Star />, title: "Foreground", layer: "1", color: "bg-violet-100 text-violet-800" }
                ].map((item, i) => (
                  <div key={i} data-layer={item.layer} className="flex flex-col items-center transition-transform duration-300 ease-out p-4 rounded-lg shadow-md bg-white">
                    <div className={\`mb-3 p-3 rounded-full \${item.color}\`}>
                      {item.icon}
                    </div>
                    <h4 className="font-medium text-gray-800">{item.title}</h4>
                    <p className="text-xs text-center mt-2 text-gray-500">
                      Layer {item.layer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FloatingCard>
        );
      }`
      }
  ]
}