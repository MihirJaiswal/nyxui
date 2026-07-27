import { Search, X } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  value: string;
  onValueChange: (value: string) => void;
  shortcutKey?: string;
  isFocused?: boolean;
  size?: "sm" | "md";
  containerClassName?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onValueChange,
      shortcutKey,
      isFocused = false,
      size = "md",
      containerClassName,
      className,
      placeholder = "Search...",
      ...inputProps
    },
    ref,
  ) => {
    const showClear = value.length > 0;
    const showShortcutHint = !showClear && Boolean(shortcutKey);

    return (
      <div className={cn("relative", containerClassName)}>
        <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-lg bg-muted/50 pl-9 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:bg-background focus:outline-none",
            size === "md" ? "h-9 py-2" : "h-8",
            showClear || showShortcutHint ? "pr-14" : "pr-8",
            className,
          )}
          {...inputProps}
        />
        {showClear && (
          <button
            type="button"
            onClick={() => onValueChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        )}
        {showShortcutHint && (
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border/60 bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            {isFocused ? "esc" : shortcutKey}
          </kbd>
        )}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
