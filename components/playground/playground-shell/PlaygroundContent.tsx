"use client";

import { useRef } from "react";
import { GripVertical } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ComponentSelector from "../ComponentSelector";
import PropertyEditor from "../property-editors/PropertyEditor";
import LivePreview from "../LivePreview";
import { componentRegistry } from "../registry";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { usePlaygroundState } from "@/hooks/use-playground-state";
import { ErrorBoundary } from "@/components/global/ErrorBoundary";
import { PlaygroundEmptyState } from "./PlaygroundEmptyState";
import {
  useSidebarPanelSizes,
  SIDEBAR_PX,
  SIDEBAR_INNER_CLASSNAME,
  SIDEBAR_OUTER_CLASSNAME,
  MAIN_OUTER_CLASSNAME,
} from "@/hooks/useSidebarPanelSizes";

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
