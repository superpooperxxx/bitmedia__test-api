import Pokemon from '../models/pokemonModel';
import { Pokemon as PokemonType } from '../types/pokemon';
import { ParsedQs } from 'qs';
import { getSkipAndLimit } from '../utils/getSkipAndLimit';

export const getTotalAmount = async () => {
  const totalAmount = await Pokemon.countDocuments();

  return totalAmount;
};

export const getPokemonsWithPagination = async (
  query: ParsedQs,
): Promise<[PokemonType[], number]> => {
  const pokemonsNum = await getTotalAmount();

  const { skip, limit } = getSkipAndLimit(query, pokemonsNum);

  const pokemons = await Pokemon.find().skip(skip).limit(limit);

  return [pokemons, pokemonsNum];
};

export const getPokemonById = async (id: string): Promise<PokemonType> => {
  const pokemon = await Pokemon.findOne({ id });

  return pokemon;
};

export const findManyById = async (ids: string[]) => {
  const pokemons = await Pokemon.find({ id: { $in: ids } });

  return pokemons;
};
