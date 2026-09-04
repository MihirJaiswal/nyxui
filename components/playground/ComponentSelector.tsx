"use client";

import type React from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  type MotionValue,
} from "motion/react";
import { Search, X } from "lucide-react";
import type { ComponentRegistry } from "./types";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { preloadTick, playHoverTick } from "@/lib/hover-tick";

interface ComponentSelectorProps {
  components: ComponentRegistry;
  selectedComponent: string;
  onSelect: (componentKey: string) => void;
}

const BASE_WIDTH = 32;
const MAX_WIDTH = 45;
const SIGMA = 10;
const HOVER_NONE = -100000;

const SPRING_CONFIG = { stiffness: 900, damping: 40, mass: 0.15 };
const LABEL_TRANSITION = {
  type: "spring" as const,
  stiffness: 600,
  damping: 32,
};

interface TickerItemProps {
  mouseY: MotionValue<number>;
  index: number;
  isActive: boolean;
  isHovered: boolean;
  isFocused: boolean;
  isFirst: boolean;
  isLast: boolean;
  name: string;
  onSelect: () => void;
  onMouseEnter: () => void;
}

const TickerItem = ({
  mouseY,
  index,
  isActive,
  isHovered,
  isFocused,
  isFirst,
  isLast,
  name,
  onSelect,
  onMouseEnter,
}: TickerItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const widthMv = useMotionValue(
    isActive || isFocused ? MAX_WIDTH : BASE_WIDTH,
  );

  // Snap/expand when the item is active or keyboard-focused.
  useEffect(() => {
    if (isActive || isFocused) {
      animate(widthMv, MAX_WIDTH, SPRING_CONFIG);
    } else {
      animate(widthMv, BASE_WIDTH, SPRING_CONFIG);
    }
  }, [isActive, isFocused, widthMv]);

  // Follow the mouse vertically when not active/focused.
  useMotionValueEvent(mouseY, "change", (y) => {
    if (isActive || isFocused || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const distance = Math.abs(y - centerY);
    const influence = Math.exp(-(distance * distance) / (2 * SIGMA * SIGMA));
    widthMv.set(BASE_WIDTH + influence * (MAX_WIDTH - BASE_WIDTH));
  });

  const width = useSpring(widthMv, SPRING_CONFIG);
  const isHighlighted = isActive || isHovered || isFocused;

  const handleMouseEnter = () => {
    onMouseEnter();
    if (!isActive) {
      playHoverTick(index);
    }
  };

  return (
    <motion.button
      ref={ref}
      data-index={index}
      onClick={onSelect}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "group relative flex min-h-7 w-full items-center gap-3 rounded-md py-1 text-sm transition-colors outline-none",
        isActive ? "text-primary" : "text-muted-foreground hover:text-primary",
        isFocused && !isActive && "bg-muted/50 text-primary",
        isLast && "mb-px",
      )}
    >
      {isFirst && (
        <span
          className="pointer-events-none absolute inset-x-0 bottom-full flex h-px translate-y-1/2 items-center gap-3"
          aria-hidden="true"
        >
          <span className="flex w-11 shrink-0 items-center">
            <span className="block h-px w-8 shrink-0 bg-foreground/30" />
          </span>
        </span>
      )}

      <span className="flex w-11 shrink-0 items-center" aria-hidden="true">
        <motion.span
          style={{ width }}
          className={cn(
            "block h-px shrink-0 origin-left",
            isHighlighted ? "bg-primary" : "bg-foreground/30",
          )}
        />
      </span>
      <motion.span
        animate={{ x: isHighlighted ? 4 : 0 }}
        transition={LABEL_TRANSITION}
        className={cn(
          "min-w-0 flex-1 truncate text-sm text-left",
          isActive && "font-medium",
        )}
        title={name}
      >
        {name}
      </motion.span>

      {!isLast && (
        <span
          className="pointer-events-none absolute inset-x-0 top-full flex h-px -translate-y-1/2 items-center gap-3"
          aria-hidden="true"
        >
          <span className="flex w-11 shrink-0 items-center">
            <span className="block h-px w-8 shrink-0 bg-foreground/30" />
          </span>
        </span>
      )}
    </motion.button>
  );
};

const ComponentSelector = ({
  components,
  selectedComponent,
  onSelect,
}: ComponentSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const mouseY = useMotionValue(HOVER_NONE);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    preloadTick();
  }, []);

  // Global "f" shortcut to focus the search input.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "f" && e.key !== "F") return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const target = e.target as HTMLElement;
      const tag = target.tagName.toLowerCase();
      const isEditable =
        tag === "input" ||
        tag === "textarea" ||
        target.isContentEditable ||
        target.closest("[contenteditable]");
      if (isEditable) return;

      e.preventDefault();
      inputRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const componentEntries = useMemo(
    () => Object.entries(components),
    [components],
  );

  const filteredComponents = useMemo(
    () =>
      componentEntries
        .filter(
          ([key, component]) =>
            component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            key.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .sort(([, a], [, b]) => a.name.localeCompare(b.name)),
    [componentEntries, searchQuery],
  );

  // Reset keyboard focus when the filtered list changes.
  useEffect(() => {
    setFocusedIndex(-1);
  }, [filteredComponents]);

  // Keep the keyboard-focused item in view.
  useEffect(() => {
    if (focusedIndex < 0) return;
    const item = listRef.current?.querySelector(
      `[data-index="${focusedIndex}"]`,
    );
    item?.scrollIntoView({ block: "nearest" });
  }, [focusedIndex]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      inputRef.current?.blur();
      return;
    }

    if (filteredComponents.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev >= filteredComponents.length - 1 ? 0 : prev + 1,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev <= 0 ? filteredComponents.length - 1 : prev - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focusedIndex >= 0) {
        const [key] = filteredComponents[focusedIndex];
        onSelect(key);
      } else if (filteredComponents.length > 0) {
        const [key] = filteredComponents[0];
        onSelect(key);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    mouseY.set(HOVER_NONE);
    setHoveredKey(null);
  };

  return (
    <div className="flex flex-col">
      <div className="border-b border-border/60 p-3">
        <div className="relative border border-border rounded-lg">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="h-9 w-full rounded-lg bg-muted/50 py-2 pl-9 pr-14 text-sm text-foreground placeholder:text-muted-foreground focus:bg-background focus:outline-none"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          ) : (
            <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border/60 bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              {isInputFocused ? "esc" : "f"}
            </kbd>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3 scrollbar-no">
        <div className="space-y-4">
          <div>
            <h4 className="flex items-center gap-3 text-sm font-medium text-foreground">
              <span
                className="flex w-11 shrink-0 items-center"
                aria-hidden="true"
              >
                <span className="block h-px w-8 shrink-0 bg-foreground/30" />
              </span>
              <span className="min-w-0 truncate mb-1.5">Components</span>
            </h4>

            <div
              ref={listRef}
              className="grid grid-flow-row auto-rows-max text-sm"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {filteredComponents.length > 0 ? (
                filteredComponents.map(([key, component], index) => (
                  <TickerItem
                    key={key}
                    mouseY={mouseY}
                    index={index}
                    isActive={selectedComponent === key}
                    isHovered={hoveredKey === key}
                    isFocused={focusedIndex === index}
                    isFirst={index === 0}
                    isLast={index === filteredComponents.length - 1}
                    name={component.name}
                    onSelect={() => {
                      setFocusedIndex(index);
                      onSelect(key);
                    }}
                    onMouseEnter={() => setHoveredKey(key)}
                  />
                ))
              ) : (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  No components found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentSelector;
