import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { DriversService } from '../services/drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo Storage Driver',
    description:
      'Cria um novo storage driver com validação de credenciais específicas do provedor.',
  })
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar Storage Drivers',
    description: 'Lista todos os storage drivers, opcionalmente filtrados por usuário.',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'ID do usuário para filtrar os drivers',
  })
  findAll(@Query('userId') userId?: string) {
    return this.driversService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar Storage Driver por ID',
    description: 'Retorna um storage driver específico pelo seu ID.',
  })
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar Storage Driver',
    description: 'Atualiza as informações de um storage driver existente.',
  })
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover Storage Driver',
    description: 'Deleta um storage driver pelo seu ID.',
  })
  remove(@Param('id') id: string) {
    return this.driversService.remove(id);
  }
}
