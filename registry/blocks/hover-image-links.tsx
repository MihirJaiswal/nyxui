"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import React, { useRef } from "react";

export type HoverImageLinksProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Container for a list of `<HoverImageLink>` rows.
 * Dark-first styling — designed for neutral-950 backgrounds.
 */
export const HoverImageLinks: React.FC<HoverImageLinksProps> = ({
  children,
  className,
}) => {
  return (
    <section className={cn("w-full bg-neutral-950 p-4 md:p-8", className)}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
};

export type HoverImageLinkProps = {
  heading: string;
  subheading: string;
  imgSrc: string;
  href?: string;
  className?: string;
};

export const HoverImageLink: React.FC<HoverImageLinkProps> = ({
  heading,
  subheading,
  imgSrc,
  href = "#",
  className,
}) => {
  const rowRef = useRef<HTMLAnchorElement>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const smoothX = useSpring(cursorX);
  const smoothY = useSpring(cursorY);

  const imageTop = useTransform(smoothY, [0.5, -0.5], ["40%", "60%"]);
  const imageLeft = useTransform(smoothX, [0.5, -0.5], ["60%", "70%"]);

  const trackCursor = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = rowRef.current?.getBoundingClientRect();
    if (!rect) return;

    cursorX.set((e.clientX - rect.left) / rect.width - 0.5);
    cursorY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.a
      href={href}
      ref={rowRef}
      onMouseMove={trackCursor}
      initial="initial"
      whileHover="whileHover"
      className={cn(
        "group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8",
        className,
      )}
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
        >
          {heading.split("").map((letter, i) => (
            <motion.span
              key={i}
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
          {subheading}
        </span>
      </div>

      <motion.img
        src={imgSrc}
        alt={`${heading} preview`}
        style={{
          top: imageTop,
          left: imageLeft,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
      />

      <motion.div
        variants={{
          initial: { x: "25%", opacity: 0 },
          whileHover: { x: "0%", opacity: 1 },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <ArrowRight className="text-5xl text-neutral-50" />
      </motion.div>
    </motion.a>
  );
};
