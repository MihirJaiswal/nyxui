import type { ComponentData } from "./ComponentInterfaces"
import { AnimatedCodeBlock } from "@/nyxui/components/AnimatedCodeBlock"
import { AnimatedCodeBlockDemo } from "@/nyxui/demos/AnimatedCodeBlockDemo"
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/AnimatedCodeBlock.tsx");
const AnimatedCodeBlockSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/AnimatedCodeBlockDemo.tsx");
const AnimatedCodeBlockDemoSource = fs.readFileSync(demoPath, "utf8");

export const animatedCodeBlockData: ComponentData = {
  name: "Animated Code Block",
  description:
    "A code display component with real-time typing effects. Supports syntax highlighting and customizable themes. Can have a terminal-like blur effect.",
  preview: <AnimatedCodeBlockDemo />,
  usage: AnimatedCodeBlockDemoSource,
  componentCode: AnimatedCodeBlockSource,
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
      name: "Lucide React",
      description: "Beautiful & consistent icon toolkit made by the community.",
      install: {
        npm: "npm install lucide-react",
        pnpm: "pnpm add lucide-react",
        yarn: "yarn add lucide-react",
        bun: "bun add lucide-react",
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
      name: "AnimatedCodeBlock",
      items: [
        {
          name: "code",
          type: "string",
          default: '""',
          description: "The code to display and animate",
        },
        {
          name: "language",
          type: "string",
          default: '"javascript"',
          description: "The programming language for syntax highlighting",
        },
        {
          name: "theme",
          type: "string",
          default: '"dark" | "light" | "terminal" | "cyberpunk" | "minimal"',
          description: "The visual theme of the code block",
        },
        {
          name: "typingSpeed",
          type: "number",
          default: "50",
          description: "The speed of the typing animation in milliseconds",
        },
        {
          name: "showLineNumbers",
          type: "boolean",
          default: "true",
          description: "Whether to show line numbers",
        },
        {
          name: "highlightLines",
          type: "number[]",
          default: "[]",
          description: "Array of line numbers to highlight",
        },
        {
          name: "title",
          type: "string",
          default: '""',
          description: "Title to display in the header",
        },
        {
          name: "autoPlay",
          type: "boolean",
          default: "false",
          description: "Whether to start the animation automatically",
        },
        {
          name: "loop",
          type: "boolean",
          default: "false",
          description: "Whether to loop the animation",
        },
        {
          name: "blurEffect",
          type: "boolean",
          default: "false",
          description: "Whether to add a terminal blur effect",
        },
        {
          name: "showControls",
          type: "boolean",
          default: "true",
          description: "Whether to show play/pause and copy controls",
        },
        {
          name: "onCopy",
          type: "() => void",
          default: "undefined",
          description: "Callback function when code is copied",
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
  category: "Display",
  new: true,
  examples:  [
    {
      name: "TypeScript Utility Functions",
      preview: (
        <AnimatedCodeBlock
          code={`/**
   * Collection of type-safe utility functions
   */
  
  // Deep merge two objects
  function deepMerge<T extends object, U extends object>(
    target: T,
    source: U
  ): T & U {
    const output = { ...target } as T & U;
    
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = deepMerge(
              target[key],
              source[key]
            );
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    
    return output;
  }
  
  // Type guard for objects
  function isObject(item: unknown): item is Record<string, unknown> {
    return Boolean(
      item && typeof item === "object" && !Array.isArray(item)
    );
  }`}
          language="typescript"
          theme="dark"
          typingSpeed={40}
          autoPlay={true}
          highlightLines={[8, 9, 10, 11, 12]}
          title="TypeScript Utility Functions"
        />
      ),
      filename: "TypeScriptUtilities.tsx",
      code: `import { AnimatedCodeBlock } from "@/components/AnimatedCodeBlock";
  
  export function TypeScriptUtilities() {
    return (
      <AnimatedCodeBlock
        code={\`/**
   * Collection of type-safe utility functions
   */
  
  // Deep merge two objects
  function deepMerge<T extends object, U extends object>(
    target: T,
    source: U
  ): T & U {
    const output = { ...target } as T & U;
    
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = deepMerge(
              target[key],
              source[key]
            );
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    
    return output;
  }
  
  // Type guard for objects
  function isObject(item: unknown): item is Record<string, unknown> {
    return Boolean(
      item && typeof item === "object" && !Array.isArray(item)
    );
  }\`}
        language="typescript"
        theme="dark"
        typingSpeed={40}
        autoPlay={true}
        highlightLines={[8, 9, 10, 11, 12]}
        title="TypeScript Utility Functions"
      />
    );
  }`,
    },
    {
      name: "Terminal Theme Docker Setup",
      preview: (
        <AnimatedCodeBlock
          code={`# Build a Node.js application with multi-stage build
  FROM node:18-alpine AS build
  
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  
  COPY . .
  RUN npm run build
  
  # Production stage
  FROM node:18-alpine AS production
  
  ENV NODE_ENV=production
  WORKDIR /app
  
  COPY --from=build /app/package*.json ./
  COPY --from=build /app/node_modules ./node_modules
  COPY --from=build /app/dist ./dist
  
  # Use non-root user for security
  USER node
  
  # Health check
  HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget -qO- http://localhost:3000/health || exit 1
  
  # Expose port and start application
  EXPOSE 3000
  CMD ["node", "dist/server.js"]`}
          language="dockerfile"
          theme="terminal"
          typingSpeed={30}
          autoPlay={true}
          blurEffect={true}
          title="Docker Multi-Stage Build"
        />
      ),
      filename: "DockerExample.tsx",
      code: `import { AnimatedCodeBlock } from "@/components/AnimatedCodeBlock";
  
  export function DockerExample() {
    return (
      <AnimatedCodeBlock
        code={\`# Build a Node.js application with multi-stage build
  FROM node:18-alpine AS build
  
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  
  COPY . .
  RUN npm run build
  
  # Production stage
  FROM node:18-alpine AS production
  
  ENV NODE_ENV=production
  WORKDIR /app
  
  COPY --from=build /app/package*.json ./
  COPY --from=build /app/node_modules ./node_modules
  COPY --from=build /app/dist ./dist
  
  # Use non-root user for security
  USER node
  
  # Health check
  HEALTHCHECK --interval=30s --timeout=3s \\
    CMD wget -qO- http://localhost:3000/health || exit 1
  
  # Expose port and start application
  EXPOSE 3000
  CMD ["node", "dist/server.js"]\`}
        language="dockerfile"
        theme="terminal"
        typingSpeed={30}
        autoPlay={true}
        blurEffect={true}
        title="Docker Multi-Stage Build"
      />
    );
  }`,
    },
    {
      name: "CSS Animation",
      preview: (
        <AnimatedCodeBlock
          code={`/* Animated button with hover effects */
  .button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.5rem;
    background-color: #3b82f6;
    color: white;
    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }
  
  .button:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
  }
  
  .button:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px -1px rgba(59, 130, 246, 0.2);
  }
  
  .button::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform 0.5s, opacity 1s;
  }
  
  .button:active::after {
    transform: scale(0, 0);
    opacity: 0.3;
    transition: 0s;
  }`}
          language="css"
          theme="cyberpunk"
          typingSpeed={40}
          autoPlay={true}
          highlightLines={[12, 13, 14, 18, 19, 20, 21, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]}
          title="Advanced Button Animation"
        />
      ),
      filename: "CSSAnimationExample.tsx",
      code: `import { AnimatedCodeBlock } from "@/components/AnimatedCodeBlock";
  
  export function CSSAnimationExample() {
    return (
      <AnimatedCodeBlock
        code={\`/* Animated button with hover effects */
  .button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.5rem;
    background-color: #3b82f6;
    color: white;
    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }
  
  .button:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
  }
  
  .button:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px -1px rgba(59, 130, 246, 0.2);
  }
  
  .button::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform 0.5s, opacity 1s;
  }
  
  .button:active::after {
    transform: scale(0, 0);
    opacity: 0.3;
    transition: 0s;
  }\`}
        language="css"
        theme="cyberpunk"
        typingSpeed={40}
        autoPlay={true}
        highlightLines={[12, 13, 14, 18, 19, 20, 21, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]}
        title="Advanced Button Animation"
      />
    );
  }`,
    },
  ]
}

