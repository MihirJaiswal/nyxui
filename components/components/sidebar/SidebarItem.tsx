"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { animate, motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { PhantomLine } from "@/components/global/Phantom-line";
import {
  GuideLine,
  BASE_WIDTH,
  MAX_WIDTH,
  SPRING_CONFIG,
  LABEL_TRANSITION,
} from "@/components/global/GuideLine";
import type { CategoryItem } from "../../../types/sidebar-types";

const MotionLink = motion.create(Link);

interface SidebarItemProps {
  item: CategoryItem;
  isActive: boolean;
  isLast: boolean;
  index: number;
  activeItemRef: React.RefObject<HTMLAnchorElement | null>;
  onHoverTick: (index: number) => void;
}

export const SidebarItem = ({
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
