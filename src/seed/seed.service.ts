import { Injectable } from '@nestjs/common';
import { InjectHttpClient, HttpClient } from '@nestjs/http-client';
import { PokeResponse } from './interfaces/poke-response.interface.js';
import { Pokemon } from '../pokemon/entities/pokemon.entity.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectHttpClient('pokemon-api') private readonly pokemonApi: HttpClient,
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const { data } =
      await this.pokemonApi.get<PokeResponse>('/pokemon?limit=650');

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments.at(-2)!;
      pokemonToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return data.results;
  }
}
