"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface MockupWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  stageClassName?: string;
}

/**
 * Contained preview stage for Mockup blocks — the bordered rounded
 * preview area from ComponentCard. Title row and Preview/Code tabs
 * live in ComponentPreview; this is just the stage the mockup
 * renders in (padded, widget-sized rather than edge-to-edge).
 */
export const MockupWrapper = ({
  className,
  children,
  name,
  stageClassName,
  ...props
}: MockupWrapperProps) => {
  const [key, setKey] = React.useState(0);

  React.useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ name?: string }>).detail;
      if (detail?.name === name) setKey((k) => k + 1);
    };
    window.addEventListener("nyxui:replay", handler);
    return () => window.removeEventListener("nyxui:replay", handler);
  }, [name]);

  return (
    <div
      key={`${name}-${key}`}
      className={cn("relative flex w-full flex-col", className)}
      {...props}
    >
      <div
        className={cn(
          "inset-ring-shadow relative w-full flex-1 overflow-hidden rounded-2xl border border-background bg-background",
          "flex min-h-96 items-center justify-center",
          "after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-2xl after:shadow-[inset_0_0_0.1px_var(--preview-inset),inset_0_1px_1px_var(--preview-inset)]",
          stageClassName,
        )}
      >
        <div className="flex w-full max-w-full items-center justify-center mx-auto">
          <div className="flex w-full items-center justify-center mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
