import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryDriverAdapter } from './cloudinary.driver.adapter';
import { IStorageAdapter } from '../adapter.interface';
import { ProviderType } from 'src/generated/prisma/enums';

@Injectable()
export class DriverAdapterRegistry {
  constructor(
    private readonly cloudinaryAdapter: CloudinaryDriverAdapter,
    // Injeta os próximos adaptadores aqui...
  ) {}

  getAdapter(type: ProviderType): IStorageAdapter {
    switch (type) {
      case 'CLOUDINARY':
        return this.cloudinaryAdapter;
      default:
        throw new NotFoundException(
          `Adaptador para o provedor ${type} ainda não foi implementado.`,
        );
    }
  }
}
