"use client";

import type React from "react";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Code,
  Copy,
  Download,
  Eye,
  FileCode2,
  Monitor,
  RefreshCw,
  Smartphone,
  Tablet,
} from "lucide-react";
import parse from "html-react-parser";
import { getHighlighter } from "shiki";
import {
  expandDottedConfig,
  generatePlaygroundCode,
  type CodeVariant,
} from "./codegen";
import type { ComponentConfig, ComponentDefinition } from "./types";

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
  { value: "full", label: "Full Code", icon: FileCode2 },
  { value: "install", label: "Install", icon: Download },
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
  const [viewportSize, setViewportSize] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
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
        const highlighter = await getHighlighter({
          themes: ["github-dark"],
          langs: ["tsx", "bash"],
        });

        const highlighted = highlighter.codeToHtml(code, {
          lang: codeVariant === "install" ? "bash" : "tsx",
          themes: {
            light: "github-dark",
            dark: "github-dark",
          },
        });

        setHighlightedCode(highlighted);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        setHighlightedCode(
          `<pre class="bg-gray-900 text-gray-100 p-4 rounded overflow-auto"><code>${code}</code></pre>`,
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
        <div className="flex min-h-64 flex-col items-center justify-center rounded-sm border border-orange-200 bg-orange-50 p-8 text-center">
          <h3 className="text-lg font-semibold text-orange-800">
            Component Import Missing
          </h3>
          <p className="mt-2 text-sm text-orange-700">
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

  const getViewportStyles = () => {
    switch (viewportSize) {
      case "mobile":
        return { width: "375px", minHeight: "550px" };
      case "tablet":
        return { width: "768px", minHeight: "550px" };
      case "desktop":
      default:
        return { width: "100%", minHeight: "550px" };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-5 lg:pt-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <h4 className="text-lg font-semibold">Live Preview</h4>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-sm bg-muted/50 p-1">
            {[
              { value: "desktop", icon: Monitor, title: "Desktop view" },
              { value: "tablet", icon: Tablet, title: "Tablet view" },
              { value: "mobile", icon: Smartphone, title: "Mobile view" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.value}
                  onClick={() =>
                    setViewportSize(item.value as typeof viewportSize)
                  }
                  className={`rounded-md p-2 transition-colors ${
                    viewportSize === item.value
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  title={item.title}
                >
                  <Icon className="h-4 w-4" />
                </button>
              );
            })}
          </div>

          <button
            onClick={onToggleCode}
            className={`flex items-center gap-2 rounded-sm px-4 py-2 transition-all duration-200 ${
              showCode
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:shadow-sm"
            }`}
          >
            <Code className="h-4 w-4" />
            <span className="hidden text-sm font-medium sm:inline">
              {showCode ? "Hide Code" : "Show Code"}
            </span>
          </button>

          <button
            onClick={() => setRefreshKey(`${componentKey}-${Date.now()}`)}
            className="rounded-sm bg-muted p-2 transition-all duration-200 hover:bg-muted/80 hover:shadow-sm"
            title="Refresh component"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {showCode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden rounded-sm border border-border bg-gray-900 shadow-sm dark:bg-black"
        >
          <div className="flex flex-col gap-3 border-b border-border bg-background p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {codeTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setCodeVariant(tab.value)}
                    className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors ${
                      codeVariant === tab.value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handleCopyCode(codeVariant)}
              className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-all duration-200 ${
                copiedVariant === codeVariant
                  ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                  : "border-border bg-background hover:bg-muted"
              }`}
            >
              {copiedVariant === codeVariant ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="p-3 sm:p-4">
            <div
              className="min-h-[55vh] max-h-[calc(100vh-16rem)] overflow-auto rounded-md xl:min-h-[65vh] xl:max-h-[calc(100vh-14rem)] 2xl:min-h-[72vh] [&_pre]:!m-0 [&_pre]:min-h-[inherit] [&_pre]:!bg-transparent [&_pre]:!p-4 [&_pre]:text-sm [&_pre]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </div>
        </motion.div>
      )}

      {!showCode && (
        <motion.div
          key={`preview-${componentKey}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="flex overflow-auto rounded-sm border bg-white shadow-lg dark:bg-black lg:min-h-[80vh]">
            <div
              className="mx-auto flex h-full items-center justify-center lg:p-6 transition-all duration-300"
              style={getViewportStyles()}
            >
              <div className="flex h-full w-full items-center justify-center [&>*]:max-h-full [&>*]:max-w-full">
                <div
                  className="component-preview-wrapper relative flex items-center justify-center"
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight:
                      componentKey === "matrix-code-rain" ? "400px" : "auto",
                  }}
                >
                  {renderComponent()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LivePreview;
