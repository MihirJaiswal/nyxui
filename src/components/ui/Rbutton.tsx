import React from "react";
import { cn } from "@/lib/utils";

const buttonStyle = {
  "--color-1": "0, 100%, 67%",  /* Red */
  "--color-2": "271, 76%, 53%", /* Purple */
  "--color-3": "195, 100%, 50%", /* Blue */
  "--color-4": "142, 71%, 45%",  /* Green */
  "--color-5": "39, 100%, 58%",  /* Yellow/Orange */
};

type RbuttonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Rbutton = React.forwardRef<
  HTMLButtonElement,
  RbuttonProps
>(({ children, className, style, ...props }, ref) => {
  return (
    <button
      ref={ref}
      style={{...buttonStyle, ...style}}
      className={cn(
        "group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-xl border-0 px-8 py-2 font-medium text-primary-foreground transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        
        "bg-[length:300%_100%] motion-safe:animate-[gradient_3s_ease_infinite]",
        "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)),hsl(var(--color-1)))]",
        "dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)),hsl(var(--color-1)))]",
        
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)),hsl(var(--color-1)))] before:[filter:blur(calc(0.8*1rem))]",
        "before:bg-[length:300%_100%] before:motion-safe:animate-[gradient_3s_ease_infinite]",
        
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Rbutton.displayName = "Rbutton";