import { Grid } from "../Grid";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  SIDEBAR_PX,
  SIDEBAR_INNER_CLASSNAME,
  SIDEBAR_OUTER_CLASSNAME,
  MAIN_OUTER_CLASSNAME,
} from "@/hooks/useSidebarPanelSizes";

export const PlaygroundEmptyState = () => {
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

// Loading fallback — mirrors the "not measured yet" fallback in
// PlaygroundContent so the SSR → client swap is pixel-identical.
export const PlaygroundLoading = () => {
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
                <LoadingSpinner size={32} className="mx-auto mb-4" />
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
                <LoadingSpinner size={32} className="mx-auto mb-4" />
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
