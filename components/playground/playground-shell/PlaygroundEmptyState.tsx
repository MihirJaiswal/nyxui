import { Grid } from "@/components/playground/Grid";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SIDEBAR_INNER_CLASSNAME,
  SIDEBAR_OUTER_CLASSNAME,
  MAIN_OUTER_CLASSNAME,
} from "@/hooks/use-sidebar-panel-sizes";
import { cn } from "@/lib/utils";

export const PlaygroundEmptyState = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden min-w-0">
      <div className="flex-1 py-4 overflow-auto">
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
          className={cn(
            SIDEBAR_OUTER_CLASSNAME,
            "w-[260px] shrink-0 xl:w-[310px]",
          )}
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

      {/* Mobile layout — tab-based (matches PlaygroundContent) */}
      <div className="flex w-full flex-1 flex-col lg:hidden">
        <Tabs defaultValue="preview" className="flex h-full flex-col gap-0">
          <div className="sticky top-16 z-30 flex justify-start mt-3">
            <TabsList className="h-8 w-[200px]">
              <TabsTrigger value="preview" className="text-sm">
                Preview
              </TabsTrigger>
              <TabsTrigger value="props" className="text-sm">
                Props
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="props" className="mt-0 flex-1 overflow-hidden">
            <div className={SIDEBAR_INNER_CLASSNAME + " h-full"}>
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center">
                  <LoadingSpinner size={32} className="mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Loading playground...
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="preview" className="mt-0 flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <PlaygroundEmptyState />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
