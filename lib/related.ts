import { componentsData } from "@/registry/Data";

export type RelatedComponent = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
};

/**
 * Pick up to `limit` other components that share tags with the given one.
 *
 * The ranking is deliberately simple: components are scored by how many
 * tags they share with the subject, ties broken by alphabetical slug so
 * the order is deterministic (prevents hydration mismatches). Components
 * flagged `isPro` are not excluded — the Pro gating is handled at the
 * card/link level, not here, and seeing related Pro work drives upsell.
 *
 * Returned shape is minimal on purpose so callers can render anything
 * from a plain link list to a full card grid without reaching back into
 * `componentsData`.
 */
export function getRelatedComponents(
  slug: string,
  limit = 4,
): RelatedComponent[] {
  const subject = componentsData.components[slug];
  if (!subject) return [];
  const subjectTags = new Set((subject.tags ?? []).map((t) => t.toLowerCase()));
  if (subjectTags.size === 0) return [];

  const scored: Array<{ slug: string; score: number; data: RelatedComponent }> =
    [];

  for (const [otherSlug, data] of Object.entries(componentsData.components)) {
    if (otherSlug === slug) continue;
    const shared = (data.tags ?? []).filter((t) =>
      subjectTags.has(t.toLowerCase()),
    ).length;
    if (shared === 0) continue;
    scored.push({
      slug: otherSlug,
      score: shared,
      data: {
        slug: otherSlug,
        title: data.title,
        description: data.description ?? "",
        tags: data.tags ?? [],
        image: data.image,
      },
    });
  }

  scored.sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug));
  return scored.slice(0, limit).map((entry) => entry.data);
}
