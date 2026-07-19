"use client";

import {
  ChevronDown,
  Link2,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import type {
  ComponentDefinition,
  ComponentConfig,
  ComponentProp,
  ComponentPropValue,
} from "./types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import CodeEditor from "./CodeEditor";

interface PropertyEditorProps {
  component: ComponentDefinition;
  config: ComponentConfig;
  onChange: (property: string, value: ComponentPropValue) => void;
  onResetAll: () => void;
  onResetProperty: (property: string) => void;
  onCopyLink: () => void;
}

const namedColorHex: Record<string, string> = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#000000",
};

const colorValuePattern =
  /^(#[0-9a-f]{3,8}|rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}|(\d{1,3}\s*,\s*){2}\d{1,3})/i;

function componentToHex(component: number): string {
  return Math.max(0, Math.min(255, component)).toString(16).padStart(2, "0");
}

function rgbToHex(red: number, green: number, blue: number): string {
  return `#${componentToHex(red)}${componentToHex(green)}${componentToHex(blue)}`;
}

function hexToRgbTriplet(hex: string): string {
  const normalizedHex = hex.replace("#", "");
  const red = Number.parseInt(normalizedHex.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHex.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHex.slice(4, 6), 16);

  return `${red}, ${green}, ${blue}`;
}

function getColorPickerValue(value: string): string {
  const trimmedValue = value.trim();

  if (/^#[0-9a-f]{6}$/i.test(trimmedValue)) {
    return trimmedValue;
  }

  if (/^#[0-9a-f]{3}$/i.test(trimmedValue)) {
    const [, red, green, blue] = trimmedValue;
    return `#${red}${red}${green}${green}${blue}${blue}`;
  }

  const rgbMatch = trimmedValue.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i,
  );

  if (rgbMatch) {
    return rgbToHex(
      Number(rgbMatch[1]),
      Number(rgbMatch[2]),
      Number(rgbMatch[3]),
    );
  }

  const tripletMatch = trimmedValue.match(
    /^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/,
  );

  if (tripletMatch) {
    return rgbToHex(
      Number(tripletMatch[1]),
      Number(tripletMatch[2]),
      Number(tripletMatch[3]),
    );
  }

  return namedColorHex[trimmedValue.toLowerCase()] ?? "#000000";
}

function isColorText(value: ComponentPropValue): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const trimmedValue = value.trim();
  return (
    colorValuePattern.test(trimmedValue) ||
    trimmedValue.toLowerCase() in namedColorHex
  );
}

function isRecordValue(
  value: ComponentPropValue,
): value is Record<string, ComponentPropValue> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function isColorArrayValue(value: ComponentPropValue): value is string[] {
  return Array.isArray(value) && value.every(isColorText);
}

function isColorMapValue(
  value: ComponentPropValue,
): value is Record<string, string> {
  return isRecordValue(value) && Object.values(value).every(isColorText);
}

