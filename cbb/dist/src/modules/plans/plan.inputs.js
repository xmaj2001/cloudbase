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
exports.RequestPlanInputDto = exports.ProviderInputDto = exports.FileInputDto = void 0;
exports.IsBigInt = IsBigInt;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
function IsBigInt(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "isBigInt",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value) {
                    return (typeof value === "bigint" ||
                        typeof value === "number" ||
                        (typeof value === "string" && !isNaN(Number(value))));
                },
                defaultMessage(args) {
                    return `${args.property} deve ser um valor numérico válido ou BigInt`;
                },
            },
        });
    };
}
class FileInputDto {
    name;
    extension;
    sizeBytes;
}
exports.FileInputDto = FileInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "video.mp4" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FileInputDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "mp4" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FileInputDto.prototype, "extension", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 10737418240,
        description: "Tamanho em bytes (BigInt)",
    }),
    (0, class_validator_1.IsNotEmpty)(),
    IsBigInt(),
    (0, class_transformer_1.Transform)(({ value }) => BigInt(value)),
    __metadata("design:type", BigInt)
], FileInputDto.prototype, "sizeBytes", void 0);
class ProviderInputDto {
    id;
}
exports.ProviderInputDto = ProviderInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "uuid-do-provider" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProviderInputDto.prototype, "id", void 0);
class RequestPlanInputDto {
    files;
    providers;
}
exports.RequestPlanInputDto = RequestPlanInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [FileInputDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FileInputDto),
    __metadata("design:type", Array)
], RequestPlanInputDto.prototype, "files", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [ProviderInputDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProviderInputDto),
    __metadata("design:type", Array)
], RequestPlanInputDto.prototype, "providers", void 0);
//# sourceMappingURL=plan.inputs.js.map