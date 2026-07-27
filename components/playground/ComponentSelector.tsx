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
import type { ComponentRegistry } from "./types";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchInput } from "@/components/ui/search-input";
import { PhantomLine } from "../global/Phantom-line";
import { useHoverTick } from "@/hooks/use-hover-tick";
import { CategoryHeading } from "../global/CategoryHeading";

interface ComponentSelectorProps {
  components: ComponentRegistry;
  selectedComponent: string;
  onSelect: (componentKey: string) => void;
}

const BASE_WIDTH = 32;
const MAX_WIDTH = 45;
const SIGMA = 10;
const HOVER_NONE = -100000;
const LISTBOX_ID = "component-selector-listbox";
const optionId = (key: string) => `component-option-${key}`;

const SPRING_CONFIG = { stiffness: 900, damping: 40, mass: 0.15 };
const LABEL_TRANSITION = {
  type: "spring" as const,
  stiffness: 600,
  damping: 32,
};

interface TickerItemProps {
  mouseY: MotionValue<number>;
  id: string;
  index: number;
  isActive: boolean;
  isHovered: boolean;
  isFocused: boolean;
  isFirst: boolean;
  isLast: boolean;
  name: string;
  onSelect: () => void;
  onMouseEnter: () => void;
  onHoverTick: (index: number) => void;
}

const TickerItem = ({
  mouseY,
  id,
  index,
  isActive,
  isHovered,
  isFocused,
  isFirst,
  isLast,
  name,
  onSelect,
  onMouseEnter,
  onHoverTick,
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
      onHoverTick(index);
    }
  };

  return (
    <motion.button
      ref={ref}
      id={id}
      role="option"
      aria-selected={isActive}
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
      {isFirst && <PhantomLine position="top" />}

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

      {!isLast && <PhantomLine position="bottom" />}
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
  const hoverTick = useHoverTick();

  // Global "f" shortcut to focus the search input.
  useKeyboardShortcut("f", () => {
    inputRef.current?.focus();
  });

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

  const activeDescendantId =
    focusedIndex >= 0 && filteredComponents[focusedIndex]
      ? optionId(filteredComponents[focusedIndex][0])
      : undefined;

  return (
    <div className="flex flex-col">
      <div className="border-b border-border/60 p-3">
        <SearchInput
          ref={inputRef}
          value={searchQuery}
          onValueChange={setSearchQuery}
          onKeyDown={handleSearchKeyDown}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder="Search components..."
          shortcutKey="f"
          isFocused={isInputFocused}
          containerClassName="border border-border rounded-lg"
          role="combobox"
          aria-expanded="true"
          aria-controls={LISTBOX_ID}
          aria-activedescendant={activeDescendantId}
          aria-autocomplete="list"
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3 scrollbar-no">
        <div className="space-y-4">
          <div>
            <CategoryHeading
              title="Components"
              variant="muted"
              className="mb-1.5"
            />

            <div
              ref={listRef}
              id={LISTBOX_ID}
              role="listbox"
              aria-label="Components"
              className="grid grid-flow-row auto-rows-max text-sm"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {filteredComponents.length > 0 ? (
                filteredComponents.map(([key, component], index) => (
                  <TickerItem
                    key={key}
                    id={optionId(key)}
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
                    onHoverTick={hoverTick}
                  />
                ))
              ) : (
                <EmptyState message="No components found" className="py-4" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentSelector;
