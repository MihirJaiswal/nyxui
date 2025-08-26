import { Mdx } from "../../../components/components/mdx-components";
import { badgeVariants } from "../../../components/ui/badge";
import { absoluteUrl, cn } from "../../../lib/utils";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { allDocs } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Play } from "lucide-react";

interface ComponentPageProps {
  params: Promise<{
    slug: string[]; 
  }>;
}

async function getComponentFromParams(params: Promise<{ slug: string[] }>) {
  const { slug } = await params;
  const component = slug?.[0];
  
  if (!component) {
    return null;
  }
  
  const possibleSlugs = [
    `components/${component}`,
    component,
  ];
  
  for (const slugPattern of possibleSlugs) {
    const doc = allDocs?.find((doc) => doc.slugAsParams === slugPattern);
    if (doc) {
      console.log("Found doc with slug:", slugPattern);
      return doc;
    }
  }
  return null;
}

// Function to generate component-specific keywords
function generateComponentKeywords(title: string, description: string): string[] {
  const componentName = title.toLowerCase();
  const baseKeywords = [
    `${componentName} nyx ui`,
    `nyx ui ${componentName}`,
    `${componentName} nyxui`,
    `nyxui ${componentName}`,
    `${componentName} component`,
    `react ${componentName} component`,
    `next.js ${componentName} component`,
    `${componentName} react component`,
    `tailwind ${componentName} component`,
    `${componentName} ui component`,
    `${componentName} typescript component`,
    `${componentName} framer motion`,
    `ui library`,
    `${componentName} ui library`,
    `${componentName} component library`,
  ];

  if (description) {
    const descWords = description.toLowerCase().match(/\b\w{4,}\b/g) || [];
    descWords.forEach(word => {
      if (!word.includes('component') && !word.includes('react')) {
        baseKeywords.push(`${word} ${componentName} component`);
      }
    });
  }

  return baseKeywords;
}

