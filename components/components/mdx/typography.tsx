import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { CustomLink } from "./CustomLink";

export const headings = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "font-heading mt-2 scroll-m-20 text-4xl font-bold",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "font-heading mt-6 scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
};

export const text = {
  a: ({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <CustomLink
      className={cn(
        "font-medium underline underline-offset-4 text-foreground",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6 text-foreground",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn(
        "ml-6 list-disc w-full max-w-full text-foreground",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn(
        "ml-6 list-decimal w-full max-w-full text-foreground",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2 text-foreground", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic text-foreground", className)}
      {...props}
    />
  ),
  figure: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement> & {
    "data-rehype-pretty-code-figure"?: string;
  }) => (
    <figure
      className={cn(
        props["data-rehype-pretty-code-figure"] !== undefined &&
          "not-prose my-5 w-full max-w-full",
        className,
      )}
      {...props}
    />
  ),
};

export const table = {
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full max-w-full overflow-x-auto rounded-xl border border-border/70 bg-card text-card-foreground">
      <table
        className={cn("min-w-full border-collapse text-sm", className)}
        {...props}
      />
    </div>
  ),
  thead: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className={cn(
        "border-b border-border/70 bg-muted/50 text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "border-b border-border/60 transition-colors last:border-b-0 hover:bg-muted/30",
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border-r border-border/60 px-3 py-3 text-left text-xs font-medium uppercase tracking-wide last:border-r-0 sm:px-4",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border-r border-border/60 px-3 py-3 text-xs leading-6 text-muted-foreground last:border-r-0 sm:px-4 sm:text-sm [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
};
