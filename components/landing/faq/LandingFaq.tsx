import type { ReactNode } from "react";
import { JsonLd } from "@/components/global/JsonLd";
import { LandingFaqAccordion } from "./LandingFaqAccordion";

export type FaqItem = {
  q: string;
  a: ReactNode;
  /** Plain-text version for JSON-LD structured data (code snippets included). */
  aText?: string;
};

const FAQS: ReadonlyArray<FaqItem> = [
  {
    q: "What is Nyx UI?",
    a: "Nyx UI is an open-source React component registry built for Next.js. It's a growing collection of customizable, animated, and accessible UI components, styled with Tailwind CSS and animated with Framer Motion, that you copy into your project the same way you'd copy a shadcn/ui component.",
  },
  {
    q: "Is Nyx UI free?",
    a: "Yes. The core registry, currently 31 components plus the playground, docs, and category pages — is open source and free to use. A separate Nyx UI Pro tier adds premium blocks, sections, and templates on top; the free library stands on its own without it.",
  },
  {
    q: "Is Nyx UI compatible with shadcn/ui?",
    a: (
      <>
        Yes. Every component ships via the shadcn registry format, so{" "}
        <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
          npx shadcn@latest add https://nyxui.com/r/&lt;component&gt;.json
        </code>{" "}
        installs it into any project that already uses shadcn/ui — same
        conventions, same file layout, same CLI.
      </>
    ),
    aText:
      "Yes. Every component ships via the shadcn registry format, so `npx shadcn@latest add https://nyxui.com/r/<component>.json` installs it into any project that already uses shadcn/ui — same conventions, same file layout, same CLI.",
  },
  {
    q: "How do I install a Nyx UI component?",
    a: "Pick a component in the docs, copy the one-line shadcn command, and run it in your project. The component source lands in your repo as plain React + Tailwind files you own and can edit, no runtime dependency on Nyx UI itself.",
  },
  {
    q: "Does Nyx UI work with Next.js, React, and TypeScript?",
    a: "Yes to all three. Components are written in TypeScript against React 18+ and designed for the Next.js App Router, but they're plain React components, they work in Vite, Remix, or any other React setup that supports Tailwind CSS and client components.",
  },
  {
    q: "Can I use Nyx UI in commercial projects?",
    a: "Yes. The free components can be copy-pasted into personal or commercial projects. For Nyx UI Pro, one purchase covers unlimited personal and commercial projects — the only restriction is you can't repackage and resell the components as a competing library.",
  },
] as const;

export function LandingFaq() {
  return (
    <section
      aria-label="Frequently asked questions"
      className="relative left-1/2 w-screen -translate-x-1/2 border-b border-border/60"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map(({ q, a, aText }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: aText ?? a },
          })),
        }}
      />

      <div className="mx-auto max-w-295 ">
        <div className="mx-auto border-x border-border/60 pt-16 sm:pt-24">
          <h2 className="max-w-xl px-6 text-4xl leading-tight font-medium tracking-tight text-foreground sm:px-10 sm:text-5xl md:px-12">
            Frequently asked
            <br />
            <span className="font-caveat text-brand text-5xl sm:text-6xl">
              questions.
            </span>
          </h2>
          <p className="mt-3 max-w-xl px-6 text-base text-muted-foreground sm:px-10 md:px-12">
            Short answers to the questions people ask about Nyx UI.
          </p>

          <LandingFaqAccordion items={FAQS} className="mt-10" />
        </div>
      </div>
    </section>
  );
}
