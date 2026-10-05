"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { firebaseEnabled, getFirebaseAuth } from "@/lib/firebase";

/**
 * Google sign-in plus the signed-in user's Pro entitlement.
 *
 * Pro access is tied to the email address used at checkout, so the whole
 * model is: sign in with Google, and if that address has an active plan in
 * Polar, gated code unlocks.
 */

export type Plan = "annual" | "lifetime";

interface ProAccess {
  user: User | null;
  /** Still resolving auth state or the entitlement lookup. */
  loading: boolean;
  entitled: boolean;
  plan: Plan | null;
  expiresAt: number | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  /** Bearer token for calling gated API routes. */
  getToken: () => Promise<string | null>;
  /** Re-check entitlement, e.g. after returning from checkout. */
  refresh: () => Promise<void>;
}

const ProAccessContext = createContext<ProAccess | null>(null);

export function ProAccessProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authResolved, setAuthResolved] = useState(false);
  const [checking, setChecking] = useState(false);
  const [entitled, setEntitled] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  const getToken = useCallback(async () => {
    const current = getFirebaseAuth().currentUser;
    return current ? current.getIdToken() : null;
  }, []);

  const loadAccess = useCallback(async (current: User | null) => {
    if (!current) {
      setEntitled(false);
      setPlan(null);
      setExpiresAt(null);
      return;
    }

    setChecking(true);
    try {
      const token = await current.getIdToken();
      const response = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!response.ok) throw new Error(String(response.status));
      const data = (await response.json()) as {
        entitled: boolean;
        plan: Plan | null;
        expiresAt: number | null;
      };
      setEntitled(data.entitled);
      setPlan(data.plan);
      setExpiresAt(data.expiresAt);
    } catch {
      setEntitled(false);
      setPlan(null);
      setExpiresAt(null);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    if (!firebaseEnabled) {
      setAuthResolved(true);
      return;
    }
    return onIdTokenChanged(getFirebaseAuth(), async (next) => {
      setUser(next);
      setAuthResolved(true);
      await loadAccess(next);
    });
  }, [loadAccess]);

  const signIn = useCallback(async () => {
    if (!firebaseEnabled) return;
    const provider = new GoogleAuthProvider();
    // Always let people choose, so the Pro email is easy to match.
    provider.setCustomParameters({ prompt: "select_account" });
    await signInWithPopup(getFirebaseAuth(), provider);
  }, []);

  const signOut = useCallback(async () => {
    if (!firebaseEnabled) return;
    await firebaseSignOut(getFirebaseAuth());
  }, []);

  const refresh = useCallback(async () => {
    if (!firebaseEnabled) return;
    await loadAccess(getFirebaseAuth().currentUser);
  }, [loadAccess]);

  const value = useMemo<ProAccess>(
    () => ({
      user,
      loading: !authResolved || checking,
      entitled,
      plan,
      expiresAt,
      signIn,
      signOut,
      getToken,
      refresh,
    }),
    [
      user,
      authResolved,
      checking,
      entitled,
      plan,
      expiresAt,
      signIn,
      signOut,
      getToken,
      refresh,
    ],
  );

  return (
    <ProAccessContext.Provider value={value}>
      {children}
    </ProAccessContext.Provider>
  );
}

export function useProAccess(): ProAccess {
  const context = useContext(ProAccessContext);
  if (!context) {
    throw new Error("useProAccess must be used inside <ProAccessProvider>");
  }
  return context;
}
