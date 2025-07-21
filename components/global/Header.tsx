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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

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
    { href: "/docs", label: "Documentation" },
  ];

  const { components } = componentsData;

  const openSearch = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true }),
    );
  };

  const gradientStyle: React.CSSProperties = {
    "--color-1": "0, 100%, 67%" /* Red */,
    "--color-2": "271, 76%, 53%" /* Purple */,
    "--color-3": "195, 100%, 50%" /* Blue */,
    "--color-4": "142, 71%, 45%" /* Green */,
    "--color-5": "39, 100%, 58%" /* Yellow/Orange */,
  } as React.CSSProperties;

  return (
    <header
      style={gradientStyle}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background backdrop-blur-xl shadow-sm"
          : "bg-background/50 backdrop-blur-sm",
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
        <div className="w-full h-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-600"></div>
      </div>
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-20 container mx-auto relative z-10">
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="Home"
            className="group flex items-center transition-all duration-300"
          >
            <div className="relative flex items-center justify-center overflow-hidden">
              <div className="h-10 w-10 border-4 border-background flex items-center justify-center bg-black dark:bg-white rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.0"
                  fill="currentColor"
                  viewBox="185.769 148.352 684.02 711.738"
                  preserveAspectRatio="xMidYMid meet"
                  width="684.02"
                  height="711.738"
                >
                  <g
                    transform="translate(0 1024) scale(0.1 -0.1)"
                    fill="currentColor"
                    className="text-background"
                  >
                    <path d="M0 5120l0-5120 5120 0 5120 0 0 5120 0 5120-5120 0-5120 0 0-5120zm5375 2860c140-12 393-49 415-61 10-5-2-8-34-9-70 0-244-27-371-57-432-101-860-347-1160-665-351-372-581-849-662-1368-27-173-24-540 5-710 76-448 246-823 520-1151 351-419 881-713 1422-790 141-20 478-18 615 4 526 86 976 314 1364 692 151 147 261 280 367 440 126 192 247 443 304 633 12 40 24 71 26 69 2-2-1-57-7-123-71-841-511-1626-1193-2132-693-513-1598-694-2436-486-1191 296-2083 1312-2224 2534-18 155-21 467-6 621 68 689 347 1289 819 1760 197 196 400 347 634 473 475 254 1051 372 1602 326zm1946-570c13-112 50-246 86-313 71-130 243-220 493-258l84-13-107-17c-388-62-499-187-565-639l-8-55-17 128c-10 70-28 161-41 202-69 217-223 323-529 365-45 7-83 13-85 14-1 2 24 6 56 10 166 19 353 90 435 165 85 78 131 204 162 440 8 58 15 111 16 116 1 6 4-3 5-20 2-16 9-73 15-125zm-1840-48c141-133 236-305 293-532 37-146 46-224 46-408 0-93 4-194 10-223 21-114 153-338 301-510 117-136 142-175 147-228 5-64-23-102-128-173-158-106-176-156-99-276 34-54 38-103 10-148-25-41-78-81-137-103l-46-18 42-7c48-8 95-48 106-91 9-34-11-77-65-139-37-42-41-53-41-100 0-30 7-73 16-97 37-103 16-206-58-276-105-101-280-109-623-25-122 29-170 36-255 36-92 1-111-2-154-23-137-67-201-210-194-429 2-56 0-102-3-102-11 0-157 158-222 240-174 217-272 427-324 695-27 140-24 446 6 585 56 262 165 487 344 710 34 41 176 190 317 330 280 278 357 372 443 539 101 194 134 346 124 565-6 116-31 276-53 330-14 36 114-44 197-122zm1730-1872c20-76 56-136 103-175 55-45 172-92 252-102l59-7-93-18c-221-44-303-134-333-367-16-120-21-127-30-41-29 267-109 361-344 409l-84 17 84 16c152 29 250 90 294 184 21 44 50 185 52 253 1 24 6 9 15-44 7-44 18-100 25-125z" />
                  </g>
                </svg>
              </div>
            </div>
            <span className="hidden md:block text-xl font-bold bg-clip-text text-black dark:text-white bg-gradient-to-r from-foreground to-foreground/80">
              NYX UI
            </span>
          </Link>
          <nav className="hidden lg:flex items-center space-x-1 ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.label}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 hover:text-foreground hover:bg-muted/50",
                  "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-primary after:rounded-full after:transition-all after:duration-300 hover:after:w-4/5",
                  activeLink === link.href
                    ? "text-foreground after:w-4/5 bg-muted/30"
                    : "text-muted-foreground",
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
            className="w-full max-w-xs justify-center text-sm text-muted-foreground rounded-full border border-muted/30"
            onClick={openSearch}
          >
            <Search className="mr-2 h-4 w-4 text-black dark:text-white" />
            <span className="text-black dark:text-white">Search</span>
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
                className="rounded-full hover:bg-muted/80 transition-all duration-300 hover:scale-105"
              >
                <GitHubLogoIcon className="h-6 w-6 text-black dark:text-white transition-colors" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link
              aria-label="Twitter"
              href="https://x.com/nyx_ui"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                aria-label="Twitter"
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-muted/80 transition-all duration-300 hover:scale-105"
              >
                <svg
                  height="18"
                  width="18"
                  fill="currentColor"
                  viewBox="0 0 1200 1227"
                  xmlns="http://www.w3.org/2000/svg"
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
                className="rounded-full h-8 w-8 p-0 hover:bg-muted/80 transition-all duration-300"
              >
                <GitHubLogoIcon className="h-5 w-5 text-black dark:text-white" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link
              aria-label="Twitter"
              href="https://x.com/nyx_ui"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                aria-label="Twitter"
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 p-0 hover:bg-muted/80 transition-all duration-300"
              >
                <svg
                  height="17"
                  width="17"
                  fill="currentColor"
                  viewBox="0 0 1200 1227"
                  xmlns="http://www.w3.org/2000/svg"
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
                  className="rounded-full h-8 w-8 p-0 hover:bg-muted/80 transition-all duration-300"
                >
                  <Menu className="h-4 w-4 text-black dark:text-white" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] bg-background/95 backdrop-blur-xl p-0 border-l border-muted/70"
              >
                <div className="bg-gradient-to-r from-purple-50/50 to-background/10 dark:from-purple-950/20 dark:to-background/5 p-4 border-b border-muted/20">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-3">
                      <div className="h-8 w-8 flex items-center justify-center dark:bg-black bg-white rounded-full">
                        <Image
                          src="/logo.png"
                          alt="Nyx UI Logo"
                          width={32}
                          height={32}
                          className="rounded-full"
                          quality={100}
                          loading="lazy"
                          />
                      </div>
                      <div>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 text-base font-bold">
                          NYX{" "}
                          <span className="text-purple-600 dark:text-purple-400">
                            UI
                          </span>
                        </span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                </div>
                <div className="p-3 overflow-auto overscroll-contain touch-pan-y h-[calc(100vh-120px)]">
                  <div className="space-y-0.5 mb-5">
                    <h3 className="text-xs uppercase tracking-wider font-semibold pl-2 pb-1.5">
                      Navigation
                    </h3>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        aria-label={link.label}
                        className={cn(
                          "flex items-center text-sm font-medium p-2.5 rounded-md transition-colors",
                          activeLink === link.href
                            ? "text-foreground bg-muted/60 border-l-2 border-primary pl-[8px]"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="relative">
                    <div className="h-px bg-muted/30 my-3" />
                    <h3 className="text-xs uppercase tracking-wider font-semibold pl-2 pb-2 flex items-center mb-4">
                      <span>Components</span>
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-muted rounded-full">
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
                            "flex items-center text-sm p-2 rounded-md transition-colors pl-2.5",
                            activeLink === `/components/${slug}`
                              ? "text-foreground bg-muted/30 border-l-2 border-primary pl-1.5"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/20",
                          )}
                        >
                          {comp.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-muted/20 p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Link
                        aria-label="GitHub"
                        href="https://github.com/MihirJaiswal/nyxui"
                        target="_blank"
                        rel="noreferrer"
                        className="h-7 w-7 rounded-full p-0"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        aria-label="Twitter"
                        href="https://x.com/nyx_ui"
                        target="_blank"
                        rel="noreferrer"
                        className="h-7 w-7 rounded-full p-0"
                      >
                        <svg
                          height="12"
                          width="12"
                          fill="currentColor"
                          viewBox="0 0 1200 1227"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                        </svg>
                      </Link>
                    </div>
                    <div className="text-xs">v1.2.0</div>
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