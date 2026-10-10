"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface GlitchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  glitchOnHover?: boolean;
  glitchAlways?: boolean;
  glitchColors?: {
    primary?: string;
    secondary?: string;
  };
  borderColor?: string;
  /** Background class for the glitch slice layers, e.g. "bg-black". */
  bgClassName?: string;
  /** Text color class for the glitch slice layers, e.g. "text-green-400". */
  textClassName?: string;
}

export function GlitchButton({
  children,
  className = "",
  glitchOnHover = true,
  glitchAlways = false,
  glitchColors = {
    primary: "#ef00ef",
    secondary: "#00ffff",
  },
  borderColor = "white",
  bgClassName = "bg-gray-900",
  textClassName = "text-white",
  ...props
}: GlitchButtonProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const showGlitch = glitchAlways || (glitchOnHover && isHovering) || isClicked;
  const isRounded = /rounded(-[a-z]+)?/.test(className);

  const borderStyle = {
    boxShadow: `inset ${borderColor} 5px 5px 0px, inset ${borderColor} -5px 5px 0px, inset ${borderColor} 5px -5px 0px, inset ${borderColor} -5px -5px 0px`,
  };

  const textShadowStyle = {
    textShadow: `
      -1.5px -1.5px 0 ${glitchColors.primary}, 
      1.5px 1.5px 0 ${glitchColors.secondary}
    `,
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
  };

  const containerClasses = cn(
    "relative cursor-pointer font-mono overflow-hidden",
    "text-4xl",
    "bg-gray-900",
    "text-white",
    "p-4 m-1.5",
    "group",
    "hover:shadow-none",
    "hover:bg-gradient-to-r hover:from-fuchsia-600 hover:via-white hover:to-cyan-400",
    isClicked ? "click-glitch" : "",
    className,
  );

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={containerClasses}
      style={borderStyle}
      {...props}
    >
      <span
        className={`
        block
        ${showGlitch ? "opacity-0" : "opacity-100"} 
        transition-opacity
        ${glitchAlways ? "flicker-animation" : ""}
      `}
      >
        {children}
      </span>

      {showGlitch && (
        <div
          className={`
          absolute inset-0 
          overflow-hidden 
          ${isClicked ? "glitch-skew" : ""}
        `}
        >
          <div
            className={`
            absolute left-0 w-full h-1/3 top-0
            ${bgClassName}
            ${isRounded ? "rounded-t-lg" : ""}
            overflow-hidden
            glitch-layer-1
          `}
            style={{
              boxShadow: `inset ${borderColor} 5px 5px 0px, inset ${borderColor} -5px 0px 0px`,
            }}
          >
            <div
              className={`
                absolute w-full ${textClassName}
                top-0 left-0 right-0
                flex items-center justify-center
                h-full
              `}
              style={textShadowStyle}
            >
              <div className="transform translate-y-0 mt-[45px]">
                {children}
              </div>
            </div>
          </div>
          <div
            className={`
            absolute left-0 w-full h-1/3 top-1/3
            ${bgClassName}
            overflow-hidden
            glitch-layer-2
          `}
            style={{
              boxShadow: `inset ${borderColor} 5px 0px 0px, inset ${borderColor} -5px 0px 0px`,
            }}
          >
            <div
              className={`
                absolute w-full ${textClassName}
                top-0 left-0 right-0
                flex items-center justify-center
                h-[300%] -translate-y-1/3
              `}
              style={textShadowStyle}
            >
              <div>{children}</div>
            </div>
          </div>
          <div
            className={`
            absolute left-0 w-full h-1/3 top-2/3
            ${bgClassName}
            ${isRounded ? "rounded-b-lg" : ""}
            overflow-hidden
            glitch-layer-3
          `}
            style={{
              boxShadow: `inset ${borderColor} 5px -5px 0px, inset ${borderColor} -5px 0px 0px`,
            }}
          >
            <div
              className={`
                absolute w-full ${textClassName}
                top-0 left-0 right-0
                flex items-center justify-center
                h-[300%] -translate-y-2/3
              `}
              style={textShadowStyle}
            >
              <div>{children}</div>
            </div>
          </div>
        </div>
      )}
    </button>
  );
}
