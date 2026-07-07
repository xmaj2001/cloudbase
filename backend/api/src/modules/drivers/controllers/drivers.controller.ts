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
      'Lista todos os storage drivers, opcionalmente filtrados por usuário.',
  })
  findAll(@Session() session: UserSession) {
    return this.driversService.findAll(session.user.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar Driver',
    description: 'Retorna um storage driver específico pelo seu ID.',
  })
  findOne(@Param('id') id: string) {
    return this.driversService.findById(id);
  }

  @Get('credentials/:id')
  @ApiOperation({
    summary: 'Buscar Credenciais',
    description:
      'Retorna as credenciais de um storage driver específico pelo seu ID.',
  })
  findCredentials(@Param('id') id: string, @Session() session: UserSession) {
    return this.driversService.findCredentialsById(session.user.id, id);
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
