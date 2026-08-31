"use client";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { externalLinks, siteLinks } from "@/lib/links";
import { getCurrentYear } from "@/lib/utils";
import { XTwitterIcon } from "./icons/XTwitterIcon";
import AnimatedLogo from "../home/newsletter/animated-logo";

export default function FooterSection() {
  const isHome = usePathname() === siteLinks.home;
  return (
    <footer className="relative w-full border-t border-border/60">
      <div
        className={`mx-auto px-6 flex flex-col ${isHome ? "max-w-300" : "max-w-350"}`}
      >
        {/* Bottom: copyright + socials */}
        <div className="flex flex-col items-center justify-between gap-4 py-5 md:flex-row">
          <span className="font-mono text-xs text-muted-foreground">
            © {getCurrentYear()} nyxui — built by Mihir Jaiswal
          </span>
          <div className="flex items-center gap-1">
            <a
              href={externalLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <XTwitterIcon className="size-3" />
            </a>
            <a
              href={externalLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href={externalLinks.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <Github className="size-4" />
            </a>
          </div>
        </div>
        <div className="md:mt-12 flex items-center justify-center md:items-start gap-8">
          <div className="relative min-w-0 md:flex-1 flex items-center justify-center md:justify-start">
            <div className="text-foreground">
              <AnimatedLogo
                width={100}
                height={85}
                weight={0}
                strokeWidth={20}
                durationMs={1600}
                threshold={0}
                rootMargin="200px"
                color="#ff500d"
              />
            </div>
          </div>
          <div className="hidden shrink-0 md:block pb-2">
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-foreground/40">
              Explore
            </span>
            <div className="flex flex-col gap-2">
              <Link
                href={siteLinks.components}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Components
                <ArrowUpRight className="size-3.5" />
              </Link>
              <Link
                href={siteLinks.playground}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Playground
                <ArrowUpRight className="size-3.5" />
              </Link>
              <Link
                href={siteLinks.docs}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Documentation
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
