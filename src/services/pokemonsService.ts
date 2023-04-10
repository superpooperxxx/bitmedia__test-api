import Pokemon from '../models/pokemonModel';
import { Pokemon as PokemonType } from '../types/pokemon';
import { ParsedQs } from 'qs';

export const getTotalAmount = async () => {
  const totalAmount = await Pokemon.countDocuments();

  return totalAmount;
};

export const getPokemonsWithPagination = async (
  query: ParsedQs,
): Promise<[PokemonType[], number]> => {
  const pokemonsNum = await getTotalAmount();

  const page = +query.page || 1;
  const limit = +query.limit || 12;
  const skip = (page - 1) * limit;

  if (query.page && skip >= pokemonsNum) {
    throw new Error('There is no such page');
  }

  const pokemons = await Pokemon.find().skip(skip).limit(limit);

  return [pokemons, pokemonsNum];
};

export const getPokemonById = async (id: string): Promise<PokemonType> => {
  const pokemon = await Pokemon.findOne({ id });

  return pokemon;
};
