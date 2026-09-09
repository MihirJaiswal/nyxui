import { ArrowUpRight, Sparkles } from "lucide-react";
import { PRO_SITE_URL } from "@/registry/Data";
import { cn } from "@/lib/utils";

interface ProCTAProps {
  className?: string;
  title?: string;
  description?: string;
  href?: string;
}

/**
 * Upsell banner rendered at the bottom of docs pages.
 * Links to the nyxui Pro site (premium blocks + templates).
 */
export function ProCTA({
  className,
  title = "Ship faster with nyxui Pro",
  description = "Premium blocks, page templates, and production-ready sections — copy, paste, ship.",
  href = PRO_SITE_URL,
}: ProCTAProps) {
  return (
    <section
      className={cn(
        "mt-12 rounded-[20px] border border-border/60 bg-card p-6 sm:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-4 text-center sm:text-left">
        <div className="space-y-2">
          <h2 className="flex items-center justify-center gap-2 text-lg font-medium text-card-foreground sm:justify-start">
            <Sparkles aria-hidden="true" className="size-4 text-brand" />
            {title}
          </h2>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:mx-0">
            {description}
          </p>
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 self-start rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          Get lifetime access
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
        <p className="text-xs text-muted-foreground">
          One-time purchase · No subscriptions
        </p>
      </div>
    </section>
  );
}

export default ProCTA;
