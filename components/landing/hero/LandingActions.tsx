import { ArrowUpRight } from "lucide-react";
import { siteLinks } from "@/lib/links";
import { MorphLink } from "@/components/ui/morph-link";

export function LandingActions(): React.ReactElement {
  return (
    <div className="flex justify-center border-b border-border/60 py-7">
      <MorphLink href={siteLinks.components}>
        <div className="flex items-center gap-1">
          <span>All components</span>
          <ArrowUpRight className="inline size-4" />
        </div>
      </MorphLink>
    </div>
  );
}
