"use client";

import type React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { MorphLink } from "@/components/ui/morph-link";
import { ComponentCard } from "@/components/components/gallery/ComponentCard";
import { componentsData } from "@/registry/Data";
import { blockCategoryHref, getBlockCategory } from "@/lib/links";

const FEATURED_CATEGORIES = [
  "Navigation",
  "Interactions",
  "Logo Cloud",
] as const;

/** Representative slug per category — its image is reused as the category cover. */
const CATEGORY_COVER: Record<string, string> = {
  Navigation: "navigation-7",
  Interactions: "session-list",
  "Logo Cloud": "logo-cloud-5",
};

export function BlocksShowcase(): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = Boolean(shouldReduceMotion);

  const featured = FEATURED_CATEGORIES.map((category) => {
    const blocksInCategory = Object.entries(componentsData.blocks).filter(
      ([slug, block]) => getBlockCategory(slug, block.tags ?? []) === category,
    );
    const coverBlock = componentsData.blocks[CATEGORY_COVER[category]];
    return {
      slug: category,
      title: category,
      image: coverBlock?.image,
      imageClassName: coverBlock?.imageClassName,
      count: blocksInCategory.length,
      href: blockCategoryHref(category),
    };
  });

  return (
    <section
      aria-label="Blocks showcase"
      className="relative left-1/2 w-screen -translate-x-1/2 border-b border-border/60"
    >
      <div className="mx-auto max-w-295 border-x border-border/60 pt-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-10 px-6 py-10 sm:py-12 sm:px-10 md:grid-cols-[1fr_0.8fr] md:px-12"
        >
          <div>
            <p className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand">
              Blocks
            </p>

            <h2 className="max-w-xl text-4xl leading-tight font-medium tracking-tight text-foreground sm:text-5xl">
              Awesome Sections
              <br />
              already{" "}
              <span className="font-caveat text-brand text-5xl sm:text-6xl">
                designed.
              </span>
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p className="max-w-lg text-base leading-7 text-muted-foreground">
              Heroes, footers, bento grids, logo clouds and more — full-width
              sections tuned for production, exclusive to nyx ui pro.
            </p>
          </div>
        </motion.div>

        <div className="relative border-t border-border/60 px-6 pt-10 pb-24 sm:px-10 md:px-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {featured.map((block, i) => (
              <motion.div
                key={block.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: reduceMotion ? 0 : 0.08 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ComponentCard
                  slug={block.slug}
                  title={block.title}
                  imageSrc={block.image}
                  imageClassName={block.imageClassName}
                  type="blocks"
                  href={block.href}
                  count={block.count}
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom fade + centered CTA */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-background via-background/80 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-10 flex justify-center">
            <MorphLink href="/blocks">
              <div className="flex items-center gap-1">
                <span>Show more blocks</span>
                <ArrowUpRight className="inline size-4" />
              </div>
            </MorphLink>
          </div>
        </div>
      </div>
    </section>
  );
}
