
import React from "react"
import InteractiveTerminal from "../components/Terminal"
import { Code } from "lucide-react"

const TerminalDemo = () => {
  return (
    <div className="min-h-screen py-16 px-4 md:px-8 transition-colors duration-500">
      <div className="max-w-5xl mx-auto space-y-20">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Terminal <span className="text-purple-500 dark:text-purple-400">Components</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Beautiful, customizable terminal simulations for your web applications.
            Engage users with interactive command-line experiences.
          </p>
        </div>
        
        <div id="terminals" className="flex flex-col gap-12">
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
            <div className="py-4 px-6 border bg-black border-gray-800 text-gray-300 mt-4 rounded-md">
              <h3 className="font-semibold flex items-center">
                <Code size={16} className="text-green-500 mr-2" /> Hacker Terminal
              </h3>
              <p className="text-sm text-gray-400">Create immersive cybersecurity simulations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TerminalDemo
