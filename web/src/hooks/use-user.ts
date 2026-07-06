"use client";

import { authClient } from "@/lib/auth/auth-client";

export function useUser() {
  const { data: session, isPending } = authClient.useSession();
  
  return {
    userId: session?.user?.id || null,
    user: session?.user || null,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
  };
}