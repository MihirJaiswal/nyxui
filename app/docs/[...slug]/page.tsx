import { Mdx } from "../../../components/components/mdx-components";
import { badgeVariants } from "../../../components/ui/badge";
import { absoluteUrl, cn } from "../../../lib/utils";
import { ChevronRightIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { allDocs } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface DocPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function handleCategoryRedirects(slugPath: string) {
  if (slugPath === "components") {
    const firstComponentDoc = allDocs?.find(
      (doc) => doc.slugAsParams.startsWith("components/") && doc.published,
    );

    if (firstComponentDoc) {
      redirect(`/docs/${firstComponentDoc.slugAsParams}`);
    }
  }
}

async function getDocFromParams(params: Promise<{ slug: string[] }>) {
  const { slug } = await params;
  const slugPath = slug?.join("/") || "index";

  await handleCategoryRedirects(slugPath);

  const doc = allDocs?.find((doc) => doc.slugAsParams === slugPath);

  if (!doc) {
    return null;
  }
  return doc;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params);

  if (!doc) {
    return {};
  }

  return {
    title: `${doc.title} | Nuvyx UI`,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: doc.image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [doc.image],
      creator: "@mihirjaiswal",
    },
  };
}

export async function generateStaticParams(): Promise<
  Awaited<DocPageProps["params"]>[]
> {
  try {
    // Debug logging
    console.log("allDocs:", allDocs);
    console.log("typeof allDocs:", typeof allDocs);
    console.log("Array.isArray(allDocs):", Array.isArray(allDocs));
    
    // Check if allDocs is defined and is an array
    if (!allDocs) {
      console.warn("allDocs is undefined during static generation");
      return [];
    }
    
    if (!Array.isArray(allDocs)) {
      console.warn("allDocs is not an array during static generation, got:", typeof allDocs);
      return [];
    }

    if (allDocs.length === 0) {
      console.warn("allDocs is empty during static generation");
      return [];
    }

    return allDocs
      .filter((doc) => doc.published)
      .map((doc) => ({
        slug: doc.slugAsParams.split("/"),
      }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params);

  if (!doc || !doc.published) {
    notFound();
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${doc.title} | Nuvyx UI Documentation`,
    description: doc.description,
    author: {
      "@type": "Organization",
      name: "Nuvyx UI",
    },
    publisher: {
      "@type": "Organization",
      name: "Nuvyx UI",
      logo: {
        "@type": "ImageObject",
        url: "https://nuvyxui.vercel.app/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(doc.slug),
    },
    datePublished: doc.date || new Date().toISOString().split("T")[0],
    dateModified: new Date().toISOString(),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="mx-auto w-full max-w-[1200px] px-2 md:py-8 lg:px-8 xl:px-10">
        <div className="space-y-4 pb-6 md:pb-8">
          <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
            <div className="truncate">Docs</div>
            <ChevronRightIcon className="size-4" />
            <div className="font-medium text-foreground">{doc.title}</div>
          </div>

          <div className="flex flex-wrap items-start gap-3 sm:items-center">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight sm:text-4xl break-words">
              {doc.title}
            </h1>
          </div>

          {doc.description && (
            <div>
              <p className="text-muted-foreground dark:text-[#A1A1AA] text-lg">
                <span className="inline-block align-top no-underline [text-wrap:balance]">
                  {doc.description}
                </span>
              </p>
            </div>
          )}

          {doc.tags && doc.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {doc.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/docs/category/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  className={cn(
                    badgeVariants({ variant: "outline" }),
                    "bg-gray-100 dark:bg-zinc-900 transition-colors",
                  )}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {doc.links ? (
            <div className="flex items-center space-x-2 pt-2">
              {doc.links?.doc && (
                <Link
                  href={doc.links.doc}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    badgeVariants({ variant: "secondary" }),
                    "gap-1",
                  )}
                >
                  Docs
                  <ExternalLinkIcon className="size-3" />
                </Link>
              )}
              {doc.links?.api && (
                <Link
                  href={doc.links.api}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    badgeVariants({ variant: "secondary" }),
                    "gap-1",
                  )}
                >
                  API Reference
                  <ExternalLinkIcon className="size-3" />
                </Link>
              )}
            </div>
          ) : null}
        </div>

        <div className="mt-6 space-y-8">
          <div className="mdx-content">
            <Mdx code={doc.body.code} />
          </div>
        </div>
      </div>
    </>
  );
}