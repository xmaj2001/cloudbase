import { ApiEnvelope } from "../../api.types";
import { apiFetch } from "../../apiFetch";
import { ApiNode } from "../types";

export const renameNode = async (id: string, newName: string): Promise<ApiNode> => {
    const response = await apiFetch<ApiNode>(`/nodes/${id}/rename`, {
        method: 'PATCH',
        body: JSON.stringify({ name: newName })
    });
    return response;
};

export const moveNodeToTrash = async (id: string): Promise<ApiNode> => {
    const response = await apiFetch<ApiNode>(`/nodes/${id}/trash`, {
        method: 'POST'
    });
    return response;
};

export const deleteNodePermanently = async (id: string): Promise<ApiEnvelope<null>> => {
    const response = await apiFetch<ApiEnvelope<null>>(`/nodes/${id}`, {
        method: 'DELETE'
    });
    return response;
};