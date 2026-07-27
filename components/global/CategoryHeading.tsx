import { cn } from "@/lib/utils";

interface CategoryHeadingProps {
  title: string;
  variant?: "strong" | "muted";
  className?: string;
}

export const CategoryHeading = ({
  title,
  variant = "strong",
  className,
}: CategoryHeadingProps) => (
  <h4
    className={cn(
      "mb-2 flex items-center gap-3 text-sm font-medium text-foreground",
      className,
    )}
  >
    <span className="flex w-11 shrink-0 items-center" aria-hidden="true">
      <span
        className={cn(
          "block h-px w-8 shrink-0",
          variant === "strong" ? "bg-foreground/80" : "bg-foreground/30",
        )}
      />
    </span>
    <span className="min-w-0 truncate">{title}</span>
  </h4>
);
