"use client";

import { useEffect, useState, type ReactElement } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { ComponentPropValue } from "@/types/playground";
import { cn } from "@/lib/utils";
import CodeEditor from "./CodeEditor";

type JsonRecord = Record<string, ComponentPropValue>;
type JsonContainer = ComponentPropValue[] | JsonRecord;

interface JsonObjectEditorProps {
  value: ComponentPropValue;
  onChange: (next: ComponentPropValue) => void;
}

interface JsonValueFieldProps {
  label: string;
  value: ComponentPropValue;
  onChange: (next: ComponentPropValue) => void;
  onRemove?: () => void;
  depth: number;
}

function isJsonRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isJsonContainer(value: unknown): value is JsonContainer {
  return Array.isArray(value) || isJsonRecord(value);
}

function formatFieldLabel(label: string): string {
  return label
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (character) => character.toUpperCase());
}

function valueSummary(value: JsonContainer): string {
  if (Array.isArray(value)) {
    return `${value.length} ${value.length === 1 ? "item" : "items"}`;
  }

  const count = Object.keys(value).length;
  return `${count} ${count === 1 ? "field" : "fields"}`;
}

function createEmptyItem(items: ComponentPropValue[]): ComponentPropValue {
  const example = items.at(-1);

  if (typeof example === "number") return 0;
  if (typeof example === "boolean") return false;
  if (Array.isArray(example)) return [];
  if (isJsonRecord(example)) {
    return Object.fromEntries(
      Object.entries(example).map(([key, fieldValue]) => [
        key,
        createEmptyItem([fieldValue]),
      ]),
    );
  }

  return "";
}

function JsonFields({
  value,
  onChange,
  depth,
}: {
  value: JsonRecord;
  onChange: (next: JsonRecord) => void;
  depth: number;
}): ReactElement {
  return (
    <div className="space-y-3">
      {Object.entries(value).map(([key, fieldValue]) => (
        <JsonValueField
          key={key}
          label={key}
          value={fieldValue}
          depth={depth}
          onChange={(nextValue) => onChange({ ...value, [key]: nextValue })}
        />
      ))}
    </div>
  );
}

function JsonArray({
  value,
  onChange,
  depth,
}: {
  value: ComponentPropValue[];
  onChange: (next: ComponentPropValue[]) => void;
  depth: number;
}): ReactElement {
  return (
    <div className="space-y-3">
      {value.map((item, index) => (
        <JsonValueField
          key={`${index}-${typeof item}`}
          label={`Item ${index + 1}`}
          value={item}
          depth={depth}
          onChange={(nextValue) => {
            const nextItems = [...value];
            nextItems[index] = nextValue;
            onChange(nextItems);
          }}
          onRemove={() =>
            onChange(value.filter((_, itemIndex) => itemIndex !== index))
          }
        />
      ))}

      <button
        type="button"
        onClick={() => onChange([...value, createEmptyItem(value)])}
        className="flex h-8 w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-border/70 text-xs text-muted-foreground transition-colors hover:border-brand/60 hover:text-brand"
      >
        <Plus className="size-3" />
        Add item
      </button>
    </div>
  );
}

function JsonValueField({
  label,
  value,
  onChange,
  onRemove,
  depth,
}: JsonValueFieldProps): ReactElement {
  if (isJsonContainer(value)) {
    return (
      <Collapsible
        defaultOpen={depth === 0}
        className="rounded-lg border border-border/60 bg-background/40"
      >
        <div className="flex items-center gap-1 pr-1.5">
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="flex min-w-0 flex-1 items-center gap-2 px-2.5 py-2 text-left text-xs transition-colors hover:text-brand"
            >
              <ChevronDown className="size-3 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate font-medium">
                {formatFieldLabel(label)}
              </span>
              <span className="shrink-0 text-[11px] text-muted-foreground">
                {valueSummary(value)}
              </span>
            </button>
          </CollapsibleTrigger>
          {onRemove && <RemoveButton onClick={onRemove} label={label} />}
        </div>
        <CollapsibleContent>
          <div className="border-t border-border/60 p-2.5">
            {Array.isArray(value) ? (
              <JsonArray value={value} onChange={onChange} depth={depth + 1} />
            ) : (
              <JsonFields value={value} onChange={onChange} depth={depth + 1} />
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex min-h-4 items-center justify-between gap-2">
        <span className="min-w-0 truncate text-xs font-medium text-muted-foreground">
          {formatFieldLabel(label)}
        </span>
        {onRemove && <RemoveButton onClick={onRemove} label={label} />}
      </div>
      {typeof value === "boolean" ? (
        <div className="flex h-9 items-center justify-between rounded-md border border-border/60 bg-background px-2.5">
          <span className="text-xs text-muted-foreground">
            {value ? "Enabled" : "Disabled"}
          </span>
          <Switch checked={value} onCheckedChange={onChange} />
        </div>
      ) : value === null ? (
        <div className="flex h-9 items-center rounded-md border border-border/60 bg-muted/30 px-2.5 font-mono text-xs text-muted-foreground">
          null — edit in Advanced JSON
        </div>
      ) : (
        <Input
          type={typeof value === "number" ? "number" : "text"}
          value={String(value)}
          aria-label={formatFieldLabel(label)}
          onChange={(event) => {
            if (typeof value !== "number") {
              onChange(event.target.value);
              return;
            }

            const nextValue = Number(event.target.value);
            if (Number.isFinite(nextValue)) onChange(nextValue);
          }}
          className="h-9 border-border/60 bg-background text-sm"
        />
      )}
    </div>
  );
}

function RemoveButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}): ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
      aria-label={`Remove ${formatFieldLabel(label)}`}
      title={`Remove ${formatFieldLabel(label)}`}
    >
      <Trash2 className="size-3" />
    </button>
  );
}

export function JsonObjectEditor({
  value,
  onChange,
}: JsonObjectEditorProps): ReactElement {
  const [draft, setDraft] = useState(
    () => JSON.stringify(value, null, 2) ?? "",
  );
  const [error, setError] = useState<string | null>(null);
  const serializedValue = JSON.stringify(value, null, 2) ?? "";

  useEffect(() => {
    setDraft(serializedValue);
    setError(null);
  }, [serializedValue]);

  const containerValue: JsonContainer = isJsonContainer(value) ? value : {};

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border/60 bg-muted/20 p-2.5">
        {Array.isArray(containerValue) ? (
          <JsonArray value={containerValue} onChange={onChange} depth={0} />
        ) : (
          <JsonFields value={containerValue} onChange={onChange} depth={0} />
        )}
      </div>

      <Collapsible className="rounded-lg border border-border/60">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex w-full items-center justify-between px-2.5 py-2 text-left text-xs font-medium text-muted-foreground transition-colors",
              "hover:text-foreground",
            )}
          >
            Advanced JSON
            <ChevronDown className="size-3" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="border-t border-border/60 p-2.5">
            <CodeEditor
              value={draft}
              onChange={(nextDraft) => {
                setDraft(nextDraft);
                try {
                  const parsed: unknown = JSON.parse(nextDraft);
                  if (!isJsonContainer(parsed)) {
                    setError("JSON data must be an object or array.");
                    return;
                  }
                  setError(null);
                  onChange(parsed);
                } catch (parseError) {
                  setError(
                    parseError instanceof Error
                      ? parseError.message
                      : "Invalid JSON",
                  );
                }
              }}
              language="json"
              className="w-full"
              maxHeight={250}
            />
            {error && (
              <p className="mt-1 text-[11px] text-destructive">{error}</p>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
