import { Injectable, Optional, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from './shop.schema';

@Injectable()
export class ShopsService {
  private inMemoryShops: any[] = [];

  constructor(
    @Optional()
    @InjectModel(Shop.name)
    private shopModel?: Model<ShopDocument>,
  ) {}

  async findAll(query?: { category?: string; search?: string }): Promise<any[]> {
    if (this.shopModel) {
      try {
        const filter: any = {};
        if (query?.category && query.category !== 'All') {
          filter.category = query.category;
        }
        if (query?.search) {
          filter.$or = [
            { name: { $regex: query.search, $options: 'i' } },
            { area: { $regex: query.search, $options: 'i' } },
            { description: { $regex: query.search, $options: 'i' } },
          ];
        }
        const shops = await this.shopModel.find(filter).sort({ adPriority: -1, isFeatured: -1, createdAt: -1 }).exec();
        if (shops && shops.length > 0) return shops;
      } catch (e) {
        // Fallback
      }
    }

    let results = [...this.inMemoryShops];
    if (query?.category && query.category !== 'All') {
      results = results.filter((s) => s.category.toLowerCase() === query.category.toLowerCase());
    }
    if (query?.search) {
      const q = query.search.toLowerCase();
      results = results.filter(
        (s) =>
          s.name?.toLowerCase().includes(q) ||
          s.area?.toLowerCase().includes(q) ||
          s.description?.toLowerCase().includes(q),
      );
    }
    return results;
  }

  async findByIdOrSlug(idOrSlug: string): Promise<any> {
    if (this.shopModel) {
      try {
        let shop = null;
        if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
          shop = await this.shopModel.findById(idOrSlug).exec();
        }
        if (!shop) {
          shop = await this.shopModel.findOne({ slug: idOrSlug }).exec();
        }
        if (shop) return shop;
      } catch (e) {
        // Fallback
      }
    }
    const found = this.inMemoryShops.find(
      (s) => s._id === idOrSlug || s.id === idOrSlug || s.slug === idOrSlug,
    );
    if (!found) {
      throw new NotFoundException('Shop not found');
    }
    return found;
  }

  async findByOwnerId(ownerId: string): Promise<any> {
    if (this.shopModel) {
      try {
        const shop = await this.shopModel.findOne({ ownerId }).exec();
        if (shop) return shop;
      } catch (e) {
        // Fallback
      }
    }
    return this.inMemoryShops.find((s) => s.ownerId === ownerId) || null;
  }

  async createOrUpdateForOwner(ownerId: string, shopData: Partial<Shop>): Promise<any> {
    const slug = (shopData.name || 'shop')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (this.shopModel) {
      try {
        const existing = await this.shopModel.findOne({ ownerId }).exec();
        if (existing) {
          Object.assign(existing, shopData);
          existing.slug = slug;
          return await existing.save();
        }
        const created = new this.shopModel({
          ...shopData,
          slug,
          ownerId,
        });
        return await created.save();
      } catch (e) {
        // Fallback
      }
    }

    const existingIndex = this.inMemoryShops.findIndex((s) => s.ownerId === ownerId);
    if (existingIndex >= 0) {
      const updated = {
        ...this.inMemoryShops[existingIndex],
        ...shopData,
        slug,
        updatedAt: new Date(),
      };
      this.inMemoryShops[existingIndex] = updated;
      return updated;
    }

    const newShop = {
      _id: 'shop_' + Date.now(),
      id: 'shop_' + Date.now(),
      ownerId,
      slug,
      ...shopData,
      rating: 4.9,
      isOpen: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.inMemoryShops.push(newShop);
    return newShop;
  }

  async updateById(id: string, updateData: Partial<Shop>): Promise<any> {
    if (this.shopModel) {
      try {
        const updated = await this.shopModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (updated) return updated;
      } catch (e) {
        // Fallback
      }
    }

    const index = this.inMemoryShops.findIndex((s) => s._id === id || s.id === id || s.slug === id);
    if (index >= 0) {
      const updated = {
        ...this.inMemoryShops[index],
        ...updateData,
        updatedAt: new Date(),
      };
      this.inMemoryShops[index] = updated;
      return updated;
    }
    return null;
  }

  // Helper for seeding
  setSeedData(shops: any[]) {
    this.inMemoryShops = [...shops];
  }

  getSeedData() {
    return this.inMemoryShops;
  }
}
