import type { ApiDriver, DriverCredentials, DriverStatus } from "./types";

const parsePrismaDate = (dateField: any): string => {
  if (!dateField) return new Date().toISOString();
  // Contorna o comportamento do Prisma 7 que às vezes cospe objetos vazios {} nas datas
  if (typeof dateField === "object" && Object.keys(dateField).length === 0) {
    return new Date().toISOString();
  }
  return new Date(dateField).toISOString();
};

export const driverMapper = {
  toApiDriver: (raw: any): ApiDriver => {
    // Determina o status com base no erro de sync ou flag ativa
    let status: DriverStatus = raw.isActive ? "ACTIVE" : "INACTIVE";
    if (raw.syncError) status = "ERROR";
    // Se o teu backend já envia uma string de status, podes usar: raw.status

    const totalSpace = raw.cachedTotalSpace;
    const usedSpace = raw.cachedUsedSpace;
    const availableSpace = raw.cachedAvailableSpace;

    return {
      id: raw.id,
      userId: raw.userId,
      type: raw.type,
      displayName: raw.displayName,
      status,
      priority: raw.priority ?? 0,
      space: {
        totalSpace: raw.type === "TELEGRAM" ? null : totalSpace, // Ilimitado forçado para Telegram
        usedSpace: usedSpace,
        availableSpace: availableSpace,
        cachedAt: parsePrismaDate(raw.spaceCachedAt),
      },
      rootFolderId: raw.rootFolderId ?? "",
      rootFolderPath: raw.rootFolderPath ?? "",
      lastSyncAt: raw.lastSyncAt ? parsePrismaDate(raw.lastSyncAt) : null,
      syncError: raw.syncError ?? null,
      createdAt: parsePrismaDate(raw.createdAt),
      updatedAt: parsePrismaDate(raw.updatedAt),
    };
  },
};