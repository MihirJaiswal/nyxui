import Navbar from "@/components/global/header/Navbar";
import { LandingHero } from "@/components/home/LandingHero";
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
    <div className="flex min-h-screen flex-col dark:bg-black overflow-hidden">
      <Navbar />
      <LandingHero components={components} />
      <PlaygroundShowcase />
    </div>
  );
}
