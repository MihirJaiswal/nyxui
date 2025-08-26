"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Play,
  Pause,
  Copy,
  Check,
  RotateCcw,
  Download,
} from "lucide-react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
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

const getScrollbarStyles = () => {
  const color = "rgba(255, 255, 255, 0.2)";
  const hoverColor = "rgba(255, 255, 255, 0.4)";

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

// Dark theme Prism styles
const getPrismStyles = () => {
  return `
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
};

export interface AnimatedCodeBlockProps {
  code: string;
  language?: string;
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

export function AnimatedCodeBlock({
  code,
  language = "javascript",
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
  const [showTooltip, setShowTooltip] = useState("");
  const [highlightedCode, setHighlightedCode] = useState("");
  const codeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const extraLines = 0;

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
        "animated-code-block rounded-sm overflow-hidden flex flex-col",
        "bg-zinc-950/75 text-zinc-100 border-zinc-800 shadow-lg shadow-black/20",
        "border transition-all duration-300",
        className
      )}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: getScrollbarStyles() + getPrismStyles(),
        }}
      />

      <div className="flex items-center justify-between p-3 border-b border-opacity-20 bg-zinc-900">
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
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors relative"
                aria-label="Repeat animation"
              >
                <RotateCcw size={14} />
                {showTooltip === "restart" && (
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 py-1 bg-black text-white text-xs rounded whitespace-nowrap">
                    Restart
                  </div>
                )}
              </button>
            ) : (
              <button
                onClick={togglePlay}
                onMouseEnter={() => setShowTooltip("play")}
                onMouseLeave={() => setShowTooltip("")}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors relative"
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
                copied ? "bg-indigo-600" : ""
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
          </div>
        )}
      </div>

      <div className="relative overflow-hidden flex-grow flex flex-col">
        {blurEffect && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay bg-blue-400" />
        )}
        <div className="h-0.5 w-full bg-black/20 dark:bg-white/10 flex-shrink-0">
          <motion.div
            className="h-full bg-indigo-600"
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
                "linear-gradient(to left, rgba(24, 24, 27, 0.8) 10%, transparent 100%)",
            }}
          />
          <div
            className="absolute top-0 left-0 bottom-0 w-12 pointer-events-none z-10 opacity-50"
            style={{
              background:
                "linear-gradient(to right, rgba(24, 24, 27, 0.8) 10%, transparent 100%)",
            }}
          />
          <div className="overflow-auto code-scrollbar h-full">
            <div className="flex min-w-full h-full">
              {showLineNumbers && (
                <div
                  ref={lineNumbersRef}
                  className="text-xs py-4 px-3 text-right select-none border-r border-opacity-20 sticky -left-1 h-full flex flex-col z-10 text-zinc-500 border-zinc-800 bg-zinc-950/75"
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
                    className="absolute left-0 right-0 h-6 bg-zinc-700/70"
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
                              className="inline-block w-2 h-5 -mb-0.5 text-indigo-400"
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
    </div>
  );
}



export const AnimatedCodeBlockDemo = () => {
  const examples = [
    {
      code: `const greet = (name: string) => {
  return \`Welcome, \${name}! 👋\`;
};

const user = "Developer";
const message = greet(user);

console.log(message);`,
    },
  ];

  return (
    <div className="w-ful max-w-4xl mx-auto rounded-md overflow-hidden relative h-[400px] w-[350px] scale-80">
      <AnimatedCodeBlock
        code={examples[0].code}
        title="welcome.ts"
        typingSpeed={50}
        showLineNumbers={true}
        autoPlay={true}
        language="typescript"
        loop={false}
      />
    </div>
  );
};
