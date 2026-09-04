"use client";

import type React from "react";

const IMAGE_SRC = "/assets/images/landing-page/design-engineering.png";
const COLS = 4;
const ROWS = 3;

interface TiledImageProps {
  className?: string;
}

export function TiledImage({ className }: TiledImageProps): React.ReactElement {
  return (
    <div
      role="img"
      aria-label="Preview of design-engineered components, divided into an interactive grid where each tile desaturates on hover."
      className={`mx-auto grid aspect-[4/4] w-full grid-cols-4 grid-rows-3 overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:smooth-shadow-ring-xl ${className ?? ""}`}
    >
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        return (
          <div
            key={i}
            aria-hidden="true"
            className="w-full bg-[image:var(--tile-img)] bg-[length:400%_300%] transition-[filter] duration-300 hover:blur-[3px] transition-all"
            style={
              {
                "--tile-img": `url(${IMAGE_SRC})`,
                backgroundPosition: `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
