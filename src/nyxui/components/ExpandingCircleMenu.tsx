"use client";
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface ExpandingCircleMenuProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    color?: string;
  }[];
  config?: {
    initiallyOpen?: boolean;
    size?: number; 
    itemSize?: number; 
    distance?: number; 
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
    containedMode?: boolean; 
    adaptiveDistance?: boolean; 
    color?: string; 
    hoverColor?: string; 
    textColor?: string;
    triggerColor?: string;
    closeOnSelect?: boolean;
    showLabels?: boolean;
    showLabelOnHover?: boolean;
    backdrop?: boolean | "blur";
    animated?: boolean;
    animationDuration?: number; 
    startAngle?: number; 
    endAngle?: number; 
    triggerIcon?: React.ReactNode;
    triggerRotate?: boolean;
  };
}

export function ExpandingCircleMenu({
  items,
  config,
  className,
  ...props
}: ExpandingCircleMenuProps) {
  const {
    initiallyOpen = false,
    size = 48, 
    itemSize = Math.round(size * 0.8), 
    distance = size * 1.8,
    position = "bottom-right",
    containedMode = false,
    adaptiveDistance = false,
    color = "rgb(59, 130, 246)",
    hoverColor = "rgb(37, 99, 235)",
    textColor = "white",
    triggerColor,
    closeOnSelect = true,
    showLabels = true,
    showLabelOnHover = true,
    backdrop = false,
    animated = true,
    animationDuration = 300,
    startAngle = 0,
    endAngle = 360,
    triggerIcon,
    triggerRotate = true,
  } = config || {};

  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [calculatedDistance, setCalculatedDistance] = useState(distance);
  
  const containerSize = calculatedDistance * 2 + size;

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };
  
  const containedPositionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  useEffect(() => {
    if (adaptiveDistance && containerRef.current && containedMode) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        const parentRect = parent.getBoundingClientRect();
        const smallerDimension = Math.min(parentRect.width, parentRect.height);
        const maxSafeDistance = (smallerDimension / 2) * 0.8 - size;
        const newDistance = Math.min(distance, maxSafeDistance);
        setCalculatedDistance(newDistance > 0 ? newDistance : distance / 2);
      }
    } else {
      setCalculatedDistance(distance);
    }
  }, [adaptiveDistance, containedMode, distance, size]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (onClick?: () => void) => {
    if (onClick) onClick();
    if (closeOnSelect) setIsOpen(false);
  };

  const getItemPosition = (index: number) => {
    const totalItems = items.length;
    const startRad = (startAngle - 90) * (Math.PI / 180); 
    const endRad = (endAngle - 90) * (Math.PI / 180);
    const angleRange = endRad - startRad;
    
    const angleStep = totalItems > 1 ? angleRange / (totalItems - 1) : 0;
    const angle = totalItems > 1 ? startRad + index * angleStep : startRad + angleRange / 2;
    
    const x = Math.cos(angle) * calculatedDistance;
    const y = Math.sin(angle) * calculatedDistance;
    return { x, y };
  };

  const backdropStyle = backdrop 
    ? `${containedMode ? 'absolute' : 'fixed'} inset-0 ${backdrop === "blur" ? "backdrop-blur-sm" : ""} bg-black/20`
    : "";

  return (
    <div
      ref={containerRef}
      className={cn(
        containedMode ? "absolute z-10" : "fixed z-40", 
        containedMode ? containedPositionClasses[position] : positionClasses[position], 
        className
      )}
      {...props}
    >
      {backdrop && isOpen && (
        <div className={backdropStyle} onClick={() => setIsOpen(false)} />
      )}
      <div
        ref={menuRef}
        style={{ 
          width: containerSize, 
          height: containerSize,
          maxWidth: containedMode ? "100%" : undefined,
          maxHeight: containedMode ? "100%" : undefined,
        }}
        className="relative overflow-hidden"
      >
        {items.map((item, index) => {
          const { x, y } = getItemPosition(index);
          const itemColor = item.color || color;
          
          return (
            <div
              key={index}
              className={cn(
                "absolute flex items-center justify-center rounded-full shadow-md cursor-pointer",
                animated && "transition-all duration-300"
              )}
              style={{
                left: "50%",
                top: "50%",
                width: `${itemSize}px`,
                height: `${itemSize}px`,
                backgroundColor: itemColor,
                color: textColor,
                transform: isOpen
                  ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                  : "translate(-50%, -50%) scale(0)",
                opacity: isOpen ? 1 : 0,
                zIndex: isOpen ? 10 : 0,
                transitionDuration: `${animationDuration}ms`
              }}
              onClick={() => handleItemClick(item.onClick)}
            >
              <div className="relative group">
                {item.icon}
                {showLabels && (showLabelOnHover ? isOpen : true) && (
                  <div
                    className={cn(
                      "absolute whitespace-nowrap px-2 py-1 rounded-md bg-gray-800 text-white text-xs",
                      "opacity-0 group-hover:opacity-100 transition-opacity",
                      "left-1/2 -translate-x-1/2 -bottom-8"
                    )}
                    style={{ transitionDuration: `${animationDuration}ms` }}
                  >
                    {item.label}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        <button
          className={cn(
            "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20",
            "flex items-center justify-center rounded-full shadow-lg",
            animated && "transition-all duration-300"
          )}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: triggerColor || color,
            color: textColor,
            transform: isOpen && triggerRotate ? "rotate(45deg)" : "rotate(0deg)",
            transitionDuration: `${animationDuration}ms`
          }}
          onClick={toggleMenu}
        >
          {triggerIcon || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size * 0.5}
              height={size * 0.5}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="50%" y1="25%" x2="50%" y2="75%" />
              <line x1="25%" y1="50%" x2="75%" y2="50%" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}