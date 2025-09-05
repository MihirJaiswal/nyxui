"use client";
import { clsx } from "clsx";
import { motion } from "framer-motion";

export function BentoGrid({
  dark = false,
  className = "",
  title = "",
  description = "",
  component,
  fade = [],
  height = "h-96",
  enableTitle = true,
  enableDescription = true,
  isFull = false,
  padding = "p-10",
  titleClassName = "mt-1 text-2xl font-medium tracking-tight",
  descriptionClassName = "mt-2 max-w-[600px] text-sm",
  gradientPercentage = "to-50%",
  onHover,
}: {
  dark?: boolean;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  component: React.ReactNode;
  fade?: ("top" | "bottom")[];
  height?: string;
  enableTitle?: boolean;
  enableDescription?: boolean;
  isFull?: boolean;
  padding?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  gradientPercentage?: string;
  onHover?: () => void;
}) {
  const hoverVariants = {
    idle: { scale: 1 },
    active: { scale: 1.005, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={hoverVariants}
      onHoverStart={() => onHover?.()}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg",
        "bg-white dark:bg-zinc-950 shadow-md ring-1 ring-black/5 dark:ring-white/5",
        "data-[dark]:bg-zinc-950 data-[dark]:ring-white/5",
        "transition-all duration-300",
        isFull && "h-full",
      )}
      role="article"
    >
      <div
        className={clsx(
          "relative shrink-0",
          !isFull && height,
          isFull && "h-full",
        )}
      >
        {component}
        {fade.includes("top") && (
          <div
            aria-hidden="true"
            className={clsx(
              "absolute inset-0 bg-gradient-to-b from-white",
              gradientPercentage,
              "group-data-[dark]:from-zinc-950",
            )}
          />
        )}
        {fade.includes("bottom") && (
          <div
            aria-hidden="true"
            className={clsx(
              "absolute inset-0 bg-gradient-to-t from-white",
              gradientPercentage,
              "group-data-[dark]:from-zinc-950",
            )}
          />
        )}
        {isFull && (enableTitle || enableDescription) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-10">
            {enableTitle && (
              <h3 className={clsx(titleClassName, "text-white")}>{title}</h3>
            )}
            {enableDescription && (
              <p className={clsx(descriptionClassName, "text-gray-200")}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      {!isFull && (enableTitle || enableDescription) && (
        <div className={clsx("relative", padding)}>
          {enableTitle && (
            <h3
              className={clsx(
                titleClassName,
                "text-gray-950 group-data-[dark]:text-white dark:text-white",
              )}
            >
              {title}
            </h3>
          )}
          {enableDescription && (
            <p
              className={clsx(
                descriptionClassName,
                "text-gray-600 group-data-[dark]:text-gray-300 dark:text-gray-300",
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}
