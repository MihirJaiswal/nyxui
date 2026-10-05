"use client";

import { RotateCcw } from "lucide-react";
import { useCallback } from "react";

interface ReplayButtonProps {
  /** Name of the preview this button resets — must match the `name`
      prop given to the enclosing `MockupWrapper`. */
  name: string;
}

/**
 * Replay control for the preview tab header. Lives in an RSC parent so
 * it can't useState in `ComponentPreview`; instead this client island
 * just emits a DOM CustomEvent that `MockupWrapper` listens for.
 */
export function ReplayButton({ name }: ReplayButtonProps) {
  const onClick = useCallback(() => {
    window.dispatchEvent(new CustomEvent("nyxui:replay", { detail: { name } }));
  }, [name]);

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex size-7 items-center justify-center rounded-[5px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground dark:hover:bg-muted/50"
      aria-label="Replay"
    >
      <RotateCcw size={16} />
    </button>
  );
}
