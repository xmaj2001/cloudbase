import { ApiEnvelope } from "../../api.types";
import { apiFetch } from "../../apiFetch";
import { ApiNode, NodeType } from "../types";

interface CreateFileRequest {
    userId: string;
    name: string;
    type: NodeType;
    mimeType: string;
    extension: string;
    size: string; // Enviado como string para bater com o BigInt
    location: {
        driverId: string;
        providerFileId: string;
        providerPath: string;
    };
    parentId?: string | null;
    tags?: string[];
}

export const createFileNode = async (data: CreateFileRequest): Promise<ApiNode> => {
    const { userId, ...bodyData } = data;
    return await apiFetch<ApiNode>(`/nodes/file?userId=${userId}`, {
        method: 'POST',
        body: JSON.stringify(bodyData)
    });
};


interface CreateFolderRequest {
    userId: string;
    name: string;
    type: NodeType;
    location: {
        driverId: string;
        providerFileId: string;
        providerPath: string;
    };
    parentId?: string | null;
}
export const createFolderNode = async (data: CreateFolderRequest): Promise<ApiNode> => {
    const { userId, ...bodyData } = data;
    return await apiFetch<ApiNode>(`/nodes/folder?userId=${userId}`, {
        method: 'POST',
        body: JSON.stringify(bodyData)
    });
};

interface CreateGroupRequest {
    userId: string;
    name: string;
    type: NodeType;
    parentId?: string | null;
}

export const createGroupNode = async (data: CreateGroupRequest): Promise<ApiNode> => {
    const { userId, ...bodyData } = data;
    return await apiFetch<ApiNode>(`/nodes/group?userId=${userId}`, {
        method: 'POST',
        body: JSON.stringify(bodyData)
    });
};