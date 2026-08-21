export declare enum ProviderType {
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
    LOCAL_MACHINE = "LOCAL_MACHINE"
}
export interface GoogleDriveCredentials {
    type: "GOOGLE_DRIVE" | "ONEDRIVE";
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
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
    expiresAt: Date;
    accountEmail: string;
}
export type DriverCredentials = GoogleDriveCredentials | CloudinaryCredentials | TelegramCredentials | MegaCredentials | VpsCredentials | DropboxCredentials;
export declare function isGoogleDriveCredentials(creds: any): creds is GoogleDriveCredentials;
export declare function isCloudinaryCredentials(creds: any): creds is CloudinaryCredentials;
export declare function isTelegramCredentials(creds: any): creds is TelegramCredentials;
export declare function isMegaCredentials(creds: any): creds is MegaCredentials;
export declare function isVpsCredentials(creds: any): creds is VpsCredentials;
export declare function isDropboxCredentials(creds: any): creds is DropboxCredentials;
export declare function validateCredentialsForType(type: ProviderType, credentials: any): boolean;
