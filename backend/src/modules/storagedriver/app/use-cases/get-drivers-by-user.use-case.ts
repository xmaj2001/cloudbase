import { Injectable } from '@nestjs/common';
import { StorageDriverRepository } from '../../domain/repo/storage-driver.repository';
import { StorageDriverEntity } from '../../domain/entities/storage-driver.entity';

@Injectable()
export class GetDriversByUserUseCase {
  constructor(private readonly driverRepository: StorageDriverRepository) {}

  async execute(userId: string): Promise<StorageDriverEntity[]> {
    return this.driverRepository.findAllByUserId(userId);
  }
}
