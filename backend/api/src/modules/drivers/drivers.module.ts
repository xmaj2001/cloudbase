import { Module } from '@nestjs/common';
import { DriversController } from './controllers/drivers.controller';
import { DriversService } from './services/drivers.service';
import { DriverAdapterRegistry } from './helper/adapters/adapter.registry';
import { CloudinaryDriverAdapter } from './helper/adapters/cloudinary.driver.adapter';

@Module({
  controllers: [DriversController],
  providers: [DriversService, DriverAdapterRegistry, CloudinaryDriverAdapter],
  exports: [DriversService],
})
export class DriversModule {}
