export const DRIVER_QUERY_KEYS = {
  all: ["drivers"] as const,
  lists: () => [...DRIVER_QUERY_KEYS.all, "list"] as const,
  summary: () => [...DRIVER_QUERY_KEYS.all, "summary"] as const,
  details: () => [...DRIVER_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...DRIVER_QUERY_KEYS.details(), id] as const,
};