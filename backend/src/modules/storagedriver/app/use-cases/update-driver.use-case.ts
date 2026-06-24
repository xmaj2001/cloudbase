import { Injectable, NotFoundException } from '@nestjs/common';
import { StorageDriverRepository } from '../../domain/repo/storage-driver.repository';
import { StorageDriverEntity } from '../../domain/entities/storage-driver.entity';
import { UpdateDriverDto } from '../../presentation/http/inputs/update-driver.dto';

@Injectable()
export class UpdateDriverUseCase {
  constructor(private readonly driverRepository: StorageDriverRepository) {}

  async execute(
    id: string,
    userId: string,
    dto: UpdateDriverDto,
  ): Promise<StorageDriverEntity> {
    const driver = await this.driverRepository.findById(id);
    if (!driver || driver.userId !== userId) {
      throw new NotFoundException('Driver de armazenamento não encontrado.');
    }

    if (dto.displayName) {
      driver.updateDisplayName(dto.displayName);
    }
    if (dto.priority !== undefined) {
      driver.setPriority(dto.priority);
    }

    await this.driverRepository.save(driver);
    return driver;
  }
}
