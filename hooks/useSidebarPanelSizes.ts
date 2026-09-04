"use client";

import { useLayoutEffect, useState } from "react";

// Sidebar's current fixed width (was `lg:w-72`) — used as both the
// default AND the minimum size of the resizable sidebar panel.
export const SIDEBAR_PX = 310;

// Shared classNames so the "not measured yet" fallback layout and the
// real PanelGroup layout look pixel-identical.
export const SIDEBAR_INNER_CLASSNAME =
  "flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm";
export const SIDEBAR_OUTER_CLASSNAME =
  "flex flex-col lg:sticky lg:top-16 lg:h-[calc(85vh+5rem)] lg:py-10";
export const MAIN_OUTER_CLASSNAME = "flex flex-col min-w-0 pl-8 xl:pl-24";

// Converts the fixed SIDEBAR_PX value into a live percentage based on the
// actual measured width of the container, so react-resizable-panels (which
// only understands percentages) still respects a real pixel minimum.
//
// IMPORTANT: this returns `null` until we've actually measured the real
// container on the client. We deliberately do NOT guess a percentage from
// `window.innerWidth` or a hardcoded fallback for the "not measured yet"
// state — any such guess will usually be wrong (e.g. a 25% fallback is
// already bigger than 310px on anything wider than ~1240px), and since SSR
// has no `window` at all, that wrong guess is what actually gets painted
// first. The caller renders a plain fixed-width layout while this is null,
// and only mounts the resizable PanelGroup once it flips to a real value.
export const useSidebarPanelSizes = (
  containerRef: React.RefObject<HTMLDivElement | null>,
) => {
  const [sizes, setSizes] = useState<{
    sidebarPct: number;
    minSidebarPct: number;
  } | null>(null);

  // useLayoutEffect (not useEffect) so the measurement + swap to the real
  // PanelGroup happens synchronously before the browser paints the client
  // render, minimizing any visible flash once we're on the client.
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const total = el.offsetWidth;
      if (total > 0) {
        const pct = (SIDEBAR_PX / total) * 100;
        setSizes({ sidebarPct: pct, minSidebarPct: pct });
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);

  return sizes;
};
