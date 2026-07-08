import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { DriversService } from '../services/drivers.service';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo Driver',
    description:
      'Cria um novo storage driver com validação de credenciais específicas do provedor.',
  })
  create(@Body() input: CreateDriverDto, @Session() session: UserSession) {
    return this.driversService.create(session.user.id, input);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar Drivers',
    description:
      'Lista todos os storage drivers do utilizador, com espaço já convertido para GB (totalGb é null quando o provedor não tem limite fixo, ex: Telegram).',
  })
  findAll(@Session() session: UserSession) {
    return this.driversService.list(session.user.id);
  }

  @Get('summary')
  @ApiOperation({
    summary: 'Resumo dos Drivers',
    description:
      'Retorna espaço total, espaço usado e contagens de drivers do utilizador autenticado, agregados diretamente na base de dados (sem bater nos provedores externos).',
  })
  getSummary(@Session() session: UserSession) {
    return this.driversService.getSummary(session.user.id);
  }

  // ⚠️ Rotas estáticas (como 'summary' acima) precisam vir ANTES de
  // rotas dinâmicas como ':id'. Se ':id' fosse declarado primeiro,
  // uma request pra GET /drivers/summary seria capturada por
  // findOne() com id="summary" — nunca chegaria aqui.
  @Get(':id')
  @ApiOperation({
    summary: 'Buscar Driver',
    description: 'Retorna um storage driver específico pelo seu ID.',
  })
  findOne(@Param('id') id: string) {
    return this.driversService.findById(id);
  }

  @Get(':id/credentials')
  @ApiOperation({
    summary: 'Buscar Credenciais',
    description:
      'Retorna as credenciais de um storage driver específico pelo seu ID.',
  })
  findCredentials(@Param('id') id: string, @Session() session: UserSession) {
    return this.driversService.findCredentialsById(session.user.id, id);
  }

  @Patch(':id/sync')
  @ApiOperation({
    summary: 'Sincronizar Driver',
    description:
      'Consulta o provedor externo em tempo real e atualiza o cache de espaço (total, usado e disponível) do driver.',
  })
  sync(@Param('id') id: string, @Session() session: UserSession) {
    return this.driversService.sync(session.user.id, id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar Driver',
    description: 'Atualiza as informações de um storage driver existente.',
  })
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover Driver',
    description: 'Deleta um storage driver pelo seu ID.',
  })
  remove(@Param('id') id: string) {
    return this.driversService.remove(id);
  }
}
