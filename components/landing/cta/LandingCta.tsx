import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
              <span className="text-brand font-caveat text-5xl sm:text-6xl md:text-7xl">
                alive
              </span>
              .
            </span>
          </h2>

          <Link
            href="mailto:jaiswalmihir.business@gmail.com"
            className="group inline-flex items-center gap-2 text-sm text-foreground/75 transition-colors hover:text-foreground"
          >
            <span className="size-3 bg-brand transition-transform group-hover:rotate-45" />
            Get in touch <ArrowUpRight className="size-4" />
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
