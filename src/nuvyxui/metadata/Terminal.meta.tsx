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
    },
  ],
  tags: ["interactive", "Mock"],
  props: [
    {
      name: "Terminal Props",
      items: [
        {
          name: "autoMode",
          type: "boolean",
          default: "false",
          description: "Enables automatic command execution.",
        },
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
          description:
            "Command that users need to enter to trigger the terminal sequence.",
        },
        {
          name: "commandBg",
          type: "string",
          default: '"bg-gray-950"',
          description: "Background color for the command info bar.",
        },
        {
          name: "rounded",
          type: "string",
          default: '"sm"',
          description: "Border radius for the terminal container.",
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
  category: "Interactive tools",
  examples: [
    {
      name: "Love Terminal",
      preview: (
        <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto">
          <div className="overflow-hidden shadow-2xl transform transition-all hover:shadow-pink-500/50">
            <InteractiveTerminal
              bgColor="bg-gray-900"
              textColor="text-pink-400"
              command="npm run deploy-love"
              commandMessage="Copy and paste this command:"
              icon={<Heart className="mr-2 text-pink-500" />}
              processingSteps={[
                "Initializing love.exe...",
                "Loading heart modules...",
                "Compiling affection data...",
                "Optimizing cuddle algorithms...",
                "Deploying hugs and kisses...",
              ]}
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
        <div className="overflow-hidden shadow-2xl transform transition-all hover:shadow-pink-500/50">
          <InteractiveTerminal
            bgColor="bg-gray-900"
            textColor="text-pink-400"
            command="npm run deploy-love"
            commandMessage="Copy and paste this command:"
            icon={<Heart className="mr-2 text-pink-500" />}
            processingSteps={[
              "Initializing love.exe...",
              "Loading heart modules...",
              "Compiling affection data...",
              "Optimizing cuddle algorithms...",
              "Deploying hugs and kisses...",
            ]}
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
          <div className="rounded-xl overflow-hidden shadow-2xl transform transition-all hover:shadow-amber-500/50">
            <InteractiveTerminal
              bgColor="bg-amber-950"
              textColor="text-amber-200"
              command="brew --coffee latte"
              commandMessage="Order your coffee with:"
              icon={<Coffee className="mr-2" />}
              processingSteps={[
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
        <div className="rounded-xl overflow-hidden shadow-2xl transform transition-all hover:shadow-amber-500/50">
          <InteractiveTerminal 
            bgColor="bg-amber-950"
            textColor="text-amber-200"
            command="brew --coffee latte"
            commandMessage="Order your coffee with:"
            icon={<Coffee className="mr-2" />}
            processingSteps={[
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
          />
        </div>
      </div>
    );
  }`,
    },
  ],
};
