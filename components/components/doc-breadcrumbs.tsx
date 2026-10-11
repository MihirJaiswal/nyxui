import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DocBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Server-rendered breadcrumb row for docs pages. Pairs with the
 * JsonLd BreadcrumbList already emitted on each page for SEO.
 */
export function DocBreadcrumbs({ items, className }: DocBreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("mb-6 text-sm text-muted-foreground", className)}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li
              key={`${item.label}-${i}`}
              className="flex items-center gap-1.5"
            >
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-foreground" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="size-3.5 opacity-60" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
