import { notFound } from "next/navigation";
import { componentsData } from "@/registry/Data";
import { absoluteUrl } from "@/lib/utils";
import type { Metadata } from "next";
import { Mdx } from "@/components/components/mdx-components";
import { DocPageHeader } from "@/components/components/doc-page-header";
import { getDocFromParams, type SlugPageProps } from "@/lib/docs";
import { externalLinks, itemHref } from "@/lib/links";
// import Link from "next/link";
// import { Scan } from "lucide-react";
// import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  return Object.keys(componentsData.blocks).map((slug) => ({
    slug: [slug],
  }));
}

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocFromParams(Promise.resolve({ slug }), "blocks");
  const block = componentsData.blocks[slug[0]];

  if (!block || !doc) {
    return {
      title: "Block Not Found",
    };
  }

  return {
    title: `${block.title} - Nyx UI Blocks`,
    description: block.description,
    keywords: [
      "nyx ui blocks",
      "react ui blocks",
      "nextjs blocks",
      "tailwind css blocks",
      ...block.tags,
      block.title.toLowerCase(),
    ],
    openGraph: {
      title: `${block.title} - Nyx UI Blocks`,
      description: block.description,
      url: absoluteUrl(itemHref("blocks", slug[0])),
      siteName: "Nyx UI",
      images: [
        {
          url: block.image,
          width: 1200,
          height: 630,
          alt: `${block.title} - Nyx UI Block`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${block.title} - Nyx UI Blocks`,
      description: block.description,
      images: [block.image],
      creator: "@mihir_jaiswal_",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: absoluteUrl(itemHref("blocks", slug[0])),
    },
  };
}

export default async function BlockPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const block = componentsData.blocks[slug[0]];
  const doc = await getDocFromParams(Promise.resolve({ slug }), "blocks");

  if (!block || !doc) {
    notFound();
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: block.title,
    description: block.description,
    url: absoluteUrl(itemHref("blocks", slug[0])),
    applicationCategory: "UI Component",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "Nyx UI",
      url: `${externalLinks.site}/`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="w-full">
        <DocPageHeader
          title={block.title}
          description={block.description}
          tags={block.tags}
        />

        <div className="mt-6 space-y-8">
          <div className="mdx-content">
            <Mdx code={doc.body.code} type="blocks" />
          </div>
        </div>
      </div>
    </>
  );
}
