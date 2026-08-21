import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Req,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { NodeService } from "./node.service";
import { CreateNodeWithChunksDto } from "./node.inputs";
import { Session } from "@thallesp/nestjs-better-auth";
import type { UserSession } from "@thallesp/nestjs-better-auth";

// Assumindo o seu AuthGuard padrão do sistema
@ApiTags("Nodes")
@ApiBearerAuth()
@Controller({
  path: "nodes",
  version: "1",
})
export class NodeController {
  constructor(private readonly nodesService: NodeService) {}

  @Post()
  @ApiOperation({ summary: "Regista um novo ficheiro ou pasta no sistema" })
  async create(
    @Session() session: UserSession,
    @Body() dto: CreateNodeWithChunksDto,
  ) {
    return this.nodesService.create(session.user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: "Lista os ficheiros e pastas de um diretório" })
  @ApiQuery({ name: "parentId", required: false, type: String })
  async listChildren(
    @Session() session: UserSession,
    @Query("parentId") parentId?: string,
  ) {
    const userId = session.user.id;
    return this.nodesService.listChildren(userId, parentId);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Obtém detalhes do node incluindo os fragmentos (chunks)",
  })
  async findOne(@Session() session: UserSession, @Param("id") id: string) {
    const userId = session.user.id;
    return this.nodesService.findOne(userId, id);
  }

  @Delete(":id/trash")
  @ApiOperation({ summary: "Move um ficheiro/pasta para a reciclagem" })
  async moveToTrash(@Session() session: UserSession, @Param("id") id: string) {
    const userId = session.user.id;
    return this.nodesService.moveToTrash(userId, id);
  }
}
