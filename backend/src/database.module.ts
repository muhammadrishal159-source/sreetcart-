import { Module, DynamicModule, Global } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import * as net from 'net';
import { User, UserSchema } from './modules/users/user.schema';
import { Shop, ShopSchema } from './modules/shops/shop.schema';
import { Product, ProductSchema } from './modules/products/product.schema';

function checkMongoPort(host: string, port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(800);
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.once('error', () => {
      socket.destroy();
      resolve(false);
    });
    socket.connect(port, host);
  });
}

@Global()
@Module({})
export class DatabaseModule {
  static async forRoot(): Promise<DynamicModule> {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/streetcart';
    const isAtlas = mongoUri.startsWith('mongodb+srv://');
    let hasLocalMongo = false;

    if (!isAtlas) {
      try {
        hasLocalMongo = await checkMongoPort('127.0.0.1', 27017);
      } catch (e) {
        hasLocalMongo = false;
      }
    }

    if (isAtlas || hasLocalMongo) {
      console.log(`🔌 Connecting to MongoDB: ${isAtlas ? 'MongoDB Atlas' : 'Local MongoDB (127.0.0.1:27017)'}`);
      const mongooseRoot = MongooseModule.forRoot(mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });
      const mongooseFeatures = MongooseModule.forFeature([
        { name: User.name, schema: UserSchema },
        { name: Shop.name, schema: ShopSchema },
        { name: Product.name, schema: ProductSchema },
      ]);

      return {
        module: DatabaseModule,
        imports: [mongooseRoot, mongooseFeatures],
        exports: [mongooseFeatures],
      };
    } else {
      console.log('⚡ Notice: Running in Fast In-Memory Seed Mode (No local MongoDB on :27017 detected).');
      console.log('💡 Tip: To persist data to MongoDB Atlas, add your MONGODB_URI to backend/.env');

      // Provide null for models so services fall back seamlessly
      const mockProviders = [
        { provide: getModelToken(User.name), useValue: null },
        { provide: getModelToken(Shop.name), useValue: null },
        { provide: getModelToken(Product.name), useValue: null },
      ];

      return {
        module: DatabaseModule,
        providers: mockProviders,
        exports: mockProviders,
      };
    }
  }
}
