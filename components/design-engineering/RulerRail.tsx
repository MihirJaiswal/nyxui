"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Numbered majors (01..N) stacked on the ruler's 120px big-lines down the
 * page edge. 01 sits on the line at/below the anchor (first section heading),
 * the rest on the lines below it. Rendered in page flow — scrolls away with
 * the backdrop, same as the rulers themselves.
 */

const CELL = 120; // px between backdrop ruler big lines
const GRID_PHASE = 60; // big lines sit at 60 + 120n (matches ruler-x.svg offset)

type Side = "left" | "right";

function Major({
  side,
  top,
  label,
  active,
  onJump,
}: {
  side: Side;
  top: number;
  label: string;
  active: boolean;
  onJump: () => void;
}): React.ReactElement {
  const left = side === "left";
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      tabIndex={active ? 0 : -1}
      onClick={onJump}
      className="group pointer-events-auto absolute flex h-7.5 w-full -translate-y-1/2 items-center outline-none"
      style={{ top, justifyContent: left ? "flex-start" : "flex-end" }}
    >
      <span
        className={`h-px shrink-0 transition-[width,background-color] duration-300 ease-out ${
          active
            ? "w-8.5 bg-brand"
            : "w-7.25 group-hover:w-15 group-hover:bg-brand"
        } ${left ? "" : "order-2"}`}
      />
      <span
        className={`absolute -top-2 bg-background pl-3 pr-1 py-1 font-mono text-[10px] leading-none tracking-tight tabular-nums transition-colors duration-300 ${
          active
            ? "text-brand"
            : "text-foreground/30 dark:text-foreground/15 group-hover:text-brand dark:group-hover:text-brand/80"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

export function RulerRail({
  anchorId,
  sectionIds,
  side,
}: {
  /** Element the "01" tick aligns with (typically the article's first section). */
  anchorId: string;
  sectionIds: string[];
  side: Side;
}): React.ReactElement {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [anchorTop, setAnchorTop] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Measure the anchor's position relative to the rail's offset parent so the
  // tick coordinates match the rail's own coordinate space. Runs after paint
  // and retried until the anchor exists (it's rendered after this component).
  useEffect(() => {
    let raf = 0;
    let attempts = 0;

    const measure = () => {
      const rail = railRef.current;
      const anchor = document.getElementById(anchorId);
      if (!rail || !anchor) {
        if (attempts++ < 60) raf = requestAnimationFrame(measure);
        return;
      }
      const parent = (rail.offsetParent ?? document.body) as HTMLElement;
      // Walk offsetTop up the chain — layout-space, immune to scroll and
      // scroll-restore on revisit gives a stable document position.
      const offsetTopOf = (node: HTMLElement, stopAt: HTMLElement) => {
        let top = 0;
        let el: HTMLElement | null = node;
        while (el && el !== stopAt) {
          top += el.offsetTop;
          el = el.offsetParent as HTMLElement | null;
        }
        return top;
      };
      setAnchorTop(offsetTopOf(anchor, parent));
    };

    raf = requestAnimationFrame(measure);

    // Re-measure on layout shifts (fonts, async images, resizes).
    const remeasure = () => {
      attempts = 0;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    const ro = new ResizeObserver(remeasure);
    const anchor = document.getElementById(anchorId);
    if (anchor) ro.observe(anchor);
    // Siblings above the anchor (image, fonts) can shift its document
    // position without resizing it — watch the layout parent too.
    const parent = railRef.current?.offsetParent as HTMLElement | null;
    if (parent) ro.observe(parent);
    window.addEventListener("resize", remeasure);
    window.addEventListener("load", remeasure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", remeasure);
      window.removeEventListener("load", remeasure);
    };
  }, [anchorId]);

  // Track which section is in view.
  useEffect(() => {
    let raf = 0;
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const threshold = window.innerHeight * 0.4;
        let current = -1;
        els.forEach((el, i) => {
          if (el.getBoundingClientRect().top <= threshold) current = i;
        });
        setCurrentIndex(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join("|"), anchorTop]);

  // 01 on the first ruler big-line at/below the heading; 02..04 every line after.
  const majors = useMemo(() => {
    if (anchorTop === null) return [];
    const first =
      GRID_PHASE +
      Math.max(0, Math.ceil((anchorTop - GRID_PHASE) / CELL)) * CELL;
    return sectionIds.map((_, i) => ({
      top: first + i * CELL,
      label: String(i + 1).padStart(2, "0"),
    }));
  }, [anchorTop, sectionIds]);

  const jump = (i: number) => {
    document
      .getElementById(sectionIds[i])
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      jump(
        Math.min(
          (currentIndex < 0 ? -1 : currentIndex) + 1,
          sectionIds.length - 1,
        ),
      );
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      jump(Math.max((currentIndex < 0 ? 0 : currentIndex) - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      jump(0);
    } else if (e.key === "End") {
      e.preventDefault();
      jump(sectionIds.length - 1);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Sections"
      onKeyDown={onKeyDown}
      ref={railRef}
      className="pointer-events-none absolute inset-y-0 z-50 hidden w-7.5 lg:block"
      style={{ [side]: 0 } as React.CSSProperties}
    >
      {majors.map((m, i) => (
        <Major
          key={m.label}
          side={side}
          top={m.top}
          label={m.label}
          active={currentIndex === i}
          onJump={() => jump(i)}
        />
      ))}
    </div>
  );
}
