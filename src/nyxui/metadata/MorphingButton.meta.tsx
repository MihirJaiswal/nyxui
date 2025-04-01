import React from "react";
import type { ComponentData } from "@/nyxui/ComponentInterfaces";
import { MorphingButton } from "@/nyxui/components/MorphingButton";
import { MorphingButtonDemo } from "@/nyxui/demos/MorphingButtonDemo";
import { ArrowRight, Bell, Check, Plus, Trash } from "lucide-react";
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/MorphingButton.tsx");
const MorphingButtonSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/MorphingButtonDemo.tsx");
const MorphingButtonDemoSource = fs.readFileSync(demoPath, "utf8");

export const morphingButtonData: ComponentData = {
  name: "Morphing Button",
  description: "Interactive buttons with shape-changing animations and multi-state visual feedback.",
  preview: <MorphingButtonDemo />,
  usage: MorphingButtonDemoSource,
  componentCode: MorphingButtonSource,
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
      name: "React Icons",
      description: "Popular icons library for React applications (optional for icon support).",
      install: {
        npm: "npm install react-icons",
        pnpm: "pnpm add react-icons",
        yarn: "yarn add react-icons",
        bun: "bun add react-icons",
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
          default: '"expand" | "collapse" | "rotate" | "skew" | "liquid"',
          description: "Button transformation animation variant",
        },
        {
          name: "size",
          type: "string",
          default: '"xs" | "sm" | "md" | "lg" | "xl"',
          description: "Button size",
        },
        {
          name: "color",
          type: "string",
          default: '"primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark"',
          description: "Button color theme",
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
          default: '"left" | "right" | "only"',
          description: "Position of the icon relative to button text",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Additional CSS classes to apply",
        },
        {
          name: "onClick",
          type: "() => void",
          default: "undefined",
          description: "Click handler function",
        },
      ],
    },
  ],
  category: "Buttons",
  examples: [
    {
      name: "Expand Effect Button",
      preview: (
        <MorphingButton variant="expand" color="primary">
          Expand Effect
        </MorphingButton>
      ),
      filename: "MorphingButton.tsx",
      code: `import { MorphingButton } from "@/nyxui/components/MorphingButton";

export function ExpandButton() {
  return (
    <MorphingButton variant="expand" color="primary">
      Expand Effect
    </MorphingButton>
  );
}`,
    },
    {
      name: "Collapse Effect Button",
      preview: (
        <MorphingButton variant="collapse" color="secondary" icon={<ArrowRight />} iconPosition="right">
          Collapse Effect
        </MorphingButton>
      ),
      filename: "MorphingButton.tsx",
      code: `import { MorphingButton } from "@/nyxui/components/MorphingButton";
import { HiArrowRight } from "react-icons/hi";

export function CollapseButton() {
  return (
    <MorphingButton variant="collapse" color="secondary" icon={<HiArrowRight />} iconPosition="right">
      Collapse Effect
    </MorphingButton>
  );
}`,
    },
    {
      name: "Rotate Effect Button",
      preview: (
        <MorphingButton variant="rotate" color="success" icon={<Plus />} iconPosition="left">
          Rotate Effect
        </MorphingButton>
      ),
      filename: "MorphingButton.tsx",
      code: `import { MorphingButton } from "@/nyxui/components/MorphingButton";
import { HiPlus } from "react-icons/hi";

export function RotateButton() {
  return (
    <MorphingButton variant="rotate" color="success" icon={<HiPlus />} iconPosition="left">
      Rotate Effect
    </MorphingButton>
  );
}`,
    },
    {
      name: "Skew Effect Button",
      preview: (
        <MorphingButton variant="skew" color="warning" size="lg">
          Skew Effect
        </MorphingButton>
      ),
      filename: "MorphingButton.tsx",
      code: `import { MorphingButton } from "@/nyxui/components/MorphingButton";

export function SkewButton() {
  return (
    <MorphingButton variant="skew" color="warning" size="lg">
      Skew Effect
    </MorphingButton>
  );
}`,
    },
    {
      name: "Liquid Effect Button",
      preview: (
        <MorphingButton variant="liquid" color="danger" icon={<Trash />} iconPosition="left">
          Liquid Effect
        </MorphingButton>
      ),
      filename: "MorphingButton.tsx",
      code: `import { MorphingButton } from "@/nyxui/components/MorphingButton";
import { HiTrash } from "react-icons/hi";

export function LiquidButton() {
  return (
    <MorphingButton variant="liquid" color="danger" icon={<HiTrash />} iconPosition="left">
      Liquid Effect
    </MorphingButton>
  );
}`,
    },
    {
      name: "Icon Only Button",
      preview: (
        <MorphingButton variant="expand" color="info" icon={<Bell />} iconPosition="only" size="lg">
          Icon Only
        </MorphingButton>
      ),
      filename: "MorphingButton.tsx",
      code: `import { MorphingButton } from "@/nyxui/components/MorphingButton";
import { Bell } from "lucide-react";

export function IconOnlyButton() {
  return (
    <MorphingButton 
      variant="expand" 
      color="info" 
      icon={<HiOutlineBell />} 
      iconPosition="only" 
      size="lg" 
    />
  );
}`,
    },
    {
      name: "Combined Effects Button",
      preview: (
        <div className="flex space-x-2">
          <MorphingButton variant="liquid" color="dark" size="sm" icon={<Check />} iconPosition="left">
            Confirm
          </MorphingButton>
          <MorphingButton variant="skew" color="danger" size="sm" icon={<Trash />} iconPosition="left">
            Delete
          </MorphingButton>
        </div>
      ),
      filename: "MorphingButton.tsx",
      code: `import { MorphingButton } from "@/nyxui/components/MorphingButton";
import { HiOutlineCheck, HiTrash } from "react-icons/hi";

export function ActionButtons() {
  return (
    <div className="flex space-x-2">
      <MorphingButton variant="liquid" color="dark" size="sm" icon={<HiOutlineCheck />} iconPosition="left">
        Confirm
      </MorphingButton>
      <MorphingButton variant="skew" color="danger" size="sm" icon={<HiTrash />} iconPosition="left">
        Delete
      </MorphingButton>
    </div>
  );
}`,
    },
  ],
};