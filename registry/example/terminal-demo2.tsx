import React from "react";
import InteractiveTerminal from "@/registry/ui/terminal";
import { Package } from "lucide-react";

export default function TerminalDemo2() {
  return (
    <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto">
      <InteractiveTerminal
        command="npm create nyxui@latest"
        autoExecute
        variant="default"
        title="bash — 80×24"
        icon={<Package className="size-4" />}
        steps={[
          "Scaffolding project structure...",
          "Installing UI components...",
          "Setting up Tailwind config...",
          "Configuring theme tokens...",
          "Wiring up animations...",
        ]}
        finalMessage={`✔ Project created successfully!
Next steps:
cd my-app
npm run dev
        `}
        stepDelay={900}
      />
    </div>
  );
}
