"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";

/**
 * Boots posthog-js on the client. Mounts near the top of the tree so the
 * `trackEvent()` wrapper in lib/event.ts sees an initialised client.
 *
 * Design choices worth knowing:
 *   • No API key → total no-op. Dev builds without .env work, so does CI.
 *   • `capture_pageview: false` + manual pageview capture — Next.js app
 *     router's client navigation never fires `load`, so autocapture's
 *     default pageview tracking misses route changes. We hook pathname.
 *   • `autocapture: false` — PostHog's default also records every click
 *     and form submit, which balloons event volume on a docs-heavy site
 *     with hundreds of nav links. We rely on named events instead, which
 *     is what the free tier (1M events/mo) lives on.
 *   • Session recording stays off — paid-tier feature past 5k/mo and we
 *     don't want to record signed-in paid users without explicit consent.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    // Dev defaults OFF so HMR reloads, local click-through, and smoke tests
    // don't eat into the free tier quota (1M events/month). Opt in locally
    // by setting NEXT_PUBLIC_POSTHOG_DEV=1 when you need to verify a new
    // instrumentation actually fires.
    if (
      process.env.NODE_ENV !== "production" &&
      process.env.NEXT_PUBLIC_POSTHOG_DEV !== "1"
    ) {
      return;
    }

    posthog.init(key, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      capture_pageview: false,
      autocapture: false,
      disable_session_recording: true,
      // Reduce the chance someone's ad blocker tanks the whole app
      loaded: () => {
        // first pageview — subsequent ones come from the pathname effect
        posthog.capture("$pageview");
      },
    });
  }, []);

  return (
    <>
      {children}
      {/* useSearchParams() must sit inside a Suspense boundary or static
          prerendering of any page in the tree bails out with an error. */}
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
    </>
  );
}

/**
 * Fire a `$pageview` on every client-side route change.
 *
 * The usePathname + useSearchParams split is deliberate — searchParams keeps
 * this effect reactive to query changes without re-rendering the whole tree.
 */
function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    if (typeof window === "undefined") return;
    if (!posthog.__loaded) return;

    const url = searchParams?.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;
    posthog.capture("$pageview", {
      $current_url: window.location.origin + url,
    });
  }, [pathname, searchParams]);

  return null;
}
