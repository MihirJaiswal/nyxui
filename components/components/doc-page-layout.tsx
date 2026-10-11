import { useMDXComponent } from "@content-collections/mdx/react";
import {
  Children,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { DocToc, type TocHeading } from "@/components/components/toc";
import { ComponentPreview } from "@/components/components/preview/component-preview";
import { mdxComponents } from "./mdx/components-map";

export interface DocPageLayoutProps {
  code: string;
  type: "components" | "blocks";
  headings: TocHeading[];
  /** Rendered below the prose body, aligned with the prose column. */
  footer?: ReactNode;
  className?: string;
}

function partition(
  nodes: ReactNode,
  previewType: unknown,
): { firstPreview: ReactNode | null; rest: ReactNode[] } {
  let firstPreview: ReactNode | null = null;
  const rest: ReactNode[] = [];
  Children.forEach(nodes, (child) => {
    if (child === null || child === undefined || child === false) return;
    if (
      firstPreview === null &&
      isValidElement(child) &&
      child.type === previewType
    ) {
      firstPreview = child;
    } else {
      rest.push(child);
    }
  });
  return { firstPreview, rest };
}

/**
 * Docs page body layout.
 *
 *   [Preview(s)]    — full content-column width
 *   [Prose  |  TOC] — prose flexes, TOC is a fixed sticky sidecar
 *
 * The MDX is evaluated once on the server; top-level <ComponentPreview />
 * elements are hoisted out of the prose flow by comparing element types
 * against the exact override we inject into the components map.
 */
export function DocPageLayout({
  code,
  type,
  headings,
  footer,
  className,
}: DocPageLayoutProps) {
  // `@content-collections/mdx/react` exposes a react-server conditional
  // export that evaluates synchronously (no useMemo) — safe here.
  const MDXContent = useMDXComponent(code);

  // Stable reference: elements in the MDX tree that came from a
  // <ComponentPreview /> tag will have exactly this function as their type.
  function PreviewSlot({ name, ...props }: { name: string }) {
    return (
      <div className="w-full max-w-full overflow-hidden">
        <ComponentPreview {...props} name={name} type={type} />
      </div>
    );
  }

  const componentsMap = {
    ...mdxComponents,
    ComponentPreview: PreviewSlot,
  };

  const tree = MDXContent({ components: componentsMap }) as ReactElement<{
    children?: ReactNode;
  }>;

  const rootChildren: ReactNode[] = tree?.props?.children
    ? Children.toArray(tree.props.children)
    : [];
  const { firstPreview, rest } = partition(rootChildren, PreviewSlot);
  const showToc = headings.length > 0;

  return (
    <div className={cn("w-full", className)}>
      {firstPreview ? <div className="w-full">{firstPreview}</div> : null}

      <div
        className={cn(
          firstPreview && "mt-12",
          "flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-14",
        )}
      >
        <article className="min-w-0 flex-1 space-y-6">
          {rest.map((node, i) => (
            <Fragment key={i}>{node}</Fragment>
          ))}
          {footer ? <div className="pt-4">{footer}</div> : null}
        </article>

        {showToc ? (
          <aside className="hidden w-56 shrink-0 self-stretch xl:block">
            <div className="sticky top-24">
              <DocToc headings={headings} />
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
