import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NODE_QUERY_KEYS } from "../cache.keys";
import { nodeService } from "../node.service";
import { CreateNodeRequest } from "../node.schema";

// ── QUERIES ──────────────────────────────────────────────────────────

export const useNodes = (parentId: string | null = null) => {
  return useQuery({
    queryKey: NODE_QUERY_KEYS.tree(parentId),
    queryFn: () => nodeService.getNodes(parentId),
  });
};

export const useNode = (id: string) => {
  return useQuery({
    queryKey: NODE_QUERY_KEYS.detail(id),
    queryFn: () => nodeService.getNodeById(id),
    enabled: !!id,
  });
};

// ── MUTATIONS ────────────────────────────────────────────────────────

export const useNodeMutations = (currentParentId: string | null = null) => {
  const queryClient = useQueryClient();

  const invalidateCurrentFolder = () => {
    void queryClient.invalidateQueries({
      queryKey: NODE_QUERY_KEYS.tree(currentParentId),
    });
  };

  // Adicionar dentro do hook useNodeMutations:
  const create = useMutation({
    mutationFn: (data: CreateNodeRequest) => nodeService.createNode(data),
    onSuccess: () => invalidateCurrentFolder(),
  });

  const rename = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      nodeService.renameNode(id, name),
    onSuccess: (updatedNode) => {
      invalidateCurrentFolder();
      queryClient.setQueryData(
        NODE_QUERY_KEYS.detail(updatedNode.id),
        updatedNode,
      );
    },
  });

  const trash = useMutation({
    mutationFn: (id: string) => nodeService.moveNodeToTrash(id),
    onSuccess: () => invalidateCurrentFolder(),
  });

  const restore = useMutation({
    mutationFn: (id: string) => nodeService.restoreNodeFromTrash(id),
    onSuccess: () => invalidateCurrentFolder(),
  });

  const move = useMutation({
    mutationFn: ({
      id,
      targetParentId,
    }: {
      id: string;
      targetParentId: string | null;
    }) => nodeService.moveNode(id, targetParentId),
    onSuccess: () => {
      // Invalida a pasta de origem e limpa a árvore global de nós
      void queryClient.invalidateQueries({ queryKey: NODE_QUERY_KEYS.lists() });
    },
  });

  const destroy = useMutation({
    mutationFn: (id: string) => nodeService.permanentDeleteNode(id),
    onSuccess: () => invalidateCurrentFolder(),
  });

  return { create, rename, trash, restore, move, destroy };
};
