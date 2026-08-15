"use client";

import { useRef } from "react";
import { GripVertical } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ComponentSelector from "@/components/playground/ComponentSelector";
import PropertyEditor from "@/components/playground/property-editors/PropertyEditor";
import LivePreview from "@/components/playground/LivePreview";
import { componentRegistry } from "@/components/playground/registry";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { usePlaygroundState } from "@/hooks/use-playground-state";
import { ErrorBoundary } from "@/components/global/ErrorBoundary";
import { PlaygroundEmptyState } from "./PlaygroundEmptyState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useSidebarPanelSizes,
  SIDEBAR_INNER_CLASSNAME,
  SIDEBAR_OUTER_CLASSNAME,
  MAIN_OUTER_CLASSNAME,
} from "@/hooks/use-sidebar-panel-sizes";
import { cn } from "@/lib/utils";

export const PlaygroundContent = ({
  initialComponent,
}: {
  initialComponent?: string;
}) => {
  const {
    selectedComponent,
    componentConfig,
    showCode,
    setShowCode,
    linkCopied,
    handleComponentSelect,
    handlePropertyChange,
    handleResetCurrent,
    handleResetProperty,
    handleReset,
    handleCopyCode,
    handleCopyLink,
  } = usePlaygroundState(initialComponent);

  // Keyboard shortcuts
  useKeyboardShortcut("c", () => handleCopyCode(), {
    modKey: true,
    shiftKey: true,
  });
  useKeyboardShortcut("k", () => setShowCode((prev) => !prev), {
    modKey: true,
  });

  const panelGroupContainerRef = useRef<HTMLDivElement>(null);
  const sidebarSizes = useSidebarPanelSizes(panelGroupContainerRef);

  const sidebarPanelContent = selectedComponent ? (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 scrollbar-no">
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
      <div className="flex-1 py-4 lg:py-4">
        <LivePreview
          componentKey={selectedComponent}
          config={componentConfig}
          component={componentRegistry[selectedComponent]}
          showCode={showCode}
          onToggleCode={() => setShowCode(!showCode)}
          onCopyCode={handleCopyCode}
          onConfigChange={handlePropertyChange}
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
                className={cn(
                  SIDEBAR_OUTER_CLASSNAME,
                  "w-[260px] shrink-0 xl:w-[310px]",
                )}
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

        {/* Mobile layout — tab-based */}
        <div className="flex w-full flex-1 flex-col lg:hidden">
          {selectedComponent ? (
            <Tabs defaultValue="preview" className="flex h-full flex-col gap-0">
              <div className="sticky top-16 z-30 flex justify-start py-1">
                <TabsList className="h-8 w-[200px]">
                  <TabsTrigger value="preview" className="text-sm">
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="props" className="text-sm">
                    Props
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent
                value="props"
                className="mt-0 flex-1 overflow-hidden py-4"
              >
                <div className={cn(SIDEBAR_INNER_CLASSNAME, "h-full")}>
                  {sidebarPanelContent}
                </div>
              </TabsContent>
              <TabsContent
                value="preview"
                className="mt-0 flex-1 overflow-hidden"
              >
                <div className="h-full overflow-y-auto">{mainPanelContent}</div>
              </TabsContent>
            </Tabs>
          ) : (
            <>
              <div className="flex-shrink-0">
                <div className={SIDEBAR_INNER_CLASSNAME}>
                  {sidebarPanelContent}
                </div>
              </div>
              <div className="hidden lg:block">{mainPanelContent}</div>
            </>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default PlaygroundContent;
