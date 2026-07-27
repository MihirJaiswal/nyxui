"use client";

import {
  useState,
  useEffect,
  useRef,
  startTransition,
  useCallback,
} from "react";
import { GripVertical } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import ComponentSelector from "./ComponentSelector";
import PropertyEditor from "./PropertyEditor";
import LivePreview from "./LivePreview";
import type { ComponentConfig, ComponentPropValue } from "./types";
import { componentRegistry } from "./registry";
import { generatePlaygroundCode, type CodeVariant } from "./codegen";
import { playgroundComponentHref } from "@/lib/links";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { ErrorBoundary } from "@/components/global/ErrorBoundary";
import { PlaygroundEmptyState } from "./PlaygroundEmptyState";
import {
  useSidebarPanelSizes,
  SIDEBAR_PX,
  SIDEBAR_INNER_CLASSNAME,
  SIDEBAR_OUTER_CLASSNAME,
  MAIN_OUTER_CLASSNAME,
} from "@/hooks/useSidebarPanelSizes";
import {
  generateDefaultConfig,
  encodeConfig,
  decodeConfig,
  PLAYGROUND_STORAGE_KEY,
} from "@/lib/config-utils";

export const PlaygroundContent = ({
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
  const { copy: copyLink, hasCopied: linkCopied } = useCopyToClipboard({
    timeout: 2000,
    onCopy: () => toast("Playground link copied"),
  });
  const { copy: copyCodeToClipboard } = useCopyToClipboard({
    timeout: 2000,
  });

  const panelGroupContainerRef = useRef<HTMLDivElement>(null);
  const sidebarSizes = useSidebarPanelSizes(panelGroupContainerRef);

  useEffect(() => {
    if (isManualSelectionRef.current) {
      isManualSelectionRef.current = false;
      return;
    }

    const componentFromUrl = searchParams.get("component") || initialComponent;
    const configFromUrl = decodeConfig(searchParams.get("config"));

    if (componentFromUrl && componentRegistry[componentFromUrl]) {
      if (componentFromUrl !== selectedComponent) {
        setComponentConfig(
          configFromUrl ?? generateDefaultConfig(componentFromUrl),
        );
        setSelectedComponent(componentFromUrl);
      } else if (configFromUrl) {
        setComponentConfig(configFromUrl);
      }
      return;
    }

    if (selectedComponent) {
      setSelectedComponent("");
      setComponentConfig({});
    }
  }, [searchParams, initialComponent, selectedComponent]);

  useEffect(() => {
    if (selectedComponent) {
      localStorage.setItem(
        PLAYGROUND_STORAGE_KEY,
        JSON.stringify({
          component: selectedComponent,
          config: componentConfig,
        }),
      );
    }
  }, [selectedComponent, componentConfig]);

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
    toast("Component props reset");
  }, [selectedComponent]);

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
    localStorage.removeItem(PLAYGROUND_STORAGE_KEY);
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
        toast(
          variant === "install"
            ? "Install command copied"
            : variant === "full"
              ? "Full example copied"
              : "JSX copied",
        );
      } catch (err) {
        toast("Failed to copy code");
        console.error("Clipboard error:", err);
      }
    },
    [selectedComponent, componentConfig, copyCodeToClipboard],
  );

  const handleCopyLink = useCallback(() => {
    if (!selectedComponent) {
      return;
    }

    const url = new URL(window.location.href);
    url.pathname = "/playground";
    url.searchParams.set("component", selectedComponent);
    url.searchParams.set("config", encodeConfig(componentConfig));

    copyLink(url.toString()).catch(() => toast("Failed to copy link"));
  }, [selectedComponent, componentConfig, copyLink]);

  // Keyboard shortcuts
  useKeyboardShortcut("c", () => handleCopyCode(), {
    modKey: true,
    shiftKey: true,
  });
  useKeyboardShortcut("k", () => setShowCode((prev) => !prev), {
    modKey: true,
  });

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
    <ErrorBoundary onReset={handleReset}>
      <div className="h-full flex flex-col bg-background">
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
            // Not measured yet — plain non-resizable layout pinned to the
            // exact same SIDEBAR_PX width the PanelGroup will end up at.
            // See useSidebarPanelSizes for why we don't guess a percentage.
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
    </ErrorBoundary>
  );
};

export default PlaygroundContent;
