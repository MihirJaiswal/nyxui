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
        "rounded-[20px] border border-card bg-card p-3",
        "shadow-glass transition-colors duration-200",
        "hover:bg-secondary",
        className,
      )}
    >
      {/* Title Area */}
      <div className="flex flex-col items-start justify-between gap-1.5 px-2 pb-2">
        <h3 className="text-card-foreground font-medium">{title}</h3>
      </div>

      {/* Preview Area */}
      <div
        className="
    relative w-full flex-1 min-h-72
    overflow-hidden rounded-2xl border border-background bg-background
    after:pointer-events-none
    after:absolute after:inset-0 after:z-10
    after:rounded-2xl
    after:shadow-[inset_0_0_0.1px_rgba(255,255,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.11)]
  "
        style={{
          boxShadow: "rgba(0, 0, 0, 0.31) 0px 4px 8px 0px",
        }}
      >
        {imageSrc ? (
          <div className="relative w-full h-full bg-background isolate overflow-hidden ">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover mix-blend-screen"
              quality={100}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full flex-shrink-0 bg-background">
            <Image
              src="/nyx-logo.webp"
              alt={title}
              width={150}
              height={150}
              className="inline-block rounded-lg w-full h-full object-contain"
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
