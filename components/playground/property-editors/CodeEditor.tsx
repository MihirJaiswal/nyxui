"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import type { BundledLanguage } from "shiki";
import { getNyxuiHighlighter } from "@/lib/highlighter";
import { cn } from "@/lib/utils";

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

  useLayoutEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const next = Math.min(ta.scrollHeight, maxHeight);
    ta.style.height = `${next}px`;
  }, [value, maxHeight]);

  // Deliberately not debounced: the textarea is text-transparent, so this
  // highlighted <pre> is the text the user sees as they type.
  useEffect(() => {
    let cancelled = false;

    const highlightCode = async () => {
      try {
        const highlighter = await getNyxuiHighlighter([language]);
        if (cancelled) return;

        const codeToHighlight = value || "";
        const highlighted = highlighter.codeToHtml(codeToHighlight, {
          lang: language as BundledLanguage,
          themes: { dark: "nyxui-dark", light: "nyxui-light" },
        });

        setHighlightedCode(highlighted);
        setIsLoaded(true);
      } catch (error) {
        if (cancelled) return;
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
          `<pre style="background: transparent; color: inherit; padding: 0; margin: 0; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Menlo', monospace; font-size: 14px; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word;"><code>${escaped}</code></pre>`,
        );
        setIsLoaded(true);
      }
    };

    highlightCode();

    // Keystrokes outrun highlighting; without this an older result can land
    // after a newer one and show stale text.
    return () => {
      cancelled = true;
    };
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
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/70 bg-background dark:bg-background/30",
        className,
      )}
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
        aria-label={placeholder || "Code editor"}
        value={value}
        onChange={handleTextareaChange}
        onScroll={handleScroll}
        placeholder={placeholder}
        className={cn(
          "relative w-full resize-none outline-none border-0 focus:ring-0 focus:outline-none selection:bg-brand/25",
          value ? "text-transparent caret-foreground" : "text-muted-foreground",
        )}
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
          caretColor: "var(--foreground)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
};

export default CodeEditor;
