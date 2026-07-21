import { Controller, Post, Patch, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePlanDto } from '../dtos/create-plan.dto';
import { ConfirmChunkDto } from '../dtos/confirm-chunk.dto';
import { FragmentationService } from '../services/fragmentation.service';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@ApiTags('Fragmentation & Upload Engine')
@Controller('fragmentation')
export class FragmentationController {
  constructor(private readonly service: FragmentationService) {}

  @Post('plan')
  @ApiOperation({
    summary: 'Criar plano',
    description:
      'Analisa a capacidade dos drivers passados e gera o mapa (pipeline) de chunks necessários para efetuar o upload do ficheiro.',
  })
  @ApiResponse({
    status: 201,
    description:
      'Plano gerado com sucesso. Retorna o nó pai e os sub-chunks em estado PENDING.',
  })
  @ApiResponse({
    status: 400,
    description:
      'Espaço em disco insuficiente ou drivers inativos selecionados.',
  })
  createPlan(@Body() dto: CreatePlanDto, @Session() session: UserSession) {
    return this.service.createPlan(session.user.id, dto);
  }

  @Patch('chunks/:id/confirm')
  @ApiOperation({
    summary: 'Confirmar upload de um fragmento',
    description:
      'Marca um chunk específico como UPLOADED. Caso seja o último fragmento em falta, o ficheiro pai (Node) passará automaticamente para ACTIVE.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID UUID do FileChunk gerado no plano.',
    example: '4f618dac-a3cf-4530-a648-2dc8af046ff4',
  })
  @ApiResponse({
    status: 200,
    description: 'Fragmento confirmado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Fragmento não encontrado.' })
  confirmChunk(@Param('id') id: string, @Body() dto: ConfirmChunkDto) {
    return this.service.confirmChunk(id, dto);
  }
}
