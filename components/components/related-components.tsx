import Link from "next/link";
import { itemHref } from "@/lib/links";
import { getRelatedComponents } from "@/lib/related";

/**
 * Server-rendered "related components" grid shown at the bottom of each
 * component page. Picks other components that share at least one tag with
 * the current one.
 *
 * Why bother: these links give Google a strong topic-cluster signal (every
 * component in a category points at its siblings), and they genuinely help
 * users bounce between adjacent components instead of back-arrowing to the
 * gallery. Renders real `<Link>` elements so the signal is a first-class
 * part of the crawl graph, not a client-side JS behaviour.
 *
 * Hidden when there are no matches, so narrow-tagged components don't
 * surface an empty section.
 */
export function RelatedComponents({ slug }: { slug: string }) {
  const related = getRelatedComponents(slug, 4);
  if (related.length === 0) return null;

  return (
    <aside className="mt-16 mx-auto max-w-[120ch] w-full">
      <h2 className="mb-6 text-xl font-semibold text-foreground">
        Related components
      </h2>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {related.map((item) => (
          <li key={item.slug}>
            <Link
              href={itemHref("components", item.slug)}
              className="group block rounded-lg border border-border/60 bg-card/40 p-4 transition hover:border-border hover:bg-card/70"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-foreground">
                  {item.title}
                </span>
              </div>
              {item.description && (
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
