/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
// eslint-disable-next-line no-shadow
import { Request, Response } from 'express';
import getUserAddress from '../utils/getUserAddress';
import { restoreMessage } from '../utils/restoreMessage';
import UserPokemon from '../models/userPokemonModel';
import {
  getUserPokemonsWithPagination,
  evolveUserPokemon,
  userHasPokemon,
} from '../services/userPokemonsService';
import { getPokemonById } from '../services/pokemonsService';
import {
  addPokemonReqBodySchema,
  evolvePokemonReqBodySchema,
  paginationSchema,
  userIdSchema,
} from '../validators';

export const getUserPokemons = async (req: Request, res: Response) => {
  try {
    // Validation
    const { userId } = await userIdSchema.validateAsync(req.params);
    const query = await paginationSchema.validateAsync(req.query);

    const [pokemons, total] = await getUserPokemonsWithPagination(
      userId,
      query,
    );

    res.status(200).json({
      status: 'success',
      total,
      results: pokemons.length,
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

export const addPokemonToUser = async (req: Request, res: Response) => {
  try {
    // Validation
    const { pokemonId, signedMessage } =
      await addPokemonReqBodySchema.validateAsync(req.body);

    // Restored Message by action ('add' | 'evolve') and pokemonId
    const restoredMessage = await restoreMessage(pokemonId, 'add');

    // Restored user address
    const userId = await getUserAddress(signedMessage, restoredMessage);

    // Check if user already has this pokemon
    const userHasThisPokemon = await userHasPokemon(userId, pokemonId);

    if (userHasThisPokemon) {
      res.status(400).json({
        status: 'fail',
        message: 'User already has this pokemon',
      });

      return;
    }

    const pokemon = {
      userId,
      pokemonId,
      addedAt: new Date(),
    };

    const addedPokemon = await UserPokemon.create(pokemon);

    res.status(201).json({
      status: 'success',
      data: {
        userPokemon: addedPokemon,
      },
    });
  } catch {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

export const evolvePokemon = async (req: Request, res: Response) => {
  try {
    const { userPokemonsIDFrom, userPokemonsIDto, signedMessage } =
      await evolvePokemonReqBodySchema.validateAsync(req.body);

    // Check if userPokemonsIDto is the evolution of userPokemonsIDFrom
    const pokemonFrom = await getPokemonById(userPokemonsIDFrom);

    if (pokemonFrom.evolution[0] !== userPokemonsIDto) {
      res.status(400).json({
        status: 'fail',
        message: 'Evolution is not possible',
      });

      return;
    }

    const message = await restoreMessage(
      userPokemonsIDFrom,
      'evolve',
      userPokemonsIDto,
    );
    const userId = await getUserAddress(signedMessage, message);

    // Find and evolve pokemon
    if (userId) {
      const newUserPokemon = await evolveUserPokemon(
        userPokemonsIDFrom,
        userPokemonsIDto,
      );

      if (!newUserPokemon) {
        res.status(404).json({
          status: 'fail',
          message: "The user doesn't own this pokemon",
        });

        return;
      }

      res.status(200).json({
        status: 'success',
        data: {
          userPokemon: newUserPokemon,
        },
      });
    }
  } catch {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};
