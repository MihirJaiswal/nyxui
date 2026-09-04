"use client";
import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";

export const ModeToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button> & { className?: string }
>(({ className, ...props }, ref) => {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <Button
        ref={ref}
        variant="ghost"
        type="button"
        size="icon"
        className={cn("px-2", className)}
        aria-label="Toggle theme"
        disabled
        {...props}
      >
        <SunIcon className="size-4 text-neutral-800 dark:hidden dark:text-neutral-200" />
        <MoonIcon className="hidden size-4 text-neutral-800 dark:block dark:text-neutral-200" />
      </Button>
    );
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      type="button"
      size="icon"
      className={cn(
        "px-2 transition-all duration-150 hover:scale-105",
        className,
      )}
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      {...props}
    >
      <SunIcon className="size-4 text-neutral-800 dark:hidden dark:text-neutral-200 transition-all duration-150" />
      <MoonIcon className="hidden size-4 text-neutral-800 dark:block dark:text-neutral-200 transition-all duration-150" />
    </Button>
  );
});

ModeToggle.displayName = "ModeToggle";
