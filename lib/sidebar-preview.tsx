"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type {
  PointerEvent as ReactPointerEvent,
  FocusEvent as ReactFocusEvent,
} from "react";
import { createPortal } from "react-dom";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { componentsData } from "@/registry/Data";
import { getBlockCategory } from "@/lib/links";

export const SIDEBAR_PREVIEW_OPEN_DELAY_MS = 300;
export const SIDEBAR_PREVIEW_SIDE_OFFSET_PX = 14;

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface PreviewItem {
  title: string;
  breadcrumb: string;
  image: { light: string; dark: string | null };
  imageClassName?: string;
  description?: string;
}

interface RowEntry {
  row: HTMLElement;
  side: HTMLElement;
}

interface Snapshot {
  target: (RowEntry & { key: string }) | null;
  instant: boolean;
}

type OpenSource = "pointer" | "focus";

interface HoverState {
  enabled: boolean;
  open: string | null;
  openSource: OpenSource | null;
  candidate: string | null;
  candidateSource: OpenSource | null;
  candidateSince: number;
  closeAt: number | null;
  lastShownAt: number;
  scrolling: boolean;
  awaitingMove: boolean;
  pressed: boolean;
  pressedKey: string | null;
  focusKey: string | null;
}

type HoverEvent =
  | { type: "enable"; enabled: boolean }
  | { type: "dismiss"; stick?: boolean }
  | { type: "scroll"; at: number }
  | { type: "scrollEnd"; at: number }
  | { type: "press"; key: string | null; at: number }
  | { type: "release"; at: number }
  | { type: "leave"; at: number }
  | {
      type: "move";
      key: string | null;
      moved: boolean | null;
      buttons: number;
      at: number;
    }
  | { type: "focus"; key: string | null; at: number }
  | { type: "blur"; at: number }
  | { type: "tick"; at: number };

const DATA_ATTR = "data-hover-preview";
const GROUP_WINDOW_MS = 300;
const CLOSE_GRACE_MS = 100;
const EMPTY_SNAPSHOT: Snapshot = { target: null, instant: false };

/* state helpers (c/d/u/m in the compiled module) */

function resetOpen(s: HoverState): HoverState {
  return null === s.open && null === s.candidate && null === s.closeAt
    ? s
    : {
        ...s,
        open: null,
        openSource: null,
        candidate: null,
        candidateSource: null,
        closeAt: null,
      };
}

function leaveRow(
  s: HoverState,
  at: number,
  cfg: ControllerConfig,
): HoverState {
  let next = s;
  if (null !== next.pressedKey) next = { ...next, pressedKey: null };
  if ("pointer" === next.candidateSource)
    next = { ...next, candidate: null, candidateSource: null };
  if (
    null !== next.open &&
    "pointer" === next.openSource &&
    null === next.closeAt
  )
    next = { ...next, closeAt: at + cfg.closeGraceMs, lastShownAt: at };
  return next;
}

function blurRow(s: HoverState): HoverState {
  let next = null === s.focusKey ? s : { ...s, focusKey: null };
  if ("focus" === next.candidateSource)
    next = { ...next, candidate: null, candidateSource: null };
  if (null !== next.open && "focus" === next.openSource)
    next = { ...next, open: null, openSource: null, closeAt: null };
  return next;
}

function canOpenCandidate(s: HoverState): boolean {
  return (
    !s.scrolling &&
    !s.pressed &&
    ("focus" === s.candidateSource || !s.awaitingMove)
  );
}

