import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('api/seed')
export class SeedController {
  constructor(private seedService: SeedService) {}

  @Post()
  async runSeed() {
    return this.seedService.seed();
  }
}
