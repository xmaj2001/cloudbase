import { PrismaService } from "../../shared/prisma/prisma.service";
import { CreateNodeWithChunksDto } from "./node.inputs";
import { NodeType } from "../../generated/prisma/enums";
export declare class NodeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateNodeWithChunksDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: NodeType;
        name: string;
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
    listChildren(userId: string, parentId?: string): Promise<({
        _count: {
            fileChunks: number;
            children: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: NodeType;
        name: string;
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
    findOne(userId: string, id: string): Promise<{
        fileChunks: ({
            Provider: {
                id: string;
                type: import("src/generated/prisma/enums").ProviderType;
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
            id: string;
            type: import("src/generated/prisma/enums").ProviderType;
            displayName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: NodeType;
        name: string;
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
    moveToTrash(userId: string, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: NodeType;
        name: string;
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
