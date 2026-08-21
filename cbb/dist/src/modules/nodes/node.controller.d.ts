import { NodeService } from "./node.service";
import { CreateNodeWithChunksDto } from "./node.inputs";
import type { UserSession } from "@thallesp/nestjs-better-auth";
export declare class NodeController {
    private readonly nodesService;
    constructor(nodesService: NodeService);
    create(session: UserSession, dto: CreateNodeWithChunksDto): Promise<{
        type: import("../../generated/prisma/enums").NodeType;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        providerId: string;
        extension: string | null;
        isFragmented: boolean;
        mimeType: string | null;
        size: bigint | null;
        totalChunks: number;
        originalHash: string | null;
        providerFileId: string | null;
        providerPath: string | null;
        parentId: string | null;
        providerCreatedAt: Date | null;
        providerUpdatedAt: Date | null;
        trashedAt: Date | null;
    }>;
    listChildren(session: UserSession, parentId?: string): Promise<({
        _count: {
            fileChunks: number;
            children: number;
        };
    } & {
        type: import("../../generated/prisma/enums").NodeType;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        providerId: string;
        extension: string | null;
        isFragmented: boolean;
        mimeType: string | null;
        size: bigint | null;
        totalChunks: number;
        originalHash: string | null;
        providerFileId: string | null;
        providerPath: string | null;
        parentId: string | null;
        providerCreatedAt: Date | null;
        providerUpdatedAt: Date | null;
        trashedAt: Date | null;
    })[]>;
    findOne(session: UserSession, id: string): Promise<{
        fileChunks: ({
            Provider: {
                type: import("../../generated/prisma/enums").ProviderType;
                id: string;
                displayName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            providerId: string;
            size: bigint;
            providerFileId: string | null;
            providerPath: string | null;
            chunkIndex: number;
            startByte: bigint;
            endByte: bigint;
            chunkHash: string;
            providerCreatedAt: Date | null;
            providerUpdatedAt: Date | null;
            nodeId: string;
        })[];
        Provider: {
            type: import("../../generated/prisma/enums").ProviderType;
            id: string;
            displayName: string;
        };
    } & {
        type: import("../../generated/prisma/enums").NodeType;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        providerId: string;
        extension: string | null;
        isFragmented: boolean;
        mimeType: string | null;
        size: bigint | null;
        totalChunks: number;
        originalHash: string | null;
        providerFileId: string | null;
        providerPath: string | null;
        parentId: string | null;
        providerCreatedAt: Date | null;
        providerUpdatedAt: Date | null;
        trashedAt: Date | null;
    }>;
    moveToTrash(session: UserSession, id: string): Promise<{
        type: import("../../generated/prisma/enums").NodeType;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        providerId: string;
        extension: string | null;
        isFragmented: boolean;
        mimeType: string | null;
        size: bigint | null;
        totalChunks: number;
        originalHash: string | null;
        providerFileId: string | null;
        providerPath: string | null;
        parentId: string | null;
        providerCreatedAt: Date | null;
        providerUpdatedAt: Date | null;
        trashedAt: Date | null;
    }>;
}
