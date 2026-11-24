import { Module, DynamicModule } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DatabaseModule } from './database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ShopsModule } from './modules/shops/shops.module';
import { ProductsModule } from './modules/products/products.module';
import { HealthModule } from './modules/health/health.module';
import { SeedModule } from './modules/seed/seed.module';

dotenv.config();

@Module({})
export class AppModule {
  static async register(): Promise<DynamicModule> {
    const dbModule = await DatabaseModule.forRoot();

    return {
      module: AppModule,
      imports: [
        dbModule,
        UsersModule,
        AuthModule,
        ShopsModule,
        ProductsModule,
        HealthModule,
        SeedModule,
      ],
    };
  }
}
