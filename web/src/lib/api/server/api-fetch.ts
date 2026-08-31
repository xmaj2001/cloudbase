import "server-only";
import { headers as nextHeaders } from "next/headers";
import { ApiNetworkError } from "../api-error";
import { parseApiResponse } from "../parse-response";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

/**
 * Fetch para chamar a partir de Server Components, Server Actions ou
 * Route Handlers — bate DIRETO no NestJS, sem passar pelas tuas
 * próprias rotas `/api` do Next.
 *
 * Como isto corre no servidor, não há browser a anexar cookies
 * automaticamente: lemos o cookie recebido do utilizador via
 * `next/headers` e repassamo-lo manualmente para o NestJS.
 *
 * `import "server-only"` garante que isto nunca é acidentalmente
 * incluído num bundle de client (erro em build time, não em runtime).
 */
export async function apiFetchServer<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const h = new Headers(options?.headers);
  h.set("Content-Type", "application/json");

  const incomingCookie = (await nextHeaders()).get("cookie");
  if (incomingCookie) h.set("cookie", incomingCookie);

  let response: Response;
  try {
    response = await fetch(`${BACKEND_URL}/${url}`, {
      ...options,
      credentials: "include",
      headers: h,
    });
  } catch (error) {
    throw new ApiNetworkError(
      `Falha ao comunicar com o NestJS: ${error instanceof Error ? error.message : "erro de rede"}`,
    );
  }

  return parseApiResponse<T>(response, "apiFetchServer");
}
