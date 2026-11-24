import { Injectable, Optional } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, UserRole } from './user.schema';

@Injectable()
export class UsersService {
  // In-memory fallback if MongoDB is not connected
  private inMemoryUsers: any[] = [];

  constructor(
    @Optional()
    @InjectModel(User.name)
    private userModel?: Model<UserDocument>,
  ) {}

  async create(userData: Partial<User>): Promise<any> {
    if (this.userModel) {
      try {
        const created = new this.userModel(userData);
        return await created.save();
      } catch (e) {
        // Fallback
      }
    }
    const user = {
      _id: 'user_' + Date.now(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.inMemoryUsers.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<any> {
    if (this.userModel) {
      try {
        const user = await this.userModel.findOne({ email: email.toLowerCase() }).exec();
        if (user) return user;
      } catch (e) {
        // Fallback
      }
    }
    return this.inMemoryUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
  }

  async findById(id: string): Promise<any> {
    if (this.userModel) {
      try {
        const user = await this.userModel.findById(id).exec();
        if (user) return user;
      } catch (e) {
        // Fallback
      }
    }
    return this.inMemoryUsers.find((u) => u._id === id || u.id === id);
  }

  async getAll(): Promise<any[]> {
    if (this.userModel) {
      try {
        return await this.userModel.find().select('-password').exec();
      } catch (e) {}
    }
    return this.inMemoryUsers.map(({ password, ...rest }) => rest);
  }
}
