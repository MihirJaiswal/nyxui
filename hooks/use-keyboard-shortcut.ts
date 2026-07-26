"use client";

import { useEffect } from "react";

interface KeyboardShortcutOptions {
  /** Require the Cmd key (macOS) or Ctrl key (other platforms). */
  modKey?: boolean;
  /** Require the Meta/Cmd key specifically. */
  metaKey?: boolean;
  /** Require the Ctrl key specifically. */
  ctrlKey?: boolean;
  /** Require the Shift key. */
  shiftKey?: boolean;
  /** Skip the shortcut when typing in an input/textarea/contenteditable (default true). */
  ignoreInputs?: boolean;
  /** Call `event.preventDefault()` when the shortcut fires (default true). */
  preventDefault?: boolean;
}

/**
 * Register a global keyboard shortcut.
 *
 * - `key` is compared against `KeyboardEvent.key` (case-insensitive).
 * - `modKey` requires Cmd (macOS) or Ctrl (other platforms) — use this
 *   for cross-platform "Cmd/Ctrl+K" style shortcuts.
 * - Other modifier flags require that specific modifier when set to `true`.
 * - `ignoreInputs` (default `true`) skips the shortcut when the user is
 *   typing in an `<input>`, `<textarea>`, or `contenteditable` element.
 */
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

  useEffect(() => {
    const keys = Array.isArray(key)
      ? key.map((k) => k.toLowerCase())
      : [key.toLowerCase()];

    const handleKeyDown = (event: KeyboardEvent) => {
      if (modKey && !(event.metaKey || event.ctrlKey)) return;
      if (metaKey && !event.metaKey) return;
      if (ctrlKey && !event.ctrlKey) return;
      if (shiftKey && !event.shiftKey) return;

      // When no modifiers are required, ignore events that have modifiers
      // held (so plain keys don't fire while e.g. Cmd is down).
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
      callback(event);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    key,
    callback,
    modKey,
    metaKey,
    ctrlKey,
    shiftKey,
    ignoreInputs,
    preventDefault,
  ]);
}
