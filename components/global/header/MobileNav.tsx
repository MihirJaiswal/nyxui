"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
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
import Logo from "@/components/global/Logo";
import { Button } from "@/components/ui/button";
import { SocialLinkButton } from "@/components/global/SocialLinkButton";
import { XTwitterIcon } from "@/components/global/icons/XTwitterIcon";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/global/ThemeToggle";
import { cn } from "@/lib/utils";
import { CategoryHeading } from "@/components/global/CategoryHeading";
import { PhantomLine } from "@/components/global/PhantomLine";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  activeLink: string;
  navLinks: NavLink[];
  moreLinks: NavLink[];
}

const SECTION_VARIANTS = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 },
};

const SECTION_TRANSITION = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 },
};

const ITEM_TRANSITION = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
};

export function MobileNav({ activeLink, navLinks, moreLinks }: MobileNavProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = () => setSheetOpen(false);
  const { components } = componentsData;
  const componentEntries = Object.entries(components);

  const renderItem = (
    href: string,
    label: string,
    index: number,
    isLast: boolean,
  ) => {
    const isActive = activeLink === href;
    return (
      <motion.div
        key={href}
        variants={ITEM_VARIANTS}
        transition={ITEM_TRANSITION}
        className="relative"
      >
        {index === 0 && <PhantomLine position="top" />}
        <Link
          href={href}
          aria-label={label}
          onClick={closeSheet}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "group relative flex min-h-7 w-full items-center gap-3 rounded-md py-1 text-sm transition-colors hide-scrollbar",
            isActive
              ? "text-primary"
              : "text-muted-foreground hover:text-primary",
          )}
        >
          <span className="flex w-11 shrink-0 items-center" aria-hidden="true">
            <span
              className={cn(
                "block h-px w-8 shrink-0 origin-left transition-colors",
                isActive ? "bg-primary" : "bg-foreground/30",
              )}
            />
          </span>
          <span
            className={cn(
              "min-w-0 flex-1 truncate text-sm",
              isActive && "font-medium",
            )}
            title={label}
          >
            {label}
          </span>
        </Link>
        {!isLast && <PhantomLine position="bottom" />}
      </motion.div>
    );
  };

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
          className="my-3 mr-3 h-[calc(100%-1.5rem)] w-[260px] overflow-hidden rounded-xl border border-border/70 bg-card p-0 shadow-sm"
        >
          <div className="flex h-full flex-col">
            <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border/70 px-4">
              <SheetHeader className="p-0">
                <SheetTitle className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center">
                    <Logo className="transition-colors duration-200" />
                  </div>
                </SheetTitle>
              </SheetHeader>
            </div>

            <AnimatePresence initial={false}>
              {sheetOpen && (
                <motion.div
                  key="mobile-nav-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12, delay: 0.08 }}
                  className="min-h-0 flex-1 overflow-y-auto px-3 pb-3 scrollbar-no"
                >
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.02 } },
                    }}
                    className="space-y-2 hide-scrollbar mt-2"
                  >
                    <motion.div
                      variants={SECTION_VARIANTS}
                      transition={SECTION_TRANSITION}
                    >
                      <CategoryHeading title="Navigation" />
                      <div className="grid grid-flow-row auto-rows-max text-sm">
                        {navLinks.map((link, index) =>
                          renderItem(
                            link.href,
                            link.label,
                            index,
                            index === navLinks.length - 1 &&
                              moreLinks.length === 0,
                          ),
                        )}
                        {moreLinks.map((link, index) =>
                          renderItem(
                            link.href,
                            link.label,
                            navLinks.length + index,
                            index === moreLinks.length - 1,
                          ),
                        )}
                      </div>
                    </motion.div>

                    <div className="my-3 h-px bg-border/40" />

                    <motion.div
                      variants={SECTION_VARIANTS}
                      transition={SECTION_TRANSITION}
                    >
                      <CategoryHeading title="Components" />
                      <div className="grid grid-flow-row auto-rows-max text-sm">
                        {componentEntries.map(([slug, comp], index) =>
                          renderItem(
                            itemHref("components", slug),
                            comp.title,
                            index,
                            index === componentEntries.length - 1,
                          ),
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex h-12 shrink-0 items-center justify-between border-t border-border/70 px-3">
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
