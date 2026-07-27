"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown, Menu, Search } from "lucide-react";
import { ModeToggle } from "./ThemeToggle";
import { cn } from "../../lib/utils";
import { CommandPalette } from "./CommandPallete";
import { componentsData } from "../../registry/Data";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useMounted } from "../../hooks/use-mounted";
import { useEventListener } from "../../hooks/use-event-listener";
import { XTwitterIcon } from "./icons/XTwitterIcon";
import { SocialLinkButton } from "./SocialLinkButton";
import { GradientDivider } from "./GradientDivider";
import Logo from "./Logo";
import { externalLinks, itemHref, siteLinks } from "@/lib/links";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
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

  const { components } = componentsData;

  const closeSheet = () => setSheetOpen(false);

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
            className="w-full max-w-xs justify-center rounded-full border-border/60 text-sm text-muted-foreground"
            onClick={openSearch}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Search</span>
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

          <div className="flex items-center gap-1 lg:hidden">
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
                className="h-8 w-8 rounded-full p-0 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              >
                <GitHubLogoIcon className="h-4 w-4" />
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
                className="h-8 w-8 rounded-full p-0 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              >
                <XTwitterIcon size={16} />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
            <ModeToggle />
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  aria-label="Open Menu"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full p-0 text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                >
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] border-l border-border/60 bg-background/95 p-0 backdrop-blur-xl"
              >
                <div className="border-b border-border/60 p-4">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center">
                        <Logo className="transition-colors duration-200" />
                      </div>
                      <span className="text-md font-bold">Nyx UI</span>
                    </SheetTitle>
                  </SheetHeader>
                </div>
                <div className="h-[calc(100vh-120px)] overflow-auto overscroll-contain p-3 touch-pan-y">
                  <div className="mb-5 space-y-0.5">
                    <h3 className="pb-1.5 pl-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Navigation
                    </h3>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        aria-label={link.label}
                        onClick={closeSheet}
                        className={cn(
                          "flex items-center rounded-md p-2.5 text-sm font-medium transition-colors",
                          activeLink === link.href
                            ? "text-primary"
                            : "text-muted-foreground hover:bg-muted/30 hover:text-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="my-2 h-px bg-border/40" />
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        aria-label={link.label}
                        onClick={closeSheet}
                        className={cn(
                          "flex items-center rounded-md p-2.5 text-sm font-medium transition-colors",
                          activeLink === link.href
                            ? "text-primary"
                            : "text-muted-foreground hover:bg-muted/30 hover:text-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="relative">
                    <div className="my-3 h-px bg-border/40" />
                    <h3 className="mb-4 flex items-center pb-2 pl-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <span>Components</span>
                      <span className="ml-2 rounded-full bg-muted px-1.5 py-0.5 text-[10px]">
                        {Object.keys(components).length}
                      </span>
                    </h3>
                    <div className="space-y-0.5">
                      {Object.entries(components).map(([slug, comp]) => (
                        <Link
                          key={slug}
                          href={itemHref("components", slug)}
                          aria-label={comp.title}
                          onClick={closeSheet}
                          className={cn(
                            "flex items-center rounded-md p-2 text-sm transition-colors",
                            activeLink === itemHref("components", slug)
                              ? "text-primary"
                              : "text-muted-foreground hover:bg-muted/20 hover:text-foreground",
                          )}
                        >
                          {comp.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-border/60 p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <SocialLinkButton
                        href={externalLinks.githubRepo}
                        label="GitHub"
                        className="h-7 w-7"
                      >
                        <GitHubLogoIcon className="h-3.5 w-3.5" />
                      </SocialLinkButton>
                      <SocialLinkButton
                        href={externalLinks.twitter}
                        label="Twitter"
                        className="h-7 w-7"
                      >
                        <XTwitterIcon size={12} />
                      </SocialLinkButton>
                    </div>
                    <div className="text-xs text-muted-foreground">v1.2.0</div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
