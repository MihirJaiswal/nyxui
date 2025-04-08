"use client"
import { useState } from 'react';
import { AnimatedCodeBlock } from "@/nyxui/components/AnimatedCodeBlock";

type CodeTheme = "dark" | "light" | "terminal" | "cyberpunk" | "minimal" | "nyx";

interface CodeExample {
  title: string;
  language: string;
  theme: CodeTheme;
  code: string;
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
}`
    }
  ];

  const [currentTheme, setCurrentTheme] = useState<CodeTheme>("dark");
  const currentExample = examples[0];
  
  const themes: CodeTheme[] = ["dark", "light", "terminal", "cyberpunk", "minimal", "nyx"];

  // Theme colors mapping for button styling
  const themeColors: Record<CodeTheme, {bg: string, hover: string, text: string, border: string}> = {
    dark: {bg: "bg-gray-800", hover: "hover:bg-gray-700", text: "text-white", border: "border-gray-600"},
    light: {bg: "bg-white", hover: "hover:bg-gray-50", text: "text-gray-800", border: "border-gray-300"},
    terminal: {bg: "bg-green-900", hover: "hover:bg-green-800", text: "text-green-300", border: "border-green-700"},
    cyberpunk: {bg: "bg-purple-900", hover: "hover:bg-purple-800", text: "text-pink-300", border: "border-purple-700"},
    minimal: {bg: "bg-gray-100", hover: "hover:bg-gray-200", text: "text-gray-700", border: "border-gray-300"},
    nyx: {bg: "bg-black", hover: "hover:bg-gray-700", text: "text-white", border: "border-gray-600"}
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4">
      <div className="flex flex-wrap justify-center gap-4 p-4 rounded-xl shadow-inner">
  {themes.map((theme) => (
    <button
      key={theme}
      onClick={() => setCurrentTheme(theme)}
      className={`
        flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-transform duration-200 
        border focus:outline-none focus:ring-2 focus:ring-offset-2
        ${currentTheme === theme 
          ? `${themeColors[theme].bg} ${themeColors[theme].text} border-2 border-${themeColors[theme].border} scale-105 shadow-lg focus:ring-${themeColors[theme].border}` 
          : `bg-gray-50 text-gray-700 border border-gray-200 hover:${themeColors[theme].hover} focus:ring-${themeColors[theme].border}` }
      `}
    >
      <div className={`w-3 h-3 rounded-full ${themeColors[theme].bg} border border-${themeColors[theme].border}`}></div>
      <span>{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
    </button>
  ))}
</div>      
      <AnimatedCodeBlock
        code={currentExample.code}
        language={currentExample.language}
        theme={currentTheme}
        typingSpeed={50}
        showLineNumbers={true}
        autoPlay={true}
        highlightLines={[1, 4, 10]}
      />
    </div>
  );
}