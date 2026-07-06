import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriversModule } from './modules/drivers/drivers.module';
import { NodesModule } from './modules/nodes/nodes.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { createBetterAuth } from './shared/auth/betterAuth/betterAuth';
import { BetterAuthModules } from './shared/auth/betterAuth/betterAuth.module';

@Module({
  imports: [
    PrismaModule,
    // AuthModule.forRoot(createBetterAuth()),
    // BetterAuthModules,
    DriversModule,
    NodesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
