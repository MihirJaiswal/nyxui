"use client";

import {
  useState,
  useEffect,
  Suspense,
  useRef,
  startTransition,
  useCallback,
  useMemo,
} from "react";
import { Play, AlertCircle } from "lucide-react";
import ComponentSelector from "./ComponentSelector";
import PropertyEditor from "./PropertyEditor";
import LivePreview from "./LivePreview";
import type { ComponentConfig } from "./types";
import { useSearchParams, useRouter } from "next/navigation";
import { componentRegistry } from "./registry";
import { Grid } from "./Grid";

// Extract shared config generation logic
const generateDefaultConfig = (componentKey: string): ComponentConfig => {
  const component = componentRegistry[componentKey];
  if (!component) return {};

  return Object.entries(component.props).reduce((config, [key, prop]) => {
    config[key] = prop.default;
    return config;
  }, {} as ComponentConfig);
};

// Error Boundary Component
const PlaygroundErrorBoundary = ({
  children,
  onReset,
}: {
  children: React.ReactNode;
  onReset?: () => void;
}) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      setHasError(true);
      setError(e.error);
    };
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {error?.message || "An error occurred in the playground"}
          </p>
          {onReset && (
            <button
              onClick={() => {
                setHasError(false);
                setError(null);
                onReset();
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90"
            >
              Reset Playground
            </button>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const PlaygroundEmptyState = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-w-0">
      <div className="flex-1 p-4 lg:p-6 overflow-auto">
        <div className="h-full flex items-center justify-center">
          <Grid />
        </div>
      </div>
    </div>
  );
};

// Toast notification hook for user feedback
const useToast = () => {
  const [toast, setToast] = useState<{
    message: string;
    visible: boolean;
  } | null>(null);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast(null), 2000);
  }, []);

  const Toast = () => {
    if (!toast?.visible) return null;
    return (
      <div className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-primary text-primary-foreground rounded-md shadow-lg text-sm animate-in fade-in slide-in-from-bottom-2">
        {toast.message}
      </div>
    );
  };

  return { showToast, Toast };
};

// Generate component code - memoized for performance
const generateComponentCode = (
  componentKey: string,
  config: ComponentConfig,
): string => {
  const component = componentRegistry[componentKey];
  if (!component) return "";

  const propsString = Object.entries(config)
    .filter(([key]) => key !== "children")
    .map(([key, value]) => {
      if (typeof value === "string") {
        return `  ${key}="${value}"`;
      } else {
        return `  ${key}={${JSON.stringify(value)}}`;
      }
    })
    .join("\n");

  const children = config.children || "";

  if (children) {
    return `<${component.component}${propsString ? `\n${propsString}` : ""}>\n  ${children}\n</${component.component}>`;
  } else {
    return `<${component.component}${propsString ? `\n${propsString}\n` : " "}/>`;
  }
};

