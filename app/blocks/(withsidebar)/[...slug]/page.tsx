import { notFound } from "next/navigation";
import { componentsData } from "@/registry/Data";
import { absoluteUrl } from "@/lib/utils";
import type { Metadata } from "next";
import { DocPageHeader } from "@/components/components/doc-page-header";
import { DocPageLayout } from "@/components/components/doc-page-layout";
import { DocBreadcrumbs } from "@/components/components/doc-breadcrumbs";
import {
  createBaseMetadata,
  extractHeadings,
  getDocFromParams,
  type SlugPageProps,
} from "@/lib/docs";
import { createBreadcrumbSchema, publisher } from "@/lib/docs-schema";
import { itemHref, siteLinks } from "@/lib/links";
import { JsonLd } from "@/components/global/JsonLd";
import { RelatedBlocks } from "@/components/components/related-components";
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

  const canonical = absoluteUrl(itemHref("blocks", slug[0]));

  return createBaseMetadata({
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
    canonical,
    image: absoluteUrl(`/api/og?type=blocks&slug=${slug[0]}`),
  });
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
    publisher,
  };

  const breadcrumbData = createBreadcrumbSchema([
    { name: "Nyx UI", url: absoluteUrl("/") },
    { name: "Blocks", url: absoluteUrl(siteLinks.blocks) },
    { name: block.title, url: absoluteUrl(itemHref("blocks", slug[0])) },
  ]);

  const headings = extractHeadings(doc.body.raw);
  const isMockup = block.title.startsWith("Mockup:");

  return (
    <div
      className="w-full
     mx-auto max-w-[120ch]"
    >
      <JsonLd data={schemaData} />
      <JsonLd data={breadcrumbData} />

      {/* Mockups already show their title in the preview wrapper header —
          skip the page header for them. */}
      {isMockup ? null : (
        <>
          <DocBreadcrumbs
            items={[
              { label: "Blocks", href: siteLinks.blocks },
              { label: block.title },
            ]}
          />
          <DocPageHeader title={block.title} description={block.description} />
        </>
      )}

      <div className={isMockup ? "w-full pb-20" : "mt-6"}>
        <DocPageLayout
          code={doc.body.code}
          type="blocks"
          headings={headings}
          footer={<RelatedBlocks slug={slug[0]} />}
        />
      </div>
    </div>
  );
}
