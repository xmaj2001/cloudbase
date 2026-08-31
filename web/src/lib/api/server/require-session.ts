import "server-only";
import { redirect } from "next/navigation";
import { getServerSession } from "./session";
import type { AuthSession } from "./session";

/** Redireciona para o login se não houver sessão; devolve a sessão garantida. */
export async function requireSession(callbackUrl: string): Promise<AuthSession> {
  const session = await getServerSession();
  if (!session) {
    redirect(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }
  return session;
}
