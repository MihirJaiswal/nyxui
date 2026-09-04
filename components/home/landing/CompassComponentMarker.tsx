"use client";

import Image from "next/image";
import Link from "next/link";
import { Box } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useState } from "react";
import { COMPASS_GEOMETRY } from "./compass-geometry";
import type { LandingComponent } from "./types";
import { cn } from "@/lib/utils";

interface CompassComponentMarkerProps {
  angle: number;
  component: LandingComponent;
  degreesPerComponent: number;
  index: number;
  isActive: boolean;
  onFocus: (index: number) => void;
  onHoverTick: (index: number) => void;
  rotation: MotionValue<number>;
}

const INACTIVE_CARD_SCALE = 0.86;
const ACTIVE_CARD_SCALE = 1.08;

function getShortestAngle(angle: number): number {
  return ((((angle + 180) % 360) + 360) % 360) - 180;
}

export function CompassComponentMarker({
  angle,
  component,
  degreesPerComponent,
  index,
  isActive,
  onFocus,
  onHoverTick,
  rotation,
}: CompassComponentMarkerProps): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const proximityScale = useTransform(rotation, (currentRotation) => {
    const distanceFromCenter = Math.abs(
      getShortestAngle(angle + currentRotation),
    );
    const proximity = Math.max(0, 1 - distanceFromCenter / degreesPerComponent);
    const easedProximity = proximity * proximity * (3 - 2 * proximity);

    return (
      INACTIVE_CARD_SCALE +
      (ACTIVE_CARD_SCALE - INACTIVE_CARD_SCALE) * easedProximity
    );
  });
  const smoothScale = useSpring(proximityScale, {
    stiffness: 170,
    damping: 24,
    mass: 0.9,
  });
  const markerHeight = isActive
    ? COMPASS_GEOMETRY.activeMarkerHeightCqw
    : isHovered
      ? COMPASS_GEOMETRY.hoveredMarkerHeightCqw
      : COMPASS_GEOMETRY.inactiveMarkerHeightCqw;

  return (
    <div
      data-component-marker
      className="group/marker absolute left-1/2 top-1/2"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <motion.span
        aria-hidden="true"
        className={
          isActive
            ? "pointer-events-none absolute left-0 top-0 w-0.5 bg-brand transition-colors duration-200"
            : "pointer-events-none absolute left-0 top-0 w-px bg-foreground transition-colors duration-200 group-hover/marker:bg-brand group-focus-within/marker:bg-brand"
        }
        animate={{ height: `${markerHeight}cqw` }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 380, damping: 28, mass: 0.8 }
        }
        style={{
          transform: `translate(-50%, -${COMPASS_GEOMETRY.rulerRadiusCqw}cqw)`,
        }}
      />
      <div
        className="absolute left-0 top-0"
        style={{
          transform: `translateY(-${COMPASS_GEOMETRY.cardRadiusCqw}cqw)`,
        }}
      >
        <motion.div
          className="w-28 -translate-x-1/2 -translate-y-1/2 sm:w-36"
          style={{ scale: shouldReduceMotion ? proximityScale : smoothScale }}
        >
          <Link
            href={`/components/${component.slug}`}
            onFocus={(event) => {
              if (event.currentTarget.matches(":focus-visible")) {
                onFocus(index);
              }
            }}
            onMouseEnter={() => {
              setIsHovered(true);
              onHoverTick(index);
            }}
            onMouseLeave={() => setIsHovered(false)}
            className="group block"
          >
            <div
              className={cn(
                "aspect-[1.65/1] w-full overflow-hidden rounded-xl p-0.5 shadow-lg",
                isActive || isHovered
                  ? "bg-linear-to-r from-brand/30 via-brand/85 to-brand/30"
                  : "bg-primary/40",
              )}
            >
              <div className="h-full w-full overflow-hidden rounded-[10px] bg-background p-1">
                <div className="h-full w-full overflow-hidden rounded-lg bg-zinc-950">
                  {component.image ? (
                    <Image
                      src={component.image}
                      alt={`${component.name} preview`}
                      width={240}
                      height={146}
                      priority={index < 5}
                      draggable={false}
                      className="block h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-background">
                      <Box className="size-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <span
              className={
                isActive
                  ? "mt-1.5 block truncate text-center font-caveat text-brand"
                  : "mt-1.5 block truncate text-center font-caveat text-sm text-foreground"
              }
            >
              {component.name}
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
