"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search } from "lucide-react";
import { ModeToggle } from "@/components/global/ThemeToggle";
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/global/CommandPalette";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useMounted } from "@/hooks/use-mounted";
import { useEventListener } from "@/hooks/use-event-listener";
import { XTwitterIcon } from "@/components/global/icons/XTwitterIcon";
import { GradientDivider } from "@/components/global/GradientDivider";
import Logo from "@/components/global/Logo";
import { MobileNav } from "./MobileNav";
import { externalLinks, siteLinks } from "@/lib/links";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const activeLink = usePathname();
  const mounted = useMounted();

  useEventListener("scroll", () => {
    const isScrolled = window.scrollY > 20;
    setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
  });

  const navLinks = [
    { href: siteLinks.components, label: "Components" },
    { href: siteLinks.playground, label: "Playground" },
  ];

  const moreLinks = [
    { href: siteLinks.blocks, label: "Blocks" },
    { href: siteLinks.templates, label: "Templates" },
    { href: siteLinks.docs, label: "Documentation" },
  ];

  const isMoreActive = moreLinks.some((link) => activeLink === link.href);

  const openSearch = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true }),
    );
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 md:px-6 xl:container xl:px-20 mx-auto">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted md:h-9 md:w-9" />
            <div className="hidden h-5 w-20 animate-pulse rounded bg-muted md:block" />
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-border/50 bg-background/95 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-background/80 backdrop-blur-md",
      )}
    >
      <GradientDivider position="bottom" />
      <div className="flex h-16 items-center justify-between px-4 md:px-6 xl:container xl:px-20 mx-auto">
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="Home"
            className="group flex items-center transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center md:h-9 md:w-9">
              <Logo className="transition-colors duration-200" />
            </div>
            <span className="sr-only">Nyx UI</span>
          </Link>

          <nav className="ml-6 hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.label}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                  activeLink === link.href
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "group flex items-center gap-0.5 px-3 py-2 text-sm font-medium transition-colors hover:text-foreground outline-none",
                    isMoreActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  More
                  <ChevronDown className="size-3.5 transition-transform mt-0.5 ml-0.5 group-data-[state=open]:rotate-180" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      href={link.href}
                      aria-label={link.label}
                      className={cn(
                        activeLink === link.href
                          ? "font-medium text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="mx-2 flex flex-1 justify-center lg:hidden">
          <Button
            variant="outline"
            aria-label="Search"
            className="h-8 w-full max-w-xs justify-start gap-2 rounded-lg border-border/60 bg-muted/50 px-3 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:bg-muted hover:text-foreground"
            onClick={openSearch}
          >
            <Search className="h-4 w-4 shrink-0" />
            <span>Search...</span>
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-2 lg:flex">
            <CommandPalette />
            <div>
              <Link
                aria-label="GitHub"
                href={externalLinks.githubRepo}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  aria-label="GitHub"
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                >
                  <GitHubLogoIcon className="h-4.5 w-4.5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link
                aria-label="Twitter"
                href={externalLinks.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  aria-label="Twitter"
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                >
                  <XTwitterIcon size={14} />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
              <ModeToggle />
            </div>
          </div>

          <MobileNav
            activeLink={activeLink}
            navLinks={navLinks}
            moreLinks={moreLinks}
          />
        </div>
      </div>
    </header>
  );
}
