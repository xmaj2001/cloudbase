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
exports.SignUpInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SignUpInput {
    name;
    email;
    password;
    rememberMe;
}
exports.SignUpInput = SignUpInput;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Xavier Jose', description: 'Nome completo' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome é obrigatório' }),
    __metadata("design:type", String)
], SignUpInput.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user64@qcena.com', description: 'Email' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email inválido' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email é obrigatório' }),
    __metadata("design:type", String)
], SignUpInput.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Senha@1234', description: 'Senha (mín. 8 chars)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Senha é obrigatória' }),
    __metadata("design:type", String)
], SignUpInput.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false, default: false }),
    (0, class_validator_1.IsBoolean)({ message: 'rememberMe deve ser booleano' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], SignUpInput.prototype, "rememberMe", void 0);
//# sourceMappingURL=sign-up.input.js.map