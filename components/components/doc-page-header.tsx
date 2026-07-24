import { badgeVariants } from "@/components/ui/badge";
import { categoryHref } from "@/lib/links";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import type { ReactNode } from "react";

interface DocLinkLabels {
  doc: string;
  api: string;
}

interface DocPageHeaderProps {
  title: string;
  description?: string;
  tags?: string[];
  tagBasePath?: string;
  links?: {
    doc?: string;
    api?: string;
  };
  linkLabels?: DocLinkLabels;
  primaryDocLink?: boolean;
  action?: ReactNode;
}

export function DocPageHeader({
  title,
  description,
  tags,
  tagBasePath = "/category",
  links,
  linkLabels = { doc: "Docs", api: "API Reference" },
  primaryDocLink = false,
  action,
}: DocPageHeaderProps) {
  const hasTags = Boolean(tags?.length);

  return (
    <div className="mt-6 space-y-4">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight sm:text-4xl break-words">
        {title}
      </h1>

      {description && (
        <p className="text-muted-foreground [text-wrap:balance]">
          {description}
        </p>
      )}

      {(hasTags || action) && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {hasTags ? (
            <div className="flex flex-wrap gap-2">
              {tags?.map((tag) => (
                <Link
                  key={tag}
                  href={categoryHref(tag, tagBasePath)}
                  className={cn(
                    badgeVariants({ variant: "outline" }),
                    "h-7 rounded-lg border-border/60 bg-background px-2.5 text-xs font-medium text-muted-foreground shadow-none transition-colors hover:bg-muted hover:text-foreground",
                  )}
                >
                  {tag}
                </Link>
              ))}
            </div>
          ) : (
            <span aria-hidden="true" />
          )}
          {action}
        </div>
      )}

      {links && (
        <div className="flex items-center gap-2 pt-1">
          {links.doc && (
            <Link
              href={links.doc}
              target="_blank"
              rel="noreferrer"
              className={cn(
                badgeVariants({
                  variant: primaryDocLink ? "default" : "secondary",
                }),
                "gap-1",
              )}
            >
              {linkLabels.doc}
              <ExternalLinkIcon className="size-3" />
            </Link>
          )}
          {links.api && (
            <Link
              href={links.api}
              target="_blank"
              rel="noreferrer"
              className={cn(badgeVariants({ variant: "secondary" }), "gap-1")}
            >
              {linkLabels.api}
              <ExternalLinkIcon className="size-3" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
