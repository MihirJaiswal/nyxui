import { Mdx } from "@/components/components/mdx-components";
import { DocPageHeader } from "@/components/components/doc-page-header";
import { absoluteUrl } from "@/lib/utils";
import {
  createComponentSchema,
  generateDocKeywords,
  generateDocStaticParams,
  getDocFromParams,
  type SlugPageProps,
} from "@/lib/docs";
import { externalLinks, itemHref, playgroundComponentHref } from "@/lib/links";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params, "components");

  if (!doc) {
    return {
      title: "Component Not Found | Nyx UI",
      description: "The requested component could not be found.",
    };
  }

  const { slug } = await params;
  const componentName = slug?.[0];
  const componentKeywords = generateDocKeywords({
    title: doc.title,
    description: doc.description || "",
    noun: "component",
    extraKeywords: [
      "ui library",
      `${doc.title.toLowerCase()} ui library`,
      `${doc.title.toLowerCase()} component library`,
    ],
  });
  const enhancedTitle = `${doc.title} Component - React & Next.js | Nyx UI Library`;
  const enhancedDescription = `${doc.description || `${doc.title} component for React and Next.js applications.`} Built with Tailwind CSS, TypeScript, and Framer Motion. Part of Nyx UI component library. Free to use, customizable, and accessible.`;

  return {
    title: enhancedTitle,
    description: enhancedDescription,
    keywords: componentKeywords,
    authors: [{ name: "Mihir Jaiswal", url: externalLinks.twitter }],
    creator: "Nyx UI",
    publisher: "Nyx UI",

    openGraph: {
      title: `${doc.title} - React Component | Nyx UI`,
      description: enhancedDescription,
      type: "article",
      url: absoluteUrl(itemHref("components", componentName)),
      siteName: "Nyx UI",
      locale: "en_US",
      images: [
        {
          url: doc.image || "/nyx.webp",
          width: 1200,
          height: 630,
          alt: `${doc.title} React Component - Nyx UI`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${doc.title} React Component | Nyx UI`,
      description: enhancedDescription,
      images: [doc.image || "/nyx.webp"],
      creator: "@mihir_jaiswal_",
      site: "@mihir_jaiswal_",
    },

    alternates: {
      canonical: absoluteUrl(itemHref("components", componentName)),
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    category: "Web Development",
    other: {
      "article:section": "UI Components",
      "article:tag": doc.tags?.join(", ") || "React, UI Components, Next.js",
    },
  };
}

export async function generateStaticParams(): Promise<
  Awaited<SlugPageProps["params"]>[]
> {
  return generateDocStaticParams("components");
}

export default async function ComponentPage({ params }: SlugPageProps) {
  const doc = await getDocFromParams(params, "components");
  const { slug } = await params;
  const componentName = slug?.[0];

  if (!doc || !doc.published) {
    notFound();
  }

  // Components that should NOT show the playground button
  const excludedComponents = [
    "marquee",
    "ms-paint",
    "scroll-animation-trigger",
    "image-comparison",
    "reveal-card",
  ];
  const shouldShowPlaygroundButton =
    componentName && !excludedComponents.includes(componentName.toLowerCase());

  const schemaData = createComponentSchema(doc, componentName);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Additional meta tags in head */}
      <meta name="component-name" content={doc.title} />
      <meta name="ui-library" content="Nyx UI" />
      <meta name="framework" content="React, Next.js" />
      <meta name="styling" content="Tailwind CSS" />

      <div className="mx-auto w-full max-w-[1200px]">
        <DocPageHeader
          title={doc.title}
          description={doc.description}
          tags={doc.tags}
          links={doc.links}
          action={
            shouldShowPlaygroundButton ? (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-8 gap-2 rounded-lg border-border/70 bg-background px-3 text-xs text-muted-foreground shadow-none hover:bg-muted hover:text-foreground dark:border-white/10 dark:bg-[#111111] dark:hover:bg-[#1A1A1A]"
              >
                <Link href={playgroundComponentHref(componentName)}>
                  <Play className="size-3.5" />
                  Open in Playground
                </Link>
              </Button>
            ) : null
          }
        />

        <div className="space-y-8">
          <div className="mdx-content">
            <Mdx code={doc.body.code} />
          </div>
        </div>
      </div>
    </>
  );
}
