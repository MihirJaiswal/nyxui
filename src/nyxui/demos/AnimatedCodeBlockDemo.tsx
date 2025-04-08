"use client"

import { useState } from "react"
import { AnimatedCodeBlock } from "@/nyxui/components/AnimatedCodeBlock"
import { ChevronRight, Code, Sparkles } from "lucide-react"

type CodeTheme = "dark" | "light" | "terminal" | "cyberpunk" | "minimal" | "nyx"

interface CodeExample {
  title: string
  language: string
  theme: CodeTheme
  code: string
}

export const AnimatedCodeBlockDemo = () => {
  const examples: CodeExample[] = [
    {
      title: "React Hook Example",
      language: "javascript",
      theme: "dark",
      code: `import { useState, useEffect } from 'react';
      
function useDataFetching(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData);
  }, [url]);
  return data;
}`,
    },
  ]

  const [currentTheme, setCurrentTheme] = useState<CodeTheme>("dark")
  const currentExample = examples[0]

  const themes: CodeTheme[] = ["dark", "light", "terminal", "cyberpunk", "minimal", "nyx"]

  const themeColors: Record<CodeTheme, { bg: string; hover: string; text: string; border: string; icon: string }> = {
    dark: {
      bg: "bg-gray-800",
      hover: "hover:bg-gray-700",
      text: "text-white",
      border: "border-gray-600",
      icon: "text-blue-400",
    },
    light: {
      bg: "bg-white",
      hover: "hover:bg-gray-50",
      text: "text-gray-800",
      border: "border-gray-300",
      icon: "text-blue-500",
    },
    terminal: {
      bg: "bg-green-900",
      hover: "hover:bg-green-800",
      text: "text-green-300",
      border: "border-green-700",
      icon: "text-green-400",
    },
    cyberpunk: {
      bg: "bg-purple-900",
      hover: "hover:bg-purple-800",
      text: "text-pink-300",
      border: "border-purple-700",
      icon: "text-pink-400",
    },
    minimal: {
      bg: "bg-gray-100",
      hover: "hover:bg-gray-200",
      text: "text-gray-700",
      border: "border-gray-300",
      icon: "text-gray-500",
    },
    nyx: {
      bg: "bg-black",
      hover: "hover:bg-gray-900",
      text: "text-white",
      border: "border-purple-500",
      icon: "text-purple-400",
    },
  }

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-600 text-white">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Animated Code Block</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Select a theme to customize the code display</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-1.5">
            <ChevronRight className="w-4 h-4 text-blue-500" />
            <span>Select Theme</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {themes.map((theme) => (
              <button
                key={theme}
                onClick={() => setCurrentTheme(theme)}
                className={`
                  relative group flex flex-col items-center justify-center gap-2 p-3 rounded-lg
                  transition-all duration-300 ease-in-out
                  ${
                    currentTheme === theme
                      ? `${themeColors[theme].bg} ${themeColors[theme].text} ring-2 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-800 ring-purple-500 shadow-lg`
                      : `bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md`
                  }
                `}
              >
                <div
                  className={`
                  w-6 h-6 rounded-full flex items-center justify-center
                  ${
                    currentTheme === theme
                      ? themeColors[theme].bg
                      : `bg-gradient-to-br ${themeColors[theme].bg} opacity-80`
                  }
                  border ${themeColors[theme].border}
                  ${currentTheme === theme ? "scale-110" : "group-hover:scale-110"}
                  transition-transform duration-200
                `}
                >
                  {currentTheme === theme && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>}
                </div>
                <span className="text-xs font-medium">{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <AnimatedCodeBlock
            code={currentExample.code}
            language={currentExample.language}
            theme={currentTheme}
            typingSpeed={50}
            showLineNumbers={true}
            autoPlay={true}
            highlightLines={[1, 4, 10]}
            loop={true}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${themeColors[currentTheme].bg} animate-pulse`}></div>
            <span>
              Active theme: <span className="font-semibold">{currentTheme}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
