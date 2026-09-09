"use client";

import { cn } from "@/lib/utils";
import React from "react";

export type PopTextProps = {
  text: string;
  color?: string;
  hoverColor?: string;
  className?: string;
};

/**
 * Heading whose letters swell when hovered — the hovered letter gets the
 * most weight and brightness, and the effect fades out across its neighbors.
 */
export const PopText: React.FC<PopTextProps> = ({
  text,
  color = "#a5b4fc",
  hoverColor = "#e0e7ff",
  className,
}) => {
  return (
    <h2
      style={
        {
          color,
          "--pop-text-hover": hoverColor,
        } as React.CSSProperties
      }
      className={cn("cursor-default text-center text-5xl font-thin", className)}
    >
      {text.split("").map((letter, idx) => (
        <span key={idx} className="pop-text-letter">
          {letter}
        </span>
      ))}
    </h2>
  );
};
