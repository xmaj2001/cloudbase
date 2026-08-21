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
exports.NodeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../shared/prisma/prisma.service");
const enums_1 = require("../../generated/prisma/enums");
let NodeService = class NodeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        if (dto.parentId) {
            const parentNode = await this.prisma.node.findFirst({
                where: { id: dto.parentId, userId, type: enums_1.NodeType.FOLDER },
            });
            if (!parentNode) {
                throw new common_1.NotFoundException("Pasta pai não encontrada");
            }
        }
        return this.prisma.$transaction(async (tx) => {
            const node = await tx.node.create({
                data: {
                    userId,
                    name: dto.name,
                    type: dto.type,
                    mimeType: dto.mimeType,
                    extension: dto.extension,
                    size: dto.size ? BigInt(dto.size) : null,
                    isFragmented: dto.isFragmented ?? false,
                    totalChunks: dto.totalChunks ?? 1,
                    originalHash: dto.originalHash,
                    providerId: dto.providerId,
                    providerFileId: dto.providerFileId,
                    providerPath: dto.providerPath ?? "CloudBase/",
                    parentId: dto.parentId,
                },
            });
            if (dto.isFragmented && dto.chunks && dto.chunks.length > 0) {
                await tx.fileChunk.createMany({
                    data: dto.chunks.map((chunk) => ({
                        nodeId: node.id,
                        chunkIndex: chunk.chunkIndex,
                        size: BigInt(chunk.size),
                        startByte: BigInt(chunk.startByte),
                        endByte: BigInt(chunk.endByte),
                        chunkHash: chunk.chunkHash,
                        providerId: chunk.providerId,
                        providerFileId: chunk.providerFileId,
                        providerPath: chunk.providerPath ?? "CloudBase/_fragments/",
                    })),
                });
            }
            return node;
        });
    }
    async listChildren(userId, parentId) {
        return this.prisma.node.findMany({
            where: {
                userId,
                parentId: parentId ?? null,
                trashedAt: null,
            },
            orderBy: [
                { type: "asc" },
                { name: "asc" },
            ],
            include: {
                _count: {
                    select: { children: true, fileChunks: true },
                },
            },
        });
    }
    async findOne(userId, id) {
        const node = await this.prisma.node.findFirst({
            where: { id, userId, trashedAt: null },
            include: {
                Provider: {
                    select: {
                        id: true,
                        displayName: true,
                        type: true,
                    },
                },
                fileChunks: {
                    orderBy: { chunkIndex: "asc" },
                    include: {
                        Provider: {
                            select: {
                                id: true,
                                displayName: true,
                                type: true,
                            },
                        },
                    },
                },
            },
        });
        if (!node) {
            throw new common_1.NotFoundException("Ficheiro ou pasta não encontrada");
        }
        return node;
    }
    async moveToTrash(userId, id) {
        const node = await this.prisma.node.findFirst({
            where: { id, userId },
        });
        if (!node) {
            throw new common_1.NotFoundException("Node não encontrado");
        }
        return this.prisma.node.update({
            where: { id },
            data: { trashedAt: new Date() },
        });
    }
};
exports.NodeService = NodeService;
exports.NodeService = NodeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NodeService);
//# sourceMappingURL=node.service.js.map