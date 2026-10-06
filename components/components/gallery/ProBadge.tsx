"use client";

import { Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/** Star icon with a "Pro block" tooltip, rendered inside the count pill. */
export function ProBadge() {
  return (
    <Tooltip>
      <TooltipTrigger
        type="button"
        aria-label="Pro block"
        onClick={(e) => e.preventDefault()}
        className="inline-flex cursor-pointer items-center"
      >
        <Star aria-hidden="true" className="size-2.5 fill-brand text-brand" />
      </TooltipTrigger>
      <TooltipContent sideOffset={6}>Pro Components</TooltipContent>
    </Tooltip>
  );
}
