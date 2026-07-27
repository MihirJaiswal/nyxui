"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { externalLinks, itemHref } from "@/lib/links";
import { componentsData } from "@/registry/Data";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import { SocialLinkButton } from "../SocialLinkButton";
import { XTwitterIcon } from "../icons/XTwitterIcon";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "../ThemeToggle";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  activeLink: string;
  navLinks: NavLink[];
  moreLinks: NavLink[];
}

export function MobileNav({ activeLink, navLinks, moreLinks }: MobileNavProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = () => setSheetOpen(false);
  const { components } = componentsData;

  return (
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
  );
}
