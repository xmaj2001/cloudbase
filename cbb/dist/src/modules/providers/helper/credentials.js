"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderType = void 0;
exports.isGoogleDriveCredentials = isGoogleDriveCredentials;
exports.isCloudinaryCredentials = isCloudinaryCredentials;
exports.isTelegramCredentials = isTelegramCredentials;
exports.isMegaCredentials = isMegaCredentials;
exports.isVpsCredentials = isVpsCredentials;
exports.isDropboxCredentials = isDropboxCredentials;
exports.validateCredentialsForType = validateCredentialsForType;
var ProviderType;
(function (ProviderType) {
    ProviderType["GOOGLE_DRIVE"] = "GOOGLE_DRIVE";
    ProviderType["ONEDRIVE"] = "ONEDRIVE";
    ProviderType["TELEGRAM"] = "TELEGRAM";
    ProviderType["CLOUDINARY"] = "CLOUDINARY";
    ProviderType["MEGA"] = "MEGA";
    ProviderType["DROPBOX"] = "DROPBOX";
    ProviderType["BOX"] = "BOX";
    ProviderType["PCLOUD"] = "PCLOUD";
    ProviderType["YANDEX"] = "YANDEX";
    ProviderType["VPS"] = "VPS";
    ProviderType["LOCAL_MACHINE"] = "LOCAL_MACHINE";
})(ProviderType || (exports.ProviderType = ProviderType = {}));
function isGoogleDriveCredentials(creds) {
    return (creds.type === "GOOGLE_DRIVE" ||
        (creds.type === "ONEDRIVE" && creds.accessToken && creds.refreshToken));
}
function isCloudinaryCredentials(creds) {
    return (creds.type === "CLOUDINARY" &&
        creds.apiKey &&
        creds.apiSecret &&
        creds.cloudName);
}
function isTelegramCredentials(creds) {
    return creds.type === "TELEGRAM" && creds.botToken && creds.chatId;
}
function isMegaCredentials(creds) {
    return creds.type === "MEGA" && creds.sessionToken && creds.accountEmail;
}
function isVpsCredentials(creds) {
    return ((creds.type === "VPS" || creds.type === "LOCAL_MACHINE") && creds.agentToken);
}
function isDropboxCredentials(creds) {
    return ((creds.type === "DROPBOX" ||
        creds.type === "BOX" ||
        creds.type === "PCLOUD" ||
        creds.type === "YANDEX") &&
        creds.accessToken &&
        creds.refreshToken);
}
function validateCredentialsForType(type, credentials) {
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
//# sourceMappingURL=credentials.js.map