const PropertyEditor = ({
  component,
  config,
  onChange,
  onResetAll,
  onResetProperty,
  onCopyLink,
}: PropertyEditorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});

  const isDefaultValue = (property: string, prop: ComponentProp): boolean =>
    JSON.stringify(config[property] ?? prop.default) ===
    JSON.stringify(prop.default);

  const renderInput = (property: string, prop: ComponentProp) => {
    const value = config[property] ?? prop.default;

    const renderColorValueControl = (
      label: string,
      colorValue: string,
      onValueChange: (nextValue: string) => void,
      colorFormat: ComponentProp["colorFormat"] = "css",
    ) => {
      const pickerValue = getColorPickerValue(colorValue);

      return (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={pickerValue}
            onChange={(event) =>
              onValueChange(
                colorFormat === "rgb-triplet"
                  ? hexToRgbTriplet(event.target.value)
                  : event.target.value,
              )
            }
            className="h-9 w-9 shrink-0 cursor-pointer rounded-md border border-border bg-transparent p-0.5"
          />
          <div className="min-w-0 flex-1 space-y-1">
            <div className="text-[11px] font-medium text-muted-foreground">
              {label}
            </div>
            <Input
              type="text"
              value={colorValue}
              onChange={(event) => onValueChange(event.target.value)}
              className="h-8 border-border/70 bg-background font-mono text-xs"
            />
          </div>
        </div>
      );
    };

    switch (prop.type) {
      case "string": {
        return (
          <Input
            type="text"
            value={String(value || "")}
            onChange={(e) => onChange(property, e.target.value)}
            placeholder={prop.placeholder || prop.label}
            className="h-9 border-border/70 bg-background text-sm"
            style={{
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          />
        );
      }

      case "textarea": {
        // Use CodeEditor for code/children props, regular textarea for others
        const isCodeField = property === "children" || property === "code";
        if (isCodeField) {
          return (
            <CodeEditor
              value={String(value || "")}
              onChange={(newValue) => onChange(property, newValue)}
              language="tsx"
              placeholder={
                prop.placeholder || `Enter ${prop.label.toLowerCase()}...`
              }
              className="min-h-[200px] w-full"
              style={{
                scrollBehavior: "smooth",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            />
          );
        } else {
          return (
            <Textarea
              value={String(value || "")}
              onChange={(e) => onChange(property, e.target.value)}
              placeholder={
                prop.placeholder || `Enter ${prop.label.toLowerCase()}...`
              }
              className="min-h-[96px] resize-none border-border/70 bg-background text-sm"
              rows={4}
              style={{
                overflowY: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "var(--border) transparent",
              }}
            />
          );
        }
      }

      case "number": {
        const numValue = Number(value) || 0;
        return (
          <div className="space-y-2">
            <Input
              type="number"
              value={numValue.toString()}
              min={prop.min}
              max={prop.max}
              step={prop.step || 1}
              onChange={(e) => {
                const newValue =
                  e.target.value === "" ? 0 : Number(e.target.value);
                onChange(property, newValue);
              }}
              className="h-9 border-border/70 bg-background text-sm"
            />
            {prop.min !== undefined && prop.max !== undefined && (
              <div className="space-y-2">
                <Slider
                  value={[numValue]}
                  onValueChange={(values) => onChange(property, values[0])}
                  min={prop.min}
                  max={prop.max}
                  step={prop.step || 1}
                  className="w-full"
                />
                <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="font-mono">{prop.min}</span>
                  <span className="rounded border border-border/60 bg-background px-2 py-0.5 font-mono text-foreground">
                    {numValue}
                  </span>
                  <span className="font-mono">{prop.max}</span>
                </div>
              </div>
            )}
          </div>
        );
      }

      case "boolean": {
        const boolValue = Boolean(value);
        return (
          <div className="flex h-9 items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {boolValue ? "Enabled" : "Disabled"}
            </span>
            <Switch
              checked={boolValue}
              onCheckedChange={(checked) => onChange(property, checked)}
            />
          </div>
        );
      }

      case "select": {
        const selectValue = value ? String(value) : "";
        return (
          <Select
            value={selectValue}
            onValueChange={(newValue) => onChange(property, newValue)}
          >
            <SelectTrigger className="h-9 border-border/70 bg-background text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {prop.options?.map((option) => (
                <SelectItem key={String(option)} value={String(option)}>
                  {String(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }

      case "color": {
        const colorValue = String(value || "#000000");
        return (
          <div className="rounded-md border border-border/70 bg-background p-2">
            {renderColorValueControl(
              prop.label,
              colorValue,
              (nextValue) => onChange(property, nextValue),
              prop.colorFormat,
            )}
          </div>
        );
      }

      case "object": {
        const objectValue = value && typeof value === "object" ? value : {};

        if (isColorArrayValue(objectValue)) {
          return (
            <div className="space-y-2">
              {objectValue.map((colorValue, index) =>
                renderColorValueControl(
                  `Color ${index + 1}`,
                  colorValue,
                  (nextValue) => {
                    const nextColors = [...objectValue];
                    nextColors[index] = nextValue;
                    onChange(property, nextColors);
                  },
                ),
              )}
            </div>
          );
        }

        if (isColorMapValue(objectValue)) {
          return (
            <div className="space-y-2">
              {Object.entries(objectValue).map(([key, colorValue]) =>
                renderColorValueControl(key, colorValue, (nextValue) =>
                  onChange(property, {
                    ...objectValue,
                    [key]: nextValue,
                  }),
                ),
              )}
            </div>
          );
        }

        return (
          <CodeEditor
            value={JSON.stringify(objectValue, null, 2)}
            onChange={(newValue) => {
              try {
                const parsed = JSON.parse(newValue);
                onChange(property, parsed);
              } catch {
                // Invalid JSON, don't update
              }
            }}
            language="json"
            className="min-h-[140px] w-full rounded-md"
          />
        );
      }

      default: {
        return (
          <Input
            type="text"
            value={String(value || "")}
            onChange={(e) => onChange(property, e.target.value)}
            className="h-9 border-border/70 bg-background text-sm"
          />
        );
      }
    }
  };

  const groupedProps = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return Object.entries(component.props).reduce(
      (acc, [key, prop]) => {
        if (
          prop.conditional &&
          config[prop.conditional.property] !== prop.conditional.value
        ) {
          return acc;
        }

        const searchableText = [
          key,
          prop.label,
          prop.description,
          prop.category,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        if (query && !searchableText.includes(query)) {
          return acc;
        }

        const category = prop.category || "General";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push([key, prop]);
        return acc;
      },
      {} as Record<string, Array<[string, ComponentProp]>>,
    );
  }, [component.props, config, searchQuery]);

  const totalProps = Object.values(groupedProps).reduce(
    (count, props) => count + props.length,
    0,
  );
  const changedProps = Object.entries(component.props).filter(
    ([property, prop]) => !isDefaultValue(property, prop),
  ).length;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-background">
      <div className="border-b border-border/60 bg-background">
        <div className="flex items-start justify-between gap-3 px-3 py-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <h3 className="truncate text-sm font-medium leading-tight">
                {component.name}
              </h3>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {totalProps} props
              {changedProps > 0 ? ` · ${changedProps} changed` : ""}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={onCopyLink}
              className="rounded-md border border-border/70 p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              title="Copy playground link"
            >
              <Link2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onResetAll}
              className="rounded-md border border-border/70 p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              title="Reset all props"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="border-t border-border/50 px-3 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search props..."
              className="h-9 border-border/70 bg-background pl-9 pr-9 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                title="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div>
          {Object.entries(groupedProps).map(([category, props]) => {
            const isCollapsed = collapsedCategories[category] ?? false;
            const changedInCategory = props.filter(
              ([property, prop]) => !isDefaultValue(property, prop),
            ).length;

            return (
              <section
                key={category}
                className="border-b border-border/60 last:border-b-0"
              >
                <button
                  onClick={() =>
                    setCollapsedCategories((prev) => ({
                      ...prev,
                      [category]: !isCollapsed,
                    }))
                  }
                  className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-border/50 bg-background px-3 py-2 text-left transition-colors hover:bg-muted/40"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-medium text-foreground">
                      {category}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {props.length} props
                      {changedInCategory > 0
                        ? ` · ${changedInCategory} changed`
                        : ""}
                    </span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform ${
                      isCollapsed ? "-rotate-90" : ""
                    }`}
                  />
                </button>

                {!isCollapsed && (
                  <div>
                    {props.map(([property, prop], index) => {
                      const changed = !isDefaultValue(property, prop);

                      return (
                        <div
                          key={`${category}-${property}-${index}`}
                          className={`space-y-2 border-b border-l-2 border-b-border/40 px-3 py-3 last:border-b-0 ${
                            changed
                              ? "border-l-primary bg-muted/20"
                              : "border-l-transparent bg-transparent"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0 space-y-1">
                              <Label className="block truncate text-sm font-medium text-foreground">
                                {prop.label}
                              </Label>
                              <div className="flex min-w-0 items-center gap-1.5">
                                <span className="truncate font-mono text-[11px] text-muted-foreground">
                                  {property}
                                </span>
                                {changed && (
                                  <>
                                    <span className="text-[11px] text-muted-foreground">
                                      ·
                                    </span>
                                    <span className="text-[11px] text-primary">
                                      changed
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            {changed && (
                              <button
                                onClick={() => onResetProperty(property)}
                                className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                title={`Reset ${prop.label}`}
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                          {renderInput(property, prop)}
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}

          {totalProps === 0 && (
            <div className="rounded-md border border-dashed border-border bg-background/70 p-6 text-center text-sm text-muted-foreground">
              No props match your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyEditor;