function reduce(
  s: HoverState,
  ev: HoverEvent,
  cfg: ControllerConfig,
): HoverState {
  if ("enable" === ev.type)
    return ev.enabled === s.enabled
      ? s
      : ev.enabled
        ? { ...s, enabled: true }
        : initialState();
  if (!s.enabled) return s;
  switch (ev.type) {
    case "dismiss": {
      const next = resetOpen(s);
      if (!ev.stick)
        return next === s && next.lastShownAt === -Infinity
          ? s
          : { ...next, lastShownAt: -Infinity };
      if (
        next === s &&
        null === next.focusKey &&
        next.lastShownAt === -Infinity
      )
        return s;
      return {
        ...next,
        pressedKey: s.open ?? s.candidate ?? next.pressedKey,
        focusKey: null,
        lastShownAt: -Infinity,
      };
    }
    case "scroll":
      if (s.scrolling) return s;
      return {
        ...resetOpen(s),
        scrolling: true,
        awaitingMove: true,
        lastShownAt: -Infinity,
      };
    case "scrollEnd": {
      if (!s.scrolling) return s;
      const next = { ...s, scrolling: false };
      if (null !== next.focusKey && !next.pressed)
        return {
          ...next,
          candidate: next.focusKey,
          candidateSource: "focus",
          candidateSince: ev.at,
        };
      return next;
    }
    case "press":
      return {
        ...resetOpen(s),
        pressed: true,
        pressedKey: ev.key,
        lastShownAt: -Infinity,
      };
    case "release":
      return s.pressed ? { ...s, pressed: false } : s;
    case "leave":
      return leaveRow(s, ev.at, cfg);
    case "move": {
      if (0 !== ev.buttons) return resetOpen(s);
      let next = s.pressed ? { ...s, pressed: false } : s;
      if (!(ev.moved ?? !next.awaitingMove) || next.scrolling) return next;
      if (next.awaitingMove) next = { ...next, awaitingMove: false };
      if (null !== next.focusKey) next = { ...next, focusKey: null };
      const key = ev.key;
      if (null === key) return leaveRow(next, ev.at, cfg);
      if (key === next.pressedKey) return next;
      if (null !== next.pressedKey) next = { ...next, pressedKey: null };
      if (next.open === key)
        return null === next.closeAt && "pointer" === next.openSource
          ? next
          : { ...next, closeAt: null, openSource: "pointer" };
      if (null !== next.open || ev.at - next.lastShownAt <= cfg.groupWindowMs)
        return {
          ...next,
          open: key,
          openSource: "pointer",
          candidate: null,
          candidateSource: null,
          closeAt: null,
        };
      if (next.candidate === key && "pointer" === next.candidateSource)
        return next;
      return {
        ...next,
        candidate: key,
        candidateSource: "pointer",
        candidateSince: ev.at,
      };
    }
    case "focus": {
      if (null === ev.key) return blurRow(s);
      const next = s.focusKey === ev.key ? s : { ...s, focusKey: ev.key };
      if (next.scrolling || next.pressed || next.open === ev.key) return next;
      if (null !== next.open)
        return {
          ...next,
          open: ev.key,
          openSource: "focus",
          candidate: null,
          candidateSource: null,
          closeAt: null,
        };
      return {
        ...next,
        candidate: ev.key,
        candidateSource: "focus",
        candidateSince: ev.at,
      };
    }
    case "blur":
      return blurRow(s);
    case "tick": {
      let next = s;
      if (null !== next.closeAt && ev.at >= next.closeAt)
        next = { ...next, open: null, openSource: null, closeAt: null };
      if (
        null !== next.candidate &&
        null === next.open &&
        canOpenCandidate(next) &&
        ev.at >= next.candidateSince + cfg.openDelayMs
      )
        next = {
          ...next,
          open: next.candidate,
          openSource: next.candidateSource,
          candidate: null,
          candidateSource: null,
        };
      return next;
    }
  }
}

function initialState(): HoverState {
  return {
    enabled: false,
    open: null,
    openSource: null,
    candidate: null,
    candidateSource: null,
    candidateSince: 0,
    closeAt: null,
    lastShownAt: -Infinity,
    scrolling: false,
    awaitingMove: false,
    pressed: false,
    pressedKey: null,
    focusKey: null,
  };
}

function findRow(
  target: EventTarget | null,
  root: HTMLElement,
): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  const row = target.closest(`[${DATA_ATTR}]`);
  return row && root.contains(row) ? (row as HTMLElement) : null;
}

function keyOf(row: Element | null): string | null {
  return row?.getAttribute(DATA_ATTR) || null;
}

/** True when the row is not clipped out by an `overflow: hidden` ancestor. */
function isRowVisible(row: HTMLElement): boolean {
  const rect = row.getBoundingClientRect();
  if (0 === rect.height) return false;
  let top = 0;
  let bottom = document.documentElement.clientHeight;
  for (
    let el = row.parentElement;
    el && el !== document.body;
    el = el.parentElement
  ) {
    if ("visible" === getComputedStyle(el).overflowY) continue;
    const r = el.getBoundingClientRect();
    top = Math.max(top, r.top);
    bottom = Math.min(bottom, r.bottom);
  }
  return rect.bottom > top && rect.top < bottom;
}

