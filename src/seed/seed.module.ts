import { Module } from '@nestjs/common';
import { SeedService } from './seed.service.js';
import { SeedController } from './seed.controller.js';
import { HttpClientModule } from '@nestjs/http-client';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    HttpClientModule.register({
      name: 'pokemon-api',
      baseUrl: 'https://pokeapi.co/api/v2',
      headers: { accept: 'application/json' },
    }),
  ],
})
export class SeedModule {}
