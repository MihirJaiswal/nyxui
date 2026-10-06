import * as React from "react";
import Image from "next/image";
import { CodeBlockCommand } from "@/components/components/code-block/code-block-command";
import img from "@/public/assets/images/docs/docs-cover.png";

export default function IntroductionPage() {
  return (
    <article className="container mx-auto max-w-6xl py-6">
      <div className="mx-auto max-w-3xl text-pretty">
        {/* Hero */}
        <section id="introduction" className="scroll-mt-24">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            What is Nyx?
          </h1>
          <p className="mt-3 leading-7 text-muted-foreground">
            A premium, copy-paste library for React and Tailwind. Motion-heavy
            components, marketing blocks, animated backgrounds, and full page
            templates, all built to a single standard of craft.
          </p>
          <div className="mt-8 space-y-5 leading-7 text-muted-foreground">
            <p>
              Every piece in the catalog shares the same design language. A
              bento grid, an animated input, a cursor trail, and a whole
              template all come from one place, so anything you pull looks like
              it belongs beside the rest.
            </p>

            {/* Cover */}
            <div className="relative mt-2 overflow-hidden rounded-xl border border-border/60">
              <Image
                src={img}
                alt="Nyx UI Components Preview"
                width={1200}
                height={630}
                loading="lazy"
                placeholder="blur"
                className="w-full"
              />
            </div>
            <p>
              It is copy-paste, and it is yours. Nothing to install, nothing
              wrapping your app. You bring the source into your project and work
              with plain <span className="text-foreground">React</span>,{" "}
              <span className="text-foreground">Tailwind</span>, and a few
              primitives you already know. Read it, change it, keep it.
            </p>
            <p>
              The free components install straight from the shadcn registry. No
              account, no wrapper:
            </p>
          </div>

          <div className="mt-6">
            <CodeBlockCommand
              __npmCommand__={`npx shadcn@latest add "https://nyxui.com/r/glitch-button.json"`}
              __pnpmCommand__={`pnpm dlx shadcn@latest add "https://nyxui.com/r/glitch-button.json"`}
              __yarnCommand__={`yarn shadcn@latest add "https://nyxui.com/r/glitch-button.json"`}
              __bunCommand__={`bunx --bun shadcn@latest add "https://nyxui.com/r/glitch-button.json"`}
            />
          </div>
        </section>

        {/* What's inside */}
        <section
          id="whats-inside"
          className="mt-12 scroll-mt-24 border-t border-border pt-10"
        >
          <h2 className="text-xl font-semibold tracking-tight">
            What&apos;s inside
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Four kinds of building block, one system.
          </p>
          <dl className="mt-6 space-y-6">
            <InsideItem
              term="Components"
              description="The interactive, animated pieces you build screens from. Buttons, cards, cursor effects, OTP flows, and notification primitives, each one animated and ready to drop straight into a project."
            />
            <InsideItem
              term="Blocks"
              description="Full marketing sections: heroes, bento grids, pricing, footers, navigation, testimonials, and auth. The drop-in parts of a landing or product page."
            />
            <InsideItem
              term="Backgrounds"
              description="Full-bleed animated backdrops — bubble fields, grain, matrix rain, ripple effects — dropped behind a hero or section in a single component."
            />
            <InsideItem
              term="Templates"
              description="Complete, multi-section pages, fully wired and responsive, for when you want a finished starting point to customize rather than a single part to assemble."
            />
          </dl>
        </section>

        {/* Philosophy */}
        <section
          id="philosophy"
          className="mt-12 scroll-mt-24 border-t border-border pt-10"
        >
          <h2 className="text-xl font-semibold tracking-tight">Philosophy</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Nyx is opinionated on purpose. Motion is treated as a first-class
            part of the design, not a sprinkle on top. The restraint everywhere
            else — typography, spacing, contrast — is what lets hundreds of
            independent pieces read as the work of one hand.
          </p>
          <ul className="mt-6 space-y-4">
            <PhilosophyItem
              title="Craft over ornament."
              description="Confident type and deliberate whitespace carry the design. No fake dashboards, no filler to look busy."
            />
            <PhilosophyItem
              title="Motion as language."
              description="Interactions are designed, not tacked on. Springs over easings, attention guided not demanded, every animation earning its frame."
            />
            <PhilosophyItem
              title="Primitive-light."
              description="Plain markup, Tailwind, a little Motion, and icons. Libraries only where a component genuinely needs them, so there is less to paste in and less to maintain."
            />
            <PhilosophyItem
              title="You own the code."
              description="You copy real source, not an import. Once it is in your project it is yours to edit, restyle, or strip down."
            />
            <PhilosophyItem
              title="Written for real products."
              description="Responsive, accessible, and dark-mode ready, written the way you would write it by hand rather than as a demo."
            />
          </ul>
          <p className="mt-6 leading-7 text-muted-foreground">
            Pro unlocks the full catalog for one flat purchase —{" "}
            <strong className="font-medium text-foreground">$94 / year</strong>{" "}
            or{" "}
            <strong className="font-medium text-foreground">
              $149 once, lifetime
            </strong>{" "}
            — with access to everything that gets added later. The library keeps
            growing under the same licence.
          </p>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="mt-12 scroll-mt-24 border-t border-border pt-10"
        >
          <h2 className="text-xl font-semibold tracking-tight">FAQ</h2>
          <div className="mt-6 space-y-8">
            <FaqItem
              question="What do I get with Nyx Pro?"
              answer={
                <>
                  The full catalog: every block, component, background, and
                  template, plus lifetime access to everything added after you
                  buy on the lifetime plan. Both options are a single{" "}
                  <strong className="font-medium text-foreground">
                    one-time or yearly purchase
                  </strong>
                  , not a metered subscription.
                </>
              }
            />
            <FaqItem
              question="Are there free components?"
              answer={
                <>
                  Yes. A good portion of the components are free and open,
                  installable straight from the shadcn CLI. Pro unlocks the rest
                  of the catalog and the full page templates.
                </>
              }
            />
            <FaqItem
              question="Do you offer refunds?"
              answer={
                <>
                  No. Nyx Pro is a digital product and all purchases are{" "}
                  <strong className="font-medium text-foreground">
                    final and non-refundable
                  </strong>
                  . Browse the free components first to get a feel for the code
                  and the craft before you buy.
                </>
              }
            />
            <FaqItem
              question="Can I use Nyx Pro in client projects?"
              answer={
                <>
                  Yes, in unlimited personal and client projects. You own the
                  code you copy and never need to credit Nyx.
                </>
              }
            />
            <FaqItem
              question="Can I redistribute or resell it?"
              answer={
                <>
                  No. Redistributing, reselling, or sharing Nyx Pro source is{" "}
                  <strong className="font-medium text-foreground">
                    strictly prohibited
                  </strong>
                  , even with modifications. The licence covers use in your own
                  and client projects only.
                </>
              }
            />
            <FaqItem
              question="Is it suitable for teams or agencies?"
              answer={
                <>
                  Yes, but the licence is per developer. Each person who works
                  with Nyx Pro needs their own copy; sharing one purchase across
                  a team is not allowed.
                </>
              }
            />
          </div>
        </section>
      </div>
    </article>
  );
}

/* ------------------------------------------------- helpers */

function InsideItem({
  term,
  description,
}: {
  term: string;
  description: string;
}) {
  return (
    <div>
      <dt className="font-semibold text-foreground">{term}</dt>
      <dd className="mt-1 leading-7 text-muted-foreground">{description}</dd>
    </div>
  );
}

function PhilosophyItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <li className="leading-7 text-muted-foreground">
      <span className="font-semibold text-foreground">{title}</span>{" "}
      {description}
    </li>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-semibold text-foreground">{question}</h3>
      <p className="mt-2 leading-7 text-muted-foreground">{answer}</p>
    </div>
  );
}
