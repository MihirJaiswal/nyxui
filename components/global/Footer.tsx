import { Github, Linkedin } from "lucide-react";
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
              <XTwitterIcon className="size-3" />
            </SocialLinkButton>
            <SocialLinkButton href={externalLinks.linkedin} label="LinkedIn">
              <Linkedin className="size-4" />
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
