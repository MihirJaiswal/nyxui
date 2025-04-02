"use client"
import { AnimatedCodeBlock } from "@/nyxui/components/AnimatedCodeBlock";

type CodeTheme = "dark" | "light" | "terminal" | "cyberpunk" | "minimal";

interface CodeExample {
  title: string;
  language: string;
  theme: CodeTheme;
  code: string;
}

export function AnimatedCodeBlockDemo() {
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
  const currentExample = examples[0];

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
          Animated Code Example
        </h2>
      </div>

      <AnimatedCodeBlock
        code={currentExample.code}
        language={currentExample.language}
        theme={currentExample.theme}
        typingSpeed={50}
        showLineNumbers={true}
        autoPlay={true}
      />
    </div>
  );
}
