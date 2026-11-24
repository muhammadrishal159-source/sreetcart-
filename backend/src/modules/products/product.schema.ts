import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ required: true })
  shopId: string;

  @Prop({ required: true, default: 'Dress' })
  category: string; // Dress, Accessories, Bags & Shoes, Sports, Electronics, etc.

  @Prop({ required: true })
  price: number; // Current selling / offer price (in INR ₹)

  @Prop({ default: 0 })
  originalPrice: number; // Original MRP

  @Prop({ default: 0 })
  discountPercentage: number; // Calculated or custom discount %

  @Prop({ default: '' })
  offerTag: string; // e.g. "Flat 30% Off", "Buy 1 Get 1", "Festival Deal"

  @Prop({ default: true })
  inStock: boolean;

  @Prop({ default: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' })
  imageUrl: string;

  // Future phase readiness
  @Prop({ default: false })
  isOfferOfTheDay: boolean;

  @Prop({ default: 0 })
  featuredScore: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
