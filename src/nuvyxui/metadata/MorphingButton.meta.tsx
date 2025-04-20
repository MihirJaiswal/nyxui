import React from "react";
import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import { MorphingButtonDemo } from "@/nuvyxui/demos/MorphingButtonDemo";

import MorphingButtonSource from "!!raw-loader!@/nuvyxui/components/MorphingButton.tsx";
import MorphingButtonDemoSource from "!!raw-loader!@/nuvyxui/demos/MorphingButtonDemo.tsx";

export const morphingButtonData: ComponentData = {
  name: "Morphing Button",
  description:
    "Interactive buttons with shape-changing animations and multi-state visual feedback.",
  preview: <MorphingButtonDemo />,
  usage: MorphingButtonDemoSource,
  componentCode: MorphingButtonSource,
  dependencies: [],
  props: [
    {
      name: "Morphing Button",
      items: [
        {
          name: "variant",
          type: "string",
          default: "expand",
          description:
            "Button transformation animation variant - (expand, collapse, rotate, skew, liquid, gradient, glow, pulse, reveal, bounce)",
        },
        {
          name: "size",
          type: "string",
          default: "md",
          description: "Button size - (xs, sm, md, lg, xl)",
        },
        {
          name: "color",
          type: "string",
          default: "primary",
          description:
            "Button color theme - (primary, secondary, success, danger, warning, info, dark, slate, violet, indigo, teal, rose, amber, custom)",
        },
        {
          name: "rounded",
          type: "string",
          default: "md",
          description: "Button corner radius - (none, sm, md, lg, full)",
        },
        {
          name: "shadow",
          type: "string",
          default: "md",
          description:
            "Button shadow effect - (none, sm, md, lg, xl, inner, glow)",
        },
        {
          name: "icon",
          type: "React.ReactNode",
          default: "undefined",
          description: "Optional icon element to display in the button",
        },
        {
          name: "iconPosition",
          type: "string",
          default: "left",
          description:
            "Position of the icon relative to button text - (left, right, only)",
        },
        {
          name: "className",
          type: "string",
          default: "",
          description: "Additional CSS classes to apply",
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
  examples: []
};
