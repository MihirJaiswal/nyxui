import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PRO_SITE_URL } from "@/registry/Data";

interface ComponentCardProps {
  slug: string;
  title: string;
  description?: string;
  imageSrc?: string;
  type?: "components" | "blocks" | "templates";
  className?: string;
  imageClassName?: string;
  isPro?: boolean;
  proUrl?: string;
}

export const ComponentCard = ({
  slug,
  title,
  imageSrc,
  type = "components",
  className,
  imageClassName,
  isPro = false,
  proUrl,
}: ComponentCardProps) => {
  const href = isPro ? (proUrl ?? PRO_SITE_URL) : `/${type}/${slug}`;

  const cardBody = (
    <>
      {/* Title Area */}
      <div className="flex w-full flex-col items-start justify-between gap-1.5 px-2 pb-2">
        <div className="flex w-full items-center justify-between gap-2">
          <h3 className="text-card-foreground font-medium">{title}</h3>
          {isPro && (
            <span
              className={cn(
                "shrink-0 rounded-full border border-brand/40 bg-brand/10 px-2 py-0.5",
                "text-[10px] font-semibold uppercase tracking-wide text-brand",
              )}
            >
              Pro
            </span>
          )}
        </div>
      </div>

      {/* Preview Area */}
      <div
        className="
    inset-ring-shadow relative w-full flex-1 min-h-60 sm:min-h-70 xl:min-h-80
    overflow-hidden rounded-2xl border border-background bg-background
    after:pointer-events-none
    after:absolute after:inset-0 after:z-10
    after:rounded-2xl
    after:shadow-[inset_0_0_0.1px_var(--preview-inset),inset_0_1px_1px_var(--preview-inset)]
  "
      >
        {imageSrc ? (
          <div className="relative w-full h-full bg-background isolate overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={title}
              className={cn(
                "absolute inset-0 h-full w-full object-contain dark:mix-blend-screen",
                imageClassName,
              )}
              loading="lazy"
              draggable="false"
            />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-full shrink-0 bg-background">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nyx-logo.webp"
              alt={title}
              className="inline-block rounded-lg w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </>
  );

  if (isPro) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group relative flex h-full cursor-pointer flex-col overflow-hidden",
          "rounded-[20px] border border-muted bg-card dark:bg-border/10 p-3",
          "shadow-glass transition-colors duration-200",
          "hover:bg-card/80 hover:shadow-glass-lg",
          className,
        )}
      >
        {cardBody}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full cursor-pointer flex-col overflow-hidden",
        "rounded-[20px] border border-muted bg-card dark:bg-border/10 p-3",
        "shadow-glass transition-colors duration-200",
        "hover:bg-card/80 hover:shadow-glass-lg",
        className,
      )}
    >
      {cardBody}
    </Link>
  );
};

export default ComponentCard;
