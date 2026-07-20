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
} as const;

export const externalLinks = {
  site: "https://nyxui.com",
  logo: "https://nyxui.com/logo.png",
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
