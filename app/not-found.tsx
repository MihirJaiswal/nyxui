import type { Metadata } from "next";
import Link from "next/link";
import { siteLinks } from "@/lib/links";

/**
 * Branded 404. Catches any unmatched route (components with wrong slugs,
 * stale deep links shared on Twitter, Google-indexed URLs that were later
 * removed). The default Next.js 404 is a dead end — this one keeps the
 * user inside the site and the crawler's bounce signal clean by pointing
 * at the real landing surfaces.
 *
 * `robots: noindex` because 404 responses shouldn't be indexed on their
 * own; Next's App Router returns a 404 status from this route so Google
 * won't crawl further anyway.
 */

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const DESTINATIONS = [
  {
    href: siteLinks.components,
    label: "Browse components",
    hint: "35+ animated React components",
  },
  {
    href: siteLinks.blocks,
    label: "Browse blocks",
    hint: "Hero sections, bentos, navigation",
  },
  {
    href: siteLinks.playground,
    label: "Open the playground",
    hint: "Try components live with props",
  },
  {
    href: siteLinks.docs,
    label: "Read the docs",
    hint: "Install, customize, and ship",
  },
];

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-pretty text-base text-muted-foreground">
        The link you followed is broken or the page has moved. Try one of these
        instead.
      </p>

      <ul className="mt-10 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {DESTINATIONS.map((d) => (
          <li key={d.href}>
            <Link
              href={d.href}
              className="group block rounded-lg border border-border/60 bg-card/40 px-5 py-4 text-left transition hover:border-border hover:bg-card/70"
            >
              <div className="text-sm font-medium text-foreground">
                {d.label}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{d.hint}</div>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href={siteLinks.home}
        className="mt-10 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Back to home
      </Link>
    </div>
  );
}
