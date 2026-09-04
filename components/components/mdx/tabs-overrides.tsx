import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export const stepOverrides = {
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
      className="[&>h3]:step steps mb-12 overflow-visible pl-8 relative before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-linear-to-b before:from-transparent before:via-muted-foreground/50 before:to-transparent w-full max-w-full "
      {...props}
    />
  ),
};

export const tabsOverrides = {
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
        "relative z-0 flex h-8 w-fit items-center justify-center rounded-lg bg-card p-0.5 text-muted-foreground shadow-none inset-ring-1 inset-ring-border/64",
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
        "relative z-10 flex h-7 flex-1 shrink-0 items-center justify-center gap-2 rounded-md border-0 bg-transparent px-4 py-1 font-sans text-sm font-medium whitespace-nowrap text-muted-foreground shadow-none outline-none transition-[color,background-color] hover:text-foreground focus-visible:inset-ring-1 focus-visible:inset-ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-muted data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:inset-ring-1 data-[state=active]:inset-ring-foreground/10 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
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
};

export const LinkedCard = ({
  className,
  ...props
}: React.ComponentProps<typeof Link>) => (
  <Link
    className={cn(
      "flex w-full flex-col items-center rounded-xl border bg-card p-6 text-card-foreground transition-colors hover:bg-muted/50 sm:p-10",
      className,
    )}
    {...props}
  />
);
