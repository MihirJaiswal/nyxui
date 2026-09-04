import { BentoGrid } from "./bento-grid";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { TwitterCard } from "./TweetCard";
import Blob from "./Blob";
import { TerminalKeyboardDemo } from "./keybord-termial";
import { Button } from "@/components/ui/button";
import DownloadCompleteSection from "./ProgressSteps";
import AnimatedChatDemo from "./Chat";
import { LazySparkles } from "./Sparkles";

export const ComponentsDemo = () => {
  return (
    <div className="container flex flex-col items-center justify-center mx-auto px-6 lg:px-12 xl:px-22 py-20">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl sm:text-5xl text-center lg:text-5xl font-extrabold tracking-tight leading-tight text-foreground">
          Component Demos
        </h2>
        <h3 className="mx-auto mb-8 mt-2 text-balance text-center text-base md:text-lg font-medium tracking-tight text-muted-foreground">
          These are a few components that you can easily plug into your next
          project.
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <BentoGrid
          className="md:col-span-2 overflow-hidden rounded-2xl border border-border/60 h-[480px]"
          enableDescription={false}
          enableTitle={false}
          height="h-full"
          component={<TerminalKeyboardDemo />}
        />
        <BentoGrid
          className="rounded-2xl overflow-hidden border border-border/60"
          height="h-full"
          enableDescription={false}
          enableTitle={false}
          component={
            <>
              <div className="w-full h-full flex items-center justify-center bg-muted/30 relative">
                <Blob />
              </div>
              <div className="absolute -bottom-68 h-full w-full max-w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,hsl(var(--foreground)/0.15),transparent_90%)] before:opacity-40 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[10%] after:border-t after:border-border/40 after:bg-muted/40">
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <LazySparkles />
                </div>
              </div>
            </>
          }
        />
        <BentoGrid
          className="rounded-2xl sm:p-4 p-0 md:p-0 overflow-hidden border border-border/60 bg-muted/30"
          height="h-full"
          enableDescription={false}
          enableTitle={false}
          component={<TwitterCard />}
        />
        <BentoGrid
          enableDescription={false}
          enableTitle={false}
          height="h-110"
          className="rounded-2xl flex items-start justify-end border border-border/60 tracking-wider"
          component={<AnimatedChatDemo />}
        />
        <BentoGrid
          enableDescription={false}
          enableTitle={false}
          height="h-full"
          className="rounded-2xl bento-download-trigger !p-0 overflow-hidden bg-background border border-border/60"
          component={
            <div className="h-full flex !p-0 items-center justify-center">
              <DownloadCompleteSection />
            </div>
          }
        />
      </div>
      <div className="relative mt-12 flex w-full flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 px-8">
        <Link href="/components" rel="noopener noreferrer">
          <Button
            size="lg"
            className="h-12 w-full sm:w-52 rounded-xl bg-foreground text-background hover:bg-foreground/90"
          >
            <span>All Components</span>
            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
