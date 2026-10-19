import { Injectable } from '@nestjs/common';
import { InjectHttpClient, HttpClient } from '@nestjs/http-client';
import { PokeResponse } from './interfaces/poke-response.interface.js';

@Injectable()
export class SeedService {
  constructor(
    @InjectHttpClient('pokemon-api') private readonly pokemonApi: HttpClient,
  ) {}

  async executeSeed() {
    const { data } =
      await this.pokemonApi.get<PokeResponse>('/pokemon?limit=10');

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const id = segments.at(-2);
      console.log(id);
    });

    return data.results;
  }
}
