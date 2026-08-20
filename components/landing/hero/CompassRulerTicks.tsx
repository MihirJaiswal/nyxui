import { memo } from "react";
import { COMPASS_GEOMETRY } from "@/lib/compass-geometry";

interface CompassRulerTicksProps {
  firstMarkerOffset: number;
  linesPerComponent: number;
  linesPerWhiteGroup: number;
  timelineLineCount: number;
}

export const CompassRulerTicks = memo(function CompassRulerTicks({
  firstMarkerOffset,
  linesPerComponent,
  linesPerWhiteGroup,
  timelineLineCount,
}: CompassRulerTicksProps): React.ReactElement {
  return (
    <>
      {Array.from({ length: timelineLineCount }, (_, lineIndex) => {
        const cyclePosition = lineIndex % linesPerComponent;
        if (cyclePosition === firstMarkerOffset) return null;

        const isBigWhiteLine = cyclePosition % linesPerWhiteGroup === 0;
        const angle = (lineIndex / timelineLineCount) * 360;

        return (
          <span
            key={lineIndex}
            data-timeline-tick
            data-line-size={isBigWhiteLine ? "big" : "small"}
            className={
              isBigWhiteLine
                ? "absolute left-1/2 top-1/2 w-[1.3px] origin-top bg-foreground/80"
                : "absolute left-1/2 top-1/2 w-[1.3px] origin-top bg-foreground/50 dark:bg-foreground/40"
            }
            style={{
              height: isBigWhiteLine
                ? COMPASS_GEOMETRY.largeTickHeight
                : COMPASS_GEOMETRY.smallTickHeight,
              transform: `rotate(${angle}deg) translateY(-${COMPASS_GEOMETRY.rulerRadiusRem}rem)`,
            }}
          />
        );
      })}
    </>
  );
});
