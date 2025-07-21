"use client";

import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { RotateCcw } from "lucide-react";
import React from "react";
import { OpenInV0Button } from "./open-in-v0-button";

interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

export const ComponentWrapper = ({
  className,
  children,
  name,
}: ComponentWrapperProps) => {
  const [key, setKey] = React.useState(0);

  return (
    <div
      className={cn(
        "max-w-screen relative rounded-xl border bg-background",
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
      <div className="flex items-center justify-end gap-2 p-4">
        <OpenInV0Button url={`https://nyxui.vercel.app/r/${name}.json`} />
        <Button
          onClick={() => setKey((prev) => prev + 1)}
          className="flex items-center rounded-lg px-3 py-1 relative z-30"
          variant="ghost"
        >
          <RotateCcw aria-label="restart-btn" size={16} />
        </Button>
      </div>

      <div className="flex min-h-[400px] w-full items-center justify-center p-2 md:p-10">
        {children}
      </div>
    </div>
  );
};
