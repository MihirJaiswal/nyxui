"use client";

import { useLayoutEffect, useState } from "react";

export const SIDEBAR_PX = 310;
export const SIDEBAR_INNER_CLASSNAME =
  "flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm";
export const SIDEBAR_OUTER_CLASSNAME =
  "flex flex-col lg:sticky lg:top-16 lg:h-[calc(85vh+5rem)] lg:py-10";
export const MAIN_OUTER_CLASSNAME = "flex flex-col min-w-0 pl-8 xl:pl-24";

export const useSidebarPanelSizes = (
  containerRef: React.RefObject<HTMLDivElement | null>,
) => {
  const [sizes, setSizes] = useState<{
    sidebarPct: number;
    minSidebarPct: number;
  } | null>(null);

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
