"use client";

import { useState } from "react";
import type { ComponentPropValue } from "@/types/playground";
import CodeEditor from "./CodeEditor";

interface JsonObjectEditorProps {
  value: Record<string, ComponentPropValue>;
  onChange: (next: Record<string, ComponentPropValue>) => void;
}

export function JsonObjectEditor({ value, onChange }: JsonObjectEditorProps) {
  const [draft, setDraft] = useState(() => JSON.stringify(value, null, 2));
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-1">
      <CodeEditor
        value={draft}
        onChange={(newValue) => {
          setDraft(newValue);
          try {
            const parsed = JSON.parse(newValue);
            setError(null);
            onChange(parsed);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Invalid JSON");
          }
        }}
        language="json"
        className="w-full"
        maxHeight={200}
      />
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  );
}
