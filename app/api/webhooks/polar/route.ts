import { Webhooks } from "@polar-sh/nextjs";
import { planForProduct, setEntitlement } from "@/lib/entitlement";
import { trackServerEvent } from "@/lib/event-server";

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

    // Entitlement is keyed by email on this side; the matching Firebase uid
    // only lands when the customer next signs in. Attribute to email_hash
    // for now — the client identify() stitches events together once auth
    // resolves on the browser.
    await trackServerEvent({
      name: "checkout_completed",
      distinctId: `email:${email.toLowerCase()}`,
      email,
      properties: {
        plan: "lifetime",
        polar_customer_id: data.customerId ?? null,
      },
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

    await trackServerEvent({
      name: "checkout_completed",
      distinctId: `email:${email.toLowerCase()}`,
      email,
      properties: {
        plan,
        polar_customer_id: data.customerId ?? null,
        polar_subscription_id: data.id,
      },
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

    // The refund-triage query joins this against pro_source_served between
    // the matching checkout_completed and this event.
    await trackServerEvent({
      name: "plan_cancelled",
      distinctId: `email:${email.toLowerCase()}`,
      email,
      properties: {
        polar_customer_id: data.customerId ?? null,
        polar_subscription_id: data.id,
      },
    });
  },
});
