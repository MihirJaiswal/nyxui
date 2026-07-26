import { cn } from "@/lib/utils";

/**
 * Animated spinning loader.
 */
export function LoadingSpinner({
  size = 8,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={cn(
        "border-2 border-primary border-t-transparent rounded-full animate-spin",
        className,
      )}
    />
  );
}
