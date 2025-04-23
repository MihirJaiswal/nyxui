"use client";

import type React from "react";
import { useState, useEffect, type CSSProperties } from "react";
import {
  Copy,
  FileCode,
  FileWarning,
  Check,
  Maximize,
  Minimize,
  Terminal,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";

const lightTheme = {
  ...nightOwl,
  'pre[class*="language-"]': {
    ...nightOwl['pre[class*="language-"]'],
    background: "#1C2433",
    fontSize: "14px",
    lineHeight: "1.6",
    borderRadius: "0.5rem",
  },
  'code[class*="language-"]': {
    ...nightOwl['code[class*="language-"]'],
    background: "#1C2433",
    fontSize: "14px",
    lineHeight: "1.6",
  },
};

const darkTheme = {
  ...nightOwl,
  'pre[class*="language-"]': {
    ...nightOwl['pre[class*="language-"]'],
    background: "#18181B",
    fontSize: "14px",
    lineHeight: "1.6",
    borderRadius: "0.5rem",
  },
  'code[class*="language-"]': {
    ...nightOwl['code[class*="language-"]'],
    background: "#18181B",
    fontSize: "14px",
    lineHeight: "1.6",
  },
};

const InstallationStep = ({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center rounded-full bg-primary/10 w-10 h-10 text-sm font-bold text-primary shrink-0">
          {number}
        </div>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="ml-5 pl-5 border-l-2 border-primary/10">{children}</div>
    </div>
  );
};

const ExpandableCode = ({
  language,
  code,
  codeStyle,
  showLineNumbers = true,
  fileName,
}: {
  language: string;
  code: string;
  codeStyle: Record<string, CSSProperties>;
  showLineNumbers?: boolean;
  fileName?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden border shadow-sm">
      {fileName && (
        <div className="border-b px-4 py-2 bg-muted/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="size-4 text-primary/70" />
            <span className="text-xs font-medium">{fileName}</span>
          </div>
        </div>
      )}

      <div 
        className={cn(
          "overflow-auto",
          isExpanded ? "max-h-[700px]" : "max-h-80 overflow-hidden"
        )}
      >
        <SyntaxHighlighter
          language={language}
          style={codeStyle}
          className="rounded-t-none"
          customStyle={{
            margin: 0,
            padding: "16px",
            fontSize: "13px",
            borderRadius: "0",
          }}
          showLineNumbers={showLineNumbers}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      <div className="absolute right-3 top-3 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-7 w-7 bg-background/80 backdrop-blur-sm border shadow-sm transition-all duration-200",
            isCopied && "bg-green-500/10 border-green-500/30 text-green-600"
          )}
          onClick={handleCopy}
        >
          {isCopied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
          <span className="sr-only">Copy code</span>
        </Button>
      </div>

      <div className="absolute right-3 bottom-3">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 bg-background/80 backdrop-blur-sm shadow-sm z-10"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <Minimize className="size-3.5" />
              Collapse
            </>
          ) : (
            <>
              <Maximize className="size-3.5" />
              Expand
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export const InstallationSection = ({
  componentData,
}: {
  componentData: ComponentData;
}) => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const hasInstallDependencies = componentData.dependencies && 
    componentData.dependencies.length > 0 && 
    componentData.dependencies.some(dep => dep.install);
  
  const hasSetupInstructions = componentData.dependencies && 
    componentData.dependencies.some(dep => dep.setup);
  
  let currentStep = 1;

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          setIsDarkMode(isDark);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const handleCopyClick = (text: string, index: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const codeStyle = isDarkMode ? darkTheme : lightTheme;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 ">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            Installation Guide
          </h2>
        </div>
      </div>

      <div className="backdrop-blur-sm">
        <Tabs defaultValue="manual" className="w-full">
          <div className="border-b backdrop-blur-sm sticky top-0 z-10 flex items-center justify-items-start">
            <TabsList className="h-14 px-6 bg-transparent">
              <TabsTrigger
                value="cli"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg h-9 px-4 gap-1.5"
              >
                <Terminal className="size-4" />
                CLI
              </TabsTrigger>
              <TabsTrigger
                value="manual"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg h-9 px-4 gap-1.5"
              >
                <Code2 className="size-4" />
                Manual
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="cli" className="py-8 space-y-6">
            <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-200 dark:border-amber-900/30 rounded-lg">
              <div className="p-2 rounded-full bg-amber-500/20">
                <FileWarning className="size-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                  CLI installation coming soon
                </p>
                <p className="text-xs text-amber-700/70 dark:text-amber-400/70 mt-0.5">
                  Our CLI tool is currently in development. Please use the
                  manual installation for now.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="py-8 space-y-12">
            <div className="space-y-12">
              {hasInstallDependencies && (
                <InstallationStep number={currentStep++} title="Install Dependencies">
                  <div className="space-y-8">
                    {componentData.dependencies
                      .filter(dependency => dependency.install)
                      .map((dependency, index) => (
                        <div
                          key={dependency.name || `dependency-${index}`}
                          className={cn(
                            "space-y-4",
                            index > 0 && "pt-6 border-t"
                          )}
                        >
                          {dependency.name && (
                            <h4 className="font-medium text-sm">
                              {dependency.name}
                            </h4>
                          )}

                          {dependency.install && (
                            <Tabs defaultValue="npm" className="w-full mt-3">
                              <TabsList className="w-full max-w-md grid grid-cols-4 h-9 bg-muted/40 p-1 rounded-lg dark:bg-black/20">
                                {["npm", "pnpm", "yarn", "bun"].map((pkg) => (
                                  <TabsTrigger
                                    key={pkg}
                                    value={pkg}
                                    className="text-xs h-7 px-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm"
                                  >
                                    <Image
                                      src={`/logo/${pkg}.svg`}
                                      width={16}
                                      height={16}
                                      alt={pkg}
                                      quality={100}
                                      loading="lazy"
                                      className="size-4 mr-1.5"
                                    />
                                    {pkg}
                                  </TabsTrigger>
                                ))}
                              </TabsList>

                              {dependency.install &&
                                Object.entries(dependency.install).map(
                                  ([packageManager, command]) => (
                                    <TabsContent
                                      key={packageManager}
                                      value={packageManager}
                                      className="mt-3"
                                    >
                                      <div className="relative">
                                        <div className="rounded-lg border overflow-hidden shadow-sm">
                                          <SyntaxHighlighter
                                            language="bash"
                                            style={codeStyle}
                                            customStyle={{
                                              margin: 0,
                                              padding: "16px",
                                              fontSize: "13px",
                                            }}
                                          >
                                            {command}
                                          </SyntaxHighlighter>
                                        </div>
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          className={cn(
                                            "absolute right-3 top-3 opacity-80 hover:opacity-100 h-7 w-7 bg-background/80 backdrop-blur-sm border shadow-sm transition-all duration-200",
                                            copiedIndex ===
                                              `${dependency.name || index}-${packageManager}` &&
                                              "bg-green-500/10 border-green-500/30 text-green-600"
                                          )}
                                          onClick={() =>
                                            handleCopyClick(
                                              command,
                                              `${dependency.name || index}-${packageManager}`
                                            )
                                          }
                                        >
                                          {copiedIndex ===
                                          `${dependency.name || index}-${packageManager}` ? (
                                            <Check className="size-3.5" />
                                          ) : (
                                            <Copy className="size-3.5" />
                                          )}
                                          <span className="sr-only">
                                            Copy command
                                          </span>
                                        </Button>
                                      </div>
                                    </TabsContent>
                                  )
                                )}
                            </Tabs>
                          )}
                        </div>
                      ))}
                  </div>
                </InstallationStep>
              )}

              {hasSetupInstructions && (
                <InstallationStep number={currentStep++} title="Setup Configuration">
                  <div className="space-y-8">
                    {componentData.dependencies
                      .filter((dependency) => dependency.setup)
                      .map((dependency, index) => (
                        <div
                          key={`setup-${dependency.name || index}`}
                          className={cn(
                            "space-y-4",
                            index > 0 && "pt-6 border-t"
                          )}
                        >
                          {dependency.setup?.file && dependency.setup?.code && (
                            <div className="space-y-3 mt-3">
                              <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg border text-xs text-muted-foreground">
                                <FileCode className="size-3.5 text-primary" />
                                Create file:{" "}
                                <code className="px-1.5 py-0.5 bg-muted rounded font-mono">
                                  {dependency.setup.file}
                                </code>
                              </div>
                              {dependency.setup.description && (
                                <p className="text-sm text-muted-foreground">
                                  {dependency.setup.description}
                                </p>
                              )}
                              <ExpandableCode
                                language="typescript"
                                code={dependency.setup.code}
                                codeStyle={codeStyle}
                                fileName={dependency.setup.file}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </InstallationStep>
              )}

              <InstallationStep
                number={currentStep++}
                title="Copy Component Code"
              >
                <ExpandableCode
                  language="typescript"
                  code={
                    componentData?.componentCode ||
                    "// Component code will appear here"
                  }
                  codeStyle={codeStyle}
                  fileName={`${componentData?.name || "Component"}.tsx`}
                />

                <div className="flex justify-end mt-4">
                  <Button
                    className={cn(
                      "gap-1.5 transition-all duration-200",
                      copiedIndex === "component-code" &&
                        "bg-green-500/10 border-green-500/30 text-green-600"
                    )}
                    onClick={() =>
                      componentData?.componentCode &&
                      handleCopyClick(
                        componentData.componentCode,
                        "component-code"
                      )
                    }
                  >
                    {copiedIndex === "component-code" ? (
                      <Check className="size-3.5" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                    Copy
                  </Button>
                </div>
              </InstallationStep>

              {/* Final steps */}
              <InstallationStep
                number={currentStep++}
                title="Final Steps"
              >
                <div className="bg-muted/20 border rounded-xl p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div>
                      <h4 className="text-sm font-medium">
                        Update Import Paths
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Make sure to update the import paths in the component
                        code to match your project structure. For example,
                        change{" "}
                        <code className="px-1.5 py-0.5 bg-muted rounded font-mono text-xs">
                          @/components/ui/button
                        </code>{" "}
                        to match your UI components location.
                      </p>
                    </div>
                  </div>
                </div>
              </InstallationStep>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};