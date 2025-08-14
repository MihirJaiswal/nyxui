"use client"

import { useState, useEffect, useRef } from "react"
import { getHighlighter, type BundledLanguage } from "shiki"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  placeholder?: string
  className?: string
  style?: React.CSSProperties
}

const CodeEditor = ({ 
  value, 
  onChange, 
  language = "tsx", 
  placeholder, 
  className = "",
  style
}: CodeEditorProps) => {
  const [highlightedCode, setHighlightedCode] = useState<string>("")
  const [isLoaded, setIsLoaded] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const highlighter = await getHighlighter({
          themes: ["github-dark"],
          langs: [language as BundledLanguage],
        })

        const codeToHighlight = value || ""
        const highlighted = highlighter.codeToHtml(codeToHighlight, {
          lang: language as BundledLanguage,
          theme: "github-dark",
        })

        setHighlightedCode(highlighted)
        setIsLoaded(true)
      } catch (error) {
        console.error("Failed to highlight code:", error)
        // Fallback highlighting
        const codeToHighlight = value || ""
        const escaped = codeToHighlight
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')

        setHighlightedCode(
          `<pre style="background: rgb(13, 17, 23); color: rgb(201, 209, 217); padding: 0; margin: 0; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Menlo', monospace; font-size: 14px; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word;"><code>${escaped}</code></pre>`
        )
        setIsLoaded(true)
      }
    }

    highlightCode()
  }, [value, language])

  const handleScroll = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop
      preRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <div 
      ref={containerRef}
      className={`relative rounded-md overflow-hidden border border-border bg-gray-900 dark:bg-zinc-950 ${className}`}
      style={style}
    >
      {/* Syntax highlighted background */}
      {isLoaded && (
        <pre
          ref={preRef}
          className="absolute inset-0 pointer-events-none overflow-auto whitespace-pre-wrap break-words"
          style={{ 
            zIndex: 1,
            padding: "16px",
            fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Menlo', monospace",
            fontSize: "14px",
            lineHeight: "1.5",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
            scrollbarWidth: 'none',
          }}
          dangerouslySetInnerHTML={{ __html: highlightedCode.replace(/<pre[^>]*>|<\/pre>/g, '').replace(/<code[^>]*>|<\/code>/g, '') }}
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
          relative w-full h-full resize-none outline-none border-0 focus:ring-0 focus:outline-none
          ${value ? 'text-transparent caret-white' : 'text-gray-400'}
          selection:bg-blue-500/25
        `}
        style={{
          zIndex: 2,
          background: "transparent",
          padding: "16px",
          minHeight: "inherit",
          fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Menlo', monospace",
          fontSize: "14px",
          lineHeight: "1.5",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
          caretColor: "#c9d1d9",
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />

      {/* Custom styles for better selection visibility */}
      <style jsx>{`
        textarea::selection {
          background-color: rgba(56, 139, 253, 0.3) !important;
        }
        textarea::-moz-selection {
          background-color: rgba(56, 139, 253, 0.3) !important;
        }
      `}</style>
    </div>
  )
}

export default CodeEditor