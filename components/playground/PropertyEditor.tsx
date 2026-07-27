"use client";

import { Check, ChevronDown, Link2, RotateCcw, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type {
  ComponentDefinition,
  ComponentConfig,
  ComponentProp,
  ComponentPropValue,
  ComponentRegistry,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import CodeEditor from "./CodeEditor";
import { cn } from "@/lib/utils";
import { componentToHex, rgbToHex, hexToRgbString } from "@/lib/colors";
import { EmptyState } from "@/components/ui/empty-state";

interface PropertyEditorProps {
  component: ComponentDefinition;
  components: ComponentRegistry;
  selectedComponent: string;
  config: ComponentConfig;
  onChange: (property: string, value: ComponentPropValue) => void;
  onResetAll: () => void;
  onResetProperty: (property: string) => void;
  onCopyLink: () => void;
  linkCopied?: boolean;
  onSelectComponent: (key: string) => void;
}

const namedColorHex: Record<string, string> = {
  black: "#000000",
  white: "#ffffff",
  transparent: "#000000",
};

const colorValuePattern =
  /^(#[0-9a-f]{3,8}|rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}|(\d{1,3}\s*,\s*){2}\d{1,3})/i;

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
  components,
  selectedComponent,
  config,
  onChange,
  onResetAll,
  onResetProperty,
  onCopyLink,
  linkCopied = false,
  onSelectComponent,
}: PropertyEditorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [componentSearch, setComponentSearch] = useState("");
  const [isComponentDropdownOpen, setIsComponentDropdownOpen] = useState(false);

  const filteredComponents = useMemo(() => {
    const query = componentSearch.trim().toLowerCase();
    return Object.entries(components)
      .filter(
        ([key, comp]) =>
          comp.name.toLowerCase().includes(query) ||
          key.toLowerCase().includes(query),
      )
      .sort(([, a], [, b]) => a.name.localeCompare(b.name));
  }, [components, componentSearch]);

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
                  ? hexToRgbString(event.target.value)
                  : event.target.value,
              )
            }
            className="h-10 w-10 shrink-0 cursor-pointer rounded-md  bg-transparent p-0.5"
          />
          <div className="min-w-0 flex-1 space-y-1">
            <Input
              type="text"
              value={colorValue}
              onChange={(event) => onValueChange(event.target.value)}
              className="h-8 border-border/60 bg-background font-mono text-xs"
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
            className="h-9 border-border/60 bg-background text-sm"
          />
        );
      }

      case "textarea": {
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
              className="w-full"
              maxHeight={300}
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
              className="min-h-[96px] resize-none border-border/60 bg-background text-sm"
              rows={4}
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
              className="h-9 border-border/60 bg-background text-sm"
            />
            {prop.min !== undefined && prop.max !== undefined && (
              <div className="space-y-2">
                <Slider
                  value={[numValue]}
                  onValueChange={(values) => onChange(property, values[0])}
                  min={prop.min}
                  max={prop.max}
                  step={prop.step || 1}
                  className="w-full pt-1"
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
            <SelectTrigger className="h-9 border-border/60 bg-background text-sm">
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
          <div>
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
            className="w-full"
            maxHeight={200}
          />
        );
      }

      default: {
        return (
          <Input
            type="text"
            value={String(value || "")}
            onChange={(e) => onChange(property, e.target.value)}
            className="h-9 border-border/60 bg-background text-sm"
          />
        );
      }
    }
  };

  const filteredProps = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return Object.entries(component.props).filter(([key, prop]) => {
      if (
        prop.conditional &&
        config[prop.conditional.property] !== prop.conditional.value
      ) {
        return false;
      }

      const searchableText = [key, prop.label, prop.description, prop.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return !query || searchableText.includes(query);
    });
  }, [component.props, config, searchQuery]);

  const totalProps = filteredProps.length;

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border/60 px-1.5 py-4">
        <div className="flex items-center justify-between gap-3">
          <Popover
            open={isComponentDropdownOpen}
            onOpenChange={(open) => {
              setIsComponentDropdownOpen(open);
              if (!open) setComponentSearch("");
            }}
          >
            <PopoverTrigger asChild>
              <button className="flex min-w-0 flex-1 items-center gap-1.5 text-left">
                <h3 className="min-w-0 truncate text-sm font-medium">
                  {component.name}
                </h3>
                <ChevronDown
                  className={cn(
                    "size-3.5 shrink-0 text-muted-foreground transition-transform",
                    isComponentDropdownOpen && "rotate-180",
                  )}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[280px] p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search components..."
                  value={componentSearch}
                  onValueChange={setComponentSearch}
                />
                <CommandList className="max-h-64">
                  <CommandEmpty>No components found</CommandEmpty>
                  <CommandGroup>
                    {filteredComponents.map(([key, comp]) => (
                      <CommandItem
                        key={key}
                        value={key}
                        onSelect={() => {
                          onSelectComponent(key);
                          requestAnimationFrame(() =>
                            setIsComponentDropdownOpen(false),
                          );
                        }}
                        className={cn(
                          key === selectedComponent &&
                            "font-medium text-foreground",
                        )}
                      >
                        {comp.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={onCopyLink}
              className={cn(
                "rounded-md p-1.5 transition-colors hover:bg-muted",
                linkCopied
                  ? "text-primary hover:text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title="Copy playground link"
            >
              {linkCopied ? (
                <Check className="size-3.5" />
              ) : (
                <Link2 className="size-3.5" />
              )}
            </button>
            <button
              onClick={onResetAll}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              title="Reset all props"
            >
              <RotateCcw className="size-3.5" />
            </button>
          </div>
        </div>

        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search props..."
            className="h-8 border-border/60 bg-muted/50 pl-9 pr-8 text-sm focus-visible:bg-background"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pt-4 scrollbar-no">
        <div className="space-y-6">
          {filteredProps.map(([property, prop], index) => {
            const changed = !isDefaultValue(property, prop);

            return (
              <div key={`${property}-${index}`} className="space-y-2 px-1.5">
                <div className="flex items-center justify-between gap-3">
                  <Label
                    className={cn(
                      "block truncate text-sm font-medium",
                      changed ? "text-primary" : "text-foreground",
                    )}
                  >
                    {prop.label}
                  </Label>
                  {changed && (
                    <button
                      onClick={() => onResetProperty(property)}
                      className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      title={`Reset ${prop.label}`}
                    >
                      <RotateCcw className="size-3" />
                    </button>
                  )}
                </div>
                {renderInput(property, prop)}
              </div>
            );
          })}

          {totalProps === 0 && (
            <EmptyState message="No props match your search." />
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyEditor;
