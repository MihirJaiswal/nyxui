import { Checkout } from "@polar-sh/nextjs";
import { absoluteUrl } from "@/lib/utils";

/**
 * Redirects to a Polar-hosted checkout for the nyxui Pro product.
 *
 * GET /api/checkout                  → checkout for POLAR_PRODUCT_ID
 * GET /api/checkout?products=<id>    → checkout for a specific product
 *
 * On success Polar sends the customer back to /blocks where the avatar
 * badge shows their new plan. Billing management lives in the navbar
 * profile dropdown via the Polar portal.
 */
export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: absoluteUrl("/blocks?welcome=1"),
  returnUrl: absoluteUrl("/pro"),
  server: process.env.POLAR_SERVER === "sandbox" ? "sandbox" : "production",
});
