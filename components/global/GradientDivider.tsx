import { cn } from "@/lib/utils";

export function GradientDivider({
  position = "top",
}: {
  position?: "top" | "bottom";
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 h-px w-full",
        position === "top" ? "top-0" : "top-full",
      )}
    >
      <div className="h-full w-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-600" />
    </div>
  );
}
