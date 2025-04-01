import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import { DynamicGridLayout } from "@/nyxui/components/DynamicGridLayout"
import { DynamicGridLayoutDemo } from "@/nyxui/demos/DynamicGridLayoutDemo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart } from "lucide-react"

export const dynamicGridLayoutData: ComponentData = {
  name: "Dynamic Grid Layout",
  description:
    "Responsive grid layouts that morph dynamically based on screen size. Elements fluidly rearrange themselves for a highly adaptive feel. Works well for dashboards, eCommerce, and portfolio layouts.",
  preview: <DynamicGridLayoutDemo />,
  usage: `import { DynamicGridLayout, GridItem } from "@/components/DynamicGridLayout"

export function MyComponent() {
  // Define your grid items
  const items: GridItem[] = [
    {
      id: 1,
      content: <div>Item 1</div>,
      size: "medium"
    },
    {
      id: 2,
      content: <div>Item 2</div>,
      size: "small"
    },
    // More items...
  ]

  return (
    <DynamicGridLayout 
      items={items}
      gap={16}
      morphEffect={true}
    />
  )
}`,
  componentCode: `// Full component code available in the DynamicGridLayout.tsx file`,
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
      name: "DynamicGridLayout",
      items: [
        {
          name: "items",
          type: "GridItem[]",
          default: "[]",
          description: "Array of grid items to display",
        },
        {
          name: "gap",
          type: "number",
          default: "16",
          description: "Gap between grid items in pixels",
        },
        {
          name: "animationDuration",
          type: "number",
          default: "0.5",
          description: "Duration of the morphing animation in seconds",
        },
        {
          name: "breakpoints",
          type: "object",
          default: "{ sm: 640, md: 768, lg: 1024, xl: 1280 }",
          description: "Breakpoints for responsive layout changes",
        },
        {
          name: "adaptiveHeight",
          type: "boolean",
          default: "true",
          description: "Whether items should adapt their height",
        },
        {
          name: "morphEffect",
          type: "boolean",
          default: "true",
          description: "Whether to enable the morphing animation effect",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Additional CSS classes for the container",
        },
        {
          name: "itemClassName",
          type: "string",
          default: '""',
          description: "Additional CSS classes for all grid items",
        },
      ],
    },
    {
      name: "GridItem",
      items: [
        {
          name: "id",
          type: "string | number",
          default: "required",
          description: "Unique identifier for the grid item",
        },
        {
          name: "content",
          type: "ReactNode",
          default: "required",
          description: "Content to display in the grid item",
        },
        {
          name: "size",
          type: "string",
          default: '"small" | "medium" | "large" | "wide" | "tall" | "featured"',
          description: "Size of the grid item",
        },
        {
          name: "priority",
          type: "number",
          default: "0",
          description: "Priority for ordering (higher numbers appear first)",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Additional CSS classes for this specific item",
        },
      ],
    },
  ],
  category: "Layout",
  examples : [
    {
      name: "Vibrant Color Grid Layout",
      preview: (
        <DynamicGridLayout
          items={[
            { id: 1, content: <div className="bg-blue-500 text-white p-6 h-full rounded-lg flex items-center justify-center font-medium shadow-md">Item 1</div>, size: "small" },
            { id: 2, content: <div className="bg-green-500 text-white p-6 h-full rounded-lg flex items-center justify-center font-medium shadow-md">Item 2</div>, size: "small" },
            { id: 3, content: <div className="bg-yellow-500 text-white p-6 h-full rounded-lg flex items-center justify-center font-medium shadow-md">Item 3</div>, size: "small" },
            { id: 4, content: <div className="bg-purple-500 text-white p-6 h-full rounded-lg flex items-center justify-center font-medium shadow-md">Item 4</div>, size: "small" },
            { id: 5, content: <div className="bg-pink-500 text-white p-6 h-full rounded-lg flex items-center justify-center font-medium shadow-md">Item 5</div>, size: "small" },
            { id: 6, content: <div className="bg-indigo-500 text-white p-6 h-full rounded-lg flex items-center justify-center font-medium shadow-md">Item 6</div>, size: "small" },
          ]}
          gap={12}
        />
      ),
      filename: "VibrantColorGridLayout.tsx",
      code: `import { DynamicGridLayout, type GridItem } from "@/components/DynamicGridLayout";
  
  export function VibrantColorGridLayout() {
    const items: GridItem[] = [
      { id: 1, content: <div className="bg-blue-500 text-white p-6 h-full rounded-lg flex items-center justify-center font-medium shadow-md">Item 1</div>, size: "small" },
      { id: 2, content: <div className="bg-green-500 text-white p-6 h-full rounded-lg flex items-center justify-center font-medium shadow-md">Item 2</div>, size: "small" },
      { id: 3, content: <div className="bg-yellow-500 text-white p-6 h-full rounded-lg flex items-center justify-center font-medium shadow-md">Item 3</div>, size: "small" },
      { id: 4, content: <div className="bg-purple-500 text-white p-6 h-full rounded-lg flex items-center justify-center font-medium shadow-md">Item 4</div>, size: "small" },
      { id: 5, content: <div className="bg-pink-500 text-white p-6 h-full rounded-lg flex items-center justify-center font-medium shadow-md">Item 5</div>, size: "small" },
      { id: 6, content: <div className="bg-indigo-500 text-white p-6 h-full rounded-lg flex items-center justify-center font-medium shadow-md">Item 6</div>, size: "small" },
    ];
  
    return <DynamicGridLayout items={items} gap={12} />;
  }`,
    },
    {
        name: "Card Grid Layout",
        preview: (
          <DynamicGridLayout
            items={[
              { 
                id: 1, 
                content: (
                  <div className="bg-white p-4 h-full rounded-lg border shadow-sm flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">Featured Post</h3>
                    <p className="text-gray-500 mb-4">This is a featured post with a longer description that spans multiple lines for emphasis.</p>
                    <div className="mt-auto pt-4 border-t">
                      <span className="text-sm text-blue-500">Read more →</span>
                    </div>
                  </div>
                ), 
                size: "featured",
                priority: 10
              },
              { 
                id: 2, 
                content: (
                  <div className="bg-white p-4 h-full rounded-lg border shadow-sm flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">Latest News</h3>
                    <p className="text-gray-500">Find out what's happening in our latest update.</p>
                    <div className="mt-auto pt-4 border-t">
                      <span className="text-sm text-blue-500">Read more →</span>
                    </div>
                  </div>
                ), 
                size: "medium" 
              },
              { 
                id: 3, 
                content: (
                  <div className="bg-white p-4 h-full rounded-lg border shadow-sm flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">Quick Tips</h3>
                    <p className="text-gray-500">Three tips to improve your workflow.</p>
                    <div className="mt-auto pt-4 border-t">
                      <span className="text-sm text-blue-500">Read more →</span>
                    </div>
                  </div>
                ), 
                size: "medium" 
              },
              { 
                id: 4, 
                content: (
                  <div className="bg-white p-4 h-full rounded-lg border shadow-sm flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">Resources</h3>
                    <p className="text-gray-500">Access all our resources in one place.</p>
                    <div className="mt-auto pt-4 border-t">
                      <span className="text-sm text-blue-500">Read more →</span>
                    </div>
                  </div>
                ), 
                size: "small" 
              },
            ]}
            gap={16}
            itemClassName="overflow-hidden"
          />
        ),
        filename: "CardGridLayout.tsx",
        code: `import { DynamicGridLayout, type GridItem } from "@/components/DynamicGridLayout";
    
    export function CardGridLayout() {
      const items: GridItem[] = [
        { 
          id: 1, 
          content: (
            <div className="bg-white p-4 h-full rounded-lg border shadow-sm flex flex-col">
              <h3 className="text-lg font-semibold mb-2">Featured Post</h3>
              <p className="text-gray-500 mb-4">This is a featured post with a longer description that spans multiple lines for emphasis.</p>
              <div className="mt-auto pt-4 border-t">
                <span className="text-sm text-blue-500">Read more →</span>
              </div>
            </div>
          ), 
          size: "featured",
          priority: 10
        },
        { 
          id: 2, 
          content: (
            <div className="bg-white p-4 h-full rounded-lg border shadow-sm flex flex-col">
              <h3 className="text-lg font-semibold mb-2">Latest News</h3>
              <p className="text-gray-500">Find out what's happening in our latest update.</p>
              <div className="mt-auto pt-4 border-t">
                <span className="text-sm text-blue-500">Read more →</span>
              </div>
            </div>
          ), 
          size: "medium" 
        },
        { 
          id: 3, 
          content: (
            <div className="bg-white p-4 h-full rounded-lg border shadow-sm flex flex-col">
              <h3 className="text-lg font-semibold mb-2">Quick Tips</h3>
              <p className="text-gray-500">Three tips to improve your workflow.</p>
              <div className="mt-auto pt-4 border-t">
                <span className="text-sm text-blue-500">Read more →</span>
              </div>
            </div>
          ), 
          size: "medium" 
        },
        { 
          id: 4, 
          content: (
            <div className="bg-white p-4 h-full rounded-lg border shadow-sm flex flex-col">
              <h3 className="text-lg font-semibold mb-2">Resources</h3>
              <p className="text-gray-500">Access all our resources in one place.</p>
              <div className="mt-auto pt-4 border-t">
                <span className="text-sm text-blue-500">Read more →</span>
              </div>
            </div>
          ), 
          size: "small" 
        },
      ];
    
      return <DynamicGridLayout items={items} gap={16} itemClassName="overflow-hidden" />;
    }`,
      },
    {
      name: "Dark Theme Priority Grid",
      preview: (
        <DynamicGridLayout
          items={[
            { 
              id: 1, 
              content: (
                <div className="bg-gray-800 p-6 h-full rounded-lg border border-gray-700 flex flex-col text-gray-100 shadow-lg">
                  <div className="text-blue-400 font-medium mb-1">PRIORITY 3</div>
                  <h3 className="font-bold text-xl mb-3">Development Updates</h3>
                  <p className="text-gray-300 mb-4">Weekly development progress and roadmap updates for our engineering team.</p>
                  <span className="inline-flex items-center rounded-md bg-blue-600 px-2 py-1 text-xs font-medium text-white">Medium Priority</span>
                </div>
              ), 
              size: "medium", 
              priority: 3 
            },
            { 
              id: 2, 
              content: (
                <div className="bg-gray-800 p-6 h-full rounded-lg border border-gray-700 flex flex-col text-gray-100 shadow-lg">
                  <div className="text-red-400 font-medium mb-1">PRIORITY 5</div>
                  <h3 className="font-bold text-xl mb-3">Critical Alert</h3>
                  <p className="text-gray-300 mb-4">System maintenance scheduled for tomorrow. Please save all work and prepare for temporary downtime.</p>
                  <span className="inline-flex items-center rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white">High Priority</span>
                </div>
              ), 
              size: "large", 
              priority: 5 
            },
            { 
              id: 3, 
              content: (
                <div className="bg-gray-800 p-6 h-full rounded-lg border border-gray-700 flex flex-col text-gray-100 shadow-lg">
                  <div className="text-gray-400 font-medium mb-1">PRIORITY 1</div>
                  <h3 className="font-bold text-xl mb-2">General Notice</h3>
                  <p className="text-gray-300">Office social event next Friday.</p>
                  <span className="inline-flex items-center rounded-md bg-gray-600 px-2 py-1 text-xs font-medium text-white mt-2">Low Priority</span>
                </div>
              ), 
              size: "small", 
              priority: 1 
            },
            { 
              id: 4, 
              content: (
                <div className="bg-gray-800 p-6 h-full rounded-lg border border-gray-700 flex flex-col text-gray-100 shadow-lg">
                  <div className="text-amber-400 font-medium mb-1">PRIORITY 4</div>
                  <h3 className="font-bold text-xl mb-3">Upcoming Deadline</h3>
                  <p className="text-gray-300 mb-4">Project deliverables due this Friday. Please review the requirements and submit your work.</p>
                  <span className="inline-flex items-center rounded-md bg-amber-600 px-2 py-1 text-xs font-medium text-white">Important</span>
                </div>
              ), 
              size: "wide", 
              priority: 4 
            },
            { 
              id: 5, 
              content: (
                <div className="bg-gray-800 p-6 h-full rounded-lg border border-gray-700 flex flex-col text-gray-100 shadow-lg">
                  <div className="text-green-400 font-medium mb-1">PRIORITY 2</div>
                  <h3 className="font-bold text-xl mb-2">Reminder</h3>
                  <p className="text-gray-300">Team meeting at 2pm today.</p>
                  <span className="inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white mt-2">Standard</span>
                </div>
              ), 
              size: "small", 
              priority: 2 
            },
          ]}
          gap={20}
        />
      ),
      filename: "DarkThemePriorityGrid.tsx",
      code: `import { DynamicGridLayout, type GridItem } from "@/components/DynamicGridLayout";
  
  export function DarkThemePriorityGrid() {
    const items: GridItem[] = [
      { 
        id: 1, 
        content: (
          <div className="bg-gray-800 p-6 h-full rounded-lg border border-gray-700 flex flex-col text-gray-100 shadow-lg">
            <div className="text-blue-400 font-medium mb-1">PRIORITY 3</div>
            <h3 className="font-bold text-xl mb-3">Development Updates</h3>
            <p className="text-gray-300 mb-4">Weekly development progress and roadmap updates for our engineering team.</p>
            <span className="inline-flex items-center rounded-md bg-blue-600 px-2 py-1 text-xs font-medium text-white">Medium Priority</span>
          </div>
        ), 
        size: "medium", 
        priority: 3 
      },
      { 
        id: 2, 
        content: (
          <div className="bg-gray-800 p-6 h-full rounded-lg border border-gray-700 flex flex-col text-gray-100 shadow-lg">
            <div className="text-red-400 font-medium mb-1">PRIORITY 5</div>
            <h3 className="font-bold text-xl mb-3">Critical Alert</h3>
            <p className="text-gray-300 mb-4">System maintenance scheduled for tomorrow. Please save all work and prepare for temporary downtime.</p>
            <span className="inline-flex items-center rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white">High Priority</span>
          </div>
        ), 
        size: "large", 
        priority: 5 
      },
      { 
        id: 3, 
        content: (
          <div className="bg-gray-800 p-6 h-full rounded-lg border border-gray-700 flex flex-col text-gray-100 shadow-lg">
            <div className="text-gray-400 font-medium mb-1">PRIORITY 1</div>
            <h3 className="font-bold text-xl mb-2">General Notice</h3>
            <p className="text-gray-300">Office social event next Friday.</p>
            <span className="inline-flex items-center rounded-md bg-gray-600 px-2 py-1 text-xs font-medium text-white mt-2">Low Priority</span>
          </div>
        ), 
        size: "small", 
        priority: 1 
      },
      { 
        id: 4, 
        content: (
          <div className="bg-gray-800 p-6 h-full rounded-lg border border-gray-700 flex flex-col text-gray-100 shadow-lg">
            <div className="text-amber-400 font-medium mb-1">PRIORITY 4</div>
            <h3 className="font-bold text-xl mb-3">Upcoming Deadline</h3>
            <p className="text-gray-300 mb-4">Project deliverables due this Friday. Please review the requirements and submit your work.</p>
            <span className="inline-flex items-center rounded-md bg-amber-600 px-2 py-1 text-xs font-medium text-white">Important</span>
          </div>
        ), 
        size: "wide", 
        priority: 4 
      },
      { 
        id: 5, 
        content: (
          <div className="bg-gray-800 p-6 h-full rounded-lg border border-gray-700 flex flex-col text-gray-100 shadow-lg">
            <div className="text-green-400 font-medium mb-1">PRIORITY 2</div>
            <h3 className="font-bold text-xl mb-2">Reminder</h3>
            <p className="text-gray-300">Team meeting at 2pm today.</p>
            <span className="inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white mt-2">Standard</span>
          </div>
        ), 
        size: "small", 
        priority: 2 
      },
    ];
  
    return <DynamicGridLayout items={items} gap={20} />;
  }`,
    },
]
}

