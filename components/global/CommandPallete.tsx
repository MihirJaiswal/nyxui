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
    href: "/",
    keywords: "home landing index",
    icon: Home,
  },
  {
    id: "components",
    section: "Pages",
    title: "Components",
    description: "Browse all components",
    href: "/components",
    keywords: "ui components library",
    icon: Box,
  },
  {
    id: "blocks",
    section: "Pages",
    title: "Blocks",
    description: "Browse page sections and blocks",
    href: "/blocks",
    keywords: "blocks sections layout",
    icon: Blocks,
  },
  {
    id: "templates",
    section: "Pages",
    title: "Templates",
    description: "Browse templates",
    href: "/templates",
    keywords: "templates starters pages",
    icon: LayoutTemplate,
  },
  {
    id: "playground",
    section: "Pages",
    title: "Playground",
    description: "Customize components and copy code",
    href: "/playground",
    keywords: "playground editor preview code customize",
    icon: Play,
  },
  {
    id: "docs",
    section: "Pages",
    title: "Docs",
    description: "Read the documentation",
    href: "/docs",
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
      href: `/components/${slug}`,
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
      href: `/blocks/${slug}`,
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
      href: `/templates/${slug}`,
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
        className="relative flex h-9 w-54 items-center justify-start gap-2 rounded-md border-border bg-background px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="hidden font-normal md:inline-flex">Search Nyx UI</span>
        <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <span>⌘</span>K
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
