import { Mdx } from "@/components/components/mdx-components";
import { badgeVariants } from "@/components/ui/badge";
import { DocPageHeader } from "@/components/components/doc-page-header";
import { absoluteUrl, cn } from "@/lib/utils";
import {
  createTemplateSchema,
  generateDocKeywords,
  generateDocStaticParams,
  getDocFromParams,
  type SlugPageProps,
} from "@/lib/docs";
import { externalLinks, itemHref, siteLinks } from "@/lib/links";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  return {
    title: enhancedTitle,
    description: enhancedDescription,
    keywords: templateKeywords,
    authors: [{ name: "Mihir Jaiswal", url: externalLinks.twitter }],
    creator: "Nyx UI",
    publisher: "Nyx UI",

    openGraph: {
      title: `${template.title} - React Template | Nyx UI`,
      description: enhancedDescription,
      type: "article",
      url: absoluteUrl(itemHref("templates", templateName)),
      siteName: "Nyx UI Templates",
      locale: "en_US",
      images: [
        {
          url: template.image || "/nyx.webp",
          width: 1200,
          height: 630,
          alt: `${template.title} React Template - Nyx UI`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${template.title} React Template | Nyx UI`,
      description: enhancedDescription,
      images: [template.image || "/nyx.webp"],
      creator: "@nuvyx_ui",
      site: "@nuvyx_ui",
    },

    alternates: {
      canonical: absoluteUrl(itemHref("templates", templateName)),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

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

        <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            Need help? Check out our documentation or reach out to support.
          </p>
          <Link
            href={siteLinks.templates}
            className={cn(badgeVariants({ variant: "outline" }), "gap-1")}
          >
            ← All Templates
          </Link>
        </div>
      </div>
    </>
  );
}
