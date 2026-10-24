"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { apiFetch, loadSession, saveSession, setUnauthorizedHandler, type Role, type Session } from "./http";

export const ROLE_HOME: Record<Role, string> = {
  owner: "/owner",
  teacher: "/teacher",
  mentor: "/teacher",
  student: "/student/_",
  parent: "/parent/_",
};

type Ctx = {
  session: Session | null;
  ready: boolean;
  login: (role: Role, institute: string) => Promise<Session>;
  logout: () => void;
  can: (what: "ingest" | "fix_key" | "edit_attendance" | "manage_consent" | "set_tier" | "staff") => boolean;
};
const AuthCtx = createContext<Ctx | null>(null);

const PERMS: Record<string, Role[]> = {
  ingest: ["owner", "teacher"],
  fix_key: ["owner", "teacher"],
  edit_attendance: ["owner", "teacher", "mentor"],
  manage_consent: ["owner"],
  set_tier: ["owner"],
  staff: ["owner", "teacher", "mentor"],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const path = usePathname() ?? "/";
  const expired = useRef(false); // a 401 already chose the redirect (with ?expired=1)

  useEffect(() => {
    setSession(loadSession());
    setReady(true);
  }, []);

  // A 401 anywhere (expired or unknown token) sends the user back to the login screen.
  useEffect(() => {
    setUnauthorizedHandler((reason) => {
      expired.current = true;
      setSession(null);
      const next = typeof window !== "undefined" ? window.location.pathname : "/";
      router.replace(`/login?expired=1&next=${encodeURIComponent(next)}`);
      void reason;
    });
    return () => setUnauthorizedHandler(null);
  }, [router]);

  const login = useCallback(async (role: Role, institute: string) => {
    const s = await apiFetch<{ access_token: string; user: Session["user"] }>("/auth/login", {
      method: "POST",
      json: { role, institute_id: institute },
      auth: false,
    });
    expired.current = false;
    const next: Session = { token: s.access_token, user: s.user };
    saveSession(next);
    setSession(next);
    return next;
  }, []);

  const logout = useCallback(() => {
    saveSession(null);
    setSession(null);
    router.replace("/login");
  }, [router]);

  // Not signed in -> login (except on the login page itself).
  useEffect(() => {
    if (ready && !session && path !== "/login" && !expired.current) router.replace(`/login?next=${encodeURIComponent(path)}`);
  }, [ready, session, path, router]);

  const value = useMemo<Ctx>(
    () => ({ session, ready, login, logout, can: (w) => !!session && (PERMS[w] ?? []).includes(session.user.role) }),
    [session, ready, login, logout]
  );
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const c = useContext(AuthCtx);
  if (!c) throw new Error("AuthProvider missing");
  return c;
}
