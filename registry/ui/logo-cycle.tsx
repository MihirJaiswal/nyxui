"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";

export type LogoCyclePair = {
  top: ReactNode;
  bottom: ReactNode;
};

export type LogoCycleProps = {
  pairs?: LogoCyclePair[];
  columns?: number;
  duration?: number;
  iconSize?: number;
  className?: string;
};

const CELL_HEIGHT = 48;
const PILL_WIDTH = 50;

function SwapCell({
  top,
  bottom,
  duration,
  iconSize,
}: {
  top: ReactNode;
  bottom: ReactNode;
  duration: number;
  iconSize: number;
}) {
  const transition = {
    ease: "easeInOut" as const,
    duration,
    repeat: Infinity,
    times: [0, 0.3, 0.4, 0.7, 0.8, 1],
  };

  const pillStyle: CSSProperties = {
    height: CELL_HEIGHT,
    width: PILL_WIDTH,
    borderRadius: PILL_WIDTH / 2,
  };

  const rotate = ["0deg", "0deg", "180deg", "180deg", "360deg", "360deg"];

  const iconWrap: CSSProperties = {
    width: iconSize,
    height: iconSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const renderContent = (node: ReactNode) =>
    typeof node === "string" ? (
      <span className="text-xs font-medium text-foreground">{node}</span>
    ) : (
      node
    );

  return (
    <div
      className="group relative w-full overflow-hidden bg-background"
      style={{ height: CELL_HEIGHT }}
    >
      <motion.div
        style={{ y: "-50%", x: "-50%", ...pillStyle }}
        animate={{ rotate }}
        transition={transition}
        className="absolute left-1/2 z-10 overflow-hidden bg-background ring-1 ring-inset ring-border group-hover:[animation-play-state:paused]"
      >
        <div
          style={{
            bottom: 0,
            transform: "translateY(50%) translateX(-50%)",
          }}
          className="absolute left-1/2"
        >
          <div style={iconWrap}>{renderContent(top)}</div>
        </div>
        <div
          style={{
            top: 0,
            transform: "translateY(-50%) translateX(-50%) rotate(180deg)",
          }}
          className="absolute left-1/2"
        >
          <div style={iconWrap}>{renderContent(bottom)}</div>
        </div>
      </motion.div>
      <motion.div
        style={{ y: "50%", x: "-50%", ...pillStyle }}
        animate={{ rotate }}
        transition={transition}
        className="absolute left-1/2 z-10 overflow-hidden bg-background ring-1 ring-inset ring-border group-hover:[animation-play-state:paused]"
      >
        <div
          style={{
            bottom: 0,
            transform: "translateY(50%) translateX(-50%) rotate(180deg)",
          }}
          className="absolute left-1/2"
        >
          <div style={iconWrap}>{renderContent(bottom)}</div>
        </div>
        <div
          style={{
            top: 0,
            transform: "translateY(-50%) translateX(-50%)",
          }}
          className="absolute left-1/2"
        >
          <div style={iconWrap}>{renderContent(top)}</div>
        </div>
      </motion.div>
    </div>
  );
}

export function LogoCycle({
  pairs = [],
  columns = 3,
  duration = 10,
  iconSize = 24,
  className,
}: LogoCycleProps) {
  if (pairs.length === 0) return null;

  return (
    <section className={className}>
      <div
        className="mx-auto grid max-w-3xl gap-px bg-border p-px"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {pairs.map((pair, index) => (
          <SwapCell
            key={index}
            top={pair.top}
            bottom={pair.bottom}
            duration={duration}
            iconSize={iconSize}
          />
        ))}
      </div>
    </section>
  );
}

export default LogoCycle;
