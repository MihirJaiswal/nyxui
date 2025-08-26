import { Index } from "../../__registry__";
import { ComponentWrapper } from "./component-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "../../lib/utils";
import { Code2Icon, LayoutPanelLeft, Loader } from "lucide-react";
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

  return (
    <div
      className={cn(
        "relative my-4 flex flex-col space-y-2",
        className,
      )}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        {!preview && (
          <div className="flex items-center justify-between">
            <TabsList className="inline-flex h-10 items-center text-muted-foreground w-full justify-start space-x-2 rounded-none bg-transparent p-0 max-w-xs">
              <TabsTrigger
                value="preview"
                className="whitespace-nowrap border-none text-sm disabled:pointer-events-none disabled:opacity-50 text-muted-foreground data-[state=active]:text-foreground relative flex h-10 w-32 items-center justify-center space-x-1 rounded-md bg-transparent p-0 px-4 font-semibold shadow-none transition-none data-[state=active]:bg-zinc-200 data-[state=active]:shadow-none dark:data-[state=active]:bg-zinc-900"
              >
                <LayoutPanelLeft className="h-4 w-4" />
                <span>Preview</span>
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="inline-flex border-none whitespace-nowrap text-sm disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm text-muted-foreground data-[state=active]:text-foreground data-[state=active]:shadow-non relative h-10 w-32 items-center justify-center space-x-1 rounded-md bg-transparent p-0 px-4 font-semibold shadow-none transition-none data-[state=active]:bg-zinc-200 dark:data-[state=active]:bg-zinc-900"
              >
                <Code2Icon className="h-4 w-4" />
                <span>Code</span>
              </TabsTrigger>
            </TabsList>
          </div>
        )}
        <TabsContent value="preview" className="relative rounded-md">
          <ComponentWrapper name={name}>
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
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md relative [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto [&_.absolute]:top-4">
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
