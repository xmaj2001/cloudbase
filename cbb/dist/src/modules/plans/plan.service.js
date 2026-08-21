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
exports.PlanServices = void 0;
const common_1 = require("@nestjs/common");
const provider_service_1 = require("../providers/provider.service");
const MEDIA_EXTENSIONS = new Set([
    "mp4",
    "mov",
    "avi",
    "mkv",
    "webm",
    "flv",
    "mp3",
    "wav",
    "ogg",
    "m4a",
    "aac",
    "flac",
]);
let PlanServices = class PlanServices {
    providers;
    constructor(providers) {
        this.providers = providers;
    }
    async createPlan(req) {
        if (!req.files || req.files.length === 0) {
            throw new common_1.BadRequestException("Nenhum ficheiro fornecido");
        }
        const selectedIds = req.providers?.map((d) => d.id) ?? [];
        const providerSnapshots = await this.providers.getSnapshots(req.userId, selectedIds);
        if (providerSnapshots.length === 0) {
            throw new common_1.BadRequestException("Nenhum provider disponível");
        }
        const sortedFiles = [...req.files].sort((a, b) => b.sizeBytes > a.sizeBytes ? 1 : -1);
        const pool = providerSnapshots.map((p) => ({ ...p }));
        const placed = [];
        const unplaceable = [];
        for (const file of sortedFiles) {
            const direct = this.tryDirect(file, pool);
            if (direct) {
                placed.push(direct);
                continue;
            }
            const fragmented = this.tryFragmentation(file, pool);
            if (fragmented) {
                placed.push(fragmented);
                continue;
            }
            const totalAvailable = pool.reduce((sum, p) => sum + p.availableSpace, 0n);
            const isMedia = MEDIA_EXTENSIONS.has(file.extension.toLowerCase().replace(".", ""));
            unplaceable.push({
                fileName: file.name,
                fileSize: file.sizeBytes,
                missingBytes: file.sizeBytes - totalAvailable,
                hlsAvailable: isMedia,
                reason: isMedia
                    ? `Espaço insuficiente — faltam ${this.formatBytes(file.sizeBytes - totalAvailable)}. É possível usar HLS para distribuir este ficheiro.`
                    : `Espaço insuficiente — faltam ${this.formatBytes(file.sizeBytes - totalAvailable)}`,
            });
        }
        return {
            placed,
            unplaceable,
            canProceed: placed.length > 0,
            totalBytesUsed: placed.reduce((sum, f) => sum + f.fileSize, 0n),
        };
    }
    tryDirect(file, pool) {
        this.sortPool(pool);
        const provider = pool.find((p) => p.availableSpace >= file.sizeBytes);
        if (!provider)
            return null;
        provider.availableSpace -= file.sizeBytes;
        return {
            fileName: file.name,
            fileSize: file.sizeBytes,
            isFragmented: false,
            chunks: [
                {
                    chunkIndex: 0,
                    providerId: provider.id,
                    providerName: provider.displayName,
                    startByte: 0n,
                    endByte: file.sizeBytes,
                    sizeBytes: file.sizeBytes,
                    isFragment: false,
                },
            ],
        };
    }
    tryFragmentation(file, pool) {
        const totalAvailable = pool.reduce((sum, p) => sum + p.availableSpace, 0n);
        if (totalAvailable < file.sizeBytes)
            return null;
        const chunks = [];
        let remaining = file.sizeBytes;
        let offset = 0n;
        while (remaining > 0n) {
            this.sortPool(pool);
            const provider = pool[0];
            if (!provider || provider.availableSpace === 0n)
                break;
            const chunkSize = remaining < provider.availableSpace
                ? remaining
                : provider.availableSpace;
            chunks.push({
                chunkIndex: chunks.length,
                providerId: provider.id,
                providerName: provider.displayName,
                startByte: offset,
                endByte: offset + chunkSize,
                sizeBytes: chunkSize,
                isFragment: true,
            });
            provider.availableSpace -= chunkSize;
            offset += chunkSize;
            remaining -= chunkSize;
        }
        return {
            fileName: file.name,
            fileSize: file.sizeBytes,
            isFragmented: true,
            chunks,
        };
    }
    sortPool(pool) {
        pool.sort((a, b) => b.availableSpace > a.availableSpace
            ? 1
            : b.availableSpace < a.availableSpace
                ? -1
                : 0);
    }
    formatBytes(bytes) {
        const n = Number(bytes);
        if (n < 1_024)
            return `${n} B`;
        if (n < 1_048_576)
            return `${(n / 1_024).toFixed(1)} KB`;
        if (n < 1_073_741_824)
            return `${(n / 1_048_576).toFixed(1)} MB`;
        return `${(n / 1_073_741_824).toFixed(1)} GB`;
    }
};
exports.PlanServices = PlanServices;
exports.PlanServices = PlanServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [provider_service_1.ProviderServices])
], PlanServices);
//# sourceMappingURL=plan.service.js.map