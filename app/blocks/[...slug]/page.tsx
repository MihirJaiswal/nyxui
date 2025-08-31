import { notFound } from "next/navigation";
import { componentsData } from "../../../registry/Data";
import { absoluteUrl } from "../../../lib/utils";
import type { Metadata } from "next";
import { Mdx } from "../../../components/components/mdx-components";
import { badgeVariants } from "../../../components/ui/badge";
import { cn } from "../../../lib/utils";
import Link from "next/link";
import { allDocs } from "content-collections";
import { Scan } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlockPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getBlockFromParams(params: Promise<{ slug: string[] }>) {
  const { slug } = await params;
  const block = slug?.[0];
  
  if (!block) {
    return null;
  }
  
  const possibleSlugs = [
    `blocks/${block}`,
    block,
  ];
  
  for (const slugPattern of possibleSlugs) {
    const doc = allDocs?.find((doc) => doc.slugAsParams === slugPattern);
    if (doc) {
      console.log("Found block doc with slug:", slugPattern);
      return doc;
    }
  }
  return null;
}

export async function generateStaticParams() {
  return Object.keys(componentsData.blocks).map((slug) => ({
    slug: [slug],
  }));
}

export async function generateMetadata({
  params,
}: BlockPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getBlockFromParams(Promise.resolve({ slug }));
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
      url: absoluteUrl(`/blocks/${slug[0]}`),
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
      canonical: absoluteUrl(`/blocks/${slug[0]}`),
    },
  };
}

export default async function BlockPage({ params }: BlockPageProps) {
  const { slug } = await params;
  const block = componentsData.blocks[slug[0]];
  const doc = await getBlockFromParams(Promise.resolve({ slug }));

  if (!block || !doc) {
    notFound();
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: block.title,
    description: block.description,
    url: absoluteUrl(`/blocks/${slug[0]}`),
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
      url: "https://nyxui.com/",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="space-y-4 mt-5">
          <div className="flex flex-wrap items-start gap-3 sm:items-center justify-between">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight sm:text-4xl break-words">
              {block.title}
            </h1>
            
            {/* Full Screen Button */}
            <Button className="rounded-md" variant="outline">
              <Link 
              href={`/preview/${slug[0]}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2"
            >
              <Scan className="w-4 h-4" />Full Screen
            </Link>
            </Button>
          </div>

          {block.description && (
            <div>
              <p className="text-muted-foreground dark:text-[#A1A1AA] text-lg">
                <span className="md:inline-block align-top no-underline md:[text-wrap:balance]">
                  {block.description}
                </span>
              </p>
            </div>
          )}

          {block.tags && block.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {block.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/category/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  className={cn(
                    badgeVariants({ variant: "outline" }),
                    "bg-gray-100 dark:bg-zinc-900 transition-colors hover:bg-gray-200 dark:hover:bg-zinc-800",
                  )}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 space-y-8">
          <div className="mdx-content">
            <Mdx code={doc.body.code} type="blocks" />
          </div>
        </div>
      </div>
    </>
  );
}
