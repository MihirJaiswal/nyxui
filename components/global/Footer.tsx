import { Github } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { externalLinks, itemHref, siteLinks } from "@/lib/links";
import { getCurrentYear } from "@/lib/utils";
import { SocialLinkButton } from "./SocialLinkButton";
import { XTwitterIcon } from "./icons/XTwitterIcon";
import { GradientDivider } from "./GradientDivider";

const links = [
  {
    group: "Pages",
    items: [
      { title: "Home", href: siteLinks.home },
      { title: "All Components", href: siteLinks.components },
      { title: "Documentation", href: siteLinks.docs },
      { title: "Categories", href: siteLinks.category },
      { title: "Templates", href: siteLinks.templates },
      { title: "Playground", href: siteLinks.playground },
    ],
  },
  {
    group: "Templates",
    items: [
      {
        title: "Single Page Portfolio",
        href: itemHref("templates", "singlepage-portfolio"),
      },
      {
        title: "Minimalist Portfolio",
        href: itemHref("templates", "minimalist-portfolio"),
      },
    ],
  },
  {
    group: "Components",
    items: [
      {
        title: "3D layered Card",
        href: itemHref("components", "3d-layered-card"),
      },
      {
        title: "Animated Code Block",
        href: itemHref("components", "animated-code-block"),
      },
      {
        title: "Apple Glass Effect",
        href: itemHref("components", "apple-glass-effect"),
      },
      { title: "More", href: siteLinks.components },
    ],
  },
  {
    group: "Blocks",
    items: [{ title: "Footer", href: itemHref("blocks", "footer") }],
  },
];

export default function FooterSection() {
  return (
    <footer className="relative z-10 border-t border-border/50 bg-background">
      <GradientDivider position="top" />
      <div className="px-4 py-10 md:px-6 xl:container xl:px-20 mx-auto">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link
              href={siteLinks.home}
              aria-label="go home"
              className="inline-flex items-center gap-2"
            >
              <div className="flex h-9 w-9 items-center justify-center">
                <Logo className="h-7 w-auto transition-colors duration-200" />
              </div>
              <span className="sr-only">Nyx UI</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3">
            {links.map((link) => (
              <div key={link.group} className="space-y-3 text-sm">
                <span className="block font-medium text-foreground">
                  {link.group}
                </span>
                {link.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 md:flex-row">
          <span className="order-2 text-center text-sm text-muted-foreground md:order-1">
            © {getCurrentYear()} Nyx UI. All rights reserved.
          </span>
          <div className="order-1 flex items-center gap-1 md:order-2">
            <SocialLinkButton href={externalLinks.twitter} label="X/Twitter">
              <XTwitterIcon className="size-4" />
            </SocialLinkButton>
            <SocialLinkButton href={externalLinks.linkedin} label="LinkedIn">
              <svg
                className="size-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
              </svg>
            </SocialLinkButton>
            <SocialLinkButton href={externalLinks.githubRepo} label="GitHub">
              <Github className="size-4" />
            </SocialLinkButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
