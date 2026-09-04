"use client";

import {
  useState,
  useEffect,
  useLayoutEffect,
  Suspense,
  useRef,
  startTransition,
  useCallback,
} from "react";
import { AlertCircle, GripVertical } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ComponentSelector from "./ComponentSelector";
import PropertyEditor from "./PropertyEditor";
import LivePreview from "./LivePreview";
import type { ComponentConfig, ComponentPropValue } from "./types";
import { useSearchParams, useRouter } from "next/navigation";
import { componentRegistry } from "./registry";
import { Grid } from "./Grid";
import { generatePlaygroundCode, type CodeVariant } from "./codegen";
import { playgroundComponentHref } from "@/lib/links";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

// Sidebar's current fixed width (was `lg:w-72`) — used as both the
// default AND the minimum size of the resizable sidebar panel.
const SIDEBAR_PX = 310;

// Shared classNames so the "not measured yet" fallback layout and the
// real PanelGroup layout look pixel-identical (see useSidebarPanelSizes).
const SIDEBAR_INNER_CLASSNAME =
  "flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm";
const SIDEBAR_OUTER_CLASSNAME =
  "flex flex-col lg:sticky lg:top-16 lg:h-[calc(85vh+5rem)] lg:py-10";
const MAIN_OUTER_CLASSNAME = "flex flex-col min-w-0 pl-8 xl:pl-24";

// Extract shared config generation logic
const generateDefaultConfig = (componentKey: string): ComponentConfig => {
  const component = componentRegistry[componentKey];
  if (!component) return {};

  return Object.entries(component.props).reduce((config, [key, prop]) => {
    config[key] = prop.default;
    return config;
  }, {} as ComponentConfig);
};

const encodeConfig = (config: ComponentConfig): string =>
  encodeURIComponent(JSON.stringify(config));

const decodeConfig = (configParam: string | null): ComponentConfig | null => {
  if (!configParam) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(configParam)) as ComponentConfig;
  } catch {
    return null;
  }
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
      <div className="h-full flex flex-col">
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
      <div className="flex-1 py-6 lg:py-10 overflow-auto">
        <div className="h-full flex">
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

