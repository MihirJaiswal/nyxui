"use client"
import React, { useState, useEffect } from "react"
import { Command, Send, Copy, RotateCcw } from "lucide-react"

export type TerminalProps = {
  bgColor?: string;
  textColor?: string;
  command?: string;
  commandBg?: string;
  commandMessage?: string;
  processingSteps?: string[];
  finalMessage?: string;
  stepDelay?: number;
  icon?: React.ReactNode;
  promptSymbol?: string;
  inputPlaceholder?: string;
  outputHeight?: string;
  rounded?: string;
  className?: string;
}

const InteractiveTerminal: React.FC<TerminalProps> = ({
  bgColor = "bg-gray-900",
  textColor = "text-green-400",
  command = "help",
  commandBg = "bg-gray-950",
  rounded = "sm",
  commandMessage = "Enter this command:",
  processingSteps = ["Processing command..."],
  finalMessage = "Command executed successfully!",
  stepDelay = 1000,
  icon = <Command className="mr-2" />,
  promptSymbol = "$",
  inputPlaceholder = "Type your command here...",
  outputHeight = "h-80",
}) => {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([])
  const [step, setStep] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (step > 0 && step <= processingSteps.length) {
      setOutput((prev) => [...prev, processingSteps[step - 1]])
      const timer = setTimeout(() => setStep(step + 1), stepDelay)
      return () => clearTimeout(timer)
    } else if (step > processingSteps.length) {
      setOutput((prev) => [...prev, finalMessage])
    }
  }, [step, processingSteps, finalMessage, stepDelay])

  const executeCommand = () => {
    if (input === command) {
      setStep(1)
      setInput("")
    } else {
      setOutput((prev) => [...prev, `Command not recognized: ${input}`])
      setInput("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    executeCommand()
  }

  const resetTerminal = () => {
    setOutput([])
    setStep(0)
  }

  const copyCommand = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`max-w-4xl mx-auto p-3 md:p-6 ${bgColor} ${textColor} rounded-${rounded} shadow-lg font-mono overflow-y-auto scrollbar-thin`}>
      <div className={`mb-4 p-2 ${commandBg} border-${textColor} rounded flex items-center justify-between`}>
        <div className="flex items-center">
          {icon}
          <span>
            {commandMessage} <strong>{command}</strong>
          </span>
        </div>
        <div className="flex gap-2">
          {step === 0 ? (
            <>
              <button 
                onClick={copyCommand}
                className={`px-2 py-1 ${textColor} rounded text-sm flex items-center cursor-pointer`}
                title="Copy command"
                type="button"
              >
                <Copy className="w-4 h-4 mr-1" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </>
          ) : (
            <button 
              onClick={resetTerminal}
              className={`px-2 py-1 ${textColor} rounded text-sm flex items-center cursor-pointer`}
              title="Reset terminal"
              type="button"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </button>
          )}
        </div>
      </div>
      <div className={`${outputHeight} mb-4 p-2 bg-black rounded overflow-y-auto hidee-scrollbar`}>
        {output.map((line, index) => (
          <pre key={index} className="whitespace-pre-wrap">
            {line}
          </pre>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="mr-2">{promptSymbol}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-transparent focus:outline-none"
          placeholder={inputPlaceholder}
        />
        <button 
          type="button"
          onClick={executeCommand}
          className={`ml-2 p-1 rounded-full hover:bg-gray-700 transition-colors cursor-pointer`}
          title="Send command"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
      <style jsx>{`
  @keyframes blink {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
  input::after {
    content: '|';
    animation: blink 1s infinite;
  }
  pre {
    animation: fadeIn 0.5s ease-in-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  div.overflow-y-auto::-webkit-scrollbar {
    display: none !important;
  }
  div.overflow-y-auto {
    -ms-overflow-style: none !important;  
    scrollbar-width: none !important;
  }
`}</style>
    </div>
  )
}

export default InteractiveTerminal