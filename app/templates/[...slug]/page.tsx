import { Mdx } from "../../../components/components/mdx-components";
import { badgeVariants } from "../../../components/ui/badge";
import { absoluteUrl, cn } from "../../../lib/utils";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { allDocs } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TemplatePageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getTemplateFromParams(params: Promise<{ slug: string[] }>) {
  const { slug } = await params;
  const template = slug?.[0];

  if (!template) {
    return null;
  }

  const possibleSlugs = [
    `templates/${template}`,
    template,
  ];

  for (const slugPattern of possibleSlugs) {
    const doc = allDocs?.find((doc) => doc.slugAsParams === slugPattern);
    if (doc) {
      console.log("Found template with slug:", slugPattern);
      return doc;
    }
  }

  console.log("No template found for:", template);
  return null;
}

// Function to generate template-specific keywords
function generateTemplateKeywords(title: string, description: string): string[] {
  const templateName = title.toLowerCase();
  const baseKeywords = [
    `${templateName} nyx ui template`,
    `nyx ui ${templateName} template`,
    `${templateName} nyxui template`,
    `nyxui ${templateName}`,
    `${templateName} react template`,
    `react ${templateName} template`,
    `next.js ${templateName} template`,
    `${templateName} nextjs template`,
    `tailwind ${templateName} template`,
    `${templateName} ui template`,
    `${templateName} typescript template`,
    `${templateName} framer motion template`,
    `web template`,
    `${templateName} website template`,
    `${templateName} landing page`,
    `${templateName} dashboard template`,
    `ui template library`,
    `react template library`,
    `nextjs template library`
  ];

  if (description) {
    const descWords = description.toLowerCase().match(/\b\w{4,}\b/g) || [];
    descWords.forEach(word => {
      if (!word.includes('template') && !word.includes('react')) {
        baseKeywords.push(`${word} ${templateName} template`);
      }
    });
  }

  return baseKeywords;
}

