import { Injectable, OnModuleInit } from '@nestjs/common';
import { ShopsService } from '../shops/shops.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { SEED_SHOPS, SEED_PRODUCTS } from './seed.data';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../users/user.schema';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private shopsService: ShopsService,
    private productsService: ProductsService,
    private usersService: UsersService,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    // 1. Seed default users
    const defaultPassword = await bcrypt.hash('streetcart123', 10);
    
    // Customer
    const customer = await this.usersService.findByEmail('customer@streetcart.in');
    if (!customer) {
      await this.usersService.create({
        name: 'Arjun Kozhikode',
        email: 'customer@streetcart.in',
        password: defaultPassword,
        role: UserRole.CUSTOMER,
        phone: '+91 98470 11111',
      });
    }

    // Shop Owner 1
    const owner = await this.usersService.findByEmail('owner@smstreet.in');
    if (!owner) {
      await this.usersService.create({
        name: 'Rahim (SM Street)',
        email: 'owner@smstreet.in',
        password: defaultPassword,
        role: UserRole.SHOP_OWNER,
        phone: '+91 98470 12345',
      });
    }

    // 2. Seed Shops & Products into memory and DB
    this.shopsService.setSeedData(SEED_SHOPS);
    this.productsService.setSeedData(SEED_PRODUCTS);

    return {
      message: 'StreetCart Kozhikode database seeded successfully!',
      shopsCount: SEED_SHOPS.length,
      productsCount: SEED_PRODUCTS.length,
    };
  }
}
