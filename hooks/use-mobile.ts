"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

function queryMobile(breakpoint: number): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
}

/**
 * Tracks whether the viewport is at or below `breakpoint` (default 768px).
 * Returns `false` during SSR and on first render, then resolves after mount.
 */
export function useMobile(breakpoint: number = MOBILE_BREAKPOINT): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(queryMobile(breakpoint));
    update();

    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
