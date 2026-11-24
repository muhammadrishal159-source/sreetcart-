import { Controller, Get } from '@nestjs/common';

@Controller('api/health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      service: 'StreetCart API',
      city: 'Kozhikode',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }
}
