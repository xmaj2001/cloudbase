/**
 * Cache keys para todas as queries do domínio "nodes".
 */
export const NODE_QUERY_KEYS = {
  all: ["nodes"] as const,
  lists: () => [...NODE_QUERY_KEYS.all, "list"] as const,
  /** Lista de nodes de um diretório específico (parentId = null → raiz). */
  children: (parentId: string | null) =>
    [...NODE_QUERY_KEYS.lists(), parentId ?? "root"] as const,
  details: () => [...NODE_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...NODE_QUERY_KEYS.details(), id] as const,
};
