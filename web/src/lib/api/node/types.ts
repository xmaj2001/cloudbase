export enum NodeType {
    FILE = 'FILE',
    FOLDER = 'FOLDER',
    GROUP = 'GROUP',
}

export enum NodeStatus {
    ACTIVE = 'ACTIVE',
    UPLOADING = 'UPLOADING',
    FRAGMENTING = 'FRAGMENTING',
    TRASHED = 'TRASHED',
    DELETED = 'DELETED',
    UNREACHABLE = 'UNREACHABLE',
    CORRUPTED = 'CORRUPTED',
    EXPIRED = 'EXPIRED',
}

export interface NodeLocationDto {
    driverId: string;
    providerName: string;
    providerFileId: string;
    providerPath: string;
    providerCreatedAt: string;
    providerUpdatedAt: string;
}

export interface NodeFragmentationDto {
    isFragmented: boolean;
    totalChunks: number;
    originalHash: string;
}

export interface NodeTrashDto {
    trashedAt: string | null;
    permanentDeleteAt: string | null;
}

export interface NodeAiMetadataDto {
    classified: boolean;
    category: string;
    confidence: number;
    summary: string | null;
}

// Representação exata do Objeto Node que vem no JSON da API
export interface ApiNode {
    id: string;
    userId: string;
    type: NodeType;
    name: string;
    mimeType: string | null;
    extension: string | null;
    size: string | null; // Vem como string devido ao BigInt no JSON
    location: NodeLocationDto | null;
    fragmentation: NodeFragmentationDto;
    parentId: string | null;
    status: NodeStatus;
    errorCount: number;
    lastErrorAt: string | null;
    lastCheckedAt: string | null;
    trash: NodeTrashDto;
    expiresAt: string | null;
    tags: string[];
    thumbnailUrl: string | null;
    aiMetadata: NodeAiMetadataDto;
    createdAt: string;
    updatedAt: string;
}