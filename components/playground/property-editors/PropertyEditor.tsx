"use client";

import { Check, ChevronDown, Link2, RotateCcw, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import type {
  ComponentDefinition,
  ComponentConfig,
  ComponentProp,
  ComponentPropValue,
  ComponentRegistry,
} from "../../../types/playground";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import { PropInput } from "./PropInput";

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
              aria-label="Copy playground link"
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
              aria-label="Reset all props"
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
              aria-label="Clear search"
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
                      aria-label={`Reset ${prop.label}`}
                    >
                      <RotateCcw className="size-3" />
                    </button>
                  )}
                </div>
                <PropInput
                  property={property}
                  prop={prop}
                  value={config[property] ?? prop.default}
                  onChange={onChange}
                />
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
