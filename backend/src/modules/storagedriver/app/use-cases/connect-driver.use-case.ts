import { Injectable, ConflictException } from '@nestjs/common';
import { StorageDriverRepository } from '../../domain/repo/storage-driver.repository';
import { StorageDriverEntity } from '../../domain/entities/storage-driver.entity';
import { ConnectDriverDto } from '../../presentation/http/inputs/connect-driver.dto';
import { DriverCredentials } from '../../domain/value-objects/driver-credentials.vo';

@Injectable()
export class ConnectDriverUseCase {
  constructor(private readonly driverRepository: StorageDriverRepository) {}

  async execute(
    userId: string,
    dto: ConnectDriverDto,
  ): Promise<StorageDriverEntity> {
    // verificar se o utilizador já tem este tipo de provider ligado
    const existing = await this.driverRepository.findByUserIdAndType(
      userId,
      dto.type,
    );
    if (existing.length > 0) {
      throw new ConflictException(
        `Já existe um driver do tipo ${dto.type} ligado a esta conta.`,
      );
    }

    const driver = StorageDriverEntity.create({
      userId,
      type: dto.type,
      displayName: dto.displayName,
      credentials: dto.credentials as unknown as DriverCredentials,
      priority: dto.priority,
    });

    await this.driverRepository.save(driver);
    return driver;
  }
}
