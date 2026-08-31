import "server-only";
import type { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

/**
 * Usar DENTRO de Route Handlers (`app/api/.../route.ts`) que servem de
 * proxy BFF: recebem o pedido do teu Client Component (via
 * `client/api-fetch.ts`) e reenviam-no para o NestJS.
 *
 * Repassa o cookie recebido (sessão same-origin) e também um eventual
 * `Authorization: Bearer` que o client já tenha mandado — o NestJS
 * aceita qualquer um dos dois, conforme o que sobreviver à travessia.
 */
export function proxyFetch(
  req: NextRequest,
  path: string,
  init?: RequestInit,
) {
  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const cookie = req.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);

  const incomingAuth = req.headers.get("authorization");
  if (incomingAuth && !headers.has("authorization")) {
    headers.set("authorization", incomingAuth);
  }

  return fetch(`${BACKEND_URL}/${path}`, {
    ...init,
    headers,
    credentials: "include",
  });
}
