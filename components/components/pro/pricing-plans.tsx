"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { useProAccess } from "@/components/providers/pro-access-provider";
import { MorphLink } from "@/components/ui/morph-link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CELL, Eyebrow, ProSection } from "./pro-section";

/**
 * Full-bleed strip rendered between sections on pages that have a pricing
 * block and a signed-out user. Renders nothing when signed in.
 */
export function SignInStrip() {
  const { user, loading, signIn } = useProAccess();
  const [signingIn, setSigningIn] = useState(false);

  if (user) return null;

  const handleSignIn = async () => {
    setSigningIn(true);
    try {
      await signIn();
    } catch {
      // Popup dismissed.
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <ProSection>
      <p className="px-6 py-6 text-sm text-muted-foreground sm:px-10 md:px-12">
        Already bought, or want checkout pre-filled?{" "}
        <button
          type="button"
          onClick={() => void handleSignIn()}
          disabled={signingIn || loading}
          className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-brand disabled:opacity-50"
        >
          {signingIn ? "Signing in…" : "Sign in first."}
        </button>
      </p>
    </ProSection>
  );
}

/**
 * Prices are display-only — Polar is the source of truth for what a
 * customer is charged. Keep these in sync with the products in Polar.
 */
export const ANNUAL_PRICE = "$94";
export const LIFETIME_PRICE = "$149";

interface PricingPlansProps {
  annualProductId?: string;
  lifetimeProductId?: string;
}

const features = [
  "Every Pro block, component & template",
  "Full TypeScript source, CLI or copy-paste",
  "New releases included",
  "Unlimited personal & commercial projects",
];

export function PricingPlans({
  annualProductId,
  lifetimeProductId,
}: PricingPlansProps) {
  const { user, entitled, plan } = useProAccess();

  const checkoutHref = (productId?: string) => {
    if (!productId) return undefined;
    const params = new URLSearchParams({ products: productId });
    // Lock checkout to the signed-in address so entitlement matches on the
    // way back — this is why access "just works" after paying.
    if (user?.email) params.set("customerEmail", user.email);
    return `/api/checkout?${params.toString()}`;
  };

  if (entitled) {
    return (
      <ProSection>
        <div className={cn(CELL, "flex flex-col items-start")}>
          <Eyebrow>Your plan</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-4xl leading-tight font-medium tracking-tight text-foreground sm:text-5xl">
            You already have{" "}
            <span className="font-caveat text-5xl text-brand sm:text-6xl">
              everything.
            </span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            {plan === "lifetime" ? "Lifetime access" : "Annual plan"}, active on{" "}
            <span className="text-foreground">{user?.email}</span>. Every Pro
            component is unlocked — open one and the code is right there.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MorphLink href="/blocks">
              <div className="flex items-center gap-1">
                <span>Browse Pro blocks</span>
                <ArrowUpRight className="inline size-4" />
              </div>
            </MorphLink>
            <a
              href={
                process.env.NEXT_PUBLIC_POLAR_PORTAL_URL ??
                "https://polar.sh/purchases"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Manage billing
            </a>
          </div>
        </div>
      </ProSection>
    );
  }

  const plans = [
    {
      id: "annual" as const,
      name: "Annual",
      price: ANNUAL_PRICE,
      cadence: "per year",
      blurb: "Everything, renewed yearly. Cancel any time.",
      href: checkoutHref(annualProductId),
      featured: false,
    },
    {
      id: "lifetime" as const,
      name: "Lifetime",
      price: LIFETIME_PRICE,
      cadence: "one-time",
      blurb: "Pay once. Yours forever, including everything added later.",
      href: checkoutHref(lifetimeProductId),
      featured: true,
    },
  ];

  return (
    <ProSection>
      <div className={cn(CELL, "pb-6 sm:pb-8")}>
        <Eyebrow>Pricing</Eyebrow>
        <h2 className="mt-5 max-w-md text-3xl leading-tight font-medium tracking-tight text-foreground sm:text-4xl">
          Pay once, build faster.
        </h2>
      </div>

      <div className="grid gap-4 px-6 pb-10 sm:grid-cols-2 sm:px-10 sm:pb-12 md:px-12">
        {plans.map((tier) => (
          <div
            key={tier.id}
            className={cn(
              "relative flex flex-col rounded-2xl bg-card p-6 sm:p-8",
              tier.featured
                ? "smooth-shadow-ring-md smooth-ring-brand/40"
                : "border border-border/60",
            )}
          >
            {tier.featured && (
              <span className="absolute -top-2.5 left-6 rounded-full bg-brand px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-widest text-brand-foreground uppercase">
                Best value
              </span>
            )}

            <div className="flex items-baseline gap-2">
              <span className="text-4xl leading-none font-semibold tracking-tight text-foreground sm:text-5xl">
                {tier.price}
              </span>
              <span className="text-sm text-muted-foreground">
                {tier.cadence}
              </span>
            </div>

            <p className="mt-2 text-sm font-medium text-foreground">
              {tier.name}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">{tier.blurb}</p>

            <ul className="mt-6 space-y-2.5 border-t border-border/60 pt-6">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-brand"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex-1" />

            {tier.href ? (
              <Button
                asChild
                variant={tier.featured ? "default" : "outline"}
                className="w-full"
              >
                <Link href={tier.href} prefetch={false}>
                  Get {tier.name.toLowerCase()}
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <p className="text-center font-mono text-xs text-muted-foreground">
                Checkout is being set up.
              </p>
            )}

            <p className="mt-4 text-center font-mono text-[11px] leading-relaxed text-muted-foreground/80">
              {user ? (
                <>
                  Billing to{" "}
                  <span className="text-foreground">{user.email}</span>
                </>
              ) : (
                "Access tied to your checkout email"
              )}
            </p>
          </div>
        ))}
      </div>
    </ProSection>
  );
}

export default PricingPlans;
