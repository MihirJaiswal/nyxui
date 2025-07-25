"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Play,
  Pause,
  Copy,
  Check,
  RotateCcw,
  Maximize2,
  Minimize2,
  Download,
} from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-json";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";

const getScrollbarStyles = (theme: string) => {
  const scrollbarColors = {
    dark: "rgba(255, 255, 255, 0.2)",
    minimal: "rgba(202, 138, 4, 0.3)",
    terminal: "rgba(0, 255, 128, 0.2)",
    cyberpunk: "rgba(236, 72, 153, 0.3)",
  };

  const color =
    scrollbarColors[theme as keyof typeof scrollbarColors] ||
    scrollbarColors.dark;
  const hoverColor = color.replace(
    /[\d.]+\)$/,
    (match) => String(Math.min(Number.parseFloat(match) + 0.2, 1)) + ")"
  );

  return `
    .code-scrollbar::-webkit-scrollbar {
      height: 8px;
      width: 8px;
    }
    .code-scrollbar::-webkit-scrollbar-track {
      background: transparent;
      margin: 0 4px;
    }
    .code-scrollbar::-webkit-scrollbar-thumb {
      background: ${color};
      border-radius: 4px;
      transition: background 0.2s ease;
    }
    .code-scrollbar::-webkit-scrollbar-thumb:hover {
      background: ${hoverColor};
    }
    .code-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: ${color} transparent;
    }
  `;
};

// Custom Prism theme styles for different themes
const getPrismThemeStyles = (theme: string) => {
  const baseStyles = `
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #6a737d;
      font-style: italic;
    }
    .token.punctuation {
      color: #f8f8f2;
    }
    .token.property,
    .token.tag,
    .token.constant,
    .token.symbol,
    .token.deleted {
      color: #f92672;
    }
    .token.boolean,
    .token.number {
      color: #ae81ff;
    }
    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
      color: #a6e22e;
    }
    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string,
    .token.variable {
      color: #f8f8f2;
    }
    .token.atrule,
    .token.attr-value,
    .token.function,
    .token.class-name {
      color: #e6db74;
    }
    .token.keyword {
      color: #66d9ef;
    }
    .token.regex,
    .token.important {
      color: #fd971f;
    }
  `;

  switch (theme) {
    case "nightowl":
  return `
    ${baseStyles}
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #637777; 
      font-style: italic;
    }
    .token.punctuation {
      color: #c792ea;
    }
    .token.property,
    .token.tag,
    .token.constant,
    .token.symbol,
    .token.deleted {
      color: #f78c6c;
    }
    .token.boolean,
    .token.number {
      color: #ff5874;
    }
    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
      color: #addb67; 
    }
    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string {
      color: #c792ea;
    }
    .token.keyword {
      color: #7fdbca; 
    }
    .token.atrule,
    .token.attr-value,
    .token.function,
    .token.class-name {
      color: #82aaff;
    }
    .token.regex,
    .token.important,
    .token.variable {
      color: #d6deeb; 
    }
    .token.bold {
      font-weight: bold;
    }
    .token.italic {
      font-style: italic;
    }
  `;

    case "terminal":
      return `
        ${baseStyles}
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: #10b981;
          opacity: 0.7;
        }
        .token.property,
        .token.tag,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: #34d399;
        }
        .token.boolean,
        .token.number {
          color: #6ee7b7;
        }
        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: #a7f3d0;
        }
        .token.keyword {
          color: #10b981;
          font-weight: bold;
        }
        .token.atrule,
        .token.attr-value,
        .token.function,
        .token.class-name {
          color: #34d399;
        }
      `;
    case "cyberpunk":
      return `
        ${baseStyles}
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: #a855f7;
          opacity: 0.8;
        }
        .token.property,
        .token.tag,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: #ec4899;
        }
        .token.boolean,
        .token.number {
          color: #f472b6;
        }
        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: #e879f9;
        }
        .token.keyword {
          color: #c084fc;
          font-weight: bold;
        }
        .token.atrule,
        .token.attr-value,
        .token.function,
        .token.class-name {
          color: #d946ef;
        }
      `;
    default:
      return baseStyles;
  }
};

