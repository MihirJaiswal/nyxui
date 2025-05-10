"use client";
import React, { useState, useMemo, ButtonHTMLAttributes } from "react";

export type MorphingButtonProps = {
  variant?:
    | "expand"
    | "collapse"
    | "rotate"
    | "skew"
    | "liquid"
    | "pulse"
    | "bounce";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right" | "only";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const LoadingSpinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const MorphingButton = ({
  variant = "expand",
  size = "md",
  icon,
  iconPosition = "left",
  className = "",
  disabled = false,
  loading = false,
  children,
  ...props
}: MorphingButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const sizeClasses = useMemo(() => {
    const sizes = {
      xs: "h-8 px-3 text-xs",
      sm: "h-10 px-4 text-sm",
      md: "h-12 px-5 text-base",
      lg: "h-14 px-6 text-lg",
      xl: "h-16 px-8 text-xl",
    };
    return sizes[size];
  }, [size]);

  const iconContent = useMemo(() => {
    if (loading) {
      return (
        <span
          className={
            iconPosition === "only"
              ? ""
              : iconPosition === "left"
                ? "mr-2"
                : "ml-2"
          }
        >
          <LoadingSpinner />
        </span>
      );
    }

    if (!icon) return null;

    const spacingClass =
      iconPosition === "only" ? "" : iconPosition === "left" ? "mr-2" : "ml-2";

    return (
      <span
        className={`transition-transform duration-300 ${isHovered && !disabled ? "scale-110" : ""} ${spacingClass}`}
      >
        {icon}
      </span>
    );
  }, [icon, iconPosition, isHovered, disabled, loading]);

  const content = useMemo(() => {
    if (iconPosition === "only" && (icon || loading)) {
      return iconContent;
    }

    return (
      <>
        {iconPosition === "left" && iconContent}
        <span className="relative z-10">{children}</span>
        {iconPosition === "right" && iconContent}
      </>
    );
  }, [children, icon, iconContent, iconPosition, loading]);

  const variantClasses = useMemo(() => {
    if (disabled || loading) {
      return "";
    }

    switch (variant) {
      case "expand":
        return `transition-all duration-300 ${isHovered ? "px-8" : ""} relative overflow-hidden 
                before:absolute before:inset-0 before:transition-all before:duration-300 
                before:bg-white before:opacity-0 ${isActive ? "before:opacity-20 scale-95" : ""}`;
      case "collapse":
        return `transition-all duration-300 transform ${isHovered ? "scale-95" : "scale-100"} ${isActive ? "scale-90" : ""}`;
      case "rotate":
        return `transition-all duration-300 transform ${isHovered ? "rotate-2" : "rotate-0"} ${isActive ? "rotate-4" : ""}`;
      case "skew":
        return `transition-all duration-300 transform ${isHovered ? "skew-x-2" : "skew-x-0"} ${isActive ? "skew-x-4" : ""}`;
      case "liquid":
        return `transition-all duration-300 ${isHovered ? "rounded-2xl" : ""} ${isActive ? "rounded-full scale-95" : ""}`;
      case "pulse":
        return `transition-all duration-300 ${isHovered ? "animate-pulse" : ""} ${isActive ? "scale-95" : "scale-100"}`;
      case "bounce":
        return `transition-transform duration-300 ${isHovered ? "animate-[smoothBounce_1s_ease-in-out_infinite]" : ""} ${isActive ? "scale-95" : "scale-100"}`;
      default:
        return "";
    }
  }, [variant, isHovered, isActive, disabled, loading]);

  const disabledClasses =
    disabled || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  const baseClasses = useMemo(
    () => `
    ${sizeClasses}
    ${variantClasses}
    ${disabledClasses}
    inline-flex items-center justify-center font-medium 
    focus:outline-none ${!disabled ? "focus:ring-2 focus:ring-offset-1" : ""}
    transition-all duration-300
    backdrop-filter backdrop-blur-sm
    ${className}
  `,
    [sizeClasses, variantClasses, disabledClasses, disabled, className],
  );

  const handleMouseEvents =
    disabled || loading
      ? {}
      : {
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => {
            setIsHovered(false);
            setIsActive(false);
          },
          onMouseDown: () => setIsActive(true),
          onMouseUp: () => setIsActive(false),
        };

  return (
    <button
      className={baseClasses}
      type="button"
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-pressed={isActive}
      aria-busy={loading}
      role="button"
      aria-label={loading ? "Loading" : "Morphing Button"}
      {...handleMouseEvents}
      {...props}
    >
      {content}
    </button>
  );
};

export default MorphingButton;