// Converts the fixed SIDEBAR_PX value into a live percentage based on the
// actual measured width of the container, so react-resizable-panels (which
// only understands percentages) still respects a real pixel minimum.
//
// IMPORTANT: this returns `null` until we've actually measured the real
// container on the client. We deliberately do NOT guess a percentage from
// `window.innerWidth` or a hardcoded fallback for the "not measured yet"
// state — any such guess will usually be wrong (e.g. a 25% fallback is
// already bigger than 310px on anything wider than ~1240px), and since SSR
// has no `window` at all, that wrong guess is what actually gets painted
// first. The caller renders a plain fixed-width layout while this is null,
// and only mounts the resizable PanelGroup once it flips to a real value —
// see PlaygroundContent below.
const useSidebarPanelSizes = (
  containerRef: React.RefObject<HTMLDivElement | null>,
) => {
  const [sizes, setSizes] = useState<{
    sidebarPct: number;
    minSidebarPct: number;
  } | null>(null);

  // useLayoutEffect (not useEffect) so the measurement + swap to the real
  // PanelGroup happens synchronously before the browser paints the client
  // render, minimizing any visible flash once we're on the client.
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const total = el.offsetWidth;
      if (total > 0) {
        const pct = (SIDEBAR_PX / total) * 100;
        setSizes({ sidebarPct: pct, minSidebarPct: pct });
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);

  return sizes;
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
  const { copy: copyLink, hasCopied: linkCopied } = useCopyToClipboard({
    timeout: 2000,
    onCopy: () => showToast("Playground link copied"),
  });
  const { copy: copyCodeToClipboard } = useCopyToClipboard({
    timeout: 2000,
  });

  const panelGroupContainerRef = useRef<HTMLDivElement>(null);
  const sidebarSizes = useSidebarPanelSizes(panelGroupContainerRef);

  // Only restore from localStorage if a component is specified in the URL
  useEffect(() => {
    const componentFromUrl = searchParams.get("component");
    if (componentFromUrl) {
      return;
    }

    // No component in URL — don't auto-restore, show empty/grid state
    setSelectedComponent("");
    setComponentConfig({});
  }, [searchParams]);

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
    const configFromUrl = decodeConfig(searchParams.get("config"));
    if (
      componentFromUrl &&
      componentRegistry[componentFromUrl] &&
      componentFromUrl !== selectedComponent
    ) {
      setComponentConfig(
        configFromUrl ?? generateDefaultConfig(componentFromUrl),
      );
      setSelectedComponent(componentFromUrl);
    } else if (configFromUrl && componentFromUrl === selectedComponent) {
      setComponentConfig(configFromUrl);
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
          router.replace(playgroundComponentHref(componentKey), {
            scroll: false,
          });
        });
      }
    },
    [selectedComponent, router],
  );

  const handlePropertyChange = useCallback(
    (property: string, value: ComponentPropValue) => {
      setComponentConfig((prev) => ({
        ...prev,
        [property]: value,
      }));
    },
    [],
  );

  const handleResetCurrent = useCallback(() => {
    if (!selectedComponent) {
      return;
    }

    setComponentConfig(generateDefaultConfig(selectedComponent));
    showToast("Component props reset");
  }, [selectedComponent, showToast]);

  const handleResetProperty = useCallback(
    (property: string) => {
      const prop = componentRegistry[selectedComponent]?.props[property];

      if (!prop) {
        return;
      }

      setComponentConfig((prev) => ({
        ...prev,
        [property]: prop.default,
      }));
    },
    [selectedComponent],
  );

  const handleReset = useCallback(() => {
    setSelectedComponent("");
    setComponentConfig({});
    localStorage.removeItem("playground-config");
    router.replace("/playground", { scroll: false });
  }, [router]);

  const handleCopyCode = useCallback(
    async (variant: CodeVariant = "jsx") => {
      const component = componentRegistry[selectedComponent];
      const code = component
        ? generatePlaygroundCode(component, componentConfig, variant)
        : "";

      try {
        await copyCodeToClipboard(code);
        showToast(
          variant === "install"
            ? "Install command copied"
            : variant === "full"
              ? "Full example copied"
              : "JSX copied",
        );
      } catch (err) {
        showToast("Failed to copy code");
        console.error("Clipboard error:", err);
      }
    },
    [selectedComponent, componentConfig, showToast, copyCodeToClipboard],
  );

  const handleCopyLink = useCallback(() => {
    if (!selectedComponent) {
      return;
    }

    const url = new URL(window.location.href);
    url.pathname = "/playground";
    url.searchParams.set("component", selectedComponent);
    url.searchParams.set("config", encodeConfig(componentConfig));

    copyLink(url.toString()).catch(() => showToast("Failed to copy link"));
  }, [selectedComponent, componentConfig, copyLink, showToast]);

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

  const sidebarPanelContent = selectedComponent ? (
    <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3 scrollbar-no">
      <PropertyEditor
        component={componentRegistry[selectedComponent]}
        components={componentRegistry}
        selectedComponent={selectedComponent}
        config={componentConfig}
        onChange={handlePropertyChange}
        onResetAll={handleResetCurrent}
        onResetProperty={handleResetProperty}
        onCopyLink={handleCopyLink}
        linkCopied={linkCopied}
        onSelectComponent={handleComponentSelect}
      />
    </div>
  ) : (
    <div className="min-h-0 flex-1 overflow-y-auto scrollbar-no">
      <ComponentSelector
        components={componentRegistry}
        selectedComponent={selectedComponent}
        onSelect={handleComponentSelect}
      />
    </div>
  );

  const mainPanelContent = selectedComponent ? (
    <div className="flex-1 flex flex-col min-w-0">
      <div className="flex-1 md:py-4 lg:py-10">
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
  );

  return (
    <PlaygroundErrorBoundary onReset={handleReset}>
      <div className="h-full flex flex-col bg-background">
        {/* Main Content */}
        {/* Desktop layout */}
        <div
          ref={panelGroupContainerRef}
          className="hidden w-full flex-1 lg:flex lg:flex-row"
        >
          {sidebarSizes ? (
            <PanelGroup direction="horizontal" className="flex-1">
              <Panel
                defaultSize={sidebarSizes.sidebarPct}
                minSize={sidebarSizes.minSidebarPct}
                maxSize={50}
                className={SIDEBAR_OUTER_CLASSNAME}
              >
                <div className={SIDEBAR_INNER_CLASSNAME}>
                  {sidebarPanelContent}
                </div>
              </Panel>

              <PanelResizeHandle className="group relative -ml-1.75 flex w-3 flex-shrink-0 cursor-col-resize items-center justify-center">
                <div className="bg-background rounded-full border border-border p-0.5">
                  <GripVertical className="relative z-10 h-3 w-3 text-muted-foreground/40" />
                </div>
              </PanelResizeHandle>

              <Panel minSize={30} className={`${MAIN_OUTER_CLASSNAME} flex-1`}>
                {mainPanelContent}
              </Panel>
            </PanelGroup>
          ) : (
            // Not measured yet (nothing has mounted on the client). Render a
            // plain, non-resizable layout pinned to the exact same SIDEBAR_PX
            // width the PanelGroup above will end up at. This is what SSR (and
            // the very first client paint) shows, so there's no oversized
            // sidebar flash — once useSidebarPanelSizes measures the real
            // container, we swap to the PanelGroup at an identical width.
            <>
              <div
                style={{ width: SIDEBAR_PX, flexShrink: 0 }}
                className={SIDEBAR_OUTER_CLASSNAME}
              >
                <div className={SIDEBAR_INNER_CLASSNAME}>
                  {sidebarPanelContent}
                </div>
              </div>
              <div className={`${MAIN_OUTER_CLASSNAME} flex-1`}>
                {mainPanelContent}
              </div>
            </>
          )}
        </div>

        {/* Mobile layout */}
        <div className="flex w-full flex-1 flex-col lg:hidden">
          <div className="flex w-full flex-shrink-0 flex-col">
            <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm">
              {sidebarPanelContent}
            </div>
          </div>

          {mainPanelContent}
        </div>
      </div>
      <Toast />
    </PlaygroundErrorBoundary>
  );
};

// Loading fallback component — mirrors the "not measured yet" fallback
// in PlaygroundContent so the SSR → client swap is pixel-identical.
const PlaygroundLoading = () => {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Desktop layout */}
      <div className="hidden w-full flex-1 lg:flex lg:flex-row">
        <div
          style={{ width: SIDEBAR_PX, flexShrink: 0 }}
          className={SIDEBAR_OUTER_CLASSNAME}
        >
          <div className={SIDEBAR_INNER_CLASSNAME}>
            <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm lg:text-base text-muted-foreground">
                  Loading playground...
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${MAIN_OUTER_CLASSNAME} flex-1`}>
          <PlaygroundEmptyState />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex w-full flex-1 flex-col lg:hidden">
        <div className="flex w-full flex-shrink-0 flex-col">
          <div className={SIDEBAR_INNER_CLASSNAME}>
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  Loading playground...
                </p>
              </div>
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
