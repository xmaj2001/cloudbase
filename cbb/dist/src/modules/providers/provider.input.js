"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDriverDto = exports.DropboxCredentialsDto = exports.VpsCredentialsDto = exports.MegaCredentialsDto = exports.CloudinaryCredentialsDto = exports.TelegramCredentialsDto = exports.GoogleDriveCredentialsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const credentials_1 = require("./helper/credentials");
class GoogleDriveCredentialsDto {
    accessToken;
    refreshToken;
    expiresAt;
    accountEmail;
    accountId;
}
exports.GoogleDriveCredentialsDto = GoogleDriveCredentialsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "ya29.a0...",
        description: "Token de acesso do Google Drive",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GoogleDriveCredentialsDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "1//0g...",
        description: "Token de renovação",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GoogleDriveCredentialsDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2026-12-31T00:00:00.000Z",
        description: "Data de expiração do token",
    }),
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GoogleDriveCredentialsDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "user@gmail.com",
        description: "Email da conta Google Drive",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GoogleDriveCredentialsDto.prototype, "accountEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "1234567890",
        description: "ID da conta Google",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GoogleDriveCredentialsDto.prototype, "accountId", void 0);
class TelegramCredentialsDto {
    botToken;
    chatId;
}
exports.TelegramCredentialsDto = TelegramCredentialsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "123456:ABC-DEF...",
        description: "Token do bot Telegram",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TelegramCredentialsDto.prototype, "botToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "-1001234567890",
        description: "Chat ID do Telegram",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TelegramCredentialsDto.prototype, "chatId", void 0);
class CloudinaryCredentialsDto {
    apiKey;
    apiSecret;
    cloudName;
}
exports.CloudinaryCredentialsDto = CloudinaryCredentialsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "abc123key",
        description: "API Key do Cloudinary",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CloudinaryCredentialsDto.prototype, "apiKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "secretValue",
        description: "API Secret do Cloudinary",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CloudinaryCredentialsDto.prototype, "apiSecret", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "my-cloudinary-cloud",
        description: "Cloud Name do Cloudinary",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CloudinaryCredentialsDto.prototype, "cloudName", void 0);
class MegaCredentialsDto {
    sessionToken;
    accountEmail;
}
exports.MegaCredentialsDto = MegaCredentialsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "mega_session_token...",
        description: "Token de sessão do MEGA",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MegaCredentialsDto.prototype, "sessionToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "user@mega.io",
        description: "Email da conta MEGA",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MegaCredentialsDto.prototype, "accountEmail", void 0);
class VpsCredentialsDto {
    agentToken;
    host;
    port;
}
exports.VpsCredentialsDto = VpsCredentialsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "agent_token_here",
        description: "Token do agente CloudBase",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VpsCredentialsDto.prototype, "agentToken", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "192.168.1.100",
        description: "IP ou hostname da VPS",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], VpsCredentialsDto.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 8080,
        description: "Porta da VPS",
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], VpsCredentialsDto.prototype, "port", void 0);
class DropboxCredentialsDto {
    accessToken;
    refreshToken;
    expiresAt;
    accountEmail;
}
exports.DropboxCredentialsDto = DropboxCredentialsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "sl.abc123...",
        description: "Token de acesso do Dropbox",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DropboxCredentialsDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "refresh_token_here",
        description: "Token de renovação",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DropboxCredentialsDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2026-12-31T00:00:00.000Z",
        description: "Data de expiração do token",
    }),
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DropboxCredentialsDto.prototype, "expiresAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "user@email.com",
        description: "Email da conta Dropbox",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DropboxCredentialsDto.prototype, "accountEmail", void 0);
let CreateDriverDto = class CreateDriverDto {
    type;
    displayName;
    credentials;
    priority;
};
exports.CreateDriverDto = CreateDriverDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: credentials_1.ProviderType,
        example: credentials_1.ProviderType.GOOGLE_DRIVE,
        description: "Tipo de provedor de armazenamento",
    }),
    (0, class_validator_1.IsEnum)(credentials_1.ProviderType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "Meu Google Drive Pessoal",
        description: "Nome de exibição para identificar este storage driver",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDriverDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Credenciais específicas do provedor selecionado",
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(GoogleDriveCredentialsDto) },
            { $ref: (0, swagger_1.getSchemaPath)(CloudinaryCredentialsDto) },
            { $ref: (0, swagger_1.getSchemaPath)(TelegramCredentialsDto) },
            { $ref: (0, swagger_1.getSchemaPath)(MegaCredentialsDto) },
            { $ref: (0, swagger_1.getSchemaPath)(VpsCredentialsDto) },
            { $ref: (0, swagger_1.getSchemaPath)(DropboxCredentialsDto) },
        ],
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)((options) => {
        switch (options?.object?.type) {
            case credentials_1.ProviderType.GOOGLE_DRIVE:
            case credentials_1.ProviderType.ONEDRIVE:
                return GoogleDriveCredentialsDto;
            case credentials_1.ProviderType.CLOUDINARY:
                return CloudinaryCredentialsDto;
            case credentials_1.ProviderType.TELEGRAM:
                return TelegramCredentialsDto;
            case credentials_1.ProviderType.MEGA:
                return MegaCredentialsDto;
            case credentials_1.ProviderType.VPS:
            case credentials_1.ProviderType.LOCAL_MACHINE:
                return VpsCredentialsDto;
            case credentials_1.ProviderType.DROPBOX:
            case credentials_1.ProviderType.BOX:
            case credentials_1.ProviderType.PCLOUD:
            case credentials_1.ProviderType.YANDEX:
                return DropboxCredentialsDto;
            default:
                return Object;
        }
    }),
    __metadata("design:type", Object)
], CreateDriverDto.prototype, "credentials", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 0,
        description: "Prioridade relativa (maior = mais preferido)",
        default: 0,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateDriverDto.prototype, "priority", void 0);
exports.CreateDriverDto = CreateDriverDto = __decorate([
    (0, swagger_1.ApiExtraModels)(GoogleDriveCredentialsDto, CloudinaryCredentialsDto, TelegramCredentialsDto, MegaCredentialsDto, VpsCredentialsDto, DropboxCredentialsDto)
], CreateDriverDto);
//# sourceMappingURL=provider.input.js.map