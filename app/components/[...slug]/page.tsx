import { Mdx } from "@/components/components/mdx/mdx-components";
import { DocPageHeader } from "@/components/components/doc-page-header";
import { absoluteUrl } from "@/lib/utils";
import {
  createBaseMetadata,
  generateDocKeywords,
  generateDocStaticParams,
  getDocFromParams,
  type SlugPageProps,
} from "@/lib/docs";
import { createComponentSchema } from "@/lib/docs-schema";
import { externalLinks, itemHref, playgroundComponentHref } from "@/lib/links";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MorphLink } from "@/components/ui/morph-link";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/global/JsonLd";

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
  const canonical = absoluteUrl(itemHref("components", componentName));

  return {
    ...createBaseMetadata({
      title: enhancedTitle,
      description: enhancedDescription,
      keywords: componentKeywords,
      canonical,
      image: doc.image || "/nyx.webp",
      type: "article",
    }),
    authors: [{ name: "Mihir Jaiswal", url: externalLinks.twitter }],
    creator: "Nyx UI",
    publisher: "Nyx UI",
    openGraph: {
      title: `${doc.title} - React Component | Nyx UI`,
      locale: "en_US",
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
    "image-comparison",
    "reveal-card",
  ];
  const shouldShowPlaygroundButton =
    componentName && !excludedComponents.includes(componentName.toLowerCase());

  const schemaData = createComponentSchema(doc, componentName);

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Additional meta tags in head */}
      <meta name="component-name" content={doc.title} />
      <meta name="ui-library" content="Nyx UI" />
      <meta name="framework" content="React, Next.js" />
      <meta name="styling" content="Tailwind CSS" />

      <div className="w-full">
        <DocPageHeader
          title={doc.title}
          description={doc.description}
          tags={doc.tags}
          links={doc.links}
          action={
            shouldShowPlaygroundButton ? (
              <MorphLink href={playgroundComponentHref(componentName)}>
                <div className="flex items-center gap-1">
                  <span>Open in Playground</span>
                  <ArrowUpRight className="inline size-4" />
                </div>
              </MorphLink>
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
