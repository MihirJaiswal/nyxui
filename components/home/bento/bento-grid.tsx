import { clsx } from "clsx";

export function BentoGrid({
  dark = false,
  className = "",
  title = "",
  description = "",
  component,
  fade = [],
  height = "h-96",
  enableTitle = true,
  enableDescription = true,
  isFull = false,
  padding = "p-10",
  titleClassName = "mt-1 text-2xl font-medium tracking-tight",
  descriptionClassName = "mt-2 max-w-[600px] text-sm",
  gradientPercentage = "to-50%",
}: {
  dark?: boolean;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  component: React.ReactNode;
  fade?: ("top" | "bottom")[];
  height?: string;
  enableTitle?: boolean;
  enableDescription?: boolean;
  isFull?: boolean;
  padding?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  gradientPercentage?: string;
}) {
  return (
    <div
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg",
        "bg-card border border-border/60",
        "transition-colors duration-200",
        isFull && "h-full",
      )}
      role="article"
    >
      <div
        className={clsx(
          "relative shrink-0",
          !isFull && height,
          isFull && "h-full",
        )}
      >
        {component}
        {fade.includes("top") && (
          <div
            aria-hidden="true"
            className={clsx(
              "absolute inset-0 bg-gradient-to-b from-card",
              gradientPercentage,
            )}
          />
        )}
        {fade.includes("bottom") && (
          <div
            aria-hidden="true"
            className={clsx(
              "absolute inset-0 bg-gradient-to-t from-card",
              gradientPercentage,
            )}
          />
        )}
        {isFull && (enableTitle || enableDescription) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-10">
            {enableTitle && (
              <h3 className={clsx(titleClassName, "text-white")}>{title}</h3>
            )}
            {enableDescription && (
              <p className={clsx(descriptionClassName, "text-gray-200")}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      {!isFull && (enableTitle || enableDescription) && (
        <div className={clsx("relative", padding)}>
          {enableTitle && (
            <h3 className={clsx(titleClassName, "text-foreground")}>{title}</h3>
          )}
          {enableDescription && (
            <p className={clsx(descriptionClassName, "text-muted-foreground")}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
