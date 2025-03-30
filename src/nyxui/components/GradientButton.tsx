import React from "react";
import clsx from "clsx";

export type GradientButtonProps = {
  variant?: "animated" | "fill" | "slide-up";
  size?: "default" | "sm" | "lg";
  gradientFrom?: string; 
  gradientTo?: string;
  children: React.ReactNode;
};

export const GradientButton = ({
  variant = "fill",
  size = "default",
  gradientFrom = "pink-500",
  gradientTo = "violet-600",
  children,
}: GradientButtonProps) => {
  const baseClasses =
    "inline-flex h-12 items-center justify-center rounded-md px-6 font-medium text-white transition-all"
  const fillClasses = `bg-gradient-to-r from-${gradientFrom} to-${gradientTo} hover:brightness-110`;

  switch (variant) {
    case "fill":
      return (
        <button className={clsx(baseClasses, fillClasses)}>
          {children}
        </button>
      );
    case "animated":
      return (
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {children}
          </span>
        </button>
      );
    case "slide-up":
      return (
        <button className="relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-violet-600 px-6 font-medium text-violet-600 transition-all before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-gradient-to-r before:from-violet-600 before:to-indigo-600 before:transition-transform before:duration-300 hover:text-white hover:before:translate-y-0">
          {children}
        </button>
      );
    default:
      return (
        <button className={clsx(baseClasses, fillClasses)}>
          {children}
        </button>
      );
  }
};