export interface AnimatedCodeBlockProps {
  code: string;
  language?: string;
  theme?: "dark" | "terminal" | "cyberpunk" | "nightowl";
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

type ThemeStyles = {
  background: string;
  text: string;
  lineNumbers: string;
  highlight: string;
  border: string;
  header: string;
  accent: string;
  accentText: string;
  shadow: string;
  scrollbarThumb: string;
};

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
  blurEffect = false,
  showControls = true,
  onCopy,
}: AnimatedCodeBlockProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [copied, setCopied] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTooltip, setShowTooltip] = useState("");
  const [extraLines, setExtraLines] = useState(0);
  const [highlightedCode, setHighlightedCode] = useState("");
  const codeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    try {
      const highlighted = Prism.highlight(
        code,
        Prism.languages[language] || Prism.languages.javascript,
        language
      );
      setHighlightedCode(highlighted);
    } catch (error) {
      console.warn("Failed to highlight code:", error);
      setHighlightedCode(code);
    }
  }, [code, language]);

  const getThemeStyles = (): ThemeStyles => {
    switch (theme) {
      case "dark":
        return {
          background: "bg-zinc-900",
          text: "text-zinc-100",
          lineNumbers: "text-zinc-500",
          highlight: "bg-zinc-800",
          border: "border-zinc-800",
          header: "bg-zinc-800",
          accent: "bg-indigo-600",
          accentText: "text-indigo-400",
          shadow: "shadow-lg shadow-black/20",
          scrollbarThumb: "rgba(255, 255, 255, 0.2)",
        };
      case "nightowl":
        return {
          background: "bg-[#011627]",
          text: "text-[#d6deeb]",
          lineNumbers: "text-[#5f7e97]",
          highlight: "bg-[#1d3b53]",
          border: "border-[#1e2d3d]",
          header: "bg-[#0b2942]",
          accent: "bg-[#82aaff]",
          accentText: "text-[#82aaff]",
          shadow: "shadow-md shadow-[#82aaff]/20",
          scrollbarThumb: "rgba(130, 170, 255, 0.3)",
        };
      case "terminal":
        return {
          background: "bg-[#0d1117]", 
          text: "text-[#00ff88]", 
          lineNumbers: "text-[#009966]",
          highlight: "bg-[#003b2f]/60", 
          border: "border-[#1f2a30]",
          header: "bg-[#161b22]", 
          accent: "bg-[#00c46f]",
          accentText: "text-[#00ff88]",
          shadow: "shadow-md shadow-[#00ff88]/20",
          scrollbarThumb: "rgba(0, 255, 136, 0.3)", 
        };

      case "cyberpunk":
        return {
          background:
            "bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]",
          text: "text-[#e0e0f0]",
          lineNumbers: "text-[#8f7ada]",
          highlight: "bg-[#3e2d67]/60",
          border: "border-[#5a4b8d]",
          header: "bg-gradient-to-r from-[#2e1a47] to-[#443266]",
          accent: "bg-[#ff00a0]",
          accentText: "text-[#ff00a0]",
          shadow: "shadow-lg shadow-[#ff00a0]/20",
          scrollbarThumb: "rgba(255, 0, 160, 0.3)",
        };

      default:
        return {
          background: "bg-zinc-900",
          text: "text-zinc-100",
          lineNumbers: "text-zinc-500",
          highlight: "bg-zinc-800",
          border: "border-zinc-800",
          header: "bg-zinc-800",
          accent: "bg-indigo-600",
          accentText: "text-indigo-400",
          shadow: "shadow-lg shadow-black/20",
          scrollbarThumb: "rgba(255, 255, 255, 0.2)",
        };
    }
  };

  const themeStyles = getThemeStyles();
  useEffect(() => {
    if (isFullscreen) {
      const updateExtraLines = () => {
        if (codeContainerRef.current && lineNumbersRef.current) {
          const containerHeight = codeContainerRef.current.clientHeight;
          const lineHeight = 24;
          const codeLines = code.split("\n").length;
          const visibleLines = Math.floor(containerHeight / lineHeight);
          const extraLinesNeeded = Math.max(0, visibleLines - codeLines);
          setExtraLines(extraLinesNeeded);
        }
      };
      updateExtraLines();
      window.addEventListener("resize", updateExtraLines);
      return () => {
        window.removeEventListener("resize", updateExtraLines);
      };
    } else {
      setExtraLines(0);
    }
  }, [isFullscreen, code]);

  useEffect(() => {
    if (isPlaying && currentPosition < code.length) {
      timerRef.current = setTimeout(() => {
        setCurrentPosition(currentPosition + 1);
      }, typingSpeed);
    } else if (isPlaying && currentPosition >= code.length) {
      if (loop) {
        setTimeout(() => {
          setCurrentPosition(0);
        }, 1000);
      } else {
        setIsPlaying(false);
        setCompleted(true);
        setIsPaused(false);
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentPosition, code, typingSpeed, loop]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPaused(true);
    } else if (completed) {
      restartAnimation();
    } else {
      setIsPaused(false);
    }
    setIsPlaying(!isPlaying);
  };

  const restartAnimation = () => {
    setCurrentPosition(0);
    setIsPlaying(true);
    setCompleted(false);
    setIsPaused(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onCopy) onCopy();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `code.${language}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const codeLines = code.split("\n");

  const renderLines = () => {
    let remainingChars = currentPosition;
    const result = [];
    for (let i = 0; i < codeLines.length; i++) {
      const line = codeLines[i];
      const lineLength = line.length + 1;
      if (remainingChars <= 0) {
        result.push("");
      } else if (remainingChars >= lineLength) {
        result.push(line);
        remainingChars -= lineLength;
      } else {
        result.push(line.substring(0, remainingChars));
        remainingChars = 0;
      }
    }
    return result;
  };

  const displayedLines = completed ? code.split("\n") : renderLines();

  const getCursorLineIndex = () => {
    if (!isPlaying && !isPaused) return -1;
    let charsProcessed = 0;
    for (let i = 0; i < codeLines.length; i++) {
      const lineLength = codeLines[i].length + 1;
      charsProcessed += lineLength;
      if (currentPosition < charsProcessed) {
        return i;
      }
    }
    return codeLines.length - 1;
  };

  const cursorLineIndex = getCursorLineIndex();
  const progressPercentage = Math.min(
    100,
    (currentPosition / code.length) * 100
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "animated-code-block rounded-lg overflow-hidden flex flex-col",
        themeStyles.background,
        themeStyles.text,
        themeStyles.border,
        themeStyles.shadow,
        "border transition-all duration-300",
        isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen" : "",
        className
      )}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: getScrollbarStyles(theme) + getPrismThemeStyles(theme),
        }}
      />

      <div
        className={cn(
          "flex items-center justify-between p-3 border-b border-opacity-20",
          themeStyles.header
        )}
      >
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="flex space-x-1.5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <h3 className="text-sm font-medium truncate">{title}</h3>
        </div>
        {showControls && (
          <div className="flex items-center justify-end gap-2 flex-shrink-0">
            {completed ? (
              <button
                onClick={restartAnimation}
                onMouseEnter={() => setShowTooltip("restart")}
                onMouseLeave={() => setShowTooltip("")}
                className={cn(
                  "p-1.5 rounded-full hover:bg-white/10 transition-colors relative"
                )}
                aria-label="Repeat animation"
              >
                <RotateCcw size={14} />
                {showTooltip === "restart" && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap">
                    Restart
                  </div>
                )}
              </button>
            ) : (
              <button
                onClick={togglePlay}
                onMouseEnter={() => setShowTooltip("play")}
                onMouseLeave={() => setShowTooltip("")}
                className={cn(
                  "p-1.5 rounded-full hover:bg-white/10 transition-colors relative",
                  isPlaying ? themeStyles.accent : ""
                )}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                {showTooltip === "play" && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap">
                    {isPlaying ? "Pause" : "Play"}
                  </div>
                )}
              </button>
            )}
            <button
              onClick={copyCode}
              onMouseEnter={() => setShowTooltip("copy")}
              onMouseLeave={() => setShowTooltip("")}
              className={cn(
                "p-1.5 rounded-full hover:bg-white/10 transition-colors relative",
                copied ? themeStyles.accent : ""
              )}
              aria-label="Copy code"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {showTooltip === "copy" && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap">
                  {copied ? "Copied!" : "Copy"}
                </div>
              )}
            </button>
            <button
              onClick={downloadCode}
              onMouseEnter={() => setShowTooltip("download")}
              onMouseLeave={() => setShowTooltip("")}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors relative"
              aria-label="Download code"
            >
              <Download size={14} />
              {showTooltip === "download" && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap">
                  Download
                </div>
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              onMouseEnter={() => setShowTooltip("fullscreen")}
              onMouseLeave={() => setShowTooltip("")}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors relative"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              {showTooltip === "fullscreen" && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap">
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </div>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden flex-grow flex flex-col">
        {blurEffect && (
          <div
            className={cn(
              "absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay",
              theme === "terminal"
                ? "bg-emerald-400"
                : theme === "cyberpunk"
                  ? "bg-fuchsia-400"
                  : "bg-blue-400"
            )}
          />
        )}
        <div className="h-0.5 w-full bg-black/20 dark:bg-white/10 flex-shrink-0">
          <motion.div
            className={cn("h-full", themeStyles.accent)}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div
          className="relative flex-grow overflow-hidden"
          ref={codeContainerRef}
        >
          <div
            className="absolute top-0 right-0 bottom-0 w-12 pointer-events-none z-10 opacity-50"
            style={{
              background:
                theme === "nightowl"
                  ? "linear-gradient(to left, rgba(11, 41, 66, 0.5) 10%, transparent 100%)"
                  : theme === "terminal"
                    ? "linear-gradient(to left, rgba(2, 6, 23, 0.8) 10%, transparent 100%)"
                    : theme === "cyberpunk"
                      ? "linear-gradient(to left, rgba(76, 29, 149, 0.8) 10%, transparent 100%)"
                      : "linear-gradient(to left, rgba(24, 24, 27, 0.8) 10%, transparent 100%)",
            }}
          />
          <div
            className="absolute top-0 left-0 bottom-0 w-12 pointer-events-none z-10 opacity-50"
            style={{
              background:
                theme === "nightowl"
                  ? "linear-gradient(to right, rgba(11, 41, 66, 0.8) 10%, transparent 100%)"
                  : theme === "terminal"
                    ? "linear-gradient(to right, rgba(2, 6, 23, 0.8) 10%, transparent 100%)"
                    : theme === "cyberpunk"
                      ? "linear-gradient(to right, rgba(76, 29, 149, 0.8) 10%, transparent 100%)"
                      : "linear-gradient(to right, rgba(24, 24, 27, 0.8) 10%, transparent 100%)",
            }}
          />
          <div className="overflow-auto code-scrollbar h-full">
            <div className="flex min-w-full h-full">
              {showLineNumbers && (
                <div
                  ref={lineNumbersRef}
                  className={cn(
                    "text-xs py-4 px-3 text-right select-none border-r border-opacity-20 sticky -left-1 h-full flex flex-col z-10",
                    themeStyles.lineNumbers,
                    themeStyles.border,
                    themeStyles.background
                  )}
                >
                  <div className="flex flex-col">
                    {codeLines.map((_, i) => (
                      <div
                        key={i}
                        className="h-6 flex items-center justify-end"
                      >
                        {i + 1}
                      </div>
                    ))}
                    {Array.from({ length: extraLines }).map((_, i) => (
                      <div
                        key={`extra-${i}`}
                        className="h-6 flex items-center justify-end"
                      >
                        {codeLines.length + i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="relative py-4 flex-grow h-full z-1" ref={codeRef}>
                {highlightLines.map((lineNum) => (
                  <div
                    key={`highlight-${lineNum}`}
                    className={cn(
                      "absolute left-0 right-0 h-6",
                      themeStyles.highlight
                    )}
                    style={{ top: `${(lineNum - 1) * 24 + 16}px` }}
                  />
                ))}
                <div className="relative z-10 px-4 font-mono text-sm h-full">
                  {completed ? (
                    <div
                      className="whitespace-pre"
                      dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                  ) : (
                    <>
                      {codeLines.map((line, i) => (
                        <div key={i} className="h-6 whitespace-pre">
                          {displayedLines[i] && (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: Prism.highlight(
                                  displayedLines[i],
                                  Prism.languages[language] ||
                                    Prism.languages.javascript,
                                  language
                                ),
                              }}
                            />
                          )}
                          {i === cursorLineIndex && (
                            <motion.span
                              className={cn(
                                "inline-block w-2 h-5 -mb-0.5",
                                themeStyles.accentText
                              )}
                              animate={{ opacity: [1, 0] }}
                              transition={{
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 0.8,
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </>
                  )}
                  {Array.from({ length: extraLines }).map((_, i) => (
                    <div key={`extra-${i}`} className="h-6 whitespace-pre">
                      &nbsp;
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "px-4 py-2 text-xs border-t border-opacity-20 flex justify-between items-center",
          themeStyles.header,
          themeStyles.border
        )}
      >
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              isPlaying ? "bg-green-500" : "bg-gray-500"
            )}
          ></div>
          <span>
            {isPlaying ? "Typing..." : completed ? "Completed" : "Paused"}
          </span>
        </div>
        <div>{Math.round(progressPercentage)}% complete</div>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-4 right-4 z-50"
          >
            <button
              onClick={toggleFullscreen}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              aria-label="Exit fullscreen"
            >
              <Minimize2 size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
