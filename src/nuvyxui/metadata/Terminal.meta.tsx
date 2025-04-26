import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import TerminalDemo from "@/nuvyxui/demos/TerminalDemo";
import { Coffee, Heart } from "lucide-react";
import InteractiveTerminal from "../components/Terminal";
import TerminalSource from "!!raw-loader!@/nuvyxui/components/Terminal.tsx";
import TerminalDemoSource from "!!raw-loader!@/nuvyxui/demos/TerminalDemo.tsx";

export const interactiveTerminalData: ComponentData = {
  name: "Interactive Terminal",
  description:
    "A customizable terminal component with animated output and command processing.",
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
        bun: "bun install lucide-react",
      },
      setup: {
        description: "Create a utils.ts file with the cn utility function",
        file: "/lib/utils.ts",
        code: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
      },
    },
  ],
  tags: ["interactive", "Mock"],
  props: [
    {
      name: "Terminal Props",
      items: [
        {
          name: "command",
          type: "string",
          default: '"help"',
          description:
            "Command that users need to enter to trigger the terminal sequence.",
        },
        {
          name: "steps",
          type: "string[]",
          default: 'Processing command',
          description:
            "Array of processing steps to display sequentially.",
        },
        {
          name: "finalMessage",
          type: "string",
          default: "Command executed successfully!",
          description:
            "Final message to display after all processing steps.",
        },
        {
          name: "stepDelay",
          type: "number",
          default: "1000",
          description:
            "Delay between processing steps in milliseconds.",
        },
        {
          name: "typingDelay",
          type: "number",
          default: "100",
          description:
            "Delay between individual keystrokes when animating typing, in milliseconds.",
        },
        {
          name: "icon",
          type: "React.ReactNode",
          default: '<TerminalIcon />',
          description:
            "Icon to display in the command info bar.",
        },
        {
          name: "promptSymbol",
          type: "string",
          default: '"$"',
          description:
            "Terminal prompt symbol displayed before user input.",
        },
        {
          name: "inputPlaceholder",
          type: "string",
          default: "Type your command here",
          description:
            "Placeholder text for the input field.",
        },
        {
          name: "autoExecute",
          type: "boolean",
          default: "false",
          description:
            "Enables automatic command execution without waiting for user input.",
        },
        {
          name: "repeat",
          type: "boolean",
          default: "false",
          description:
            "Whether to repeat the entire command sequence automatically after it finishes.",
        },
        {
          name: "repeatDelay",
          type: "number",
          default: "3000",
          description:
            "Delay between repetitions in milliseconds when `repeat` is enabled.",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description:
            "Additional CSS class names to apply to the terminal container.",
        },
        {
          name: "variant",
          type: 'string',
          default: '"default"',
          description:
            "Visual style variant for the terminal.(default, dark, matrix, retro, custom)",
        },
        {
          name: "customTheme",
          type: "{ container?: string; header?: string; output?: string; button?: string }",
          default: "{}",
          description:
            "Custom CSS theme overrides for container, header, output, and button.",
        },
      ],
    },
  ],
  category: "Interactive tools",
  examples: [
    {
      name: "Love Terminal",
      preview: (
        <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto">
          <div className="overflow-hidden shadow-lg transform transition-all hover:shadow-pink-500/50">
            <InteractiveTerminal
              command="npm run deploy-love"
              icon={<Heart className="mr-2 text-pink-500" />}
              steps={[
                "Initializing love.exe...",
                "Loading heart modules...",
                "Compiling affection data...",
                "Optimizing cuddle algorithms...",
                "Deploying hugs and kisses...",
              ]}
              autoExecute
              repeat
              variant="custom"
              customTheme={
                {
                  container: "bg-red-950/40 text-pink-400",
                  header: "bg-pink-950/40 text-pink-400",
                  output: "bg-pink-950/40 text-pink-400",
                  button: "bg-gray-950 text-pink-400",
                }
              }
              finalMessage={`
  ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
  ❤️                                                        ❤️
  ❤️   Love successfully deployed! You are amazing and      ❤️
  ❤️   deserve all the happiness in the world. Keep         ❤️
  ❤️   spreading love and kindness wherever you go! ❤️      ❤️
  ❤️                                                        ❤️
  ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
              `}
              stepDelay={1000}
              className="border border-pink-800/50 rounded-md"
            />
          </div>
        </div>
      ),
      filename: "LoveTerminal.tsx",
      code: `import { InteractiveTerminal } from "@/components/Terminal";
  import { Heart } from "lucide-react";
  
  export function LoveTerminal() {
    return (
      <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto">
          <div className="overflow-hidden shadow-lg transform transition-all hover:shadow-pink-500/50">
            <InteractiveTerminal
              command="npm run deploy-love"
              icon={<Heart className="mr-2 text-pink-500" />}
              steps={[
                "Initializing love.exe...",
                "Loading heart modules...",
                "Compiling affection data...",
                "Optimizing cuddle algorithms...",
                "Deploying hugs and kisses...",
              ]}
              autoExecute
              repeat
              variant="custom"
              customTheme={
                {
                  container: "bg-red-950/40 text-pink-400",
                  header: "bg-pink-950/40 text-pink-400",
                  output: "bg-pink-950/40 text-pink-400",
                  button: "bg-gray-950 text-pink-400",
                }
              }
              finalMessage={\`
  ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
  ❤️                                                        ❤️
  ❤️   Love successfully deployed! You are amazing and      ❤️
  ❤️   deserve all the happiness in the world. Keep         ❤️
  ❤️   spreading love and kindness wherever you go! ❤️      ❤️
  ❤️                                                        ❤️
  ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
              \`}
              stepDelay={1000}
              className="border border-pink-800/50 rounded-md"
            />
          </div>
        </div>
    );
  }`,
    },
    {
      name: "Coffee Order Terminal",
      preview: (
        <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto">
          <div className="overflow-hidden shadow-lg transform transition-all hover:shadow-amber-500/50">
            <InteractiveTerminal
              command="brew --coffee latte"
              icon={<Coffee className="mr-2" />}
              variant="retro"
              steps={[
                "Taking your order...",
                "Grinding fresh beans...",
                "Heating water to 93°C...",
                "Extracting espresso shot...",
                "Steaming milk to perfection...",
                "Adding artistic foam design...",
              ]}
              finalMessage={`
  ☕ ORDER COMPLETE! ☕
  
  Your perfect latte is ready:
  - Double shot espresso (Ethiopian beans)
  - Silky steamed oat milk
  - Artisanal foam leaf pattern
  
  Enjoy your coffee and have a wonderful day!
              `}
              stepDelay={1200}
              promptSymbol="☕"
              className="rounded-md"
            />
          </div>
        </div>
      ),
      filename: "CoffeeOrderTerminal.tsx",
      code: `import { InteractiveTerminal } from "@/components/Terminal";
  import { Coffee } from "lucide-react";
  
  export function CoffeeOrderTerminal() {
    return (
      <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto">
          <div className="overflow-hidden shadow-lg transform transition-all hover:shadow-amber-500/50">
            <InteractiveTerminal
              command="brew --coffee latte"
              icon={<Coffee className="mr-2" />}
              variant="retro"
              steps={[
                "Taking your order...",
                "Grinding fresh beans...",
                "Heating water to 93°C...",
                "Extracting espresso shot...",
                "Steaming milk to perfection...",
                "Adding artistic foam design...",
              ]}
              finalMessage={\`
  ☕ ORDER COMPLETE! ☕
  
  Your perfect latte is ready:
  - Double shot espresso (Ethiopian beans)
  - Silky steamed oat milk
  - Artisanal foam leaf pattern
  
  Enjoy your coffee and have a wonderful day!
              \`}
              stepDelay={1200}
              promptSymbol="☕"
              className="rounded-md"
            />
          </div>
        </div>
    );
  }`,
    },
  ],
};
