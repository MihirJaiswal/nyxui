"use client";

import { useCallback, useState } from "react";

/**
 * Simple boolean toggle state.
 * Returns `[value, toggle, setValue]`.
 */
export function useToggle(
  initial = false,
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initial);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle, setValue];
}
