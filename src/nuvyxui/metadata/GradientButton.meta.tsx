import React from "react";
import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { GradientButton } from "@/nuvyxui/components/GradientButton";
import { GradientButtonDemo } from "@/nuvyxui/demos/GradientButtonDemo";

import GradientButtonSource from "!!raw-loader!@/nuvyxui/components/GradientButton.tsx";
import GradientButtonDemoSource from "!!raw-loader!@/nuvyxui/demos/GradientButtonDemo.tsx";

export const gradientButtonData: ComponentData = {
  name: "Gradient Button",
  description:
    "Modern buttons with stunning gradient effects, animations and customizable themes.",
  preview: <GradientButtonDemo />,
  usage: GradientButtonDemoSource,
  componentCode: GradientButtonSource,
  dependencies: [],
  props: [
    {
      name: "Gradient Button",
      items: [
        {
          name: "variant",
          type: "string",
          default: "glow",
          description:
            "Button animation and style variant (glow, pulse, sweep, shine, outline)",
        },
        {
          name: "size",
          type: "string",
          default: "md",
          description: "Button size (xs, sm, md, lg, xl)",
        },
        {
          name: "theme",
          type: "string",
          default: "sunset",
          description:
            "Pre-defined gradient theme (sunset, ocean, forest, neon, berry, custom)",
        },
        {
          name: "customGradient",
          type: "string",
          default: "undefined",
          description: "Custom gradient CSS for use with theme='custom'",
        },
        {
          name: "rounded",
          type: "string",
          default: "md",
          description: "Button corner radius (md, lg, full, none)",
        },
        {
          name: "shadow",
          type: "boolean",
          default: "true",
          description: "Whether to show drop shadow",
        },
        {
          name: "hoverEffect",
          type: "string",
          default: "brightness",
          description:
            "Additional hover effect to apply (scale, brightness, contrast, none)",
        },
        {
          name: "className",
          type: "string",
          default: "",
          description: "Additional CSS classes to apply",
        },
        {
          name: "children",
          type: "string",
          default: "",
          description: "Button text",
        },
        {
          name: "onClick",
          type: "function",
          default: "undefined",
          description:
            "Callback function to be called when the button is clicked",
        },
      ],
    },
  ],
  category: "Buttons",
  examples: [
    {
      name: "Pulse Effect Button",
      preview: (
        <GradientButton variant="pulse" theme="sunset">
          Pulse Effect
        </GradientButton>
      ),
      filename: "GradientButton.tsx",
      code: `import { GradientButton } from "@/nuvyxui/components/GradientButton";

export function PulseButton() {
  return (
    <GradientButton variant="pulse" theme="sunset">
      Pulse Effect
    </GradientButton>
  );
}`,
    },
    {
      name: "Glow Effect Button",
      preview: (
        <GradientButton variant="glow" theme="ocean" size="lg">
          Glow Effect
        </GradientButton>
      ),
      filename: "GradientButton.tsx",
      code: `import { GradientButton } from "@/nuvyxui/components/GradientButton";

export function GlowButton() {
  return (
    <GradientButton variant="glow" theme="ocean" size="lg">
      Glow Effect
    </GradientButton>
  );
}`,
    },
    {
      name: "Shine Effect Button",
      preview: (
        <GradientButton variant="shine" theme="forest" rounded="full">
          Shine Effect
        </GradientButton>
      ),
      filename: "GradientButton.tsx",
      code: `import { GradientButton } from "@/nuvyxui/components/GradientButton";

export function ShineButton() {
  return (
    <GradientButton variant="shine" theme="forest" rounded="full">
      Shine Effect
    </GradientButton>
  );
}`,
    },
    {
      name: "Sweep Effect Button",
      preview: (
        <GradientButton variant="sweep" theme="neon" size="sm">
          Sweep Effect
        </GradientButton>
      ),
      filename: "GradientButton.tsx",
      code: `import { GradientButton } from "@/nuvyxui/components/GradientButton";

export function SweepButton() {
  return (
    <GradientButton variant="sweep" theme="neon" size="sm">
      Sweep Effect
    </GradientButton>
  );
}`,
    },
    {
      name: "Outline Effect Button",
      preview: (
        <GradientButton variant="outline" theme="berry" hoverEffect="scale">
          Outline Effect
        </GradientButton>
      ),
      filename: "GradientButton.tsx",
      code: `import { GradientButton } from "@/nuvyxui/components/GradientButton";

export function OutlineButton() {
  return (
    <GradientButton variant="outline" theme="berry" hoverEffect="scale">
      Outline Effect
    </GradientButton>
  );
}`,
    },
    {
      name: "Custom Gradient Button",
      preview: (
        <GradientButton
          variant="glow"
          theme="custom"
          customGradient="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
        >
          Custom Gradient
        </GradientButton>
      ),
      filename: "GradientButton.tsx",
      code: `import { GradientButton } from "@/nuvyxui/components/GradientButton";

export function CustomGradientButton() {
  return (
    <GradientButton 
      variant="glow" 
      theme="custom" 
      customGradient="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
      Custom Gradient
    </GradientButton>
  );
}`,
    },
  ],
};