/** Events that close the card instantly (no exit animation). */
const INSTANT_EVENTS = new Set([
  "scroll",
  "press",
  "move",
  "dismiss",
  "enable",
]);

interface ControllerConfig {
  openDelayMs: number;
  groupWindowMs: number;
  closeGraceMs: number;
}

/* ------------------------------------------------------------------ */
/* Controller                                                          */
/* ------------------------------------------------------------------ */

export class PreviewHoverController {
  private state: HoverState = initialState();
  private config: ControllerConfig;
  private snapshot: Snapshot = EMPTY_SNAPSHOT;
  private listeners = new Set<() => void>();
  private elements = new Map<string, RowEntry>();
  private wakeAt: number | null = null;
  private wakeTimer?: number;
  private scrollEndTimer?: number;
  private lastScrollAt = 0;
  private pointerX = NaN;
  private pointerY = NaN;
  private pointerMoved: boolean | null = null;
  private attached = false;
  private keyboardInput = false;
  private focusFollowAt = -Infinity;
  private placers = new Set<() => void>();
  private resizeObserver: ResizeObserver | null = null;
  private siblingObserver: MutationObserver | null = null;
  private resizeTarget: Element | null = null;

  constructor(openDelayMs: number) {
    this.config = {
      openDelayMs,
      groupWindowMs: GROUP_WINDOW_MS,
      closeGraceMs: CLOSE_GRACE_MS,
    };
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = (): Snapshot => this.snapshot;

  dismiss = () => this.dispatch({ type: "dismiss" });

  isFocusCard = (key: string) =>
    this.state.open === key && "focus" === this.state.openSource;

  onReposition = (placer: () => void) => {
    this.placers.add(placer);
    return () => {
      this.placers.delete(placer);
    };
  };

  dispatch(ev: HoverEvent) {
    const next = reduce(this.state, ev, this.config);
    if (next !== this.state) {
      this.state = next;
      if ("focus" !== next.openSource) this.stopFollowingResize();
      this.schedule();
      this.sync(ev);
    }
  }

  private schedule() {
    const at = (() => {
      if (!this.state.enabled) return null;
      let wake = this.state.closeAt;
      if (
        null !== this.state.candidate &&
        null === this.state.open &&
        canOpenCandidate(this.state)
      ) {
        const open = this.state.candidateSince + this.config.openDelayMs;
        wake = null === wake ? open : Math.min(wake, open);
      }
      return wake;
    })();
    if (at === this.wakeAt) return;
    window.clearTimeout(this.wakeTimer);
    this.wakeTimer = undefined;
    this.wakeAt = at;
    if (null !== at)
      this.wakeTimer = window.setTimeout(
        () => {
          this.wakeTimer = undefined;
          this.wakeAt = null;
          this.dispatch({ type: "tick", at: performance.now() });
          this.schedule();
        },
        Math.max(0, Math.ceil(at - performance.now())),
      );
  }

  private sync(ev: HoverEvent) {
    const open = this.state.open;
    if (open !== (this.snapshot.target?.key ?? null)) {
      const entry = open ? this.elements.get(open) : undefined;
      const target = open && entry ? { key: open, ...entry } : null;
      this.snapshot = {
        target,
        instant: null === target && INSTANT_EVENTS.has(ev.type),
      };
      for (const listener of this.listeners) listener();
    }
    for (const key of this.elements.keys())
      if (
        key !== this.state.open &&
        key !== this.state.candidate &&
        key !== this.state.focusKey
      )
        this.elements.delete(key);
  }

  private handleDocumentPointerMove = (e: PointerEvent) => {
    this.pointerMoved = Number.isNaN(this.pointerX)
      ? null
      : e.clientX !== this.pointerX || e.clientY !== this.pointerY;
    this.pointerX = e.clientX;
    this.pointerY = e.clientY;
    if (this.pointerMoved) this.keyboardInput = false;
  };

  private handleDocumentPointerDown = (e: PointerEvent) => {
    this.keyboardInput = false;
    const row =
      e.target instanceof Element ? e.target.closest(`[${DATA_ATTR}]`) : null;
    this.dispatch({ type: "press", key: keyOf(row), at: performance.now() });
  };

  private handleDocumentKeyDown = (e: KeyboardEvent) => {
    this.keyboardInput = true;
    if (
      "Escape" === e.key &&
      (null !== this.state.open || null !== this.state.candidate)
    )
      this.dispatch({ type: "dismiss", stick: true });
  };

  private handleDocumentFocusIn = (e: FocusEvent) => {
    const open = this.state.open ?? this.state.candidate;
    const target = e.target;
    if (null !== open && target instanceof Node && target !== document.body) {
      if (!this.elements.get(open)?.side.contains(target)) this.dismiss();
    }
  };

  private handleRelease = () =>
    this.dispatch({ type: "release", at: performance.now() });

  private handleScroll = (e: Event) => {
    if (!this.state.scrolling && this.followsFocus(e.target)) {
      this.focusFollowAt = performance.now();
      this.reposition();
      this.followResize(e.target);
      return;
    }
    this.noteScroll();
  };

  reposition = () => {
    for (const placer of this.placers) placer();
  };

  private followResize(target: EventTarget | null) {
    if (
      "focus" === this.state.openSource &&
      target instanceof Element &&
      target !== this.resizeTarget
    ) {
      this.resizeObserver ??= new ResizeObserver(this.reposition);
      this.siblingObserver ??= new MutationObserver(this.reposition);
      this.resizeObserver.disconnect();
      this.siblingObserver.disconnect();
      this.resizeObserver.observe(target);
      if (target.parentElement)
        this.siblingObserver.observe(target.parentElement, { childList: true });
      this.resizeTarget = target;
    }
  }

  private stopFollowingResize() {
    if (null !== this.resizeTarget) {
      this.resizeObserver?.disconnect();
      this.siblingObserver?.disconnect();
      this.resizeTarget = null;
    }
  }

  private handleWheel = () => {
    this.focusFollowAt = -Infinity;
    this.noteScroll();
  };

  private followsFocus(target: EventTarget | null): boolean {
    const key = this.state.focusKey;
    if (
      !this.keyboardInput ||
      null === key ||
      performance.now() - this.focusFollowAt > 100
    )
      return false;
    const row = this.elements.get(key)?.row;
    return !!(row && target instanceof Node && target.contains(row));
  }

  private noteScroll() {
    this.lastScrollAt = performance.now();
    if (!this.state.scrolling)
      this.dispatch({ type: "scroll", at: this.lastScrollAt });
    if (undefined === this.scrollEndTimer) this.armScrollEnd(150);
  }

  private armScrollEnd(delay: number) {
    this.scrollEndTimer = window.setTimeout(() => {
      this.scrollEndTimer = undefined;
      const since = performance.now() - this.lastScrollAt;
      if (since < 150) this.armScrollEnd(150 - since);
      else this.endScroll();
    }, delay);
  }

  private handleScrollEnd = () => {
    window.clearTimeout(this.scrollEndTimer);
    this.scrollEndTimer = undefined;
    this.endScroll();
  };

  private endScroll() {
    const key = this.state.focusKey;
    if (this.state.scrolling && null !== key) {
      const row = this.elements.get(key)?.row;
      if (!row || !isRowVisible(row))
        this.dispatch({ type: "blur", at: performance.now() });
    }
    this.dispatch({ type: "scrollEnd", at: performance.now() });
  }

  private handlePointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if ("touch" === e.pointerType) return;
    const side = e.currentTarget;
    const row = findRow(e.target, side);
    const key = keyOf(row);
    if (row && key) this.elements.set(key, { row, side });
    this.dispatch({
      type: "move",
      key,
      moved: this.pointerMoved,
      buttons: e.buttons,
      at: performance.now(),
    });
  };

