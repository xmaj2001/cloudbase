import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Session } from "@thallesp/nestjs-better-auth";
import type { UserSession } from "@thallesp/nestjs-better-auth";
import { PlanServices } from "./plan.service";
import { RequestPlanInputDto } from "./plan.inputs";

@ApiTags("Plans")
@ApiBearerAuth("session-token")
@Controller({
  path: "plans",
  version: "1",
})
export class PlanController {
  constructor(private readonly planService: PlanServices) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Gerar Plano de Upload",
    description:
      "Analisa os ficheiros e gera um plano de distribuição otimizado pelos storage providers disponíveis.",
  })
  @ApiResponse({ status: 200, description: "Plano gerado com sucesso" })
  @ApiResponse({
    status: 400,
    description: "Ficheiros inválidos ou sem providers",
  })
  async createPlan(
    @Session() session: UserSession,
    @Body() body: RequestPlanInputDto,
  ) {
    // Injeta o userId da sessão no request do serviço
    return this.planService.createPlan({
      userId: session.user.id,
      files: body.files,
      providers: body.providers,
    });
  }
}
