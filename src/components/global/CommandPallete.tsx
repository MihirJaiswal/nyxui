import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/global/Command";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import componentsJson from "@/nyxui/component.json";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (componentId: string) => {
    setSelectedComponent(componentId);
  };

  const handleComponentClick = (componentId: string) => {
    router.push(`/components/${componentId}`);
    setOpen(false);
  };

  const componentsArray = Object.entries(componentsJson).map(([id, name]) => ({
    id,
    name,
    description: "",
    category: "Components"
  }));

  const filteredComponents = componentsArray.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TooltipProvider>
      <Button
        variant="outline"
        className="relative h-9 w-full md:w-64 justify-start bg-white dark:bg-black text-sm text-muted-foreground rounded-md border px-3 py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4"/>
        <span className="hidden md:inline-flex">Search components...</span>
        <span className="inline-flex md:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search Nyx UI components..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No components found.</CommandEmpty>
          <CommandGroup heading="Components">
            <RadioGroup value={selectedComponent || ""} onValueChange={handleSelect}>
              {filteredComponents.map((component) => (
                <div key={component.id} className="flex cursor-pointer" onClick={() => handleComponentClick(component.id)}>
                  <CommandItem
                    onSelect={() => handleComponentClick(component.id)}
                    className="flex items-center justify-between w-full cursor-pointer text-black dark:text-white"
                  >
                    <div className="flex items-center text-black dark:text-white">
                      <RadioGroupItem
                        value={component.id}
                        id={`radio-${component.id}`}
                        className="mr-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(component.id);
                        }}
                      />
                      <span className="text-gray-800 dark:text-white">{component.name}</span>
                    </div>
                  </CommandItem>
                </div>
              ))}
            </RadioGroup>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </TooltipProvider>
  );
}