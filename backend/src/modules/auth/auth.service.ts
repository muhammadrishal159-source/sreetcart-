import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    phone?: string;
  }) {
    const existing = await this.usersService.findByEmail(data.email);
    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const role = data.role || UserRole.CUSTOMER;

    const user = await this.usersService.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role,
      phone: data.phone || '',
    });

    const token = this.generateToken(user);
    return {
      message: 'Registration successful',
      token,
      user: {
        id: user._id?.toString() || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    };
  }

  async login(credentials: { email: string; password: string }) {
    const user = await this.usersService.findByEmail(credentials.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.generateToken(user);
    return {
      message: 'Login successful',
      token,
      user: {
        id: user._id?.toString() || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    };
  }

  private generateToken(user: any) {
    const payload = {
      sub: user._id?.toString() || user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
