import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  CUSTOMER = 'customer',
  SHOP_OWNER = 'shop_owner',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.CUSTOMER })
  role: UserRole;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: 'Kozhikode' })
  city: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
