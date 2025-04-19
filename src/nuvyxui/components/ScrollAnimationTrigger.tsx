"use client";
import { useRef, useEffect, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customProps?: Record<string, any>;
  as?: React.ElementType;
  fromColor?: string;
  toColor?: string;
  fromRotation?: number;
  toRotation?: number;
  fromScale?: number;
  toScale?: number;
}

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
    [fromRotation, toRotation]
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
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, once]);

  const getAnimationProps = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const baseProps: any = {
      initial: {},
      animate: {},
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
        const directionMap = {
          up: { y: offset },
          down: { y: -offset },
          left: { x: offset },
          right: { x: -offset },
        };
        baseProps.initial = { ...directionMap[direction], opacity: 0 };
        baseProps.animate = isInView
          ? { x: 0, y: 0, opacity: 1 }
          : { ...directionMap[direction], opacity: 0 };
        break;
      case "color":
        baseProps.style = { color: textColor };
        break;
      case "rotate":
        baseProps.style = { rotate: rotation, opacity: isInView ? 1 : 0 };
        break;
      case "custom":
        return {
          ...baseProps,
          ...customProps,
          animate: isInView
            ? { ...customProps.animate }
            : { ...customProps.initial },
        };
      default:
        break;
    }
    return baseProps;
  };

  const MotionComponent =
    as === "div"
      ? motion.div
      : as === "span"
      ? motion.span
      : as === "p"
      ? motion.p
      : as === "h1"
      ? motion.h1
      : as === "h2"
      ? motion.h2
      : as === "h3"
      ? motion.h3
      : as === "h4"
      ? motion.h4
      : as === "h5"
      ? motion.h5
      : as === "h6"
      ? motion.h6
      : as === "section"
      ? motion.section
      : as === "article"
      ? motion.article
      : as === "aside"
      ? motion.aside
      : as === "nav"
      ? motion.nav
      : as === "ul"
      ? motion.ul
      : as === "ol"
      ? motion.ol
      : as === "li"
      ? motion.li
      : as === "button"
      ? motion.button
      : motion.div;

  return (
    <MotionComponent
      ref={ref}
      className={cn("scroll-animation-trigger", className)}
      {...getAnimationProps()}
    >
      {children}
    </MotionComponent>
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

export function useScrollColor(
  scrollYProgress: MotionValue<number>,
  fromColor: string,
  toColor: string
) {
  return useTransform(scrollYProgress, [0, 1], [fromColor, toColor]);
}

export function useScrollSize(
  scrollYProgress: MotionValue<number>,
  fromSize: number,
  toSize: number
) {
  return useTransform(scrollYProgress, [0, 1], [fromSize, toSize]);
}

export function useScrollRotation(
  scrollYProgress: MotionValue<number>,
  fromRotation: number,
  toRotation: number
) {
  return useTransform(scrollYProgress, [0, 1], [fromRotation, toRotation]);
}

export interface ScrollProgressAnimationProps {
  children:
    | ReactNode
    | ((props: { scrollYProgress: MotionValue<number> }) => ReactNode);
  className?: string;
  offset?: ["start end", "end start"] | [string, string];
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
    <div ref={ref} className={cn("scroll-progress-animation", className)}>
      {typeof children === "function"
        ? children({ scrollYProgress })
        : children}
    </div>
  );
}
