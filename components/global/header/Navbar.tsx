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
import { useEventListener } from "@/hooks/use-event-listener";
import { XTwitterIcon } from "@/components/global/icons/XTwitterIcon";
import Logo from "@/components/global/Logo";
import { MobileNav } from "./MobileNav";
import { externalLinks, siteLinks } from "@/lib/links";
import { motion, useReducedMotion } from "motion/react";

export default function Navbar(): React.ReactElement {
  const [scrolled, setScrolled] = useState(false);
  const activeLink = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const isHome = activeLink === siteLinks.home;

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

  return (
    <motion.header
      initial={false}
      animate={{ maxWidth: isHome ? "55rem" : "85rem" }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              type: "tween",
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }
      }
      className={cn(
        "top-1.5 lg:top-4 z-50 w-full will-change-[max-width] px-3",
        isHome ? "fixed left-1/2 -translate-x-1/2" : "sticky mx-auto",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-full items-center justify-between rounded-[60px] px-4 py-2 shadow-[inset_1.5px_0_0_rgba(40,30,20,0.06),inset_-1px_0_0_rgba(40,30,20,0.06),inset_0_1px_0_rgba(40,30,20,0.09)] backdrop-blur-[20px] transition-[background-color,border-color,box-shadow] duration-500 ease-out motion-reduce:transition-none md:px-6 dark:shadow-[inset_1.2px_0_0_rgba(255,255,255,0.04),inset_-1.2px_0_0_rgba(255,255,255,0.04),inset_0_1.2px_0_rgba(255,255,255,0.1),inset_0_0.6px_0_rgba(255,255,255,0.1)]",
          scrolled
            ? "bg-card/95 shadow-[inset_1px_0_0_rgba(40,30,20,0.06),inset_-1px_0_0_rgba(40,30,20,0.06),inset_0_1px_0_rgba(40,30,20,0.09),inset_0_-1.5px_0_rgba(40,30,20,0.06)] dark:bg-black/80 dark:shadow-[inset_1.2px_0_0_rgba(255,255,255,0.04),inset_-1.2px_0_0_rgba(255,255,255,0.04),inset_0_1.2px_0_rgba(255,255,255,0.1),inset_0_0.6px_0_rgba(255,255,255,0.1),inset_0_-1.6px_0_rgba(255,255,255,0.06)]"
            : "",
        )}
      >
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
                  "px-3 py-2 text-sm transition-colors hover:text-foreground",
                  activeLink === link.href
                    ? "text-brand"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "group flex items-center gap-0.5 px-3 py-2 text-sm transition-colors hover:text-foreground outline-none",
                    isMoreActive ? "text-brand" : "text-muted-foreground",
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
            className="h-7 w-full max-w-xs justify-start gap-2 rounded-lg border-border/60 bg-muted/50 px-3 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:bg-muted hover:text-foreground"
            onClick={openSearch}
          >
            <Search className="h-2 w-2" />
            <span className="text-sm">Search</span>
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <div className="hidden items-center lg:flex">
            <CommandPalette />
            <div>
              <a
                aria-label="GitHub"
                href={externalLinks.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  aria-label="GitHub"
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                >
                  <GitHubLogoIcon className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </a>
              <a
                aria-label="Twitter"
                href={externalLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
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
    </motion.header>
  );
}
