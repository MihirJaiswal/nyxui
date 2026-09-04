"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  ComponentProp,
  ComponentPropValue,
} from "../../../types/playground";
import CodeEditor from "./CodeEditor";
import { ColorValueControl } from "./ColorValueControl";
import { JsonObjectEditor } from "./JsonObjectEditor";
import {
  isColorArrayValue,
  isColorMapValue,
} from "@/lib/playground-color-utils";

interface PropInputProps {
  property: string;
  prop: ComponentProp;
  value: ComponentPropValue;
  onChange: (property: string, value: ComponentPropValue) => void;
}

export function PropInput({ property, prop, value, onChange }: PropInputProps) {
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
      }
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
        <ColorValueControl
          label=""
          value={colorValue}
          onValueChange={(nextValue) => onChange(property, nextValue)}
          colorFormat={prop.colorFormat}
        />
      );
    }

    case "object": {
      const objectValue = value && typeof value === "object" ? value : {};

      if (isColorArrayValue(objectValue)) {
        return (
          <div className="space-y-2">
            {objectValue.map((colorValue, index) => (
              <div key={index}>
                <ColorValueControl
                  label={`Color ${index + 1}`}
                  value={colorValue}
                  onValueChange={(nextValue) => {
                    const nextColors = [...objectValue];
                    nextColors[index] = nextValue;
                    onChange(property, nextColors);
                  }}
                />
              </div>
            ))}
          </div>
        );
      }

      if (isColorMapValue(objectValue)) {
        return (
          <div className="space-y-2">
            {Object.entries(objectValue).map(([key, colorValue]) => (
              <div key={key}>
                <ColorValueControl
                  label={key}
                  value={colorValue}
                  onValueChange={(nextValue) =>
                    onChange(property, {
                      ...objectValue,
                      [key]: nextValue,
                    })
                  }
                />
              </div>
            ))}
          </div>
        );
      }

      return (
        <JsonObjectEditor
          value={objectValue as Record<string, ComponentPropValue>}
          onChange={(parsed) => onChange(property, parsed)}
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
}
