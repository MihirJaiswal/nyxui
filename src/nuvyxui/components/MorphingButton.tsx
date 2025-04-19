"use client";
import React, { useState } from "react";

export type MorphingButtonProps = {
  variant?:
    | "expand"
    | "collapse"
    | "rotate"
    | "skew"
    | "liquid"
    | "gradient"
    | "glow"
    | "pulse"
    | "reveal"
    | "bounce";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark"
    | "slate"
    | "violet"
    | "indigo"
    | "teal"
    | "rose"
    | "amber"
    | "custom";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "inner" | "glow";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right" | "only";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export const MorphingButton = ({
  variant = "expand",
  size = "md",
  color = "primary",
  rounded = "md",
  shadow = "md",
  icon,
  iconPosition = "left",
  className = "",
  children,
  onClick,
}: MorphingButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const sizeClasses = {
    xs: "h-8 px-3 text-xs",
    sm: "h-10 px-4 text-sm",
    lg: "h-14 px-6 text-lg",
    xl: "h-16 px-8 text-xl",
    md: "h-12 px-5 text-base",
  };

  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const shadowClasses = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-lg",
    xl: "shadow-xl",
    inner: "shadow-inner",
    glow: `shadow-lg ${
      color === "primary"
        ? "shadow-blue-400/40"
        : color === "secondary"
        ? "shadow-purple-400/40"
        : color === "success"
        ? "shadow-green-400/40"
        : color === "danger"
        ? "shadow-red-400/40"
        : color === "warning"
        ? "shadow-yellow-400/40"
        : color === "info"
        ? "shadow-cyan-400/40"
        : color === "violet"
        ? "shadow-violet-400/40"
        : color === "indigo"
        ? "shadow-indigo-400/40"
        : color === "teal"
        ? "shadow-teal-400/40"
        : color === "rose"
        ? "shadow-rose-400/40"
        : color === "amber"
        ? "shadow-amber-400/40"
        : color === "slate"
        ? "shadow-slate-400/40"
        : color === "custom"
        ? ""
        : "shadow-gray-400/40"
    }`,
  };

  const colorClasses = {
    primary:
      "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border border-blue-600",
    secondary:
      "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border border-purple-600",
    success:
      "bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border border-emerald-600",
    danger:
      "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border border-red-600",
    warning:
      "bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white border border-amber-500",
    info: "bg-gradient-to-br from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white border border-cyan-500",
    dark: "bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white border border-gray-800",
    slate:
      "bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white border border-slate-700",
    violet:
      "bg-gradient-to-br from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white border border-violet-600",
    indigo:
      "bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white border border-indigo-600",
    teal: "bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white border border-teal-600",
    rose: "bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white border border-rose-600",
    amber:
      "bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border border-amber-600",
    custom: "",
  };

  const getIconContent = () => {
    if (!icon) return null;
    const spacingClass =
      iconPosition === "only" ? "" : iconPosition === "left" ? "mr-2" : "ml-2";
    return (
      <span
        className={`transition-transform duration-300 ${
          isHovered ? "scale-110" : ""
        } ${spacingClass}`}
      >
        {icon}
      </span>
    );
  };

  const renderContent = () => {
    if (iconPosition === "only" && icon) {
      return getIconContent();
    }
    return (
      <>
        {iconPosition === "left" && getIconContent()}
        <span className="relative z-10">{children}</span>
        {iconPosition === "right" && getIconContent()}
      </>
    );
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "expand":
        return `transition-all duration-300 ${
          isHovered ? "px-8" : ""
        } relative overflow-hidden 
                before:absolute before:inset-0 before:transition-all before:duration-300 
                before:bg-white before:opacity-0 ${
                  isActive ? "before:opacity-20 scale-95" : ""
                }`;
      case "collapse":
        return `transition-all duration-300 transform ${
          isHovered ? "scale-95" : "scale-100"
        } ${isActive ? "scale-90" : ""}`;
      case "rotate":
        return `transition-all duration-300 transform ${
          isHovered ? "rotate-2" : "rotate-0"
        } ${isActive ? "rotate-4" : ""}`;
      case "skew":
        return `transition-all duration-300 transform ${
          isHovered ? "skew-x-2" : "skew-x-0"
        } ${isActive ? "skew-x-4" : ""}`;
      case "liquid":
        return `transition-all duration-300 ${
          isHovered
            ? rounded === "full"
              ? "rounded-full"
              : "rounded-2xl"
            : roundedClasses[rounded]
        } 
                ${isActive ? "rounded-full scale-95" : ""}`;
      case "gradient":
        if (color === "custom")
          return `transition-all duration-500 ${
            isActive ? "scale-95" : "scale-100"
          }`;

        return `transition-all duration-500 bg-gradient-to-r 
                from-${
                  color === "primary"
                    ? "blue-400"
                    : color === "secondary"
                    ? "purple-400"
                    : color === "success"
                    ? "emerald-400"
                    : color === "danger"
                    ? "red-400"
                    : color === "warning"
                    ? "amber-300"
                    : color === "info"
                    ? "cyan-300"
                    : color === "violet"
                    ? "violet-400"
                    : color === "indigo"
                    ? "indigo-400"
                    : color === "teal"
                    ? "teal-400"
                    : color === "rose"
                    ? "rose-400"
                    : color === "amber"
                    ? "amber-400"
                    : color === "slate"
                    ? "slate-500"
                    : "gray-600"
                }  
                via-${
                  color === "primary"
                    ? "blue-500"
                    : color === "secondary"
                    ? "purple-500"
                    : color === "success"
                    ? "emerald-500"
                    : color === "danger"
                    ? "red-500"
                    : color === "warning"
                    ? "amber-400"
                    : color === "info"
                    ? "cyan-400"
                    : color === "violet"
                    ? "violet-500"
                    : color === "indigo"
                    ? "indigo-500"
                    : color === "teal"
                    ? "teal-500"
                    : color === "rose"
                    ? "rose-500"
                    : color === "amber"
                    ? "amber-500"
                    : color === "slate"
                    ? "slate-600"
                    : "gray-700"
                }
                to-${
                  color === "primary"
                    ? "blue-600"
                    : color === "secondary"
                    ? "purple-600"
                    : color === "success"
                    ? "emerald-600"
                    : color === "danger"
                    ? "red-600"
                    : color === "warning"
                    ? "amber-500"
                    : color === "info"
                    ? "cyan-500"
                    : color === "violet"
                    ? "violet-600"
                    : color === "indigo"
                    ? "indigo-600"
                    : color === "teal"
                    ? "teal-600"
                    : color === "rose"
                    ? "rose-600"
                    : color === "amber"
                    ? "amber-600"
                    : color === "slate"
                    ? "slate-700"
                    : "gray-800"
                } 
                ${isHovered ? "brightness-110" : ""} 
                ${isActive ? "scale-95" : "scale-100"}
                border-none
                `;
      case "glow":
        if (color === "custom")
          return `transition-all duration-300 ${
            isActive ? "scale-95" : "scale-100"
          }`;

        return `transition-all duration-300 
                ${
                  isHovered
                    ? `shadow-lg shadow-${
                        color === "primary"
                          ? "blue-400/50"
                          : color === "secondary"
                          ? "purple-400/50"
                          : color === "success"
                          ? "emerald-400/50"
                          : color === "danger"
                          ? "red-400/50"
                          : color === "warning"
                          ? "amber-400/50"
                          : color === "info"
                          ? "cyan-400/50"
                          : color === "violet"
                          ? "violet-400/50"
                          : color === "indigo"
                          ? "indigo-400/50"
                          : color === "teal"
                          ? "teal-400/50"
                          : color === "rose"
                          ? "rose-400/50"
                          : color === "amber"
                          ? "amber-400/50"
                          : color === "slate"
                          ? "slate-400/50"
                          : "gray-400/50"
                      }`
                    : ""
                } 
                ${isActive ? "scale-95" : "scale-100"}`;
      case "pulse":
        return `transition-all duration-300 ${isHovered ? "animate-pulse" : ""} 
                ${isActive ? "scale-95" : "scale-100"}`;
      case "reveal":
        return `transition-all duration-300 relative overflow-hidden 
                before:absolute before:inset-0 before:w-full before:h-full before:bg-white/20 
                before:translate-x-full before:skew-x-12 before:transition-transform before:duration-700
                ${isHovered ? "before:-translate-x-full" : ""}
                ${isActive ? "scale-95" : "scale-100"}`;
      case "bounce":
        return `transition-all duration-300 
                ${isHovered ? "animate-bounce" : ""} 
                ${isActive ? "scale-95" : "scale-100"}`;
      default:
        return "";
    }
  };

  const getFocusRingColor = () => {
    if (color === "custom") return "";

    return `focus:ring-${
      color === "primary"
        ? "blue"
        : color === "secondary"
        ? "purple"
        : color === "success"
        ? "emerald"
        : color === "danger"
        ? "red"
        : color === "warning"
        ? "amber"
        : color === "info"
        ? "cyan"
        : color === "violet"
        ? "violet"
        : color === "indigo"
        ? "indigo"
        : color === "teal"
        ? "teal"
        : color === "rose"
        ? "rose"
        : color === "amber"
        ? "amber"
        : color === "slate"
        ? "slate"
        : "gray"
    }-400`;
  };

  const baseClasses = `
    ${sizeClasses[size]} 
    ${
      color !== "custom"
        ? variant === "gradient"
          ? ""
          : colorClasses[color]
        : ""
    } 
    ${variant !== "liquid" ? roundedClasses[rounded] : ""} 
    ${
      shadow !== "none" && color !== "custom"
        ? shadowClasses[shadow]
        : shadow !== "none" && color === "custom"
        ? `shadow-${shadow}`
        : ""
    }
    ${getVariantClasses()} 
    inline-flex items-center justify-center font-medium 
    focus:outline-none focus:ring-2 focus:ring-offset-1 ${getFocusRingColor()}
    transition-all duration-300
    backdrop-filter backdrop-blur-sm
    ${className}
  `;

  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      className={baseClasses}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      {renderContent()}
    </button>
  );
};

export default MorphingButton;
