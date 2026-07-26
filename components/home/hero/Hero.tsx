import Link from "next/link";
import { ArrowRight, Blocks, ChevronRight } from "lucide-react";
import TechStack from "./Tech";
import SocialProof from "./Social-proof";
import GlassMusicPlayer from "./GlassMusicPlayer";
import { Scanner } from "./Scanner";
import { Matrix } from "./Matrix";
import AnimatedCodeBlockDemo from "./CodeBlock";
import { getRegistryCounts } from "@/lib/registry";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "./AnimatedBackground";

function Hero() {
  const {
    components: componentCount,
    templates: templateCount,
    blocks: blockCount,
  } = getRegistryCounts();
  const hasBlocks = blockCount > 0;

  return (
    <section className="relative px-6 xl:px-22 py-12 sm:py-16 md:py-20 lg:pt-28 lg:pb-20 flex flex-col xl:flex-row xl:container mx-auto">
      <div className="w-full xl:flex-1 xl:container xl:mx-auto z-10">
        <div className="xl:max-w-5xl mt-6 sm:mt-8 lg:mt-12">
          {/* Announcement Badge */}
          <div className="flex items-start justify-center lg:justify-start relative">
            <Badge
              variant="secondary"
              className="mb-4 sm:mb-6 group cursor-pointer inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-medium"
            >
              <Blocks className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                New! <span className="hidden sm:inline">Playground</span>
              </span>
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
            </Badge>
          </div>

          {/* Massive Typography */}
          <h1 className="mb-6 text-[2.6rem] sm:text-7xl lg:text-[4.5rem] font-black leading-[1.1] md:leading-[0.95] tracking-tighter relative z-1 sm:text-center lg:text-left">
            <span className="relative text-foreground">Next</span>
            <br />
            <span className="text-foreground">Generation</span>
            <br />
            <span className="relative text-foreground">
              UI Components
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
                .
              </span>
            </span>
          </h1>

          {/* Description */}
          <div className="mb-6 max-w-2xl sm:mx-auto lg:mx-0 flex items-center justify-start sm:justify-center lg:justify-start">
            <p className="text-base sm:text-center lg:text-left sm:text-lg md:text-xl text-muted-foreground leading-relaxed relative z-1">
              Easily plug in the latest trending components and build stunning
              websites without stressing over design consistency or animations.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="relative z-10 mt-6 sm:mt-8 lg:mt-10 xl:mt-6 flex w-full flex-col justify-start sm:justify-center lg:justify-start space-y-2.5 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link href="/components" rel="noopener noreferrer">
              <Button
                size="lg"
                className="h-12 w-full sm:w-52 rounded-xl bg-foreground text-background hover:bg-foreground/90"
              >
                <span>Browse Components</span>
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>

            <Link href="/docs" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="h-12 w-full sm:w-52 rounded-xl border-border/60 bg-background text-foreground hover:bg-muted"
              >
                Documentation
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom section - responsive layout */}
        <div className="flex flex-col lg:flex-row flex-wrap lg:items-end lg:justify-between xl:justify-start mt-14 lg:gap-y-12 xl:gap-12 sm:mt-16 lg:mt-18 z-1 xl:scale-95 xl:-ml-8 relative">
          <div className="mb-10 lg:mb-0">
            <p className="text-muted-foreground text-sm sm:text-[14.5px] mb-4 text-center lg:text-left">
              Trusted by many developers
            </p>
            <SocialProof />
          </div>

          {/* TechStack - Show on lg and above, hide on xl with custom classes */}
          <div className="hidden lg:block xl:hidden">
            <TechStack />
          </div>
          <div className="hidden xl:block xl:-12">
            <TechStack />
          </div>

          {/* Navigation menu - responsive with dynamic data */}
          <div className="flex flex-wrap mt-12 lg:mt-0 gap-4 sm:gap-x-6 font-mono relative z-10 justify-center lg:justify-start">
            <Link
              href="/components"
              className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <span className="text-base sm:text-lg">
                {componentCount.toString().padStart(2, "0")} components
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/templates"
              className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <span className="text-base sm:text-lg">
                {templateCount.toString().padStart(2, "0")} templates
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            {hasBlocks && (
              <Link
                href="/blocks"
                className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <span className="text-base sm:text-lg">
                  {blockCount.toString().padStart(2, "0")} blocks
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Animated Organic Flowing Gradient */}
        <AnimatedBackground />
      </div>

      {/* Right Column Visuals */}
      <div className="hidden xl:flex xl:w-[45%] xl:flex-col xl:items-end xl:justify-center xl:gap-6 relative z-10">
        <div className="relative w-full max-w-md">
          <GlassMusicPlayer />
        </div>
        <div className="relative w-full max-w-md">
          <Scanner />
        </div>
        <div className="relative w-full max-w-md">
          <Matrix />
        </div>
        <div className="relative w-full max-w-md">
          <AnimatedCodeBlockDemo />
        </div>
      </div>
    </section>
  );
}

export default Hero;
