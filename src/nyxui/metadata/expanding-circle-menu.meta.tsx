import React from "react";
import type { ComponentData } from "@/nyxui/ComponentInterfaces";
import { ExpandingCircleMenu } from "@/nyxui/components/ExpandingCircleMenu";
import { ExpandingCircleMenuDemo } from "@/nyxui/demos/ExpandingCircleMenuDemo";
import fs from "fs";
import path from "path";
import { Home, Settings, User, Bell } from "lucide-react";

const componentPath = path.join(
  process.cwd(),
  "src/nyxui/components/ExpandingCircleMenu.tsx"
);
const ExpandingCircleMenuSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(
  process.cwd(),
  "src/nyxui/demos/ExpandingCircleMenuDemo.tsx"
);
const ExpandingCircleMenuDemoSource = fs.readFileSync(demoPath, "utf8");

export const expandingCircleMenuData: ComponentData = {
  name: "Expanding Circle Menu",
  description:
    "A radial expanding menu that reveals actions when clicked. Inspired by game UIs where radial selection is used. Provides a highly customizable and interactive experience.",
  preview: <ExpandingCircleMenuDemo />,
  usage: ExpandingCircleMenuDemoSource,
  componentCode: ExpandingCircleMenuSource,
  dependencies: [
    {
      name: "Tailwind CSS",
      description:
        "Utility-first CSS framework used for styling the component.",
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
      name: "Expanding Circle Menu",
      items: [
        { name: "items", type: "array", default: "[]", description: "Array of menu items to display. Each item has icon, label, onClick, and optional color properties." },
        { name: "config", type: "object", default: "{}", description: "Comprehensive configuration object for customizing the menu" },
        { name: "config.initiallyOpen", type: "boolean", default: "false", description: "Whether the menu starts in an open state" },
        { name: "config.size", type: "number", default: "48", description: "Size of the trigger button in pixels" },
        { name: "config.itemSize", type: "number", default: "80% of trigger size", description: "Size of menu items in pixels" },
        { name: "config.distance", type: "number", default: "size × 1.8", description: "Distance of menu items from center" },
        { name: "config.position", type: "string", default: '"bottom-right"', description: "Position of the menu on the screen (top-left, top-right, bottom-left, bottom-right, center)" },
        { name: "config.color", type: "string", default: '"rgb(59, 130, 246)"', description: "Main color for menu items (supports any CSS color format)" },
        { name: "config.hoverColor", type: "string", default: '"rgb(37, 99, 235)"', description: "Color on hover (supports any CSS color format)" },
        { name: "config.textColor", type: "string", default: '"white"', description: "Text/icon color (supports any CSS color format)" },
        { name: "config.triggerColor", type: "string", default: "same as color", description: "Trigger button color override" },
        { name: "config.closeOnSelect", type: "boolean", default: "true", description: "Whether to close the menu when an item is clicked" },
        { name: "config.showLabels", type: "boolean", default: "true", description: "Whether to show labels for menu items" },
        { name: "config.showLabelOnHover", type: "boolean", default: "true", description: "Show labels only on hover" },
        { name: "config.backdrop", type: "boolean | 'blur'", default: "false", description: "Show a backdrop when menu is open, with optional blur effect" },
        { name: "config.animated", type: "boolean", default: "true", description: "Whether to animate menu items" },
        { name: "config.animationDuration", type: "number", default: "300", description: "Animation duration in milliseconds" },
        { name: "config.startAngle", type: "number", default: "0", description: "Starting angle in degrees for menu item positioning" },
        { name: "config.endAngle", type: "number", default: "360", description: "Ending angle in degrees for menu item positioning" },
        { name: "config.triggerIcon", type: "ReactNode", default: "plus icon", description: "Custom icon for the trigger button" },
        { name: "config.triggerRotate", type: "boolean", default: "true", description: "Whether to rotate the trigger icon when menu opens" },
        { name: "className", type: "string", default: '""', description: "Additional CSS classes to apply to the component" },
        { name: "config.containedMode", type: "boolean", default: "false", description: "Whether to contain menu items within the trigger button bounds" },
      ],
    },
  ],
  category: "Navigation",
  examples: [
    {
      name: "Basic Menu",
      preview: (
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Basic Blue Menu
          </div>
          <div className="relative h-64 w-64 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
            <ExpandingCircleMenu
              items={[
                { icon: <Home size={16} />, label: "Home" },
                { icon: <Settings size={16} />, label: "Settings" },
                { icon: <User size={16} />, label: "Profile" },
                { icon: <Bell size={16} />, label: "Notifications" },
              ]}
              config={{
                position: "center",
                initiallyOpen: true,
                containedMode: true,
                distance: 80
              }}
            />
          </div>
        </div>
      ),
      filename: "BasicMenu.tsx",
      code: `import { ExpandingCircleMenu } from "@/nyxui/components/ExpandingCircleMenu";
import { Home, Settings, User, Bell } from "lucide-react";

export function BasicMenu() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Basic Blue Menu
      </div>
      <div className="relative h-64 w-64 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
        <ExpandingCircleMenu
          items={[
            { icon: <Home size={16} />, label: "Home", onClick: () => console.log("Home clicked") },
            { icon: <Settings size={16} />, label: "Settings", onClick: () => console.log("Settings clicked") },
            { icon: <User size={16} />, label: "Profile", onClick: () => console.log("Profile clicked") },
            { icon: <Bell size={16} />, label: "Notifications", onClick: () => console.log("Notifications clicked") },
          ]}
          config={{
            position: "center",
            initiallyOpen: true,
            containedMode: true,
            distance: 80
          }}
        />
      </div>
    </div>
  );
}`,
    },
    {
      name: "Centered Menu",
      preview: (
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Centered Purple Menu
          </div>
          <div className="relative h-64 w-64 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
            <ExpandingCircleMenu
              items={[
                { icon: <Home size={18} />, label: "Home" },
                { icon: <Settings size={18} />, label: "Settings" },
                { icon: <User size={18} />, label: "Profile" },
                { icon: <Bell size={18} />, label: "Notifications" },
              ]}
              config={{
                position: "center",
                color: "rgb(168, 85, 247)",
                containedMode: true,
                size: 56,
                distance: 80,
                initiallyOpen: true
              }}
            />
          </div>
        </div>
      ),
      filename: "CenteredMenu.tsx",
      code: `import { ExpandingCircleMenu } from "@/nyxui/components/ExpandingCircleMenu";
import { Home, Settings, User, Bell } from "lucide-react";

export function CenteredMenu() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Centered Purple Menu
      </div>
      <div className="relative h-64 w-64 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
        <ExpandingCircleMenu
          items={[
            { icon: <Home size={18} />, label: "Home", onClick: () => console.log("Home clicked") },
            { icon: <Settings size={18} />, label: "Settings", onClick: () => console.log("Settings clicked") },
            { icon: <User size={18} />, label: "Profile", onClick: () => console.log("Profile clicked") },
            { icon: <Bell size={18} />, label: "Notifications", onClick: () => console.log("Notifications clicked") },
          ]}
          config={{
            position: "center",
            color: "rgb(168, 85, 247)",
            containedMode: true,
            size: 56,
            distance: 80
          }}
        />
      </div>
    </div>
  );
}`,
    },
    {
      name: "Small Menu",
      preview: (
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Small Green Menu
          </div>
          <div className="relative h-64 w-64 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
            <ExpandingCircleMenu
              items={[
                { icon: <Home size={14} />, label: "Home" },
                { icon: <Settings size={14} />, label: "Settings" },
                { icon: <User size={14} />, label: "Profile" },
              ]}
              config={{
                position: "center",
                color: "rgb(34, 197, 94)",
                containedMode: true,
                size: 36,
                distance: 50,
                initiallyOpen: true
              }}
            />
          </div>
        </div>
      ),
      filename: "SmallMenu.tsx",
      code: `import { ExpandingCircleMenu } from "@/nyxui/components/ExpandingCircleMenu";
import { Home, Settings, User } from "lucide-react";

export function SmallMenu() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Small Green Menu
      </div>
      <div className="relative h-64 w-64 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
        <ExpandingCircleMenu
          items={[
            { icon: <Home size={14} />, label: "Home", onClick: () => console.log("Home clicked") },
            { icon: <Settings size={14} />, label: "Settings", onClick: () => console.log("Settings clicked") },
            { icon: <User size={14} />, label: "Profile", onClick: () => console.log("Profile clicked") },
          ]}
          config={{
            position: "center",
            color: "rgb(34, 197, 94)",
            size: 36,
            distance: 50
          }}
        />
      </div>
    </div>
  );
}`,
    },
    {
      name: "Large Menu",
      preview: (
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Large Red Menu
          </div>
          <div className="relative h-64 w-64 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
            <ExpandingCircleMenu
              items={[
                { icon: <Home size={20} />, label: "Home" },
                { icon: <Settings size={20} />, label: "Settings" },
                { icon: <User size={20} />, label: "Profile" },
                { icon: <Bell size={20} />, label: "Notifications" },
              ]}
              config={{
                position: "center",
                color: "rgb(239, 68, 68)",
                containedMode: true,
                size: 64,
                distance: 70,
                initiallyOpen: true
              }}
            />
          </div>
        </div>
      ),
      filename: "LargeMenu.tsx",
      code: `import { ExpandingCircleMenu } from "@/nyxui/components/ExpandingCircleMenu";
import { Home, Settings, User, Bell } from "lucide-react";

export function LargeMenu() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Large Red Menu
      </div>
      <div className="relative h-64 w-64 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
        <ExpandingCircleMenu
          items={[
            { icon: <Home size={20} />, label: "Home", onClick: () => console.log("Home clicked") },
            { icon: <Settings size={20} />, label: "Settings", onClick: () => console.log("Settings clicked") },
            { icon: <User size={20} />, label: "Profile", onClick: () => console.log("Profile clicked") },
            { icon: <Bell size={20} />, label: "Notifications", onClick: () => console.log("Notifications clicked") },
          ]}
          config={{
            position: "center",
            color: "rgb(239, 68, 68)",
            containedMode: true,
            size: 64,
            distance: 70
          }}
        />
      </div>
    </div>
  );
}`,
    },
    {
      name: "Menu with Backdrop",
      preview: (
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Teal Menu with Backdrop
          </div>
          <div className="relative h-80 w-80 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
            <ExpandingCircleMenu
              items={[
                { icon: <Home size={16} />, label: "Home" },
                { icon: <Settings size={16} />, label: "Settings" },
                { icon: <User size={16} />, label: "Profile" },
              ]}
              config={{
                position: "center",
                color: "rgb(20, 184, 166)",
                containedMode: true,
                backdrop: "blur",
                distance: 60,
                initiallyOpen: true
              }}
            />
          </div>
        </div>
      ),
      filename: "MenuWithBackdrop.tsx",
      code: `import { ExpandingCircleMenu } from "@/nyxui/components/ExpandingCircleMenu";
import { Home, Settings, User } from "lucide-react";

export function MenuWithBackdrop() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Teal Menu with Backdrop
      </div>
      <div className="relative h-80 w-80 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
        <ExpandingCircleMenu
          items={[
            { icon: <Home size={16} />, label: "Home", onClick: () => console.log("Home clicked") },
            { icon: <Settings size={16} />, label: "Settings", onClick: () => console.log("Settings clicked") },
            { icon: <User size={16} />, label: "Profile", onClick: () => console.log("Profile clicked") },
          ]}
          config={{
            position: "center",
            color: "rgb(20, 184, 166)",
            backdrop: "blur",
            distance: 60
          }}
        />
      </div>
    </div>
  );
}`,
    },
    {
      name: "Custom Arc Menu",
      preview: (
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Menu with Custom Arc Range
          </div>
          <div className="relative h-80 w-80 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
            <ExpandingCircleMenu
              items={[
                { icon: <Home size={16} />, label: "Home" },
                { icon: <Settings size={16} />, label: "Settings" },
                { icon: <User size={16} />, label: "Profile" },
                { icon: <Bell size={16} />, label: "Notifications" },
              ]}
              config={{
                position: "center",
                color: "rgb(124, 58, 237)",
                containedMode: true,
                startAngle: 120,
                endAngle: 300,
                distance: 70,
                initiallyOpen: true
              }}
            />
          </div>
        </div>
      ),
      filename: "CustomArcMenu.tsx",
      code: `import { ExpandingCircleMenu } from "@/nyxui/components/ExpandingCircleMenu";
import { Home, Settings, User, Bell } from "lucide-react";

export function CustomArcMenu() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Menu with Custom Arc Range
      </div>
      <div className="relative h-80 w-80 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
        <ExpandingCircleMenu
          items={[
            { icon: <Home size={16} />, label: "Home", onClick: () => console.log("Home clicked") },
            { icon: <Settings size={16} />, label: "Settings", onClick: () => console.log("Settings clicked") },
            { icon: <User size={16} />, label: "Profile", onClick: () => console.log("Profile clicked") },
            { icon: <Bell size={16} />, label: "Notifications", onClick: () => console.log("Notifications clicked") },
          ]}
          config={{
            position: "center",
            color: "rgb(124, 58, 237)",
            containedMode: true,
            startAngle: 120,
            endAngle: 300,
            distance: 70,
            initiallyOpen: true
          }}
        />
      </div>
    </div>
  );
}`,
    },
    {
      name: "Multi-Color Menu",
      preview: (
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Menu with Individual Item Colors
          </div>
          <div className="relative h-64 w-64 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
            <ExpandingCircleMenu
              items={[
                { icon: <Home size={16} />, label: "Home", color: "rgb(239, 68, 68)" },
                { icon: <Settings size={16} />, label: "Settings", color: "rgb(34, 197, 94)" },
                { icon: <User size={16} />, label: "Profile", color: "rgb(59, 130, 246)" },
                { icon: <Bell size={16} />, label: "Notifications", color: "rgb(234, 179, 8)" },
              ]}
              config={{
                position: "center",
                color: "rgb(75, 85, 99)",
                containedMode: true,
                distance: 60,
                initiallyOpen: true
              }}
            />
          </div>
        </div>
      ),
      filename: "MultiColorMenu.tsx",
      code: `import { ExpandingCircleMenu } from "@/nyxui/components/ExpandingCircleMenu";
import { Home, Settings, User, Bell } from "lucide-react";

export function MultiColorMenu() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Menu with Individual Item Colors
      </div>
      <div className="relative h-64 w-64 border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900 flex items-center justify-center">
        <ExpandingCircleMenu
          items={[
            { icon: <Home size={16} />, label: "Home", color: "rgb(239, 68, 68)", onClick: () => console.log("Home clicked") },
            { icon: <Settings size={16} />, label: "Settings", color: "rgb(34, 197, 94)", onClick: () => console.log("Settings clicked") },
            { icon: <User size={16} />, label: "Profile", color: "rgb(59, 130, 246)", onClick: () => console.log("Profile clicked") },
            { icon: <Bell size={16} />, label: "Notifications", color: "rgb(234, 179, 8)", onClick: () => console.log("Notifications clicked") },
          ]}
          config={{
            position: "center",
            color: "rgb(75, 85, 99)",
            distance: 60
          }}
        />
      </div>
    </div>
  );
}`,
    },
  ],
};
