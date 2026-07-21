export const NODE_QUERY_KEYS = {
  all: ["nodes"] as const,
  lists: () => [...NODE_QUERY_KEYS.all, "list"] as const,
  // Cache dinâmico baseado na pasta que o utilizador está a explorar
  tree: (parentId: string | null) => [...NODE_QUERY_KEYS.lists(), { parentId }] as const,
  details: () => [...NODE_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...NODE_QUERY_KEYS.details(), id] as const,
};