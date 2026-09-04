import { Maximize } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateShowcaseProps {
  videoSrc: string;
  fullscreenHref?: string;
  className?: string;
}

export default function TemplateShowcase({
  videoSrc,
  fullscreenHref,
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
        {fullscreenHref && (
          <a
            href={fullscreenHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-7 items-center justify-center rounded-[5px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground dark:hover:bg-muted/50"
            aria-label="Open in full screen"
          >
            <Maximize size={16} />
          </a>
        )}
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
    </div>
  );
}
