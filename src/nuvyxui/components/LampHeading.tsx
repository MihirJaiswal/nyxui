'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface LampHeadingProps {
  text: string;
  className?: string;
  gradientColors?: {
    from: string;
    to: string;
  };
  lineHeight?: number;
  glowIntensity?: number;
  glowSize?: number;
  animationSpeed?: number;
}

export const LampHeading = ({
  text,
  className,
  gradientColors = { from: "#ff3366", to: "#338ef7" },
  lineHeight = 2,
  glowIntensity = 0.7,
  glowSize = 20,
  animationSpeed = 3
}: LampHeadingProps) => {
  const mainLineRef = useRef<HTMLDivElement>(null);
  const flowAnimation = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: animationSpeed,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  useEffect(() => {
    if (mainLineRef.current) {
      mainLineRef.current.style.backgroundSize = "200% 200%";
    }
  }, []);

  return (
    <div className={cn("flex flex-col items-start", className)}>
      <h2 className="font-medium tracking-wide">
        {text}
      </h2>
      <div className="w-full relative mt-1">
        <motion.div
          variants={flowAnimation}
          animate="animate"
          style={{
            position: "absolute",
            width: "100%",
            height: `${Math.max(8, lineHeight * 3)}px`,
            background: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to}, ${gradientColors.from})`,
            filter: `blur(${glowSize / 2}px)`,
            opacity: glowIntensity * 0.7,
            bottom: 0,
            left: 0,
            transformOrigin: "center bottom",
            transform: "scaleY(1.2) translateY(0)",
            backgroundSize: "200% 200%",
          }}
          className="rounded-full"
        />
        <motion.div
          variants={flowAnimation}
          animate="animate"
          style={{
            position: "absolute",
            width: "100%",
            height: `${Math.max(4, lineHeight * 2)}px`,
            background: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to}, ${gradientColors.from})`,
            filter: `blur(${glowSize / 4}px)`,
            opacity: glowIntensity,
            bottom: 0,
            left: 0,
            transformOrigin: "center bottom",
            transform: "scaleY(0.8) translateY(0)",
            backgroundSize: "200% 200%",
          }}
          className="rounded-full"
          transition={{
            duration: animationSpeed * 0.8,
          }}
        />
        <motion.div
          ref={mainLineRef}
          variants={flowAnimation}
          animate="animate"
          style={{
            height: `${lineHeight}px`,
            background: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to}, ${gradientColors.from})`,
            position: "relative",
            zIndex: 10,
            backgroundSize: "200% 200%",
          }}
          className="w-full rounded-full"
        />
      </div>
    </div>
  );
}

export default LampHeading;