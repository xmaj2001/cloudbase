import { Injectable } from '@nestjs/common';
import { ConnectDriverUseCase } from '../use-cases/connect-driver.use-case';
import { GetDriversByUserUseCase } from '../use-cases/get-drivers-by-user.use-case';
import { GetDriverByIdUseCase } from '../use-cases/get-driver-by-id.use-case';
import { UpdateDriverUseCase } from '../use-cases/update-driver.use-case';
import { DeleteDriverUseCase } from '../use-cases/delete-driver.use-case';
import { ConnectDriverDto } from '../../presentation/http/inputs/connect-driver.dto';
import { UpdateDriverDto } from '../../presentation/http/inputs/update-driver.dto';
import { StorageDriverEntity } from '../../domain/entities/storage-driver.entity';

@Injectable()
export class StorageDriverClientService {
  constructor(
    private readonly connectDriverUseCase: ConnectDriverUseCase,
    private readonly getDriversByUserUseCase: GetDriversByUserUseCase,
    private readonly getDriverByIdUseCase: GetDriverByIdUseCase,
    private readonly updateDriverUseCase: UpdateDriverUseCase,
    private readonly deleteDriverUseCase: DeleteDriverUseCase,
  ) { }

  async connectDriver(
    userId: string,
    dto: ConnectDriverDto,
  ): Promise<StorageDriverEntity> {
    return this.connectDriverUseCase.execute(userId, dto);
  }

  async getDriversByUser(userId: string): Promise<StorageDriverEntity[]> {
    return this.getDriversByUserUseCase.execute(userId);
  }

  async getDriverById(
    id: string,
    userId: string,
  ): Promise<StorageDriverEntity> {
    return this.getDriverByIdUseCase.execute(id, userId);
  }

  async updateDriver(
    id: string,
    userId: string,
    dto: UpdateDriverDto,
  ): Promise<StorageDriverEntity> {
    return this.updateDriverUseCase.execute(id, userId, dto);
  }

  async deleteDriver(id: string, userId: string): Promise<void> {
    await this.deleteDriverUseCase.execute(id, userId);
  }
}
