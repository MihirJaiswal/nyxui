"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function useIsMobile(breakpoint = 450): boolean {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}

const DESKTOP_MQ = "(min-width: 1024px)";

function subscribeDesktop(onChange: () => void): () => void {
  const mql = window.matchMedia(DESKTOP_MQ);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * Tracks the Tailwind lg breakpoint — the point where the playground swaps
 * between its resizable two-panel layout and its tabbed one.
 *
 * useSyncExternalStore rather than useState + useEffect: the effect-based
 * hook above reports false on the first client render, which would mount the
 * mobile tree and then swap to desktop, remounting every preview and
 * re-running every highlight in the process.
 *
 * The server snapshot is desktop. The playground is a desktop-first tool, so
 * SSR ships the two-panel tree and desktop visitors hydrate without a swap.
 */
export function useIsDesktop(): boolean {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_MQ).matches,
    () => true,
  );
}
