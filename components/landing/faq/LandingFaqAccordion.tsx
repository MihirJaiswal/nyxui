"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "./LandingFaq";

/**
 * Minimal animated accordion — divided rows matching the rest of the
 * landing page, no cards, no backdrop blur. The `+` glyph rotates 45° on
 * open (so it reads as `×`); the answer height animates with Framer
 * Motion rather than native `<details>` because `<details>` toggles
 * `display: none` before any CSS transition can run — content snaps open
 * otherwise.
 *
 * Multiple rows can be open at once. Semantics are real `<button>` +
 * `aria-expanded` + `aria-controls`; respects `prefers-reduced-motion`.
 */
export function LandingFaqAccordion({
  items,
  className,
}: {
  items: ReadonlyArray<FaqItem>;
  className?: string;
}) {
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const reduce = useReducedMotion();
  const baseId = useId();

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div
      className={cn(
        "divide-y divide-border/60 border-y border-border/60",
        className,
      )}
    >
      {items.map(({ q, a }, i) => {
        const isOpen = open.has(i);
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={q}>
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(i)}
              className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 px-6 text-left text-base font-medium text-foreground transition-colors hover:text-foreground/90 sm:px-10 sm:text-lg md:px-12"
            >
              <span className="text-balance">{q}</span>
              <motion.span
                aria-hidden
                className="shrink-0 text-xl font-light text-muted-foreground group-hover:text-foreground"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
                }
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.2, ease: "easeOut" },
                        }
                  }
                  // overflow hidden so the exit animation doesn't paint
                  // outside the collapsing bounds mid-transition.
                  style={{ overflow: "hidden" }}
                >
                  <p className="pt-1 pr-10 pb-5 px-6 text-sm leading-relaxed text-muted-foreground sm:px-10 sm:text-base md:px-12">
                    {a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
