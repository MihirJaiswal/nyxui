"use client";

import { Input } from "@/components/ui/input";
import { hexToRgbString } from "@/lib/colors";
import type { ComponentProp } from "@/types/playground";
import { getColorPickerValue } from "@/lib/playground-color-utils";

interface ColorValueControlProps {
  label: string;
  value: string;
  onValueChange: (nextValue: string) => void;
  colorFormat?: ComponentProp["colorFormat"];
}

export function ColorValueControl({
  label,
  value,
  onValueChange,
  colorFormat = "css",
}: ColorValueControlProps) {
  const pickerValue = getColorPickerValue(value);

  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={pickerValue}
        onChange={(event) =>
          onValueChange(
            colorFormat === "rgb-triplet"
              ? hexToRgbString(event.target.value)
              : event.target.value,
          )
        }
        aria-label={label || "Color value"}
        className="h-10 w-10 shrink-0 cursor-pointer rounded-md bg-transparent p-0.5"
      />
      <div className="min-w-0 flex-1 space-y-1">
        {label && (
          <span className="block truncate text-[11px] text-muted-foreground">
            {label}
          </span>
        )}
        <Input
          type="text"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          className="h-8 border-border/60 bg-background font-mono text-xs"
        />
      </div>
    </div>
  );
}
