"use client";

import type React from "react";
import { useState, useEffect, CSSProperties } from "react";
import {
  Copy,
  Github,
  Package,
  FileCode,
  ChevronDown,
  ChevronUp,
  FileWarning,
  Check,
  ExternalLink,
  Maximize,
  Minimize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ComponentData } from "@/nuvyxui/ComponentInterfaces";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const lightTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: "#000000",
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: "#000000",
  },
};
const pitchBlackTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: "#09090B",
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: "#09090B",
  },
};

const LIGHT_THEME = lightTheme;
const DARK_THEME = pitchBlackTheme;

const CollapsibleSection = ({
  title,
  icon,
  defaultCollapsed = true,
  children,
  badge,
}: {
  title: string;
  icon: React.ReactNode;
  defaultCollapsed?: boolean;
  children: React.ReactNode;
  badge?: string;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className="rounded-xl border shadow-sm overflow-hidden transition-all duration-200 hover:border-primary/20">
      <div
        className="bg-muted/30 px-6 py-4 border-b flex items-center justify-between cursor-pointer group"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <div className="text-primary/80 group-hover:text-primary transition-colors">
            {icon}
          </div>
          <span className="text-sm font-medium">{title}</span>
          {badge && (
            <Badge
              variant="outline"
              className="ml-2 text-xs font-normal bg-primary/5 text-primary border-primary/20"
            >
              {badge}
            </Badge>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full transition-all duration-200 hover:bg-primary/10 hover:text-primary"
        >
          {isCollapsed ? (
            <ChevronDown className="size-4" />
          ) : (
            <ChevronUp className="size-4" />
          )}
        </Button>
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ExpandableCode = ({
  language,
  code,
  codeStyle,
  showLineNumbers = true,
}: {
  language: string;
  code: string;
  codeStyle: Record<string, CSSProperties>;
  showLineNumbers?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <div
        className={`${
          !isExpanded ? "max-h-80 overflow-hidden" : ""
        } border shadow-sm`}
      >
        <SyntaxHighlighter
          language={language}
          style={codeStyle}
          customStyle={{
            margin: 0,
            padding: "16px",
            fontSize: "13px",
            height: isExpanded ? "auto" : undefined,
          }}
          showLineNumbers={showLineNumbers}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="absolute right-3 bottom-3 gap-1.5 bg-background/80 backdrop-blur-sm shadow-sm z-10"
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
  );
};

export const InstallationSection = ({
  componentData,
}: {
  componentData: ComponentData;
}) => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const hasSetupInfo = componentData.dependencies?.some(
    (dependency) => dependency.setup
  );

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

  const codeStyle = isDarkMode ? DARK_THEME : LIGHT_THEME;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs">
          <Github className="size-3.5" />
          View on GitHub
          <ExternalLink className="size-3 ml-0.5" />
        </Button>
      </div>

      <div className="rounded-xl border overflow-hidden shadow-sm">
        <Tabs defaultValue="manual" className="w-full">
          <div className="border-b bg-background/50 backdrop-blur-sm">
            <TabsList className="w-full justify-start h-14 px-6 bg-transparent">
              <TabsTrigger
                value="cli"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg h-9 px-4"
              >
                <Package className="size-4 mr-2" />
                CLI Installation
              </TabsTrigger>
              <TabsTrigger
                value="manual"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg h-9 px-4"
              >
                <FileCode className="size-4 mr-2" />
                Manual
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="cli" className="p-8 space-y-6 bg-background">
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

          <TabsContent
            value="manual"
            className="md:p-8 p-3 space-y-10 bg-background"
          >
            <div className="space-y-8">
              {componentData.dependencies &&
                componentData.dependencies.length > 0 && (
                  <div className="space-y-5">
                    <h3 className="text-lg font-medium flex items-center gap-2.5">
                      <span className="flex items-center justify-center rounded-full bg-primary/10 w-8 h-8 text-xs font-bold text-primary">
                        1
                      </span>
                      <span>Install Dependencies</span>
                    </h3>

                    <CollapsibleSection
                      title="Required Dependencies"
                      icon={<Package className="size-5" />}
                      badge={`${componentData.dependencies.length} package${
                        componentData.dependencies.length > 1 ? "s" : ""
                      }`}
                      defaultCollapsed={false}
                    >
                      <div className="p-6 space-y-8 bg-background/50">
                        {componentData.dependencies.map((dependency, index) => (
                          <div
                            key={dependency.name}
                            className={`space-y-3 ${
                              index > 0 ? "pt-6 border-t" : ""
                            }`}
                          >
                            <div className="flex items-start">
                              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                              <div className="ml-3">
                                <p className="font-medium text-sm">
                                  {dependency.name}
                                </p>
                                {dependency.description && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {dependency.description}
                                  </p>
                                )}
                              </div>
                            </div>

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
                                              borderRadius: "0.5rem",
                                              fontSize: "13px",
                                            }}
                                          >
                                            {command}
                                          </SyntaxHighlighter>
                                        </div>
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          className={`absolute right-3 top-3 opacity-80 hover:opacity-100 h-7 w-7 bg-background/80 backdrop-blur-sm border shadow-sm transition-all duration-200 ${
                                            copiedIndex ===
                                            `${dependency.name}-${packageManager}`
                                              ? "bg-green-500/10 border-green-500/30 text-green-600"
                                              : ""
                                          }`}
                                          onClick={() =>
                                            handleCopyClick(
                                              command,
                                              `${dependency.name}-${packageManager}`
                                            )
                                          }
                                        >
                                          {copiedIndex ===
                                          `${dependency.name}-${packageManager}` ? (
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
                          </div>
                        ))}
                      </div>
                    </CollapsibleSection>
                  </div>
                )}

              {hasSetupInfo && (
                <div className="space-y-5">
                  <h3 className="text-lg font-medium flex items-center gap-2.5">
                    <span className="flex items-center justify-center rounded-full bg-primary/10 w-8 h-8 text-xs font-bold text-primary">
                      2
                    </span>
                    <span>Setup Configuration</span>
                  </h3>

                  <CollapsibleSection
                    title="Configuration Files"
                    icon={<FileCode className="size-5" />}
                    defaultCollapsed={false}
                  >
                    <div className="p-6 space-y-8 bg-background/50">
                      {componentData.dependencies
                        ?.filter((dependency) => dependency.setup)
                        .map((dependency, index) => (
                          <div
                            key={`setup-${dependency.name}`}
                            className={`space-y-4 ${
                              index > 0 ? "pt-6 border-t" : ""
                            }`}
                          >
                            <div className="flex items-start">
                              <span className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                              <div className="ml-3">
                                <p className="font-medium text-sm">
                                  {dependency.name} Configuration
                                </p>
                                {dependency.setup?.description && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {dependency.setup.description}
                                  </p>
                                )}
                              </div>
                            </div>

                            {dependency.setup?.file &&
                              dependency.setup?.code && (
                                <div className="space-y-3 mt-3">
                                  <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg border text-xs text-muted-foreground">
                                    <FileCode className="size-3.5 text-primary" />
                                    Create file:{" "}
                                    <code className="px-1.5 py-0.5 bg-muted rounded font-mono">
                                      {dependency.setup.file}
                                    </code>
                                  </div>
                                  <div className="relative">
                                    <ExpandableCode
                                      language="typescript"
                                      code={dependency.setup.code}
                                      codeStyle={codeStyle}
                                    />
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className={`absolute right-3 top-3 opacity-80 hover:opacity-100 h-7 w-7 bg-background/80 backdrop-blur-sm border shadow-sm transition-all duration-200 ${
                                        copiedIndex ===
                                        `${dependency.name}-setup`
                                          ? "bg-green-500/10 border-green-500/30 text-green-600"
                                          : ""
                                      }`}
                                      onClick={() =>
                                        handleCopyClick(
                                          dependency.setup?.code || "",
                                          `${dependency.name}-setup`
                                        )
                                      }
                                    >
                                      {copiedIndex ===
                                      `${dependency.name}-setup` ? (
                                        <Check className="size-3.5" />
                                      ) : (
                                        <Copy className="size-3.5" />
                                      )}
                                      <span className="sr-only">
                                        Copy setup code
                                      </span>
                                    </Button>
                                  </div>
                                </div>
                              )}
                          </div>
                        ))}
                    </div>
                  </CollapsibleSection>
                </div>
              )}

              {/* Step 3: Copy Component Code */}
              <div className="space-y-5">
                <h3 className="text-lg font-medium flex items-center gap-2.5">
                  <span className="flex items-center justify-center rounded-full bg-primary/10 w-8 h-8 text-xs font-bold text-primary">
                    {componentData.dependencies &&
                    componentData.dependencies.length > 0
                      ? hasSetupInfo
                        ? 3
                        : 2
                      : 1}
                  </span>
                  <span>Copy Component Code</span>
                </h3>

                <CollapsibleSection
                  title={`${componentData?.name || "Component"}.tsx`}
                  icon={<Github className="size-5" />}
                  defaultCollapsed={false}
                >
                  <div className="relative">
                    <div className="border-b px-4 py-2 bg-muted/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCode className="size-4 text-primary/70" />
                        <span className="text-xs font-medium">
                          {componentData?.name || "Component"}.tsx
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs font-normal bg-primary/5 text-primary border-primary/20"
                      >
                        TypeScript
                      </Badge>
                    </div>

                    <ExpandableCode
                      language="typescript"
                      code={
                        componentData?.componentCode ||
                        "// Component code will appear here"
                      }
                      codeStyle={codeStyle}
                    />

                    <div className="flex justify-end p-3 bg-background border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`gap-1.5 transition-all duration-200 ${
                          copiedIndex === "component-code"
                            ? "bg-green-500/10 border-green-500/30 text-green-600"
                            : ""
                        }`}
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
                        Copy Code
                      </Button>
                    </div>
                  </div>
                </CollapsibleSection>
              </div>

              {/* Final Step: Update import paths */}
              <div className="space-y-4 mt-2">
                <h3 className="text-lg font-medium flex items-center gap-2.5">
                  <span className="flex items-center justify-center rounded-full bg-primary/10 w-8 h-8 text-xs font-bold text-primary">
                    {componentData.dependencies &&
                    componentData.dependencies.length > 0
                      ? hasSetupInfo
                        ? 4
                        : 3
                      : 2}
                  </span>
                  <span>Final Steps</span>
                </h3>

                <div className="bg-muted/20 border rounded-xl p-5">
                  <h4 className="text-sm font-medium mb-3">
                    Update Import Paths
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Make sure to update the import paths in the component code
                    to match your project structure. For example, change{" "}
                    <code className="px-1.5 py-0.5 bg-muted rounded font-mono text-xs">
                      @/components/ui/button
                    </code>{" "}
                    to match your UI components location.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
