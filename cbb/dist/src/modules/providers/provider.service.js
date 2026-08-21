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
exports.ProviderServices = exports.bytes = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../shared/prisma/prisma.service");
const credentials_1 = require("./helper/credentials");
exports.bytes = {
    MB: (n) => BigInt(n * 1024 * 1024),
    GB: (n) => BigInt(n * 1024 * 1024 * 1024),
};
let ProviderServices = class ProviderServices {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const isValidCreds = (0, credentials_1.validateCredentialsForType)(dto.type, {
            type: dto.type,
            ...dto.credentials,
        });
        if (!isValidCreds) {
            throw new common_1.BadRequestException(`Credenciais inválidas para o tipo de provedor: ${dto.type}`);
        }
        return this.prisma.provider.create({
            data: {
                userId,
                type: dto.type,
                displayName: dto.displayName,
                priority: dto.priority ?? 0,
                credentials: dto.credentials,
                totalSpace: exports.bytes.GB(10),
                availableSpace: exports.bytes.GB(5),
                usedSpace: exports.bytes.GB(5),
            },
        });
    }
    async list(userId) {
        return this.prisma.provider.findMany({
            where: { userId, isActive: true },
            orderBy: { availableSpace: "desc" },
        });
    }
    async getCredentials(userId, providerId) {
        const provider = await this.prisma.provider.findFirst({
            where: { id: providerId, userId, isActive: true },
            select: { credentials: true },
        });
        if (!provider) {
            throw new common_1.NotFoundException("Provider não encontrado ou inativo");
        }
        return provider.credentials;
    }
    async getSnapshots(userId, selectedIds = []) {
        const providers = await this.prisma.provider.findMany({
            where: {
                userId,
                isActive: true,
                ...(selectedIds.length > 0 && {
                    id: { in: selectedIds },
                }),
            },
            orderBy: { availableSpace: "desc" },
        });
        return providers.map((p) => ({
            id: p.id,
            displayName: p.displayName,
            availableSpace: p.availableSpace ?? 0n,
        }));
    }
    getSupportedProviders() {
        return [
            {
                type: credentials_1.ProviderType.GOOGLE_DRIVE,
                label: "Google Drive",
                category: "CLOUD",
            },
            {
                type: credentials_1.ProviderType.ONEDRIVE,
                label: "Microsoft OneDrive",
                category: "CLOUD",
            },
            { type: credentials_1.ProviderType.DROPBOX, label: "Dropbox", category: "CLOUD" },
            { type: credentials_1.ProviderType.MEGA, label: "MEGA", category: "CLOUD" },
            { type: credentials_1.ProviderType.BOX, label: "Box", category: "CLOUD" },
            { type: credentials_1.ProviderType.PCLOUD, label: "pCloud", category: "CLOUD" },
            { type: credentials_1.ProviderType.YANDEX, label: "Yandex Disk", category: "CLOUD" },
            { type: credentials_1.ProviderType.TELEGRAM, label: "Telegram", category: "SOCIAL" },
            { type: credentials_1.ProviderType.CLOUDINARY, label: "Cloudinary", category: "MEDIA" },
            { type: credentials_1.ProviderType.VPS, label: "VPS Remota", category: "SELF_HOSTED" },
            {
                type: credentials_1.ProviderType.LOCAL_MACHINE,
                label: "Máquina Local",
                category: "SELF_HOSTED",
            },
        ];
    }
};
exports.ProviderServices = ProviderServices;
exports.ProviderServices = ProviderServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProviderServices);
//# sourceMappingURL=provider.service.js.map