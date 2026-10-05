import { NextResponse } from "next/server";
import { bearerToken, verifyIdToken } from "@/lib/firebase-admin";
import { getEntitlement, toAccessState } from "@/lib/entitlement";

/** Returns the signed-in user's Pro status. Requires a Firebase ID token. */
export async function GET(req: Request) {
  const identity = await verifyIdToken(bearerToken(req));

  if (!identity) {
    return NextResponse.json(
      { email: null, entitled: false, plan: null, expiresAt: null },
      { status: 401 },
    );
  }

  const entitlement = await getEntitlement(identity.email);

  return NextResponse.json(toAccessState(identity.email, entitlement), {
    headers: { "Cache-Control": "no-store" },
  });
}
