import { ReactNode } from "react";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function TemplatePreview({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      className={cn(
        buttonVariants({ variant: "outline" }),
        "not-prose group relative gap-2 rounded-lg",
      )}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ExternalLinkIcon className="size-4" />
    </a>
  );
}
