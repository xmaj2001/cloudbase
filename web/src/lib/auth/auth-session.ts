import { headers } from "next/headers";
import { ApiUserSession } from "./user";
import { ApiEnvelope } from "@/api/core/api.types";

export async function getServerSession() {
  const res = await fetch(`${process.env.API_URL}/auth/me`, {
    headers: await headers(), // repassa os cookies do browser para o NestJS
    cache: "no-store", // Isso garante que a cada requisição seja feita uma requisição ao servidor e não utilize o cache
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data as ApiEnvelope<ApiUserSession>;
}
