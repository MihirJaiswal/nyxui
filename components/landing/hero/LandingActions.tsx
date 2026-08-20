import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteLinks } from "@/lib/links";

export function LandingActions(): React.ReactElement {
  return (
    <div className="flex justify-center">
      <Link
        href={siteLinks.components}
        className="group inline-flex items-center gap-2 text-sm text-foreground/75 transition-colors hover:text-foreground"
      >
        <span className="size-3 bg-brand transition-transform group-hover:rotate-45" />
        All components <ArrowUpRight className="size-4" />
      </Link>
    </div>
  );
}
