import { allDocs, type Doc } from "content-collections";
import type { Metadata } from "next";

export interface SlugPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export type DocSection = "components" | "templates" | "blocks";

export async function getDocFromParams(
  params: SlugPageProps["params"],
  section: DocSection,
): Promise<Doc | null> {
  const { slug } = await params;
  const itemSlug = slug?.[0];

  if (!itemSlug) {
    return null;
  }

  const possibleSlugs = [`${section}/${itemSlug}`, itemSlug];

  return (
    allDocs.find((doc) => possibleSlugs.includes(doc.slugAsParams)) ?? null
  );
}

export function generateDocStaticParams(
  section: DocSection,
): Awaited<SlugPageProps["params"]>[] {
  try {
    return allDocs
      .filter(
        (doc) => doc.slugAsParams.startsWith(`${section}/`) && doc.published,
      )
      .map((doc) => ({
        slug: [doc.slugAsParams.replace(`${section}/`, "")],
      }));
  } catch (error) {
    console.error(`Error in generateStaticParams for ${section}:`, error);
    return [];
  }
}

export function generateDocKeywords({
  title,
  description,
  noun,
  extraKeywords = [],
}: {
  title: string;
  description?: string;
  noun: "component" | "template";
  extraKeywords?: string[];
}): string[] {
  const itemName = title.toLowerCase();
  const keywords = [
    `${itemName} nyx ui ${noun}`,
    `nyx ui ${itemName} ${noun}`,
    `${itemName} nyxui ${noun}`,
    `nyxui ${itemName}`,
    `${itemName} react ${noun}`,
    `react ${itemName} ${noun}`,
    `next.js ${itemName} ${noun}`,
    `${itemName} nextjs ${noun}`,
    `tailwind ${itemName} ${noun}`,
    `${itemName} ui ${noun}`,
    `${itemName} typescript ${noun}`,
    `${itemName} framer motion ${noun}`,
    ...extraKeywords,
  ];

  if (description) {
    const descWords = description.toLowerCase().match(/\b\w{4,}\b/g) || [];
    descWords.forEach((word) => {
      if (!word.includes(noun) && !word.includes("react")) {
        keywords.push(`${word} ${itemName} ${noun}`);
      }
    });
  }

  return keywords;
}

interface CreateBaseMetadataOptions {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  image?: string;
  twitterCreator?: string;
  type?: "website" | "article";
}

/**
 * Returns the shared metadata fields (openGraph, twitter, robots,
 * alternates.canonical, title, description, keywords) used by all
 * listing/detail pages. Each page merges its unique fields on top.
 */
export function createBaseMetadata({
  title,
  description,
  keywords,
  canonical,
  image = "/nyx.webp",
  twitterCreator = "@mihir_jaiswal_",
  type = "website",
}: CreateBaseMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type,
      url: canonical,
      siteName: "Nyx UI",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: twitterCreator,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
    },
  };
}