// Extract the component that uses useSearchParams into a separate component
const PlaygroundContent = ({
  initialComponent,
}: {
  initialComponent?: string;
}) => {
  const [selectedComponent, setSelectedComponent] = useState<string>(
    initialComponent || "",
  );
  const [componentConfig, setComponentConfig] = useState<ComponentConfig>(() =>
    initialComponent ? generateDefaultConfig(initialComponent) : {},
  );
  const [showCode, setShowCode] = useState(false);
  const isManualSelectionRef = useRef(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast, Toast } = useToast();

  // Persist config to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("playground-config");
    if (saved) {
      try {
        const { component, config } = JSON.parse(saved);
        if (component && componentRegistry[component]) {
          setSelectedComponent(component);
          setComponentConfig(config);
        }
      } catch {
        // Invalid saved state, ignore
      }
    }
  }, []);

  useEffect(() => {
    if (selectedComponent) {
      localStorage.setItem(
        "playground-config",
        JSON.stringify({
          component: selectedComponent,
          config: componentConfig,
        }),
      );
    }
  }, [selectedComponent, componentConfig]);

  // Handle initial component or URL parameter for component selection
  useEffect(() => {
    if (isManualSelectionRef.current) {
      isManualSelectionRef.current = false;
      return;
    }

    const componentFromUrl = searchParams.get("component") || initialComponent;
    if (
      componentFromUrl &&
      componentRegistry[componentFromUrl] &&
      componentFromUrl !== selectedComponent
    ) {
      setComponentConfig(generateDefaultConfig(componentFromUrl));
      setSelectedComponent(componentFromUrl);
    }
  }, [searchParams, initialComponent, selectedComponent]);

  const handleComponentSelect = useCallback(
    (componentKey: string) => {
      if (componentKey === selectedComponent) return;

      isManualSelectionRef.current = true;

      if (componentRegistry[componentKey]) {
        setComponentConfig(generateDefaultConfig(componentKey));
        setSelectedComponent(componentKey);

        startTransition(() => {
          router.replace(`/playground?component=${componentKey}`, {
            scroll: false,
          });
        });
      }
    },
    [selectedComponent, router],
  );

  const handlePropertyChange = useCallback(
    (property: string, value: string | number | boolean | object) => {
      setComponentConfig((prev) => ({
        ...prev,
        [property]: value,
      }));
    },
    [],
  );

  const handleReset = useCallback(() => {
    setSelectedComponent("");
    setComponentConfig({});
    localStorage.removeItem("playground-config");
    router.replace("/playground", { scroll: false });
  }, [router]);

  const handleCopyCode = useCallback(async () => {
    const code = generateComponentCode(selectedComponent, componentConfig);
    try {
      await navigator.clipboard.writeText(code);
      showToast("Code copied to clipboard!");
    } catch (err) {
      showToast("Failed to copy code");
      console.error("Clipboard error:", err);
    }
  }, [selectedComponent, componentConfig, showToast]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "c" && e.shiftKey) {
        e.preventDefault();
        handleCopyCode();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCopyCode]);

  return (
    <PlaygroundErrorBoundary onReset={handleReset}>
      <div className="h-full flex flex-col bg-background">
        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Left Sidebar - Controls */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 border-b lg:border-b-0 lg:border-x border-border/60 flex flex-col max-h-[40vh] lg:max-h-screen lg:sticky lg:top-0 overflow-hidden">
            {/* Component Selector */}
            <div className="flex-shrink-0">
              <ComponentSelector
                components={componentRegistry}
                selectedComponent={selectedComponent}
                onSelect={handleComponentSelect}
              />
            </div>

            {selectedComponent ? (
              <>
                {/* Scrollable Property Editor */}
                <div className="flex-1 overflow-auto">
                  <PropertyEditor
                    component={componentRegistry[selectedComponent]}
                    config={componentConfig}
                    onChange={handlePropertyChange}
                  />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
                <div className="text-center max-w-sm">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 lg:w-10 lg:h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-2">
                    Select a Component
                  </h3>
                  <p className="text-sm lg:text-md text-muted-foreground">
                    Select a component from the sidebar to start experimenting
                    with components
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Live Preview or Empty State */}
          {selectedComponent ? (
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex-1 p-4 lg:p-6">
                <LivePreview
                  componentKey={selectedComponent}
                  config={componentConfig}
                  component={componentRegistry[selectedComponent]}
                  showCode={showCode}
                  onToggleCode={() => setShowCode(!showCode)}
                  onCopyCode={handleCopyCode}
                />
              </div>
            </div>
          ) : (
            <PlaygroundEmptyState />
          )}
        </div>
        <Toast />
      </div>
    </PlaygroundErrorBoundary>
  );
};

// Loading fallback component
const PlaygroundLoading = () => {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-border flex flex-col max-h-[40vh] lg:max-h-none">
          <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-sm lg:text-base text-muted-foreground">
                Loading playground...
              </p>
            </div>
          </div>
        </div>
        <PlaygroundEmptyState />
      </div>
    </div>
  );
};

// Main component with Suspense boundary
const PlaygroundClient = ({
  initialComponent,
}: {
  initialComponent?: string;
}) => {
  return (
    <Suspense fallback={<PlaygroundLoading />}>
      <PlaygroundContent initialComponent={initialComponent} />
    </Suspense>
  );
};

export default PlaygroundClient;
