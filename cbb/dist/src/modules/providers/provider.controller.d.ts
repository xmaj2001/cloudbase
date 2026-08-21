import { ProviderServices } from "./provider.service";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { CreateDriverDto } from "./provider.input";
export declare class ProviderController {
    private readonly service;
    constructor(service: ProviderServices);
    getSupportedProviders(): import("./provider.service").SupportedProviderInfo[];
    create(session: UserSession, dto: CreateDriverDto): Promise<{
        type: import("../../generated/prisma/enums").ProviderType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        displayName: string;
        credentials: import("@prisma/client/runtime/client").JsonValue;
        priority: number;
        isActive: boolean;
        folderPath: string | null;
        lastSyncAt: Date | null;
        syncError: string | null;
        totalSpace: bigint | null;
        usedSpace: bigint | null;
        availableSpace: bigint | null;
    }>;
    findAll(session: UserSession): Promise<{
        type: import("../../generated/prisma/enums").ProviderType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        displayName: string;
        credentials: import("@prisma/client/runtime/client").JsonValue;
        priority: number;
        isActive: boolean;
        folderPath: string | null;
        lastSyncAt: Date | null;
        syncError: string | null;
        totalSpace: bigint | null;
        usedSpace: bigint | null;
        availableSpace: bigint | null;
    }[]>;
    getCredentials(session: UserSession, id: string): Promise<import("./helper/credentials").DriverCredentials>;
}
