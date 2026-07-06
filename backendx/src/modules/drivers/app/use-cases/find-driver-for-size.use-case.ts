import { Injectable, Logger } from '@nestjs/common';
import { StorageDriverRepository } from '../../domain/repo/storage-driver.repository';
import { StorageDriverEntity } from '../../domain/entities/storage-driver.entity';

@Injectable()
export class FindDriverForSizeUseCase {
  private readonly logger = new Logger(FindDriverForSizeUseCase.name);

  constructor(private readonly repo: StorageDriverRepository) {}

  async execute(
    userId: string,
    requiredBytes: bigint,
  ): Promise<StorageDriverEntity | null> {
    this.logger.log(
      `Procurando driver para ${requiredBytes} bytes (user: ${userId})`,
    );
    const driver = await this.repo.findDriverForSize(userId, requiredBytes);
    if (driver) this.logger.log(`Driver encontrado: ${driver.id}`);
    else this.logger.log(`Nenhum driver com espaço suficiente encontrado`);
    return driver;
  }
}
