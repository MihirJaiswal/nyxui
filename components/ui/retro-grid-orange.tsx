import { cn } from "@/lib/utils";

interface RetroGridOrangeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  angle?: number;
  cellSize?: number;
  opacity?: number;
}

export function RetroGridOrange({
  className,
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  ...props
}: RetroGridOrangeProps) {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden perspective-[200px] bg-linear-to-br from-orange-500/40 via-orange-600/30 to-amber-400/20 dark:from-orange-600/50 dark:via-orange-700/40 dark:to-amber-500/20",
        `opacity-(--opacity)`,
        className,
      )}
      style={gridStyles}
      {...props}
    >
      <div className="absolute inset-0 transform-[rotateX(var(--grid-angle))]">
        <div className="animate-nyx-grid bg-[linear-gradient(to_right,oklch(0.45_0.22_40)_2px,transparent_0),linear-gradient(to_bottom,oklch(0.45_0.22_40)_2px,transparent_0)] bg-repeat bg-size-[var(--cell-size)_var(--cell-size)] h-[300vh] inset-[0%_0px] ml-[-200%] origin-top-right w-[600vw] dark:bg-[linear-gradient(to_right,oklch(0.75_0.2_40)_2px,transparent_0),linear-gradient(to_bottom,oklch(0.75_0.2_40)_2px,transparent_0)]" />
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  );
}
