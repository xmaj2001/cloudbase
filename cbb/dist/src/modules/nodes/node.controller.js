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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const node_service_1 = require("./node.service");
const node_inputs_1 = require("./node.inputs");
const nestjs_better_auth_1 = require("@thallesp/nestjs-better-auth");
let NodeController = class NodeController {
    nodesService;
    constructor(nodesService) {
        this.nodesService = nodesService;
    }
    async create(session, dto) {
        return this.nodesService.create(session.user.id, dto);
    }
    async listChildren(session, parentId) {
        const userId = session.user.id;
        return this.nodesService.listChildren(userId, parentId);
    }
    async findOne(session, id) {
        const userId = session.user.id;
        return this.nodesService.findOne(userId, id);
    }
    async moveToTrash(session, id) {
        const userId = session.user.id;
        return this.nodesService.moveToTrash(userId, id);
    }
};
exports.NodeController = NodeController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Regista um novo ficheiro ou pasta no sistema" }),
    __param(0, (0, nestjs_better_auth_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, node_inputs_1.CreateNodeWithChunksDto]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Lista os ficheiros e pastas de um diretório" }),
    (0, swagger_1.ApiQuery)({ name: "parentId", required: false, type: String }),
    __param(0, (0, nestjs_better_auth_1.Session)()),
    __param(1, (0, common_1.Query)("parentId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "listChildren", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "Obtém detalhes do node incluindo os fragmentos (chunks)",
    }),
    __param(0, (0, nestjs_better_auth_1.Session)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(":id/trash"),
    (0, swagger_1.ApiOperation)({ summary: "Move um ficheiro/pasta para a reciclagem" }),
    __param(0, (0, nestjs_better_auth_1.Session)()),
    __param(1, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NodeController.prototype, "moveToTrash", null);
exports.NodeController = NodeController = __decorate([
    (0, swagger_1.ApiTags)("Nodes"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)({
        path: "nodes",
        version: "1",
    }),
    __metadata("design:paramtypes", [node_service_1.NodeService])
], NodeController);
//# sourceMappingURL=node.controller.js.map