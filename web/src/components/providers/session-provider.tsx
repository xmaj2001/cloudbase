// components/providers/session-provider.tsx
"use client";
import { createContext, useContext } from "react";
import type { AuthSession } from "@/api/core/get-session.server";

const SessionContext = createContext<AuthSession | null>(null);

export function SessionProvider({
  session,
  children,
}: {
  session: AuthSession;
  children: React.ReactNode;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const session = useContext(SessionContext);
  if (!session)
    throw new Error("useSession precisa estar dentro de <SessionProvider>");
  return session;
}
