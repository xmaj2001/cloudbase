import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { StorageDriverRepository } from '../../domain/repo/storage-driver.repository';
import { StorageDriverEntity } from '../../domain/entities/storage-driver.entity';

@Injectable()
export class GetDriverByIdUseCase {
  private readonly logger = new Logger(GetDriverByIdUseCase.name);

  constructor(private readonly driverRepository: StorageDriverRepository) {}

  async execute(id: string, userId: string): Promise<StorageDriverEntity> {
    this.logger.log(`A procurar driver ${id} para o utilizador ${userId}`);

    const driver = await this.driverRepository.findById(id);
    if (!driver || driver.userId !== userId) {
      this.logger.warn(`Driver ${id} não encontrado para o utilizador ${userId}`);
      throw new NotFoundException('Driver de armazenamento não encontrado.');
    }
    return driver;
  }
}
