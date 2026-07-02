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
import { UserIdQueryDto } from 'src/shared/dtos/query.dto';

@ApiTags('storage-drivers')
@Controller('storage-drivers')
@UseInterceptors(ResponseInterceptor)
export class StorageDriverController {
  constructor(private readonly service: StorageDriverClientService) {}

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
  async connect(@Query() query: UserIdQueryDto, @Body() dto: ConnectDriverDto) {
    const driver = await this.service.connectDriver(query.userId, dto);
    return StorageDriverResponseDto.fromEntity(driver);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar drivers',
    description: 'Listar todos os drivers do utilizador',
  })
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
  async findAll(@Query() query: UserIdQueryDto) {
    const drivers = await this.service.getDriversByUser(query.userId);
    return drivers;
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
  async findOne(@Param('id') id: string, @Query() query: UserIdQueryDto) {
    const driver = await this.service.getDriverById(id, query.userId);
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
    @Query() query: UserIdQueryDto,
    @Body() dto: UpdateDriverDto,
  ) {
    const driver = await this.service.updateDriver(id, query.userId, dto);
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
    @Query() query: UserIdQueryDto,
  ): Promise<void> {
    await this.service.deleteDriver(id, query.userId);
  }
}
