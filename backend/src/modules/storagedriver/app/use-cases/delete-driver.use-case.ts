import { Injectable, NotFoundException } from '@nestjs/common';
import { StorageDriverRepository } from '../../domain/repo/storage-driver.repository';

@Injectable()
export class DeleteDriverUseCase {
  constructor(private readonly driverRepository: StorageDriverRepository) {}

  async execute(id: string, userId: string): Promise<void> {
    const driver = await this.driverRepository.findById(id);
    if (!driver || driver.userId !== userId) {
      throw new NotFoundException('Driver de armazenamento não encontrado.');
    }

    await this.driverRepository.delete(id);
  }
}
