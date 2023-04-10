import UserPokemon from '../models/userPokemonModel';
import { ParsedQs } from 'qs';
import { Pokemon as PokemonType } from '../types/pokemon';
import { getSkipAndLimit } from '../utils/getSkipAndLimit';
import { findManyById } from './pokemonsService';

export const getTotalAmountOfUserPokemons = async (userId: string) => {
  const total = await UserPokemon.find({ userId });

  return total.length;
};

export const getUserPokemonsWithPagination = async (
  userId: string,
  query: ParsedQs,
): Promise<[PokemonType[], number]> => {
  const pokemonsNum = await getTotalAmountOfUserPokemons(userId);

  const { skip, limit } = getSkipAndLimit(query, pokemonsNum);

  const pokemonsOfUser = await UserPokemon.find({ userId })
    .skip(skip)
    .limit(limit);

  // eslint-disable-next-line no-console
  const pokemondsIds = pokemonsOfUser.map(
    (pokemon) => pokemon.pokemonId.split('__')[1],
  );

  const pokemons = await findManyById(pokemondsIds);

  return [pokemons, pokemonsNum];
};
