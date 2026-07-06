import { ApiDriver, DriverCredentials } from "./types";

// Função utilitária para tratar as datas {} estranhas do Prisma 7
const parseBackendDate = (dateField: any): string => {
  if (!dateField) return "";
  if (typeof dateField === 'object' && Object.keys(dateField).length === 0) {
    return new Date().toISOString();
  }
  return String(dateField);
};

// Função para calcular os GB disponíveis de forma amigável para a UI
const bytesToGb = (bytesString: string | null): string => {
  if (!bytesString) return "0.00";
  const bytes = parseFloat(bytesString);
  const gb = bytes / (1024 * 1024 * 1024);
  return gb.toFixed(2);
};

export const mapBackendDriverToApiDriver = (raw: any): ApiDriver => {
  return {
    id: raw.id,
    userId: raw.userId,
    type: raw.type,
    displayName: raw.displayName,
    // Mapeia o booleano 'isActive' para o estado string que o client espera
    status: raw.isActive ? "ACTIVE" : "INACTIVE",
    priority: raw.priority ?? 0,
    
    // Arrumação do objeto space solicitado pelo client
    space: {
      totalSpace: raw.cachedTotalSpace ? String(raw.cachedTotalSpace) : "0",
      usedSpace: raw.cachedUsedSpace ? String(raw.cachedUsedSpace) : "0",
      availableSpace: raw.cachedAvailableSpace ? String(raw.cachedAvailableSpace) : "0",
      availableGb: bytesToGb(raw.cachedAvailableSpace),
      cachedAt: parseBackendDate(raw.spaceCachedAt),
    },

    rootFolderId: raw.rootFolderId ?? "",
    rootFolderPath: raw.rootFolderPath ?? "",
    lastSyncAt: raw.lastSyncAt ? parseBackendDate(raw.lastSyncAt) : null,
    syncError: raw.syncError ?? null,
    createdAt: parseBackendDate(raw.createdAt),
    updatedAt: parseBackendDate(raw.updatedAt),
  };
};

// Função opcional caso queiras extrair e tipar as credenciais separadamente na UI
export const getDriverCredentials = (raw: any): DriverCredentials => {
  return {
    type: raw.type,
    ...raw.credentials,
    // Se o backend enviar data como string nas credenciais, transformamos em objeto Date
    expiresAt: raw.credentials?.expiresAt ? new Date(raw.credentials.expiresAt) : undefined,
  } as DriverCredentials;
};