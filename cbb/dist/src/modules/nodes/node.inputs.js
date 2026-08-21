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
exports.CreateNodeWithChunksDto = exports.CreateFileChunkDto = exports.CreateNodeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../generated/prisma/enums");
class CreateNodeDto {
    name;
    type;
    mimeType;
    extension;
    size;
    isFragmented;
    totalChunks;
    originalHash;
    providerId;
    providerFileId;
    providerPath;
    parentId;
}
exports.CreateNodeDto = CreateNodeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "documento.pdf",
        description: "Nome do ficheiro ou pasta",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.NodeType, example: enums_1.NodeType.FILE }),
    (0, class_validator_1.IsEnum)(enums_1.NodeType),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "application/pdf" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "mimeType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "pdf" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "extension", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: "52428800",
        description: "Tamanho em bytes (String ou Number)",
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateNodeDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateNodeDto.prototype, "isFragmented", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateNodeDto.prototype, "totalChunks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "a1b2c3d4..." }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "originalHash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "1f4885e4-ea54-499c-8612-9b5a26f066d5" }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "providerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "gdrive_file_id_123" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "providerFileId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: "CloudBase/" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "providerPath", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "ID da pasta pai, se estiver dentro de uma diretoria",
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateNodeDto.prototype, "parentId", void 0);
class CreateFileChunkDto {
    chunkIndex;
    size;
    startByte;
    endByte;
    chunkHash;
    providerId;
    providerFileId;
    providerPath;
}
exports.CreateFileChunkDto = CreateFileChunkDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFileChunkDto.prototype, "chunkIndex", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateFileChunkDto.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateFileChunkDto.prototype, "startByte", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateFileChunkDto.prototype, "endByte", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFileChunkDto.prototype, "chunkHash", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateFileChunkDto.prototype, "providerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFileChunkDto.prototype, "providerFileId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFileChunkDto.prototype, "providerPath", void 0);
class CreateNodeWithChunksDto extends CreateNodeDto {
    chunks;
}
exports.CreateNodeWithChunksDto = CreateNodeWithChunksDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [CreateFileChunkDto] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateNodeWithChunksDto.prototype, "chunks", void 0);
//# sourceMappingURL=node.inputs.js.map