import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { GlitchButtonDemo } from "@/nuvyxui/demos/GlitchButtonDemo";
import GlitchButtonSource from "!!raw-loader!@/nuvyxui/components/GlitchButton.tsx";
import GlitchButtonDemoSource from "!!raw-loader!@/nuvyxui/demos/GlitchButtonDemo.tsx";

export const glitchButtonData: ComponentData = {
  name: "Glitch Button",
  description:
    "Cyberpunk-inspired buttons with glitch effects that can be triggered on hover or click.",
  preview: <GlitchButtonDemo />,
  usage: GlitchButtonDemoSource,
  componentCode: GlitchButtonSource,
  dependencies: [
    {
      name: "Tailwind Merge",
      description: "Utility function for conditional class name merging.",
      install: {
        npm: "npm install tailwind-merge",
        pnpm: "pnpm add tailwind-merge",
        yarn: "yarn add tailwind-merge",
        bun: "bun add tailwind-merge",
      },
    },
    {
      setup: {
        file: "globals.css",
        code: `@keyframes glitchFx1 {
  0%, 100% { transform: translateX(0); }
  10% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  30% { transform: translateX(0); }
  40% { transform: translateX(12px); }
  50% { transform: translateX(8px); }
  60% { transform: translateX(24px); }
  70% { transform: translateX(2px); }
  80% { transform: translateX(-4px); }
  90% { transform: translateX(0); }
}

@keyframes glitchFx2 {
  0% { transform: translateX(4px); }
  10% { transform: translateX(-12px); }
  20% { transform: translateX(-2px); }
  30% { transform: translateX(1px); }
  40%, 50%, 60%, 70% { transform: translateX(0); }
  80% { transform: translateX(4px); }
  90% { transform: translateX(-2px); }
  100% { transform: translateX(-15px); }
}

@keyframes glitchFx3 {
  0% { transform: translateX(4px); }
  10% { transform: translateX(0); }
  20% { transform: translateX(4px); }
  30% { transform: translateX(0); }
  40% { transform: translateX(-4px); }
  50% { transform: translateX(0); }
  60% { transform: translateX(-4px); }
  70% { transform: translateX(0); }
  80% { transform: translateX(12px); }
  90% { transform: translateX(0); }
  100% { transform: translateX(-12px); }
}

@keyframes glitchSkew {
  0% { transform: skew(0deg); }
  10% { transform: skew(1deg); }
  20% { transform: skew(-2deg); }
  30% { transform: skew(1.5deg); }
  40% { transform: skew(-1deg); }
  50% { transform: skew(2deg); }
  60% { transform: skew(-1.5deg); }
  70% { transform: skew(1.5deg); }
  80% { transform: skew(-2deg); }
  90% { transform: skew(1deg); }
  100% { transform: skew(0deg); }
}

/* Common animations */
@keyframes flickerAnimation {
  0% { opacity: 1; }
  19% { opacity: 1; }
  20% { opacity: 0; }
  21% { opacity: 1; }
  49% { opacity: 1; }
  50% { opacity: 0.7; }
  51% { opacity: 1; }
  79% { opacity: 1; }
  80% { opacity: 0.8; }
  81% { opacity: 1; }
  100% { opacity: 1; }
}

@keyframes clickGlitch {
  0%, 100% { clip-path: inset(0 0 0 0); }
  20% { clip-path: inset(20% 0 40% 0); }
  40% { clip-path: inset(50% 0 20% 0); }
  60% { clip-path: inset(30% 0 60% 0); }
  80% { clip-path: inset(10% 0 70% 0); }
}

/* Animation classes */
.glitch-layer-1 {
  animation: glitchFx1 800ms infinite step-end;
}

.glitch-layer-2 {
  animation: glitchFx2 900ms infinite step-end;
}

.glitch-layer-3 {
  animation: glitchFx3 1000ms infinite step-end;
}

.glitch-skew {
  animation: glitchSkew 1200ms infinite step-end;
}

.flicker-animation {
  animation: flickerAnimation 2s infinite;
}

.click-glitch {
  animation: clickGlitch 500ms step-end forwards;
}`, 
        description: "Copy and paste this code into your globals.css file",
      },
    }
  ],

  props: [
    {
      name: "Glitch Button",
      items: [
        {
          name: "glitchOnHover",
          type: "boolean",
          default: "true",
          description:
            "Whether to trigger glitch effects when hovering over the button.",
        },
        {
          name: "borderColor",
          type: "string",
          default: '"white"',
          description: "Custom border color for the glitch effect.",
        },
        {
          name: "glitchAlways",
          type: "boolean",
          default: "false",
          description:
            "Whether to continuously display the glitch effect regardless of hover/click state.",
        },
        {
          name: "glitchColors",
          type: "object",
          default: "{ primary: '#ef00eff', secondary: '#00ffff' }",
          description:
            "Custom colors for the glitch effect. The object should include properties: primary and secondary.",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description:
            "Additional CSS classes to apply. Background and text colors are detected from these classes.",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "undefined",
          description: "Content of the button.",
        },
      ],
    },
  ],
  tags: ["Button"],
  category: "Buttons",
  examples: []
};
