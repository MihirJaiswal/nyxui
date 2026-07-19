"use client";

import type React from "react";

import { motion } from "motion/react";
import { ChevronDown, Check, Search } from "lucide-react";
import type { ComponentRegistry } from "./types";
import { useState, useEffect, useRef } from "react";

interface ComponentSelectorProps {
  components: ComponentRegistry;
  selectedComponent: string;
  onSelect: (componentKey: string) => void;
}

const ComponentSelector = ({
  components,
  selectedComponent,
  onSelect,
}: ComponentSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const componentEntries = Object.entries(components);
  const selectedComponentData = components[selectedComponent];

  const filteredComponents = componentEntries.filter(
    ([key, component]) =>
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      key.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    setHighlightedIndex(-1);
  }, [isOpen]);

  useEffect(() => {
    if (filteredComponents.length > 0) {
      setHighlightedIndex(0);
    } else {
      setHighlightedIndex(-1);
    }
  }, [searchQuery, filteredComponents.length]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredComponents.length - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredComponents.length - 1,
        );
        break;
      case "Enter":
        event.preventDefault();
        const indexToSelect = highlightedIndex >= 0 ? highlightedIndex : 0;
        if (
          filteredComponents.length > 0 &&
          indexToSelect < filteredComponents.length
        ) {
          const [key] = filteredComponents[indexToSelect];
          onSelect(key);
          setIsOpen(false);
          setSearchQuery("");
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchQuery("");
        break;
    }
  };

  const handleToggleDropdown = () => {
    if (isOpen) {
      setSearchQuery("");
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="border-b border-border/60 bg-background p-3">
        <button
          onClick={handleToggleDropdown}
          className="flex w-full items-center justify-between rounded-md border border-border/70 bg-background px-3 py-2.5 text-left transition-colors hover:bg-muted/50"
        >
          <div className="min-w-0 flex-1">
            <span className="mb-0.5 block text-[11px] font-medium uppercase text-muted-foreground">
              Component
            </span>
            <span className="block truncate text-sm font-medium">
              {selectedComponentData
                ? selectedComponentData.name
                : "Select a Component"}
            </span>
          </div>
          <ChevronDown
            className={`ml-2 h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-3 right-3 top-full z-50 mt-2 max-h-80 overflow-hidden rounded-md border border-border/70 bg-background shadow-lg"
          >
            <div className="border-b border-border/60 p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full rounded-md border border-border/70 bg-background py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              <div className="p-2">
                {filteredComponents.length > 0 ? (
                  filteredComponents.map(([key, component], index) => (
                    <motion.button
                      key={key}
                      onClick={() => {
                        onSelect(key);
                        setIsOpen(false);
                        setSearchQuery("");
                      }}
                      className={`w-full rounded-md px-3 py-2.5 text-left transition-colors ${
                        selectedComponent === key
                          ? "bg-muted text-foreground"
                          : highlightedIndex === index
                            ? "bg-muted/70 text-foreground"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                      onMouseEnter={() => setHighlightedIndex(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-sm font-medium">
                            {component.name}
                          </h4>
                          <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
                            {key}
                          </p>
                        </div>
                        {selectedComponent === key && (
                          <Check className="ml-2 h-4 w-4 flex-shrink-0 text-primary" />
                        )}
                      </div>
                    </motion.button>
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    <Search className="mx-auto mb-3 h-8 w-8 opacity-50" />
                    <p className="text-sm">No components found</p>
                    <p className="mt-1 text-xs">Try a different search term</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {componentEntries.length === 0 && (
        <div className="py-8 text-center text-muted-foreground">
          <p className="text-sm">No components available</p>
        </div>
      )}
    </div>
  );
};

export default ComponentSelector;
