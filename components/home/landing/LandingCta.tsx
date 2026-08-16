import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteLinks } from "@/lib/links";
import AnimatedLogo from "@/components/home/newsletter/animated-logo";

export function LandingCta(): React.ReactElement {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2">
      <div className="relative mx-auto grid min-h-80 max-w-295 border-x border-border/60 md:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col justify-between px-6 py-10 sm:px-10 sm:py-12 md:px-12 md:py-14">
          <h2 className="max-w-4xl text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl">
            Got an interface in mind?
            <br />
            <span className="text-foreground/65">
              Let&apos;s make it feel{" "}
              <span className="text-brand font-caveat text-7xl">alive</span>.
            </span>
          </h2>

          <Link
            href={siteLinks.playground}
            className="group mt-16 inline-flex w-fit items-center gap-3 text-sm font-medium text-foreground sm:mt-20"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-brand text-white transition-colors group-hover:bg-brand/85">
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </span>
            Open playground
          </Link>
        </div>

        <div className="relative flex min-h-72 items-center justify-center overflow-hidden border-t border-border/60 md:min-h-0 md:border-t-0 md:border-l">
          <div className="size-32 sm:size-36">
            <AnimatedLogo
              className="h-full w-full text-black dark:text-white"
              fillStartRatio={0}
              strokeClassName="stroke-brand"
              strokeOnly
              strokeFadeDurationMs={500}
              strokeWidth={14}
              durationMs={14000}
              fadeMs={900}
              threshold={0.5}
              triggerOnce
            />
          </div>
        </div>
      </div>
    </section>
  );
}
