import { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000/v1";

export function backendFetch(
  req: NextRequest,
  path: string,
  init?: RequestInit,
) {
  // 🔑 Tira TODAS os cookies (o browser vai enviar automaticamente)
  const cookieHeader = req.headers.get("cookie") || "";

  // Se quiseres passar também como Bearer (recomendado para segurança):
  const token =
    req.cookies.get("better-auth.session_token")?.value ||
    req.cookies.get("__Secure-better-auth.session_token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    cookie: cookieHeader, // ← Passa TODOS os cookies
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  console.log("🔍 DEBUG - Cookie Header:", cookieHeader);
  console.log("🔍 DEBUG - Token Bearer:", headers.Authorization);

  const customHeaders = (init?.headers as Record<string, string>) || {};
  Object.assign(headers, customHeaders);

  return fetch(`${BACKEND_URL}/${path}`, {
    ...init,
    headers,
    credentials: "include", // 🔑 Isto garante que cookies são enviados
  });
}
