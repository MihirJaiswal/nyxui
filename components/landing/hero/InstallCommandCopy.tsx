"use client";

import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

const INSTALL_COMMAND = "npx shadcn add https://nyxui.com/r/glow-card.json";

export function InstallCommandCopy(): React.ReactElement {
  const { copy, hasCopied } = useCopyToClipboard();

  return (
    <code className="relative z-10 mt-2 inline-flex max-w-full items-center gap-1 overflow-hidden text-xs text-muted-foreground px-12">
      <span className="truncate">
        <span className="text-brand">npx</span> shadcn add https://nyxui.com/r/glow-card.json
      </span>
      <button
        type="button"
        onClick={() => copy(INSTALL_COMMAND)}
        className="inline-flex shrink-0 items-center text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Copy install command"
      >
        {hasCopied ? (
          <Check className="size-3 text-brand" />
        ) : (
          <Copy className="size-3" />
        )}
      </button>
    </code>
  );
}
