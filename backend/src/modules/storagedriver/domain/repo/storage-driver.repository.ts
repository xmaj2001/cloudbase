import { StorageDriverEntity } from '../entities/storage-driver.entity';
import { ProviderType } from '../enums/provider-type.enum';

export abstract class StorageDriverRepository {
  abstract findById(id: string): Promise<StorageDriverEntity | null>;
  abstract findAllByUserId(userId: string): Promise<StorageDriverEntity[]>;
  abstract findByUserIdAndType(
    userId: string,
    type: ProviderType,
  ): Promise<StorageDriverEntity[]>;
  abstract findActiveByUserId(userId: string): Promise<StorageDriverEntity[]>;
  abstract save(driver: StorageDriverEntity): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
