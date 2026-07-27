"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  type MotionValue,
} from "motion/react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { useHoverTick } from "@/hooks/use-hover-tick";
import { CategoryHeading } from "../global/CategoryHeading";
import type { ComponentRegistry } from "../../types/playground";
import { PhantomLine } from "../global/Phantom-line";
import {
  GuideLine,
  BASE_WIDTH,
  MAX_WIDTH,
  SPRING_CONFIG,
  LABEL_TRANSITION,
} from "../global/GuideLine";

interface ComponentSelectorProps {
  components: ComponentRegistry;
  selectedComponent: string;
  onSelect: (componentKey: string) => void;
}

const SIGMA = 10;
const HOVER_NONE = -100000;

interface SelectorItemProps {
  mouseY: MotionValue<number>;
  index: number;
  itemKey: string;
  name: string;
  isActive: boolean;
  isFirst: boolean;
  isLast: boolean;
  onSelect: () => void;
  onHoverTick: (index: number) => void;
}

const SelectorItem = ({
  mouseY,
  index,
  itemKey,
  name,
  isActive,
  isFirst,
  isLast,
  onSelect,
  onHoverTick,
}: SelectorItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const highlighted = isActive || hovered;
  const widthMv = useMotionValue(highlighted ? MAX_WIDTH : BASE_WIDTH);

  useEffect(() => {
    animate(widthMv, highlighted ? MAX_WIDTH : BASE_WIDTH, SPRING_CONFIG);
  }, [highlighted, widthMv]);

  useMotionValueEvent(mouseY, "change", (y) => {
    if (highlighted || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const distance = Math.abs(y - centerY);
    const influence = Math.exp(-(distance * distance) / (2 * SIGMA * SIGMA));
    widthMv.set(BASE_WIDTH + influence * (MAX_WIDTH - BASE_WIDTH));
  });

  const width = useSpring(widthMv, SPRING_CONFIG);

  return (
    <CommandItem
      ref={ref}
      value={itemKey}
      onSelect={onSelect}
      onMouseEnter={() => {
        setHovered(true);
        if (!isActive) onHoverTick(index);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative flex min-h-7 items-center gap-3 rounded-md py-1 text-sm transition-colors",
        "data-[selected=true]:bg-transparent !px-0",
        isActive ? "text-primary" : "text-muted-foreground",
        highlighted && !isActive && "text-primary",
      )}
    >
      {isFirst && <PhantomLine position="top" />}

      <GuideLine width={width} highlighted={highlighted} />

      <motion.span
        animate={{ x: highlighted ? 4 : 0 }}
        transition={LABEL_TRANSITION}
        className={cn(
          "min-w-0 flex-1 truncate text-left",
          isActive && "font-medium",
        )}
        title={name}
      >
        {name}
      </motion.span>

      {!isLast && <PhantomLine position="bottom" />}
    </CommandItem>
  );
};

const ComponentSelector = ({
  components,
  selectedComponent,
  onSelect,
}: ComponentSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedValue, setHighlightedValue] = useState("");
  const mouseY = useMotionValue(HOVER_NONE);
  const inputRef = useRef<HTMLInputElement>(null);
  const hoverTick = useHoverTick();

  useKeyboardShortcut("f", () => {
    inputRef.current?.focus();
  });

  const entries = useMemo(
    () =>
      Object.entries(components).sort(([, a], [, b]) =>
        a.name.localeCompare(b.name),
      ),
    [components],
  );

  const filteredEntries = useMemo(
    () =>
      entries.filter(
        ([key, component]) =>
          component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          key.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [entries, searchQuery],
  );

  useEffect(() => {
    if (filteredEntries.length === 0) {
      setHighlightedValue("");
      return;
    }
    const stillVisible = filteredEntries.some(
      ([key]) => key.toLowerCase() === highlightedValue,
    );
    if (!stillVisible) {
      setHighlightedValue(filteredEntries[0][0].toLowerCase());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredEntries]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      inputRef.current?.blur();
    }
  };

  return (
    <Command
      shouldFilter={false}
      value={highlightedValue}
      onValueChange={setHighlightedValue}
      className="flex h-full flex-col gap-0 rounded-none bg-transparent"
    >
      <div className="p-3">
        <CommandInput
          ref={inputRef}
          value={searchQuery}
          onValueChange={setSearchQuery}
          onKeyDown={handleSearchKeyDown}
          placeholder="Search components..."
          className="h-9 rounded-lg"
          wrapperClassName="border rounded-lg"
        />
      </div>

      <CommandList
        className="max-h-none min-h-0 flex-1 overflow-y-auto p-3 scrollbar-no"
        onMouseMove={(e) => mouseY.set(e.clientY)}
        onMouseLeave={() => mouseY.set(HOVER_NONE)}
      >
        <CommandGroup>
          <CategoryHeading
            title="Components"
            variant="muted"
            className="mb-1.5"
          />
          {filteredEntries.map(([key, component], index) => (
            <SelectorItem
              key={key}
              mouseY={mouseY}
              index={index}
              itemKey={key}
              name={component.name}
              isActive={selectedComponent === key}
              isFirst={index === 0}
              isLast={index === filteredEntries.length - 1}
              onSelect={() => onSelect(key)}
              onHoverTick={hoverTick}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default ComponentSelector;
