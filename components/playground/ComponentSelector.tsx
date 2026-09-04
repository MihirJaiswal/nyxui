"use client";

import type React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
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

const BASE_WIDTH = 28;
const MAX_WIDTH = 45;
const SIGMA = 10; // px — controls how far the bulge reaches. Bigger = wider ripple.
const HOVER_NONE = -100000; // sentinel: "cursor is nowhere near the list"

// Retuned to be snappy instead of floaty. Damping ratio here is ~1.08
// (barely overdamped — settles fast, no overshoot/bounce).
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
  name: string;
  onSelect: () => void;
  onMouseEnter: () => void;
}

const TickerItem = ({
  mouseY,
  index,
  isActive,
  isHovered,
  name,
  onSelect,
  onMouseEnter,
}: TickerItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  // Reads the item's real screen position at the moment mouseY changes —
  // no assumptions about row height, gaps, or list length, so it can't
  // drift out of sync the way index-based math can.
  const rawWidth = useTransform(mouseY, (y) => {
    if (isActive) return MAX_WIDTH;
    if (!ref.current) return BASE_WIDTH;

    const rect = ref.current.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const distance = Math.abs(y - centerY);

    // Gaussian falloff — same shape as macOS dock magnification.
    // At distance = 0 (hovered row): influence = 1
    // At distance ≈ one row away: influence ≈ 0.5
    // Fades smoothly to 0 further out.
    const influence = Math.exp(-(distance * distance) / (2 * SIGMA * SIGMA));
    return BASE_WIDTH + influence * (MAX_WIDTH - BASE_WIDTH);
  });

  const width = useSpring(rawWidth, SPRING_CONFIG);
  const isHighlighted = isActive || isHovered;

  const handleMouseEnter = () => {
    onMouseEnter();
    // Skip the tick when re-entering the already-active row — nothing
    // visually changes there, so the sound would just feel redundant.
    if (!isActive) {
      playHoverTick(index);
    }
  };

  return (
    <motion.button
      ref={ref}
      onClick={onSelect}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "group relative flex min-h-7 w-full items-center gap-3 rounded-md py-1 text-sm transition-colors",
        isActive
          ? "text-[#FF4F11]"
          : "text-muted-foreground hover:text-[#FF4F11]",
      )}
    >
      <span className="flex w-11 shrink-0 items-center" aria-hidden="true">
        <motion.span
          style={{ width }}
          className={cn(
            "block h-px shrink-0 origin-left",
            isHighlighted ? "bg-[#FF4F11]" : "bg-border dark:bg-white/30",
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
  const mouseY = useMotionValue(HOVER_NONE);

  // Kick off decode as soon as the sidebar mounts so the buffer is ready
  // by the first hover. The AudioContext will be suspended until a user
  // gesture, but decoding works while suspended.
  useEffect(() => {
    preloadTick();
  }, []);

  const componentEntries = Object.entries(components);

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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 w-full rounded-lg bg-muted/50 py-2 pl-9 pr-8 text-sm text-foreground placeholder:text-muted-foreground focus:bg-background focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-3 scrollbar-no">
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 flex items-center gap-3 text-sm font-medium text-foreground">
              <span
                className="flex w-11 shrink-0 items-center"
                aria-hidden="true"
              >
                <span className="block h-px w-8 shrink-0 bg-border dark:bg-white/60" />
              </span>
              <span className="min-w-0 truncate">Components</span>
            </h4>

            <div
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
                    name={component.name}
                    onSelect={() => onSelect(key)}
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
