import { ApiEnvelope } from "../../api.types";
import { apiFetch } from "../../apiFetch";
import { ApiNode } from "../types";


interface GetNodesRequest {
    userId: string;
    parentId: string | null;
}

export const getNodes = async (request: GetNodesRequest): Promise<ApiEnvelope<ApiNode[]>> => {
    // criar as query params de forma dinamica
    const params = new URLSearchParams();
    params.append('userId', request.userId);
    if (request.parentId) {
        params.append('parentId', request.parentId);
    }
    const url = `/nodes?${params.toString()}`;
    const response = await apiFetch<ApiEnvelope<ApiNode[]>>(url, {
        method: 'GET'
    });
    return response;
}

export const getNodeById = async (id: string): Promise<ApiEnvelope<ApiNode>> => {
    const response = await apiFetch<ApiEnvelope<ApiNode>>(`/nodes/${id}`, {
        method: 'GET'
    });
    return response;
};

