import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ComponentCardProps {
  slug: string;
  title: string;
  description?: string;
  imageSrc?: string;
  type?: "components" | "blocks" | "templates";
  className?: string;
}

export const ComponentCard = ({
  slug,
  title,
  imageSrc,
  type = "components",
  className,
}: ComponentCardProps) => {
  const href = `/${type}/${slug}`;

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full cursor-pointer flex-col overflow-hidden",
        "rounded-xl border border-border/60 bg-card p-3",
        "transition-all duration-200 hover:border-border hover:bg-card/80",
        className,
      )}
    >
      {/* Title */}
      <div className="flex items-center justify-between px-2 pb-2.5">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          View →
        </span>
      </div>

      {/* Preview */}
      <div className="relative flex-1 min-h-72 overflow-hidden rounded-lg border border-border/40 bg-background">
        {imageSrc ? (
          <div className="relative h-full w-full bg-[oklch(0.1448_0_0)]">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="z-0 object-cover mix-blend-screen"
              quality={100}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src="/nyx-logo.webp"
              alt={title}
              width={120}
              height={120}
              className="object-contain opacity-50"
              quality={100}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </Link>
  );
};

export default ComponentCard;
