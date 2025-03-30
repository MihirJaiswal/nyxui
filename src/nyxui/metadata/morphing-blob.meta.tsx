import type { ComponentData } from "./ComponentInterfaces"
import { MorphingBlob } from "@/nyxui/components/MorphingBlob"
import { MorphingBlobDemo } from "@/nyxui/demos/MorphingBlobDemo"
import { Sparkles, Zap } from "lucide-react"

export const morphingBlobData: ComponentData = {
  name: "Morphing Blob",
  description:
    "Interactive blob elements that change shape dynamically. Works as background visuals, buttons, or section transitions. Inspired by AI-generated abstract designs.",
  preview: <MorphingBlobDemo />,
  usage: `import { MorphingBlob } from "@/nyxui/components/MorphingBlob";

export function MyComponent() {
  return (
    <MorphingBlob theme="primary" size="md" complexity={3}>
      <Sparkles className="h-6 w-6" />
    </MorphingBlob>
  );
}`,
  componentCode: `import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface MorphingBlobProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "custom";
  customColors?: {
    from: string;
    via?: string;
    to: string;
  };
  size?: "sm" | "md" | "lg" | "xl" | "full";
  complexity?: 1 | 2 | 3 | 4 | 5;
  speed?: 1 | 2 | 3 | 4 | 5;
  hoverEffect?: boolean;
  clickEffect?: boolean;
  pulse?: boolean;
  glow?: boolean;
  glowIntensity?: 1 | 2 | 3 | 4 | 5;
  children?: React.ReactNode;
}

export function MorphingBlob({
  theme = "primary",
  customColors,
  size = "md",
  complexity = 3,
  speed = 3,
  hoverEffect = true,
  clickEffect = true,
  pulse = false,
  glow = true,
  glowIntensity = 3,
  className,
  children,
  ...props
}: MorphingBlobProps) {
  const blobRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [blobPath, setBlobPath] = useState("");
  const [rotation, setRotation] = useState(0);
  
  // Theme colors
  const themeColors = {
    primary: {
      gradient: "from-blue-400 via-blue-500 to-blue-600",
      glow: "shadow-blue-500/50",
    },
    secondary: {
      gradient: "from-purple-400 via-purple-500 to-purple-600",
      glow: "shadow-purple-500/50",
    },
    accent: {
      gradient: "from-teal-400 via-teal-500 to-teal-600",
      glow: "shadow-teal-500/50",
    },
    success: {
      gradient: "from-green-400 via-green-500 to-green-600",
      glow: "shadow-green-500/50",
    },
    warning: {
      gradient: "from-amber-400 via-amber-500 to-amber-600",
      glow: "shadow-amber-500/50",
    },
    danger: {
      gradient: "from-red-400 via-red-500 to-red-600",
      glow: "shadow-red-500/50",
    },
    custom: {
      gradient: customColors 
        ? \`from-[\${customColors.from}] \${customColors.via ? \`via-[\${customColors.via}]\` : ''} to-[\${customColors.to}]\`
        : "from-blue-400 via-blue-500 to-blue-600",
      glow: "shadow-blue-500/50",
    },
  };

  const currentTheme = themeColors[theme];
  
  // Size classes
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-48 h-48",
    lg: "w-64 h-64",
    xl: "w-80 h-80",
    full: "w-full h-full",
  };
  
  // Complexity factors
  const complexityFactors = {
    1: { points: 6, variance: 0.2 },
    2: { points: 8, variance: 0.3 },
    3: { points: 10, variance: 0.4 },
    4: { points: 12, variance: 0.5 },
    5: { points: 15, variance: 0.6 },
  };
  
  // Speed factors
  const speedFactors = {
    1: 10,
    2: 8,
    3: 6,
    4: 4,
    5: 2,
  };
  
  // Glow intensity
  const glowIntensityClasses = {
    1: "shadow-md",
    2: "shadow-lg",
    3: "shadow-xl",
    4: "shadow-2xl",
    5: "shadow-2xl shadow-lg",
  };

  // Generate blob path
  const generateBlobPath = (factor: { points: number, variance: number }, hover = false, click = false) => {
    const { points, variance } = factor;
    const centerX = 50;
    const centerY = 50;
    const radius = hover ? 48 : click ? 45 : 40;
    
    let path = "M";
    
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const randomVariance = 1 - variance + Math.random() * variance * 2;
      const x = centerX + Math.cos(angle) * radius * randomVariance;
      const y = centerY + Math.sin(angle) * radius * randomVariance;
      
      if (i === 0) {
        path += \`\${x},\${y}\`;
      } else {
        const controlX1 = centerX + Math.cos(angle - Math.PI / points) * radius * 1.5;
        const controlY1 = centerY + Math.sin(angle - Math.PI / points) * radius * 1.5;
        
        path += \` Q\${controlX1},\${controlY1} \${x},\${y}\`;
      }
    }
    
    path += " Z";
    return path;
  };

  // Initialize and animate blob
  useEffect(() => {
    if (!blobRef.current) return;
    
    const factor = complexityFactors[complexity];
    setBlobPath(generateBlobPath(factor, isHovered, isClicked));
    
    const interval = setInterval(() => {
      setBlobPath(generateBlobPath(factor, isHovered, isClicked));
      setRotation(prev => (prev + 1) % 360);
    }, speedFactors[speed] * 1000);
    
    return () => clearInterval(interval);
  }, [complexity, speed, isHovered, isClicked]);

  const handleMouseEnter = () => {
    if (hoverEffect) {
      setIsHovered(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (hoverEffect) {
      setIsHovered(false);
    }
    if (clickEffect) {
      setIsClicked(false);
    }
  };
  
  const handleMouseDown = () => {
    if (clickEffect) {
      setIsClicked(true);
    }
  };
  
  const handleMouseUp = () => {
    if (clickEffect) {
      setIsClicked(false);
    }
  };

  return (
    <div
      ref={blobRef}
      className={cn(
        "relative flex items-center justify-center transition-all duration-300",
        sizeClasses[size],
        glow && glowIntensityClasses[glowIntensity],
        glow && currentTheme.glow,
        pulse && "animate-pulse",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        style={{
          transform: \`rotate(\${rotation}deg)\`,
          transition: "transform 10s ease-in-out",
        }}
      >
        <path
          d={blobPath}
          className={cn(
            "transition-all duration-300 bg-gradient-to-br",
            currentTheme.gradient
          )}
          fill="url(#blob-gradient)"
        />
        <defs>
          <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="stop-color-from" />
            {theme === "custom" && customColors?.via && (
              <stop offset="50%" className="stop-color-via" />
            )}
            <stop offset="100%" className="stop-color-to" />
          </linearGradient>
        </defs>
      </svg>
      
      {children && (
        <div className="relative z-10 text-white">
          {children}
        </div>
      )}
    </div>
  );
}`,
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
  ],
  props: [
    {
      name: "Morphing Blob",
      items: [
        {
          name: "theme",
          type: "string",
          default: '"primary" | "secondary" | "accent" | "success" | "warning" | "danger" | "custom"',
          description: "The color theme of the blob",
        },
        {
          name: "customColors",
          type: "object",
          default: "undefined",
          description: "Custom colors for the blob when theme is set to 'custom'",
        },
        {
          name: "size",
          type: "string",
          default: '"sm" | "md" | "lg" | "xl" | "full"',
          description: "The size of the blob",
        },
        {
          name: "complexity",
          type: "number",
          default: "3",
          description: "The complexity of the blob shape (1-5)",
        },
        {
          name: "speed",
          type: "number",
          default: "3",
          description: "The speed of the morphing animation (1-5)",
        },
        {
          name: "hoverEffect",
          type: "boolean",
          default: "true",
          description: "Whether to enable the hover effect",
        },
        {
          name: "clickEffect",
          type: "boolean",
          default: "true",
          description: "Whether to enable the click effect",
        },
        {
          name: "pulse",
          type: "boolean",
          default: "false",
          description: "Whether to enable the pulse animation",
        },
        {
          name: "glow",
          type: "boolean",
          default: "true",
          description: "Whether to show a glow effect",
        },
        {
          name: "glowIntensity",
          type: "number",
          default: "3",
          description: "The intensity of the glow effect (1-5)",
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
  category: "Effects",
  examples: [
    {
      name: "Basic Blob",
      preview: (
        <MorphingBlob theme="primary" size="md" complexity={3}>
          <Sparkles className="h-6 w-6" />
        </MorphingBlob>
      ),
      filename: "BasicBlob.tsx",
      code: `import { MorphingBlob } from "@/nyxui/components/MorphingBlob";
import { Sparkles } from 'lucide-react';

export function BasicBlob() {
  return (
    <MorphingBlob theme="primary" size="md" complexity={3}>
      <Sparkles className="h-6 w-6" />
    </MorphingBlob>
  );
}`,
    },
    {
      name: "Complex Blob",
      preview: (
        <MorphingBlob theme="secondary" size="md" complexity={5} speed={4}>
          <Zap className="h-6 w-6" />
        </MorphingBlob>
      ),
      filename: "ComplexBlob.tsx",
      code: `import { MorphingBlob } from "@/nyxui/components/MorphingBlob";
import { Zap } from 'lucide-react';

export function ComplexBlob() {
  return (
    <MorphingBlob theme="secondary" size="md" complexity={5} speed={4}>
      <Zap className="h-6 w-6" />
    </MorphingBlob>
  );
}`,
    },
    {
      name: "Pulsing Blob",
      preview: (
        <MorphingBlob theme="success" size="md" pulse glowIntensity={4}>
          <div className="text-center">
            <p className="text-sm font-medium">Pulsing</p>
          </div>
        </MorphingBlob>
      ),
      filename: "PulsingBlob.tsx",
      code: `import { MorphingBlob } from "@/nyxui/components/MorphingBlob";

export function PulsingBlob() {
  return (
    <MorphingBlob theme="success" size="md" pulse glowIntensity={4}>
      <div className="text-center">
        <p className="text-sm font-medium">Pulsing</p>
      </div>
    </MorphingBlob>
  );
}`,
    },
    {
      name: "Custom Color Blob",
      preview: (
        <MorphingBlob
          theme="custom"
          customColors={{
            from: "#FF6B6B",
            via: "#FFD166",
            to: "#06D6A0",
          }}
          size="md"
        >
          <div className="text-center">
            <p className="text-sm font-medium">Custom</p>
          </div>
        </MorphingBlob>
      ),
      filename: "CustomColorBlob.tsx",
      code: `import { MorphingBlob } from "@/nyxui/components/MorphingBlob";

export function CustomColorBlob() {
  return (
    <MorphingBlob 
      theme="custom" 
      customColors={{
        from: "#FF6B6B",
        via: "#FFD166",
        to: "#06D6A0"
      }}
      size="md"
    >
      <div className="text-center">
        <p className="text-sm font-medium">Custom</p>
      </div>
    </MorphingBlob>
  );
}`,
    },
    {
      name: "Content Blob",
      preview: (
        <MorphingBlob theme="warning" size="lg" complexity={3} glowIntensity={5}>
          <div className="text-center max-w-[180px]">
            <h4 className="text-xl font-bold mb-2">Feature Card</h4>
            <p className="text-sm">Use morphing blobs as interactive content containers</p>
          </div>
        </MorphingBlob>
      ),
      filename: "ContentBlob.tsx",
      code: `import { MorphingBlob } from "@/nyxui/components/MorphingBlob";

export function ContentBlob() {
  return (
    <MorphingBlob theme="warning" size="lg" complexity={3} glowIntensity={5}>
      <div className="text-center max-w-[180px]">
        <h4 className="text-xl font-bold mb-2">Feature Card</h4>
        <p className="text-sm">Use morphing blobs as interactive content containers</p>
      </div>
    </MorphingBlob>
  );
}`,
    },
  ],
}

