// eslint-disable-next-line no-shadow
import { Request, Response } from 'express';
import {
  getPokemonById,
  getPokemonsWithPagination,
} from '../services/pokemonsService';
import { paginationSchema, pokemonRequestSchema } from '../validators';

export const getPokemons = async (req: Request, res: Response) => {
  try {
    const query = await paginationSchema.validateAsync(req.query);

    const [pokemons, total] = await getPokemonsWithPagination(query);

    res.status(200).json({
      status: 'success',
      results: pokemons.length,
      total,
      data: {
        pokemons,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const getPokemon = async (req: Request, res: Response) => {
  try {
    const { pokemonId } = await pokemonRequestSchema.validateAsync(req.params);

    const pokemon = await getPokemonById(pokemonId);

    res.status(200).json({
      status: 'success',
      data: {
        pokemon,
      },
    });
  } catch {
    res.status(404).json({
      status: 'fail',
      message: 'pokemons was not found',
    });
  }
};
