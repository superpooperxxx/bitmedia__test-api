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

  const pokemondsIds = pokemonsOfUser.map((pokemon) => pokemon.pokemonId);

  const pokemons = await findManyById(pokemondsIds);

  return [pokemons, pokemonsNum];
};

export const userHasPokemon = async (userId: string, pokemonId: string) => {
  const pokemon = await UserPokemon.find({ userId, pokemonId });

  return Boolean(pokemon.length);
};

export const evolveUserPokemon = async (
  pokemonId: string,
  pokemonToId: string,
) => {
  const pokemon = await UserPokemon.findOneAndUpdate(
    { pokemonId },
    {
      $set: {
        pokemonId: pokemonToId,
        evolvedAt: new Date(),
      },
    },
    { new: true },
  );

  return pokemon;
};