export async function generateMetadata({
  params,
}: TemplatePageProps): Promise<Metadata> {
  const template = await getTemplateFromParams(params);

  if (!template) {
    return {
      title: "Template Not Found | Nyx UI Templates",
      description: "The requested template could not be found."
    };
  }

  const { slug } = await params;
  const templateName = slug?.[0];
  const templateKeywords = generateTemplateKeywords(template.title, template.description || "");
  const enhancedTitle = `${template.title} Template - React & Next.js | Nyx UI Templates`;
  const enhancedDescription = `${template.description || `${template.title} template for React and Next.js applications.`} Built with Tailwind CSS, TypeScript, and Framer Motion. Professional template from Nyx UI library. Free to use, customizable, and production-ready.`;

  return {
    title: enhancedTitle,
    description: enhancedDescription,
    keywords: templateKeywords,
    authors: [{ name: "Mihir Jaiswal", url: "https://x.com/mihir_jaiswal_" }],
    creator: "Nyx UI",
    publisher: "Nyx UI",
    
    openGraph: {
      title: `${template.title} - React Template | Nyx UI`,
      description: enhancedDescription,
      type: "article",
      url: absoluteUrl(`/templates/${templateName}`),
      siteName: "Nyx UI Templates",
      locale: "en_US",
      images: [
        {
          url: template.image || "/nyx.png",
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
      images: [template.image || "/nyx.png"],
      creator: "@nuvyx_ui",
      site: "@nuvyx_ui"
    },
    
    alternates: {
      canonical: absoluteUrl(`/templates/${templateName}`),
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    category: "Web Development",
    other: {
      "article:section": "UI Templates",
      "article:tag": template.tags?.join(", ") || "React, UI Templates, Next.js",
    }
  };
}

export async function generateStaticParams(): Promise<
  Awaited<TemplatePageProps["params"]>[]
> {
  try {
    if (!allDocs) {
      return [];
    }
    
    if (!Array.isArray(allDocs)) {
      return [];
    }

    if (allDocs.length === 0) {
      return [];
    }

    const templateParams = allDocs
      .filter((doc) => {
        const isTemplate = doc.slugAsParams.startsWith("templates/") && doc.published;
        console.log(`Template: ${doc.slugAsParams}, isTemplate: ${isTemplate}, published: ${doc.published}`);
        return isTemplate;
      })
      .map((doc) => {
        const template = doc.slugAsParams.replace("templates/", "");
        console.log(`Generating param for template: ${template}`);
        return { slug: [template] };
      });

    console.log("Generated static params for templates:", templateParams);
    return templateParams;
  } catch (error) {
    console.error("Error in generateStaticParams for templates:", error);
    return [];
  }
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const template = await getTemplateFromParams(params);
  const { slug } = await params;
  const templateName = slug?.[0];

  if (!template || !template.published) {
    console.log("Template not found or not published:", templateName);
    notFound();
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareSourceCode", "CreativeWork"],
    headline: `${template.title} React Template - Nyx UI Documentation`,
    name: `${template.title} Template`,
    description: template.description || `${template.title} template for React and Next.js applications built with Tailwind CSS and TypeScript.`,
    author: {
      "@type": "Person",
      name: "Mihir Jaiswal",
      url: "https://x.com/mihir_jaiswal_"
    },
    publisher: {
      "@type": "Organization",
      name: "Nyx UI",
      url: "https://nyxui.vercel.app/",
      logo: {
        "@type": "ImageObject",
        url: "https://nyxui.vercel.app/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/templates/${templateName}`),
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
      ...(template.tags || [])
    ].join(", "),
    
    about: {
      "@type": "Thing",
      name: `${template.title} Template`,
      description: `A ${template.title.toLowerCase()} template built for React and Next.js applications using Tailwind CSS and TypeScript.`
    },
    
    isPartOf: {
      "@type": "SoftwareApplication",
      name: "Nyx UI Templates",
      url: "https://nyxui.vercel.app/templates",
      description: "Premium React template collection for Next.js applications"
    },
    
    screenshot: template.image || "/nyx.png",
    
    applicationSubCategory: "Web Template",
    
    featureList: [
      "React & Next.js Compatible",
      "Tailwind CSS Styling",
      "TypeScript Support",
      "Responsive Design",
      "Production Ready",
      "Customizable Components"
    ]
  };

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
      
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="space-y-4 mt-5">
          <div className="flex flex-wrap items-start gap-3 sm:items-center">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight sm:text-4xl break-words">
              {template.title}
            </h1>
          </div>

          {template.description && (
            <div>
              <p className="text-muted-foreground dark:text-[#A1A1AA] text-lg">
                <span className="md:inline-block align-top no-underline md:[text-wrap:balance]">
                  {template.description}
                </span>
              </p>
            </div>
          )}

          {template.tags && template.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {template.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/templates/category/${tag.toLowerCase().replace(/\s+/g, "-")}`}
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

          {template.links ? (
            <div className="flex items-center space-x-2 pt-2">
              {template.links?.doc && (
                <Link
                  href={template.links.doc}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    badgeVariants({ variant: "default" }),
                    "gap-1 bg-green-600 hover:bg-green-700",
                  )}
                >
                  Live Demo
                  <ExternalLinkIcon className="size-3" />
                </Link>
              )}
              {template.links?.api && (
                <Link
                  href={template.links.api}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    badgeVariants({ variant: "secondary" }),
                    "gap-1 hover:bg-gray-200 dark:hover:bg-zinc-700",
                  )}
                >
                  Source Code
                  <ExternalLinkIcon className="size-3" />
                </Link>
              )}
            </div>
          ) : null}
        </div>

        <div className="mt-6 space-y-8">
          <div className="mdx-content">
            <Mdx code={template.body.code} />
          </div>
        </div>

        {/* Template-specific footer with additional actions */}
        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Need help with this template? Check out our documentation or reach out to support.
            </div>
            <div className="flex gap-2">
              <Link
                href="/templates"
                className={cn(
                  badgeVariants({ variant: "outline" }),
                  "gap-1",
                )}
              >
                ← All Templates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}