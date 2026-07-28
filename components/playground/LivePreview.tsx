"use client";

import type React from "react";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Check, Code, Copy, FileCode2, RefreshCw } from "lucide-react";
import parse from "html-react-parser";
import { getHighlighter } from "shiki";
import {
  expandDottedConfig,
  generatePlaygroundCode,
  type CodeVariant,
} from "@/lib/codegen";
import type { ComponentConfig, ComponentDefinition } from "@/types/playground";
import { getNyxuiTheme } from "@/lib/shiki-themes";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LivePreviewProps {
  componentKey: string;
  config: ComponentConfig;
  component: ComponentDefinition;
  showCode: boolean;
  onToggleCode: () => void;
  onCopyCode: (variant: CodeVariant) => void;
}

const codeTabs: Array<{
  value: CodeVariant;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { value: "jsx", label: "JSX", icon: Code },
  { value: "full", label: "Code", icon: FileCode2 },
];

function parseJSXString(jsxString: string): React.ReactNode {
  try {
    const htmlString = jsxString
      .replace(/className=/g, "class=")
      .replace(/\{/g, "")
      .replace(/\}/g, "");

    return parse(htmlString);
  } catch (error) {
    console.error("Error parsing JSX string:", error);
    return jsxString.replace(/<[^>]*>/g, "");
  }
}

function PreviewFallback(): React.ReactElement {
  return (
    <div className="flex min-h-64 items-center justify-center text-sm text-muted-foreground">
      Loading component...
    </div>
  );
}

