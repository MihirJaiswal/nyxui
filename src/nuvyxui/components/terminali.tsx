"use client";
import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Send, Copy, RotateCcw, TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type TerminalProps = {
  command?: string;
  steps?: string[];
  finalMessage?: string;
  stepDelay?: number;
  typingDelay?: number;
  icon?: React.ReactNode;
  promptSymbol?: string;
  inputPlaceholder?: string;
  autoExecute?: boolean;
  repeat?: boolean;
  repeatDelay?: number;
  className?: string;
  variant?: "default" | "dark" | "matrix" | "retro" | "custom";
  customTheme?: {
    container?: string;
    header?: string;
    output?: string;
    button?: string;
  };
};

const InteractiveTerminal: React.FC<TerminalProps> = ({
  command = "help",
  steps = ["Processing command..."],
  finalMessage = "Command executed successfully!",
  stepDelay = 1000,
  typingDelay = 100,
  icon = <TerminalIcon className="h-4 w-4 mr-2" />,
  promptSymbol = "$",
  inputPlaceholder = "Type your command here...",
  autoExecute = false,
  repeat = false,
  repeatDelay = 3000,
  className,
  variant = "default",
  customTheme,
}) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [typing, setTyping] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [commandExecuted, setCommandExecuted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const themes = {
    default: {
      container: "bg-gray-900 text-green-400",
      header: "bg-gray-950 border-green-400/20",
      output: "bg-black",
      button: "hover:bg-gray-800",
    },
    dark: {
      container: "bg-black text-blue-400",
      header: "bg-gray-950 border-blue-400/20",
      output: "bg-gray-950",
      button: "hover:bg-gray-800",
    },
    matrix: {
      container: "bg-black text-green-500",
      header: "bg-green-950/30 border-green-500/30",
      output: "bg-black",
      button: "hover:bg-green-900/30",
    },
    retro: {
      container: "bg-amber-950 text-amber-400",
      header: "bg-amber-900/50 border-amber-400/20",
      output: "bg-black",
      button: "hover:bg-amber-800/30",
    },
  };

  const theme =
    variant === "custom" && customTheme
      ? customTheme
      : themes[variant as keyof typeof themes] || themes.default;

  const resetTerminal = useCallback(() => {
    setOutput([]);
    setStep(0);
    setCharIndex(0);
    setTyping(false);
    setCommandExecuted(false);
    setCompleted(false);
  }, []);

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
    if (autoExecute && !typing && !commandExecuted) {
      const timer = setTimeout(() => {
        setTyping(true);
        setCharIndex(0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoExecute, typing, commandExecuted]);

  useEffect(() => {
    if (autoExecute && repeat && completed) {
      const repeatTimer = setTimeout(() => {
        resetTerminal();
      }, repeatDelay);
      return () => clearTimeout(repeatTimer);
    }
  }, [autoExecute, repeat, completed, resetTerminal, repeatDelay]);

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
    if (step > 0 && step <= steps.length) {
      setOutput((prev) => [...prev, steps[step - 1]]);
      const timer = setTimeout(() => setStep(step + 1), stepDelay);
      return () => clearTimeout(timer);
    } else if (step > steps.length) {
      setOutput((prev) => [...prev, finalMessage]);
      setCompleted(true);
    }
  }, [step, steps, finalMessage, stepDelay]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand();
      setCommandExecuted(true);
    }
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "max-w-4xl mx-auto p-3 md:p-6 rounded-lg shadow-lg font-mono",
        theme.container,
        className,
      )}
    >
      <div
        className={cn(
          "mb-4 p-3 rounded-md border flex items-center justify-between",
          theme.header,
        )}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="flex items-center gap-1.5">
            <span className="text-sm opacity-80">Run:</span>
            <code className="font-bold px-2 py-0.5 bg-black/30 rounded">
              {command}
            </code>
          </span>
        </div>
        <div className="flex gap-2">
          {autoExecute ? (
            completed &&
            !repeat && (
              <button
                onClick={resetTerminal}
                className={cn(
                  "px-2 py-1 rounded text-sm flex items-center gap-1 transition-colors",
                  theme.button,
                )}
                title="Replay"
                type="button"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Replay</span>
              </button>
            )
          ) : step === 0 ? (
            <button
              onClick={copyCommand}
              className={cn(
                "px-2 py-1 rounded text-sm flex items-center gap-1 transition-colors",
                theme.button,
              )}
              title="Copy command"
              type="button"
            >
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {copied ? "Copied!" : "Copy"}
              </span>
            </button>
          ) : (
            <button
              onClick={resetTerminal}
              className={cn(
                "px-2 py-1 rounded text-sm flex items-center gap-1 transition-colors",
                theme.button,
              )}
              title="Reset terminal"
              type="button"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      <div
        ref={outputRef}
        className={cn(
          "h-80 mb-4 p-3 rounded-md overflow-y-auto scrollbar-none",
          theme.output,
        )}
      >
        {output.map((line, index) => (
          <pre key={index} className="whitespace-pre-wrap mb-1 terminal-line">
            {line}
          </pre>
        ))}
        {typing && (
          <pre className="whitespace-pre-wrap cursor-typing">
            {promptSymbol} {input}
          </pre>
        )}
        {autoExecute && repeat && completed && (
          <pre className="text-gray-500 italic mt-2">
            Repeating in {Math.ceil(repeatDelay / 1000)}s...
          </pre>
        )}
      </div>

      {!autoExecute && step === 0 && !commandExecuted && (
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="mr-2 font-bold">{promptSymbol}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow bg-transparent focus:outline-none cursor-typing"
            placeholder={inputPlaceholder}
            autoFocus
          />
          <button
            type="submit"
            className={cn(
              "ml-2 p-1.5 rounded-full transition-colors",
              theme.button,
            )}
            title="Send command"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}

      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        .cursor-typing::after {
          content: "|";
          margin-left: 2px;
          animation: blink 1s infinite;
        }
        .terminal-line {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default InteractiveTerminal;
