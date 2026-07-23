"use client";

import { useState } from "react";

import {
  AnimatedCodeBlock,
  type AnimatedCodeBlockTheme,
} from "../ui/animated-code-block";

const exampleCode = `import { motion } from "motion/react";

interface FeatureCardProps {
  title: string;
  description: string;
}

export function FeatureCard({
  title,
  description,
}: FeatureCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border p-6"
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.article>
  );
}`;

const themes: Array<{
  value: AnimatedCodeBlockTheme;
  label: string;
}> = [
  { value: "dark", label: "Midnight" },
  { value: "nightowl", label: "Night Owl" },
  { value: "terminal", label: "Terminal" },
  { value: "minimal", label: "Minimalist" },
];

export function AnimatedCodeBlockDemo(): React.JSX.Element {
  const [theme, setTheme] = useState<AnimatedCodeBlockTheme>("dark");

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex flex-wrap gap-1 rounded-xl border border-border bg-muted/40 p-1">
          {themes.map((item) => {
            const isActive = item.value === theme;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setTheme(item.value)}
                className={
                  isActive
                    ? "flex items-center gap-1.5 rounded-lg bg-background px-3 py-2 text-xs font-medium text-foreground shadow-sm"
                    : "flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                }
                aria-pressed={isActive}
              >
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatedCodeBlock
        key={theme}
        code={exampleCode}
        theme={theme}
        title="feature-card.tsx"
        typingSpeed={10}
        showLineNumbers
        autoPlay
        language="tsx"
        highlightLines={[12, 13, 14]}
      />
    </div>
  );
}

export function AnimatedCodeBlockMinimalDemo(): React.JSX.Element {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <AnimatedCodeBlock
        code={`const greeting = "Hello, Nyx UI";\nconsole.log(greeting);`}
        language="typescript"
        title="hello.ts"
        showLineNumbers={false}
        showControls={false}
      />
    </div>
  );
}

export function AnimatedCodeBlockThemesDemo(): React.JSX.Element {
  return (
    <div className="grid w-full gap-4 lg:grid-cols-2">
      {themes.map((item) => (
        <AnimatedCodeBlock
          key={item.value}
          code={`function welcome(name: string) {\n  return \`Welcome, \${name}!\`;\n}`}
          language="typescript"
          title={`${item.label.toLowerCase().replace(" ", "-")}.ts`}
          theme={item.value}
          showControls={false}
          highlightLines={[2]}
          className="min-h-64"
        />
      ))}
    </div>
  );
}
