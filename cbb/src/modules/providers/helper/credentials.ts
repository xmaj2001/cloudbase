/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/**
 * Value Objects para Credenciais de Storage Drivers
 * Cada provider tem seu próprio tipo de credenciais específicas
 */

export enum ProviderType {
  GOOGLE_DRIVE = "GOOGLE_DRIVE",
  ONEDRIVE = "ONEDRIVE",
  TELEGRAM = "TELEGRAM",
  CLOUDINARY = "CLOUDINARY",
  MEGA = "MEGA",
  DROPBOX = "DROPBOX",
  BOX = "BOX",
  PCLOUD = "PCLOUD",
  YANDEX = "YANDEX",
  VPS = "VPS",
  LOCAL_MACHINE = "LOCAL_MACHINE",
}

/**
 * Credenciais para Google Drive e OneDrive (OAuth 2.0)
 */
export interface GoogleDriveCredentials {
  type: "GOOGLE_DRIVE" | "ONEDRIVE";
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  accountEmail: string;
  accountId: string;
}

/**
 * Credenciais para Cloudinary
 */
export interface CloudinaryCredentials {
  type: "CLOUDINARY";
  apiKey: string;
  apiSecret: string;
  cloudName: string;
}

/**
 * Credenciais para Telegram Bot
 */
export interface TelegramCredentials {
  type: "TELEGRAM";
  botToken: string;
  chatId: string;
}

/**
 * Credenciais para MEGA
 */
export interface MegaCredentials {
  type: "MEGA";
  sessionToken: string;
  accountEmail: string;
}

/**
 * Credenciais para VPS e Local Machine
 */
export interface VpsCredentials {
  type: "VPS" | "LOCAL_MACHINE";
  agentToken: string;
  host?: string;
  port?: number;
}

/**
 * Credenciais para Dropbox, Box, pCloud, Yandex (OAuth 2.0)
 */
export interface DropboxCredentials {
  type: "DROPBOX" | "BOX" | "PCLOUD" | "YANDEX";
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  accountEmail: string;
}

/**
 * Union type de todas as credenciais suportadas
 * Uso: discriminated union para type-safe handling
 */
export type DriverCredentials =
  | GoogleDriveCredentials
  | CloudinaryCredentials
  | TelegramCredentials
  | MegaCredentials
  | VpsCredentials
  | DropboxCredentials;

/**
 * Type guard para validar tipo de credencial
 */
export function isGoogleDriveCredentials(
  creds: any,
): creds is GoogleDriveCredentials {
  return (
    creds.type === "GOOGLE_DRIVE" ||
    (creds.type === "ONEDRIVE" && creds.accessToken && creds.refreshToken)
  );
}

export function isCloudinaryCredentials(
  creds: any,
): creds is CloudinaryCredentials {
  return (
    creds.type === "CLOUDINARY" &&
    creds.apiKey &&
    creds.apiSecret &&
    creds.cloudName
  );
}

export function isTelegramCredentials(
  creds: any,
): creds is TelegramCredentials {
  return creds.type === "TELEGRAM" && creds.botToken && creds.chatId;
}

export function isMegaCredentials(creds: any): creds is MegaCredentials {
  return creds.type === "MEGA" && creds.sessionToken && creds.accountEmail;
}

export function isVpsCredentials(creds: any): creds is VpsCredentials {
  return (
    (creds.type === "VPS" || creds.type === "LOCAL_MACHINE") && creds.agentToken
  );
}

export function isDropboxCredentials(creds: any): creds is DropboxCredentials {
  return (
    (creds.type === "DROPBOX" ||
      creds.type === "BOX" ||
      creds.type === "PCLOUD" ||
      creds.type === "YANDEX") &&
    creds.accessToken &&
    creds.refreshToken
  );
}

/**
 * Valida credenciais conforme o tipo de provider
 */
export function validateCredentialsForType(
  type: ProviderType,
  credentials: any,
): boolean {
  switch (type) {
    case ProviderType.GOOGLE_DRIVE:
    case ProviderType.ONEDRIVE:
      return isGoogleDriveCredentials(credentials);
    case ProviderType.CLOUDINARY:
      return isCloudinaryCredentials(credentials);
    case ProviderType.TELEGRAM:
      return isTelegramCredentials(credentials);
    case ProviderType.MEGA:
      return isMegaCredentials(credentials);
    case ProviderType.VPS:
    case ProviderType.LOCAL_MACHINE:
      return isVpsCredentials(credentials);
    case ProviderType.DROPBOX:
    case ProviderType.BOX:
    case ProviderType.PCLOUD:
    case ProviderType.YANDEX:
      return isDropboxCredentials(credentials);
    default:
      return false;
  }
}
