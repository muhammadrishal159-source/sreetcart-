import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ShopsService } from '../shops/shops.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.schema';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('api/products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private shopsService: ShopsService,
  ) {}

  @Get()
  async getProducts(
    @Query('category') category?: string,
    @Query('shopId') shopId?: string,
    @Query('search') search?: string,
    @Query('hasOffer') hasOffer?: string,
    @Query('sort') sort?: 'price_asc' | 'price_desc' | 'discount_desc',
  ) {
    return this.productsService.findAll({
      category,
      shopId,
      search,
      hasOffer: hasOffer === 'true',
      sort,
    });
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SHOP_OWNER)
  @Post()
  async createProduct(@CurrentUser() user: any, @Body() body: any) {
    // Verify that the shop owner owns this shop
    const shop = await this.shopsService.findByOwnerId(user.id);
    if (!shop) {
      throw new ForbiddenException('You must create a shop profile first before adding products.');
    }
    const product = await this.productsService.create({
      ...body,
      shopId: shop._id?.toString() || shop.id,
    });
    return { message: 'Product created successfully', product };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SHOP_OWNER)
  @Put(':id')
  async updateProduct(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() body: any,
  ) {
    const shop = await this.shopsService.findByOwnerId(user.id);
    const existing = await this.productsService.findById(id);
    if (!shop || (existing.shopId !== (shop._id?.toString() || shop.id))) {
      throw new ForbiddenException('You can only update products belonging to your shop');
    }
    const updated = await this.productsService.update(id, body);
    return { message: 'Product updated successfully', product: updated };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SHOP_OWNER)
  @Delete(':id')
  async deleteProduct(@CurrentUser() user: any, @Param('id') id: string) {
    const shop = await this.shopsService.findByOwnerId(user.id);
    const existing = await this.productsService.findById(id);
    if (!shop || (existing.shopId !== (shop._id?.toString() || shop.id))) {
      throw new ForbiddenException('You can only delete products belonging to your shop');
    }
    await this.productsService.delete(id);
    return { message: 'Product deleted successfully' };
  }
}
