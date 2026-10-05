"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";
import React from "react";
import { OpenInV0Button } from "./open-in-v0-button";
import { registryItemUrl } from "@/lib/links";

interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  stageClassName?: string;
  /** Blocks render edge-to-edge with no stage padding / toolbar. */
  type?: "components" | "blocks";
}

export const ComponentWrapper = ({
  className,
  children,
  name,
  stageClassName,
  type = "components",
}: ComponentWrapperProps) => {
  const [key, setKey] = React.useState(0);
  const isBlock = type === "blocks";

  return (
    <div
      className={cn(
        "relative rounded-[9px] border bg-background overflow-x-hidden",
        className,
      )}
      key={key}
    >
      {/* Blocks skip the v0/replay toolbar — they're presented as-is. */}
      {!isBlock && (
        <div className="absolute right-1 top-1 flex items-center">
          <OpenInV0Button url={registryItemUrl(name)} />
          <Button
            onClick={() => setKey((prev) => prev + 1)}
            className="relative z-30 size-7 rounded-[5px] border-none bg-transparent p-0 text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-muted/50"
            variant="ghost"
            size="icon"
            aria-label="Replay"
          >
            <RotateCcw size={16} />
          </Button>
        </div>
      )}

      <div
        className={cn(
          "flex w-full items-center justify-center overflow-hidden",
          // Components get the padded "stage" so small demos have breathing room;
          // blocks are already full sections and render edge-to-edge.
          isBlock ? "min-h-0" : "min-h-72 p-2 sm:p-4 md:p-6",
          stageClassName,
        )}
      >
        <div className="w-full max-w-full flex items-center justify-center mx-auto">
          <div className="w-full flex items-center justify-center mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
