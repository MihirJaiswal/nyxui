"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocHeading {
  depth: number;
  text: string;
  slug: string;
}

const BUG_REPORT_TEMPLATE = `**What is the bug?**
A clear and concise description of the bug — what broke, and where.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to the component '...'
2. Interact with '....'
3. Navigate to '....'
4. See the issue

**Expected behavior**
A clear and concise description of what you expected to happen instead.

**Screenshots**
If applicable, add screenshots or a screen recording to help explain the problem.

**Desktop**

- OS: [e.g. macOS 15, Windows 11]
- Browser: [e.g. Chrome, Safari, Firefox]
- Version: [e.g. 22]

**Mobile**

- Device: [e.g. iPhone 15 Pro, Pixel 8]
- OS: [e.g. iOS 18, Android 15]
- Browser: [e.g. Safari, Chrome]
- Version: [e.g. 22]

**Additional context**
Add any other context about the problem — console errors, component name, URL of the docs page, etc.`;

const COMPONENT_REQUEST_TEMPLATE = `**Component name**
What should the component be called?

**Description**
A clear description of the component you'd like to see in nyxui.

**Use case**
Where would you use it? (e.g. landing page hero, dashboard, settings panel)

**Reference / inspiration**
Links to examples, designs, or sites that inspired this request.

**Additional context**
Add any other context, screenshots, or details here.`;

function issueUrl(title: string, body: string) {
  return `https://github.com/MihirJaiswal/nyxui/issues/new?title=${encodeURIComponent(
    title,
  )}&body=${encodeURIComponent(body)}`;
}

export function TocLinks() {
  return (
    <div className="mt-6 space-y-1.5">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Feedback
      </p>
      <a
        href={issueUrl("[Bug] ", BUG_REPORT_TEMPLATE)}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-[13px] leading-5 text-muted-foreground transition-colors hover:text-foreground"
      >
        Report an Issue
      </a>
      <a
        href={issueUrl("[Component Request] ", COMPONENT_REQUEST_TEMPLATE)}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-[13px] leading-5 text-muted-foreground transition-colors hover:text-foreground"
      >
        Request a Component
      </a>
    </div>
  );
}

/**
 * Highlights the TOC link for the section currently in view.
 * Reads [data-toc-item] + data-toc-slug off the DOM so the TOC
 * markup itself can stay server-rendered.
 */
export function TocHighlighter() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("[data-toc-item][data-toc-slug]"),
    );
    const slugs = items
      .map((el) => el.dataset.tocSlug)
      .filter(Boolean) as string[];
    if (slugs.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    for (const slug of slugs) {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <style>{`
      [data-toc-item][data-toc-slug="${activeId}"] a {
        color: var(--foreground) !important;
        font-weight: 500;
      }
    `}</style>
  );
}

/**
 * Server-friendly TOC markup. No measurement, no client JS except
 * the tiny <TocHighlighter /> included at the bottom.
 */
export function DocToc({ headings }: { headings: TocHeading[] }) {
  if (headings.length === 0) return null;
  return (
    <>
      <nav>
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          On this page
        </p>
        <ul className="space-y-1.5">
          {headings.map((h) => (
            <li key={h.slug} data-toc-item data-toc-slug={h.slug}>
              <a
                href={`#${h.slug}`}
                className={cn(
                  "block text-[13px] leading-5 text-muted-foreground transition-colors hover:text-foreground",
                  h.depth === 3 && "pl-3",
                )}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <TocLinks />
      <TocHighlighter />
    </>
  );
}
