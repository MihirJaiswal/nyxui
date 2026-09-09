"use client";

import { cn } from "@/lib/utils";
import { useAnimate } from "motion/react";
import React from "react";

const FULL_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

type Edge = "left" | "right" | "top" | "bottom";

const ENTRY_CLIPS: Record<Edge, string[]> = {
  left: [BOTTOM_RIGHT_CLIP, FULL_CLIP],
  right: [TOP_LEFT_CLIP, FULL_CLIP],
  top: [BOTTOM_RIGHT_CLIP, FULL_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, FULL_CLIP],
};

const EXIT_CLIPS: Record<Edge, string[]> = {
  left: [FULL_CLIP, TOP_RIGHT_CLIP],
  right: [FULL_CLIP, BOTTOM_LEFT_CLIP],
  top: [FULL_CLIP, TOP_RIGHT_CLIP],
  bottom: [FULL_CLIP, TOP_RIGHT_CLIP],
};

function nearestEdge(e: React.MouseEvent<HTMLElement>): Edge {
  const rect = e.currentTarget.getBoundingClientRect();

  const distances: Array<{ distance: number; edge: Edge }> = [
    { distance: Math.abs(rect.left - e.clientX), edge: "left" },
    { distance: Math.abs(rect.right - e.clientX), edge: "right" },
    { distance: Math.abs(rect.top - e.clientY), edge: "top" },
    { distance: Math.abs(rect.bottom - e.clientY), edge: "bottom" },
  ];

  distances.sort((a, b) => a.distance - b.distance);
  return distances[0].edge;
}

export type ClipPathGridProps = {
  children: React.ReactNode;
  className?: string;
};

export const ClipPathGrid: React.FC<ClipPathGridProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "divide-y divide-foreground border border-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
};

export type ClipPathRowProps = {
  children: React.ReactNode;
  className?: string;
};

export const ClipPathRow: React.FC<ClipPathRowProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("grid w-full divide-x divide-foreground", className)}>
      {children}
    </div>
  );
};

export type ClipPathTileProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

export const ClipPathTile: React.FC<ClipPathTileProps> = ({
  children,
  href = "#",
  className,
}) => {
  const [overlayRef, animate] = useAnimate<HTMLDivElement>();

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    animate(overlayRef.current, { clipPath: ENTRY_CLIPS[nearestEdge(e)] });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    animate(overlayRef.current, { clipPath: EXIT_CLIPS[nearestEdge(e)] });
  };

  return (
    <a
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative grid h-20 w-full place-content-center sm:h-28 md:h-36",
        className,
      )}
    >
      {children}

      <div
        ref={overlayRef}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-foreground text-background"
      >
        {children}
      </div>
    </a>
  );
};
