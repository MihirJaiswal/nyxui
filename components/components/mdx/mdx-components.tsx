import { useMDXComponent } from "@content-collections/mdx/react";
import { cn } from "@/lib/utils";
import { mdxComponents } from "./components-map";
import { ComponentPreview } from "../preview/component-preview";

interface MDXProps {
  code: string;
  className?: string;
  type?: "components" | "blocks";
}

export function Mdx({ code, className, type = "components" }: MDXProps) {
  const Component = useMDXComponent(code);

  const componentsWithType = {
    ...mdxComponents,
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
