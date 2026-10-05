import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Guard against re-initializing across hot reloads and route handlers.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

/**
 * Google sign-in for Pro access.
 *
 * Lazy on purpose: `getAuth` validates the API key eagerly, so importing it
 * at module scope would break every server route that only wants Firestore
 * (and any build where the client keys aren't present).
 */
let authInstance: Auth | null = null;

export function getFirebaseAuth(): Auth {
  authInstance ??= getAuth(app);
  return authInstance;
}

/**
 * Whether client-side Firebase is configured. Without keys — a fresh clone,
 * or a preview build with no env — sign-in is simply unavailable rather than
 * throwing and taking the page down with it.
 */
export const firebaseEnabled = Boolean(firebaseConfig.apiKey);

export default app;
