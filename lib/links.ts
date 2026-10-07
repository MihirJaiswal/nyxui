import { absoluteUrl } from "@/lib/utils";
import type { DocSection } from "@/lib/docs";

export const siteLinks = {
  home: "/",
  docs: "/docs",
  components: "/components",
  blocks: "/blocks",
  templates: "/templates",
  category: "/category",
  playground: "/playground",
  pro: "/pro",
} as const;

export const externalLinks = {
  site: "https://nyxui.com",
  logo: "https://nyxui.com/assets/logos/nyx-logo.webp",
  githubRepo: "https://github.com/MihirJaiswal/nyxui",
  githubProfile: "https://github.com/MihirJaiswal",
  twitter: "https://x.com/mihir_jaiswal_",
  linkedin: "https://www.linkedin.com/in/mihir-jaiswal-322898287/",
} as const;

export function itemHref(section: DocSection, slug: string): string {
  return `/${section}/${slug}`;
}

export function categoryHref(
  tag: string,
  basePath: string = siteLinks.category,
): string {
  return `${basePath}/${tagToSlug(tag)}`;
}

export function previewHref(slug: string): string {
  return `/preview/${slug}`;
}

export function playgroundComponentHref(slug: string): string {
  return `${siteLinks.playground}?component=${slug}`;
}

export function registryItemUrl(slug: string): string {
  return absoluteUrl(`/r/${slug}.json`);
}

export function tagToSlug(tag: string): string {
  return encodeURIComponent(tag.toLowerCase().replace(/\s+/g, "-"));
}

export function getBlockCategory(slug: string, tags: string[]): string {
  // Mockups are an explicit tag-driven bucket — slug heuristics below
  // (e.g. "auth-cluster" containing "auth") must not steal them.
  // Full bento compositions get their own bucket before the Mockups check.
  if (tags.includes("Bento")) return "Bento";
  if (tags.includes("Navigation")) return "Navigation";
  if (tags.includes("Interactions")) return "Interactions";
  if (tags.includes("Logo Cloud")) return "Logo Cloud";
  if (tags.includes("Pricing")) return "Pricing";
  if (tags.includes("Mockups")) return "Mockups";
  // Hero is slug-driven and must stay ahead of the "Section" check below:
  // hero-section-* blocks also carry a "Section" tag.
  if (slug.startsWith("hero-section")) return "Hero";
  // Feature/Footer before Section for the same reason — their tags are
  // ["Feature","Section",…] and ["Footer","Section",…].
  if (tags.includes("Feature")) return "Feature";
  if (tags.includes("Footer")) return "Footer";
  if (tags.includes("Section")) return "Section";
  return tags[0] ?? "Other";
}

export function blockCategoryHref(category: string): string {
  return categoryHref(category, "/blocks/category");
}

export function getComponentCategory(title: string, tags: string[]): string {
  if (tags.includes("Auth")) {
    return "Auth";
  }

  if (tags.includes("Buttons") || title.toLowerCase().includes("button")) {
    return "Button";
  }

  if (tags.includes("3D") || title.toLowerCase().includes("blob")) {
    return "Three Js";
  }

  if (tags.includes("Cards") || tags.includes("Card")) {
    return "Card";
  }

  if (tags.includes("Typography")) {
    return "Text";
  }

  if (tags.includes("Tools") || tags.includes("Mock")) {
    return "Tools";
  }

  if (tags.includes("Media") || tags.includes("Image")) {
    return "Media";
  }

  if (tags.includes("Background")) {
    return "Background";
  }

  if (tags.includes("Animation") || tags.includes("Effects")) {
    return "Motion";
  }

  return "Interactive";
}
