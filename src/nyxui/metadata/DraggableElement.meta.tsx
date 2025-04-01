import type { ComponentData } from "@/nyxui/ComponentInterfaces"
import { DraggableElement } from "@/nyxui/components/DraggableElement"
import { DraggableElementDemo } from "@/nyxui/demos/DraggableElementDemo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge, Grid, MoveDiagonal, MoveHorizontal } from "lucide-react"

export const draggableElementData: ComponentData = {
  name: "Draggable Element",
  description:
    "Objects that move with realistic physics and inertia. Can be used in UI for cards, modals, or interactive dashboards. Inspired by Apple's iOS bounce physics.",
  preview: <DraggableElementDemo />,
  usage: `import { DraggableElement } from "@/components/DraggableElement"

export function MyComponent() {
  return (
    <DraggableElement
      dragConstraints="parent"
      dragElastic={0.5}
      dragMomentum={true}
    >
      <div className="p-4 bg-white rounded-lg shadow-lg">
        Drag me around!
      </div>
    </DraggableElement>
  )
}`,
  componentCode: `// Full component code available in the DraggableElement.tsx file`,
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
      name: "DraggableElement",
      items: [
        {
          name: "dragConstraints",
          type: "string | object",
          default: '"parent" | "window" | { top?: number; right?: number; bottom?: number; left?: number }',
          description: "Constraints for the draggable area",
        },
        {
          name: "dragElastic",
          type: "number",
          default: "0.5",
          description: "Elasticity of the drag (0-1)",
        },
        {
          name: "dragMomentum",
          type: "boolean",
          default: "true",
          description: "Whether to enable momentum after dragging",
        },
        {
          name: "dragTransition",
          type: "object",
          default: "{ bounceStiffness: 400, bounceDamping: 40 }",
          description: "Physics properties for the drag transition",
        },
        {
          name: "onDragStart",
          type: "() => void",
          default: "undefined",
          description: "Callback function when drag starts",
        },
        {
          name: "onDragEnd",
          type: "() => void",
          default: "undefined",
          description: "Callback function when drag ends",
        },
        {
          name: "onDrag",
          type: "(event, info) => void",
          default: "undefined",
          description: "Callback function during drag",
        },
        {
          name: "initialPosition",
          type: "{ x: number; y: number }",
          default: "{ x: 0, y: 0 }",
          description: "Initial position of the element",
        },
        {
          name: "lockAxis",
          type: "string",
          default: '"x" | "y" | "none"',
          description: "Axis to lock movement to",
        },
        {
          name: "zIndex",
          type: "number",
          default: "10",
          description: "Z-index of the element",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Whether dragging is disabled",
        },
        {
          name: "boundaryPadding",
          type: "number",
          default: "0",
          description: "Padding from the boundary edges",
        },
        {
          name: "snapToGrid",
          type: "boolean",
          default: "false",
          description: "Whether to snap to a grid",
        },
        {
          name: "gridSize",
          type: "number",
          default: "20",
          description: "Size of the grid when snapToGrid is true",
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
  category: "Interactive",
  examples: [
    {
      name: "Elegant Card",
      preview: (
        <div className="h-[240px] bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-lg relative p-4">
          <DraggableElement 
            dragConstraints="parent" 
            dragElastic={0.5} 
            initialPosition={{ x: 50, y: 50 }}
          >
            <Card className="w-[220px] shadow-lg border-2 border-indigo-100 dark:border-gray-700">
              <CardHeader className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                <CardTitle className="text-indigo-600 dark:text-indigo-300 flex items-center">
                  <MoveDiagonal className="w-4 h-4 mr-2 text-indigo-400" />
                  Interactive Card
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">Drag me anywhere!</p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge className="bg-indigo-50 dark:bg-indigo-900/30 text-xs">Draggable</Badge>
                  <Badge className="bg-indigo-50 dark:bg-indigo-900/30 text-xs">Elastic</Badge>
                </div>
              </CardContent>
            </Card>
          </DraggableElement>
        </div>
      ),
      filename: "ElegantCard.tsx",
      code: `import { DraggableElement } from "@/components/DraggableElement";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { MoveDiagonal } from "lucide-react";
  
  export function ElegantCard() {
    return (
      <div className="h-[240px] bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-lg relative p-4">
        <DraggableElement
          dragConstraints="parent"
          dragElastic={0.5}
          initialPosition={{ x: 50, y: 50 }}
        >
          <Card className="w-[220px] shadow-lg border-2 border-indigo-100 dark:border-gray-700">
            <CardHeader className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardTitle className="text-indigo-600 dark:text-indigo-300 flex items-center">
                <MoveDiagonal className="w-4 h-4 mr-2 text-indigo-400" />
                Interactive Card
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">Drag me anywhere!</p>
              <div className="mt-3 flex items-center gap-2">
                <Badge className="bg-indigo-50 dark:bg-indigo-900/30 text-xs">Draggable</Badge>
                <Badge className="bg-indigo-50 dark:bg-indigo-900/30 text-xs">Elastic</Badge>
              </div>
            </CardContent>
          </Card>
        </DraggableElement>
      </div>
    );
  }`,
    },
    {
      name: "Slider Control",
      preview: (
        <div className="h-[240px] bg-gradient-to-r from-amber-50 to-orange-100 dark:from-gray-800 dark:to-amber-900/30 rounded-lg relative p-4">
          <DraggableElement 
            dragConstraints="parent" 
            dragElastic={0.2} 
            lockAxis="x" 
            initialPosition={{ x: 50, y: 100 }}
          >
            <Card className="w-[240px] shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-600 dark:text-amber-300 flex items-center">
                  <MoveHorizontal className="w-4 h-4 mr-2 text-amber-500" />
                  Audio Slider
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-1 bg-amber-200 dark:bg-amber-900/50 rounded-full w-full mb-4">
                  <div className="absolute h-1 bg-amber-500 dark:bg-amber-500 rounded-full" style={{ width: "60%" }}></div>
                  <div className="absolute h-3 w-3 bg-amber-600 dark:bg-amber-400 rounded-full top-1/2 -translate-y-1/2" style={{ left: "60%" }}></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Drag horizontally to adjust volume</p>
                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-amber-700 dark:text-amber-300">01:23</span>
                  <span className="text-amber-700 dark:text-amber-300">03:45</span>
                </div>
              </CardContent>
            </Card>
          </DraggableElement>
        </div>
      ),
      filename: "SliderControl.tsx",
      code: `import { DraggableElement } from "@/components/DraggableElement";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { MoveHorizontal } from "lucide-react";
  
  export function SliderControl() {
    return (
      <div className="h-[240px] bg-gradient-to-r from-amber-50 to-orange-100 dark:from-gray-800 dark:to-amber-900/30 rounded-lg relative p-4">
        <DraggableElement
          dragConstraints="parent"
          dragElastic={0.2}
          lockAxis="x"
          initialPosition={{ x: 50, y: 100 }}
        >
          <Card className="w-[240px] shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-amber-600 dark:text-amber-300 flex items-center">
                <MoveHorizontal className="w-4 h-4 mr-2 text-amber-500" />
                Audio Slider
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-1 bg-amber-200 dark:bg-amber-900/50 rounded-full w-full mb-4">
                <div className="absolute h-1 bg-amber-500 dark:bg-amber-500 rounded-full" style={{ width: "60%" }}></div>
                <div className="absolute h-3 w-3 bg-amber-600 dark:bg-amber-400 rounded-full top-1/2 -translate-y-1/2" style={{ left: "60%" }}></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Drag horizontally to adjust volume</p>
              <div className="mt-3 flex justify-between text-sm">
                <span className="text-amber-700 dark:text-amber-300">01:23</span>
                <span className="text-amber-700 dark:text-amber-300">03:45</span>
              </div>
            </CardContent>
          </Card>
        </DraggableElement>
      </div>
    );
  }`,
    },
    {
      name: "Grid Canvas",
      preview: (
        <div className="h-[240px] w-[500px] bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-800 dark:to-emerald-900/30 rounded-lg relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(79, 209, 197, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(79, 209, 197, 0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <DraggableElement
            dragConstraints="parent"
            dragMomentum={false}
            snapToGrid={true}
            gridSize={20}
            initialPosition={{ x: 60, y: 60 }}
          >
            <Card className="w-[220px] shadow-lg border-2 border-emerald-100 dark:border-emerald-800">
              <CardHeader className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm pb-2">
                <CardTitle className="text-emerald-600 dark:text-emerald-300 flex items-center text-sm">
                  <Grid className="w-4 h-4 mr-2 text-emerald-500" />
                  Design Canvas Element
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="flex justify-between mb-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                  </div>
                  <Badge className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">20px Grid</Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">Drag to position precisely on the grid</p>
                <div className="mt-3 grid grid-cols-3 gap-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-2 bg-emerald-100 dark:bg-emerald-800/50 rounded"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </DraggableElement>
        </div>
      ),
      filename: "GridCanvas.tsx",
      code: `import { DraggableElement } from "@/components/DraggableElement";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import { Grid } from "lucide-react";
  
  export function GridCanvas() {
    return (
      <div className="h-[240px] w-[500px] bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-800 dark:to-emerald-900/30 rounded-lg relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(79, 209, 197, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(79, 209, 197, 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <DraggableElement
          dragConstraints="parent"
          dragMomentum={false}
          snapToGrid={true}
          gridSize={20}
          initialPosition={{ x: 60, y: 60 }}
        >
          <Card className="w-[220px] shadow-lg border-2 border-emerald-100 dark:border-emerald-800">
            <CardHeader className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm pb-2">
              <CardTitle className="text-emerald-600 dark:text-emerald-300 flex items-center text-sm">
                <Grid className="w-4 h-4 mr-2 text-emerald-500" />
                Design Canvas Element
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="flex justify-between mb-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                </div>
                <Badge className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">20px Grid</Badge>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300">Drag to position precisely on the grid</p>
              <div className="mt-3 grid grid-cols-3 gap-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-2 bg-emerald-100 dark:bg-emerald-800/50 rounded"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </DraggableElement>
      </div>
    );
  }`,
    },
  ]
}