  private handlePointerLeave = (e: ReactPointerEvent<HTMLElement>) => {
    if ("touch" !== e.pointerType)
      this.dispatch({ type: "leave", at: performance.now() });
  };

  private handleFocus = (e: ReactFocusEvent<HTMLElement>) => {
    const target = e.target;
    if (
      !this.keyboardInput ||
      !(target instanceof HTMLElement) ||
      !target.matches(":focus-visible")
    )
      return void this.dispatch({ type: "blur", at: performance.now() });
    const side = e.currentTarget;
    const row = findRow(target, side);
    const key = keyOf(row);
    if (row && key) this.elements.set(key, { row, side });
    this.dispatch({ type: "focus", key, at: performance.now() });
    if (key) this.focusFollowAt = performance.now();
  };

  private handleBlur = (e: ReactFocusEvent) => {
    const related = e.relatedTarget;
    if (related instanceof Node && e.currentTarget.contains(related)) return;
    this.dispatch({ type: "blur", at: performance.now() });
  };

  /** Spread onto the list container that holds the preview rows. */
  listProps = {
    onPointerMove: this.handlePointerMove,
    onPointerLeave: this.handlePointerLeave,
    onWheel: this.handleWheel,
    onFocus: this.handleFocus,
    onBlur: this.handleBlur,
  };

