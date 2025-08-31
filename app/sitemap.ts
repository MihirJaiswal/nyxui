import { MetadataRoute } from "next";
import { allDocs } from "content-collections";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nyxui.com";
  const date = new Date();

  // Main pages
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: date,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: date,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/components`,
      lastModified: date,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: date,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/category`,
      lastModified: date,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/playground`,
      lastModified: date,
      changeFrequency: "weekly",
      priority: 0.7,
    }
  ];

  const componentPages: MetadataRoute.Sitemap = (allDocs || [])
    .filter((doc) => doc.slugAsParams?.startsWith("components/") && doc.published)
    .map((doc) => {
      const slug = doc.slugAsParams.replace("components/", "");
      return {
        url: `${baseUrl}/components/${slug}`,
        lastModified: date,
        changeFrequency: "monthly",
        priority: 0.7,
      } as MetadataRoute.Sitemap[number];
    });

  const templatePages: MetadataRoute.Sitemap = (allDocs || [])
    .filter((doc) => doc.slugAsParams?.startsWith("templates/") && doc.published)
    .map((doc) => {
      const slug = doc.slugAsParams.replace("templates/", "");
      return {
        url: `${baseUrl}/templates/${slug}`,
        lastModified: date,
        changeFrequency: "monthly",
        priority: 0.6,
      } as MetadataRoute.Sitemap[number];
    });

  const allTags = new Set<string>();
  (allDocs || [])
    .filter((doc) => doc.slugAsParams?.startsWith("components/") && doc.published)
    .forEach((doc) => {
      const tags = (doc).tags as string[] | undefined;
      if (Array.isArray(tags)) {
        tags.forEach((tag) => allTags.add(tag));
      }
    });

  const categoryPages: MetadataRoute.Sitemap = Array.from(allTags).map((tag) => ({
    url: `${baseUrl}/category/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`,
    lastModified: date,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const allPages = [
    ...mainPages,
    ...componentPages,
    ...templatePages,
    ...categoryPages,
  ];

  const uniquePages = allPages.filter((page, index, self) => 
    index === self.findIndex((p) => p.url === page.url)
  );

  return uniquePages;
}