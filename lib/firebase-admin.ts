import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

/**
 * Server-side Firebase. Used to verify Google sign-in tokens and to write
 * Pro entitlements, which must not be writable from the client.
 *
 * Needs a service account from Firebase Console → Project settings →
 * Service accounts → Generate new private key.
 */

let cachedApp: App | null = null;

function getAdminApp(): App {
  if (cachedApp) return cachedApp;

  const existing = getApps();
  if (existing.length > 0) {
    cachedApp = existing[0];
    return cachedApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Vercel stores the key with literal \n sequences.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase admin is not configured — set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.",
    );
  }

  cachedApp = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });

  return cachedApp;
}

export function adminAuth() {
  return getAuth(getAdminApp());
}

export function adminDb() {
  return getFirestore(getAdminApp());
}

/**
 * Verify a Firebase ID token from the client and return the signed-in
 * user's verified email, or null if the token is missing or invalid.
 */
export async function verifyIdToken(
  token: string | null | undefined,
): Promise<{ uid: string; email: string } | null> {
  if (!token) return null;

  try {
    const decoded = await adminAuth().verifyIdToken(token);
    // Google sign-in always yields a verified address; refuse anything else,
    // since entitlements are keyed by email.
    if (!decoded.email || decoded.email_verified === false) return null;
    return { uid: decoded.uid, email: decoded.email.toLowerCase() };
  } catch {
    return null;
  }
}

/** Pull the bearer token out of an incoming request. */
export function bearerToken(req: Request): string | null {
  const header = req.headers.get("authorization");
  if (!header?.toLowerCase().startsWith("bearer ")) return null;
  return header.slice(7).trim() || null;
}
