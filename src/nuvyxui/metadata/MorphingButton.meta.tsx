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
  dependencies: [
    {
      setup: {
        description: "Paste this code into your globals.css file",
        file: "/globals.css",
        code: `@keyframes smoothBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}`,
      },
    }
  ],
  props: [
    {
      name: "Morphing Button",
      items: [
        {
          name: "variant",
          type: "string",
          default: "expand",
          description:
            "Button transformation animation variant - (expand, collapse, rotate, skew, liquid, bounce)",
        },
        {
          name: "size",
          type: "string",
          default: "md",
          description: "Button size - (xs, sm, md, lg, xl)",
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
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the button and prevents interaction",
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "Indicates that the button is in a loading state",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "undefined",
          description: "Button content",
        },
      ],
    },
  ],
  tags: ["Button"],
  category: "Buttons",
  examples: []
};
