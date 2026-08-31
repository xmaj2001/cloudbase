import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NODE_QUERY_KEYS } from "../cache.keys";
import { nodeService } from "../node.service";
import type { CreateNodeInput } from "../types";

// ── QUERIES ───────────────────────────────────────────────────────────────────

/**
 * Lista o conteúdo de um diretório.
 * `parentId = null` → raiz do utilizador.
 * `parentId = "uuid"` → conteúdo de uma pasta específica.
 *
 * Cada nível do file system tem a sua própria entrada de cache independente,
 * o que permite navegar para trás sem re-fetch desnecessário.
 */
export const useNodeChildren = (parentId: string | null = null) => {
  return useQuery({
    queryKey: NODE_QUERY_KEYS.children(parentId),
    queryFn: () => nodeService.listChildren(parentId),
  });
};

/**
 * Obtém os detalhes completos de um node (chunks + provider).
 * Só dispara quando `id` está presente.
 */
export const useNode = (id: string) => {
  return useQuery({
    queryKey: NODE_QUERY_KEYS.detail(id),
    queryFn: () => nodeService.getNode(id),
    enabled: !!id,
  });
};

// ── MUTATIONS ─────────────────────────────────────────────────────────────────

export const useNodeMutations = () => {
  const queryClient = useQueryClient();

  /** Invalida o diretório `parentId` após uma operação. */
  const invalidateDirectory = (parentId: string | null) => {
    void queryClient.invalidateQueries({
      queryKey: NODE_QUERY_KEYS.children(parentId),
    });
  };

  /** Invalida raiz e o detalhe de um node. */
  const invalidateNodeAndParent = (id: string, parentId: string | null) => {
    invalidateDirectory(parentId);
    queryClient.removeQueries({ queryKey: NODE_QUERY_KEYS.detail(id) });
  };

  /** Cria um ficheiro ou pasta (com ou sem chunks). */
  const create = useMutation({
    mutationFn: (data: CreateNodeInput) => nodeService.createNode(data),
    onSuccess: (newNode) => invalidateDirectory(newNode.parentId),
  });

  /** Move o node para a reciclagem (soft delete). */
  const trash = useMutation({
    mutationFn: (id: string) => nodeService.moveToTrash(id),
    onSuccess: (node) => invalidateNodeAndParent(node.id, node.parentId),
  });

  /** Restaura o node da reciclagem. */
  const restore = useMutation({
    mutationFn: (id: string) => nodeService.restore(id),
    onSuccess: (node) => invalidateDirectory(node.parentId),
  });

  /** Renomeia um ficheiro ou pasta. */
  const rename = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      nodeService.rename(id, name),
    onSuccess: (node) => {
      invalidateDirectory(node.parentId);
      queryClient.setQueryData(NODE_QUERY_KEYS.detail(node.id), node);
    },
  });

  /** Move um node para outro diretório (parentId = null → raiz). */
  const move = useMutation({
    mutationFn: ({ id, parentId }: { id: string; parentId: string | null }) =>
      nodeService.move(id, parentId),
    onSuccess: (node) => {
      // Invalida tanto o diretório de destino como o de origem
      invalidateDirectory(node.parentId);
    },
  });

  /** Elimina permanentemente um node (sem recuperação). */
  const deleteForever = useMutation({
    mutationFn: (id: string) => nodeService.deleteForever(id),
    onSuccess: (node) => invalidateNodeAndParent(node.id, node.parentId),
  });

  return { create, trash, restore, rename, move, deleteForever };
};
