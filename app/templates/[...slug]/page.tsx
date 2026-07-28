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
import { createTemplateSchema } from "@/lib/docs-schema";
import { externalLinks, itemHref } from "@/lib/links";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/global/JsonLd";

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const template = await getDocFromParams(params, "templates");

  if (!template) {
    return {
      title: "Template Not Found | Nyx UI Templates",
      description: "The requested template could not be found.",
    };
  }

  const { slug } = await params;
  const templateName = slug?.[0];
  const templateKeywords = generateDocKeywords({
    title: template.title,
    description: template.description || "",
    noun: "template",
    extraKeywords: [
      "web template",
      `${template.title.toLowerCase()} website template`,
      `${template.title.toLowerCase()} landing page`,
      `${template.title.toLowerCase()} dashboard template`,
      "ui template library",
      "react template library",
      "nextjs template library",
    ],
  });
  const enhancedTitle = `${template.title} Template - React & Next.js | Nyx UI Templates`;
  const enhancedDescription = `${template.description || `${template.title} template for React and Next.js applications.`} Built with Tailwind CSS, TypeScript, and Framer Motion. Professional template from Nyx UI library. Free to use, customizable, and production-ready.`;
  const canonical = absoluteUrl(itemHref("templates", templateName));

  return {
    ...createBaseMetadata({
      title: enhancedTitle,
      description: enhancedDescription,
      keywords: templateKeywords,
      canonical,
      image: template.image || "/nyx.webp",
      twitterCreator: "@nuvyx_ui",
      type: "article",
    }),
    authors: [{ name: "Mihir Jaiswal", url: externalLinks.twitter }],
    creator: "Nyx UI",
    publisher: "Nyx UI",
    openGraph: {
      title: `${template.title} - React Template | Nyx UI`,
      siteName: "Nyx UI Templates",
      locale: "en_US",
    },
    category: "Web Development",
    other: {
      "article:section": "UI Templates",
      "article:tag":
        template.tags?.join(", ") || "React, UI Templates, Next.js",
    },
  };
}

export async function generateStaticParams(): Promise<
  Awaited<SlugPageProps["params"]>[]
> {
  return generateDocStaticParams("templates");
}

export default async function TemplatePage({ params }: SlugPageProps) {
  const template = await getDocFromParams(params, "templates");
  const { slug } = await params;
  const templateName = slug?.[0];

  if (!template || !template.published) {
    notFound();
  }

  const schemaData = createTemplateSchema(template, templateName);

  return (
    <>
      <JsonLd data={schemaData} />

      {/* Additional meta tags in head */}
      <meta name="template-name" content={template.title} />
      <meta name="template-library" content="Nyx UI" />
      <meta name="framework" content="React, Next.js" />
      <meta name="styling" content="Tailwind CSS" />
      <meta name="template-type" content="Website Template" />

      <div className="w-full">
        <DocPageHeader
          title={template.title}
          description={template.description}
          tags={template.tags}
          tagBasePath="/templates/category"
          links={template.links}
          linkLabels={{ doc: "Live Demo", api: "Source Code" }}
          primaryDocLink
        />

        <div className="pt-6">
          <div className="mdx-content">
            <Mdx code={template.body.code} />
          </div>
        </div>
      </div>
    </>
  );
}
