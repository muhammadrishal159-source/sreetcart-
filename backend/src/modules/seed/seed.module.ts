import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ShopsModule } from '../shops/shops.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ShopsModule, ProductsModule, UsersModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
