import React from "react";
import InteractiveTerminal from "../components/terminali";
import { Rocket } from "lucide-react";

const TerminalDemo = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto relative">
      <div>
        <InteractiveTerminal
          command="deploy --production"
          autoExecute
          variant="dark"
          repeat
          icon={<Rocket className="mr-2 text-blue-400" />}
          steps={[
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
  
  Application deployed to: https://nuvyxui.vercel.app/
  Build version: 1.0.42
  Deployment ID: d8f72b3e-9c1a-4f8b-b98c-7f2e9e1fcb5a
  Deployment time: 2m 43s
  
  All systems operational. Monitoring dashboard available at /admin/metrics
                `}
          stepDelay={800}
          className="rounded-md border border-blue-900/50 shadow-md hover:shadow-lg transition-shadow"
        />
      </div>
    </div>
  );
};

export default TerminalDemo;
