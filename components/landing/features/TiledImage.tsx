"use client";

import type React from "react";
import { useCallback, useState } from "react";

interface TiledImageProps {
  src?: string;
  cols?: number;
  rows?: number;
  /** Aspect ratio of the CONTAINER — should match the source image's own ratio to avoid distortion */
  imageAspect?: string;
  className?: string;
}

export function TiledImage({
  src = "/assets/images/landing-page/design-engineering.png",
  cols = 4,
  rows = 3,
  imageAspect = "1 / 1", // set this to match your actual image's real width/height
  className,
}: TiledImageProps): React.ReactElement {
  const [active, setActive] = useState<Set<number>>(new Set());

  const toggleTile = useCallback((i: number) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  }, []);

  return (
    <div
      role="img"
      aria-label="Interactive preview grid of design-engineered components. Hover to blur, tap or click to invert a tile."
      className={`mx-auto grid w-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:smooth-shadow-ring-xl ${className ?? ""}`}
      style={{
        aspectRatio: imageAspect,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: cols * rows }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const isActive = active.has(i);
        return (
          <button
            key={i}
            type="button"
            onClick={() => toggleTile(i)}
            aria-pressed={isActive}
            aria-label={`Tile ${i + 1}`}
            className="relative w-full cursor-pointer border-0 bg-(image:--tile-img) p-0 outline-none
                       transition-[filter,transform] duration-300 ease-out
                       filter-[blur(var(--hover-blur,0px))_invert(var(--active,0))]
                       hover:[--hover-blur:3px]
                       focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-offset-2"
            style={
              {
                "--tile-img": `url(${src})`,
                "--active": isActive ? 1 : 0,
                backgroundSize: `${cols * 100}% ${rows * 100}%`,
                backgroundPosition: `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`,
                transform: isActive ? "scale(1.04)" : "scale(1)",
                zIndex: isActive ? 1 : 0,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
