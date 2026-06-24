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
import { StorageDriverClientService } from '../../app/services/storage-driver-client.service';
import { ConnectDriverDto } from './inputs/connect-driver.dto';
import { UpdateDriverDto } from './inputs/update-driver.dto';
import { StorageDriverResponseDto } from './response/storage-driver.response.dto';
import {
  SuccessResponse,
  SuccessArrayResponse,
} from '../../../../shared/common/envelope.response';
import { ResponseInterceptor } from '../../../../shared/common/interceptors/response.interceptor';

@ApiTags('storage-drivers')
@Controller('storage-drivers')
@UseInterceptors(ResponseInterceptor)
export class StorageDriverController {
  constructor(
    private readonly storageDriverClientService: StorageDriverClientService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Conectar um novo provider de armazenamento' })
  @ApiQuery({
    name: 'userId',
    required: true,
    description: 'ID do utilizador. (substituir por auth guard futuramente)',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SuccessResponse(StorageDriverResponseDto),
    description: 'Driver conectado com sucesso.',
  })
  async connect(
    @Query('userId') userId: string,
    @Body() dto: ConnectDriverDto,
  ): Promise<StorageDriverResponseDto> {
    const driver = await this.storageDriverClientService.connectDriver(
      userId,
      dto,
    );
    return StorageDriverResponseDto.fromEntity(driver);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os drivers do utilizador' })
  @ApiQuery({
    name: 'userId',
    required: true,
    description: 'ID do utilizador.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SuccessArrayResponse(StorageDriverResponseDto),
    description: 'Lista de drivers retornada com sucesso.',
  })
  async findAll(
    @Query('userId') userId: string,
  ): Promise<StorageDriverResponseDto[]> {
    const drivers =
      await this.storageDriverClientService.getDriversByUser(userId);
    return drivers.map((d) => StorageDriverResponseDto.fromEntity(d));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um driver pelo ID' })
  @ApiQuery({
    name: 'userId',
    required: true,
    description: 'ID do utilizador (para verificar ownership).',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SuccessResponse(StorageDriverResponseDto),
    description: 'Driver retornado com sucesso.',
  })
  async findOne(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<StorageDriverResponseDto> {
    const driver = await this.storageDriverClientService.getDriverById(
      id,
      userId,
    );
    return StorageDriverResponseDto.fromEntity(driver);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar nome ou prioridade de um driver' })
  @ApiQuery({
    name: 'userId',
    required: true,
    description: 'ID do utilizador.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SuccessResponse(StorageDriverResponseDto),
    description: 'Driver atualizado com sucesso.',
  })
  async update(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Body() dto: UpdateDriverDto,
  ): Promise<StorageDriverResponseDto> {
    const driver = await this.storageDriverClientService.updateDriver(
      id,
      userId,
      dto,
    );
    return StorageDriverResponseDto.fromEntity(driver);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover (desligar) um driver de armazenamento' })
  @ApiQuery({
    name: 'userId',
    required: true,
    description: 'ID do utilizador.',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Driver removido com sucesso.',
  })
  async remove(
    @Param('id') id: string,
    @Query('userId') userId: string,
  ): Promise<void> {
    await this.storageDriverClientService.deleteDriver(id, userId);
  }
}
