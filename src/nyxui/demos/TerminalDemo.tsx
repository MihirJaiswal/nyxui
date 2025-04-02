"use client"

import React from "react"
import InteractiveTerminal from "../components/Terminal"
import { Heart, Code, Rocket, Coffee } from "lucide-react"

const TerminalDemo = () => {
  return (
    <div className="min-h-screen py-16 px-4 md:px-8 transition-colors duration-500">
      <div className="max-w-5xl mx-auto space-y-20">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Terminal <span className="text-blue-500 dark:text-blue-400">Components</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Beautiful, customizable terminal simulations for your web applications.
            Engage users with interactive command-line experiences.
          </p>
        </div>
        
        <div id="terminals" className="flex flex-col gap-12">
          <div>
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
          <div className="py-4 rounded-xl px-6 bg-gray-900 text-gray-300 mt-4">
              <h3 className="font-semibold flex items-center">
                <Heart size={16} className="text-pink-500 mr-2" /> Love Terminal
              </h3>
              <p className="text-sm text-gray-400">Spread positivity with charming messages</p>
            </div>
          </div>
          
          {/* Hacker Terminal */}
          <div>
          <div className="rounded-xl border overflow-hidden shadow-2xl transform transition-all hover:shadow-green-500/50">
            <InteractiveTerminal 
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
              promptSymbol=">"
              stepDelay={800}
            />
          </div>
            <div className="py-4 px-6 border text-gray-300 mt-4 rounded-xl">
              <h3 className="font-semibold flex items-center">
                <Code size={16} className="text-green-500 mr-2" /> Hacker Terminal
              </h3>
              <p className="text-sm text-gray-400">Create immersive cybersecurity simulations</p>
            </div>
          </div>
          
          {/* Deployment Terminal */}
          <div>
          <div className="rounded-xl overflow-hidden shadow-2xl transform transition-all hover:shadow-blue-500/50">
            <InteractiveTerminal 
              bgColor="bg-zinc-900"
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
              stepDelay={800}
            />
          </div>
          <div className="py-4 px-6 bg-zinc-900 text-gray-300 mt-4 rounded-xl">
              <h3 className="font-semibold flex items-center">
                <Rocket size={16} className="text-blue-400 mr-2" /> Deployment Terminal
              </h3>
              <p className="text-sm text-gray-400">Visualize your CI/CD deployment process</p>
            </div>
          </div>
          
          {/* Coffee Order Terminal */}
         <div>
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
          <div className="py-4 px-6 bg-amber-950 text-gray-300 mt-4 rounded-xl">
              <h3 className="font-semibold flex items-center">
                <Coffee size={16} className="text-amber-300 mr-2" /> Coffee Order Terminal
              </h3>
              <p className="text-sm text-gray-400">Showcase products with fun interactions</p>
            </div>
         </div>
        </div>
        
        {/* Footer Section */}
        <div className="pt-8 text-center">
          <div className="inline-block rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-px">
            <button className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-opacity-80 transition-all">
              Try It Yourself
            </button>
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
            Customize your own interactive terminal component with endless possibilities
          </p>
        </div>
      </div>
    </div>
  )
}

export default TerminalDemo
