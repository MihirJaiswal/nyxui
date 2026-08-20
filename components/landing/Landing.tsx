import { LandingComponent } from "@/types/landing";
import { LandingHeroIntro } from "./hero/LandingHeroIntro";
import { ComponentCompass } from "./hero/ComponentCompass";
import { LandingFeatureGrid } from "./hero/LandingFeatureGrid";

interface LandingHeroProps {
  components: LandingComponent[];
}

export function Landing({ components }: LandingHeroProps): React.ReactElement {
  return (
    <section className="relative max-w-295 mx-auto">
      <div className="relative">
        <div className="border-x border-border/60 pt-32 sm:pt-36">
          <LandingHeroIntro />
          <ComponentCompass components={components} />
        </div>
        <LandingFeatureGrid />
      </div>
    </section>
  );
}
