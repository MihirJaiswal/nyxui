import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { pro } from "@/registry/registry-pro";
import { createBaseMetadata } from "@/lib/docs";
import { absoluteUrl, cn } from "@/lib/utils";
import { MorphLink } from "@/components/ui/morph-link";
import {
  PricingPlans,
  SignInStrip,
} from "@/components/components/pro/pricing-plans";
import {
  CELL,
  Eyebrow,
  ProSection,
} from "@/components/components/pro/pro-section";
import { LandingBackdrop } from "@/components/landing/hero/LandingBackdrop";
import { ProCtaMockup } from "@/components/components/pro/pro-cta-mockup";

const itemCount = pro.length;

export const metadata: Metadata = createBaseMetadata({
  title: "nyxui Pro — Premium React blocks & templates",
  description: `Get all ${itemCount} premium nyxui blocks, sections and animated illustrations plus full Next.js + Tailwind templates. Annual or lifetime.`,
  keywords: [
    "nyxui pro",
    "premium react components",
    "tailwind blocks",
    "react ui kit",
    "shadcn pro blocks",
    "nextjs landing page templates",
  ],
  canonical: absoluteUrl("/pro"),
});

const faqs = [
  {
    q: "How do I get access after paying?",
    a: "Sign in with Google using the same email you checked out with. Every Pro component unlocks across the docs — just copy the code. Nothing to install or configure.",
  },
  {
    q: "What's the difference between annual and lifetime?",
    a: "Annual gives you everything for a year, including anything released in that year. Lifetime is a one-time payment that never expires and includes every future addition.",
  },
  {
    q: "Can I use it in client work?",
    a: "Yes. One license covers unlimited personal and commercial projects. You just can't resell the components themselves as a competing library.",
  },
  {
    q: "What payment methods work?",
    a: "Checkout runs on Polar, which accepts all major cards plus regional methods, and handles VAT and sales tax automatically wherever you are.",
  },
];

export default function ProPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Hero */}
      <ProSection>
        <div className={cn(CELL, "relative overflow-x-clip sm:py-20")}>
          <LandingBackdrop />
          <div className="relative">
            <Eyebrow>nyxui pro</Eyebrow>
            <h1 className="mt-5 max-w-3xl text-4xl leading-tight font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Everything you need to build
              <br />
              modern interfaces{" "}
              <span className="font-caveat text-5xl text-brand sm:text-6xl md:text-7xl">
                faster.
              </span>
            </h1>
            <p className="mt-6 text-muted-foreground">
              Templates, blocks and animated components, production-ready, and
              yours to copy the moment you sign in.
            </p>
          </div>
        </div>
      </ProSection>

      {/* Pricing */}
      <PricingPlans
        annualProductId={process.env.POLAR_ANNUAL_PRODUCT_ID}
        lifetimeProductId={process.env.POLAR_LIFETIME_PRODUCT_ID}
      />

      <SignInStrip />

      {/* FAQ */}
      <ProSection>
        <div className={cn(CELL, "pb-0 sm:pb-0")}>
          <Eyebrow>Questions</Eyebrow>
        </div>
        <dl className="mt-8 divide-y divide-border/60 border-t border-border/60">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="grid gap-2 px-6 py-8 sm:grid-cols-[minmax(0,18rem)_1fr] sm:gap-10 sm:px-10 md:px-12"
            >
              <dt className="text-base font-medium text-foreground">{faq.q}</dt>
              <dd className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </ProSection>

      {/* Contact strip */}
      <ProSection>
        <div className="px-6 py-6 sm:px-10 md:px-12">
          <p className="text-sm text-muted-foreground">
            If you don&apos;t find what you need here, reach us at{" "}
            <a
              href="mailto:jaiswalmihir.business@gmail.com"
              className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-brand"
            >
              jaiswalmihir.business@gmail.com
            </a>
          </p>
        </div>
      </ProSection>

      {/* Closing CTA */}
      <ProSection bordered={false}>
        <div className="relative overflow-x-clip lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className={cn(CELL, "flex flex-col items-start sm:py-16")}>
            <h2 className="max-w-3xl text-3xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
              Stop rebuilding the same
              <br />
              landing page{" "}
              <span className="font-caveat text-5xl text-brand sm:text-6xl">
                every time.
              </span>
            </h2>
            <MorphLink href="/blocks" className="mt-8">
              <div className="flex items-center gap-1">
                <span>Browse blocks</span>
                <ArrowUpRight className="inline size-4" />
              </div>
            </MorphLink>
          </div>
          <div className="relative hidden min-h-72 lg:block">
            <ProCtaMockup />
          </div>
        </div>
      </ProSection>
    </div>
  );
}
