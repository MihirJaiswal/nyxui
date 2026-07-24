"use client";

import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import { useRouter } from "next/navigation";
import {
  Blocks,
  Box,
  FileText,
  Home,
  LayoutTemplate,
  Play,
  Search,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./Command";
import { Button } from "../ui/button";
import {
  componentsData,
  type Block,
  type Component,
} from "../../registry/Data";
import { itemHref, siteLinks } from "@/lib/links";

type CommandSection = "Pages" | "Components" | "Blocks" | "Templates";

interface CommandEntry {
  id: string;
  section: CommandSection;
  title: string;
  description?: string;
  href: string;
  keywords: string;
  icon: ComponentType<{ className?: string }>;
}

const staticCommands: CommandEntry[] = [
  {
    id: "home",
    section: "Pages",
    title: "Home",
    description: "Go to the landing page",
    href: siteLinks.home,
    keywords: "home landing index",
    icon: Home,
  },
  {
    id: "components",
    section: "Pages",
    title: "Components",
    description: "Browse all components",
    href: siteLinks.components,
    keywords: "ui components library",
    icon: Box,
  },
  {
    id: "blocks",
    section: "Pages",
    title: "Blocks",
    description: "Browse page sections and blocks",
    href: siteLinks.blocks,
    keywords: "blocks sections layout",
    icon: Blocks,
  },
  {
    id: "templates",
    section: "Pages",
    title: "Templates",
    description: "Browse templates",
    href: siteLinks.templates,
    keywords: "templates starters pages",
    icon: LayoutTemplate,
  },
  {
    id: "playground",
    section: "Pages",
    title: "Playground",
    description: "Customize components and copy code",
    href: siteLinks.playground,
    keywords: "playground editor preview code customize",
    icon: Play,
  },
  {
    id: "docs",
    section: "Pages",
    title: "Docs",
    description: "Read the documentation",
    href: siteLinks.docs,
    keywords: "documentation guide install usage",
    icon: FileText,
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function itemKeywords(
  slug: string,
  item: Component | Block,
  section: string,
): string {
  return normalize(
    [slug, item.title, item.description, section, ...item.tags].join(" "),
  );
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const isSearchShortcut =
        (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) ||
        event.key === "/";

      if (!isSearchShortcut) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (event.key === "/" && isTyping) {
        return;
      }

      event.preventDefault();
      setOpen((currentOpen) => !currentOpen);
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const commandSections = useMemo(() => {
    const componentCommands: CommandEntry[] = Object.entries(
      componentsData.components,
    ).map(([slug, component]) => ({
      id: `component-${slug}`,
      section: "Components",
      title: component.title,
      description: component.description,
      href: itemHref("components", slug),
      keywords: itemKeywords(slug, component, "components"),
      icon: Box,
    }));

    const blockCommands: CommandEntry[] = Object.entries(
      componentsData.blocks,
    ).map(([slug, block]) => ({
      id: `block-${slug}`,
      section: "Blocks",
      title: block.title,
      description: block.description,
      href: itemHref("blocks", slug),
      keywords: itemKeywords(slug, block, "blocks"),
      icon: Blocks,
    }));

    const templateCommands: CommandEntry[] = Object.entries(
      componentsData.templates,
    ).map(([slug, template]) => ({
      id: `template-${slug}`,
      section: "Templates",
      title: template.title,
      description: template.description,
      href: itemHref("templates", slug),
      keywords: itemKeywords(slug, template, "templates"),
      icon: LayoutTemplate,
    }));

    return [
      { heading: "Pages", items: staticCommands },
      { heading: "Components", items: componentCommands },
      { heading: "Blocks", items: blockCommands },
      { heading: "Templates", items: templateCommands },
    ];
  }, []);

  const runCommand = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-8 max-h-8 justify-start gap-2 rounded-lg border-border bg-[hsl(var(--surface-alt))] px-3 text-sm font-normal text-muted-foreground shadow-none transition-colors hover:bg-[hsl(var(--surface-alt))] hover:text-foreground sm:w-48 sm:px-4"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="inline-flex flex-1">Search...</span>
        <kbd className="pointer-events-none hidden shrink-0 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} title="Search Nyx UI">
        <CommandInput placeholder="Search pages, components, blocks..." />
        <CommandList>
          <CommandEmpty>
            <div className="py-6 text-center">
              <p className="text-sm font-medium text-foreground">
                No results found
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try a component name, tag, or page.
              </p>
            </div>
          </CommandEmpty>

          {commandSections.map((section, sectionIndex) => (
            <div key={section.heading}>
              {sectionIndex > 0 && <CommandSeparator />}
              <CommandGroup heading={section.heading}>
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <CommandItem
                      key={item.id}
                      value={`${item.title} ${item.href} ${item.keywords}`}
                      onSelect={() => runCommand(item.href)}
                      className="group gap-3"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors group-data-[selected=true]:text-foreground">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1 truncate">
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                        {item.description && (
                          <span className="ml-2 hidden truncate text-xs text-muted-foreground md:inline">
                            {item.description}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
