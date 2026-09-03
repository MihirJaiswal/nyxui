import { cn } from "@/lib/utils";
import {
  Facebook,
  Instagram,
  Linkedin,
  Plus,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

type FooterLink = { label: string; href: string };
type FooterGroup = { heading?: string; links: FooterLink[] };
type FooterColumn = { title: string; groups: FooterGroup[] };

const columns: FooterColumn[] = [
  {
    title: "Product",
    groups: [
      {
        heading: "Components",
        links: [
          { label: "All Components", href: "/docs" },
          { label: "Forms", href: "/docs/forms" },
          { label: "Data Display", href: "/docs/data-display" },
          { label: "Navigation", href: "/docs/navigation" },
          { label: "Feedback", href: "/docs/feedback" },
        ],
      },
      {
        heading: "Blocks",
        links: [
          { label: "Hero Sections", href: "/blocks/heroes" },
          { label: "Feature Sections", href: "/blocks/features" },
          { label: "Footers", href: "/blocks/footers" },
        ],
      },
    ],
  },
  {
    title: "Resources",
    groups: [
      {
        heading: "Learn",
        links: [
          { label: "Documentation", href: "/docs" },
          { label: "Theming Guide", href: "/docs/theming" },
          { label: "Dark Mode", href: "/docs/dark-mode" },
        ],
      },
      {
        heading: "Examples",
        links: [
          { label: "Dashboard", href: "/examples/dashboard" },
          { label: "Cards", href: "/examples/cards" },
          { label: "Playground", href: "/examples/playground" },
        ],
      },
    ],
  },
  {
    title: "About",
    groups: [
      {
        links: [
          { label: "Pricing", href: "/pricing" },
          { label: "Blog", href: "/blog" },
          { label: "Support", href: "/support" },
          { label: "Contact", href: "/contact" },
          { label: "Careers", href: "/careers" },
        ],
      },
    ],
  },
  {
    title: "Developers",
    groups: [
      {
        links: [
          { label: "CLI", href: "/docs/cli" },
          { label: "Registry API", href: "/docs/registry-api" },
          { label: "GitHub", href: "https://github.com" },
        ],
      },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://x.com", label: "X" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

export const Footer = () => {
  return (
    <footer
      className="relative flex w-full flex-col overflow-hidden bg-background px-3 pt-8 pb-4 text-foreground xl:px-10 xl:pt-25"
      role="contentinfo"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="relative z-20 flex flex-col justify-between xl:flex-row xl:gap-40">
        {/* Left column — socials + blurb */}
        <div className="flex flex-col">
          <div className="flex w-full justify-center lg:justify-normal gap-5">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
              >
                <social.icon className="size-5 sm:size-7 xl:size-5" />
              </Link>
            ))}
          </div>

          {/* Mobile accordions */}
          <div className="mt-8 flex flex-col xl:hidden">
            {columns.map((column) => (
              <details
                key={column.title}
                className="group border-b border-foreground/15"
              >
                <summary className="flex w-full cursor-pointer list-none items-center justify-between py-4 text-left [&::-webkit-details-marker]:hidden">
                  <span className="text-lg font-bold">{column.title}</span>
                  <Plus
                    className="size-4 shrink-0 transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <div className="pb-6">
                  <ColumnLinks column={column} />
                </div>
              </details>
            ))}
          </div>

          <p className="mt-6 hidden max-w-80 text-sm leading-relaxed text-muted-foreground xl:mt-10 xl:block">
            Nyx UI is built with accessibility and developer experience in mind,
            every component is themeable, composable, and ships with full
            TypeScript support.
          </p>
        </div>

        {/* Desktop link columns */}
        <div className="mb-24 hidden flex-1 flex-row justify-between gap-12 xl:flex">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="mb-3 text-lg font-bold">{column.title}</h3>
              <ColumnLinks column={column} />
            </nav>
          ))}
        </div>
      </div>

      {/* Big wordmark */}
      <div className="mb-8 mt-8 lg:mt-4 flex w-full">
        <p
          className="w-full bg-linear-to-b from-foreground/25 to-foreground/2 bg-clip-text text-center text-[18vw] leading-[0.8] font-black tracking-tighter text-transparent select-none xl:text-[13vw]"
          aria-hidden="true"
        >
          NYX UI
        </p>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
        <div className="hidden gap-6 xl:flex">
          {legalLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                linkClass,
                "text-muted-foreground/70 hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 flex-col justify-center w-full gap-6 sm:flex-row items-center sm:gap-0 xl:justify-end">
          <p className="text-sm text-muted-foreground/70">
            © {new Date().getFullYear()} Nyx UI. All rights reserved.
          </p>
          <div className="flex gap-6 sm:ml-6 xl:ml-0">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  linkClass,
                  "text-muted-foreground/70 hover:text-foreground xl:hidden",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

function ColumnLinks({ column }: { column: FooterColumn }) {
  return (
    <ul className="flex flex-col gap-6 pb-6 sm:pb-10 xl:gap-5 xl:pb-0">
      {column.groups.map((group, groupIndex) => (
        <li key={group.heading ?? groupIndex}>
          {group.heading && (
            <p className="mb-1 text-sm font-medium">{group.heading}</p>
          )}
          <ul className="flex flex-col gap-3 xl:gap-2">
            {group.links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
