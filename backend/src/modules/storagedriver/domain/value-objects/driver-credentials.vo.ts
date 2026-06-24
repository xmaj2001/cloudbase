// Value Object para as credenciais
// Cada provider tem o seu tipo de credenciais

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
