"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { Minus } from "lucide-react";

interface CategoryItem {
  name: string;
  href: string;
  isNew?: boolean;
}

interface GettingStartedSection {
  title: string;
  items: CategoryItem[];
}

interface ComponentSidebarClientProps {
  gettingStartedSection: GettingStartedSection;
  componentItems: CategoryItem[]; 
  templateItems?: CategoryItem[];
}

export const ComponentSidebarClient: React.FC<ComponentSidebarClientProps> = ({
  gettingStartedSection,
  componentItems,
  templateItems = [],
}) => {
  const currentPath = usePathname();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (!scrollContainer) return;

    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      clearTimeout(scrollTimer);
    };
  }, []);

  const renderSectionItems = (items: CategoryItem[]) => {
    return items.map((item) => {
      const isActive = currentPath === item.href;
      return (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "group relative flex w-full items-center rounded-md border border-transparent py-1 transition duration-200 hover:translate-x-1 hover:text-black dark:hover:text-white text-sm hide-scrollbar",
            isActive
              ? "text-foreground font-medium"
              : "text-muted-foreground"
          )}
        >
          {isActive && (
            <Minus
              className="mr-1 text-violet-500"
              size={20}
              fill="#9C27B0"
              style={{ transform: "rotate(90deg)" }}
            />
          )}
          <span
            className={cn(
              "truncate",
              isActive
                ? "ml-0"
                : "ml-2 group-hover:ml-2 transition-all duration-200"
            )}
          >
            {item.name}
          </span>

          {/* NEW badge */}
          {item.isNew && (
            <span className="ml-2 rounded-md border border-violet-400 bg-violet-200 px-1.5 py-0.5 text-xs leading-none text-violet-700 no-underline group-hover:no-underline dark:bg-violet-300/10 dark:text-violet-500">
              New
            </span>
          )}
        </Link>
      );
    });
  };

  return (
    <div
      ref={scrollContainerRef}
      className={cn(
        "h-full overflow-y-auto transition-all duration-300 py-2 md:py-3",
        isScrolling
          ? "pr-1 md:pr-2 hide-scrollbar scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/30"
          : "pr-2 md:pr-3 scrollbar-no",
      )}
    >
      <div className="space-y-6 md:space-y-5 hide-scrollbar">
        {/* Getting Started Section */}
        <div className="">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white">
            {gettingStartedSection.title}
          </h4>
          <div className="grid grid-flow-row auto-rows-max text-sm">
            {gettingStartedSection.items.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex w-full items-center rounded-md border border-transparent py-1 transition duration-200 hover:translate-x-1 hover:text-black dark:hover:text-white",
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {isActive && (
                    <Minus
                      className="mr-1 text-violet-500"
                      size={20}
                      fill="#9C27B0"
                      style={{ transform: "rotate(90deg)" }}
                    />
                  )}
                  <span
                    className={cn(
                      "truncate",
                      isActive
                        ? "ml-0"
                        : "ml-2 group-hover:ml-2 transition-all duration-200"
                    )}
                  >
                    {item.name}
                  </span>

                  {/* NEW badge */}
                  {item.isNew && (
                    <span className="ml-2 rounded-md border border-violet-400 bg-violet-200 px-1.5 py-0.5 text-xs leading-none text-violet-700 no-underline group-hover:no-underline dark:bg-violet-300/10 dark:text-violet-500">
                      New
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Templates Section */}
        {templateItems.length > 0 && (
          <div>
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white">
              Templates
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {renderSectionItems(templateItems)}
            </div>
          </div>
        )}

        {/* Components Section */}
        <div className="pb-4">
          <h4 className="mb-2 rounded-md px-2 py-1 text-sm font-semibold text-black dark:text-white">
            All Components
          </h4>
          <div className="grid gap-1 grid-flow-row auto-rows-max text-sm">
            {renderSectionItems(componentItems)}
          </div>
        </div>
      </div>
    </div>
  );
};