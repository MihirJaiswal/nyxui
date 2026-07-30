import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  TextureCard (inlined from components/home/cards/texture-card.tsx)  */
/* ------------------------------------------------------------------ */

const TextureCardStyled = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[24px] border border-white/60 dark:border-stone-950/60",
      "bg-gradient-to-b dark:from-neutral-800 dark:to-neutral-900 from-neutral-100 to-white/70",
      className,
    )}
    {...props}
  >
    <div className="rounded-[23px] border dark:border-neutral-900/80 border-black/10">
      <div className="rounded-[22px] border dark:border-neutral-950 border-white/50">
        <div className="rounded-[21px] border dark:border-neutral-900/70 border-neutral-950/20">
          <div className="w-full border border-white/50 dark:border-neutral-700/50 rounded-[20px] text-neutral-500">
            {children}
          </div>
        </div>
      </div>
    </div>
  </div>
));
TextureCardStyled.displayName = "TextureCardStyled";

const TextureCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
    variant?: "default" | "minimal";
  }
>(({ className, children, variant = "minimal", ...props }, ref) => {
  if (variant === "minimal") {
    return (
      <div ref={ref} className={cn("rounded-[24px]", className)} {...props}>
        {children}
      </div>
    );
    return null as never;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-white/60 dark:border-border/30",
        "rounded-[calc(var(--radius))]",
        className,
      )}
      {...props}
    >
      <div className="border dark:border-neutral-900/80 border-black/10 rounded-[calc(var(--radius)-1px)]">
        <div className="border dark:border-neutral-950 border-white/50 rounded-[calc(var(--radius)-2px)]">
          <div className="border dark:border-neutral-900/70 border-neutral-950/20 rounded-[calc(var(--radius)-3px)]">
            <div className="w-full border border-white/50 dark:border-neutral-700/50 text-neutral-500 bg-gradient-to-b from-card/70 to-secondary/50 rounded-[calc(var(--radius)-4px)]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
TextureCard.displayName = "TextureCard";

const TextureCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-tight text-neutral-900 dark:text-neutral-100 pl-2",
      className,
    )}
    {...props}
  />
));
TextureCardTitle.displayName = "TextureCardTitle";

const TextureCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-neutral-600 dark:text-neutral-400 pl-2",
      className,
    )}
    {...props}
  />
));
TextureCardDescription.displayName = "TextureCardDescription";

const TextureCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("px-6 py-4", className)} {...props} />
));
TextureCardContent.displayName = "TextureCardContent";

/* ------------------------------------------------------------------ */
/*  Main Cards block                                                    */
/* ------------------------------------------------------------------ */

export function Cards() {
  const projects = [
    {
      id: 1,
      title: "Components",
      description:
        "A collection of modern components that are ready to be used in your next project.",
      image: "https://placehold.co/900x675/2563eb/white?text=Components",
      quantity: "24",
      route: "/components",
    },
    {
      id: 2,
      title: "Templates",
      description:
        "Modern Landing page templates, including a portfolio, saas, and more coming soon.",
      image: "https://placehold.co/900x675/8b5cf6/white?text=Templates",
      quantity: "02",
      route: "/templates",
    },
    {
      id: 3,
      title: "Blocks",
      description:
        "Explore modern and responsive UI blocks designed for various use cases.",
      image: "https://placehold.co/900x675/ec4899/white?text=Blocks",
      quantity: "08",
      route: "/blocks",
    },
  ];

  return (
    <div className="relative py-20 px-6 3xl:px-22">
      <div className="mx-auto relative z-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Explore Our Collection
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Discover a curated set of production-ready components, templates,
            and UI blocks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 4xl:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div key={project.id} className="group">
              {project.route ? (
                <Link href={project.route} className="cursor-pointer block">
                  <TextureCard
                    className={`
                      h-full duration-300 hover:scale-[1.02] hover:shadow-xl
                      rounded-[24px] dark:bg-neutral-900 bg-neutral-50 p-2 no-underline border-2xl
                      transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900/70
                      shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]
                      dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]
                      [&>div]:border-transparent [&>div>div]:border-transparent [&>div>div>div]:border-transparent [&>div>div>div>div]:border-transparent
                      [&>div>div>div>div]:bg-transparent
                    `}
                  >
                    <TextureCardContent className="p-0">
                      <div
                        className={`
                          relative aspect-[4/3] w-full rounded-[20px] mb-6 overflow-hidden
                          shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]
                          dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]
                        `}
                      >
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          loading="lazy"
                          className="rounded-[16px] object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
                        />

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

                        <Badge className="absolute bottom-3 right-3 bg-zinc-800 text-white group-hover:text-blue-400 font-medium px-3 py-1">
                          {project.quantity}
                        </Badge>
                      </div>

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
                      rounded-[24px] dark:bg-neutral-900 bg-neutral-50 p-2 no-underline border-2xl
                      shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]
                      dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]
                      [&>div]:border-transparent [&>div>div]:border-transparent [&>div>div>div]:border-transparent [&>div>div>div>div]:border-transparent
                      [&>div>div>div>div]:bg-transparent
                    `}
                  >
                    <TextureCardContent className="p-0">
                      <div
                        className={`
                          relative aspect-[4/3] w-full rounded-[20px] mb-6 overflow-hidden
                          shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]
                          dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]
                        `}
                      >
                        <img
                          src={project.image}
                          alt={`${project.title} preview`}
                          loading="lazy"
                          className="rounded-[16px] object-cover w-full h-full"
                        />

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

                        <Badge className="absolute bottom-3 right-3 bg-zinc-800 text-white font-medium px-3 py-1">
                          {project.quantity}
                        </Badge>
                      </div>

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
