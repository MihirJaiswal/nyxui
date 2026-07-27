import { cn } from "@/lib/utils";

interface PhantomLineProps {
  position: "top" | "bottom";
  className?: string;
}

export const PhantomLine = ({ position, className }: PhantomLineProps) => (
  <span
    className={cn(
      "pointer-events-none absolute inset-x-0 flex h-px items-center gap-3",
      position === "top"
        ? "bottom-full translate-y-1/2"
        : "top-full -translate-y-1/2",
      className,
    )}
    aria-hidden="true"
  >
    <span className="flex w-11 shrink-0 items-center">
      <span className="block h-px w-8 shrink-0 bg-foreground/30" />
    </span>
  </span>
);
