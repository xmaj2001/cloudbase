import "server-only";
import { betterFetch } from "@better-fetch/fetch";
import { headers } from "next/headers";
import { cache } from "react";

export type AuthSession = {
  session: {
    expiresAt: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    ipAddress: string;
    userAgent: string;
    userId: string;
    id: string;
  };
  user: {
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
};

/**
 * `cache()` evita repetir a chamada dentro do mesmo pedido — várias
 * Server Components podem pedir a sessão sem gerar N chamadas ao Nest.
 */
export const getServerSession = cache(async (): Promise<AuthSession | null> => {
  const cookieHeader = (await headers()).get("cookie") || "";

  const { data, error } = await betterFetch<AuthSession>(
    "/api/auth/get-session",
    {
      baseURL: process.env.BETTER_AUTH_URL, // URL do Nest, não do Next
      headers: {
        cookie: cookieHeader, // repassa o cookie recebido do browser
      },
    },
  );

  if (error) return null;
  return data;
});
