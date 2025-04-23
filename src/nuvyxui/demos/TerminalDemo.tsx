
import React from "react"
import InteractiveTerminal from "../components/Terminal"
import { Rocket } from "lucide-react"

const TerminalDemo = () => {
  return (
    <div className="flex flex-col gap-12 w-full max-w-4xl mx-auto">
          <div>
            <div className="rounded-xl overflow-hidden shadow-2xl transform transition-all hover:shadow-blue-500/50">
              <InteractiveTerminal
                bgColor="bg-zinc-900"
                textColor="text-blue-400"
                command="deploy --production"
                autoMode
                repeat
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
                stepDelay={800}
              />
            </div>
          </div>
        </div>
  )
}

export default TerminalDemo
