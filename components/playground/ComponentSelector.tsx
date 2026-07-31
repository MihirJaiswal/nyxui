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
import { Grid } from "@/components/playground/Grid";
import { cn } from "@/lib/utils";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { useHoverTick } from "@/hooks/use-hover-tick";
import { CategoryHeading } from "@/components/global/CategoryHeading";
import type { ComponentRegistry } from "@/types/playground";
import { PhantomLine } from "@/components/global/PhantomLine";
import {
  GuideLine,
  BASE_WIDTH,
  MAX_WIDTH,
  SPRING_CONFIG,
  LABEL_TRANSITION,
} from "@/components/global/GuideLine";

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
  isKeyboardSelected: boolean;
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
  isKeyboardSelected,
  onSelect,
  onHoverTick,
}: SelectorItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const highlighted = isActive || hovered || isKeyboardSelected;
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
      )}
    >
      {isFirst && <PhantomLine position="top" />}

      <GuideLine width={width} highlighted={highlighted} />

      <motion.span
        animate={{ x: highlighted ? 4 : 0 }}
        transition={LABEL_TRANSITION}
        className={cn(
          "min-w-0 flex-1 truncate text-left transition-colors",
          isActive ? "text-brand" : "text-muted-foreground",
          highlighted && !isActive && "text-brand",
          "group-focus-within/cmdk:group-data-[selected=true]:text-brand",
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
  const [isInputFocused, setIsInputFocused] = useState(false);
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
      className="group/cmdk flex h-full flex-col gap-0 rounded-none bg-transparent"
    >
      <div className="lg:hidden">
        <Grid />
      </div>

      <div className="px-3 pt-3 lg:pt-4 lg:px-4">
        <div className="group relative">
          <CommandInput
            ref={inputRef}
            value={searchQuery}
            onValueChange={setSearchQuery}
            onKeyDown={handleSearchKeyDown}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="Search components..."
            className="h-9 rounded-lg text-sm pr-16"
            wrapperClassName="border rounded-lg"
          />
          <div className="pointer-events-none absolute right-2.5 top-1/2 flex -translate-y-1/2 items-center gap-1">
            <kbd className="flex h-4 min-w-4 items-center justify-center rounded border border-border/60 bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground group-focus-within:hidden">
              F
            </kbd>
            <kbd className="hidden h-4 min-w-4 items-center justify-center rounded border border-border/60 bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground group-focus-within:flex">
              Esc
            </kbd>
          </div>
        </div>
      </div>

      <CommandList
        className="max-h-none min-h-0 flex-1 overflow-y-auto p-3 lg:p-4 scrollbar-no"
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
              isKeyboardSelected={
                isInputFocused && highlightedValue === key.toLowerCase()
              }
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
