"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "../../lib/utils";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {
  animate,
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useState, useEffect } from "react";
import { useToggle } from "../../hooks/use-toggle";
import { PhantomLine } from "../global/Phantom-line";
import {
  GuideLine,
  BASE_WIDTH,
  MAX_WIDTH,
  SPRING_CONFIG,
  LABEL_TRANSITION,
} from "../global/GuideLine";
import { useHoverTick } from "@/hooks/use-hover-tick";
import { CategoryHeading } from "../global/CategoryHeading";

interface CategoryItem {
  name: string;
  href: string;
  isNew?: boolean;
  category?: string;
}

interface GettingStartedSection {
  title: string;
  items: CategoryItem[];
}

interface ComponentSidebarClientProps {
  gettingStartedSection: GettingStartedSection;
  componentItems: CategoryItem[];
  templateItems?: CategoryItem[];
  blockItems?: CategoryItem[];
  type?: "components" | "blocks";
}

export const ComponentSidebarClient: React.FC<ComponentSidebarClientProps> = ({
  gettingStartedSection,
  componentItems,
  templateItems = [],
  blockItems = [],
  type = "components",
}) => {
  const currentPath = usePathname();
  const [isCollapsed, , setIsCollapsed] = useToggle(false);
  const activeItemRef = React.useRef<HTMLAnchorElement | null>(null);
  const hoverTick = useHoverTick();

  const groupedComponents = React.useMemo(
    () => groupItems(componentItems, "Components"),
    [componentItems],
  );
  const groupedTemplates = React.useMemo(
    () => groupItems(templateItems, "Templates"),
    [templateItems],
  );
  const groupedBlocks = React.useMemo(
    () => groupItems(blockItems, "Blocks"),
    [blockItems],
  );

  const lastVisibleHref = React.useMemo(() => {
    const lastGettingStarted = gettingStartedSection.items.at(-1)?.href;
    const lastTemplate =
      templateItems.length > 0
        ? groupedTemplates.at(-1)?.[1].at(-1)?.href
        : undefined;
    const lastComponent =
      type === "components" && groupedComponents.length > 0
        ? groupedComponents.at(-1)?.[1].at(-1)?.href
        : undefined;
    const lastBlock =
      type === "blocks" && groupedBlocks.length > 0
        ? groupedBlocks.at(-1)?.[1].at(-1)?.href
        : undefined;

    return lastBlock ?? lastComponent ?? lastTemplate ?? lastGettingStarted;
  }, [
    gettingStartedSection,
    groupedTemplates,
    templateItems.length,
    type,
    groupedComponents,
    groupedBlocks,
  ]);

  React.useEffect(() => {
    activeItemRef.current?.scrollIntoView({ block: "center" });
  }, []);

  const renderSectionItems = (items: CategoryItem[]) =>
    items.map((item, index) => (
      <SidebarItem
        key={item.href}
        item={item}
        index={index}
        isActive={currentPath === item.href}
        isLast={item.href === lastVisibleHref}
        activeItemRef={activeItemRef}
        onHoverTick={hoverTick}
      />
    ));

  return (
    <motion.div
      initial={false}
      animate={{
        width: isCollapsed ? 48 : 288,
        height: isCollapsed ? 40 : "calc(100% - 1.5rem)",
      }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 30,
        mass: 0.8,
      }}
      className={cn(
        "overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm",
      )}
    >
      <div className="flex h-full flex-col">
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex h-10 shrink-0 items-center text-muted-foreground transition-colors hover:text-primary",
            isCollapsed ? "justify-center px-0" : "gap-2 px-3",
          )}
        >
          <motion.span
            key={isCollapsed ? "open" : "close"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="size-3.5" />
            ) : (
              <PanelLeftClose className="size-3.5" />
            )}
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              key="sidebar-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12, delay: isCollapsed ? 0 : 0.08 }}
              className="min-h-0 flex-1 overflow-y-auto px-3 pb-3 scrollbar-no"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.02 } },
                }}
                className="space-y-2 hide-scrollbar"
              >
                {/* Getting Started Section */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <CategoryHeading title={gettingStartedSection.title} />
                  <div className="grid grid-flow-row auto-rows-max text-sm">
                    {renderSectionItems(gettingStartedSection.items)}
                  </div>
                </motion.div>

                {/* Templates Section */}
                {templateItems.length > 0 &&
                  groupedTemplates.map(([category, items]) => (
                    <motion.div
                      key={category}
                      variants={{
                        hidden: { opacity: 0, x: -8 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <CategoryHeading title={category} />
                      <div className="grid grid-flow-row auto-rows-max text-sm">
                        {renderSectionItems(items)}
                      </div>
                    </motion.div>
                  ))}

                {/* Components Section */}
                {type === "components" &&
                  groupedComponents.map(([category, items]) => (
                    <motion.div
                      key={category}
                      variants={{
                        hidden: { opacity: 0, x: -8 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <CategoryHeading title={category} />
                      <div className="grid grid-flow-row auto-rows-max text-sm">
                        {renderSectionItems(items)}
                      </div>
                    </motion.div>
                  ))}

                {/* Blocks Section */}
                {type === "blocks" &&
                  groupedBlocks.map(([category, items]) => (
                    <motion.div
                      key={category}
                      variants={{
                        hidden: { opacity: 0, x: -8 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <CategoryHeading title={category} />
                      <div className="grid grid-flow-row auto-rows-max text-sm">
                        {renderSectionItems(items)}
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const MotionLink = motion.create(Link);

interface SidebarItemProps {
  item: CategoryItem;
  isActive: boolean;
  isLast: boolean;
  index: number;
  activeItemRef: React.RefObject<HTMLAnchorElement | null>;
  onHoverTick: (index: number) => void;
}

const SidebarItem = ({
  item,
  isActive,
  isLast,
  index,
  activeItemRef,
  onHoverTick,
}: SidebarItemProps) => {
  const [hovered, setHovered] = useState(false);
  const widthMv = useMotionValue(isActive ? MAX_WIDTH : BASE_WIDTH);
  const width = useSpring(widthMv, SPRING_CONFIG);
  const highlighted = isActive || hovered;

  useEffect(() => {
    animate(widthMv, highlighted ? MAX_WIDTH : BASE_WIDTH, SPRING_CONFIG);
  }, [highlighted, widthMv]);

  return (
    <MotionLink
      ref={isActive ? activeItemRef : undefined}
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      onMouseEnter={() => {
        setHovered(true);
        if (!isActive) onHoverTick(index);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative flex min-h-7 w-full items-center gap-3 rounded-md py-1 text-sm transition-colors hide-scrollbar",
        isActive ? "text-primary" : "text-muted-foreground hover:text-primary",
      )}
    >
      {index === 0 && <PhantomLine position="top" />}
      <GuideLine width={width} highlighted={highlighted} />
      <motion.span
        animate={{ x: highlighted ? 4 : 0 }}
        transition={LABEL_TRANSITION}
        className={cn(
          "min-w-0 flex-1 truncate text-sm",
          isActive && "font-medium",
        )}
        title={item.name}
      >
        {item.name}
      </motion.span>
      {!isLast && <PhantomLine position="bottom" />}
    </MotionLink>
  );
};

function groupItems(
  items: CategoryItem[],
  fallbackCategory: string,
): [string, CategoryItem[]][] {
  const grouped = new Map<string, CategoryItem[]>();

  for (const item of items) {
    const category = item.category ?? fallbackCategory;
    const existing = grouped.get(category) ?? [];
    existing.push(item);
    grouped.set(category, existing);
  }

  return Array.from(grouped.entries()).sort(([a], [b]) => a.localeCompare(b));
}
