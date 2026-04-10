import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./Command";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { TooltipProvider } from "../ui/tooltip";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { componentsData, Component } from "../../registry/Data";

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
      section === "components"
        ? `/components/${id}`
        : section === "templates"
          ? `/templates/${id}`
          : section === "links"
            ? `/${id}`
            : `/${section}/${id}`;
    router.push(path);
    setOpen(false);
  };

  const sections = Object.entries(componentsData).map(
    ([sectionKey, itemsObj]) => ({
      key: sectionKey,
      items: Object.entries(itemsObj).map(([id, item]) => ({
        value: `${sectionKey}:${id}`,
        name:
          sectionKey === "components"
            ? (item as Component).title
            : typeof item === "string"
              ? item
              : id,
      })),
    }),
  );

  const filteredSections = sections.map(({ key, items }) => ({
    key,
    items: items.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    ),
  }));
  const nothingFound = filteredSections.every((s) => s.items.length === 0);

  return (
    <TooltipProvider>
      <Button
        variant="outline"
        className="relative flex items-center gap-2 group shadow-sm hover:shadow-md transition-all duration-200 h-8 w-full justify-start bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 px-0.5"
        onClick={() => setOpen(true)}
      >
        <Search className="ml-1 h-4 w-4 text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors" />
        <span className="hidden md:inline-flex font-normal text-xs">
          Search components
        </span>
        <span className="inline-flex md:hidden">Search...</span>
        <kbd className="pointer-events-none hidden h-6 select-none items-center gap-1 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2 font-mono text-[10px] font-medium text-neutral-600 dark:text-neutral-400 opacity-100 sm:flex transition-all group-hover:bg-neutral-200 dark:group-hover:bg-neutral-800">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search nyx UI..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          {nothingFound && <CommandEmpty>No items found.</CommandEmpty>}

          {filteredSections.map((section) => {
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
