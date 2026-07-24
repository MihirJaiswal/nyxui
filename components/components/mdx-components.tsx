import { Callout } from "./callout";
import { CodeBlockCommand } from "./code-block-command";
import RepoDownload from "./repo-download";
import TechStack from "./tech-stack";
import TemplatePreview from "./template-preview";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Event } from "../../lib/event";
import { cn } from "../../lib/utils";
import { useMDXComponent } from "@content-collections/mdx/react";
import Image from "next/image";
import Link from "next/link";
import { ComponentPreview } from "./component-preview";
import { ComponentSource } from "./component-source";
import { CopyButton } from "./copy-button";
import * as React from "react";

type CodeElementProps = React.HTMLAttributes<HTMLElement> & {
  "data-slot"?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomLink = (props: any) => {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const components = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Callout,
  TechStack,
  RepoDownload,
  TemplatePreview,
  Image,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ComponentSource: (props: any) => (
    <div className="w-full max-w-full overflow-hidden">
      <ComponentSource {...props} />
    </div>
  ),
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
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
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
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full max-w-full overflow-hidden rounded-xl border border-border/70 bg-card text-card-foreground shadow-sm dark:border-white/5 dark:bg-[#0F0F0F]">
      <table
        className={cn("w-full max-w-full border-collapse text-sm", className)}
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
        "border-b border-border/70 bg-muted/50 text-muted-foreground dark:border-white/5 dark:bg-[#151515]",
        className,
      )}
      {...props}
    />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "border-b border-border/60 transition-colors last:border-b-0 hover:bg-muted/30 dark:border-white/5 dark:hover:bg-[#151515]",
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border-r border-border/60 px-3 py-3 text-left text-xs font-medium uppercase tracking-wide last:border-r-0 dark:border-white/5 sm:px-4",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border-r border-border/60 px-3 py-3 text-xs leading-6 text-muted-foreground last:border-r-0 dark:border-white/5 dark:text-neutral-400 sm:px-4 sm:text-sm [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step steps mb-12 overflow-visible pl-8 relative before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/50 before:to-transparent w-full max-w-full "
      {...props}
    />
  ),
  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
    <Tabs
      className={cn("relative mt-6 w-full overflow-x-auto", className)}
      {...props}
    />
  ),
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList
      className={cn(
        "relative z-0 flex h-8 w-fit items-center justify-center rounded-lg bg-zinc-50 p-0.5 text-muted-foreground shadow-none inset-ring-1 inset-ring-border/64 dark:bg-zinc-900",
        className,
      )}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    children,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(
        "relative z-10 flex h-7 flex-1 shrink-0 items-center justify-center gap-2 rounded-md border-0 bg-transparent px-4 py-1 font-sans text-sm font-medium whitespace-nowrap text-muted-foreground shadow-none outline-none transition-[color,background-color] hover:text-foreground focus-visible:inset-ring-1 focus-visible:inset-ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:inset-ring-1 data-[state=active]:inset-ring-foreground/10 dark:data-[state=active]:bg-muted dark:data-[state=active]:inset-ring-foreground/6 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children === "CLI" ? "Command" : children}
    </TabsTrigger>
  ),
  TabsContent: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
        className,
      )}
      {...props}
    />
  ),
  pre: ({
    className,
    children,
    style,
    __rawString__,
    __npmCommand__,
    __pnpmCommand__,
    __yarnCommand__,
    __bunCommand__,
    __withMeta__,
    __src__,
    __event__,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {
    __rawString__?: string;
    __npmCommand__?: string;
    __pnpmCommand__?: string;
    __yarnCommand__?: string;
    __bunCommand__?: string;
    __withMeta__?: boolean;
    __src__?: string;
    __event__?: Event["name"];
    __name__?: string;
  }) => {
    const isNpmCommand =
      __npmCommand__ && __yarnCommand__ && __pnpmCommand__ && __bunCommand__;
    const codeBlockChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement<CodeElementProps>(child)) {
        return child;
      }

      return React.cloneElement(child, {
        "data-slot": "code-block",
        style: {
          ...child.props.style,
          display: "grid",
        },
      });
    });

    if (isNpmCommand) {
      return (
        <div className="relative w-full max-w-full overflow-hidden block">
          <CodeBlockCommand
            __npmCommand__={__npmCommand__}
            __yarnCommand__={__yarnCommand__}
            __pnpmCommand__={__pnpmCommand__}
            __bunCommand__={__bunCommand__}
          />
        </div>
      );
    }

    return (
      <div className="group/pre relative overflow-hidden rounded-xl border border-border/70 bg-white shadow-sm dark:border-white/5 dark:bg-[#0F0F0F]">
        <pre
          className={cn(
            "m-0 max-h-[650px] w-full max-w-full overflow-x-auto bg-transparent p-4 pr-24 text-[13px] leading-6 [--code-padding-right:6rem] [&_code]:min-w-full [&_code]:bg-transparent [&_code]:p-0 [&_code]:leading-6 [&_code]:whitespace-pre [&_[data-line]]:min-h-6 [&_[data-line]]:pr-[var(--code-padding-right)] [&_[data-line]]:leading-6",
            className,
          )}
          style={{
            ...style,
            backgroundColor: "transparent",
          }}
          tabIndex={0}
          {...props}
        >
          {codeBlockChildren}
        </pre>
        {__rawString__ && (
          <>
            <CopyButton
              value={__rawString__}
              src={__src__ ?? "code-block"}
              event={__event__}
              aria-label="Copy"
              data-slot="copy-button"
              data-variant="ghost"
              data-size="icon-xs"
              className={cn(
                "group/button absolute right-3 top-3 z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/70 bg-white text-sm font-medium whitespace-nowrap text-muted-foreground opacity-100 outline-none transition-all select-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:border-white/5 dark:bg-[#1A1A1A] dark:text-neutral-400 dark:hover:bg-[#252525] dark:hover:text-neutral-200 [&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
                __withMeta__ && "top-12",
              )}
            />
            <div
              aria-hidden="true"
              data-fade-overlay="true"
              className={cn(
                "pointer-events-none absolute right-1.5 top-1.5 h-12 w-24 bg-gradient-to-l from-white to-transparent opacity-100 dark:from-[#0F0F0F]",
                __withMeta__ && "top-11",
              )}
            />
          </>
        )}
      </div>
    );
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.9em] font-medium leading-snug text-foreground",
        className,
      )}
      {...props}
    />
  ),
  LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        "flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground shadow transition-colors hover:bg-muted/50 sm:p-10",
        className,
      )}
      {...props}
    />
  ),
};

interface MDXProps {
  code: string;
  className?: string;
  type?: "components" | "blocks";
}

export function Mdx({ code, className, type = "components" }: MDXProps) {
  const Component = useMDXComponent(code);

  // Create components with the type prop
  const componentsWithType = {
    ...components,
    ComponentPreview: ({ name, ...props }: { name: string }) => (
      <div className="w-full max-w-full overflow-hidden">
        <ComponentPreview name={name} type={type} {...props} />
      </div>
    ),
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <article className={cn("mx-auto max-w-[120ch] w-full", className)}>
        <Component components={componentsWithType} />
      </article>
    </div>
  );
}
