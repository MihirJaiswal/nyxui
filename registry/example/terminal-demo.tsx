import React from "react";
import InteractiveTerminal from "@/registry/ui/terminal";
import { Rocket } from "lucide-react";

const TerminalDemo = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto relative">
      <InteractiveTerminal
        command="deploy --production"
        autoExecute
        variant="sky"
        repeat
        icon={<Rocket className="text-blue-400 size-4" />}
        steps={[
          "Initializing deployment pipeline...",
          "Running pre-deployment checks...",
          "Building application assets...",
          "Running test suite...",
          "Optimizing build size...",
          "Provisioning cloud resources...",
          "Deploying to production servers...",
        ]}
        finalMessage={`✅ DEPLOYMENT SUCCESSFUL!
  
  Application deployed to: https://nyxui.com/
  Build version: 1.0.42
  Deployment ID: d8f72b3e-9c1a-4f8b-b98c-7f2e9e1fcb5a
  Deployment time: 2m 43s
  
  All systems operational. Monitoring dashboard available at /admin/metrics
                `}
        stepDelay={800}
      />
    </div>
  );
};

export default TerminalDemo;
