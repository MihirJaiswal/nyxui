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
    "inline-flex items-center justify-center rounded-md font-medium text-white transition-all";
  const sizeClasses = {
    sm: "h-8 px-4 text-sm",
    default: "h-12 px-6",
    lg: "h-14 px-8 text-lg",
  };
  const gradientMap: Record<string, Record<string, string>> = {
    "pink-500": {
      "violet-600": "bg-gradient-to-r from-pink-500 to-violet-600 hover:brightness-110",
      "purple-600": "bg-gradient-to-r from-pink-500 to-purple-600 hover:brightness-110",
    },
    "blue-500": {
      "indigo-600": "bg-gradient-to-r from-blue-500 to-indigo-600 hover:brightness-110",
    },
  };

  if (variant === "fill") {
    const gradientClasses =
      gradientMap[gradientFrom]?.[gradientTo] ||
      "bg-gradient-to-r from-pink-500 to-violet-600 hover:brightness-110";
    return (
      <button className={clsx(baseClasses, sizeClasses[size], gradientClasses)}>
        {children}
      </button>
    );
  }
  if (variant === "animated") {
    return (
      <button className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className={clsx("inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 backdrop-blur-3xl text-white", sizeClasses[size])}>
          {children}
        </span>
      </button>
    );
  }
  if (variant === "slide-up") {
    return (
      <button className={clsx(
          "relative inline-flex items-center justify-center overflow-hidden rounded-md border border-violet-600 font-medium text-violet-600 transition-all",
          sizeClasses[size],
          "before:absolute before:inset-0 before:-z-10 before:translate-y-full before:bg-gradient-to-r before:from-violet-600 before:to-indigo-600 before:transition-transform before:duration-300 hover:text-white hover:before:translate-y-0"
        )}>
        {children}
      </button>
    );
  }
  return (
    <button className={clsx(
      baseClasses,
      sizeClasses[size],
      "bg-gradient-to-r from-pink-500 to-violet-600 hover:brightness-110"
    )}>
      {children}
    </button>
  );
};
