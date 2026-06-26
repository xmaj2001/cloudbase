import { ApiEnvelope } from "../../api.types";
import { apiFetch } from "../../apiFetch";
import { ApiNode } from "../types";


interface GetNodesRequest {
    userId: string;
    parentId: string | null;
}

export const getNodes = async (request: GetNodesRequest): Promise<ApiNode[]> => {
    // criar as query params de forma dinamica
    const params = new URLSearchParams();
    params.append('userId', request.userId);
    if (request.parentId) {
        params.append('parentId', request.parentId);
    }
    const url = `/nodes?${params.toString()}`;
    const response = await apiFetch<ApiNode[]>(url, {
        method: 'GET'
    });
    return response;
}

interface GetNodeByIdRequest {
    userId: string;
    id: string;
}

export const getNodeById = async ({ userId, id }: GetNodeByIdRequest): Promise<ApiNode> => {
    const response = await apiFetch<ApiNode>(`/nodes/${id}?userId=${userId}`, {
        method: 'GET'
    });
    return response;
};

