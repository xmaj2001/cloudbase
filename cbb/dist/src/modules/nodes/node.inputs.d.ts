import { NodeType } from "../../generated/prisma/enums";
export declare class CreateNodeDto {
    name: string;
    type: NodeType;
    mimeType?: string;
    extension?: string;
    size?: string | number;
    isFragmented?: boolean;
    totalChunks?: number;
    originalHash?: string;
    providerId: string;
    providerFileId?: string;
    providerPath?: string;
    parentId?: string;
}
export declare class CreateFileChunkDto {
    chunkIndex: number;
    size: string | number;
    startByte: string | number;
    endByte: string | number;
    chunkHash: string;
    providerId: string;
    providerFileId?: string;
    providerPath?: string;
}
export declare class CreateNodeWithChunksDto extends CreateNodeDto {
    chunks?: CreateFileChunkDto[];
}
