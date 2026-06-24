import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infra/prisma/prisma.service';
import { StorageDriverEntity } from '../../domain/entities/storage-driver.entity';
import { StorageDriverRepository } from '../../domain/repo/storage-driver.repository';
import { ProviderType } from '../../domain/enums/provider-type.enum';
import { DriverStatus } from '../../domain/enums/driver-status.enum';
import { DriverCredentials } from '../../domain/value-objects/driver-credentials.vo';
import { DriverSpace } from '../../domain/value-objects/driver-space.vo';
import { StorageDriver as PrismaStorageDriver } from '../../../../generated/prisma/client';

@Injectable()
export class PrismaStorageDriverRepository implements StorageDriverRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<StorageDriverEntity | null> {
    const driver = await this.prisma.storageDriver.findUnique({
      where: { id },
    });
    if (!driver) return null;
    return this.mapToEntity(driver);
  }

  async findAllByUserId(userId: string): Promise<StorageDriverEntity[]> {
    const drivers = await this.prisma.storageDriver.findMany({
      where: { userId },
    });
    return drivers.map((d) => this.mapToEntity(d));
  }

  async findByUserIdAndType(
    userId: string,
    type: ProviderType,
  ): Promise<StorageDriverEntity[]> {
    const drivers = await this.prisma.storageDriver.findMany({
      where: { userId, type },
    });
    return drivers.map((d) => this.mapToEntity(d));
  }

  async findActiveByUserId(userId: string): Promise<StorageDriverEntity[]> {
    const drivers = await this.prisma.storageDriver.findMany({
      where: { userId, isActive: true },
    });
    return drivers.map((d) => this.mapToEntity(d));
  }

  async save(driver: StorageDriverEntity): Promise<void> {
    const space = driver.space;
    await this.prisma.storageDriver.upsert({
      where: { id: driver.id },
      update: {
        displayName: driver.displayName,
        isActive: driver.isActive,
        priority: driver.priority,
        credentials: driver.credentials as object,
        rootFolderId: driver.rootFolderId,
        rootFolderPath: driver.rootFolderPath,
        fragmentFolderId: driver.fragmentFolderId,
        fragmentFolderPath: driver.fragmentFolderPath,
        cachedTotalSpace: space.totalSpace,
        cachedUsedSpace: space.usedSpace,
        cachedAvailableSpace: space.availableSpace,
        spaceCachedAt: space.cachedAt,
        lastSyncAt: driver.lastSyncAt,
        syncError: driver.syncError,
        updatedAt: driver.updatedAt,
      },
      create: {
        id: driver.id,
        userId: driver.userId,
        type: driver.type,

        displayName: driver.displayName,
        isActive: driver.isActive,
        priority: driver.priority,
        credentials: driver.credentials as object,
        rootFolderId: driver.rootFolderId,
        rootFolderPath: driver.rootFolderPath,
        fragmentFolderId: driver.fragmentFolderId,
        fragmentFolderPath: driver.fragmentFolderPath,
        cachedTotalSpace: space.totalSpace,
        cachedUsedSpace: space.usedSpace,
        cachedAvailableSpace: space.availableSpace,
        spaceCachedAt: space.cachedAt,
        lastSyncAt: driver.lastSyncAt,
        syncError: driver.syncError,
        createdAt: driver.createdAt,
        updatedAt: driver.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.storageDriver.delete({ where: { id } });
  }

  private mapToEntity(db: PrismaStorageDriver): StorageDriverEntity {
    const space = DriverSpace.create(
      db.cachedTotalSpace,
      db.cachedUsedSpace,
      db.cachedAvailableSpace,
    );

    // derive a DriverStatus from isActive + syncError fields
    let status = DriverStatus.ACTIVE;
    if (!db.isActive) status = DriverStatus.INACTIVE;
    else if (db.syncError) status = DriverStatus.ERROR;

    return StorageDriverEntity.reconstitute(
      {
        userId: db.userId,
        type: db.type as ProviderType,
        displayName: db.displayName,
        status,
        priority: db.priority,
        credentials: db.credentials as unknown as DriverCredentials,
        rootFolderId: db.rootFolderId,
        rootFolderPath: db.rootFolderPath,
        fragmentFolderId: db.fragmentFolderId,
        fragmentFolderPath: db.fragmentFolderPath,
        space,
        lastSyncAt: db.lastSyncAt,
        syncError: db.syncError,
      },
      db.id,
      db.createdAt,
      db.updatedAt,
    );
  }
}
