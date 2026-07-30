"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Check,
  Code2,
  Copy,
  Download,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-python";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";

import { cn } from "@/lib/utils";

export type AnimatedCodeBlockTheme =
  | "dark"
  | "terminal"
  | "minimal"
  | "nightowl";

export interface AnimatedCodeBlockProps {
  code: string;
  language?: string;
  theme?: AnimatedCodeBlockTheme;
  typingSpeed?: number;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  title?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  blurEffect?: boolean;
  showControls?: boolean;
  onCopy?: () => void;
}

interface ThemeStyles {
  shell: string;
  header: string;
  surface: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  accentText: string;
  accentSoft: string;
  highlight: string;
  syntax: string;
}

const themes: Record<AnimatedCodeBlockTheme, ThemeStyles> = {
  dark: {
    shell: "bg-slate-950 shadow-2xl shadow-black/40",
    header: "bg-slate-900/90",
    surface: "bg-slate-950",
    border: "border-white/10",
    text: "text-slate-100",
    muted: "text-slate-500",
    accent: "bg-violet-500",
    accentText: "text-violet-300",
    accentSoft: "bg-violet-400/10 text-violet-200",
    highlight: "border-violet-400 bg-violet-400/10",
    syntax:
      "[&_.token.comment]:text-slate-500 [&_.token.comment]:italic [&_.token.punctuation]:text-slate-400 [&_.token.keyword]:text-violet-300 [&_.token.operator]:text-sky-300 [&_.token.string]:text-emerald-300 [&_.token.number]:text-amber-300 [&_.token.boolean]:text-amber-300 [&_.token.function]:text-blue-300 [&_.token.class-name]:text-cyan-300 [&_.token.tag]:text-rose-300 [&_.token.attr-name]:text-amber-200 [&_.token.property]:text-sky-300",
  },
  nightowl: {
    shell: "bg-slate-950 shadow-2xl shadow-black/40",
    header: "bg-slate-900/95",
    surface: "bg-slate-950",
    border: "border-sky-300/15",
    text: "text-sky-50",
    muted: "text-sky-200/40",
    accent: "bg-sky-400",
    accentText: "text-sky-300",
    accentSoft: "bg-sky-400/10 text-sky-200",
    highlight: "border-sky-400 bg-sky-400/10",
    syntax:
      "[&_.token.comment]:text-slate-500 [&_.token.comment]:italic [&_.token.punctuation]:text-violet-300 [&_.token.keyword]:text-cyan-300 [&_.token.operator]:text-violet-300 [&_.token.string]:text-lime-300 [&_.token.number]:text-rose-300 [&_.token.boolean]:text-rose-300 [&_.token.function]:text-blue-300 [&_.token.class-name]:text-blue-300 [&_.token.tag]:text-orange-300 [&_.token.attr-name]:text-lime-300 [&_.token.property]:text-orange-300",
  },
  terminal: {
    shell: "bg-zinc-950 shadow-2xl shadow-black/40",
    header: "bg-zinc-900/95",
    surface: "bg-zinc-950",
    border: "border-emerald-400/15",
    text: "text-emerald-100",
    muted: "text-emerald-300/40",
    accent: "bg-emerald-400",
    accentText: "text-emerald-300",
    accentSoft: "bg-emerald-400/10 text-emerald-200",
    highlight: "border-emerald-400 bg-emerald-400/10",
    syntax:
      "[&_.token.comment]:text-emerald-700 [&_.token.comment]:italic [&_.token.punctuation]:text-emerald-200/60 [&_.token.keyword]:text-emerald-300 [&_.token.operator]:text-teal-300 [&_.token.string]:text-lime-300 [&_.token.number]:text-yellow-300 [&_.token.boolean]:text-yellow-300 [&_.token.function]:text-teal-200 [&_.token.class-name]:text-emerald-200 [&_.token.tag]:text-lime-300 [&_.token.attr-name]:text-teal-300 [&_.token.property]:text-emerald-300",
  },
  minimal: {
    shell: "bg-white shadow-sm shadow-black/5",
    header: "bg-white",
    surface: "bg-zinc-50",
    border: "border-zinc-200",
    text: "text-zinc-900",
    muted: "text-zinc-400",
    accent: "bg-zinc-900",
    accentText: "text-zinc-700",
    accentSoft: "bg-zinc-100 text-zinc-600",
    highlight: "border-zinc-900 bg-zinc-100",
    syntax:
      "[&_.token.comment]:text-zinc-400 [&_.token.comment]:italic [&_.token.punctuation]:text-zinc-500 [&_.token.keyword]:text-blue-700 [&_.token.operator]:text-zinc-500 [&_.token.string]:text-emerald-700 [&_.token.number]:text-amber-700 [&_.token.boolean]:text-amber-700 [&_.token.function]:text-violet-700 [&_.token.class-name]:text-zinc-900 [&_.token.tag]:text-rose-700 [&_.token.attr-name]:text-amber-700 [&_.token.property]:text-blue-700",
  },
};

