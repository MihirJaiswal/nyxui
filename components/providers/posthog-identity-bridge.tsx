"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";
import { useProAccess } from "@/components/providers/pro-access-provider";

/**
 * Keeps PostHog's distinctId in step with Firebase auth.
 *
 * Lives as a sibling of children inside ProAccessProvider so it can read the
 * auth context — ProAccessProvider itself stays PostHog-ignorant. We identify
 * by Firebase uid (stable, non-PII) and attach plan as a person property.
 * The raw email is never sent to PostHog — it's hashed server-side in
 * lib/event-server.ts when captures include it.
 */
export function PostHogIdentityBridge() {
  const { user, loading, entitled, plan } = useProAccess();
  const lastIdentifiedUid = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!posthog.__loaded) return;
    if (loading) return;

    if (user) {
      // Only call identify when the identity actually changes — PostHog
      // doesn't deduplicate and we'd otherwise fire one every re-render that
      // changes `entitled` or `plan`.
      if (lastIdentifiedUid.current !== user.uid) {
        posthog.identify(user.uid, {
          plan: plan ?? null,
          entitled,
        });
        lastIdentifiedUid.current = user.uid;
      } else {
        // Same user, maybe plan flipped (e.g. post-checkout refresh).
        posthog.setPersonProperties({
          plan: plan ?? null,
          entitled,
        });
      }
    } else if (lastIdentifiedUid.current) {
      // Sign-out — new events must land on an anonymous distinctId, not stay
      // attributed to the previous user.
      posthog.reset();
      lastIdentifiedUid.current = null;
    }
  }, [user, loading, entitled, plan]);

  return null;
}
