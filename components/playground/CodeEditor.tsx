"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { getHighlighter, type BundledLanguage } from "shiki";
import { getNyxuiTheme } from "@/lib/shiki-themes";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  maxHeight?: number;
}

const CodeEditor = ({
  value,
  onChange,
  language = "tsx",
  placeholder,
  className = "",
  style,
  maxHeight = 300,
}: CodeEditorProps) => {
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-resize the textarea to fit its content, capped at maxHeight.
  // The container height follows the textarea (the only in-flow child),
  // and the absolutely-positioned <pre> fills the container so the
  // highlighted background stays in sync. Past maxHeight the textarea
  // scrolls and handleScroll keeps the <pre> aligned.
  const resizeTextarea = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const next = Math.min(ta.scrollHeight, maxHeight);
    ta.style.height = `${next}px`;
  };

  useLayoutEffect(() => {
    resizeTextarea();
  }, [value, maxHeight]);

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const theme = await getNyxuiTheme();
        const highlighter = await getHighlighter({
          themes: [theme],
          langs: [language as BundledLanguage],
        });

        const codeToHighlight = value || "";
        const highlighted = highlighter.codeToHtml(codeToHighlight, {
          lang: language as BundledLanguage,
          theme: "nyxui-dark",
        });

        setHighlightedCode(highlighted);
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        // Fallback highlighting
        const codeToHighlight = value || "";
        const escaped = codeToHighlight
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

        setHighlightedCode(
          `<pre style="background: transparent; color: rgb(201, 209, 217); padding: 0; margin: 0; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Menlo', monospace; font-size: 14px; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word;"><code>${escaped}</code></pre>`,
        );
        setIsLoaded(true);
      }
    };

    highlightCode();
  }, [value, language]);

  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl border border-border/70 bg-white dark:bg-[#0F0F0F] ${className}`}
      style={style}
    >
      {/* Syntax highlighted background */}
      {isLoaded && (
        <pre
          ref={preRef}
          className="absolute inset-0 pointer-events-none overflow-auto py-3"
          style={{
            zIndex: 1,
            fontFamily: '"Geist Mono", monospace',
            fontSize: "13px",
            lineHeight: "1.5",
            whiteSpace: "pre",
            scrollbarWidth: "none",
          }}
          dangerouslySetInnerHTML={{
            __html: highlightedCode
              .replace(
                /<pre([^>]*)style="[^"]*"/g,
                '<pre$1style="background: transparent !important;"',
              )
              .replace(/<code[^>]*>|<\/code>/g, ""),
          }}
        />
      )}

      {/* Textarea overlay */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleTextareaChange}
        onScroll={handleScroll}
        placeholder={placeholder}
        className={`
          relative w-full resize-none outline-none border-0 focus:ring-0 focus:outline-none
          ${value ? "text-transparent caret-foreground" : "text-zinc-400 dark:text-neutral-500"}
          selection:bg-[#FF4F11]/25
        `}
        style={{
          zIndex: 2,
          background: "transparent",
          padding: "16px",
          maxHeight: `${maxHeight}px`,
          fontFamily: '"Geist Mono", monospace',
          fontSize: "13px",
          lineHeight: "1.5",
          whiteSpace: "pre",
          overflow: "auto",
          caretColor: "hsl(var(--foreground))",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />

      {/* Custom styles for better selection visibility and theme-aware Shiki tokens */}
      <style jsx>{`
        textarea::selection {
          background-color: rgba(255, 79, 17, 0.25) !important;
        }
        textarea::-moz-selection {
          background-color: rgba(255, 79, 17, 0.25) !important;
        }
        :global(.shiki) {
          background-color: transparent !important;
        }
      `}</style>
    </div>
  );
};

export default CodeEditor;
