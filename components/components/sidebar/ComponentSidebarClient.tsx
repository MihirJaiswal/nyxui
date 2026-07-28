"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useHoverTick } from "@/hooks/use-hover-tick";
import { useSidebarCollapse } from "@/hooks/use-sidebar-collapse";
import { SidebarItem } from "./SidebarItem";
import { SidebarSection } from "./SidebarSection";
import type {
  CategoryItem,
  ComponentSidebarClientProps,
} from "@/types/sidebar";

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

export const ComponentSidebarClient: React.FC<ComponentSidebarClientProps> = ({
  gettingStartedSection,
  componentItems,
  templateItems = [],
  blockItems = [],
  type = "components",
}) => {
  const currentPath = usePathname();
  const [isCollapsed, setIsCollapsed] = useSidebarCollapse();
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
          className="flex h-10 w-10 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
        >
          {isCollapsed ? (
            <PanelLeftOpen className="size-3.5" />
          ) : (
            <PanelLeftClose className="size-3.5" />
          )}
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
                <SidebarSection title={gettingStartedSection.title}>
                  {renderSectionItems(gettingStartedSection.items)}
                </SidebarSection>

                {templateItems.length > 0 &&
                  groupedTemplates.map(([category, items]) => (
                    <SidebarSection key={category} title={category}>
                      {renderSectionItems(items)}
                    </SidebarSection>
                  ))}

                {type === "components" &&
                  groupedComponents.map(([category, items]) => (
                    <SidebarSection key={category} title={category}>
                      {renderSectionItems(items)}
                    </SidebarSection>
                  ))}

                {type === "blocks" &&
                  groupedBlocks.map(([category, items]) => (
                    <SidebarSection key={category} title={category}>
                      {renderSectionItems(items)}
                    </SidebarSection>
                  ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
