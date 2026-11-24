import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.schema';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('api/shops')
export class ShopsController {
  constructor(private shopsService: ShopsService) {}

  @Get()
  async getAllShops(
    @Query('category') category?: string,
    @Query('search') search?: string,
  ) {
    return this.shopsService.findAll({ category, search });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SHOP_OWNER)
  @Get('my-shop')
  async getMyShop(@CurrentUser() user: any) {
    const shop = await this.shopsService.findByOwnerId(user.id);
    return { shop };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SHOP_OWNER)
  @Post('my-shop')
  async saveMyShop(@CurrentUser() user: any, @Body() shopData: any) {
    const shop = await this.shopsService.createOrUpdateForOwner(user.id, shopData);
    return { message: 'Shop profile saved successfully', shop };
  }

  @Get(':idOrSlug')
  async getShopDetail(@Param('idOrSlug') idOrSlug: string) {
    return this.shopsService.findByIdOrSlug(idOrSlug);
  }

  @Put(':id')
  async updateShop(@Param('id') id: string, @Body() shopData: any) {
    const shop = await this.shopsService.updateById(id, shopData);
    return { message: 'Shop updated successfully', shop };
  }
}
