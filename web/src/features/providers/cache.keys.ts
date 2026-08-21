/**
 * Cache keys para todas as queries do domínio "providers".
 * Seguindo o padrão dos drivers (src/api/drivers/cache.keys.ts).
 */
export const PROVIDER_QUERY_KEYS = {
  all: ["providers"] as const,
  lists: () => [...PROVIDER_QUERY_KEYS.all, "list"] as const,
  supported: () => [...PROVIDER_QUERY_KEYS.all, "supported"] as const,
  details: () => [...PROVIDER_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...PROVIDER_QUERY_KEYS.details(), id] as const,
  credentials: (id: string) =>
    [...PROVIDER_QUERY_KEYS.detail(id), "credentials"] as const,
};
