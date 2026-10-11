import { useMDXComponent } from "@content-collections/mdx/react";
import { cn } from "@/lib/utils";
import { mdxComponents } from "./components-map";
import { ComponentPreview } from "@/components/components/preview/component-preview";

interface MDXProps {
  code: string;
  className?: string;
  type?: "components" | "blocks";
  withToc?: boolean;
}

export function Mdx({
  code,
  className,
  type = "components",
  withToc,
}: MDXProps) {
  const Component = useMDXComponent(code);

  const componentsWithType = {
    ...mdxComponents,
    ComponentPreview: ({ name, ...props }: { name: string }) => (
      <div className="component-preview-root w-full max-w-full overflow-hidden px-0.5 xl:col-span-2">
        <ComponentPreview name={name} type={type} {...props} />
      </div>
    ),
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <article
        className={cn(
          "mx-auto max-w-[120ch] w-full",
          withToc && "xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-x-12",
          className,
        )}
      >
        <Component components={componentsWithType} />
      </article>
    </div>
  );
}
