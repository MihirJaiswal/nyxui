import { Crosshair, MousePointer2 } from "lucide-react";

export function DeployVisual(): React.ReactElement {
  return (
    <div
      role="img"
      aria-label="A 
      canvas showing a component being precisely positioned with measurement guides."
      className="relative mt-10 flex flex-col items-start"
    >
      {/* Canvas with measurement guides */}
      <div className="relative z-10 w-full overflow-hidden rounded-xl bg-background shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:smooth-shadow-ring-xl">
        {/* canvas header */}
        <div
          className="flex items-center justify-between border-b border-border/60 px-4 py-2.5"
          aria-hidden="true"
        >
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Crosshair className="size-3.5" />
            <span className="font-mono text-xs">hero-section</span>
          </div>
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-yellow-400/80" />
            <span className="size-2.5 rounded-full bg-green-400/80" />
          </div>
        </div>

        {/* canvas body */}
        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-[linear-gradient(to_right,rgba(128,128,128,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.12)_1px,transparent_1px)] bg-[size:26px_26px] [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]">
          {/* measurement guides — vertical pinned to the text's left edge, horizontal across its mid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 bottom-[40%] border-t border-dashed border-brand/40"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-6 left-[18%] border-l border-dashed border-brand/40"
          />
          {/* measurement label at the intersection */}
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-[12%] flex -translate-x-1/2 translate-y-0 items-center gap-1 rounded bg-brand/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-brand"
          >
            <MousePointer2 className="size-2.5" />
            24
          </div>
          <span
            aria-hidden="true"
            className="relative -mt-4 translate-x-[5%] text-5xl font-semibold tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(128,128,128,0.55)]"
          >
            Hero Section
          </span>
        </div>
      </div>
    </div>
  );
}
