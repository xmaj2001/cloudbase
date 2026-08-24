import { PrismaService } from "../../shared/prisma/prisma.service";
import { CreateDriverDto, ProviderSnapshot } from "./provider.input";
import { DriverCredentials, ProviderType } from "./helper/credentials";
export declare const bytes: {
    MB: (n: number) => bigint;
    GB: (n: number) => bigint;
};
export interface SupportedProviderInfo {
    type: ProviderType;
    label: string;
    category: "CLOUD" | "SOCIAL" | "MEDIA" | "SELF_HOSTED";
}
export declare class ProviderServices {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateDriverDto): Promise<{
        id: string;
        type: import("../../generated/prisma/enums").ProviderType;
        displayName: string;
        isActive: boolean;
        priority: number;
        credentials: import("@prisma/client/runtime/client").JsonValue;
        folderPath: string | null;
        lastSyncAt: Date | null;
        syncError: string | null;
        totalSpace: bigint | null;
        usedSpace: bigint | null;
        availableSpace: bigint | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    list(userId: string): Promise<{
        id: string;
        type: import("../../generated/prisma/enums").ProviderType;
        displayName: string;
        isActive: boolean;
        priority: number;
        credentials: import("@prisma/client/runtime/client").JsonValue;
        folderPath: string | null;
        lastSyncAt: Date | null;
        syncError: string | null;
        totalSpace: bigint | null;
        usedSpace: bigint | null;
        availableSpace: bigint | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }[]>;
    findById(userId: string, providerId: string): Promise<{
        id: string;
        type: import("../../generated/prisma/enums").ProviderType;
        displayName: string;
        isActive: boolean;
        priority: number;
        credentials: import("@prisma/client/runtime/client").JsonValue;
        folderPath: string | null;
        lastSyncAt: Date | null;
        syncError: string | null;
        totalSpace: bigint | null;
        usedSpace: bigint | null;
        availableSpace: bigint | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    getCredentials(userId: string, providerId: string): Promise<DriverCredentials>;
    getSnapshots(userId: string, selectedIds?: string[]): Promise<ProviderSnapshot[]>;
    getSupportedProviders(): SupportedProviderInfo[];
}
