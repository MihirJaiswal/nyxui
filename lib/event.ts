import posthog from "posthog-js";
import { z } from "zod";

/**
 * Client-side analytics names. Every custom client event this app fires goes
 * through here — the Zod schema is the single source of truth so a typo
 * surfaces at the call site instead of as silent telemetry drift.
 *
 * Server-side events live in lib/event-server.ts and go through posthog-node
 * instead; they share the person via `distinctId = Firebase uid`.
 */
const eventSchema = z.object({
  name: z.enum([
    // existing copy intent (already instrumented in docs + install blocks)
    "copy_npm_command",
    "copy_usage_code",
    "copy_source_code",

    // auth
    "signin_opened",
    "signin_completed",
    "signin_failed",
    "signout",

    // Pro upsell funnel (client half; server completes the loop)
    "pro_locked_viewed",
    "pro_upsell_shown",
    "pro_upsell_dismissed",
    "pro_upsell_cta_clicked",
    "pricing_viewed",
    "pricing_plan_selected",

    // Pro consumption as experienced in the browser
    "pro_block_viewed_as_pro",

    // Interaction
    "playground_opened",
    "playground_code_copied",
    "code_tab_switched",
    "search_opened",
    "search_query",
    "search_result_clicked",
  ]),

  properties: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.null()]))
    .optional(),
});

export type Event = z.infer<typeof eventSchema>;

/**
 * Capture a client event. No-ops silently when PostHog hasn't been
 * initialised (dev without a key, SSR, etc.) rather than throwing — this gets
 * called from render-adjacent handlers and must never crash the UI.
 */
export function trackEvent(input: Event): void {
  const event = eventSchema.parse(input);
  if (!event) return;
  if (typeof window === "undefined") return;
  // posthog-js guards against capture-before-init internally, but we also
  // skip the parse+call cost when no key was provided at startup.
  if (!posthog.__loaded) return;
  posthog.capture(event.name, event.properties);
}
