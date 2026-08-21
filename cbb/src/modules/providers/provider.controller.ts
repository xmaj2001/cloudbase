import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { ProviderServices } from "./provider.service";
import {
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
} from "@nestjs/swagger";
import { Session } from "@thallesp/nestjs-better-auth";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { CreateDriverDto } from "./provider.input";

@ApiTags("Providers")
@ApiBearerAuth("session-token")
@Controller({
  path: "providers",
  version: "1",
})
export class ProviderController {
  constructor(private readonly service: ProviderServices) {}

  @Get("supported")
  @ApiOperation({
    summary: "Listar Providers Suportados",
    description:
      "Retorna a lista de todos os tipos de provedores de armazenamento suportados pela plataforma CloudBase.",
  })
  @ApiResponse({
    status: 200,
    description: "Lista de provedores suportados retornada com sucesso.",
  })
  getSupportedProviders() {
    return this.service.getSupportedProviders();
  }

  @Post()
  @ApiOperation({
    summary: "Criar Provider",
    description: "Regista um novo provedor de armazenamento para o utilizador.",
  })
  @ApiResponse({ status: 201, description: "Provider criado com sucesso." })
  @ApiResponse({ status: 400, description: "Credenciais inválidas." })
  create(@Session() session: UserSession, @Body() dto: CreateDriverDto) {
    return this.service.create(session.user.id, dto);
  }

  @Get()
  @ApiOperation({
    summary: "Listar Providers",
    description: "Lista todos os storage Providers ativos do utilizador.",
  })
  findAll(@Session() session: UserSession) {
    return this.service.list(session.user.id);
  }

  @Get(":id/credentials")
  @ApiOperation({
    summary: "Obter Credenciais",
    description:
      "Retorna as credenciais registradas de um provider específico.",
  })
  @ApiResponse({ status: 200, description: "Credenciais retornadas." })
  @ApiResponse({ status: 404, description: "Provider não encontrado." })
  getCredentials(@Session() session: UserSession, @Param("id") id: string) {
    return this.service.getCredentials(session.user.id, id);
  }
}
