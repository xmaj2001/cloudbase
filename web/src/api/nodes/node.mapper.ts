import { ApiNode, NodeType, NodeStatus } from "./types";

const parsePrismaDate = (dateField: any): string | null => {
  if (!dateField) return null;
  if (typeof dateField === "object" && Object.keys(dateField).length === 0) {
    return new Date().toISOString();
  }
  return new Date(dateField).toISOString();
};

const parsePrismaDateRequired = (dateField: any): string => {
  return parsePrismaDate(dateField) || new Date().toISOString();
};

export const nodeMapper = {
  toApiNode: (raw: any): ApiNode => {
    return {
      id: raw.id,
      userId: raw.userId,
      type: raw.type as NodeType,
      name: raw.name,
      mimeType: raw.mimeType ?? null,
      extension: raw.extension ?? null,
      size: raw.size ?? null,
      parentId: raw.parentId ?? null,
      status: raw.status as NodeStatus,
      errorCount: raw.errorCount ?? 0,
      lastErrorAt: parsePrismaDate(raw.lastErrorAt),
      lastCheckedAt: parsePrismaDate(raw.lastCheckedAt),
      expiresAt: parsePrismaDate(raw.expiresAt),
      tags: raw.tags ?? [],
      thumbnailUrl: raw.thumbnailUrl ?? null,
      createdAt: parsePrismaDateRequired(raw.createdAt),
      updatedAt: parsePrismaDateRequired(raw.updatedAt),

      location: raw.driverId ? {
        driverId: raw.driverId,
        providerName: raw.providerName ?? 'Unknown',
        providerFileId: raw.providerFileId,
        providerPath: raw.providerPath,
        providerCreatedAt: parsePrismaDateRequired(raw.providerCreatedAt),
        providerUpdatedAt: parsePrismaDateRequired(raw.providerUpdatedAt),
      } : null,

      fragmentation: {
        isFragmented: raw.isFragmented ?? false,
        totalChunks: raw.totalChunks ?? 1,
        originalHash: raw.originalHash ?? '',
      },

      trash: {
        trashedAt: parsePrismaDate(raw.trashedAt),
        permanentDeleteAt: parsePrismaDate(raw.permanentDeleteAt),
      },

      aiMetadata: {
        classified: raw.aiClassified ?? false,
        category: raw.aiCategory ?? 'Unclassified',
        confidence: raw.aiConfidence ?? 0,
        summary: raw.aiSummary ?? null,
      },
    };
  }
};