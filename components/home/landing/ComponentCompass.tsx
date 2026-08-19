"use client";

import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";

import { playHoverTick, preloadTick } from "@/lib/hover-tick";
import { COMPASS_GEOMETRY } from "./compass-geometry";
import { CompassTrack } from "./CompassTrack";
import { LandingActions } from "./LandingActions";
import type { LandingComponent } from "./types";
import responsiveStyles from "./compass-responsive.module.css";

const SMALL_LINES_PER_GROUP = COMPASS_GEOMETRY.smallLinesPerGroup;
const WHITE_GROUPS_PER_COMPONENT = COMPASS_GEOMETRY.whiteGroupsPerComponent;
const LINES_PER_WHITE_GROUP = SMALL_LINES_PER_GROUP + 1;
const SMALL_LINES_AFTER_LAST_BIG = SMALL_LINES_PER_GROUP;
const LINES_PER_COMPONENT =
  LINES_PER_WHITE_GROUP * WHITE_GROUPS_PER_COMPONENT +
  SMALL_LINES_AFTER_LAST_BIG +
  1;
const FIRST_MARKER_OFFSET = LINES_PER_COMPONENT / 2;
const DRAG_DEGREES_PER_PIXEL = 0.2;
const WHEEL_DEGREES_PER_PIXEL = 0.08;
const MOMENTUM_PROJECTION_MS = 180;
const INITIAL_COMPONENT_INDEX = 0;

interface ComponentCompassProps {
  components: LandingComponent[];
}

interface DragState {
  lastClientX: number;
  lastTimestamp: number;
  startRotation: number;
  startX: number;
  velocity: number;
}

interface StoppableAnimation {
  stop: () => void;
}

const SNAP_SPRING = {
  type: "spring",
  stiffness: 250,
  damping: 30,
  mass: 0.9,
} as const;

function wrapIndex(index: number, count: number): number {
  return ((index % count) + count) % count;
}

