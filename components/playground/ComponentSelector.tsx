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
  isFirst,
  isLast,
  name,
  onSelect,
  onMouseEnter,
}: TickerItemProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const rawWidth = useTransform(mouseY, (y) => {
    if (isActive) return MAX_WIDTH;
    if (!ref.current) return BASE_WIDTH;

    const rect = ref.current.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const distance = Math.abs(y - centerY);

    const influence = Math.exp(-(distance * distance) / (2 * SIGMA * SIGMA));
    return BASE_WIDTH + influence * (MAX_WIDTH - BASE_WIDTH);
  });

  const width = useSpring(rawWidth, SPRING_CONFIG);
  const isHighlighted = isActive || isHovered;

  const handleMouseEnter = () => {
    onMouseEnter();
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
        isLast && "mb-px",
      )}
    >
      {isFirst && (
        <span
          className="pointer-events-none absolute inset-x-0 bottom-full flex h-px translate-y-1/2 items-center gap-3"
          aria-hidden="true"
        >
          <span className="flex w-11 shrink-0 items-center">
            <span className="block h-px w-8 shrink-0 bg-border dark:bg-white/30" />
          </span>
        </span>
      )}

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

      {!isLast && (
        <span
          className="pointer-events-none absolute inset-x-0 top-full flex h-px -translate-y-1/2 items-center gap-3"
          aria-hidden="true"
        >
          <span className="flex w-11 shrink-0 items-center">
            <span className="block h-px w-8 shrink-0 bg-border dark:bg-white/30" />
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
  const mouseY = useMotionValue(HOVER_NONE);

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
            <h4 className="flex items-center gap-3 text-sm font-medium text-foreground">
              <span
                className="flex w-11 shrink-0 items-center"
                aria-hidden="true"
              >
                <span className="block h-px w-8 shrink-0 bg-border dark:bg-white/60" />
              </span>
              <span className="min-w-0 truncate mb-1.5">Components</span>
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
                    isFirst={index === 0}
                    isLast={index === filteredComponents.length - 1}
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
