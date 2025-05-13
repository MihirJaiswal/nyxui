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
  ComponentPreview: ({ name, ...props }: { name: string }) => (
    <div className="w-full max-w-full overflow-hidden">
      <ComponentPreview name={name} {...props} />
    </div>
  ),

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
        "font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
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
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("ml-6 list-disc w-full max-w-full", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn("ml-6 list-decimal w-full max-w-full", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full max-w-full overflow-x-auto border shadow rounded-none dark:border-zinc-800 dark:bg-black dark:text-zinc-200">
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
      className={cn("bg-zinc-50 dark:bg-black border-b", className)}
      {...props}
    />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "transition-colors border-b last:border-b-0",
        "even:bg-zinc-50 even:dark:bg-zinc-900 odd:bg-white odd:dark:bg-black",
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "px-3 py-3 sm:px-6 sm:py-4 text-left font-medium border-r last:border-r-0 whitespace-normal break-words",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "px-3 py-3 sm:py-4 text-xs sm:text-sm border-r last:border-r-0 break-words whitespace-normal [&[align=center]]:text-center [&[align=right]]:text-right",
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
      className={cn("rounded-none border-none bg-transparent p-0", className)}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(
        "relative h-9 rounded-none border-0 border-b-3 px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-black dark:data-[state=active]:border-b-white data-[state=active]:text-foreground data-[state=active]:shadow-none",
        className,
      )}
      {...props}
    />
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
      <div className="w-full max-w-full overflow-hidden relative">
        <pre
          className={cn(
            "mb-4 mt-6 max-h-[650px] overflow-x-auto !rounded-sm border !border-zinc-800 !bg-zinc-950 !pl-4 w-full max-w-full",
            className,
          )}
          {...props}
        />
        {__rawString__ && __src__ && __event__ && (
          <CopyButton
            value={__rawString__}
            src={__src__}
            event={__event__}
            className={cn("absolute right-4 top-4", __withMeta__ && "top-16")}
          />
        )}
      </div>
    );
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative !rounded-sm font-mono text-sm bg-transparent py-4 font-semibold tracking-wide leading-snug break-words whitespace-pre-wrap",
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
}

export function Mdx({ code, className }: MDXProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="w-full max-w-full overflow-hidden">
      <article className={cn("mx-auto max-w-[120ch] w-full", className)}>
        <Component components={components} />
      </article>
    </div>
  );
}
