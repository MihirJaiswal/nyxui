"use client";

import { CheckIcon, CopyIcon } from "lucide-react";

import { Event, trackEvent } from "@/lib/event";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface CopyButtonProps extends ButtonProps {
  value: string;
  src: string;
  event?: Event["name"];
}

export function CopyButton({
  value,
  className,
  src,
  variant = "ghost",
  event,
  ...props
}: CopyButtonProps) {
  const { copy, hasCopied } = useCopyToClipboard();

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        "relative z-10 size-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:size-3",
        className,
      )}
      onClick={() => {
        copy(value).then(() => {
          if (event) {
            trackEvent({
              name: event,
              properties: {
                name: src,
                code: value,
              },
            });
          }
        });
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon className="text-brand" /> : <CopyIcon />}
    </Button>
  );
}
