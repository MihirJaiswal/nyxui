import { ArrowUpRight } from "lucide-react";
import { siteLinks } from "@/lib/links";
import { MorphLink } from "@/components/ui/morph-link";

export function PlaygroundShowcase(): React.ReactElement {
  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 border-b border-border/60">
      <div className="relative mx-auto max-w-295 border-x border-border/60">
        <div className="grid gap-8 border-b border-border/60 px-6 py-16 md:grid-cols-[1fr_0.8fr] md:px-12 md:py-20">
          <div>
            <p className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand">
              The Nyx playground
            </p>
            <h2 className="max-w-xl text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
              A playground,
              <br />
              <span className="text-foreground/65">
                not a{" "}
                <span className="font-caveat text-brand text-6xl">
                  showroom.
                </span>
              </span>
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p className="max-w-lg text-base leading-7 text-muted-foreground">
              Choose any component, tune its props, test every state, and copy
              production-ready code without leaving the canvas.
            </p>
            <MorphLink href={siteLinks.playground} className="mt-7 w-fit">
              <div className="flex items-center gap-1">
                <span>Open the playground</span>
                <ArrowUpRight className="inline size-4" />
              </div>
            </MorphLink>
          </div>
        </div>

        <div>
          <div className="w-[91.5%] mx-auto">
            <video
              src="/assets/videos/playground-demo-dark.mp4"
              className="w-full"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </div>
        </div>
      </div>
    </section>
  );
}
