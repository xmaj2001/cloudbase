export interface ApiDriver {
    id: string;
    userId: string;
    type: string; // Ex: "GOOGLE_DRIVE", "ONEDRIVE", "TELEGRAM"
    displayName: string;
    status: "ACTIVE" | "INACTIVE" | string;
    priority: number;
    space: {
        totalSpace: string; // BigInt em string
        usedSpace: string;  // BigInt em string
        availableSpace: string; // BigInt em string
        availableGb: string;
        cachedAt: string;
    };
    rootFolderId: string;
    rootFolderPath: string;
    lastSyncAt: string | null;
    syncError: string | null;
    createdAt: string;
    updatedAt: string;
}
