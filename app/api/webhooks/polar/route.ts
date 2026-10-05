import { Webhooks } from "@polar-sh/nextjs";
import { planForProduct, setEntitlement } from "@/lib/entitlement";

/**
 * Keeps the local entitlement mirror in step with Polar.
 *
 * Signature verification is handled by the adapter using
 * POLAR_WEBHOOK_SECRET — configure the endpoint at
 * https://polar.sh/<org>/settings/webhooks pointing at /api/webhooks/polar.
 */

/** Subscription payloads carry the period end; orders don't. */
function periodEnd(data: {
  currentPeriodEnd?: Date | null;
  endsAt?: Date | null;
}) {
  const end = data.endsAt ?? data.currentPeriodEnd ?? null;
  return end ? new Date(end).getTime() : null;
}

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,

  // One-time purchases (lifetime). Subscription renewals also emit
  // order.paid, but those are handled by the subscription events below.
  onOrderPaid: async ({ data }) => {
    const plan = planForProduct(data.productId ?? null);
    const email = data.customer?.email;
    if (plan !== "lifetime" || !email) return;

    await setEntitlement({
      email,
      plan: "lifetime",
      status: "active",
      expiresAt: null,
      polarCustomerId: data.customerId ?? null,
      polarSubscriptionId: null,
    });
  },

  onSubscriptionActive: async ({ data }) => {
    const plan = planForProduct(data.productId ?? null);
    const email = data.customer?.email;
    if (!plan || !email) return;

    await setEntitlement({
      email,
      plan,
      status: data.status,
      expiresAt: periodEnd(data),
      polarCustomerId: data.customerId ?? null,
      polarSubscriptionId: data.id,
    });
  },

  // Renewals and plan changes.
  onSubscriptionUpdated: async ({ data }) => {
    const plan = planForProduct(data.productId ?? null);
    const email = data.customer?.email;
    if (!plan || !email) return;

    await setEntitlement({
      email,
      plan,
      status: data.status,
      expiresAt: periodEnd(data),
      polarCustomerId: data.customerId ?? null,
      polarSubscriptionId: data.id,
    });
  },

  // Access actually ends here. `canceled` only means it won't renew, so the
  // customer keeps access until the period runs out — which onSubscriptionUpdated
  // already recorded.
  onSubscriptionRevoked: async ({ data }) => {
    const email = data.customer?.email;
    if (!email) return;

    await setEntitlement({
      email,
      plan: "annual",
      status: "revoked",
      expiresAt: Date.now(),
      polarCustomerId: data.customerId ?? null,
      polarSubscriptionId: data.id,
    });
  },
});
