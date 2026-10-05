import { adminDb } from "@/lib/firebase-admin";

/**
 * Pro entitlements, keyed by the customer's email.
 *
 * Polar owns billing; this is a local mirror kept up to date by the Polar
 * webhook. Reading it costs one Firestore lookup instead of a round trip to
 * Polar on every gated request.
 *
 * Access is tied to email: whatever address someone checks out with is the
 * address they must sign in with.
 */

const COLLECTION = "proEntitlements";

export type Plan = "annual" | "lifetime";

export interface Entitlement {
  email: string;
  plan: Plan;
  /** Mirrors Polar's subscription status; always "active" for lifetime. */
  status: string;
  /** Epoch ms when access lapses. Null for lifetime. */
  expiresAt: number | null;
  polarCustomerId: string | null;
  polarSubscriptionId: string | null;
  updatedAt: number;
}

/** Which plan a Polar product id maps to. */
export function planForProduct(productId: string | null): Plan | null {
  if (!productId) return null;
  if (productId === process.env.POLAR_LIFETIME_PRODUCT_ID) return "lifetime";
  if (productId === process.env.POLAR_ANNUAL_PRODUCT_ID) return "annual";
  return null;
}

export async function setEntitlement(
  entitlement: Omit<Entitlement, "updatedAt">,
): Promise<void> {
  const email = entitlement.email.toLowerCase();
  await adminDb()
    .collection(COLLECTION)
    .doc(email)
    .set({ ...entitlement, email, updatedAt: Date.now() }, { merge: true });
}

export async function getEntitlement(
  email: string,
): Promise<Entitlement | null> {
  const snapshot = await adminDb()
    .collection(COLLECTION)
    .doc(email.toLowerCase())
    .get();

  return snapshot.exists ? (snapshot.data() as Entitlement) : null;
}

/**
 * A lifetime purchase never lapses. A subscription counts while Polar
 * reports it active or trialing and the period hasn't run out — the grace
 * that `cancel_at_period_end` implies is already baked into expiresAt.
 */
export function isActive(entitlement: Entitlement | null): boolean {
  if (!entitlement) return false;
  if (entitlement.plan === "lifetime") return true;

  const usable =
    entitlement.status === "active" || entitlement.status === "trialing";
  if (!usable) return false;

  return entitlement.expiresAt === null || entitlement.expiresAt > Date.now();
}

/** What the client is told about the signed-in user. */
export interface AccessState {
  email: string | null;
  entitled: boolean;
  plan: Plan | null;
  expiresAt: number | null;
}

export function toAccessState(
  email: string,
  entitlement: Entitlement | null,
): AccessState {
  const entitled = isActive(entitlement);
  return {
    email,
    entitled,
    plan: entitled ? (entitlement?.plan ?? null) : null,
    expiresAt: entitled ? (entitlement?.expiresAt ?? null) : null,
  };
}
