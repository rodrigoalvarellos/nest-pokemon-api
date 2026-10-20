import { Module } from '@nestjs/common';
import { HttpClientModule } from '@nestjs/http-client';
import { SeedService } from './seed.service.js';
import { SeedController } from './seed.controller.js';
import { PokemonModule } from '../pokemon/pokemon.module.js';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    HttpClientModule.register({
      name: 'pokemon-api',
      baseUrl: 'https://pokeapi.co/api/v2',
      headers: { accept: 'application/json' },
    }),
    PokemonModule,
  ],
})
export class SeedModule {}
