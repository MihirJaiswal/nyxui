"use client";

import { useEffect, useState } from "react";

/**
 * Trails `value` by `delayMs`, resetting the timer on every change.
 *
 * Use this to keep expensive derived work off the typing path — not to delay
 * anything the user is looking at while they type.
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}