export async function generateMetadata({
  params,
}: ComponentPageProps): Promise<Metadata> {
  const doc = await getComponentFromParams(params);

  if (!doc) {
    return {
      title: "Component Not Found | Nyx UI",
      description: "The requested component could not be found."
    };
  }

  const { slug } = await params;
  const componentName = slug?.[0];
  const componentKeywords = generateComponentKeywords(doc.title, doc.description || "");
  const enhancedTitle = `${doc.title} Component - React & Next.js | Nyx UI Library`;
  const enhancedDescription = `${doc.description || `${doc.title} component for React and Next.js applications.`} Built with Tailwind CSS, TypeScript, and Framer Motion. Part of Nyx UI component library. Free to use, customizable, and accessible.`;

  return {
    title: enhancedTitle,
    description: enhancedDescription,
    keywords: componentKeywords,
    authors: [{ name: "Mihir Jaiswal", url: "https://x.com/mihir_jaiswal_" }],
    creator: "Nyx UI",
    publisher: "Nyx UI",
    
    openGraph: {
      title: `${doc.title} - React Component | Nyx UI`,
      description: enhancedDescription,
      type: "article",
      url: absoluteUrl(`/components/${componentName}`),
      siteName: "Nyx UI",
      locale: "en_US",
      images: [
        {
          url: doc.image || "/nyx.png",
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
      images: [doc.image || "/nyx.png"],
      creator: "@mihir_jaiswal_",
      site: "@mihir_jaiswal_",
    },
    
    alternates: {
      canonical: absoluteUrl(`/components/${componentName}`),
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
      "article:section": "UI Components",
      "article:tag": doc.tags?.join(", ") || "React, UI Components, Next.js",
    }
  };
}

export async function generateStaticParams(): Promise<
  Awaited<ComponentPageProps["params"]>[]
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

    const componentParams = allDocs
      .filter((doc) => {
        const isComponent = doc.slugAsParams.startsWith("components/") && doc.published;
        console.log(`Doc: ${doc.slugAsParams}, isComponent: ${isComponent}, published: ${doc.published}`);
        return isComponent;
      })
      .map((doc) => {
        const component = doc.slugAsParams.replace("components/", "");
        console.log(`Generating param for component: ${component}`);
        return { slug: [component] }; 
      });

    console.log("Generated static params:", componentParams);
    return componentParams;
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const doc = await getComponentFromParams(params);
  const { slug } = await params;
  const componentName = slug?.[0];

  if (!doc || !doc.published) {
    console.log("Component not found or not published:", componentName);
    notFound();
  }

  // Components that should NOT show the playground button
  const excludedComponents = ['marquee', 'ms-paint', 'scroll-animation-trigger', 'image-comparison', 'reveal-card'];
  const shouldShowPlaygroundButton = componentName && !excludedComponents.includes(componentName.toLowerCase());

  const schemaData = {
    "@context": "https://schema.org",
    "@type": ["TechArticle", "SoftwareSourceCode"],
    headline: `${doc.title} React Component - Nyx UI Documentation`,
    description: doc.description || `${doc.title} component for React and Next.js applications built with Tailwind CSS and TypeScript.`,
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
      "@id": absoluteUrl(`/components/${componentName}`),
    },
    datePublished: doc.date || new Date().toISOString().split("T")[0],
    dateModified: new Date().toISOString(),
    programmingLanguage: ["TypeScript", "React", "Next.js"],
    runtimePlatform: "Web Browser",
    operatingSystem: "Cross-platform",
    applicationCategory: "DeveloperApplication",
    
    keywords: [
      doc.title.toLowerCase(),
      "react component",
      "next.js component",
      "nyx ui",
      "nyxui",
      "tailwind css",
      "typescript",
      ...(doc.tags || [])
    ].join(", "),
    
    about: {
      "@type": "Thing",
      name: `${doc.title} Component`,
      description: `A ${doc.title.toLowerCase()} component built for React and Next.js applications using Tailwind CSS and TypeScript.`
    },
    
    isPartOf: {
      "@type": "SoftwareApplication",
      name: "Nyx UI",
      url: "https://nyxui.vercel.app/",
      description: "Premium React UI component library for Next.js applications"
    }
  };

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
        <div className="space-y-4 mt-5">
          <div className="flex flex-wrap items-start gap-3 sm:items-center">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight sm:text-4xl break-words">
              {doc.title}
            </h1>
          </div>

          {doc.description && (
            <div>
              <p className="text-muted-foreground dark:text-[#A1A1AA] text-lg">
                <span className="md:inline-block align-top no-underline md:[text-wrap:balance]">
                  {doc.description}
                </span>
              </p>
            </div>
          )}

          {doc.tags && doc.tags.length > 0 && (
            <div className="flex flex-wrap justify-between gap-2 pt-2">
              <div className="flex flex-wrap gap-2">
              {doc.tags.map((tag: string) => (
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
              {/* Open in Playground Button - Only show for non-excluded components */}
              {shouldShowPlaygroundButton && (
                <Link href={`/playground?component=${componentName}`}>
                  <Button variant="default" size="sm" className="gap-2 w-full mt-4 sm:mt-0">
                    <Play className="w-4 h-4" />
                    Open in Playground
                  </Button>
                </Link>
              )}
            </div>
          )}

          <div className="flex items-center space-x-2 pt-2">
            {doc.links ? (
              <>
                {doc.links?.doc && (
                  <Link
                    href={doc.links.doc}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      badgeVariants({ variant: "secondary" }),
                      "gap-1 hover:bg-gray-200 dark:hover:bg-zinc-700",
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
                      "gap-1 hover:bg-gray-200 dark:hover:bg-zinc-700",
                    )}
                  >
                    API Reference
                    <ExternalLinkIcon className="size-3" />
                  </Link>
                )}
              </>
            ) : null}
          </div>
        </div>

        <div className="space-y-8">
          <div className="mdx-content">
            <Mdx code={doc.body.code} />
          </div>
        </div>
      </div>
    </>
  );
}