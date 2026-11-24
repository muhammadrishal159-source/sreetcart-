import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShopDocument = Shop & Document;

@Schema({ timestamps: true })
export class Shop {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  slug: string;

  @Prop({ required: true })
  ownerId: string;

  @Prop({ required: true, default: 'Dress' })
  category: string; // Dress, Accessories, Bags & Shoes, Sports, Electronics, etc.

  @Prop({ default: 'Kozhikode' })
  city: string;

  @Prop({ default: 'SM Street' })
  area: string; // SM Street, Mavoor Road, Palayam, Focus Mall, RP Mall, etc.

  @Prop({ required: true })
  address: string;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: '' })
  whatsapp: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300' })
  logoUrl: string;

  @Prop({ default: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200' })
  bannerUrl: string;

  @Prop({ default: '#FF5A36' })
  brandColor: string; // Customizable brand accent color for shop profile

  // Future phase readiness
  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ default: 0 })
  adPriority: number; // For paid homepage boosts in upcoming phases

  @Prop({ default: 4.8 })
  rating: number;

  @Prop({ default: true })
  isOpen: boolean;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
