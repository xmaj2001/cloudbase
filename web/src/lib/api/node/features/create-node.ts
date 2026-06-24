import { ApiEnvelope } from "../../api.types";
import { apiFetch } from "../../apiFetch";
import { ApiNode } from "../types";

interface CreateFileRequest {
    userId: string;
    name: string;
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

export const createFileNode = async (data: CreateFileRequest): Promise<ApiEnvelope<ApiNode>> => {
    return await apiFetch<ApiEnvelope<ApiNode>>('/nodes/file', {
        method: 'POST',
        body: JSON.stringify(data)
    });
};


interface CreateFolderRequest {
    userId: string;
    name: string;
    location: {
        driverId: string;
        providerFileId: string;
        providerPath: string;
    };
    parentId?: string | null;
}
export const createFolderNode = async (data: CreateFolderRequest): Promise<ApiEnvelope<ApiNode>> => {
    return await apiFetch<ApiEnvelope<ApiNode>>('/nodes/folder', {
        method: 'POST',
        body: JSON.stringify(data)
    });
};

interface CreateGroupRequest {
    userId: string;
    name: string;
    parentId?: string | null;
}

export const createGroupNode = async (data: CreateGroupRequest): Promise<ApiEnvelope<ApiNode>> => {
    return await apiFetch<ApiEnvelope<ApiNode>>('/nodes/group', {
        method: 'POST',
        body: JSON.stringify(data)
    });
};