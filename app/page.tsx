import { ComponentBentoGrid } from "@/components/landing/bento/ComponentBentoGrid";
import { LandingCta } from "@/components/landing/cta/LandingCta";
import { FeaturesGrid } from "@/components/landing/features/FeaturesGrid";
import { Landing } from "@/components/landing/Landing";
import { PlaygroundShowcase } from "@/components/landing/playground/PlaygroundShowcase";
import { componentRegistry } from "@/components/playground/registry";
import { componentsData } from "@/registry/Data";

export default function Home() {
  const components = Object.entries(componentRegistry).map(
    ([slug, component]) => {
      const componentData = componentsData.components[slug];

      return {
        slug,
        name: componentData?.title ?? component.name,
        image: componentData?.image,
        heroImage: componentData?.heroImage,
      };
    },
  );

  return (
    <div
      data-home-page
      className="flex flex-1 flex-col gap-12 overflow-hidden dark:bg-black"
    >
      <Landing components={components} />
      <ComponentBentoGrid />
      <PlaygroundShowcase />
      <FeaturesGrid />
      <LandingCta />
    </div>
  );
}
