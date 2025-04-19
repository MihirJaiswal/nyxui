"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Command, Send, Copy, RotateCcw } from "lucide-react";

export type TerminalProps = {
  bgColor?: string;
  textColor?: string;
  command?: string;
  commandBg?: string;
  commandMessage?: string;
  processingSteps?: string[];
  finalMessage?: string;
  stepDelay?: number;
  typingDelay?: number;
  icon?: React.ReactNode;
  promptSymbol?: string;
  inputPlaceholder?: string;
  outputHeight?: string;
  rounded?: string;
  className?: string;
  autoMode?: boolean;
};

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
  typingDelay = 100,
  icon = <Command className="mr-2" />,
  promptSymbol = "$",
  inputPlaceholder = "Type your command here...",
  outputHeight = "h-80",
  autoMode = false,
}) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [typing, setTyping] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const outputRef = useRef<HTMLDivElement>(null);
  const [commandExecuted, setCommandExecuted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const executeCommand = useCallback(() => {
    setOutput((prev) => [...prev, `${promptSymbol} ${input}`]);
    setStep(1);
    setInput("");
  }, [promptSymbol, input]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    if (autoMode && !typing && !commandExecuted) {
      const timer = setTimeout(() => {
        setTyping(true);
        setCharIndex(0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoMode, typing, commandExecuted]);

  useEffect(() => {
    if (typing && charIndex < command.length) {
      const timer = setTimeout(() => {
        setInput(command.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingDelay);
      return () => clearTimeout(timer);
    } else if (typing && charIndex === command.length) {
      const timer = setTimeout(() => {
        executeCommand();
        setTyping(false);
        setCommandExecuted(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [typing, charIndex, command, typingDelay, executeCommand]);

  useEffect(() => {
    if (step > 0 && step <= processingSteps.length) {
      setOutput((prev) => [...prev, processingSteps[step - 1]]);
      const timer = setTimeout(() => setStep(step + 1), stepDelay);
      return () => clearTimeout(timer);
    } else if (step > processingSteps.length) {
      setOutput((prev) => [...prev, finalMessage]);
      setCompleted(true);
    }
  }, [step, processingSteps, finalMessage, stepDelay]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand();
    setCommandExecuted(true);
  };

  const resetTerminal = () => {
    setOutput([]);
    setStep(0);
    setCharIndex(0);
    setTyping(false);
    setCommandExecuted(false);
    setCompleted(false);
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const replayCommand = () => {
    resetTerminal();
  };

  return (
    <div
      className={`max-w-4xl mx-auto p-3 md:p-6 ${bgColor} ${textColor} rounded-${rounded} shadow-lg font-mono scrollbar-thin`}
    >
      <div
        className={`mb-4 p-2 ${commandBg} border-${textColor} rounded flex items-center justify-between`}
      >
        <div className="flex items-center gap-1">
          <div className="-mt-1">{icon}</div>
          <span>
            {commandMessage} <strong>{command}</strong>
          </span>
        </div>
        <div className="flex gap-2">
          {autoMode ? (
            completed && (
              <button
                onClick={replayCommand}
                className={`px-2 py-1 ${textColor} rounded text-sm flex items-center cursor-pointer`}
                title="Replay"
                type="button"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Replay
              </button>
            )
          ) : step === 0 ? (
            <button
              onClick={copyCommand}
              className={`px-2 py-1 ${textColor} rounded text-sm flex items-center cursor-pointer`}
              title="Copy command"
              type="button"
            >
              <Copy className="w-4 h-4 mr-1" />
              {copied ? "Copied!" : "Copy"}
            </button>
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
      <div
        ref={outputRef}
        className={`${outputHeight} mb-4 p-2 bg-black rounded hide-scrollbar`}
      >
        {output.map((line, index) => (
          <pre key={index} className="whitespace-pre-wrap">
            {line}
          </pre>
        ))}
        {typing && (
          <pre className="whitespace-pre-wrap cursor-typing">
            {promptSymbol} {input}
          </pre>
        )}
      </div>
      {!autoMode && step === 0 && !commandExecuted && (
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="mr-2">{promptSymbol}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent focus:outline-none cursor-typing"
            placeholder={inputPlaceholder}
          />
          <button
            type="button"
            onClick={executeCommand}
            className="ml-2 p-1 rounded-full hover:bg-gray-700 transition-colors cursor-pointer"
            title="Send command"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
      <style jsx>{`
        @keyframes blink {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .cursor-typing::after {
          content: "|";
          animation: blink 1s infinite;
        }
        pre {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .hide-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>
    </div>
  );
};

export default InteractiveTerminal;
