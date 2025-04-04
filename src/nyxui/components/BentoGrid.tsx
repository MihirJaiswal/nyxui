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
  height = "h-88", // Default height
  enableTitle = true, // Enable/disable title display
  enableDescription = true, // Enable/disable description display
  isFull = false, // Whether to use full height mode
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
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg",
        "bg-white dark:bg-zinc-950 shadow-sm ring-1 ring-black/5 dark:ring-white/5",
        "data-[dark]:bg-zinc-950 data-[dark]:ring-white/5",
        isFull && "h-full", // Make the entire component take full height when isFull is true
      )}
    >
      <div 
        className={clsx(
          "relative shrink-0", 
          !isFull && height, // Apply height only when not in full mode
          isFull && "h-full", // Make content area take full height in full mode
        )}
      >
        {component}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-white to-50% group-data-[dark]:from-gray-950 group-data-[dark]:from-[-25%]" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-white to-50% group-data-[dark]:from-gray-950 group-data-[dark]:from-[-25%]" />
        )}
        
        {/* Overlay content when in full mode */}
        {isFull && (enableTitle || enableDescription) && (
          <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/70 to-transparent">
            {enableTitle && (
              <p className="mt-1 text-2xl/8 font-medium tracking-tight text-white">
                {title}
              </p>
            )}
            {enableDescription && (
              <p className="mt-2 max-w-[600px] text-sm/6 text-gray-200">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Standard content display when not in full mode */}
      {!isFull && (enableTitle || enableDescription) && (
        <div className="relative p-10">
          {enableTitle && (
            <p className="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 group-data-[dark]:text-white dark:text-white">
              {title}
            </p>
          )}
          {enableDescription && (
            <p className="mt-2 max-w-[600px] text-sm/6 text-gray-600 group-data-[dark]:text-gray-400 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
}