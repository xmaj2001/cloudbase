/**
 * Tipos de providers de armazenamento suportados pelo CloudBase.
 * Espelha o enum `ProviderType` do backend (cbb/src/modules/providers/helper/credentials.ts).
 */
export type ProviderType =
  | "GOOGLE_DRIVE"
  | "ONEDRIVE"
  | "TELEGRAM"
  | "CLOUDINARY"
  | "MEGA"
  | "DROPBOX"
  | "BOX"
  | "PCLOUD"
  | "YANDEX"
  | "VPS"
  | "LOCAL_MACHINE";

export type ProviderCategory = "CLOUD" | "SOCIAL" | "MEDIA" | "SELF_HOSTED";

// ── CREDENTIALS — DISCRIMINATED UNIONS ────────────────────────────────────────
// As credenciais NUNCA vêm na listagem. Só chegam via GET /api/providers/:id/credentials.

export interface GoogleDriveCredentials {
  type: "GOOGLE_DRIVE" | "ONEDRIVE";
  accessToken: string;
  refreshToken: string;
  expiresAt: string; // ISO 8601
  accountEmail: string;
  accountId: string;
}

export interface CloudinaryCredentials {
  type: "CLOUDINARY";
  apiKey: string;
  apiSecret: string;
  cloudName: string;
}

export interface TelegramCredentials {
  type: "TELEGRAM";
  botToken: string;
  chatId: string;
}

export interface MegaCredentials {
  type: "MEGA";
  sessionToken: string;
  accountEmail: string;
}

export interface VpsCredentials {
  type: "VPS" | "LOCAL_MACHINE";
  agentToken: string;
  host?: string;
  port?: number;
}

export interface DropboxCredentials {
  type: "DROPBOX" | "BOX" | "PCLOUD" | "YANDEX";
  accessToken: string;
  refreshToken: string;
  expiresAt: string; // ISO 8601
  accountEmail: string;
}

/** Union de todas as credenciais possíveis (discriminated union por `type`). */
export type ProviderCredentials =
  | GoogleDriveCredentials
  | CloudinaryCredentials
  | TelegramCredentials
  | MegaCredentials
  | VpsCredentials
  | DropboxCredentials;

// ── MODELOS DA API ─────────────────────────────────────────────────────────────

/**
 * Representa um provider na listagem (sem `credentials`).
 * Espelha a resposta do backend: GET /v1/providers
 */
export interface ApiProvider {
  id: string;
  userId: string;
  type: ProviderType;
  displayName: string;
  isActive: boolean;
  priority: number;
  /** `folderPath` existe para alguns providers (ex: VPS, Drive). Pode ser `null`. */
  folderPath: string | null;
  lastSyncAt: string | null;
  syncError: string | null;
  /** Espaço total em bytes (string BigInt vindo do Prisma). */
  totalSpace: string | null;
  usedSpace: string | null;
  availableSpace: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Representa um provider com as suas credenciais.
 * Espelha a resposta de: GET /v1/providers/:id/credentials
 */
export interface ApiProviderWithCredentials extends Omit<ApiProvider, never> {
  credentials: ProviderCredentials;
}

/**
 * Info de um tipo de provider suportado.
 * Espelha a resposta de: GET /v1/providers/supported
 */
export interface SupportedProvider {
  type: ProviderType;
  label: string;
  category: ProviderCategory;
}

// ── INPUTS ────────────────────────────────────────────────────────────────────

export interface CreateProviderInput {
  type: ProviderType;
  displayName: string;
  priority?: number;
  credentials: Record<string, unknown>;
}
