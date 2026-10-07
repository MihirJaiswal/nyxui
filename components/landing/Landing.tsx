import { LandingComponent } from "@/types/landing";
import { LandingBackdrop } from "./hero/LandingBackdrop";
import { LandingHeroIntro } from "./hero/LandingHeroIntro";
import { ComponentCompass } from "./hero/ComponentCompass";
import { LandingFeatureGrid } from "./hero/LandingFeatureGrid";
import { LandingActions } from "./hero/LandingActions";

interface LandingHeroProps {
  components: LandingComponent[];
}

export function Landing({ components }: LandingHeroProps): React.ReactElement {
  return (
    <section
      className="relative max-w-295
     mx-auto border-x border-border/60"
    >
      <div className="relative overflow-x-clip">
        <LandingBackdrop />
        <div className="relative pt-32 sm:pt-40">
          <LandingHeroIntro />
          <ComponentCompass components={components} />
        </div>
        <LandingActions />
        <LandingFeatureGrid />
      </div>
    </section>
  );
}
