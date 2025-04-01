"use client"

import React from "react"
import InteractiveTerminal from "../components/Terminal"
import { Heart, Terminal, Code, Rocket, Coffee } from "lucide-react"

const TerminalDemo = () => {
  return (
    <div className="space-y-16 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">Interactive Terminal Components</h1>
      
      {/* Love Terminal (Original) */}
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
      
      {/* Hacker Terminal */}
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
      
      {/* Deployment Terminal */}
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
      
      {/* Coffee Order Terminal */}
      <InteractiveTerminal 
        title="Coffee Order Terminal"
        bgColor="bg-amber-900"
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
        backgroundGradient="bg-gradient-to-b from-amber-800 via-amber-700 to-amber-900"
        stepDelay={1200}
        promptSymbol="☕"
      />
    </div>
  )
}

export default TerminalDemo