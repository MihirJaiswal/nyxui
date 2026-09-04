import { cn } from "@/lib/utils";

/**
 * Centered "no results" / empty-state message.
 */
export function EmptyState({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "py-6 text-center text-sm text-muted-foreground",
        className,
      )}
    >
      {message}
    </p>
  );
}
