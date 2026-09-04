import { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { siteLinks } from "@/lib/links";
import { MorphLink } from "@/components/ui/morph-link";
import { LandingBackdrop } from "@/components/landing/hero/LandingBackdrop";
import { TiledImage } from "@/components/landing/features/TiledImage";

export const metadata: Metadata = {
  title: "Nyx UI | Design Engineering",
  description:
    "What design engineering is, why it matters, and how Nyx UI is built around it.",
  keywords: [
    "design engineering",
    "design engineer",
    "ui engineering",
    "design systems",
    "nyx ui",
  ],
  openGraph: {
    title: "Design Engineering at Nyx UI",
    description:
      "What design engineering is, why it matters, and how it's built into every Nyx UI component.",
    url: absoluteUrl("/design-engineering"),
    siteName: "Nyx UI",
  },
  alternates: {
    canonical: absoluteUrl("/design-engineering"),
  },
};

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "What is design engineering",
    body: [
      "Design engineering is what happens when one person owns both the mockup and the code that ships it. A design engineer thinks in systems, things like spacing scales, motion curves and state machines, and then writes the actual UI instead of handing a picture of it to someone else.",
      "The discipline sits where Figma ends and the browser begins. That territory used to belong to nobody. Designers shipped files, engineers shipped features, and everything in between, the hover states, the easing, the way a dialog settles into place, got decided by whoever happened to be holding the ticket.",
      "The title is new but the work is not. People have been doing it under names like UX engineering, creative development and prototyping for years, usually without getting noticed or paid for it. Calling it design engineering just made the job visible enough to hire for.",
    ],
  },
  {
    heading: "Why it matters",
    body: [
      "Most UI debt is translation debt. A design specifies 24px of space and a certain feel for how a menu should open. Somewhere in the handoff that becomes mt-4 and a default tween. One screen survives it. A whole product does not.",
      "The further a decision travels from the person who made it, the more of the decision gets lost. Design engineering shortens that distance to zero. The person who chose the easing curve is the person who writes the transition, so nothing gets approximated on the way to production.",
      "There is also a speed argument. A prototype built in real code answers questions a static mockup cannot: does this feel right at 60fps, does it hold up with real data, does the motion survive contact with actual content. Teams that prototype this way learn faster because they test the real thing.",
    ],
  },
  {
    heading: "How Nyx UI is built around it",
    body: [
      "Every component in this library is designed and engineered together. States, spacing, radii and motion are tuned by hand, then frozen into the component, so the decisions travel with the code when you copy it into your app.",
      "Because the behavior is baked in, you start from an intentional baseline instead of a default one. You can still override anything, but you are editing something that was already designed to work, not filling in gaps that were never decided.",
      "That is the whole promise: components that respect both sides of the craft, the design system they came from and the engineering constraints they run under, because the same pair of hands built both sides.",
    ],
  },
];

export default function DesignEngineeringPage(): React.ReactElement {
  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-background">
      <LandingBackdrop />
      <div
        className="relative z-10 mx-auto lg:
      
      max-w-212 lg:border-x border-border/60 bg-background"
      >
        {/* Header */}
        <header className="border-b lg:border-y border-border/60 px-6 py-16  lg:px-12 md:py-11.75 lg:mt-15">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-widest text-brand">
            Design engineering
          </p>
          <h1 className="max-w-3xl text-4xl leading-tight font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Design and code,
            <br />
            <span className="font-caveat text-brand text-5xl sm:text-6xl md:text-7xl">
              one discipline.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            Why the most considered interfaces are built by people who can do
            both, and how that thinking shapes every component in Nyx UI.
          </p>
        </header>

        {/* Tiled image */}
        <div className="flex items-center justify-center sm:p-10 border-b border-border/60">
          <TiledImage />
        </div>

        {/* Article body */}
        <article className="divide-y divide-border/60">
          {SECTIONS.map((section) => (
            <section
              key={section.heading}
              className="px-6 py-12 sm:px-10 md:px-12 md:py-16"
            >
              <h2 className="mb-5 text-xl font-medium tracking-tight text-foreground">
                {section.heading}
              </h2>
              <div className="flex max-w-2xl flex-col gap-4">
                {section.body.map((para, i) => (
                  <p
                    key={i}
                    className="text-base leading-7 text-muted-foreground"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>

        {/* Footer CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-border/60 px-6 py-10 sm:px-10 md:px-12 gap-4">
          <p className="max-w-md text-sm text-muted-foreground">
            See design engineering in practice
          </p>
          <MorphLink href={siteLinks.components} className="w-fit shrink-0">
            <div className="flex items-center gap-1">
              <span>Browse components</span>
              <ArrowUpRight className="inline size-4" />
            </div>
          </MorphLink>
        </div>
      </div>
    </main>
  );
}
