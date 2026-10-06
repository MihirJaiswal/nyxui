"use client";

import { motion, useReducedMotion } from "motion/react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  blockCategoryHref,
  categoryHref,
  externalLinks,
  itemHref,
  siteLinks,
} from "@/lib/links";
import { INNER, containerVariantFor } from "@/lib/layout";
import { cn, getCurrentYear } from "@/lib/utils";
import { XTwitterIcon } from "./icons/XTwitterIcon";

type FooterLink = { label: string; href: string; external?: boolean };

const LINK_GROUPS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Components",
    links: [
      {
        label: "Cyberpunk Card",
        href: itemHref("components", "cyberpunk-card"),
      },
      { label: "Morphing Blob", href: itemHref("components", "morphing-blob") },
      { label: "Terminal", href: itemHref("components", "terminal") },
      {
        label: "Aurora Background",
        href: itemHref("components", "bubble-background"),
      },
      { label: "Marquee", href: itemHref("components", "marquee") },
      { label: "Shining Card", href: itemHref("components", "shining-card") },
      { label: "Glow Card", href: itemHref("components", "glow-card") },
      { label: "Logo Cycle", href: itemHref("components", "logo-cycle") },
      { label: "Lamp Heading", href: itemHref("components", "lamp-heading") },
      { label: "Animated Text", href: itemHref("components", "animated-text") },
      { label: "Image Scanner", href: itemHref("components", "image-scanner") },
      { label: "View all", href: siteLinks.components },
    ],
  },
  {
    title: "Blocks",
    links: [
      { label: "Hero Sections", href: blockCategoryHref("Hero") },
      { label: "Navigation", href: blockCategoryHref("Navigation") },
      { label: "Feature Sections", href: blockCategoryHref("Feature") },
      { label: "Bento Grids", href: blockCategoryHref("Bento") },
      { label: "Interactions", href: blockCategoryHref("Interactions") },
      { label: "Logo Clouds", href: blockCategoryHref("Logo Cloud") },
      { label: "Mockups", href: blockCategoryHref("Mockups") },
      { label: "Pricing", href: blockCategoryHref("Pricing") },
      { label: "Footers", href: blockCategoryHref("Footer") },
      { label: "View all", href: siteLinks.blocks },
    ],
  },
  {
    title: "Library",
    links: [
      { label: "Components", href: siteLinks.components },
      { label: "Blocks", href: siteLinks.blocks },
      { label: "Templates", href: siteLinks.templates },
      { label: "Playground", href: siteLinks.playground },
      { label: "Categories", href: siteLinks.category },
      { label: "Documentation", href: siteLinks.docs },
      { label: "Pro", href: "/pro" },
      { label: "Design Engineering", href: "/design-engineering" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Cards", href: categoryHref("Cards") },
      { label: "Animation", href: categoryHref("Animation") },
      { label: "Typography", href: categoryHref("Typography") },
      { label: "Interactive", href: categoryHref("Interactive") },
      { label: "Effects", href: categoryHref("Effects") },
      { label: "Loaders", href: categoryHref("Loaders") },
      { label: "Logos", href: categoryHref("Logos") },
      { label: "Backgrounds", href: categoryHref("Background") },
      { label: "Media", href: categoryHref("Media") },
    ],
  },
];

const SOCIALS = [
  { label: "X / Twitter", href: externalLinks.twitter, icon: XTwitterIcon },
  { label: "LinkedIn", href: externalLinks.linkedin, icon: LinkedInLogoIcon },
  { label: "GitHub", href: externalLinks.githubRepo, icon: GitHubLogoIcon },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 26 } as const,
  },
};

function FooterLinkItem({ label, href, external }: FooterLink) {
  const className =
    "group/l relative w-fit text-sm text-muted-foreground/70 transition-colors hover:text-foreground";
  const content = (
    <span className="relative">
      {label}
      <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover/l:scale-x-100" />
    </span>
  );
  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

function LinkGroup({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <motion.nav
      className="flex flex-col gap-4"
      aria-label={`${title} links`}
      variants={itemVariants}
    >
      <h2 className="text-[11px] font-medium tracking-[0.14em] uppercase text-muted-foreground">
        {title}
      </h2>
      <div className="flex flex-col items-start gap-2.5">
        {links.map((link) => (
          <FooterLinkItem key={link.label} {...link} />
        ))}
      </div>
    </motion.nav>
  );
}

export default function FooterSection() {
  const prefersReducedMotion = useReducedMotion();
  const initial = prefersReducedMotion ? undefined : ("hidden" as const);
  const animate = prefersReducedMotion ? undefined : ("visible" as const);
  const isNarrow = containerVariantFor(usePathname()) === "narrow";
  const container = INNER[containerVariantFor(usePathname())];
  const groups = isNarrow
    ? LINK_GROUPS.filter((group) => group.title !== "Categories")
    : LINK_GROUPS;

  return (
    <footer
      className="relative w-full border-t border-border/60 bg-background"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className={cn(container, "flex flex-col")}>
        <motion.div
          className={cn(
            "gap-x-12 gap-y-12 py-14 sm:gap-y-14",
            isNarrow
              ? "grid grid-cols-2 sm:grid-cols-3 lg:flex lg:items-start gap-x-20 lg:justify-between"
              : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))]",
          )}
          initial={initial}
          animate={animate}
          variants={containerVariants}
        >
          {/* Brand column */}
          <motion.div
            className={cn(
              "flex max-w-sm flex-col gap-5",
              isNarrow
                ? "col-span-full lg:col-span-1 lg:shrink-0"
                : "col-span-full lg:col-span-1",
            )}
            variants={itemVariants}
          >
            <Link
              href={siteLinks.home}
              aria-label="nyxui — home"
              className="w-fit"
            >
              <p className="text-2xl leading-none font-semibold tracking-tight">
                NYX{" "}
                <span className="font-caveat text-brand font-black">UI</span>
              </p>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-84">
              Modern components, blocks and templates for developers. Copy,
              paste, ship.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Designed &amp; built by{" "}
              <a
                href={externalLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-brand"
              >
                Mihir Jaiswal
              </a>
            </p>
            <div
              className="flex items-center gap-2"
              aria-label="Social media links"
            >
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                >
                  <Icon className="size-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link groups: on narrow routes, clustered right of the brand; on wide routes, plain grid children */}
          {isNarrow ? (
            <div className="contents lg:flex lg:gap-14 xl:gap-20">
              {groups.map(({ title, links }) => (
                <LinkGroup key={title} title={title} links={links} />
              ))}
            </div>
          ) : (
            groups.map(({ title, links }) => (
              <LinkGroup key={title} title={title} links={links} />
            ))
          )}
        </motion.div>
      </div>

      <div className="h-px w-full shrink-0 bg-border/60" aria-hidden="true" />

      <div className={cn(container, "flex flex-col")}>
        <div className="flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <span className="font-mono text-xs text-muted-foreground">
            © {getCurrentYear()} nyxui — Mihir Jaiswal. All rights reserved.
          </span>
          <span className="font-mono text-10 tracking-widest uppercase text-foreground/40">
            Copy · Paste · Ship
          </span>
        </div>
      </div>
    </footer>
  );
}
