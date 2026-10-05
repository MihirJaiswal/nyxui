import { Metadata } from "next";
import { absoluteUrl } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { siteLinks } from "@/lib/links";
import { MorphLink } from "@/components/ui/morph-link";
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
      "Every component in this library is designed and built together. When you copy a component into your app, those decisions come with the code.",

      "That means you are not starting with a blank canvas full of defaults. You get a component that already has a point of view, with the small details figured out and the different states working together.",

      "Of course, you can change anything you want. The difference is that you are building on top of something intentional instead of having to make all those decisions yourself. You start with something that already feels good, then make it yours.",

      "That is really the idea behind the library. Design and engineering are not treated as separate layers. Every component is made with both in mind, so it looks right, behaves right and works well in a real product.",
    ],
  },
];

const SECTION_IDS = SECTIONS.map((_, i) => `de-section-${i + 1}`) as string[];

export default function DesignEngineeringPage(): React.ReactElement {
  return (
    <main className="relative min-h-dvh w-full overflow-x-clip bg-background">
      <div className="relative z-10 mx-auto max-w-295 border-border/60 bg-background lg:border-x">
        {/* Header */}
        <header className="relative left-1/2 -ml-[50vw] w-screen border-b border-border/60">
          <div className="mx-auto max-w-295 px-6 py-16 md:py-20 lg:px-12">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-widest text-brand">
              Design engineering
            </p>
            <h1
              id="de-heading"
              className="max-w-3xl text-4xl leading-tight font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              Design and code,
              <br />
              one{" "}
              <span className="font-caveat text-brand text-5xl sm:text-6xl md:text-7xl">
                discipline.
              </span>
            </h1>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Why the most considered interfaces are built by people who can do
              both, and how that thinking shapes every component in Nyx UI.
            </p>
          </div>
        </header>

        {/* Sticky image + scrolling article */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* Tiled image — sticks on lg while the article scrolls */}
          <div className="border-b border-border/60 lg:border-b-0">
            <div className="p-6 lg:sticky lg:top-13 lg:p-10">
              <TiledImage className="mx-auto max-w-md" />
            </div>
          </div>

          {/* Article body */}
          <article className="divide-y divide-border/60 border-l border-border/60">
            {SECTIONS.map((section, i) => (
              <section
                key={section.heading}
                id={SECTION_IDS[i]}
                className="scroll-mt-20 px-6 py-12 sm:px-10 md:px-12 md:py-[57.5px]"
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
        </div>

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
