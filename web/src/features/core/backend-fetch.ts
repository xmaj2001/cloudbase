import { NextRequest } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export function backendFetch(
  req: NextRequest,
  path: string,
  init?: RequestInit,
) {
  // Extrai o token de sessão para o passar como Bearer, suportando HTTP e HTTPS
  const token = 
    req.cookies.get("better-auth.session_token")?.value || 
    req.cookies.get("__Secure-better-auth.session_token")?.value;
    
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    cookie: req.headers.get("cookie") ?? "",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Merge with any custom headers
  const customHeaders = (init?.headers as Record<string, string>) || {};
  Object.assign(headers, customHeaders);

  return fetch(`${BACKEND_URL}/${path}`, {
    ...init,
    headers,
  });
}
