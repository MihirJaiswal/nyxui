"use client";
import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  Copy,
  Check,
  RotateCcw,
  TerminalIcon,
  ChevronRight,
  Circle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
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
  title?: string;
  variant?: "default" | "sky" | "synthwave" | "retro";
};

type ThemeTokens = {
  glow: string;
  surface: string;
  promptText: string;
  accentText: string;
  accentBg: string;
  ring: string;
};

const THEMES: Record<string, ThemeTokens> = {
  default: {
    glow: "shadow-[0_0_30px_-15px_rgba(16,185,129,0.15)] dark:shadow-[0_0_20px_-10px_rgba(16,185,129,0.15)]",
    surface:
      "from-emerald-50/70 to-stone-100 text-emerald-700 dark:from-[#0a0f0d] dark:to-[#050807] dark:text-emerald-300",
    promptText: "text-emerald-600 dark:text-emerald-300",
    accentText: "text-emerald-500",
    accentBg: "bg-emerald-500",
    ring: "ring-emerald-600/30 dark:ring-emerald-300/25",
  },
  sky: {
    glow: "shadow-[0_0_30px_-15px_rgba(56,189,248,0.15)] dark:shadow-[0_0_20px_-10px_rgba(56,189,248,0.15)]",
    surface:
      "from-sky-50/70 to-stone-100 text-sky-700 dark:from-[#080b12] dark:to-[#04060a] dark:text-sky-300",
    promptText: "text-sky-600 dark:text-sky-300",
    accentText: "text-sky-500",
    accentBg: "bg-sky-500",
    ring: "ring-sky-600/30 dark:ring-sky-300/25",
  },
  synthwave: {
    glow: "shadow-[0_0_30px_-15px_rgba(217,70,239,0.15)] dark:shadow-[0_0_20px_-10px_rgba(217,70,239,0.15)]",
    surface:
      "from-fuchsia-50/70 to-stone-100 text-fuchsia-700 dark:from-[#0d020f] dark:to-[#050106] dark:text-fuchsia-400",
    promptText: "text-fuchsia-600 dark:text-fuchsia-300",
    accentText: "text-fuchsia-500",
    accentBg: "bg-fuchsia-500",
    ring: "ring-fuchsia-600/30 dark:ring-fuchsia-300/25",
  },
  retro: {
    glow: "shadow-[0_0_30px_-15px_rgba(245,158,11,0.15)] dark:shadow-[0_0_20px_-12px_rgba(245,158,11,0.15)]",
    surface:
      "from-amber-50/70 to-stone-100 text-amber-700 dark:from-[#140d02] dark:to-[#0a0600] dark:text-amber-300",
    promptText: "text-amber-600 dark:text-amber-300",
    accentText: "text-amber-500",
    accentBg: "bg-amber-500",
    ring: "ring-amber-600/40 dark:ring-amber-300/25",
  },
};

