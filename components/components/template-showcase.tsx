import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TemplateShowcaseProps {
  videoSrc: string;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export default function TemplateShowcase({
  videoSrc,
  actions,
  className,
}: TemplateShowcaseProps) {
  return (
    <div
      className={cn(
        "not-prose relative my-5 overflow-hidden rounded-xl border border-border/60 bg-card",
        className,
      )}
    >
      {/* Top bar */}
      <div className="flex h-10 items-center justify-between px-4">
        <span className="text-sm font-medium text-muted-foreground">
          Preview
        </span>
      </div>

      {/* Video */}
      <div className="relative border-t border-border/40">
        <video
          autoPlay
          loop
          muted
          src={videoSrc}
          className="w-full aspect-4/3 md:aspect-video object-cover"
        />
      </div>

      {/* Actions */}
      {actions && (
        <div className="flex flex-col items-start gap-3 border-t border-border/40 p-4 sm:flex-row">
          {actions}
        </div>
      )}
    </div>
  );
}
