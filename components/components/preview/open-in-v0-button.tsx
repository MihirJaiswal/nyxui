import { Button } from "@/components/ui/button";
import { V0Icon } from "@/components/global/icons/V0Icon";

export function OpenInV0Button({ url }: { url: string }) {
  return (
    <Button
      aria-label="Open in v0"
      className="relative z-30 size-7 rounded-[5px] border-none bg-transparent p-0 text-muted-foreground hover:bg-muted hover:text-foreground dark:hover:bg-muted/50"
      asChild
      size="icon"
      variant="ghost"
    >
      <a
        href={`https://v0.dev/chat/api/open?url=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        <V0Icon className="size-5 text-current" />
      </a>
    </Button>
  );
}
