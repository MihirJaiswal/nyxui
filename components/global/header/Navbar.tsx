"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Search } from "lucide-react";
import { ProAccountButton } from "@/components/global/header/ProAccountButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CommandPalette } from "@/components/global/CommandPalette";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Logo from "@/components/global/Logo";
import { MobileNav } from "./MobileNav";
import { externalLinks, siteLinks } from "@/lib/links";
import { useProAccess } from "@/components/providers/pro-access-provider";
import { ANNUAL_PRICE } from "@/components/components/pro/pricing-plans";
import { INNER, containerVariantFor } from "@/lib/layout";

export default function Navbar(): React.ReactElement {
  const activeLink = usePathname();
  const isPreview = activeLink.startsWith("/preview");
  const { entitled } = useProAccess();

  if (isPreview) return <></>;

  const navLinks = [
    { href: siteLinks.components, label: "Components" },
    { href: siteLinks.playground, label: "Playground" },
    { href: siteLinks.blocks, label: "Blocks" },
    { href: siteLinks.templates, label: "Templates" },
    { href: siteLinks.pro, label: "Pricing" },
  ];

  const moreLinks: { href: string; label: string }[] = [];

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent("nyxui:open-search"));
  };

  return (
    <header className="sticky top-0 z-100 w-full border-b bg-background/50 border-border backdrop-blur-lg">
      <div
        className={cn(
          INNER[containerVariantFor(activeLink)],
          "flex h-13 items-center justify-between",
        )}
      >
        {/* Left: logo + primary nav */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            aria-label="Nyx UI"
            className="group flex items-center gap-2.5 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center">
              <Logo className="transition-colors duration-200" />
            </div>
            <span className="sr-only">Nyx UI</span>
          </Link>

          <nav className="hidden items-center space-x-5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.label}
                className={cn(
                  "text-sm transition-colors",
                  activeLink === link.href
                    ? "font-medium text-neutral-950 dark:text-white"
                    : "text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: desktop actions */}
        <div className="hidden items-center gap-1 lg:flex">
          <CommandPalette hideTrigger />

          <button
            type="button"
            aria-label="Search"
            onClick={openSearch}
            className="inline-flex size-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:hover:text-white"
          >
            <Search className="size-4" />
            <span className="sr-only">Search</span>
          </button>

          <ThemeToggle />

          <a
            aria-label="GitHub"
            href={externalLinks.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:hover:text-white"
          >
            <GitHubLogoIcon className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </a>

          <ProAccountButton />

          {!entitled && (
            <Button
              asChild
              size="sm"
              className="ml-1 h-8 gap-1.5 rounded-lg px-3 text-[13px]"
            >
              <Link href="/pro">
                <span>Get Pro</span>
                <span className="text-shadow-none font-semibold">
                  {ANNUAL_PRICE}
                </span>
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile cluster */}
        <div className="flex items-center gap-1 lg:hidden">
          <ProAccountButton />
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

/** Half-filled circle theme toggle matching the navbar's icon-button styling. */
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex size-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800/60 dark:hover:text-white"
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 256 256"
        className={`size-4.5 transition-transform duration-300 ${
          mounted && theme !== "dark" ? "rotate-180" : "rotate-0"
        }`}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM40,128a88.1,88.1,0,0,1,88-88V216A88.1,88.1,0,0,1,40,128Z" />
      </svg>
    </button>
  );
}
