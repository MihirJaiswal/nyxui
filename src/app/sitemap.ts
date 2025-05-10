import { MetadataRoute } from "next";
import { componentsData } from "@/nuvyxui/Data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nuvyxui.vercel.app";
  const date = new Date();

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: date,
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: date,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/documentation`,
      lastModified: date,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Component pages
  const componentPages = Object.keys(componentsData.components).map(
    (componentKey) => {
      return {
        url: `${baseUrl}/docs/${componentKey}`,
        lastModified: date,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    },
  );

  // Extract all unique tags from components
  const allTags = new Set<string>();
  Object.values(componentsData.components).forEach((component) => {
    component.tags.forEach((tag) => allTags.add(tag));
  });

  // Category pages for each tag
  const categoryPages = Array.from(allTags).map((tag) => ({
    url: `${baseUrl}/docs/category/${encodeURIComponent(tag.toLowerCase())}`,
    lastModified: date,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Category index page
  const categoryIndexPage = {
    url: `${baseUrl}/docs/category`,
    lastModified: date,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  };

  return [...mainPages, ...componentPages, categoryIndexPage, ...categoryPages];
}
