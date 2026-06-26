import { ApiRequestError } from '@/lib/api/api-request-error';
import { nodeService } from '@/lib/api/node/node.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Chave base para a cache de nodes no React Query
export const NODE_QUERY_KEYS = {
    all: ['nodes'] as const,
    lists: () => [...NODE_QUERY_KEYS.all, 'list'] as const,
    list: (userId: string, parentId: string | null) => [...NODE_QUERY_KEYS.lists(), { userId, parentId }] as const,
    details: () => [...NODE_QUERY_KEYS.all, 'detail'] as const,
    detail: (id: string) => [...NODE_QUERY_KEYS.details(), id] as const,
};

/**
 * Hook para listar os nós (ficheiros, pastas, grupos) de um diretório
 */
export const useNodes = (userId: string, parentId: string | null) => {
    return useQuery({
        queryKey: NODE_QUERY_KEYS.list(userId, parentId),
        queryFn: () => nodeService.getNodes({ userId, parentId }),
        // Evita disparar o fetch se não houver um userId válido
        enabled: !!userId,
    });
};

/**
 * Hook para ver os detalhes de um nó específico
 */
export const useNodeDetails = (id: string) => {
    return useQuery({
        queryKey: NODE_QUERY_KEYS.detail(id),
        queryFn: () => nodeService.getNodeById(id),
        enabled: !!id,
    });
};

/**
 * Hook centralizado para as mutações de nós (Criar, Renomear, Lixeira)
 */
export const useNodeMutations = (userId: string, currentParentId: string | null) => {
    const queryClient = useQueryClient();

    // Atalho helper para invalidar e atualizar a lista atual na UI
    const invalidateCurrentList = () => {
        queryClient.invalidateQueries({
            queryKey: NODE_QUERY_KEYS.list(userId, currentParentId)
        });
    };

    // Mutação: Criar Ficheiro
    const createFile = useMutation({
        mutationFn: nodeService.createFileNode,
        onSuccess: () => invalidateCurrentList(),
        onError: (err) => {
            if (err instanceof ApiRequestError) {
                console.log(err.message, err.fields)
            } else {
                console.error("criar ficheiro.")
            }
        }
    });

    // Mutação: Criar Pasta
    const createFolder = useMutation({
        mutationFn: nodeService.createFolderNode,
        onSuccess: () => invalidateCurrentList(),
        onError: (err) => {
            if (err instanceof ApiRequestError) {
                console.error(err.message)
            } else {
                console.error("Erro desconhecido ao criar pasta.")
            }
        }
    });

    // Mutação: Renomear Nó
    const rename = useMutation({
        mutationFn: ({ id, newName }: { id: string; newName: string }) =>
            nodeService.renameNode(id, newName),
        onSuccess: (response) => {
            invalidateCurrentList();
            // Atualiza também a cache de detalhes desse nó individual
            queryClient.setQueryData(NODE_QUERY_KEYS.detail(response.id), response);
        },
    });

    // Mutação: Mover para a Lixeira
    const moveToTrash = useMutation({
        mutationFn: nodeService.moveNodeToTrash,
        onSuccess: () => invalidateCurrentList(),
    });

    // Mutação: Eliminar Permanentemente
    const deletePermanently = useMutation({
        mutationFn: nodeService.deleteNodePermanently,
        onSuccess: () => invalidateCurrentList(),
    });

    return {
        createFile,
        createFolder,
        rename,
        moveToTrash,
        deletePermanently
    };
};