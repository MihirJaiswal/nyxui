import Link from "next/link";
import { getRegistryCounts } from "@/lib/registry";
import TextureCard, {
  TextureCardContent,
  TextureCardDescription,
  TextureCardTitle,
} from "./texture-card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import blocks from "@/public/assets/images/landing-page/blocks.png";
import temlplates from "@/public/assets/images/landing-page/templates.png";
import components from "@/public/assets/images/landing-page/components.png";

export default function ContainCard() {
  const {
    components: componentCount,
    templates: templateCount,
    blocks: blocksCount,
  } = getRegistryCounts();

  const projects = [
    {
      id: 1,
      title: "Components",
      description:
        "A collection of modern components that are ready to be used in your next project.",
      image: components,
      quantity: componentCount.toString(),
      route: "/components",
    },
    {
      id: 2,
      title: "Templates",
      description:
        "Modern Landing page templates, including a portfolio, saas, and more coming soon.",
      image: temlplates,
      quantity: templateCount.toString(),
      route: "/templates",
    },
    {
      id: 3,
      title: "Blocks",
      description:
        "Explore modern and responsive UI blocks designed for various use cases.",
      image: blocks,
      quantity: blocksCount.toString(),
      route: "/blocks",
    },
  ];

  return (
    <div className="py-20 px-6 xl:px-22 xl:container mx-auto">
      <div className="mx-auto relative z-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Explore Our Collection
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover a curated set of production-ready components, templates,
            and UI blocks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group">
              <Link href={project.route} className="cursor-pointer block">
                <TextureCard className="h-full rounded-2xl bg-card border border-border/60 p-2 transition-colors hover:bg-muted/30">
                  <TextureCardContent className="p-0">
                    <div className="relative aspect-4/3 w-full rounded-xl mb-6 overflow-hidden border border-border/60">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={`${project.title} preview`}
                        height={1200}
                        width={900}
                        loading="lazy"
                        placeholder="blur"
                        className="rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge className="absolute bottom-3 right-3 bg-foreground text-background font-medium px-3 py-1 hover:bg-foreground/90">
                        {project.quantity}
                      </Badge>
                    </div>

                    <div className="px-1 pb-2">
                      <TextureCardTitle className="text-lg mt-2 font-semibold leading-tight px-0 text-foreground transition-colors group-hover:text-[#FF4F11]">
                        {project.title}
                      </TextureCardTitle>
                      <TextureCardDescription className="text-sm text-muted-foreground pb-2 px-0 leading-relaxed">
                        {project.description}
                      </TextureCardDescription>
                    </div>
                  </TextureCardContent>
                </TextureCard>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