  attach() {
    if (this.attached) return;
    this.attached = true;
    const opts = { capture: true, passive: true } as AddEventListenerOptions;
    document.addEventListener("keydown", this.handleDocumentKeyDown, opts);
    document.addEventListener("focusin", this.handleDocumentFocusIn, opts);
    document.addEventListener(
      "pointermove",
      this.handleDocumentPointerMove,
      opts,
    );
    document.addEventListener(
      "pointerdown",
      this.handleDocumentPointerDown,
      opts,
    );
    document.addEventListener("pointerup", this.handleRelease, opts);
    document.addEventListener("pointercancel", this.handleRelease, opts);
    document.addEventListener("scroll", this.handleScroll, opts);
    document.addEventListener("scrollend", this.handleScrollEnd, opts);
    window.addEventListener("blur", this.handleRelease);
    this.dispatch({ type: "enable", enabled: true });
  }

  detach() {
    if (!this.attached) return;
    this.attached = false;
    const opts = { capture: true };
    document.removeEventListener("keydown", this.handleDocumentKeyDown, opts);
    document.removeEventListener("focusin", this.handleDocumentFocusIn, opts);
    document.removeEventListener(
      "pointermove",
      this.handleDocumentPointerMove,
      opts,
    );
    document.removeEventListener(
      "pointerdown",
      this.handleDocumentPointerDown,
      opts,
    );
    document.removeEventListener("pointerup", this.handleRelease, opts);
    document.removeEventListener("pointercancel", this.handleRelease, opts);
    document.removeEventListener("scroll", this.handleScroll, opts);
    document.removeEventListener("scrollend", this.handleScrollEnd, opts);
    window.removeEventListener("blur", this.handleRelease);
    window.clearTimeout(this.wakeTimer);
    window.clearTimeout(this.scrollEndTimer);
    this.wakeTimer = undefined;
    this.scrollEndTimer = undefined;
    this.wakeAt = null;
    this.dispatch({ type: "enable", enabled: false });
    this.elements.clear();
    this.pointerX = NaN;
    this.pointerY = NaN;
    this.pointerMoved = null;
    this.keyboardInput = false;
    this.focusFollowAt = -Infinity;
  }
}

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

export function useIsDarkTheme(): boolean {
  const { resolvedTheme } = useTheme();
  if (resolvedTheme) return "dark" === resolvedTheme;
  return (
    "undefined" !== typeof document &&
    document.documentElement.classList.contains("dark")
  );
}

export function usePreviewHover(openDelayMs: number): PreviewHoverController {
  const [controller] = useState(() => new PreviewHoverController(openDelayMs));
  const hoverable = useMediaQuery("(hover: hover) and (pointer: fine)");
  useEffect(() => {
    if (hoverable) {
      controller.attach();
      return () => controller.detach();
    }
  }, [controller, hoverable]);
  return controller;
}

/* ------------------------------------------------------------------ */
/* Card pieces                                                         */
/* ------------------------------------------------------------------ */

