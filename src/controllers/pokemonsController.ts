// eslint-disable-next-line no-shadow
import { Request, Response } from 'express';
import { getPokemonsWithPagination } from '../services/pokemonsService';
import { paginationSchema } from '../validators';

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
