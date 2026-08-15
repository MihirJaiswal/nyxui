import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteLinks } from "@/lib/links";
import { PlaygroundDemo } from "./PlaygroundDemo";

const WORKFLOW = ["Choose", "Tune", "Ship"] as const;

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
              not a <span className="font-caveat text-brand text-6xl">showroom.</span>
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p className="max-w-lg text-base leading-7 text-muted-foreground">
              Choose any component, tune its props, test every state, and copy
              production-ready code without leaving the canvas.
            </p>
            <Link
              href={siteLinks.playground}
              className="group mt-7 inline-flex w-fit items-center gap-2 text-sm text-foreground transition-colors hover:text-brand"
            >
              <span className="size-2.5 bg-brand" />
              Open the playground
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="px-4 py-8 sm:px-8 sm:py-10 md:px-12">
        </div>

        <ol className="grid border-t border-border/60 sm:grid-cols-3 sm:divide-x sm:divide-border/60">
          {WORKFLOW.map((step, index) => (
            <li
              key={step}
              className="flex items-center gap-4 border-b border-border/60 px-6 py-5 last:border-b-0 sm:border-b-0"
            >
              <span className="font-mono text-[10px] text-brand">
                0{index + 1}
              </span>
              <span className="text-sm text-foreground/70">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