export function ComponentCompass({
  components,
}: ComponentCompassProps): React.ReactElement {
  const componentCount = Math.max(components.length, 1);
  const degreesPerComponent = 360 / componentCount;
  const timelineLineCount = componentCount * LINES_PER_COMPONENT;
  const wheelStyle: CSSProperties = {
    left: "50%",
  };
  const markerAngleOffset = (FIRST_MARKER_OFFSET / timelineLineCount) * 360;
  const initialRotation =
    -INITIAL_COMPONENT_INDEX * degreesPerComponent - markerAngleOffset;
  const rotation = useMotionValue(initialRotation);
  const shouldReduceMotion = useReducedMotion();
  const dragStateRef = useRef<DragState | null>(null);
  const didDragRef = useRef(false);
  const snapAnimationRef = useRef<StoppableAnimation | null>(null);
  const wheelTimerRef = useRef<number | null>(null);
  const lastSoundedLineRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const snapToRawIndex = useCallback(
    (rawIndex: number): void => {
      const targetRotation =
        -rawIndex * degreesPerComponent - markerAngleOffset;
      snapAnimationRef.current?.stop();
      snapAnimationRef.current = null;

      if (shouldReduceMotion) {
        rotation.jump(targetRotation);
        return;
      }

      snapAnimationRef.current = animate(rotation, targetRotation, {
        ...SNAP_SPRING,
        onComplete: () => {
          snapAnimationRef.current = null;
        },
      });
    },
    [degreesPerComponent, markerAngleOffset, rotation, shouldReduceMotion],
  );

  const snapRotation = useCallback(
    (velocity = 0): void => {
      const projectedRotation =
        rotation.get() + velocity * MOMENTUM_PROJECTION_MS;
      snapToRawIndex(
        Math.round(
          -(projectedRotation + markerAngleOffset) / degreesPerComponent,
        ),
      );
    },
    [degreesPerComponent, markerAngleOffset, rotation, snapToRawIndex],
  );

  const rotateToComponent = useCallback(
    (index: number): void => {
      const currentRawIndex =
        -(rotation.get() + markerAngleOffset) / degreesPerComponent;
      const nearestTurn = Math.round(
        (currentRawIndex - index) / componentCount,
      );
      snapToRawIndex(index + nearestTurn * componentCount);
    },
    [
      componentCount,
      degreesPerComponent,
      markerAngleOffset,
      rotation,
      snapToRawIndex,
    ],
  );

  useMotionValueEvent(rotation, "change", (latestRotation) => {
    const rawIndex = Math.round(
      -(latestRotation + markerAngleOffset) / degreesPerComponent,
    );
    setActiveIndex(wrapIndex(rawIndex, componentCount));
    const degreesPerLine = 360 / timelineLineCount;
    const currentLine = Math.round(latestRotation / degreesPerLine);
    if (currentLine !== lastSoundedLineRef.current) {
      lastSoundedLineRef.current = currentLine;
      playHoverTick(wrapIndex(currentLine, LINES_PER_COMPONENT));
    }
  });

  useEffect(() => {
    preloadTick();
  }, []);

  useEffect(() => {
    rotation.jump(initialRotation);
    setActiveIndex(INITIAL_COMPONENT_INDEX);

    return () => {
      snapAnimationRef.current?.stop();
      if (wheelTimerRef.current !== null) {
        window.clearTimeout(wheelTimerRef.current);
      }
    };
  }, [initialRotation, rotation]);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>): void => {
      preloadTick();
      didDragRef.current = false;

      if (
        event.target instanceof Element &&
        event.target.closest("a") !== null
      ) {
        dragStateRef.current = null;
        return;
      }

      dragStateRef.current = {
        lastClientX: event.clientX,
        lastTimestamp: event.timeStamp,
        startRotation: rotation.get(),
        startX: event.clientX,
        velocity: 0,
      };
    },
    [rotation],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>): void => {
      const dragState = dragStateRef.current;
      if (!dragState) return;

      const distance = event.clientX - dragState.startX;
      if (!didDragRef.current) {
        if (Math.abs(distance) <= 6) return;

        didDragRef.current = true;
        snapAnimationRef.current?.stop();
        snapAnimationRef.current = null;
        event.currentTarget.setPointerCapture(event.pointerId);
      }

      rotation.set(dragState.startRotation + distance * DRAG_DEGREES_PER_PIXEL);

      const elapsed = event.timeStamp - dragState.lastTimestamp;
      if (elapsed > 0) {
        const nextVelocity =
          ((event.clientX - dragState.lastClientX) / elapsed) *
          DRAG_DEGREES_PER_PIXEL;
        dragState.velocity = dragState.velocity * 0.65 + nextVelocity * 0.35;
      }

      dragState.lastClientX = event.clientX;
      dragState.lastTimestamp = event.timeStamp;
    },
    [rotation],
  );

  const finishDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>): void => {
      const velocity = dragStateRef.current?.velocity ?? 0;
      const didDrag = didDragRef.current;
      dragStateRef.current = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      if (didDrag) snapRotation(velocity);
    },
    [snapRotation],
  );

  const handleWheel = useCallback(
    (event: ReactWheelEvent<HTMLDivElement>): void => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY) && !event.shiftKey) {
        return;
      }

      event.preventDefault();
      preloadTick();
      snapAnimationRef.current?.stop();
      const delta = event.shiftKey ? event.deltaY : event.deltaX;
      rotation.set(rotation.get() - delta * WHEEL_DEGREES_PER_PIXEL);

      if (wheelTimerRef.current !== null) {
        window.clearTimeout(wheelTimerRef.current);
      }
      wheelTimerRef.current = window.setTimeout(() => snapRotation(), 140);
    },
    [rotation, snapRotation],
  );

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>): void => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      preloadTick();
      rotateToComponent(
        wrapIndex(
          activeIndex + (event.key === "ArrowRight" ? 1 : -1),
          componentCount,
        ),
      );
    },
    [activeIndex, componentCount, rotateToComponent],
  );

  const handleClickCapture = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>): void => {
      if (!didDragRef.current) return;
      event.preventDefault();
      didDragRef.current = false;
    },
    [],
  );

  return (
    <div className="relative left-1/2 mt-4 w-screen -translate-x-1/2 border-b border-border/60">
      <div className="relative mx-auto flex justify-center">
        <div
          onPointerEnter={preloadTick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          onClickCapture={handleClickCapture}
          className="relative h-96 w-full max-w-295 cursor-grab touch-pan-y select-none overflow-hidden outline-none active:cursor-grabbing focus-visible:ring-1 focus-visible:ring-brand/60"
          tabIndex={0}
          aria-label="Curved component compass. Drag to rotate and browse."
        >
          <div
            className={`absolute top-0 aspect-square ${responsiveStyles.wheel}`}
            style={wheelStyle}
          >
            <CompassTrack
              activeIndex={activeIndex}
              components={components}
              firstMarkerOffset={FIRST_MARKER_OFFSET}
              linesPerComponent={LINES_PER_COMPONENT}
              linesPerWhiteGroup={LINES_PER_WHITE_GROUP}
              onComponentFocus={rotateToComponent}
              onComponentHover={playHoverTick}
              rotation={rotation}
              timelineLineCount={timelineLineCount}
            />
          </div>
        </div>
        <div className="absolute bottom-15 left-1/2 z-30 -translate-x-1/2">
          <LandingActions />
        </div>
      </div>
    </div>
  );
}
