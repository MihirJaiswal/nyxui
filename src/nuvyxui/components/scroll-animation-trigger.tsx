"use client";
import { useRef, useEffect, useState, useMemo, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
  type MotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollAnimationTriggerProps {
  children: ReactNode;
  className?: string;
  effect?: "fade" | "scale" | "slide" | "color" | "rotate" | "custom";
  threshold?: number;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  once?: boolean;
  customProps?: MotionProps;
  as?: keyof typeof motionElementMap;
  fromColor?: string;
  toColor?: string;
  fromRotation?: number;
  toRotation?: number;
  fromScale?: number;
  toScale?: number;
}

const motionElementMap = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  nav: motion.nav,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  button: motion.button,
};

type MotionElementKey = keyof typeof motionElementMap;

export function ScrollAnimationTrigger({
  children,
  className,
  effect = "fade",
  threshold = 0.1,
  delay = 0,
  duration = 0.5,
  direction = "up",
  once = false,
  customProps = {},
  as = "div",
  fromColor = "var(--color-muted)",
  toColor = "var(--color-primary)",
  fromRotation = direction === "left" ? -10 : 10,
  toRotation = 0,
  fromScale = 0.8,
  toScale = 1,
}: ScrollAnimationTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textColor = useTransform(scrollYProgress, [0, 1], [fromColor, toColor]);
  const rotation = useTransform(
    scrollYProgress,
    [0, 1],
    [fromRotation, toRotation],
  );

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const animationProps = useMemo(() => {
    const baseProps: MotionProps = {
      transition: { duration, delay, ease: "easeOut" },
    };

    switch (effect) {
      case "fade":
        baseProps.initial = { opacity: 0 };
        baseProps.animate = isInView ? { opacity: 1 } : { opacity: 0 };
        break;
      case "scale":
        baseProps.initial = { scale: fromScale, opacity: 0 };
        baseProps.animate = isInView
          ? { scale: toScale, opacity: 1 }
          : { scale: fromScale, opacity: 0 };
        break;
      case "slide":
        const offset = 50;
        const directionOffsets = {
          up: { y: offset, x: 0 },
          down: { y: -offset, x: 0 },
          left: { x: offset, y: 0 },
          right: { x: -offset, y: 0 },
        };
        baseProps.initial = { ...directionOffsets[direction], opacity: 0 };
        baseProps.animate = isInView
          ? { x: 0, y: 0, opacity: 1 }
          : { ...directionOffsets[direction], opacity: 0 };
        break;
      case "color":
        baseProps.style = { color: textColor };
        break;
      case "rotate":
        baseProps.style = {
          rotate: rotation,
          opacity: scrollYProgress,
        };
        break;
      case "custom":
        return {
          ...baseProps,
          ...customProps,
          animate: isInView ? customProps.animate : customProps.initial,
        };
    }
    return baseProps;
  }, [
    effect,
    isInView,
    duration,
    delay,
    fromScale,
    toScale,
    direction,
    textColor,
    rotation,
    scrollYProgress,
    customProps,
  ]);

  const MotionComponent =
    motionElementMap[as as MotionElementKey] || motion.div;

  return (
    <div
      ref={ref}
      style={{ width: "100%", height: "100%" }}
      data-testid="scroll-wrapper"
    >
      <MotionComponent
        className={cn("scroll-animation-trigger", className)}
        data-testid="scroll-animation"
        {...animationProps}
      >
        {children}
      </MotionComponent>
    </div>
  );
}

export function useScrollProgress(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    ...options,
  });
  return { ref, scrollYProgress };
}

export function useScrollTransform<T>(
  scrollYProgress: MotionValue<number>,
  inputRange = [0, 1] as [number, number],
  outputRange: [T, T],
) {
  return useTransform(scrollYProgress, inputRange, outputRange);
}

export function useScrollColor(
  scrollYProgress: MotionValue<number>,
  fromColor = "var(--color-muted)",
  toColor = "var(--color-primary)",
) {
  return useScrollTransform(scrollYProgress, [0, 1], [fromColor, toColor]);
}

export function useScrollSize(
  scrollYProgress: MotionValue<number>,
  fromSize = 0.8,
  toSize = 1,
) {
  return useScrollTransform(scrollYProgress, [0, 1], [fromSize, toSize]);
}

export function useScrollRotation(
  scrollYProgress: MotionValue<number>,
  fromRotation = -10,
  toRotation = 0,
) {
  return useScrollTransform(
    scrollYProgress,
    [0, 1],
    [fromRotation, toRotation],
  );
}

export interface ScrollProgressAnimationProps {
  children:
    | ReactNode
    | ((props: { scrollYProgress: MotionValue<number> }) => ReactNode);
  className?: string;
  offset?: [string, string];
}

export function ScrollProgressAnimation({
  children,
  className,
}: ScrollProgressAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      className={cn("scroll-progress-animation", className)}
      data-testid="scroll-progress"
    >
      {typeof children === "function"
        ? children({ scrollYProgress })
        : children}
    </div>
  );
}
