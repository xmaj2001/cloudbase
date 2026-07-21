export type DriverType = 'GOOGLE_DRIVE' | 'ONEDRIVE' | 'TELEGRAM' | 'MEGA' | 'VPS' | 'CLOUDINARY' | 'DROPBOX' | 'BOX' | 'PCLOUD' | 'YANDEX' | 'LOCAL_MACHINE';
export type DriverStatus = 'ACTIVE' | 'SYNCING' | 'ERROR' | 'INACTIVE';

// ── CREDENTIALS DISCRIMINATED UNIONS ──────────────────────────────────
export interface GoogleDriveCredentials {
  type: 'GOOGLE_DRIVE' | 'ONEDRIVE';
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  accountEmail: string;
  accountId: string;
}

export interface CloudinaryCredentials {
  type: 'CLOUDINARY';
  apiKey: string;
  apiSecret: string;
  cloudName: string;
}

export interface TelegramCredentials {
  type: 'TELEGRAM';
  botToken: string;
  chatId: string;
}

export interface MegaCredentials {
  type: 'MEGA';
  sessionToken: string;
  accountEmail: string;
}

export interface VpsCredentials {
  type: 'VPS' | 'LOCAL_MACHINE';
  agentToken: string;
  host?: string;
  port?: number;
}

export interface DropboxCredentials {
  type: 'DROPBOX' | 'BOX' | 'PCLOUD' | 'YANDEX';
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  accountEmail: string;
}

export type DriverCredentials =
  | GoogleDriveCredentials
  | CloudinaryCredentials
  | TelegramCredentials
  | MegaCredentials
  | VpsCredentials
  | DropboxCredentials;

// ── CONTRATO DE INTERFACE PARA A UI ───────────────────────────────────
export interface DriverSpaceInfo {
  totalSpace: number | null; // null = ilimitado (ex: Telegram)
  usedSpace: number;
  availableSpace: number;
  cachedAt: string;
}

export interface ApiDriver {
  id: string;
  userId: string;
  type: DriverType;
  displayName: string;
  status: DriverStatus;
  priority: number;
  space: DriverSpaceInfo;
  rootFolderId: string;
  rootFolderPath: string;
  lastSyncAt: string | null;
  syncError: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DriverSummary {
  totalGb: number;
  usedGb: number;
  driversCount: number;
  activeCount: number;
}

export interface ConnectDriverInput {
  type: DriverType;
  displayName: string;
  priority?: number;
  credentials: Record<string, any>;
}

export interface UpdateDriverInput {
  displayName?: string;
  priority?: number;
}