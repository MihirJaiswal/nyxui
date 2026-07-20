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
    <div className="space-y-4 mt-5">
      <div className="flex flex-wrap items-start gap-3 sm:items-center justify-between">
        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight sm:text-4xl break-words">
          {title}
        </h1>
        {action}
      </div>

      {description && (
        <div>
          <p className="text-muted-foreground dark:text-[#A1A1AA] text-lg">
            <span className="md:inline-block align-top no-underline md:[text-wrap:balance]">
              {description}
            </span>
          </p>
        </div>
      )}

      {hasTags && (
        <div className="flex flex-wrap gap-2 pt-2">
          {tags?.map((tag) => (
            <Link
              key={tag}
              href={categoryHref(tag, tagBasePath)}
              className={cn(
                badgeVariants({ variant: "outline" }),
                "bg-gray-100 dark:bg-zinc-900 transition-colors hover:bg-gray-200 dark:hover:bg-zinc-800",
              )}
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      {links && (
        <div className="flex items-center space-x-2 pt-2">
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
                primaryDocLink
                  ? "bg-green-600 hover:bg-green-700"
                  : "hover:bg-gray-200 dark:hover:bg-zinc-700",
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
              className={cn(
                badgeVariants({ variant: "secondary" }),
                "gap-1 hover:bg-gray-200 dark:hover:bg-zinc-700",
              )}
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