const LivePreview = ({
  componentKey,
  config,
  component,
  showCode,
  onToggleCode,
  onCopyCode,
}: LivePreviewProps) => {
  const [highlightedCode, setHighlightedCode] = useState("");
  const [refreshKey, setRefreshKey] = useState(componentKey);
  const [copiedVariant, setCopiedVariant] = useState<CodeVariant | null>(null);
  const [codeVariant, setCodeVariant] = useState<CodeVariant>("jsx");

  const LazyComponent = useMemo(() => {
    if (!component.loadComponent) {
      return null;
    }

    return lazy(component.loadComponent);
  }, [component]);

  const code = useMemo(
    () => generatePlaygroundCode(component, config, codeVariant),
    [component, config, codeVariant],
  );

  useEffect(() => {
    async function highlightCode(): Promise<void> {
      if (!showCode) {
        return;
      }

      try {
        const theme = await getNyxuiTheme();
        const highlighter = await getHighlighter({
          themes: [theme],
          langs: ["tsx", "bash"],
        });

        const highlighted = highlighter.codeToHtml(code, {
          lang: "tsx",
          theme: "nyxui-dark",
        });

        setHighlightedCode(highlighted);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(
          `<pre class="bg-card text-foreground p-4 rounded-xl overflow-auto border border-border/60"><code>${code}</code></pre>`,
        );
      }
    }

    highlightCode();
  }, [code, codeVariant, showCode]);

  const handleCopyCode = async (variant: CodeVariant) => {
    await onCopyCode(variant);
    setCopiedVariant(variant);
    window.setTimeout(() => setCopiedVariant(null), 2000);
  };

  const renderComponent = () => {
    if (!LazyComponent) {
      return (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-border/60 bg-card p-8 text-center">
          <h3 className="text-lg font-semibold text-foreground">
            Component Import Missing
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {component.name} is registered but does not have a playground
            loader.
          </p>
        </div>
      );
    }

    const { children, ...otherProps } = expandDottedConfig(config);
    const childrenContent =
      typeof children === "string" ? parseJSXString(children) : children;

    return (
      <Suspense fallback={<PreviewFallback />}>
        <LazyComponent key={refreshKey} {...otherProps}>
          {childrenContent}
        </LazyComponent>
      </Suspense>
    );
  };

  return (
    <Tabs
      value={showCode ? "code" : "preview"}
      onValueChange={(value) => {
        const next = value === "code";
        if (next !== showCode) {
          onToggleCode();
        }
      }}
      className="w-full"
    >
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm">
        <div className="flex items-center justify-between px-4 pt-3">
          <TabsList className="relative z-0 flex h-10 w-fit items-center justify-center rounded-none border-0 bg-transparent p-0 text-muted-foreground">
            <TabsTrigger
              value="preview"
              className="relative h-7 rounded-lg border-0 bg-transparent px-2 py-0 text-sm font-medium text-muted-foreground shadow-none transition-colors hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:rounded-full after:bg-transparent data-[state=active]:after:bg-foreground"
            >
              <span>Preview</span>
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-7 rounded-lg border-0 bg-transparent px-2 py-0 text-sm font-medium text-muted-foreground shadow-none transition-colors hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:rounded-full after:bg-transparent data-[state=active]:after:bg-foreground"
            >
              <span>Code</span>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center justify-center">
            {!showCode && (
              <button
                onClick={() => setRefreshKey(`${componentKey}-${Date.now()}`)}
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                title="Refresh component"
              >
                <RefreshCw className="size-4" />
              </button>
            )}

            {showCode && (
              <>
                {/* Desktop — tabs */}
                <Tabs
                  value={codeVariant}
                  onValueChange={(value) =>
                    setCodeVariant(value as CodeVariant)
                  }
                  className="hidden lg:block"
                >
                  <TabsList className="relative z-0 flex h-10 w-fit items-center justify-center rounded-none border-0 bg-transparent p-0 text-muted-foreground">
                    {codeTabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <TabsTrigger
                          key={tab.value}
                          value={tab.value}
                          className="relative h-7 rounded-lg border-0 bg-transparent px-2 py-0 text-sm font-medium text-muted-foreground shadow-none transition-colors hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:rounded-full after:bg-transparent data-[state=active]:after:bg-foreground"
                        >
                          <Icon className="size-3.5" />
                          <span>{tab.label}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </Tabs>

                {/* Mobile — dropdown */}
                <Select
                  value={codeVariant}
                  onValueChange={(value) =>
                    setCodeVariant(value as CodeVariant)
                  }
                >
                  <SelectTrigger
                    size="sm"
                    className="lg:hidden h-7 w-fit gap-1 px-2 text-xs -mt-3"
                    aria-label="Code variant"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {codeTabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <SelectItem key={tab.value} value={tab.value}>
                          <Icon className="size-3.5" />
                          <span>{tab.label}</span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </>
            )}

            {showCode && (
              <button
                onClick={() => handleCopyCode(codeVariant)}
                className={cn(
                  "inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground -mt-3 lg:mt-0",
                  copiedVariant === codeVariant && "bg-muted text-foreground",
                )}
                title={copiedVariant === codeVariant ? "Copied" : "Copy code"}
              >
                {copiedVariant === codeVariant ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            )}
          </div>
        </div>

        <TabsContent value="preview" className="m-0">
          <div className="relative overflow-auto px-2 pb-2">
            <div className="rounded-[9px] border bg-background p-2">
              <div className="flex min-h-[60vh] lg:min-h-[calc(85vh-5rem)] max-h-[60vh] lg:max-h-[calc(85vh-5rem)] w-full items-center justify-center overflow-hidden p-4">
                <div className="mx-auto flex w-full max-w-full items-center justify-center">
                  <div
                    className="component-preview-wrapper relative flex w-full items-center justify-center"
                    style={{
                      minHeight:
                        componentKey === "matrix-code-rain" ? "400px" : "auto",
                    }}
                  >
                    {renderComponent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="m-0">
          <div className="relative overflow-auto px-2 pb-2">
            <div className="rounded-[9px] border bg-background p-2">
              <div
                className="min-h-[60vh] lg:min-h-[calc(85vh-5rem)] max-h-[60vh] lg:max-h-[calc(85vh-5rem)] overflow-auto rounded-[9px] bg-background [&_pre]:!m-0 [&_pre]:min-h-[inherit] [&_pre]:!bg-transparent [&_pre]:!py-3 [&_pre]:text-[13px] [&_pre]:leading-6 scrollbar-no"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </div>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default LivePreview;
