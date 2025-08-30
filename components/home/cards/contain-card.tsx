import Link from 'next/link';
import { componentsData } from '@/registry/Data';
import TextureCard, { TextureCardContent, TextureCardDescription, TextureCardTitle } from './texture-card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import blocks from '../../../public/assets/images/landing-page/blocks.png'
import temlplates from '../../../public/assets/images/landing-page/templates.png'
import components from '../../../public/assets/images/landing-page/components.png'

export default function ContainCard() {
  // Calculate counts dynamically from imported data
  const componentCount = Object.keys(componentsData.components).length;
  const templateCount = Object.keys(componentsData.templates).length;
  const blocksCount = Object.keys(componentsData.blocks).length;

  const projects = [
    {
      id: 1,
      title: "Components",
      description: "A collection of modern componets that are ready to be used in your next project.",
      image: components,
      quantity: componentCount.toString(),
      route: "/components"
    },
    {
      id: 2,
      title: "Templates",
      description: "Modern Landing page templates, including a portfolio, saas, and more coming soon.",
      image: temlplates,
      quantity: templateCount.toString(),
      route: "/templates"
    },
    {
      id: 3,
      title: "Blocks",
      description: "Explore modern and responsive UI blocks designed for various use cases.",
      image: blocks,
      quantity: blocksCount.toString(),
      route: "/blocks"
    },
  ];

  return (
    <div className="py-8 px-6 xl:px-22 xl:container mx-auto">
      <div className="mx-auto relative z-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Explore Our Collection
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Discover a curated set of production-ready components, templates, and UI blocks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div key={project.id} className="group">
              {project.route ? (
                <Link href={project.route} className="cursor-pointer block">
                  <TextureCard
                    className={`
                    h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-xl
                    rounded-[24px] dark:bg-neutral-900 bg-neutral-50 p-2 no-underline shadow-sm border-2xl
                    transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900/70 
                    shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]
                    dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]
                    [&>div]:border-transparent [&>div>div]:border-transparent [&>div>div>div]:border-transparent [&>div>div>div>div]:border-transparent
                    [&>div>div>div>div]:bg-transparent
                  `}
                  >
                    <TextureCardContent className="p-0">
                      {/* Project Image using aspect ratio instead of fixed height */}
                      <div
                        className={`
                        relative aspect-[4/3] w-full rounded-[20px] mb-6 overflow-hidden
                        shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]
                        dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]
                      `}
                      >
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} preview`}
                          fill
                          quality={100}
                          loading='lazy'
                          placeholder='blur'
                          className="rounded-[16px] object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Complex shadow overlay like MinimalCard */}
                        <div className="absolute inset-0 rounded-[16px]">
                          <div
                            className={`
                            absolute inset-0 rounded-[16px]
                            shadow-[0px_0px_0px_1px_rgba(0,0,0,.07),0px_0px_0px_3px_#fff,0px_0px_0px_4px_rgba(0,0,0,.08)]
                            dark:shadow-[0px_0px_0px_1px_rgba(0,0,0,.07),0px_0px_0px_3px_rgba(100,100,100,0.3),0px_0px_0px_4px_rgba(0,0,0,.08)]
                          `}
                          />
                          <div
                            className={`
                            absolute inset-0 rounded-[16px]
                            dark:shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15),0px_1px_1px_0px_rgba(0,0,0,0.15)_inset,0px_0px_0px_1px_rgba(0,0,0,0.15)_inset,0px_0px_1px_0px_rgba(0,0,0,0.15)]
                          `}
                          />
                        </div>

                        {/* Badge */}
                        <Badge
                          className={`absolute bottom-3 right-3 bg-zinc-800 text-white group-hover:text-blue-400 font-medium px-3 py-1`}
                        >
                          {project.quantity}
                        </Badge>
                      </div>

                      {/* Project Info with MinimalCard styling */}
                      <div className="px-1 pb-2">
                        <TextureCardTitle className="text-lg mt-2 font-semibold leading-tight px-0 text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </TextureCardTitle>
                        <TextureCardDescription className="text-sm text-neutral-500 pb-2 px-0 leading-relaxed">
                          {project.description}
                        </TextureCardDescription>
                      </div>
                    </TextureCardContent>
                  </TextureCard>
                </Link>
              ) : (
                <div className="cursor-not-allowed">
                  <TextureCard
                    className={`
                    h-full transition-all duration-300 opacity-75
                    rounded-[24px] dark:bg-neutral-900 bg-neutral-50 p-2 no-underline shadow-sm border-2xl
                    shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]
                    dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]
                    [&>div]:border-transparent [&>div>div]:border-transparent [&>div>div>div]:border-transparent [&>div>div>div>div]:border-transparent
                    [&>div>div>div>div]:bg-transparent
                  `}
                  >
                    <TextureCardContent className="p-0">
                      {/* Project Image using aspect ratio instead of fixed height */}
                      <div
                        className={`
                        relative aspect-[4/3] w-full rounded-[20px] mb-6 overflow-hidden
                        shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]
                        dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]
                      `}
                      >
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} preview`}
                          fill
                          quality={100}
                          loading='lazy'
                          className="rounded-[16px] object-cover"
                        />

                        {/* Complex shadow overlay like MinimalCard */}
                        <div className="absolute inset-0 rounded-[16px]">
                          <div
                            className={`
                            absolute inset-0 rounded-[16px]
                            shadow-[0px_0px_0px_1px_rgba(0,0,0,.07),0px_0px_0px_3px_#fff,0px_0px_0px_4px_rgba(0,0,0,.08)]
                            dark:shadow-[0px_0px_0px_1px_rgba(0,0,0,.07),0px_0px_0px_3px_rgba(100,100,100,0.3),0px_0px_0px_4px_rgba(0,0,0,.08)]
                          `}
                          />
                          <div
                            className={`
                            absolute inset-0 rounded-[16px]
                            dark:shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15),0px_1px_1px_0px_rgba(0,0,0,0.15)_inset,0px_0px_0px_1px_rgba(0,0,0,0.15)_inset,0px_0px_1px_0px_rgba(0,0,0,0.15)]
                          `}
                          />
                        </div>

                        {/* Badge */}
                        <Badge
                          className={`absolute bottom-3 right-3 bg-zinc-800 text-white font-medium px-3 py-1`}
                        >
                          {project.quantity}
                        </Badge>
                      </div>

                      {/* Project Info with MinimalCard styling */}
                      <div className="px-1 pb-2">
                        <TextureCardTitle className="text-lg mt-2 font-semibold leading-tight px-0 text-neutral-900 dark:text-neutral-100">
                          {project.title}
                        </TextureCardTitle>
                        <TextureCardDescription className="text-sm text-neutral-500 pb-2 px-0 leading-relaxed">
                          {project.description}
                        </TextureCardDescription>
                      </div>
                    </TextureCardContent>
                  </TextureCard>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}