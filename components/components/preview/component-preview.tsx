import { Index } from "@/__registry__";
import { ComponentWrapper } from "./component-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Loader, Maximize } from "lucide-react";
import { previewHref } from "@/lib/links";
import Link from "next/link";
import * as React from "react";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  preview?: boolean;
  type?: "components" | "blocks";
}

export function ComponentPreview({
  name,
  children,
  className,
  preview = false,
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

  return (
    <div
      className={cn(
        "not-prose inset-ring-shadow relative my-5 overflow-hidden rounded-[20px] border border-muted bg-card text-foreground hover:shadow-glass-lg transition-shadow duration-200",
        className,
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative w-full gap-0">
        {!preview && (
          <div className="z-10 flex items-center justify-between px-4">
            <TabsList className="relative z-0 flex h-10 w-fit items-center justify-center rounded-none border-0 bg-transparent p-0 text-muted-foreground">
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
                <span>Code</span>
              </TabsTrigger>
            </TabsList>
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
        )}
        <TabsContent value="preview" className="px-1 pb-1">
          <ComponentWrapper
            name={name}
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
                <div className="flex items-center text-sm text-muted-foreground">
                  <Loader className="mr-2 size-4 animate-spin" />
                  Loading...
                </div>
              }
            >
              {Preview}
            </React.Suspense>
          </ComponentWrapper>
        </TabsContent>
        <TabsContent value="code" className="px-1 pb-1">
          <div className="relative w-full overflow-hidden [&_[data-rehype-pretty-code-figure]]:my-0 [&_[data-rehype-pretty-code-figure]>div]:max-h-[400px] [&_[data-rehype-pretty-code-figure]>div]:rounded-2xl [&_pre]:my-0 [&_pre]:max-h-[400px] [&_pre]:overflow-auto [&_.absolute]:bottom-3">
            {Code}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
