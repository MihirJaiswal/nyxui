import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { externalLinks, siteLinks } from "@/lib/links";
import { getCurrentYear } from "@/lib/utils";
import { XTwitterIcon } from "./icons/XTwitterIcon";

export default function FooterSection() {
  return (
    <footer className="relative w-full border-t border-border/60">
      <div className="mx-auto max-w-295 px-6 flex flex-col">
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
          <div className="min-w-0 md:flex-1 overflow-hidden flex items-center justify-center">
            <span
              className="block w-full select-none whitespace-nowrap text-center text-[20vw] font-black leading-[0.8] tracking-tighter text-foreground/10 md:text-left md:text-[11rem] lg:text-[16rem]"
              style={{
                WebkitTextStroke: "1px currentColor",
                WebkitTextFillColor: "transparent",
              }}
            >
              NYX UI
            </span>
          </div>
          <div className="hidden shrink-0 md:block pt-2">
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
                href={siteLinks.blocks}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Blocks
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
