import { Injectable, Logger } from '@nestjs/common';
import { StorageDriverRepository } from '../../domain/repo/storage-driver.repository';
import { StorageDriverEntity } from '../../domain/entities/storage-driver.entity';

@Injectable()
export class GetDriversByUserUseCase {
  private readonly logger = new Logger(GetDriversByUserUseCase.name);

  constructor(private readonly driverRepository: StorageDriverRepository) {}

  async execute(userId: string): Promise<StorageDriverEntity[]> {
    this.logger.log(`A procurar todos os drivers do utilizador ${userId}`);
    return this.driverRepository.findAllByUserId(userId);
  }
}
