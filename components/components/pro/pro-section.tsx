import { cn } from "@/lib/utils";

/**
 * The landing page's section shell: a full-bleed band with a horizontal rule
 * underneath, and content held inside vertical rails at max-w-295.
 *
 * Pro pages use the same shell so they read as part of the site rather than
 * bolted-on marketing.
 */
export function ProSection({
  children,
  className,
  bordered = true,
}: {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative left-1/2 w-screen -translate-x-1/2",
        bordered && "border-b border-border/60",
      )}
    >
      <div
        className={cn("mx-auto max-w-295 border-x border-border/60", className)}
      >
        {children}
      </div>
    </section>
  );
}

/** Standard cell padding, matching the landing page's grid cells. */
export const CELL = "px-6 py-10 sm:px-10 sm:py-12 md:px-12";

/** Mono uppercase brand label that opens each section. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-widest text-brand uppercase">
      {children}
    </p>
  );
}

export default ProSection;