const languageLabels: Record<string, string> = {
  bash: "Shell",
  css: "CSS",
  javascript: "JavaScript",
  json: "JSON",
  jsx: "JSX",
  markdown: "Markdown",
  python: "Python",
  scss: "SCSS",
  sql: "SQL",
  tsx: "TSX",
  typescript: "TypeScript",
  yaml: "YAML",
};

function getLanguage(language: string): Prism.Grammar {
  return Prism.languages[language] ?? Prism.languages.javascript;
}

export function AnimatedCodeBlock({
  code,
  language = "javascript",
  theme = "dark",
  typingSpeed = 50,
  showLineNumbers = true,
  highlightLines = [],
  title = "Code Example",
  className,
  autoPlay = false,
  loop = false,
  showControls = true,
  onCopy,
}: AnimatedCodeBlockProps): React.JSX.Element {
  const shouldReduceMotion = useReducedMotion();
  const startsCompleted = !autoPlay || Boolean(shouldReduceMotion);
  const [currentPosition, setCurrentPosition] = useState(
    startsCompleted ? code.length : 0,
  );
  const [isPlaying, setIsPlaying] = useState(autoPlay && !shouldReduceMotion);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fillerLineCount, setFillerLineCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const codeViewportRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const copyTimerRef = useRef<number | null>(null);
  const themeStyles = themes[theme];
  const isMinimalTheme = theme === "minimal";
  const codeLines = useMemo(() => code.split("\n"), [code]);
  const completed = currentPosition >= code.length;

  useEffect(() => {
    const showCompletedCode = !autoPlay || Boolean(shouldReduceMotion);
    setCurrentPosition(showCompletedCode ? code.length : 0);
    setIsPlaying(autoPlay && !shouldReduceMotion);
  }, [autoPlay, code, shouldReduceMotion]);

  useEffect(() => {
    if (!isPlaying) return;

    if (currentPosition < code.length) {
      timerRef.current = window.setTimeout(
        () => {
          setCurrentPosition((position) => Math.min(position + 1, code.length));
        },
        Math.max(typingSpeed, 1),
      );
    } else if (loop) {
      timerRef.current = window.setTimeout(() => {
        setCurrentPosition(0);
      }, 1200);
    } else {
      setIsPlaying(false);
    }

    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [code.length, currentPosition, isPlaying, loop, typingSpeed]);

  useEffect(() => {
    const handleFullscreenChange = (): void => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    const codeViewport = codeViewportRef.current;
    if (!codeViewport || !showLineNumbers) {
      setFillerLineCount(0);
      return;
    }

    const updateFillerLines = (): void => {
      const computedStyles = window.getComputedStyle(codeViewport);
      const verticalPadding =
        Number.parseFloat(computedStyles.paddingTop) +
        Number.parseFloat(computedStyles.paddingBottom);
      const lineHeight = Number.parseFloat(computedStyles.lineHeight) || 24;
      const visibleLineCount = Math.floor(
        Math.max(0, codeViewport.clientHeight - verticalPadding) / lineHeight,
      );
      setFillerLineCount(Math.max(0, visibleLineCount - codeLines.length));
    };

    const resizeObserver = new ResizeObserver(updateFillerLines);
    resizeObserver.observe(codeViewport);
    updateFillerLines();

    return () => resizeObserver.disconnect();
  }, [codeLines.length, showLineNumbers]);

  const displayedLines = useMemo(() => {
    let remainingCharacters = currentPosition;

    return codeLines.map((line) => {
      if (remainingCharacters <= 0) return "";

      const lineLength = line.length + 1;
      if (remainingCharacters >= lineLength) {
        remainingCharacters -= lineLength;
        return line;
      }

      const visibleLine = line.slice(0, remainingCharacters);
      remainingCharacters = 0;
      return visibleLine;
    });
  }, [codeLines, currentPosition]);

  const highlightedLines = useMemo(
    () =>
      displayedLines.map((line) =>
        Prism.highlight(line, getLanguage(language), language),
      ),
    [displayedLines, language],
  );

  const cursorLineIndex = useMemo(() => {
    if (!isPlaying || completed) return -1;

    let characterCount = 0;
    for (let index = 0; index < codeLines.length; index += 1) {
      characterCount += codeLines[index].length + 1;
      if (currentPosition < characterCount) return index;
    }

    return codeLines.length - 1;
  }, [codeLines, completed, currentPosition, isPlaying]);

  const highlightedLineSet = useMemo(
    () => new Set(highlightLines),
    [highlightLines],
  );
  const writtenLines = useMemo(() => {
    let consumedCharacters = 0;

    return codeLines.map((line) => {
      const lineEndPosition = consumedCharacters + line.length;
      const isWritten =
        completed ||
        (line.length === 0
          ? currentPosition > lineEndPosition
          : currentPosition >= lineEndPosition);
      consumedCharacters = lineEndPosition + 1;
      return isWritten;
    });
  }, [codeLines, completed, currentPosition]);
  const progress =
    code.length === 0 ? 100 : (currentPosition / code.length) * 100;
  const languageLabel = languageLabels[language] ?? language.toUpperCase();

  const restartAnimation = useCallback((): void => {
    if (shouldReduceMotion) {
      setCurrentPosition(code.length);
      setIsPlaying(false);
      return;
    }

    setCurrentPosition(0);
    setIsPlaying(true);
  }, [code.length, shouldReduceMotion]);

  const togglePlay = useCallback((): void => {
    if (completed) {
      restartAnimation();
      return;
    }

    setIsPlaying((playing) => !playing);
  }, [completed, restartAnimation]);

  const copyCode = useCallback(async (): Promise<void> => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    onCopy?.();

    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => setCopied(false), 1800);
  }, [code, onCopy]);

  const toggleFullscreen = useCallback(async (): Promise<void> => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await containerRef.current?.requestFullscreen();
  }, []);

  const downloadCode = useCallback((): void => {
    const file = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = title || `code.${language}`;
    link.click();
    URL.revokeObjectURL(url);
  }, [code, language, title]);
  const controlButtonClassName = cn(
    "rounded-md p-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2",
    isMinimalTheme
      ? "hover:bg-zinc-100 focus-visible:ring-zinc-300"
      : "hover:bg-white/10 focus-visible:ring-white/40",
  );

  return (
    <motion.div
      ref={containerRef}
      layout={!shouldReduceMotion}
      className={cn(
        "group/code relative flex w-full flex-col overflow-hidden border font-mono",
        isMinimalTheme ? "rounded-lg" : "rounded-xl",
        themeStyles.shell,
        themeStyles.border,
        themeStyles.text,
        isFullscreen && "h-screen rounded-none",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-between gap-3 border-b",
          isMinimalTheme ? "min-h-12 px-4" : "min-h-14 px-3",
          themeStyles.header,
          themeStyles.border,
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          {!isMinimalTheme && (
            <>
              <div
                className="hidden items-center gap-1.25 pr-1 sm:flex"
                aria-hidden="true"
              >
                <span className="h-2 w-2 rounded-full bg-rose-400/80" />
                <span className="h-2 w-2 rounded-full bg-amber-300/80" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
              </div>
              <div
                className={cn(
                  "hidden h-5 w-px sm:block",
                  themeStyles.accentSoft,
                )}
              />
            </>
          )}
          <Code2 className={cn("h-4 w-4 shrink-0", themeStyles.accentText)} />
          <span className="truncate text-xs font-medium tracking-wide sm:text-sm">
            {title}
          </span>
          <span
            className={cn(
              "hidden rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-widest md:inline-flex",
              themeStyles.accentSoft,
            )}
          >
            {languageLabel}
          </span>
        </div>

        {showControls && (
          <div
            className={cn(
              "flex shrink-0 items-center rounded-lg border p-1",
              themeStyles.border,
              themeStyles.surface,
            )}
          >
            <button
              type="button"
              onClick={completed ? restartAnimation : togglePlay}
              className={controlButtonClassName}
              aria-label={
                completed
                  ? "Replay animation"
                  : isPlaying
                    ? "Pause animation"
                    : "Play animation"
              }
              title={completed ? "Replay" : isPlaying ? "Pause" : "Play"}
            >
              {completed ? (
                <RotateCcw className="h-3.5 w-3.5" />
              ) : isPlaying ? (
                <Pause className="h-3.5 w-3.5" />
              ) : (
                <Play className="h-3.5 w-3.5" />
              )}
            </button>
            <button
              type="button"
              onClick={() => void copyCode()}
              className={controlButtonClassName}
              aria-label={copied ? "Code copied" : "Copy code"}
              title={copied ? "Copied" : "Copy"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "copied" : "copy"}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, scale: 0.75 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    shouldReduceMotion ? undefined : { opacity: 0, scale: 0.75 }
                  }
                  className="block"
                >
                  {copied ? (
                    <Check
                      className={cn("h-3.5 w-3.5", themeStyles.accentText)}
                    />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
            <button
              type="button"
              onClick={downloadCode}
              className={cn("hidden sm:block", controlButtonClassName)}
              aria-label="Download code"
              title="Download"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => void toggleFullscreen()}
              className={cn("hidden sm:block", controlButtonClassName)}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        )}
      </div>

      <div
        ref={codeViewportRef}
        className={cn(
          "code-scrollbar relative min-h-80 flex-1 overflow-auto py-3 text-xs leading-6 sm:text-sm",
          themeStyles.surface,
          themeStyles.syntax,
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-px",
            isMinimalTheme ? "bg-black/5" : "bg-white/5",
          )}
        />
        <div className="min-w-max">
          {codeLines.map((_, index) => {
            const lineNumber = index + 1;
            const isHighlighted =
              highlightedLineSet.has(lineNumber) && writtenLines[index];

            return (
              <div
                key={lineNumber}
                className={cn(
                  "flex min-h-6 border-l-2 border-transparent pr-6 transition-colors duration-300 motion-reduce:transition-none",
                  isHighlighted && themeStyles.highlight,
                )}
              >
                {showLineNumbers && (
                  <span
                    className={cn(
                      "sticky left-0 z-10 w-14 shrink-0 select-none border-r pr-4 text-right tabular-nums",
                      themeStyles.surface,
                      themeStyles.border,
                      isHighlighted
                        ? themeStyles.accentText
                        : themeStyles.muted,
                    )}
                    aria-hidden="true"
                  >
                    {lineNumber}
                  </span>
                )}
                <code
                  className={cn(
                    "block whitespace-pre pl-4",
                    !showLineNumbers && "pl-6",
                  )}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightedLines[index],
                    }}
                  />
                  {index === cursorLineIndex && (
                    <motion.span
                      className={cn(
                        "ml-0.5 inline-block h-4 w-0.5 align-middle",
                        themeStyles.accent,
                      )}
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : { opacity: [1, 0.2, 1] }
                      }
                      transition={{
                        duration: 0.9,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </code>
              </div>
            );
          })}
          {Array.from({ length: fillerLineCount }, (_, index) => {
            const lineNumber = codeLines.length + index + 1;

            return (
              <div
                key={`filler-${lineNumber}`}
                className="flex min-h-6 border-l-2 border-transparent pr-6"
                aria-hidden="true"
              >
                <span
                  className={cn(
                    "sticky left-0 z-10 w-14 shrink-0 select-none border-r pr-4 text-right tabular-nums",
                    themeStyles.surface,
                    themeStyles.border,
                    themeStyles.muted,
                  )}
                >
                  {lineNumber}
                </span>
                <code className="block whitespace-pre pl-4">&nbsp;</code>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={cn(
          "relative flex items-center justify-between gap-4 text-xs uppercase tracking-widest",
          isMinimalTheme ? "min-h-1 border-t-0 px-0" : "min-h-10 border-t px-4",
          themeStyles.header,
          themeStyles.border,
          themeStyles.muted,
        )}
      >
        <div className="flex items-center gap-2"></div>
        <motion.div
          className={cn(
            "absolute inset-x-0 top-0 h-px origin-left",
            themeStyles.accent,
          )}
          initial={false}
          animate={{ scaleX: Math.min(progress / 100, 1) }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.12 }}
        />
      </div>
    </motion.div>
  );
}
