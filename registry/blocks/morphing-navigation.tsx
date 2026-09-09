"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import React, { createContext, useContext, useState } from "react";

type SlideDirection = "rtl" | "ltr" | null;

type MorphingNavDirectionContextValue = {
  slideDirection: SlideDirection;
  openTab: (tab: number | null) => void;
};

type MorphingNavActiveTabContextValue = {
  activeTab: number | null;
};

const MorphingNavDirectionContext =
  createContext<MorphingNavDirectionContextValue | null>(null);
const MorphingNavActiveTabContext =
  createContext<MorphingNavActiveTabContextValue | null>(null);

function useMorphingNavigation() {
  const direction = useContext(MorphingNavDirectionContext);
  const activeTab = useContext(MorphingNavActiveTabContext);
  if (!direction || !activeTab) {
    throw new Error("Dropdown subcomponents must be used inside <Dropdown>.");
  }
  return { ...direction, ...activeTab };
}

export type DropdownProps = {
  children: React.ReactNode;
  className?: string;
};

export const Dropdown: React.FC<DropdownProps> = ({ children, className }) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(null);

  const openTab = (tab: number | null) => {
    if (typeof activeTab === "number" && typeof tab === "number") {
      setSlideDirection(activeTab > tab ? "rtl" : "ltr");
    } else if (tab === null) {
      setSlideDirection(null);
    }
    setActiveTab(tab);
  };

  return (
    <MorphingNavDirectionContext.Provider value={{ slideDirection, openTab }}>
      <MorphingNavActiveTabContext.Provider value={{ activeTab }}>
        <span
          onMouseLeave={() => openTab(null)}
          className={cn("relative flex h-fit gap-2", className)}
        >
          {children}
        </span>
      </MorphingNavActiveTabContext.Provider>
    </MorphingNavDirectionContext.Provider>
  );
};

export type TriggerWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export const TriggerWrapper: React.FC<TriggerWrapperProps> = ({
  children,
  className,
}) => {
  const { activeTab, openTab } = useMorphingNavigation();

  return (
    <>
      {React.Children.map(children, (e, i) => (
        <button
          onMouseEnter={() => openTab(i + 1)}
          onClick={() => openTab(i + 1)}
          className={cn(
            "flex h-10 items-center gap-0.5 rounded-md px-4 py-2 text-sm font-medium text-neutral-950 transition-colors dark:text-white",
            activeTab === i + 1 &&
              "bg-neutral-100 dark:bg-neutral-800 [&>svg]:rotate-180",
            className,
          )}
        >
          {e}
        </button>
      ))}
    </>
  );
};

export type TriggerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Trigger: React.FC<TriggerProps> = ({ children, className }) => {
  return (
    <>
      <span className={cn("", className)}>{children}</span>
      <ChevronDown
        aria-hidden
        className="relative top-[1px] ml-1 h-3 w-3 transition-transform duration-200"
      />
    </>
  );
};

export type TabsProps = {
  children: React.ReactNode;
  className?: string;
};

export const Tabs: React.FC<TabsProps> = ({ children, className }) => {
  const { activeTab, slideDirection } = useMorphingNavigation();

  return (
    <motion.div
      id="overlay-content"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={
        activeTab ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }
      }
      className="absolute left-0 top-[calc(100%+6px)] w-auto"
    >
      <div className="absolute -top-1.5 left-0 right-0 h-1.5" />
      <div
        className={cn(
          "rounded-xl border border-border/40 bg-white/80 backdrop-blur-xl transition-all duration-300 dark:bg-neutral-950/80",
          className,
        )}
      >
        {React.Children.map(children, (e, i) => (
          <div className="overflow-hidden">
            <AnimatePresence>
              {activeTab !== null && (
                <motion.div exit={{ opacity: 0 }}>
                  {activeTab === i + 1 && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        x:
                          slideDirection === "ltr"
                            ? 100
                            : slideDirection === "rtl"
                              ? -100
                              : 0,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {e}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export type TabProps = {
  children: React.ReactNode;
  className?: string;
};

export const Tab: React.FC<TabProps> = ({ children, className }) => {
  return <div className={cn("h-full w-[500px]", className)}>{children}</div>;
};
