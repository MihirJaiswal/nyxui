import { MetadataRoute } from 'next';
import { componentsData } from '@/nuvyxui/resgistry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nuvyxui.vercel.app';
  const date = new Date();
  const mainPages = [
    {
      url: baseUrl,
      lastModified: date,
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/components`,
      lastModified: date,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: date,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];
  
  const componentPages = Object.keys(componentsData).map((componentKey) => {
    return {
      url: `${baseUrl}/components/${componentKey}`,
      lastModified: date,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });
  
  const tagSet = new Set<string>();
  Object.values(componentsData).forEach(component => {
    if (component.tags) {
      component.tags.forEach(tag => {
        tagSet.add(tag.toLowerCase().replace(/\s+/g, '-'));
      });
    }
  });
  
  const tagPages = Array.from(tagSet).map(tag => {
    return {
      url: `${baseUrl}/tags/${tag}`,
      lastModified: date,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });
  
  return [...mainPages, ...componentPages, ...tagPages];
}