"use client";
import { useRef, useState, useCallback, useMemo, type ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  theme?:
    | "silver"
    | "gold"
    | "copper"
    | "mercury"
    | "steel"
    | "emerald"
    | "sapphire"
    | "custom";
  customColors?: {
    base: string;
    highlight: string;
    shadow: string;
    text?: string;
    border?: string;
    glow?: string;
  };
  clickEffect?: boolean;
  hoverAnimation?: boolean;
  textured?: boolean;
  icon?: ReactNode;
  iconAfter?: ReactNode;
  children: ReactNode;
}

export function LiquidMetalButton({
  variant = "default",
  size = "md",
  theme = "silver",
  customColors,
  clickEffect = true,
  hoverAnimation = true,
  textured = false,
  icon,
  iconAfter,
  className,
  children,
  ...props
}: LiquidMetalButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const themeColors = useMemo(
    () => ({
      silver: {
        base: "bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900",
        text: "text-gray-800 dark:text-gray-200",
        highlight: "rgba(255, 255, 255, 0.8)",
        shadow: "rgba(0, 0, 0, 0.3)",
        glow: "shadow-gray-400/50",
        border: "border-gray-400",
        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
        texture: "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMCwwLDAsMC4wMikiLz48L3N2Zz4=')]",
      },
      gold: {
        base: "bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 dark:from-amber-700 dark:via-amber-800 dark:to-amber-900",
        text: "text-amber-900 dark:text-amber-200",
        highlight: "rgba(255, 235, 150, 0.8)",
        shadow: "rgba(120, 80, 0, 0.4)",
        glow: "shadow-amber-400/50",
        border: "border-amber-500",
        textShadow: "0 1px 3px rgba(120,80,0,0.4), 0 0 8px rgba(255,235,150,0.3)",
        texture: "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMjU1LDIxNSwwLDAuMDIpIi8+PC9zdmc+')]",
      },
      copper: {
        base: "bg-gradient-to-b from-orange-200 via-orange-300 to-orange-600 dark:from-orange-700 dark:via-orange-800 dark:to-orange-900",
        text: "text-orange-900 dark:text-orange-200",
        highlight: "rgba(255, 200, 150, 0.8)",
        shadow: "rgba(120, 60, 0, 0.4)",
        glow: "shadow-orange-400/50",
        border: "border-orange-500",
        textShadow: "0 1px 3px rgba(120,60,0,0.4), 0 0 6px rgba(255,200,150,0.2)",
        texture: "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMjU1LDE2MCwwLDAuMDIpIi8+PC9zdmc+')]",
      },
      mercury: {
        base: "bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900",
        text: "text-blue-900 dark:text-blue-100",
        highlight: "rgba(200, 230, 255, 0.8)",
        shadow: "rgba(0, 50, 120, 0.4)",
        glow: "shadow-blue-400/50",
        border: "border-blue-400",
        textShadow: "0 1px 3px rgba(0,50,120,0.4), 0 0 8px rgba(200,230,255,0.3)",
        texture: "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMTgwLDIzMCwyNTUsMC4wMikiLz48L3N2Zz4=')]",
      },
      steel: {
        base: "bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900",
        text: "text-slate-900 dark:text-slate-100",
        highlight: "rgba(220, 230, 240, 0.8)",
        shadow: "rgba(30, 40, 50, 0.4)",
        glow: "shadow-slate-400/50",
        border: "border-slate-500",
        textShadow: "0 1px 2px rgba(30,40,50,0.4), 0 0 6px rgba(220,230,240,0.2)",
        texture: "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMjIwLDIyMCwyMjAsMC4wMikiLz48L3N2Zz4=')]",
      },
      emerald: {
        base: "bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-600 dark:from-emerald-700 dark:via-emerald-800 dark:to-emerald-900",
        text: "text-emerald-950 dark:text-emerald-100",
        highlight: "rgba(180, 255, 220, 0.7)",
        shadow: "rgba(0, 80, 60, 0.4)",
        glow: "shadow-emerald-500/50",
        border: "border-emerald-500",
        textShadow: "0 1px 3px rgba(0,80,60,0.4), 0 0 8px rgba(180,255,220,0.3)",
        texture: "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMTAwLDI1NSwxNTAsMC4wMikiLz48L3N2Zz4=')]",
      },
      sapphire: {
        base: "bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-600 dark:from-indigo-700 dark:via-indigo-800 dark:to-indigo-900",
        text: "text-indigo-950 dark:text-indigo-100",
        highlight: "rgba(200, 200, 255, 0.7)",
        shadow: "rgba(40, 0, 100, 0.4)",
        glow: "shadow-indigo-500/50",
        border: "border-indigo-500",
        textShadow: "0 1px 3px rgba(40,0,100,0.4), 0 0 8px rgba(200,200,255,0.3)",
        texture: "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMTUwLDE1MCwyNTUsMC4wMikiLz48L3N2Zz4=')]",
      },
      custom: {
        base: customColors?.base
          ? customColors.base.startsWith("#")
            ? `bg-[${customColors.base}]`
            : customColors.base
          : "bg-gradient-to-b from-gray-300 to-gray-400",
        text: customColors?.text || "text-gray-800",
        highlight: customColors?.highlight || "rgba(255, 255, 255, 0.8)",
        shadow: customColors?.shadow || "rgba(0, 0, 0, 0.3)",
        glow: customColors?.glow || "shadow-gray-400/50",
        border: customColors?.border || "border-gray-400",
        textShadow: "0 1px 2px rgba(0,0,0,0.3)",
        texture: "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMCwwLDAsMC4wMikiLz48L3N2Zz4=')]",
      },
    }),
    [customColors],
  );

  const currentTheme = useMemo(() => themeColors[theme], [theme, themeColors]);

  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",
    xl: "px-6 py-3 text-xl",
    "2xl": "px-8 py-4 text-2xl",
  };

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleMouseDown = () => {
    if (!clickEffect) return;
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (clickEffect) {
      setIsPressed(false);
    }
  };

  const getButtonClasses = useCallback(() => {
    switch (variant) {
      case "outline":
        return cn(
          "bg-transparent border-2",
          currentTheme.text,
          currentTheme.border,
        );
      case "ghost":
        return cn(
          "bg-transparent hover:bg-gray-100/20 dark:hover:bg-gray-800/30",
          currentTheme.text,
        );
      default:
        return cn(currentTheme.base, currentTheme.text);
    }
  }, [variant, currentTheme]);

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative inline-flex items-center justify-center font-medium transition-all duration-200",
        sizeClasses[size],
        getButtonClasses(),
        textured && currentTheme.texture,
        isPressed && "scale-95 transform",
        hoverAnimation && "hover:-translate-y-0.5 hover:brightness-105",
        isHovered && currentTheme.glow,
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:ring-opacity-75",
        "focus-visible:ring-blue-400 dark:focus-visible:ring-blue-500",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    >
      <span 
        className="relative z-10 flex items-center gap-2"
        style={{ textShadow: currentTheme.textShadow }}
      >
        {icon && <span className="inline-flex">{icon}</span>}
        <span>{children}</span>
        {iconAfter && <span className="inline-flex">{iconAfter}</span>}
      </span>

      {variant !== "ghost" && variant !== "outline" && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ borderRadius: "inherit" }}
        >
          <div
            className="absolute inset-0 opacity-70 transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.highlight} 0%, transparent 50%, ${currentTheme.shadow} 100%)`,
              transform: isHovered ? "rotate(45deg) scale(1.05)" : "rotate(0deg) scale(1)",
              transition: isHovered
                ? "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.2s ease"
                : "transform 0.4s ease-out, opacity 0.3s ease",
            }}
          />

          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(ellipse at center, ${currentTheme.highlight} 0%, transparent 70%)`,
              transition: "opacity 0.3s ease",
              opacity: isHovered ? 0.6 : 0.2,
            }}
          />
        </div>
      )}

      {variant !== "ghost" && variant !== "outline" && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            borderRadius: "inherit",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2), inset 0 -1px 2px rgba(255,255,255,0.2)",
          }}
        />
      )}
    </button>
  );
}