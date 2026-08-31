import { ArrowUpRight } from "lucide-react";
import { siteLinks } from "@/lib/links";
import { MorphLink } from "@/components/ui/morph-link";

export function LandingActions(): React.ReactElement {
  return (
    <div className="flex justify-center border-b w-screen border-border/60 py-7 left-1/2 relative -translate-x-1/2">
      <MorphLink href={siteLinks.components}>
        <div className="flex items-center gap-1">
          <span>All components</span>
          <ArrowUpRight className="inline size-4" />
        </div>
      </MorphLink>
    </div>
  );
}
