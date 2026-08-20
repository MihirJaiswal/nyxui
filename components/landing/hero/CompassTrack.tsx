import { motion, type MotionValue } from "motion/react";
import { CompassComponentMarker } from "./CompassComponentMarker";
import { CompassRulerTicks } from "./CompassRulerTicks";
import type { LandingComponent } from "../../../types/landing";

interface CompassTrackProps {
  activeIndex: number;
  components: LandingComponent[];
  firstMarkerOffset: number;
  linesPerComponent: number;
  linesPerWhiteGroup: number;
  onComponentFocus: (index: number) => void;
  onComponentHover: (index: number) => void;
  rotation: MotionValue<number>;
  timelineLineCount: number;
}

const VISIBLE_MARKERS_EACH_SIDE = 2;

function getCircularIndexDistance(
  index: number,
  activeIndex: number,
  count: number,
): number {
  const forwardDistance = (((index - activeIndex) % count) + count) % count;
  return forwardDistance > count / 2
    ? forwardDistance - count
    : forwardDistance;
}

export function CompassTrack({
  activeIndex,
  components,
  firstMarkerOffset,
  linesPerComponent,
  linesPerWhiteGroup,
  onComponentFocus,
  onComponentHover,
  rotation,
  timelineLineCount,
}: CompassTrackProps): React.ReactElement {
  const degreesPerComponent = 360 / Math.max(components.length, 1);

  return (
    <motion.div
      data-component-timeline
      className="absolute inset-0"
      style={{ rotate: rotation }}
    >
      <div className="absolute rounded-full" style={{ inset: "2%" }} />
      <CompassRulerTicks
        firstMarkerOffset={firstMarkerOffset}
        linesPerComponent={linesPerComponent}
        linesPerWhiteGroup={linesPerWhiteGroup}
        timelineLineCount={timelineLineCount}
      />

      {components.map((component, index) => {
        const markerLine = index * linesPerComponent + firstMarkerOffset;
        const angle = (markerLine / timelineLineCount) * 360;

        return (
          <CompassComponentMarker
            key={component.slug}
            angle={angle}
            component={component}
            degreesPerComponent={degreesPerComponent}
            index={index}
            isActive={activeIndex === index}
            onFocus={onComponentFocus}
            onHoverTick={onComponentHover}
            rotation={rotation}
          />
        );
      })}
    </motion.div>
  );
}
