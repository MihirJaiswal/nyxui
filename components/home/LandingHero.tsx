import { ComponentCompass } from "./landing/ComponentCompass";
import { LandingFeatureGrid } from "./landing/LandingFeatureGrid";
import { LandingHeroIntro } from "./landing/LandingHeroIntro";
import type { LandingComponent } from "./landing/types";

export type { LandingComponent } from "./landing/types";

interface LandingHeroProps {
  components: LandingComponent[];
}

export function LandingHero({
  components,
}: LandingHeroProps): React.ReactElement {
  return (
    <section className="relative max-w-295 mx-auto">
      <div className="relative">
        <div className="border-x border-border/60 pt-36">
          <LandingHeroIntro />
          <ComponentCompass components={components} />
        </div>
        <LandingFeatureGrid />
      </div>
    </section>
  );
}
