import { ArrowUpRight, Check } from "lucide-react";
import { NyxLogo } from "@/components/global/nyx-logo";
import { GlowCard } from "@/registry/ui/glow-card";
import { MorphLink } from "@/components/ui/morph-link";

const cardContent = (
  <>
    <p className="m-0 flex items-center gap-1.5 text-foreground">
      <NyxLogo aria-hidden="true" className="size-4 text-brand" />
      npx @nyxui add glow-card
    </p>
    <ul className="mt-2 flex list-none flex-col gap-1 p-0">
      <li className="m-0 flex items-center gap-1.5 text-foreground">
        <Check aria-hidden="true" className="size-3 text-brand" />
        Fetched glow-card from registry
      </li>
      <li className="m-0 flex items-center gap-1.5 text-foreground">
        <Check aria-hidden="true" className="size-3 text-brand" />
        Added magnetic-button
      </li>
      <li className="m-0 flex items-center gap-1.5 text-foreground">
        <Check aria-hidden="true" className="size-3 text-brand" />
        Dependencies up to date
      </li>
    </ul>
    <p className="mt-2 text-foreground/50">
      Installed: <span className="text-foreground">3 components in 2.1s</span>
    </p>
  </>
);

export function LandingCta(): React.ReactElement {
  return (
    <section className="group relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      <div className="relative mx-auto grid lg:min-h-80 max-w-295 border-x border-border/60 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col justify-between px-6 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14 lg:gap-8">
          <h2 className="max-w-4xl text-3xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl">
            Less code more impact
            <br />
            ship something{" "}
            <span className="text-brand font-caveat text-5xl sm:text-6xl md:text-7xl">
              today
            </span>
            .
          </h2>

          <MorphLink
            href="mailto:jaiswalmihir.business@gmail.com"
            className="self-start mt-4 md:mt-2"
          >
            <div className="flex items-center gap-1">
              <span>Get in touch</span>{" "}
              <ArrowUpRight className="inline size-4" />
            </div>
          </MorphLink>
        </div>

        <div className="relative hidden lg:block overflow-hidden">
          <div className="absolute left-3 top-16 transition-transform duration-150 ease-in group-hover:-rotate-2 group-hover:scale-[1.02]">
            <GlowCard
              variant="liquid"
              liquidColor="#ffb08a"
              intensity={0.4}
              allowCustomBackground
              className="h-105 w-90 rounded-xl bg-muted/80 p-4 font-mono text-xs border border-border/60 dark:hidden"
            >
              {cardContent}
            </GlowCard>
            <GlowCard
              variant="liquid"
              liquidColor="#ff6a2a"
              intensity={0.2}
              allowCustomBackground
              className="hidden h-105 w-90 rounded-xl bg-muted/80 p-4 font-mono text-xs border border-border/60 dark:block"
            >
              {cardContent}
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
}
