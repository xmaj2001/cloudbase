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
import { NodesService } from '../services/nodes.service';
import { CreateNodeDto } from '../dto/create-node.dto';
import { UpdateNodeDto } from '../dto/update-node.dto';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('nodes')
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post()
  create(@Body() input: CreateNodeDto, @Session() session: UserSession) {
    return this.nodesService.create(session.user.id, input);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos',
    description: 'Retorna todos os nós, ou filtra por userId se fornecido',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'ID do usuário para filtrar os nós',
  })
  findAll(@Query('userId') userId?: string) {
    return this.nodesService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar por ID',
    description: 'Retorna um nó específico pelo seu ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID do nó a ser buscado',
  })
  findOne(@Param('id') id: string) {
    return this.nodesService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNodeDto: UpdateNodeDto) {
    return this.nodesService.update(id, updateNodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nodesService.remove(id);
  }
}
