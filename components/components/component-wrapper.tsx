"use client";

import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { RotateCcw } from "lucide-react";
import React from "react";
import { OpenInV0Button } from "./open-in-v0-button";
import { registryItemUrl } from "@/lib/links";

interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  stageClassName?: string;
}

export const ComponentWrapper = ({
  className,
  children,
  name,
  stageClassName,
}: ComponentWrapperProps) => {
  const [key, setKey] = React.useState(0);

  return (
    <div
      className={cn(
        "relative rounded-[9px] border bg-background p-2 pt-9",
        className,
      )}
      key={key}
    >
      {/* <div
        className={cn(
          `absolute inset-0 size-full`,
          `bg-[radial-gradient(#00000022_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff22_1px,transparent_1px)]`,
          "lab-bg pointer-events-none [background-size:16px_16px]",
        )}
      /> */}
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

      <div
        className={cn(
          "flex min-h-72 w-full items-center justify-center overflow-hidden p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10",
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
