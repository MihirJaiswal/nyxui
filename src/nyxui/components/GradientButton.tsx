import React from "react";

export type GradientButtonProps = {
  variant?: "pulse" | "glow" | "sweep" | "shine" | "outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  theme?: "sunset" | "ocean" | "forest" | "neon" | "berry" | "nyx" | "custom";
  customGradient?: string;
  rounded?: "full" | "md" | "lg" | "none";
  shadow?: boolean;
  hoverEffect?: "scale" | "brightness" | "contrast" | "none";
  className?: string;
  children: React.ReactNode;
};

export const GradientButton = ({
  variant = "glow",
  size = "md",
  theme = "nyx",
  customGradient,
  rounded = "md",
  shadow = true,
  hoverEffect = "brightness",
  className = "",
  children,
}: GradientButtonProps) => {
  const sizeClasses = {
    xs: "h-6 px-3 text-xs",
    sm: "h-8 px-4 text-sm",
    md: "h-10 px-5 text-base",
    lg: "h-12 px-6 text-lg",
    xl: "h-14 px-8 text-xl",
  };

  const roundedClasses = {
    none: "rounded-none",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const hoverClasses = {
    scale: "hover:scale-105 transition-transform duration-300",
    brightness: "hover:brightness-110 transition-all duration-300",
    contrast: "hover:contrast-125 transition-all duration-300",
    none: "",
  };

  const shadowClass = shadow ? "shadow-lg" : "";

  const themeGradients = {
    sunset: "bg-gradient-to-r from-amber-500 via-orange-600 to-pink-500",
    ocean: "bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600",
    forest: "bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600",
    neon: "bg-gradient-to-r from-green-400 via-purple-500 to-pink-500",
    berry: "bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-500",
    nyx: "bg-gradient-to-r from-purple-800 via-blue-800 to-fuchsia-800",
    custom: customGradient || "bg-gradient-to-r from-violet-500 to-fuchsia-500",
  };

  const baseClasses = `inline-flex items-center justify-center font-medium text-white transition-all ${sizeClasses[size]} ${roundedClasses[rounded]} ${shadowClass} ${hoverClasses[hoverEffect]}`;

  if (variant === "pulse") {
    return (
      <button className={`${baseClasses} ${themeGradients[theme]} relative overflow-hidden group ${className}`}>
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></span>
        <span className="absolute inset-0 animate-pulse bg-white opacity-0 group-hover:opacity-10"></span>
      </button>
    );
  }

  if (variant === "glow") {
    return (
      <button className={`${baseClasses} ${themeGradients[theme]} relative group ${className}`}>
        <span className="relative z-10">{children}</span>
        <span className="absolute -inset-1 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></span>
      </button>
    );
  }

  if (variant === "sweep") {
    return (
      <button className={`${baseClasses} ${themeGradients[theme]} relative overflow-hidden group ${className}`}>
        <span className="relative z-10">{children}</span>
        <span className="absolute top-0 -right-full h-full w-1/2 z-0 block transform -skew-x-12 bg-white opacity-20 group-hover:right-0 transition-all duration-700"></span>
      </button>
    );
  }

  if (variant === "shine") {
    return (
      <button className={`${baseClasses} ${themeGradients[theme]} relative overflow-hidden group ${className}`}>
        <span className="relative z-10">{children}</span>
        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:translate-x-full transition-all duration-1000 ease-in-out"></span>
      </button>
    );
  }
  
  if (variant === "outline") {
    return (
      <button 
        className={`${baseClasses} relative overflow-hidden group bg-transparent ${className}`}
      >
        <span className={`relative z-10 bg-clip-text text-transparent ${themeGradients[theme]}`}>
          {children}
        </span>
        <span 
          className={`absolute inset-0 rounded-lg ${themeGradients[theme]} opacity-100`} 
          style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor', WebkitMaskComposite: 'xor', padding: '2px' }}
        ></span>
        <span className="absolute inset-0 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></span>
      </button>
    );
  }

  return (
    <button className={`${baseClasses} ${themeGradients[theme]} ${className}`}>
      {children}
    </button>
  );
};