export function PreviewCardCrumbs({ label }: { label: string }) {
  const parts = useMemo(
    () =>
      label
        .split(/\s*[/·]\s*/)
        .map((p) => p.trim())
        .filter(Boolean),
    [label],
  );
  return (
    <p className="text-muted-foreground text-[11px] font-medium">
      {parts.map((part, i) => (
        <span key={`${i}-${part}`}>
          {i > 0 ? (
            <span aria-hidden="true" className="text-muted-foreground/40">
              {" / "}
            </span>
          ) : null}
          {part}
        </span>
      ))}
    </p>
  );
}

export function PreviewThumbnailPlate({
  src,
  loaded,
  imageClassName,
  onLoad,
  onError,
}: {
  src: string | null;
  loaded: boolean;
  imageClassName?: string;
  onLoad: () => void;
  onError: () => void;
}) {
  return (
    <div className="bg-muted/30 p-2">
      <div className="rounded-lg bg-background relative aspect-[1200/800] overflow-hidden border">
        {loaded ? null : (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2
              className="text-muted-foreground/60 size-5 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
          </span>
        )}
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element -- dynamic preview src, intentionally unoptimized
          <img
            src={src}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            onLoad={() => onLoad()}
            onError={() => onError()}
            className={cn(
              "relative block size-full object-contain dark:mix-blend-screen transition-opacity duration-150 motion-reduce:transition-none",
              imageClassName,
              loaded ? "opacity-100" : "opacity-0",
            )}
          />
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PreviewHoverCard                                                    */
/* ------------------------------------------------------------------ */

function computePosition(
  entry: { row: HTMLElement; side: HTMLElement },
  cardHeight: number,
  sideOffset: number,
  boundary?: string,
): { x: number; y: number } | null {
  if (
    !entry.row.isConnected ||
    !entry.side.isConnected ||
    !isRowVisible(entry.row)
  )
    return null;
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const sideRect = (
    (boundary && entry.side.closest(boundary)) ||
    entry.side
  ).getBoundingClientRect();
  const rowRect = entry.row.getBoundingClientRect();
  let x = sideRect.right + sideOffset;
  if (x + 320 > vw - 16 && (x = sideRect.left - sideOffset - 320) < 16)
    return null;
  return {
    x: Math.round(x),
    y: Math.round(
      Math.min(
        Math.max(rowRect.top + rowRect.height / 2 - cardHeight / 2, 16),
        Math.max(16, vh - 16 - cardHeight),
      ),
    ),
  };
}

export function PreviewHoverCard({
  controller,
  resolve,
  sideOffset,
  boundary,
}: {
  controller: PreviewHoverController;
  resolve: (key: string) => PreviewItem | null;
  sideOffset: number;
  boundary?: string;
}) {
  const { target, instant } = useSyncExternalStore(
    controller.subscribe,
    controller.getSnapshot,
    () => EMPTY_SNAPSHOT,
  );
  const cardRef = useRef<HTMLDivElement | null>(null);
  const positionedRef = useRef(false);
  const placeRef = useRef<() => void>(() => {});
  const lastRowRef = useRef<{ row: HTMLElement; top: number } | null>(null);

  useLayoutEffect(() => {
    if (!target) return;
    if (!target.row.isConnected) {
      controller.dismiss();
      return;
    }
    const last = lastRowRef.current;
    if (
      last &&
      last.row !== target.row &&
      0.5 >= Math.abs(target.row.getBoundingClientRect().top - last.top)
    ) {
      if (controller.isFocusCard(target.key)) placeRef.current();
      else controller.dismiss();
    }
  }, [target, controller]);

  const [shown, setShown] = useState<typeof target | null>(null);
  if (target && target !== shown) setShown(target);
  if (!target && instant && null !== shown) setShown(null);
  const active = target ?? (instant ? null : shown);
  const closing = null === target && !instant && null !== shown;

  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(() => setShown(null), 150);
    return () => window.clearTimeout(timer);
  }, [closing]);

  const key = active?.key ?? null;
  const item = useMemo(() => (key ? resolve(key) : null), [key, resolve]);
  const isDark = useIsDarkTheme();
  const [fallback, setFallback] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const effective = item
    ? isDark && item.image.dark
      ? item.image.dark
      : item.image.light
    : null;
  const src =
    item &&
    effective &&
    fallback.has(effective) &&
    effective !== item.image.light
      ? item.image.light
      : effective;

  useLayoutEffect(() => {
    const place = () => {
      const card = cardRef.current;
      if (!card || !active) {
        positionedRef.current = false;
        lastRowRef.current = null;
        return;
      }
      if (closing) {
        lastRowRef.current = null;
        return;
      }
      lastRowRef.current = {
        row: active.row,
        top: active.row.getBoundingClientRect().top,
      };
      const pos = computePosition(
        active,
        card.offsetHeight,
        sideOffset,
        boundary,
      );
      if (!pos) {
        card.style.visibility = "hidden";
        return;
      }
      card.style.visibility = "";
      card.style.transition = positionedRef.current ? "" : "none";
      card.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      positionedRef.current = true;
    };
    placeRef.current = place;
    place();
  }, [active, closing, sideOffset, boundary]);

  useEffect(
    () => controller.onReposition(() => placeRef.current()),
    [controller],
  );

  if (!active || !item || !src) return null;

  const body = item.description || item.title;

  return createPortal(
    <div
      ref={cardRef}
      aria-hidden="true"
      data-slot="preview-hover-card"
      className="pointer-events-none fixed top-0 left-0 z-[70] transition-transform duration-150 ease-out motion-reduce:transition-none"
      style={{ width: 320 }}
    >
      <div
        data-state={closing ? "closed" : "open"}
        onTransitionEnd={(e) => {
          if (
            closing &&
            e.target === e.currentTarget &&
            "opacity" === e.propertyName
          )
            setShown(null);
        }}
        className="bg-popover text-popover-foreground smooth-shadow-ring-sm rounded-xl overflow-hidden transition-[opacity,scale] duration-150 data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=closed]:duration-100 motion-reduce:transition-none starting:scale-95 starting:opacity-0"
      >
        <PreviewThumbnailPlate
          src={src}
          loaded={loadedSrc === src}
          imageClassName={item.imageClassName}
          onLoad={() => setLoadedSrc(src)}
          onError={() => {
            if (src !== item.image.light)
              setFallback((prev) => new Set(prev).add(src));
            else setLoadedSrc(src);
          }}
        />
        <div className="border-t px-3 py-2">
          <PreviewCardCrumbs label={item.breadcrumb} />
          {body ? (
            <p className="text-foreground mt-1 line-clamp-4 text-[13px] leading-snug font-normal">
              {body}
            </p>
          ) : (
            <div className="mt-1.5 flex flex-col gap-1.5 pb-0.5">
              <div className="bg-muted h-3.5 w-full animate-pulse rounded-md motion-reduce:animate-none" />
              <div className="bg-muted h-3.5 w-3/5 animate-pulse rounded-md motion-reduce:animate-none" />
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar resolver — hrefs from the components/blocks sidebar         */
/* ------------------------------------------------------------------ */

/**
 * Resolves sidebar hrefs (`/components/shining-card`, `/blocks/hero/…`,
 * `/templates/…`) into PreviewItems using the showcase metadata in Data.tsx.
 *
 * Blocks whose own image is the shared placeholder fall back to the
 * `isRepresentative` block of their category — that block's image is the
 * category cover.
 */
export function resolveSidebarPreview(key: string): PreviewItem | null {
  const segments = key.split("/").filter(Boolean);
  if (segments.length < 2) return null;

  const type = segments[0];
  const slug = segments[segments.length - 1];

  const collection =
    type === "components"
      ? componentsData.components
      : type === "blocks"
        ? componentsData.blocks
        : type === "templates"
          ? componentsData.templates
          : null;
  if (!collection) return null;

  const data = collection[slug];
  if (!data) return null;

  let image = data.image;
  let imageClassName = data.imageClassName;
  if (type === "blocks" && !data.isRepresentative) {
    const category = getBlockCategory(slug, data.tags ?? []);
    const representative = Object.entries(componentsData.blocks).find(
      ([repSlug, block]) =>
        block.isRepresentative &&
        getBlockCategory(repSlug, block.tags ?? []) === category,
    )?.[1];
    if (representative) {
      image = representative.image;
      imageClassName = representative.imageClassName;
    }
  }

  return {
    title: data.title,
    breadcrumb: `${type[0].toUpperCase()}${type.slice(1)} / ${data.title}`,
    image: { light: image, dark: null },
    imageClassName,
    description: data.description,
  };
}
