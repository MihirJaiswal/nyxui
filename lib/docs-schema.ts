import { absoluteUrl } from "@/lib/utils";
import { externalLinks, itemHref } from "@/lib/links";
import type { Doc } from "content-collections";

export const publisher = {
  "@type": "Organization",
  name: "Nyx UI",
  url: `${externalLinks.site}/`,
  logo: {
    "@type": "ImageObject",
    url: externalLinks.logo,
  },
};

const author = {
  "@type": "Person",
  name: "Mihir Jaiswal",
  url: externalLinks.twitter,
};

export function createComponentSchema(
  doc: Doc,
  slug: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["TechArticle", "SoftwareSourceCode"],
    headline: `${doc.title} React Component - Nyx UI Documentation`,
    description:
      doc.description ||
      `${doc.title} component for React and Next.js applications built with Tailwind CSS and TypeScript.`,
    author,
    publisher,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(itemHref("components", slug)),
    },
    datePublished: doc.date || new Date().toISOString().split("T")[0],
    dateModified: new Date().toISOString(),
    programmingLanguage: ["TypeScript", "React", "Next.js"],
    runtimePlatform: "Web Browser",
    operatingSystem: "Cross-platform",
    applicationCategory: "DeveloperApplication",
    keywords: [
      doc.title.toLowerCase(),
      "react component",
      "next.js component",
      "nyx ui",
      "nyxui",
      "tailwind css",
      "typescript",
      ...(doc.tags || []),
    ].join(", "),
    about: {
      "@type": "Thing",
      name: `${doc.title} Component`,
      description: `A ${doc.title.toLowerCase()} component built for React and Next.js applications using Tailwind CSS and TypeScript.`,
    },
    isPartOf: {
      "@type": "SoftwareApplication",
      name: "Nyx UI",
      url: `${externalLinks.site}/`,
      description: "Modern React UI component library for Next.js applications",
    },
  };
}

export function createTemplateSchema(
  template: Doc,
  slug: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareSourceCode", "CreativeWork"],
    headline: `${template.title} React Template - Nyx UI Documentation`,
    name: `${template.title} Template`,
    description:
      template.description ||
      `${template.title} template for React and Next.js applications built with Tailwind CSS and TypeScript.`,
    author,
    publisher,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(itemHref("templates", slug)),
    },
    datePublished: template.date || new Date().toISOString().split("T")[0],
    dateModified: new Date().toISOString(),
    programmingLanguage: ["TypeScript", "React", "Next.js"],
    runtimePlatform: "Web Browser",
    operatingSystem: "Cross-platform",
    applicationCategory: "DeveloperApplication",
    softwareVersion: "1.0",
    keywords: [
      template.title.toLowerCase(),
      "react template",
      "next.js template",
      "nyx ui",
      "nyxui",
      "tailwind css",
      "typescript",
      "website template",
      "ui template",
      ...(template.tags || []),
    ].join(", "),
    about: {
      "@type": "Thing",
      name: `${template.title} Template`,
      description: `A ${template.title.toLowerCase()} template built for React and Next.js applications using Tailwind CSS and TypeScript.`,
    },
    isPartOf: {
      "@type": "SoftwareApplication",
      name: "Nyx UI Templates",
      url: absoluteUrl("/templates"),
      description: "Modern React template collection for Next.js applications",
    },
    screenshot: template.image || "/nyx.webp",
    applicationSubCategory: "Web Template",
    featureList: [
      "React & Next.js Compatible",
      "Tailwind CSS Styling",
      "TypeScript Support",
      "Responsive Design",
      "Production Ready",
      "Customizable Components",
    ],
  };
}
