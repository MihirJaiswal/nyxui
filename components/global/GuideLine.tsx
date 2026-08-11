"use client";

import { forwardRef } from "react";
import { motion, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export const BASE_WIDTH = 32;
export const MAX_WIDTH = 50;
export const SPRING_CONFIG = { stiffness: 1200, damping: 32, mass: 0.12 };
export const LABEL_TRANSITION = {
  type: "spring" as const,
  stiffness: 950,
  damping: 42,
};

interface GuideLineProps {
  width: MotionValue<number>;
  highlighted: boolean;
  className?: string;
}

export const GuideLine = forwardRef<HTMLSpanElement, GuideLineProps>(
  ({ width, highlighted, className }, ref) => (
    <span className="flex w-11 shrink-0 items-center" aria-hidden="true">
      <motion.span
        ref={ref}
        style={{ width }}
        className={cn(
          "block h-px shrink-0 origin-left transition-colors duration-50 ease-out",
          highlighted ? "bg-brand" : "bg-foreground/30",
          "group-focus-within/cmdk:group-data-[selected=true]:bg-brand",
          className,
        )}
      />
    </span>
  ),
);

GuideLine.displayName = "GuideLine";
