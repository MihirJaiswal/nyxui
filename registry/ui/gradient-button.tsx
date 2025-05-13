import React, { ButtonHTMLAttributes } from "react";

export type GradientButtonProps = {
  variant?: "pulse" | "glow" | "sweep" | "shine" | "outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  theme?: "sunset" | "ocean" | "forest" | "neon" | "berry" | "nuvyx" | "custom";
  customGradient?: string;
  className?: string;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const GradientButton = ({
  variant = "glow",
  size = "md",
  theme = "nuvyx",
  customGradient,
  className = "",
  children,
  ...props
}: GradientButtonProps) => {
  const sizeClasses = {
    xs: "h-6 px-3 text-xs",
    sm: "h-8 px-4 text-sm",
    md: "h-10 px-5 text-base",
    lg: "h-12 px-6 text-lg",
    xl: "h-14 px-8 text-xl",
  };

  const themeGradients = {
    sunset: "from-amber-500 via-orange-600 to-pink-500",
    ocean: "from-cyan-400 via-blue-500 to-indigo-600",
    forest: "from-emerald-400 via-green-500 to-teal-600",
    neon: "from-green-400 via-purple-500 to-pink-500",
    berry: "from-fuchsia-500 via-purple-600 to-indigo-500",
    nuvyx: "from-purple-800 via-blue-800 to-pink-800",
    custom: customGradient || "from-violet-500 to-fuchsia-500",
  };

  const gradientClass = `bg-gradient-to-r ${themeGradients[theme]}`;

  const baseClasses = `inline-flex items-center justify-center font-medium transition-all ${sizeClasses[size]} ${className}`;

  const variantEffects = {
    pulse: (
      <>
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></span>
        <span className="absolute inset-0 animate-pulse bg-white opacity-0 group-hover:opacity-10"></span>
      </>
    ),
    glow: (
      <span className="absolute -inset-1 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></span>
    ),
    sweep: (
      <span className="absolute top-0 -right-full h-full w-1/2 z-0 block transform -skew-x-12 bg-white opacity-20 group-hover:right-0 transition-all duration-700"></span>
    ),
    shine: (
      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:translate-x-full transition-all duration-1000 ease-in-out"></span>
    ),
    outline: null,
  };

  if (variant === "outline") {
    return (
      <button className={`${baseClasses} relative group`} {...props}>
        <span className={`absolute inset-0 rounded-md ${gradientClass}`}></span>
        <span className="absolute inset-0.5 rounded-md bg-background"></span>
        <span
          className={`relative ${gradientClass} bg-clip-text text-transparent z-10`}
        >
          {children}
        </span>
      </button>
    );
  }

  return (
    <button
      className={`${baseClasses} ${gradientClass} text-white relative overflow-hidden group`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variantEffects[variant]}
    </button>
  );
};
