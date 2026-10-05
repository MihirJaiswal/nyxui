"use client";

import { useLayoutEffect, useState } from "react";

export const SIDEBAR_PX_LG = 260;
export const SIDEBAR_PX_XL = 310;
export const SIDEBAR_INNER_CLASSNAME =
  "flex h-[var(--content-h)] flex-col overflow-hidden rounded-[20px] border border-border/70 bg-card shadow-sm";
export const SIDEBAR_OUTER_CLASSNAME =
  "flex flex-col lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:py-4";
export const MAIN_OUTER_CLASSNAME = "flex flex-col min-w-0 lg:pl-8 xl:pl-24";
const XL_MQ = "(min-width: 1280px)";

export function getSidebarPx(): number {
  if (typeof window !== "undefined" && window.matchMedia(XL_MQ).matches) {
    return SIDEBAR_PX_XL;
  }
  return SIDEBAR_PX_LG;
}

// Keep backward-compatible alias for SSR fallbacks
export const SIDEBAR_PX = SIDEBAR_PX_LG;

export const useSidebarPanelSizes = (
  containerRef: React.RefObject<HTMLDivElement | null>,
) => {
  const [sizes, setSizes] = useState<{
    sidebarPct: number;
    minSidebarPct: number;
  } | null>(null);

  useLayoutEffect(() => {
    // Read the ref inside update() rather than capturing it once. Capturing it
    // meant that if the effect ever ran while the ref was still null — which
    // happens on React's StrictMode remount, where the cleanup disconnects the
    // observer before the ref is reattached — the effect bailed out early and
    // left nothing observing anything for the rest of the session. The symptom
    // was that the sidebar never re-measured on window resize, so it kept a
    // stale percentage and its pixel width scaled with the viewport.
    const update = () => {
      const el = containerRef.current;
      if (!el) return;

      const total = el.offsetWidth;
      if (total > 0) {
        const px = getSidebarPx();
        const pct = (px / total) * 100;
        setSizes({ sidebarPct: pct, minSidebarPct: pct });
      }
    };

    update();

    // The observer is the precise signal (it catches container changes that do
    // not come from the window, like the sidebar being collapsed). The window
    // listener is the safety net for the case above.
    const el = containerRef.current;
    const ro = new ResizeObserver(update);
    if (el) ro.observe(el);

    window.addEventListener("resize", update);
    const mq = window.matchMedia(XL_MQ);
    mq.addEventListener("change", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
    };
  }, [containerRef]);

  return sizes;
};
