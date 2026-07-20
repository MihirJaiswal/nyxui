import { MetadataRoute } from "next";
import { allDocs } from "content-collections";
import { absoluteUrl } from "@/lib/utils";
import { categoryHref, itemHref, siteLinks } from "@/lib/links";

export default function sitemap(): MetadataRoute.Sitemap {
  const date = new Date();

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(siteLinks.home),
      lastModified: date,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: absoluteUrl(siteLinks.docs),
      lastModified: date,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl(siteLinks.components),
      lastModified: date,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl(siteLinks.templates),
      lastModified: date,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(siteLinks.category),
      lastModified: date,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(siteLinks.playground),
      lastModified: date,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const componentPages: MetadataRoute.Sitemap = (allDocs || [])
    .filter(
      (doc) => doc.slugAsParams?.startsWith("components/") && doc.published,
    )
    .map((doc) => {
      const slug = doc.slugAsParams.replace("components/", "");
      return {
        url: absoluteUrl(itemHref("components", slug)),
        lastModified: date,
        changeFrequency: "monthly",
        priority: 0.7,
      } as MetadataRoute.Sitemap[number];
    });

  const templatePages: MetadataRoute.Sitemap = (allDocs || [])
    .filter(
      (doc) => doc.slugAsParams?.startsWith("templates/") && doc.published,
    )
    .map((doc) => {
      const slug = doc.slugAsParams.replace("templates/", "");
      return {
        url: absoluteUrl(itemHref("templates", slug)),
        lastModified: date,
        changeFrequency: "monthly",
        priority: 0.6,
      } as MetadataRoute.Sitemap[number];
    });

  const allTags = new Set<string>();
  (allDocs || [])
    .filter(
      (doc) => doc.slugAsParams?.startsWith("components/") && doc.published,
    )
    .forEach((doc) => {
      const tags = doc.tags as string[] | undefined;
      if (Array.isArray(tags)) {
        tags.forEach((tag) => allTags.add(tag));
      }
    });

  const categoryPages: MetadataRoute.Sitemap = Array.from(allTags).map(
    (tag) => ({
      url: absoluteUrl(categoryHref(tag)),
      lastModified: date,
      changeFrequency: "weekly",
      priority: 0.6,
    }),
  );

  const allPages = [
    ...mainPages,
    ...componentPages,
    ...templatePages,
    ...categoryPages,
  ];

  const uniquePages = allPages.filter(
    (page, index, self) => index === self.findIndex((p) => p.url === page.url),
  );

  return uniquePages;
}
