"use client";

import type React from "react";
import { motion } from "motion/react";
import { Search, X } from "lucide-react";
import type { ComponentRegistry } from "./types";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface ComponentSelectorProps {
  components: ComponentRegistry;
  selectedComponent: string;
  onSelect: (componentKey: string) => void;
}

const itemLineVariants = {
  normal: { width: 28 },
  active: { width: 40, backgroundColor: "#FF4F11" },
  hover: { width: 40, backgroundColor: "#FF4F11" },
};

const itemLabelVariants = {
  normal: { x: 0 },
  active: { x: 4 },
  hover: { x: 4 },
};

const ComponentSelector = ({
  components,
  selectedComponent,
  onSelect,
}: ComponentSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");

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

            <div className="grid grid-flow-row auto-rows-max text-sm">
              {filteredComponents.length > 0 ? (
                filteredComponents.map(([key, component]) => {
                  const isActive = selectedComponent === key;
                  return (
                    <motion.button
                      key={key}
                      onClick={() => onSelect(key)}
                      className={cn(
                        "group relative flex min-h-7 w-full items-center gap-3 rounded-md py-1 text-sm transition-colors",
                        isActive
                          ? "text-[#FF4F11]"
                          : "text-muted-foreground hover:text-[#FF4F11]",
                      )}
                      initial={false}
                      animate={isActive ? "active" : "normal"}
                      whileHover="hover"
                    >
                      <span
                        className="flex w-11 shrink-0 items-center"
                        aria-hidden="true"
                      >
                        <motion.span
                          className="block h-px shrink-0 origin-left bg-border dark:bg-white/30"
                          variants={itemLineVariants}
                          transition={{
                            width: {
                              type: "spring",
                              stiffness: 600,
                              damping: 32,
                            },
                            backgroundColor: { duration: 0 },
                          }}
                        />
                      </span>
                      <motion.span
                        className={cn(
                          "min-w-0 flex-1 truncate text-sm text-left",
                          isActive && "font-medium",
                        )}
                        title={component.name}
                        variants={itemLabelVariants}
                        transition={{
                          type: "spring",
                          stiffness: 600,
                          damping: 32,
                        }}
                      >
                        {component.name}
                      </motion.span>
                    </motion.button>
                  );
                })
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
