import React from "react";
import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
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
  tags: ["Button"],
  examples: []
};
