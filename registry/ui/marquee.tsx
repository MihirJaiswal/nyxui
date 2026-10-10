"use client";
import { cn } from "@/lib/utils";
import { motion, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

export type MarqueeProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
  fadeEdges?: boolean;
  fadeWidth?: number;
  pauseOnTap?: boolean;
  draggable?: boolean;
};

export function Marquee({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
  fadeEdges = false,
  fadeWidth = 64,
  pauseOnTap = true,
  draggable = true,
}: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [containerSize, setContainerSize] = useState(0);
  const [childSize, setChildSize] = useState(0);
  const [copies, setCopies] = useState(2);

  const translation = useMotionValue(0);
  // Last direction the translation offset was computed for. When direction
  // flips, the shared motion value would otherwise carry a stale offset from
  // the other axis (and a stale wrap-sign), visibly cutting the track.
  const prevDirectionRef = useRef(direction);

  useEffect(() => {
    if (prevDirectionRef.current !== direction) {
      prevDirectionRef.current = direction;
      translation.set(0);
    }
  }, [direction, translation]);

  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // true while a drag is in flight; suppresses the trailing click so a
  // release doesn't register as a tap-to-pause.
  const didDragRef = useRef(false);
  // Live refs so the rAF loop can read current state without re-subscribing.
  const pausedRef = useRef(paused);
  const draggingRef = useRef(dragging);
  const hoveredRef = useRef(false);
  const speedRef = useRef(speed);
  const speedOnHoverRef = useRef(speedOnHover);
  const reverseRef = useRef(reverse);
  const cycleSizeRef = useRef(0);
  // False while the marquee is scrolled out of the viewport — lets the rAF
  // loop suspend itself entirely instead of ticking uselessly off-screen.
  const visibleRef = useRef(true);

  pausedRef.current = paused;
  draggingRef.current = dragging;
  speedRef.current = speed;
  speedOnHoverRef.current = speedOnHover;
  reverseRef.current = reverse;
  // Cycle = size of ONE copy + its trailing gap. Scrolling by exactly this
  // amount leaves the view pixel-identical to the start, so the modulo wrap
  // in the rAF loop is invisible.
  cycleSizeRef.current = childSize > 0 ? childSize + gap : 0;

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const measure = () => {
      const outerBox = outer.getBoundingClientRect();
      const trackScroll =
        direction === "horizontal" ? track.scrollWidth : track.scrollHeight;
      const outerSize =
        direction === "horizontal" ? outerBox.width : outerBox.height;

      setContainerSize(outerSize);

      // Current rendered total = copies * childSize + (copies - 1) * gap.
      // Reverse that to recover childSize for the CURRENT copies count.
      const measuredChild =
        copies > 0 ? (trackScroll - (copies - 1) * gap) / copies : 0;
      setChildSize(measuredChild);

      // Render enough copies to always fill at least (viewport + one copy),
      // so the modulo wrap of exactly one cycle is seamless.
      if (measuredChild > 0 && outerSize > 0) {
        const needed = Math.max(
          2,
          Math.ceil(outerSize / (measuredChild + gap)) + 1,
        );
        if (needed !== copies) setCopies(needed);
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    ro.observe(track);
    return () => ro.disconnect();
  }, [direction, gap, children, copies]);

  // Single rAF loop for the lifetime of the component. Reads live state from
  // refs so prop changes don't kill/restart the loop. An IntersectionObserver
  // stops the loop entirely while the marquee is off-screen.
  useEffect(() => {
    const outer = outerRef.current;
    let raf: number | null = null;
    let last = performance.now();

    const tick = (now: number) => {
      const delta = Math.min(now - last, 100); // clamp after tab-background
      last = now;

      const cycle = cycleSizeRef.current;
      if (cycle && !pausedRef.current && !draggingRef.current) {
        const active =
          hoveredRef.current && speedOnHoverRef.current
            ? speedOnHoverRef.current
            : speedRef.current;
        const step = (active * delta) / 1000;
        let next = translation.get() + (reverseRef.current ? step : -step);

        if (reverseRef.current) {
          while (next >= cycle) next -= cycle;
          while (next < 0) next += cycle;
        } else {
          while (next <= -cycle) next += cycle;
          while (next > 0) next -= cycle;
        }

        translation.set(next);
      }

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf == null) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      if (raf != null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    };

    start();

    let io: IntersectionObserver | null = null;
    if (outer) {
      io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      });
      io.observe(outer);
    }

    return () => {
      io?.disconnect();
      stop();
    };
  }, [translation]);

  const maskStyle =
    fadeEdges && containerSize > 0
      ? (() => {
          const pct = Math.min(
            50,
            Math.round((fadeWidth / containerSize) * 100),
          );
          const grad =
            direction === "horizontal"
              ? `linear-gradient(to right, transparent, black ${pct}%, black ${100 - pct}%, transparent 100%)`
              : `linear-gradient(to bottom, transparent, black ${pct}%, black ${100 - pct}%, transparent 100%)`;
          return { maskImage: grad, WebkitMaskImage: grad };
        })()
      : {};

  const handleClick = () => {
    if (didDragRef.current) {
      didDragRef.current = false;
      return;
    }
    if (pauseOnTap) setPaused((p) => !p);
  };

  const dragLimit = Math.max(cycleSizeRef.current * 2, containerSize);

  return (
    <div
      ref={outerRef}
      className={cn(
        "overflow-hidden relative",
        className,
        (pauseOnTap || draggable) && "cursor-pointer",
        dragging && "cursor-grabbing",
      )}
      style={maskStyle}
      onPointerDown={() => {
        didDragRef.current = false;
      }}
      onClick={handleClick}
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
    >
      <motion.div
        className={cn("flex w-max", draggable && "cursor-grab")}
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          flexDirection: direction === "horizontal" ? "row" : "column",
          gap: `${gap}px`,
        }}
        ref={trackRef}
        drag={draggable ? (direction === "horizontal" ? "x" : "y") : false}
        dragConstraints={{
          left: -dragLimit,
          right: dragLimit,
          top: -dragLimit,
          bottom: dragLimit,
        }}
        onDragStart={() => {
          setDragging(true);
          didDragRef.current = true;
        }}
        onDragEnd={() => {
          setDragging(false);
        }}
        dragElastic={0.1}
        dragMomentum={false}
      >
        {Array.from({ length: copies }, (_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: direction === "horizontal" ? "row" : "column",
              gap: `${gap}px`,
              flexShrink: 0,
            }}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
