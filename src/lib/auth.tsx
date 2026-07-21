/**
 * Auth state for the app. Holds the current user + token, keeps the API client's
 * Authorization header in sync, and exposes sign-in / sign-up / sign-out.
 *
 * Design phase: the backend issues a static demo token and state lives in
 * memory (no persistence across reloads yet). On mount we bootstrap the current
 * user via `/auth/me` so screens always have a name to show. Swap in
 * secure-storage persistence when real auth lands.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { auth as authApi, setAuthToken } from '@/lib/api';
import type { User } from '@/lib/types';

type AuthContextValue = {
  user: User | null;
  token: string | null;
  /** True until the initial `/auth/me` bootstrap resolves. */
  initializing: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (fullName: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  const apply = useCallback((nextToken: string | null, nextUser: User | null) => {
    setAuthToken(nextToken);
    setToken(nextToken);
    setUser(nextUser);
  }, []);

  // Bootstrap the current user once, unless a sign-in already set one.
  const bootstrapped = useRef(false);
  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;
    let cancelled = false;
    (async () => {
      try {
        const me = await authApi.me();
        if (!cancelled) setUser((prev) => prev ?? me);
      } catch {
        // Server unreachable — leave user null; screens handle it gracefully.
      } finally {
        if (!cancelled) setInitializing(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { token: t, user: u } = await authApi.signIn(email, password);
      apply(t, u);
    },
    [apply],
  );

  const signUp = useCallback(
    async (fullName: string, email: string, password: string) => {
      const { token: t, user: u } = await authApi.signUp(fullName, email, password);
      apply(t, u);
    },
    [apply],
  );

  const signOut = useCallback(() => {
    apply(null, null);
  }, [apply]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, token, initializing, signIn, signUp, signOut }),
    [user, token, initializing, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
