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
  dependencies: [],
  props: [
    {
      name: "Morphing Button",
      items: [
        {
          name: "variant",
          type: "string",
          default: 'expand',
          description: "Button transformation animation variant - (expand, collapse, rotate, skew, liquid, gradient, glow, pulse, reveal, bounce)",
        },
        {
          name: "size",
          type: "string",
          default: 'md',
          description: "Button size - (xs, sm, md, lg, xl)",
        },
        {
          name: "color",
          type: "string",
          default: 'primary',
          description: "Button color theme - (primary, secondary, success, danger, warning, info, dark, slate, violet, indigo, teal, rose, amber, custom)",
        },
        {
          name: "rounded",
          type: "string",
          default: 'md',
          description: "Button corner radius - (none, sm, md, lg, full)",
        },
        {
          name: "shadow",
          type: "string",
          default: 'md',
          description: "Button shadow effect - (none, sm, md, lg, xl, inner, glow)",
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
          default: 'left',
          description: "Position of the icon relative to button text - (left, right, only)",
        },
        {
          name: "className",
          type: "string",
          default: '',
          description: "Additional CSS classes to apply",
        },
        {
          name: "onClick",
          type: "function",
          default: "undefined",
          description: "Callback function to be called when the button is clicked",
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