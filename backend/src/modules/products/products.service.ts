import { Injectable, Optional, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductsService {
  private inMemoryProducts: any[] = [];

  constructor(
    @Optional()
    @InjectModel(Product.name)
    private productModel?: Model<ProductDocument>,
  ) {}

  async findAll(query?: {
    category?: string;
    shopId?: string;
    search?: string;
    hasOffer?: boolean;
    sort?: 'price_asc' | 'price_desc' | 'discount_desc';
  }): Promise<any[]> {
    if (this.productModel) {
      try {
        const filter: any = {};
        if (query?.category && query.category !== 'All') {
          filter.category = query.category;
        }
        if (query?.shopId) {
          filter.shopId = query.shopId;
        }
        if (query?.hasOffer) {
          filter.$or = [
            { discountPercentage: { $gt: 0 } },
            { offerTag: { $ne: '' } },
          ];
        }
        if (query?.search) {
          filter.$or = [
            { title: { $regex: query.search, $options: 'i' } },
            { description: { $regex: query.search, $options: 'i' } },
            { offerTag: { $regex: query.search, $options: 'i' } },
          ];
        }

        let sortOption: any = { createdAt: -1 };
        if (query?.sort === 'price_asc') sortOption = { price: 1 };
        if (query?.sort === 'price_desc') sortOption = { price: -1 };
        if (query?.sort === 'discount_desc') sortOption = { discountPercentage: -1 };

        const products = await this.productModel.find(filter).sort(sortOption).exec();
        if (products && products.length > 0) return products;
      } catch (e) {
        // Fallback
      }
    }

    let results = [...this.inMemoryProducts];
    if (query?.category && query.category !== 'All') {
      results = results.filter((p) => p.category.toLowerCase() === query.category.toLowerCase());
    }
    if (query?.shopId) {
      results = results.filter((p) => p.shopId === query.shopId);
    }
    if (query?.hasOffer) {
      results = results.filter((p) => (p.discountPercentage && p.discountPercentage > 0) || p.offerTag);
    }
    if (query?.search) {
      const q = query.search.toLowerCase();
      results = results.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.offerTag?.toLowerCase().includes(q),
      );
    }

    if (query?.sort === 'price_asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (query?.sort === 'price_desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (query?.sort === 'discount_desc') {
      results.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    }

    return results;
  }

  async findById(id: string): Promise<any> {
    if (this.productModel) {
      try {
        const prod = await this.productModel.findById(id).exec();
        if (prod) return prod;
      } catch (e) {
        // Fallback
      }
    }
    const found = this.inMemoryProducts.find((p) => p._id === id || p.id === id);
    if (!found) {
      throw new NotFoundException('Product not found');
    }
    return found;
  }

  async create(productData: Partial<Product>): Promise<any> {
    // calculate discount if original price is given
    let discountPercentage = productData.discountPercentage || 0;
    if (productData.originalPrice && productData.originalPrice > productData.price) {
      discountPercentage = Math.round(
        ((productData.originalPrice - productData.price) / productData.originalPrice) * 100,
      );
    }

    const payload = {
      ...productData,
      discountPercentage,
    };

    if (this.productModel) {
      try {
        const created = new this.productModel(payload);
        return await created.save();
      } catch (e) {
        // Fallback
      }
    }

    const newProd = {
      _id: 'prod_' + Date.now() + Math.random().toString(36).substring(2, 6),
      id: 'prod_' + Date.now(),
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.inMemoryProducts.push(newProd);
    return newProd;
  }

  async update(id: string, updateData: Partial<Product>): Promise<any> {
    let discountPercentage = updateData.discountPercentage;
    if (updateData.price && updateData.originalPrice && updateData.originalPrice > updateData.price) {
      discountPercentage = Math.round(
        ((updateData.originalPrice - updateData.price) / updateData.originalPrice) * 100,
      );
    }

    const payload = {
      ...updateData,
      ...(discountPercentage !== undefined ? { discountPercentage } : {}),
    };

    if (this.productModel) {
      try {
        const updated = await this.productModel.findByIdAndUpdate(id, payload, { new: true }).exec();
        if (updated) return updated;
      } catch (e) {
        // Fallback
      }
    }

    const index = this.inMemoryProducts.findIndex((p) => p._id === id || p.id === id);
    if (index === -1) {
      throw new NotFoundException('Product not found');
    }
    this.inMemoryProducts[index] = {
      ...this.inMemoryProducts[index],
      ...payload,
      updatedAt: new Date(),
    };
    return this.inMemoryProducts[index];
  }

  async delete(id: string): Promise<any> {
    if (this.productModel) {
      try {
        const res = await this.productModel.findByIdAndDelete(id).exec();
        if (res) return { success: true };
      } catch (e) {
        // Fallback
      }
    }

    const index = this.inMemoryProducts.findIndex((p) => p._id === id || p.id === id);
    if (index === -1) {
      throw new NotFoundException('Product not found');
    }
    this.inMemoryProducts.splice(index, 1);
    return { success: true };
  }

  setSeedData(products: any[]) {
    this.inMemoryProducts = [...products];
  }

  getSeedData() {
    return this.inMemoryProducts;
  }
}
