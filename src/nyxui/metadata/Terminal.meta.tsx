import type { ComponentData } from "@/nyxui/ComponentInterfaces";
import TerminalDemo from "@/nyxui/demos/TerminalDemo";
import fs from "fs";
import { Code, Heart, Rocket } from "lucide-react";
import path from "path";
import InteractiveTerminal from "../components/Terminal";

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
      name: "Next.js",
      description: "React framework used to build the component.",
      install: {
        npm: "npm install next react react-dom",
        yarn: "yarn add next react react-dom",
        pnpm: "pnpm install next react react-dom",
        bun: "bun install next react react-dom"
      }
    },
    {
      name: "Tailwind CSS",
      description:
        "Utility-first CSS framework used for styling the component.",
      install: {
        npm: "npm install tailwindcss postcss autoprefixer && npx tailwindcss init -p",
        yarn: "yarn add tailwindcss postcss autoprefixer && yarn tailwindcss init -p",
        pnpm: "pnpm install tailwindcss postcss autoprefixer && pnpm tailwindcss init -p",
        bun: "bun install tailwindcss postcss autoprefixer && bun tailwindcss init -p"
      },
      setup: {
        description: "Configure Tailwind CSS by creating a tailwind.config.js file.",
        file: "tailwind.config.js",
        code: `module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};`
      }
    },
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
          description: "Background color for the terminal container."
        },
        {
          name: "textColor",
          type: "string",
          default: '"text-green-400"',
          description: "Text color for the terminal output."
        },
        {
          name: "command",
          type: "string",
          default: '"help"',
          description: "Command that users need to enter to trigger the terminal sequence."
        },
        {
          name: "commandMessage",
          type: "string",
          default: '"Enter this command:"',
          description: "Message to display about the command."
        },
        {
          name: "processingSteps",
          type: "string[]",
          default: '["Processing command..."]',
          description: "Array of processing steps to display sequentially."
        },
        {
          name: "finalMessage",
          type: "string",
          default: '"Command executed successfully!"',
          description: "Final message to display after all processing steps."
        },
        {
          name: "stepDelay",
          type: "number",
          default: "1000",
          description: "Delay between processing steps in milliseconds."
        },
        {
          name: "title",
          type: "string",
          default: '"Interactive Terminal"',
          description: "Title to display above the terminal."
        },
        {
          name: "icon",
          type: "React.ReactNode",
          default: "<TerminalIcon className=\"mr-2\" />",
          description: "Icon to display in the command info bar."
        },
        {
          name: "promptSymbol",
          type: "string",
          default: '"$"',
          description: "Terminal prompt symbol displayed before user input."
        },
        {
          name: "inputPlaceholder",
          type: "string",
          default: '"Type your command here..."',
          description: "Placeholder text for the input field."
        },
        {
          name: "outputHeight",
          type: "string",
          default: '"h-80"',
          description: "Height for the terminal output area."
        },
        {
          name: "className",
          type: "string",
          default: '""',
          description: "Custom class names to apply to the container."
        },
        {
          name: "backgroundGradient",
          type: "string",
          default: '"bg-gray-100"',
          description: "Background gradient for the container."
        }
      ]
    }
  ],
  category: "Components",
  examples: [
    {
      name: "Love Terminal",
      preview: (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-medium mb-4">Love Terminal</h2>
          <InteractiveTerminal 
            title="Love Terminal"
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
            backgroundGradient="bg-gradient-to-b from-purple-200 via-rose-200 to-pink-100"
          />
        </div>
      ),
      filename: "LoveTerminal.tsx",
      code: `import { Heart } from "lucide-react";
import InteractiveTerminal from "@/nyxui/components/InteractiveTerminal";

export function LoveTerminal() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-medium mb-4">Love Terminal</h2>
      <InteractiveTerminal 
        title="Love Terminal"
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
        backgroundGradient="bg-gradient-to-b from-purple-200 via-rose-200 to-pink-100"
      />
    </div>
  );
}`
    },
    {
      name: "Hacker Terminal",
      preview: (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-medium mb-4">Hacker Terminal</h2>
          <InteractiveTerminal 
            title="Hacker Terminal"
            bgColor="bg-black"
            textColor="text-green-500"
            command="sudo hack --target=mainframe"
            commandMessage="Execute this command:"
            icon={<Code className="mr-2" />}
            processingSteps={[
              "Initializing exploit framework...",
              "Scanning for vulnerabilities...",
              "Bypassing security protocols...",
              "Accessing restricted files...",
              "Covering tracks...",
            ]}
            finalMessage={`
⚠️  ACCESS GRANTED  ⚠️

[SYSTEM]: Mainframe successfully compromised
[SYSTEM]: All security protocols bypassed
[SYSTEM]: User promoted to root access
[SYSTEM]: Connection established on port 443
[SYSTEM]: Remember, with great power comes great responsibility

Connection secured. Press ENTER to continue...
            `}
            backgroundGradient="bg-gradient-to-r from-gray-900 to-gray-800"
            promptSymbol=">"
          />
        </div>
      ),
      filename: "HackerTerminal.tsx",
      code: `import { Code } from "lucide-react";
import InteractiveTerminal from "@/nyxui/components/InteractiveTerminal";

export function HackerTerminal() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-medium mb-4">Hacker Terminal</h2>
      <InteractiveTerminal 
        title="Hacker Terminal"
        bgColor="bg-black"
        textColor="text-green-500"
        command="sudo hack --target=mainframe"
        commandMessage="Execute this command:"
        icon={<Code className="mr-2" />}
        processingSteps={[
          "Initializing exploit framework...",
          "Scanning for vulnerabilities...",
          "Bypassing security protocols...",
          "Accessing restricted files...",
          "Covering tracks...",
        ]}
        finalMessage={\`
⚠️  ACCESS GRANTED  ⚠️

[SYSTEM]: Mainframe successfully compromised
[SYSTEM]: All security protocols bypassed
[SYSTEM]: User promoted to root access
[SYSTEM]: Connection established on port 443
[SYSTEM]: Remember, with great power comes great responsibility

Connection secured. Press ENTER to continue...
        \`}
        backgroundGradient="bg-gradient-to-r from-gray-900 to-gray-800"
        promptSymbol=">"
      />
    </div>
  );
}`
    },
    {
      name: "Deployment Terminal",
      preview: (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-medium mb-4">Deployment Terminal</h2>
          <InteractiveTerminal 
            title="Deployment Terminal"
            bgColor="bg-gray-800"
            textColor="text-blue-400"
            command="deploy --production"
            commandMessage="Run this command to deploy:"
            icon={<Rocket className="mr-2 text-blue-400" />}
            processingSteps={[
              "Initializing deployment pipeline...",
              "Running pre-deployment checks...",
              "Building application assets...",
              "Running test suite...",
              "Optimizing build size...",
              "Provisioning cloud resources...",
              "Deploying to production servers...",
            ]}
            finalMessage={`
✅ DEPLOYMENT SUCCESSFUL!

Application deployed to: https://your-app.example.com
Build version: 1.0.42
Deployment ID: d8f72b3e-9c1a-4f8b-b98c-7f2e9e1fcb5a
Deployment time: 2m 43s

All systems operational. Monitoring dashboard available at /admin/metrics
            `}
            backgroundGradient="bg-gradient-to-b from-blue-900 via-blue-800 to-gray-900"
            stepDelay={800}
          />
        </div>
      ),
      filename: "DeploymentTerminal.tsx",
      code: `import { Rocket } from "lucide-react";
import InteractiveTerminal from "@/nyxui/components/InteractiveTerminal";

export function DeploymentTerminal() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-medium mb-4">Deployment Terminal</h2>
      <InteractiveTerminal 
        title="Deployment Terminal"
        bgColor="bg-gray-800"
        textColor="text-blue-400"
        command="deploy --production"
        commandMessage="Run this command to deploy:"
        icon={<Rocket className="mr-2 text-blue-400" />}
        processingSteps={[
          "Initializing deployment pipeline...",
          "Running pre-deployment checks...",
          "Building application assets...",
          "Running test suite...",
          "Optimizing build size...",
          "Provisioning cloud resources...",
          "Deploying to production servers...",
        ]}
        finalMessage={\`
✅ DEPLOYMENT SUCCESSFUL!

Application deployed to: https://your-app.example.com
Build version: 1.0.42
Deployment ID: d8f72b3e-9c1a-4f8b-b98c-7f2e9e1fcb5a
Deployment time: 2m 43s

All systems operational. Monitoring dashboard available at /admin/metrics
        \`}
        backgroundGradient="bg-gradient-to-b from-blue-900 via-blue-800 to-gray-900"
        stepDelay={800}
      />
    </div>
  );
}`
    }
  ]
};