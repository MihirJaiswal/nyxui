"use client";

import { Index } from "@/__registry__";
import { ComponentWrapper } from "./component-wrapper";
import { MockupWrapper } from "./mockup-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Eye,
  Loader,
  Lock,
  Maximize,
  MoreVertical,
  RotateCcw,
} from "lucide-react";
import { previewHref } from "@/lib/links";
import { componentsData } from "@/registry/Data";
import Link from "next/link";
import * as React from "react";
import { ReplayButton } from "./replay-button";
import { ProSourceWarmer } from "@/components/components/code-block/pro-code-gate";

/**
 * Mobile-only 3-dot menu. Replaces the crowded Preview/Code tabs +
 * Replay + Maximize toolbar on small screens. Switching tabs here
 * drives the controlled Radix Tabs above.
 */
function MobileMenu({
  name,
  isPro,
  onTabChange,
}: {
  name: string;
  isPro: boolean;
  onTabChange: (value: string) => void;
}) {
  const replay = () =>
    window.dispatchEvent(new CustomEvent("nyxui:replay", { detail: { name } }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex size-7 items-center justify-center rounded-[5px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground dark:hover:bg-muted/50"
        aria-label="More options"
      >
        <MoreVertical size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => onTabChange("preview")}>
          <Eye />
          Preview
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onTabChange("code")}>
          {isPro && <Lock aria-label="Pro" />}
          Code
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={replay}>
          <RotateCcw />
          Replay
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={previewHref(name)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Maximize />
            Full screen
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  preview?: boolean;
  type?: "components" | "blocks";
  /** Force the ComponentCard-style wrapper (name header + MockupWrapper
      stage) instead of the edge-to-edge block treatment. Used on the
      category page where blocks stack without page headers. */
  titled?: boolean;
}

export function ComponentPreview({
  name,
  children,
  className,
  preview = false,
  type = "components",
  titled = false,
  ...props
}: ComponentPreviewProps) {
  const Codes = React.Children.toArray(children) as React.ReactElement[];
  const Code = Codes[0];

  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component;

    if (!Component) {
      console.error(`Component with name "${name}" not found in registry.`);
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name]);
  const isTallPreview = name === "3d-layered-card-demo";
  const isBlobPreview = name === "morphing-blob-demo";
  // Pro items get a lock icon in the Code tab so it's obvious the
  // source is gated before the user clicks in.
  const isPro = Index[name]?.meta?.pro === true;

  // Mockup blocks (title starts with "Mockup:") get the small named
  // wrapper — ComponentCard-style header bar instead of the tabbed
  // edge-to-edge block treatment.
  const blockMeta =
    componentsData.blocks[name] ??
    componentsData.blocks[name.replace(/-demo$/, "")];
  const isMockup =
    (type === "blocks" && blockMeta?.title.startsWith("Mockup:")) || titled;
  const mockupTitle = blockMeta?.title.replace(/^Mockup:\s*/, "") ?? name;
  const [tab, setTab] = React.useState("preview");

  if (isMockup) {
    return (
      <div
        className={cn(
          "not-prose inset-ring-shadow relative mx-2 mb-2 flex h-full flex-1 flex-col overflow-hidden rounded-[20px] border border-muted bg-card dark:bg-border/10 text-foreground hover:shadow-glass-lg transition-shadow duration-200",
          className,
        )}
        {...props}
      >
        <Tabs
          value={tab}
          onValueChange={setTab}
          className="relative flex h-full w-full flex-col gap-0"
        >
          <div className="z-10 flex items-center justify-between px-4">
            {/* ComponentCard-style title row: name + tab switch */}
            <div className="flex items-center gap-3 pt-3">
              <h3 className="text-sm font-medium text-card-foreground">
                {mockupTitle}
              </h3>
            </div>
            <div className="flex items-center gap-1 pt-2">
              <TabsList className="relative z-0 hidden h-8 w-fit items-center justify-center rounded-lg border border-muted bg-muted/50 p-0.5 text-muted-foreground sm:flex">
                <TabsTrigger
                  value="preview"
                  className="h-6 rounded-md border-0 bg-transparent px-2.5 py-0 text-xs font-medium text-muted-foreground shadow-none transition-colors hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  <span>Preview</span>
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="h-6 rounded-md border-0 bg-transparent px-2.5 py-0 text-xs font-medium text-muted-foreground shadow-none transition-colors hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  <span className="inline-flex items-center gap-1.5">
                    {isPro && <Lock aria-label="Pro" className="size-3" />}
                    Code
                  </span>
                </TabsTrigger>
              </TabsList>
              <div className="hidden items-center gap-1 sm:flex">
                <ReplayButton name={name} />
                <Link
                  href={previewHref(name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-7 items-center justify-center rounded-[5px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground dark:hover:bg-muted/50"
                  aria-label="Open in full screen"
                >
                  <Maximize size={16} />
                </Link>
              </div>
              <div className="sm:hidden">
                <MobileMenu name={name} isPro={isPro} onTabChange={setTab} />
              </div>
            </div>
          </div>
          <TabsContent
            value="preview"
            className="flex min-h-0 flex-1 flex-col px-3 pb-3 pt-1"
          >
            <MockupWrapper name={name} className="flex-1">
              <React.Suspense
                fallback={
                  <div className="flex min-h-72 w-full flex-1 items-center justify-center text-sm text-muted-foreground">
                    <Loader className="mr-2 size-4 animate-spin" />
                    Loading...
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </MockupWrapper>
            {isPro && <ProSourceWarmer name={name} />}
          </TabsContent>
          <TabsContent value="code" className="px-3 pb-3 pt-1">
            <div className="relative w-full max-h-180 overflow-y-auto **:data-rehype-pretty-code-figure:my-0 [&_[data-rehype-pretty-code-figure]>div]:rounded-2xl [&_pre]:my-0 [&_pre]:overflow-auto">
              {Code}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "not-prose inset-ring-shadow relative my-5 overflow-hidden rounded-[20px] border border-muted bg-card dark:bg-border/10 text-foreground hover:shadow-glass-lg transition-shadow duration-200",
        className,
      )}
      {...props}
    >
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="relative w-full gap-0"
      >
        {!preview && (
          <div className="z-10 flex items-center justify-between px-4">
            <TabsList className="relative z-0 hidden h-10 w-fit items-center justify-center rounded-none border-0 bg-transparent p-0 text-muted-foreground sm:flex">
              <TabsTrigger
                value="preview"
                className="relative h-7 rounded-lg border-0 bg-transparent px-2 py-0 text-sm font-medium text-muted-foreground shadow-none transition-colors hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:rounded-full after:bg-transparent data-[state=active]:after:bg-foreground"
              >
                <span>Preview</span>
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="relative h-7 rounded-lg border-0 bg-transparent px-2 py-0 text-sm font-medium text-muted-foreground shadow-none transition-colors hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:rounded-full after:bg-transparent data-[state=active]:after:bg-foreground"
              >
                <span className="inline-flex items-center gap-1.5">
                  {isPro && <Lock aria-label="Pro" className="size-3.5" />}
                  Code
                </span>
              </TabsTrigger>
            </TabsList>
            <Link
              href={previewHref(name)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden size-7 items-center justify-center rounded-[5px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex dark:hover:bg-muted/50"
              aria-label="Open in full screen"
            >
              <Maximize size={16} />
            </Link>
            <div className="sm:hidden">
              <MobileMenu name={name} isPro={isPro} onTabChange={setTab} />
            </div>
          </div>
        )}
        <TabsContent value="preview" className="px-1 pb-1">
          <ComponentWrapper
            name={name}
            type={type}
            className="rounded-2xl"
            stageClassName={
              isBlobPreview
                ? "min-h-[460px] sm:min-h-[480px] md:min-h-[500px]"
                : isTallPreview
                  ? "min-h-[420px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[540px]"
                  : undefined
            }
          >
            <React.Suspense
              fallback={
                <div className="flex min-h-72 w-full flex-1 items-center justify-center text-sm text-muted-foreground">
                  <Loader className="mr-2 size-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              {Preview}
            </React.Suspense>
          </ComponentWrapper>
          {isPro && <ProSourceWarmer name={name} />}
        </TabsContent>
        <TabsContent value="code" className="px-1 pb-1">
          <div className="relative w-full overflow-hidden **:data-rehype-pretty-code-figure:my-0 [&_[data-rehype-pretty-code-figure]>div]:rounded-2xl [&_pre]:my-0 [&_pre]:overflow-auto">
            {Code}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
