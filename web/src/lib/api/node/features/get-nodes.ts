import { apiFetch } from "../../apiFetch";
import { mapBackendNodeToApiNode } from "../node.mapper";
import { ApiNode } from "../types";

interface GetNodesRequest {
    userId: string;
    parentId: string | null;
}

export const getNodes = async (request: GetNodesRequest): Promise<ApiNode[]> => {
    const params = new URLSearchParams();
    params.append('userId', request.userId);
    if (request.parentId) {
        params.append('parentId', request.parentId);
    }
    
    const url = `/nodes?${params.toString()}`;
    
    // Tipamos o fetch temporariamente como 'any' para receber a lista pura do back
    const response = await apiFetch<any>(url, {
        method: 'GET'
    });

    // Se o teu apiFetch já desembrulha o envelope { success, data } e entrega o array:
    const rawNodes = Array.isArray(response) ? response : response?.data ?? [];

    // Fazemos a arrumação dos dados aqui usando o Mapper antes de entregar ao componente
    return rawNodes.map(mapBackendNodeToApiNode);
}

interface GetNodeByIdRequest {
    userId: string;
    id: string;
}

export const getNodeById = async ({ userId, id }: GetNodeByIdRequest): Promise<ApiNode> => {
    const response = await apiFetch<any>(`/nodes/${id}?userId=${userId}`, {
        method: 'GET'
    });
    
    const rawNode = response?.id ? response : response?.data;

    // Retorna o objeto individual perfeitamente arrumado
    return mapBackendNodeToApiNode(rawNode);
};