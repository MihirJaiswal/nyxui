"use client";

import { useCallback, useRef } from "react";
import { useEventListener } from "./use-event-listener";

interface KeyboardShortcutOptions {
  modKey?: boolean;
  metaKey?: boolean;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  ignoreInputs?: boolean;
  preventDefault?: boolean;
}

export function useKeyboardShortcut(
  key: string | string[],
  callback: (event: KeyboardEvent) => void,
  options: KeyboardShortcutOptions = {},
): void {
  const {
    modKey = false,
    metaKey = false,
    ctrlKey = false,
    shiftKey = false,
    ignoreInputs = true,
    preventDefault = true,
  } = options;

  const savedCallback = useRef(callback);
  savedCallback.current = callback;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const keys = Array.isArray(key)
        ? key.map((k) => k.toLowerCase())
        : [key.toLowerCase()];

      if (modKey && !(event.metaKey || event.ctrlKey)) return;
      if (metaKey && !event.metaKey) return;
      if (ctrlKey && !event.ctrlKey) return;
      if (shiftKey && !event.shiftKey) return;

      if (
        !modKey &&
        !metaKey &&
        !ctrlKey &&
        !shiftKey &&
        (event.metaKey || event.ctrlKey || event.altKey)
      ) {
        return;
      }

      if (!keys.includes(event.key.toLowerCase())) return;

      if (ignoreInputs) {
        const target = event.target as HTMLElement | null;
        const tag = target?.tagName.toLowerCase();
        if (
          tag === "input" ||
          tag === "textarea" ||
          target?.isContentEditable ||
          target?.closest("[contenteditable]")
        ) {
          return;
        }
      }

      if (preventDefault) {
        event.preventDefault();
      }
      savedCallback.current(event);
    },
    [key, modKey, metaKey, ctrlKey, shiftKey, ignoreInputs, preventDefault],
  );

  useEventListener("keydown", handleKeyDown);
}
