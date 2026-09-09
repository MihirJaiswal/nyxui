"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { ArrowLeft, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export type ToolbarItem = {
  id: number | string;
  /** Accessible name announced for the icon button. */
  label: string;
  /** Icon rendered inside the toolbar button. */
  icon: React.ReactNode;
  /** Panel content revealed when the item is active. */
  content: React.ReactNode;
};

export type ExpandableToolbarProps = {
  items: ToolbarItem[];
  /**
   * When set, a trailing search icon is appended to the bar. Clicking it
   * morphs the toolbar into a back arrow + search input.
   */
  searchPlaceholder?: string;
  /** Controlled search value (uncontrolled by default). */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  className?: string;
};

/**
 * A floating icon toolbar that springs open to reveal a panel of content
 * above the active icon. With `searchPlaceholder` set, a search icon morphs
 * the bar into a search input. Clicks outside collapse everything.
 */
export const ExpandableToolbar: React.FC<ExpandableToolbarProps> = ({
  items,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  className,
}) => {
  const [active, setActive] = useState<ToolbarItem["id"] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [panelHeight, setPanelHeight] = useState<number>(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = panelRef.current;
    if (!node) return;
    const measure = () => setPanelHeight(node.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, [active]);

  const closeAll = () => {
    setIsOpen(false);
    setActive(null);
    setIsSearch(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleQueryChange = (next: string) => {
    onSearchChange?.(next);
    if (onSearchChange === undefined) setQuery(next);
  };

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0.1, duration: 0.25 }}>
      <div ref={rootRef} className={cn("w-fit", className)}>
        <motion.div
          layout
          className="h-full w-fit rounded-xl bg-background smooth-shadow-ring-lg"
        >
          <div className="overflow-hidden">
            <AnimatePresence initial={false} mode="sync">
              {isOpen && !isSearch ? (
                <motion.div
                  key="toolbar-content"
                  initial={{ height: 0 }}
                  animate={{ height: panelHeight || "auto" }}
                  exit={{ height: 0 }}
                >
                  <div ref={panelRef} className="p-2">
                    {items.map((item) => {
                      const isSelected = active === item.id;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isSelected ? 1 : 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <div
                            className={cn(
                              "px-2 pt-2 text-sm",
                              isSelected ? "block" : "hidden",
                            )}
                          >
                            {item.content}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {isSearch ? (
            <div className="flex w-72 gap-2 p-2">
              <button
                type="button"
                aria-label="Back"
                onClick={() => setIsSearch(false)}
                className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:scale-[0.98]"
              >
                <ArrowLeft className="size-4.5" />
              </button>
              <input
                autoFocus
                placeholder={searchPlaceholder}
                value={searchValue ?? query}
                onChange={(e) => handleQueryChange(e.target.value)}
                className="h-9 w-full rounded-lg bg-muted px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          ) : (
            <div className="flex w-fit gap-2 p-2">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.label}
                  aria-expanded={isOpen && active === item.id}
                  onClick={() => {
                    if (active === item.id && isOpen) {
                      setIsOpen(false);
                      setActive(null);
                      return;
                    }
                    setIsOpen(true);
                    setActive(item.id);
                  }}
                  className={cn(
                    "relative flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:scale-[0.98]",
                    active === item.id && "bg-accent text-foreground",
                  )}
                >
                  {item.icon}
                </button>
              ))}
              {searchPlaceholder !== undefined && (
                <button
                  type="button"
                  aria-label="Search"
                  onClick={() => {
                    setIsOpen(false);
                    setActive(null);
                    setIsSearch(true);
                  }}
                  className="relative flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:scale-[0.98]"
                >
                  <Search className="size-4.5" />
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </MotionConfig>
  );
};
