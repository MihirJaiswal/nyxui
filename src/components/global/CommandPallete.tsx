import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/global/Command";
import { Search, Link as LinkIcon, Box, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import componentsJson from "@/nyxui/component.json";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (value: string) => {
    setSelectedItem(value);
  };

  const handleItemClick = (value: string) => {
    const [section, id] = value.split(":");
    const path =
      section === "links" ? `/${id}` : `/${section}/${id}`;
    router.push(path);
    setOpen(false);
  };

  const iconMap: Record<string, React.ComponentType<any>> = {
    links: LinkIcon,
    components: Box,
    templates: FileText,
  };

  const sections = Object.entries(componentsJson).map(
    ([sectionKey, itemsObj]) => ({
      key: sectionKey,
      items: Object.entries(itemsObj).map(([id, name]) => ({
        value: `${sectionKey}:${id}`,
        name,
      })),
    })
  );
  const filteredSections = sections.map(({ key, items }) => ({
    key,
    items: items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ),
  }));
  const nothingFound = filteredSections.every((s) => s.items.length === 0);

  return (
    <TooltipProvider>
      <Button
        variant="outline"
        className="relative h-9 w-full md:w-64 justify-start bg-white dark:bg-black text-sm text-muted-foreground rounded-md border px-3 py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden md:inline-flex">Search Nyx UI...</span>
        <span className="inline-flex md:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search Nyx UI..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          {nothingFound && <CommandEmpty>No items found.</CommandEmpty>}

          {filteredSections.map((section) => {
            const Icon = iconMap[section.key] || Search;
            const heading =
              section.key.charAt(0).toUpperCase() + section.key.slice(1);

            return (
              <CommandGroup key={section.key} heading={heading}>
                {section.items.length > 0 ? (
                  <RadioGroup
                    value={selectedItem || ""}
                    onValueChange={handleSelect}
                  >
                    {section.items.map((item) => (
                      <div
                        key={item.value}
                        className="flex cursor-pointer"
                        onClick={() => handleItemClick(item.value)}
                      >
                        <CommandItem
                          onSelect={() => handleItemClick(item.value)}
                          className="flex items-center justify-between w-full"
                        >
                          <div className="flex items-center">
                            <RadioGroupItem
                              value={item.value}
                              id={`radio-${item.value}`}
                              className="mr-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(item.value);
                              }}
                            />
                            <Icon className="mr-2 h-4 w-4 text-gray-500" />
                            <span className="text-gray-800 dark:text-white">
                              {item.name}
                            </span>
                          </div>
                        </CommandItem>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <CommandItem disabled className="text-muted-foreground">
                    No {heading.toLowerCase()} found.
                  </CommandItem>
                )}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </TooltipProvider>
  );
}
