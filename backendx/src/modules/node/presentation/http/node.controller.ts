import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { NodeClientService } from '../../app/services/node-client.service';
import {
  CreateFileNodeDto,
  CreateFolderNodeDto,
  CreateGroupNodeDto,
} from './inputs/create-node.dto';
import { UpdateNodeDto } from './inputs/update-node.dto';
import { MoveNodeDto } from './inputs/move-node.dto';
import { NodeResponseDto } from './response/node.response.dto';
import {
  SuccessResponse,
  SuccessArrayResponse,
} from '../../../../shared/common/envelope.response';
import { ResponseInterceptor } from '../../../../shared/common/interceptors/response.interceptor';

@ApiTags('nodes')
@Controller('nodes')
@UseInterceptors(ResponseInterceptor)
export class NodeController {
  constructor(private readonly nodeClientService: NodeClientService) {}

  @Post('file')
  @ApiOperation({ summary: 'Criar um registo de um ficheiro (FILE)' })
  @ApiQuery({ name: 'userId', required: true })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SuccessResponse(NodeResponseDto),
  })
  async createFile(
    @Query('userId') userId: string,
    @Body() dto: CreateFileNodeDto,
  ): Promise<NodeResponseDto> {
    const node = await this.nodeClientService.createFile(userId, dto);
    return NodeResponseDto.fromEntity(node);
  }

  @Post('folder')
  @ApiOperation({ summary: 'Criar um registo de uma pasta (FOLDER)' })
  @ApiQuery({ name: 'userId', required: true })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SuccessResponse(NodeResponseDto),
  })
  async createFolder(
    @Query('userId') userId: string,
    @Body() dto: CreateFolderNodeDto,
  ): Promise<NodeResponseDto> {
    const node = await this.nodeClientService.createFolder(userId, dto);
    return NodeResponseDto.fromEntity(node);
  }

  @Post('group')
  @ApiOperation({ summary: 'Criar um registo de um grupo (GROUP)' })
  @ApiQuery({ name: 'userId', required: true })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SuccessResponse(NodeResponseDto),
  })
  async createGroup(
    @Query('userId') userId: string,
    @Body() dto: CreateGroupNodeDto,
  ): Promise<NodeResponseDto> {
    const node = await this.nodeClientService.createGroup(userId, dto);
    return NodeResponseDto.fromEntity(node);
  }

  @Get()
  @ApiOperation({ summary: 'Listar nós (ficheiros/pastas) de uma directoria' })
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({
    name: 'parentId',
    required: false,
    description: 'ID da pasta pai. Omitir para listar a raiz.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SuccessArrayResponse(NodeResponseDto),
  })
  async findAll(
    @Query('userId') userId: string,
    @Query('parentId') parentId?: string,
  ): Promise<NodeResponseDto[]> {
    const nodes = await this.nodeClientService.getNodesByParent(
      userId,
      parentId ?? null,
    );
    return nodes.map((n) => NodeResponseDto.fromEntity(n));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um ficheiro/pasta' })
  @ApiQuery({ name: 'userId', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SuccessResponse(NodeResponseDto),
  })
  async findOne(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<NodeResponseDto> {
    const node = await this.nodeClientService.getNodeById(id, userId);
    return NodeResponseDto.fromEntity(node);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar metadados de um ficheiro/pasta (rename, tags, etc)',
  })
  @ApiQuery({ name: 'userId', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SuccessResponse(NodeResponseDto),
  })
  async update(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Body() dto: UpdateNodeDto,
  ): Promise<NodeResponseDto> {
    const node = await this.nodeClientService.updateNode(id, userId, dto);
    return NodeResponseDto.fromEntity(node);
  }

  @Put(':id/move')
  @ApiOperation({ summary: 'Mover ficheiro/pasta para outra localização' })
  @ApiQuery({ name: 'userId', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SuccessResponse(NodeResponseDto),
  })
  async move(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Body() dto: MoveNodeDto,
  ): Promise<NodeResponseDto> {
    const node = await this.nodeClientService.moveNode(
      id,
      userId,
      dto.parentId ?? null,
    );
    return NodeResponseDto.fromEntity(node);
  }

  @Delete(':id/trash')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Mover ficheiro/pasta para a lixeira' })
  @ApiQuery({ name: 'userId', required: true })
  async trash(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<void> {
    await this.nodeClientService.trashNode(id, userId);
  }

  @Put(':id/restore')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Restaurar ficheiro/pasta da lixeira' })
  @ApiQuery({ name: 'userId', required: true })
  async restore(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<void> {
    await this.nodeClientService.restoreNode(id, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar permanentemente um ficheiro/pasta' })
  @ApiQuery({ name: 'userId', required: true })
  async remove(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<void> {
    await this.nodeClientService.deleteNode(id, userId);
  }
}
