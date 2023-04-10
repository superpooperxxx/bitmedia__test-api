import UserPokemon from '../models/userPokemonModel';
import { ParsedQs } from 'qs';
import { UserPokemon as UserPokemonType } from '../types/userPokemon';
import { getSkipAndLimit } from '../utils/getSkipAndLimit';

export const getTotalAmount = async () => {
  const totalAmount = await UserPokemon.countDocuments();

  return totalAmount;
};

export const getUserPokemonsWithPagination = async (
  userId: string,
  query: ParsedQs,
): Promise<[UserPokemonType[], number]> => {
  const pokemonsNum = await getTotalAmount();

  const { skip, limit } = getSkipAndLimit(query, pokemonsNum);

  const pokemons = await UserPokemon.find({ userId }).skip(skip).limit(limit);

  return [pokemons, pokemonsNum];
};

// export const getPokemonsWithPagination = async (
//   query: ParsedQs,
// ): Promise<[PokemonType[], number]> => {
//   const pokemonsNum = await getTotalAmount();

//   const page = +query.page || 1;
//   const limit = +query.limit || 12;
//   const skip = (page - 1) * limit;

//   if (query.page && skip >= pokemonsNum) {
//     throw new Error('There is no such page');
//   }

//   const pokemons = await Pokemon.find().skip(skip).limit(limit);

//   return [pokemons, pokemonsNum];
// };
