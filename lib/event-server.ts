import "server-only";

import { createHash } from "node:crypto";
import { PostHog } from "posthog-node";
import { z } from "zod";

/**
 * Server-side analytics.
 *
 * Only the events here matter for refund abuse — a client-side copy can be
 * blocked by any ad blocker, but a server-side event emitted from a gated
 * route is unforgeable. Keep the schema narrow: this list is the audit trail
 * you'll be looking at when a refund request comes in.
 *
 * Email is **never** sent raw. We hash SHA-256 server-side and set it as a
 * person property so you can look up `sha256(user.email)` when triaging a
 * refund without PostHog ever holding the plaintext.
 */

const serverEventSchema = z.object({
  name: z.enum([
    // the refund-abuse signal — what the paid user actually downloaded
    "pro_source_served",
    // scraping + attempt-without-plan surface
    "pro_source_denied",
    // monetisation funnel anchor points
    "checkout_started",
    "checkout_completed",
    "plan_cancelled",
    "refund_requested",
    // health
    "polar_webhook_failed",
  ]),
  distinctId: z.string().min(1),
  properties: z
    .record(z.union([z.string(), z.number(), z.boolean(), z.null()]))
    .optional(),
  /**
   * Email to attach as a hashed person property. We never send the raw value
   * — the hash is stable so a later lookup can match a refund request.
   */
  email: z.string().email().optional(),
});

export type ServerEvent = z.infer<typeof serverEventSchema>;

// A single PostHog client per lambda warm-start. `flushAt: 1` sends every
// capture immediately rather than buffering — serverless has no graceful
// shutdown, so batching risks losing events on cold-start recycling.
let client: PostHog | null = null;

function getClient(): PostHog | null {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
  if (!key) return null;

  // Mirror the client-side guard — in dev, don't burn free-tier quota on
  // local webhook replays, route smoke-tests, or `pnpm dev` hitting the Pro
  // source route. Opt in with NEXT_PUBLIC_POSTHOG_DEV=1.
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_POSTHOG_DEV !== "1"
  ) {
    return null;
  }

  if (client) return client;
  client = new PostHog(key, {
    host,
    flushAt: 1,
    flushInterval: 0,
  });
  return client;
}

/** Stable, non-reversible from PostHog's side but reversible by us. */
export function hashEmail(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

/**
 * Capture a server event. Fails silent when there's no PostHog key configured
 * — route handlers must never crash on telemetry failure.
 */
export async function trackServerEvent(input: ServerEvent): Promise<void> {
  const event = serverEventSchema.parse(input);
  const ph = getClient();
  if (!ph) return;

  const properties = { ...(event.properties ?? {}) };
  if (event.email) {
    properties.email_hash = hashEmail(event.email);
  }

  try {
    ph.capture({
      distinctId: event.distinctId,
      event: event.name,
      properties,
    });
  } catch {
    // never let a telemetry failure break the request
  }
}

/**
 * Set person properties on the server (useful from webhooks where the user
 * isn't signed in on the browser yet). Mirrors identify() on the client.
 */
export async function identifyServer(input: {
  distinctId: string;
  email?: string;
  properties?: Record<string, string | number | boolean | null>;
}): Promise<void> {
  const ph = getClient();
  if (!ph) return;
  const properties = { ...(input.properties ?? {}) };
  if (input.email) {
    properties.email_hash = hashEmail(input.email);
  }
  try {
    ph.identify({
      distinctId: input.distinctId,
      properties,
    });
  } catch {
    // ignore
  }
}
