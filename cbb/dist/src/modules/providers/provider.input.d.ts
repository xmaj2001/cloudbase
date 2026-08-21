import { ProviderType } from "./helper/credentials";
export declare class GoogleDriveCredentialsDto {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
    accountEmail: string;
    accountId: string;
}
export declare class TelegramCredentialsDto {
    botToken: string;
    chatId: string;
}
export declare class CloudinaryCredentialsDto {
    apiKey: string;
    apiSecret: string;
    cloudName: string;
}
export declare class MegaCredentialsDto {
    sessionToken: string;
    accountEmail: string;
}
export declare class VpsCredentialsDto {
    agentToken: string;
    host?: string;
    port?: number;
}
export declare class DropboxCredentialsDto {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
    accountEmail: string;
}
export declare class CreateDriverDto {
    type: ProviderType;
    displayName: string;
    credentials: GoogleDriveCredentialsDto | CloudinaryCredentialsDto | TelegramCredentialsDto | MegaCredentialsDto | VpsCredentialsDto | DropboxCredentialsDto;
    priority?: number;
}
export interface ProviderSnapshot {
    id: string;
    displayName: string;
    availableSpace: bigint;
}