const InteractiveTerminal: React.FC<TerminalProps> = ({
  command = "help",
  steps = ["Processing command..."],
  finalMessage = "Command executed successfully!",
  stepDelay = 1000,
  typingDelay = 100,
  icon = <TerminalIcon className="h-4 w-4" />,
  promptSymbol = "$",
  inputPlaceholder = "Type a command…",
  autoExecute = false,
  repeat = false,
  repeatDelay = 3000,
  className,
  title = "zsh — 80×24",
  variant = "default",
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

  const t = THEMES[variant] || THEMES.default;

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
  }, [output, typing]);

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
    } else if (step > steps.length && !completed) {
      setOutput((prev) => [...prev, finalMessage]);
      setCompleted(true);
    }
  }, [step, steps, finalMessage, stepDelay, completed]);

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

  const busy = typing || (step > 0 && !completed);
  const status = completed
    ? { label: "done", color: "bg-emerald-500 dark:bg-emerald-400" }
    : busy
      ? { label: "running", color: "bg-amber-500 dark:bg-amber-400" }
      : { label: "idle", color: "bg-zinc-400 dark:bg-zinc-500" };

  const lineKind = (line: string, index: number) => {
    if (line.startsWith(promptSymbol)) return "command" as const;
    if (completed && index === output.length - 1 && line === finalMessage)
      return "success" as const;
    return "step" as const;
  };

  const showInput = !autoExecute && step === 0 && !commandExecuted;

  const buttonClasses =
    "flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-black/60 transition-colors hover:bg-black/10 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white";

  return (
    <div
      className={cn(
        "group relative w-full max-w-2xl mx-auto font-mono rounded-(--terminal-radius)",
        "[--terminal-radius:1rem]",
        t.glow,
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-(--terminal-radius) bg-gradient-to-b",
          "ring-1 ring-inset",
          t.ring,
          t.surface,
        )}
      >
        {/* scanline + vignette texture (currentColor adapts to mode + variant) */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, color-mix(in srgb, currentColor 6%, transparent) 0px, transparent 1px, transparent 3px)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_top,transparent_40%,rgba(0,0,0,0.08))] dark:bg-[radial-gradient(ellipse_at_top,transparent_40%,rgba(0,0,0,0.5))]" />

        {/* title bar — 3-col grid keeps center dead-center regardless of side widths */}
        <div className="relative z-30 grid grid-cols-[auto_1fr_auto] items-center bg-black/[0.04] px-4 py-3 dark:bg-black/30">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57] ring-1 ring-black/20 transition-transform group-hover:scale-110" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e] ring-1 ring-black/20 transition-transform group-hover:scale-110" />
            <span className="h-3 w-3 rounded-full bg-[#28c840] ring-1 ring-black/20 transition-transform group-hover:scale-110" />
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-black/50 dark:text-white/50">
            {icon}
            <span className="tracking-wide">{title}</span>
          </div>
          <div className="flex w-[84px] items-center justify-center gap-1.5 rounded-full border border-black/10 bg-black/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-wider text-black/60 dark:border-white/10 dark:bg-black/30 dark:text-white/60">
            <span className="relative flex h-1.5 w-1.5">
              {busy && (
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
                    status.color,
                  )}
                />
              )}
              <span
                className={cn(
                  "relative inline-flex h-1.5 w-1.5 rounded-full",
                  status.color,
                )}
              />
            </span>
            {status.label}
          </div>
        </div>

        {/* command chip row */}
        <div className="relative z-30 flex items-center justify-between gap-3 border-b border-black/5 px-4 py-2.5 dark:border-white/5">
          <div className="flex min-w-0 items-center gap-2 text-xs">
            <span className="text-black/40 dark:text-white/40">run</span>
            <code
              className={cn(
                "truncate rounded-md border border-black/10 bg-black/5 px-2 py-1 font-semibold dark:border-white/10 dark:bg-white/5",
                t.promptText,
              )}
            >
              {promptSymbol} {command}
            </code>
          </div>
          <div className="flex flex-shrink-0 gap-1">
            {autoExecute ? (
              completed &&
              !repeat && (
                <button
                  onClick={resetTerminal}
                  className={buttonClasses}
                  type="button"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Replay</span>
                </button>
              )
            ) : step === 0 && !commandExecuted ? (
              <button
                onClick={copyCommand}
                className={buttonClasses}
                type="button"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">
                  {copied ? "Copied!" : "Copy"}
                </span>
              </button>
            ) : (
              <button
                onClick={resetTerminal}
                className={buttonClasses}
                type="button"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* output — scrollbar hidden, still scrollable */}
        <div
          ref={outputRef}
          className="relative z-10 h-80 space-y-1.5 overflow-y-auto px-4 py-4 text-sm leading-relaxed [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {output.length === 0 && !typing && (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-black/25 dark:text-white/25">
              <TerminalIcon className="h-4 w-4" />
              <span className="text-xs">
                {autoExecute ? "Booting…" : "Run a command to begin"}
              </span>
            </div>
          )}

          <AnimatePresence initial={false}>
            {output.map((line, index) => {
              const kind = lineKind(line, index);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22 }}
                  className="flex items-start gap-2"
                >
                  <span className="mt-0.5 flex-shrink-0">
                    {kind === "command" ? (
                      <ChevronRight className={cn("h-4 w-4", t.accentText)} />
                    ) : kind === "success" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                    ) : (
                      <Circle className="h-2 w-2 translate-y-1 text-black/30 dark:text-white/30" />
                    )}
                  </span>
                  <pre
                    className={cn(
                      "whitespace-pre-wrap break-words",
                      kind === "command" &&
                        "font-semibold text-zinc-900 dark:text-white",
                      kind === "step" && "text-zinc-500 dark:text-white/60",
                      kind === "success" &&
                        "font-medium text-emerald-600 dark:text-emerald-300",
                    )}
                  >
                    {kind === "command"
                      ? line.replace(new RegExp(`^\\${promptSymbol}\\s?`), "")
                      : line}
                  </pre>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* live-running spinner for current step */}
          {busy && !typing && (
            <div className="flex items-center gap-2 text-xs text-black/40 dark:text-white/40">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              working…
            </div>
          )}

          {typing && (
            <div className="flex items-start gap-2">
              <ChevronRight
                className={cn("mt-0.5 h-4 w-4 flex-shrink-0", t.accentText)}
              />
              <pre className="whitespace-pre-wrap font-semibold text-zinc-900 dark:text-white">
                {input}
                <span
                  className={cn(
                    "ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse",
                    t.accentBg,
                  )}
                />
              </pre>
            </div>
          )}
        </div>

        <AnimatePresence initial={false}>
          {showInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="relative z-30 overflow-hidden"
            >
              <form
                onSubmit={handleSubmit}
                className="m-3 mt-0 flex items-center gap-2 rounded-xl border border-black/10 bg-black/[0.03] px-3 py-2.5 transition-colors focus-within:border-black/25 dark:border-white/10 dark:bg-black/40 dark:focus-within:border-white/25"
              >
                <span className={cn("font-bold", t.promptText)}>
                  {promptSymbol}
                </span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow bg-transparent text-zinc-900 placeholder:text-black/30 focus:outline-none dark:text-white dark:placeholder:text-white/25"
                  placeholder={inputPlaceholder}
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg text-black transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30",
                    t.accentBg,
                  )}
                  title="Run"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveTerminal;
