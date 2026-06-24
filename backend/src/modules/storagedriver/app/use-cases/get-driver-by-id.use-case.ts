import { Injectable, NotFoundException } from '@nestjs/common';
import { StorageDriverRepository } from '../../domain/repo/storage-driver.repository';
import { StorageDriverEntity } from '../../domain/entities/storage-driver.entity';

@Injectable()
export class GetDriverByIdUseCase {
  constructor(private readonly driverRepository: StorageDriverRepository) {}

  async execute(id: string, userId: string): Promise<StorageDriverEntity> {
    const driver = await this.driverRepository.findById(id);
    if (!driver || driver.userId !== userId) {
      throw new NotFoundException('Driver de armazenamento não encontrado.');
    }
    return driver;
  }
}
