"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu, Github, Search } from "lucide-react";
import { ModeToggle } from "./ThemeToggle";
import { cn } from "../../lib/utils";
import { CommandPalette } from "./CommandPallete";
import { componentsData } from "../../registry/Data";
import Image from "next/image";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useMounted } from "../../hooks/use-mounted";
import Logo from "./Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const mounted = useMounted();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  const navLinks = [
    { href: "/components", label: "Components" },
    { href: "/blocks", label: "Blocks" },
    { href: "/templates", label: "Templates" },
    { href: "/playground", label: "Playground" },
  ];

  const { components } = componentsData;

  const openSearch = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
    );
  };

  const gradientStyle: React.CSSProperties = {
    "--color-1": "0, 100%, 67%" /* Red */,
    "--color-2": "271, 76%, 53%" /* Purple */,
    "--color-3": "195, 100%, 50%" /* Blue */,
    "--color-4": "142, 71%, 45%" /* Green */,
    "--color-5": "39, 100%, 58%" /* Yellow/Orange */,
  } as React.CSSProperties;

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <header
        style={gradientStyle}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200 ease-in-out px-2",
          "bg-background/50 backdrop-blur-sm"
        )}
      >
        <div className="absolute left-0 top-full h-px w-full pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-600 transition-colors duration-200"></div>
        </div>
        <div className="flex h-16 items-center justify-between px-4 md:px-6 xl:px-20 xl:container mx-auto relative z-10">
          <div className="flex items-center">
            <div className="h-10 w-10 border-4 border-background bg-black dark:bg-white rounded-full animate-pulse"></div>
            <div className="hidden md:block h-6 w-20 bg-muted rounded ml-3 animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden lg:flex items-center space-x-3">
              <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
              <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
              <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      style={gradientStyle}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200 ease-in-out",
        scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-sm border-b border-border/50"
          : "bg-background/80 backdrop-blur-md"
      )}
    >
      {/* Gradient overlay with fade effect */}
      {/*   <div className={`absolute h-28 inset-0 pointer-events-none ${scrolled ? "opacity-0" : "opacity-11"} transition-opacity duration-300`}>
        <div className={cn(
          "absolute inset-0",
          "bg-[length:300%_100%] motion-safe:animate-[gradient_3s_ease_infinite]",
          "bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)),hsl(var(--color-1)))]"
        )}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background"></div>
      </div> */}

      <div className="absolute left-0 top-full h-px w-full pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-600 transition-colors duration-200"></div>
      </div>
      <div className="flex h-16 items-center justify-between px-4 md:px-6 xl:px-20 xl:container mx-auto relative z-10">
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="Home"
            className="group flex items-center transition-all duration-200"
          >
            <div className="relative flex items-center justify-center overflow-hidden">
              <div className="h-8 w-8 md:h-9 md:w-9 border-4 border-background flex items-center justify-center rounded-full transition-all duration-200">
                <Logo className="transition-colors duration-200" />
              </div>
            </div>
            <span className="hidden md:block text-xl ml-1 font-bold bg-clip-text sr-only text-black dark:text-white bg-gradient-to-r from-foreground to-foreground/80 transition-colors duration-200">
              Nyx UI
            </span>
          </Link>
          <nav className="hidden lg:flex items-center space-x-1 ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.label}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:text-foreground hover:bg-muted/50",
                  "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-primary after:rounded-full after:transition-all after:duration-200 hover:after:w-4/5",
                  activeLink === link.href
                    ? "text-foreground after:w-4/5 bg-muted/30"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex lg:hidden flex-1 justify-center mx-2">
          <Button
            variant="outline"
            aria-label="Search"
            className="w-full max-w-xs justify-center text-sm text-muted-foreground rounded-full border border-muted/30 transition-colors duration-200"
            onClick={openSearch}
          >
            <Search className="mr-2 h-4 w-4 text-black dark:text-white transition-colors duration-200" />
            <span className="text-black dark:text-white transition-colors duration-200">
              Search
            </span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="hidden lg:flex items-center space-x-3">
            <CommandPalette />
            <Link
              aria-label="GitHub"
              href="https://github.com/MihirJaiswal/nyxui"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                aria-label="GitHub"
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-muted/80 transition-all duration-200 hover:scale-105"
              >
                <GitHubLogoIcon className="h-6 w-6 text-black dark:text-white transition-colors duration-200" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link
              aria-label="Twitter"
              href="https://x.com/mihir_jaiswal_"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                aria-label="Twitter"
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-muted/80 transition-all duration-200 hover:scale-105"
              >
                <svg
                  height="18"
                  width="18"
                  fill="currentColor"
                  viewBox="0 0 1200 1227"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-colors duration-200"
                >
                  <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
            <ModeToggle />
          </div>
          <div className="flex lg:hidden items-center space-x-1">
            <Link
              aria-label="GitHub"
              href="https://github.com/MihirJaiswal/nyxui"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                aria-label="GitHub"
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 p-0 hover:bg-muted/80 transition-all duration-200"
              >
                <GitHubLogoIcon className="h-5 w-5 text-black dark:text-white transition-colors duration-200" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link
              aria-label="Twitter"
              href="https://x.com/mihir_jaiswal_"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                aria-label="Twitter"
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 p-0 hover:bg-muted/80 transition-all duration-200"
              >
                <svg
                  height="17"
                  width="17"
                  fill="currentColor"
                  viewBox="0 0 1200 1227"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-colors duration-200"
                >
                  <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  aria-label="Open Menu"
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 p-0 hover:bg-muted/80 transition-all duration-200"
                >
                  <Menu className="h-4 w-4 text-black dark:text-white transition-colors duration-200" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] bg-background/95 backdrop-blur-xl p-0 border-l border-muted/70 transition-colors duration-200"
              >
                <div className="bg-gradient-to-r from-purple-50/50 to-background/10 dark:from-purple-950/20 dark:to-background/5 p-4 border-b border-muted/20 transition-colors duration-200">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-3">
                      <div className="h-8 w-8 md:h-9 md:w-9 border-4 border-background flex items-center justify-center rounded-full transition-all duration-200">
                        <Logo className="transition-colors duration-200" />
                      </div>
                      <div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 text-base font-bold transition-colors duration-200">
                          NYX{" "}
                          <span className="text-purple-600 dark:text-purple-400 transition-colors duration-200">
                            UI
                          </span>
                        </span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                </div>
                <div className="p-3 overflow-auto overscroll-contain touch-pan-y h-[calc(100vh-120px)]">
                  <div className="space-y-0.5 mb-5">
                    <h3 className="text-xs uppercase tracking-wider font-semibold pl-2 pb-1.5 transition-colors duration-200">
                      Navigation
                    </h3>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        aria-label={link.label}
                        className={cn(
                          "flex items-center text-sm font-medium p-2.5 rounded-md transition-colors duration-200",
                          activeLink === link.href
                            ? "text-foreground bg-muted/60 border-l-2 border-primary pl-[8px]"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="relative">
                    <div className="h-px bg-muted/30 my-3 transition-colors duration-200" />
                    <h3 className="text-xs uppercase tracking-wider font-semibold pl-2 pb-2 flex items-center mb-4 transition-colors duration-200">
                      <span>Components</span>
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-muted rounded-full transition-colors duration-200">
                        {Object.keys(components).length}
                      </span>
                    </h3>
                    <div className="space-y-0.5">
                      {Object.entries(components).map(([slug, comp]) => (
                        <Link
                          key={slug}
                          href={`/components/${slug}`}
                          aria-label={comp.title}
                          className={cn(
                            "flex items-center text-sm p-2 rounded-md transition-colors duration-200 pl-2.5",
                            activeLink === `/components/${slug}`
                              ? "text-foreground bg-muted/30 border-l-2 border-primary pl-1.5"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                          )}
                        >
                          {comp.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-muted/20 p-3 transition-colors duration-200">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Link
                        aria-label="GitHub"
                        href="https://github.com/MihirJaiswal/nyxui"
                        target="_blank"
                        rel="noreferrer"
                        className="h-7 w-7 rounded-full p-0 transition-colors duration-200"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        aria-label="Twitter"
                        href="https://x.com/mihir_jaiswal_"
                        target="_blank"
                        rel="noreferrer"
                        className="h-7 w-7 rounded-full p-0 transition-colors duration-200"
                      >
                        <svg
                          height="12"
                          width="12"
                          fill="currentColor"
                          viewBox="0 0 1200 1227"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-colors duration-200"
                        >
                          <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                        </svg>
                      </Link>
                    </div>
                    <div className="text-xs transition-colors duration-200">
                      v1.2.0
                    </div>
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
