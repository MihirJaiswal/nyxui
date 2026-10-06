"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Loader2, Lock, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProAccess } from "@/components/providers/pro-access-provider";
import { PRO_URL } from "@/registry/Data";
import { ProDummyCode } from "./pro-dummy-code";
import { FileCodeViewer, type FileCodeViewerFile } from "./file-code-viewer";

interface ProCodeGateProps {
  name: string;
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaPrice?: string;
}

type SourceState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; files: FileCodeViewerFile[] }
  | { status: "error"; message: string };

// Radix unmounts inactive tab content, so switching Preview -> Code remounts
// this component and would otherwise re-hit the API (token verify + Firestore
// + re-highlight) every single time. Cache the resolved source per item for
// the page session so re-opening the Code tab is instant. In-flight requests
// are deduped too, so rapid toggling — or a prefetch racing the click — never
// fires duplicate fetches.
const sourceCache = new Map<string, FileCodeViewerFile[]>();
const inflight = new Map<string, Promise<FileCodeViewerFile[]>>();

type GetToken = () => Promise<string | null>;

/**
 * Resolve a Pro item's source, sharing one request across callers and caching
 * the result for the page session. This is the single fetch path used by both
 * the Code tab and the background warmer.
 */
function fetchProSource(
  name: string,
  getToken: GetToken,
): Promise<FileCodeViewerFile[]> {
  const cached = sourceCache.get(name);
  if (cached) return Promise.resolve(cached);

  let request = inflight.get(name);
  if (!request) {
    request = (async () => {
      const token = await getToken();
      const response = await fetch(`/api/pro/source/${name}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message ?? data?.error ?? "Couldn't load source");
      }
      const files: FileCodeViewerFile[] =
        Array.isArray(data.files) && data.files.length > 0
          ? data.files
          : [{ code: data.code, html: data.html, path: name }];
      sourceCache.set(name, files);
      return files;
    })();
    inflight.set(name, request);
    request.finally(() => inflight.delete(name));
  }
  return request;
}

/**
 * Warms the source cache for a Pro item BEFORE the user opens the Code tab, so
 * the first open is instant instead of showing a spinner. Render it in the
 * Preview tab (which is mounted while the user looks at the preview); it only
 * fetches once the card is near the viewport and the browser is idle, so
 * pages with many previews don't fire a burst of requests on load.
 */
export function ProSourceWarmer({ name }: { name: string }) {
  const { entitled, getToken } = useProAccess();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!entitled || sourceCache.has(name)) return;
    const el = ref.current;
    if (!el) return;

    let cancelled = false;
    const warm = () => {
      if (cancelled) return;
      const run = () => void fetchProSource(name, getToken).catch(() => {});
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(run, { timeout: 1500 });
      } else {
        setTimeout(run, 200);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          io.disconnect();
          warm();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [entitled, getToken, name]);

  return <span ref={ref} aria-hidden className="sr-only" />;
}

function UnlockedSource({ name }: { name: string }) {
  const { getToken } = useProAccess();
  const [state, setState] = useState<SourceState>(() => {
    const cached = sourceCache.get(name);
    return cached ? { status: "ready", files: cached } : { status: "idle" };
  });

  const load = useCallback(async () => {
    const cached = sourceCache.get(name);
    if (cached) {
      setState({ status: "ready", files: cached });
      return;
    }
    setState({ status: "loading" });
    try {
      const files = await fetchProSource(name, getToken);
      setState({ status: "ready", files });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error ? error.message : "Couldn't load the source.",
      });
    }
  }, [getToken, name]);

  useEffect(() => {
    void load();
  }, [load]);

  if (state.status === "loading" || state.status === "idle") {
    // Match the loaded FileCodeViewer height (figcaption h-12 + code h-162.5)
    // so switching into a not-yet-cached Code tab doesn't shift the layout.
    return (
      <div className="flex h-174.5 items-center justify-center rounded-md bg-card">
        <Loader2
          aria-hidden="true"
          className="size-5 animate-spin text-muted-foreground"
        />
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="flex h-40 flex-col items-center justify-center gap-3 rounded-md bg-card px-6 text-center">
        <TriangleAlert aria-hidden="true" className="size-5 text-destructive" />
        <p className="text-sm text-muted-foreground">{state.message}</p>
        <button
          type="button"
          onClick={() => void load()}
          className="text-sm font-medium text-foreground underline underline-offset-4"
        >
          Try again
        </button>
      </div>
    );
  }

  return <FileCodeViewer files={state.files} />;
}

export function ProCodeGate({
  name,
  title = "Unlock the full library",
  description = "Get all pro blocks, components & illustrations, and production-ready Next.js + Tailwind templates.",
  ctaLabel = "Get All Access",
  ctaPrice,
}: ProCodeGateProps) {
  const { user, entitled, loading, signIn } = useProAccess();
  const [signingIn, setSigningIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (entitled) {
    return <UnlockedSource name={name} />;
  }

  const handleSignIn = async () => {
    setSigningIn(true);
    try {
      await signIn();
    } catch {
      // Popup dismissed — nothing to report.
    } finally {
      setSigningIn(false);
    }
  };

  const signedInWithoutPlan = Boolean(user) && !loading;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-md">
      <div className="relative isolate flex h-full flex-col overflow-hidden bg-card">
        <div className="relative flex-1 overflow-hidden">
          <div className="blur-sm" aria-hidden="true">
            {mounted ? <ProDummyCode /> : null}
          </div>
          <div className="from-card via-card/60 to-card/20 absolute inset-0 bg-linear-to-t dark:from-black dark:via-black/60 dark:to-black/20 h-full" />
        </div>

        {/* centered gate card */}
        <div className="absolute inset-0 z-10 grid place-items-center p-4 sm:p-8">
          <div className="flex max-h-full w-full max-w-md flex-col items-center overflow-y-auto text-center py-2">
            {/* icon */}
            <div className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-brand/10 ring-1 ring-brand/25">
              <Lock aria-hidden="true" className="size-4 text-brand" />
            </div>

            <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
              {title}
            </h3>
            <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-balance text-muted-foreground">
              {signedInWithoutPlan
                ? `${user?.email} doesn't have an active plan yet. Buy with this email and the code unlocks here instantly.`
                : description}
            </p>

            <div className="mt-6 flex w-full max-w-xs flex-col items-stretch gap-2">
              <Button asChild className="w-full">
                <Link href={PRO_URL} prefetch={false}>
                  {ctaLabel}
                  {ctaPrice && (
                    <span className="font-semibold opacity-80">
                      · {ctaPrice}
                    </span>
                  )}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>

              {!user && (
                <button
                  type="button"
                  onClick={() => void handleSignIn()}
                  disabled={signingIn || loading}
                  className="flex w-full items-center justify-center gap-2 rounded-full px-5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                >
                  {signingIn && (
                    <Loader2
                      aria-hidden="true"
                      className="size-3.5 animate-spin"
                    />
                  )}
                  Already purchased? Sign in
                </button>
              )}
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-50 shadow-[inset_0_0_0_1px_hsl(var(--border))]"
        />
      </div>
    </div>
  );
}

export default ProCodeGate;
