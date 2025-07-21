import { MetadataRoute } from "next";
import { componentsData } from "../registry/Data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nyxui.vercel.app";
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
  ];

  const componentPages: MetadataRoute.Sitemap = [];
  if (componentsData?.components) {
    Object.entries(componentsData.components).forEach(([key]) => {
      const slug = key.toLowerCase().replace(/\s+/g, '-');
      componentPages.push({
        url: `${baseUrl}/components/${slug}`,
        lastModified: date,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  }

  const templatePages: MetadataRoute.Sitemap = [];
  if (componentsData?.templates) {
    Object.entries(componentsData.templates).forEach(([key]) => {
      const slug = key.toLowerCase().replace(/\s+/g, '-');
      templatePages.push({
        url: `${baseUrl}/templates/${slug}`,
        lastModified: date,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  }

  const allTags = new Set<string>();
  if (componentsData?.components) {
    Object.values(componentsData.components).forEach((component) => {
      if (component.tags && Array.isArray(component.tags)) {
        component.tags.forEach((tag) => allTags.add(tag));
      }
    });
  }

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