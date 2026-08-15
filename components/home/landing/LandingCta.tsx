"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { siteLinks } from "@/lib/links";
import { GrainyBackground } from "@/registry/ui/grainy-background";

const CTA_GRAIN_COLORS = ["#ff4d1f", "#000", "#180806", "#030303"];

export function LandingCta(): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 border-b border-border/60">
      <div className="relative mx-auto max-w-295">
        <GrainyBackground
          colors={CTA_GRAIN_COLORS}
          speed={0.65}
          grainType="paper"
          grainIntensity={38}
          grainSize={1002}
          animationType="pulse"
          size="full"
          position="relative"
          animate={!shouldReduceMotion}
          darkMode
          grainBlendMode="soft-light"
          style={{ height: "auto" }}
          className="group isolate border border-brand/25 shadow-2xl"
        >
          <div className="relative py-16">
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
              <h2 className="text-4xl leading-[0.95] font-medium tracking-tight text-foreground sm:text-6xl md:text-7xl">
                Make it feel
                <br />
                unmistakably{" "}
                <span className="font-caveat text-brand">yours.</span>
              </h2>

              <p className="mt-7 max-w-xl text-sm leading-6 text-foreground/65 sm:text-base sm:leading-7">
                Start with a living component, shape every detail in the
                playground, and take clean production-ready code with you.
              </p>

              <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <Link
                  href={siteLinks.playground}
                  className="group/button inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:scale-[1.02] sm:w-auto"
                >
                  Open playground
                  <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-1" />
                </Link>
                <Link
                  href={siteLinks.components}
                  className="group/button inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-foreground/20 bg-background/20 px-6 text-sm text-foreground backdrop-blur-md transition-colors hover:bg-background/35 sm:w-auto"
                >
                  Browse components
                  <ArrowUpRight className="size-4 transition-transform group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </GrainyBackground>
      </div>
    </section>
  );
}
