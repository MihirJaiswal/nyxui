import { LandingHero } from "@/components/home/LandingHero";
import { ComponentBentoGrid } from "@/components/home/landing/ComponentBentoGrid";
import { LandingCta } from "@/components/home/landing/LandingCta";
import { PlaygroundShowcase } from "@/components/home/landing/PlaygroundShowcase";
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
      };
    },
  );

  return (
    <div
      data-home-page
      className="flex flex-1 flex-col overflow-hidden dark:bg-black"
    >
      <LandingHero components={components} />
      <ComponentBentoGrid />
      <PlaygroundShowcase />
      <LandingCta />
    </div>
  );
}
