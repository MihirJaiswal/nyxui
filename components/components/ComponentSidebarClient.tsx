"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const activeItemRef = React.useRef<HTMLAnchorElement | null>(null);
  const groupedComponents = React.useMemo(
    () => groupItems(componentItems),
    [componentItems],
  );
  const groupedTemplates = React.useMemo(
    () => groupItems(templateItems),
    [templateItems],
  );
  const groupedBlocks = React.useMemo(
    () => groupItems(blockItems),
    [blockItems],
  );

  React.useEffect(() => {
    activeItemRef.current?.scrollIntoView({ block: "center" });
  }, []);

  const renderGuide = () => (
    <span className="flex w-11 shrink-0 items-center" aria-hidden="true">
      <motion.span
        className="block h-px shrink-0 origin-left bg-border dark:bg-white/18"
        variants={itemLineVariants}
        transition={{
          width: { type: "spring", stiffness: 600, damping: 32 },
          backgroundColor: { duration: 0 },
        }}
      />
    </span>
  );

  const renderCategoryHeading = (title: string) => (
    <h4 className="mb-2 flex items-center gap-3 text-sm font-medium text-foreground">
      <span className="flex w-11 shrink-0 items-center" aria-hidden="true">
        <span className="block h-px w-8 shrink-0 bg-border dark:bg-white/60" />
      </span>
      <span className="min-w-0 truncate">{title}</span>
    </h4>
  );

  const renderSectionItems = (items: CategoryItem[]) => {
    return items.map((item) => {
      const isActive = currentPath === item.href;
      return (
        <MotionLink
          key={item.href}
          ref={isActive ? activeItemRef : undefined}
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "group relative flex min-h-7 w-full items-center gap-3 rounded-md py-1 text-sm transition-colors hide-scrollbar",
            isActive
              ? "text-[#FF4F11]"
              : "text-muted-foreground hover:text-[#FF4F11]",
          )}
          initial={false}
          animate={isActive ? "active" : "normal"}
          whileHover="hover"
        >
          {renderGuide()}
          <motion.span
            className={cn(
              "min-w-0 flex-1 truncate text-sm",
              isActive && "font-medium",
            )}
            title={item.name}
            variants={itemLabelVariants}
            transition={{ type: "spring", stiffness: 600, damping: 32 }}
          >
            {item.name}
          </motion.span>
        </MotionLink>
      );
    });
  };

  return (
    <motion.div
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
        "overflow-hidden rounded-xl border border-border/70 bg-card/70 shadow-sm dark:border-white/5 dark:bg-[#0F0F0F]",
      )}
    >
      <div className="flex h-full flex-col">
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex h-10 shrink-0 items-center text-muted-foreground transition-colors hover:text-[#FF4F11]",
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
                className="space-y-4 hide-scrollbar"
              >
                {/* Getting Started Section */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className=""
                >
                  {renderCategoryHeading(gettingStartedSection.title)}
                  <div className="grid grid-flow-row auto-rows-max text-sm">
                    {gettingStartedSection.items.map((item) => {
                      const isActive = currentPath === item.href;
                      return (
                        <MotionLink
                          key={item.href}
                          ref={isActive ? activeItemRef : undefined}
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "group relative flex min-h-7 w-full items-center gap-3 rounded-md py-1 transition-colors",
                            isActive
                              ? "text-[#FF4F11]"
                              : "text-muted-foreground hover:text-[#FF4F11]",
                          )}
                          initial={false}
                          animate={isActive ? "active" : "normal"}
                          whileHover="hover"
                        >
                          {renderGuide()}
                          <motion.span
                            className={cn(
                              "min-w-0 flex-1 truncate text-sm",
                              isActive && "font-medium",
                            )}
                            title={item.name}
                            variants={itemLabelVariants}
                            transition={{
                              type: "spring",
                              stiffness: 600,
                              damping: 32,
                            }}
                          >
                            {item.name}
                          </motion.span>
                        </MotionLink>
                      );
                    })}
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
                      {renderCategoryHeading(category)}
                      <div className="grid grid-flow-row auto-rows-max text-sm">
                        {renderSectionItems(items)}
                      </div>
                    </motion.div>
                  ))}

                {/* Components Section */}
                {type === "components" && (
                  <>
                    {groupedComponents.map(([category, items]) => (
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
                        {renderCategoryHeading(category)}
                        <div className="grid grid-flow-row auto-rows-max text-sm">
                          {renderSectionItems(items)}
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}

                {/* Blocks Section */}
                {type === "blocks" && (
                  <>
                    {groupedBlocks.map(([category, items]) => (
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
                        {renderCategoryHeading(category)}
                        <div className="grid grid-flow-row auto-rows-max text-sm">
                          {renderSectionItems(items)}
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const MotionLink = motion.create(Link);

const itemLineVariants = {
  normal: { width: 32 },
  active: { width: 44, backgroundColor: "#FF4F11" },
  hover: { width: 44, backgroundColor: "#FF4F11" },
};

const itemLabelVariants = {
  normal: { x: 0 },
  active: { x: 4 },
  hover: { x: 4 },
};

function groupItems(items: CategoryItem[]): [string, CategoryItem[]][] {
  const grouped = new Map<string, CategoryItem[]>();

  for (const item of items) {
    const category = item.category ?? "Components";
    const existing = grouped.get(category) ?? [];
    existing.push(item);
    grouped.set(category, existing);
  }

  return Array.from(grouped.entries()).sort(([a], [b]) => a.localeCompare(b));
}
