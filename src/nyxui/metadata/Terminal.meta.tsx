import type { ComponentData } from "@/nyxui/ComponentInterfaces";
import TerminalDemo from "@/nyxui/demos/TerminalDemo";
import fs from "fs";
import path from "path";

const componentPath = path.join(process.cwd(), "src/nyxui/components/Terminal.tsx");
const TerminalSource = fs.readFileSync(componentPath, "utf8");

const demoPath = path.join(process.cwd(), "src/nyxui/demos/TerminalDemo.tsx");
const TerminalDemoSource = fs.readFileSync(demoPath, "utf8");

export const interactiveTerminalData: ComponentData = {
  name: "Interactive Terminal",
  description:
    "A customizable terminal component with animated output and command processing. It supports different themes, icons, and interactive behavior via props.",
  preview: <TerminalDemo />,
  usage: TerminalDemoSource,
  componentCode: TerminalSource,
  dependencies: [
    {
      name: "Lucide React",
      description: "Icon library used for terminal icons.",
      install: {
        npm: "npm install lucide-react",
        yarn: "yarn add lucide-react",
        pnpm: "pnpm install lucide-react",
        bun: "bun install lucide-react"
      }
    }
  ],
  props: [
    {
      name: "Terminal Props",
      items: [
        {
          name: "bgColor",
          type: "string",
          default: '"bg-gray-900"',
          description: "Background color for the terminal container.",
        },
        {
          name: "textColor",
          type: "string",
          default: '"text-green-400"',
          description: "Text color for the terminal output.",
        },
        {
          name: "command",
          type: "string",
          default: '"help"',
          description: "Command that users need to enter to trigger the terminal sequence.",
        },
        {
          name: "commandMessage",
          type: "string",
          default: '"Enter this command:"',
          description: "Message to display about the command.",
        },
        {
          name: "processingSteps",
          type: "string[]",
          default: '["Processing command..."]',
          description: "Array of processing steps to display sequentially.",
        },
        {
          name: "finalMessage",
          type: "string",
          default: '"Command executed successfully!"',
          description: "Final message to display after all processing steps.",
        },
        {
          name: "stepDelay",
          type: "number",
          default: "1000",
          description: "Delay between processing steps in milliseconds.",
        },
        {
          name: "title",
          type: "string",
          default: '"Interactive Terminal"',
          description: "Title displayed above the terminal.",
        },
        {
          name: "icon",
          type: "React.ReactNode",
          default: '<TerminalIcon className="mr-2" />',
          description: "Icon to display in the command info bar.",
        },
        {
          name: "promptSymbol",
          type: "string",
          default: '"$"',
          description: "Terminal prompt symbol displayed before user input.",
        },
        {
          name: "inputPlaceholder",
          type: "string",
          default: '"Type your command here..."',
          description: "Placeholder text for the input field.",
        },
        {
          name: "outputHeight",
          type: "string",
          default: '"h-80"',
          description: "Height for the terminal output area.",
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Custom class names to apply to the container.",
        },
        {
          name: "backgroundGradient",
          type: "string",
          default: '"bg-gray-100"',
          description: "Background gradient for the container.",
        },
      ],
    },
  ],
  category: "Display",
  examples: []
};