/* eslint-disable no-console */
// eslint-disable-next-line no-shadow
import { Request, Response } from 'express';
import getUserAddress from '../utils/getUserAddress';
import { restoreMessage } from '../utils/restoreMessage';
import UserPokemon from '../models/userPokemonModel';
import {
  getUserPokemonsWithPagination,
  evolveUserPokemon,
} from '../services/userPokemonsService';
import { getPokemonById } from '../services/pokemonsService';

export const getUserPokemons = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const [pokemons, total] = await getUserPokemonsWithPagination(
      userId,
      req.query,
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
    const { pokemonId, signedMessage } = req.body;

    // Restored Message by action ('add' | 'evolve') and pokemonId
    const restoredMessage = await restoreMessage(pokemonId, 'add');

    // Restored user address
    const userId = await getUserAddress(signedMessage, restoredMessage);

    const pokemon = {
      userId,
      pokemonId: [userId, pokemonId].join('__'),
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
    const { userPokemonsIDFrom, userPokemonsIDto, signedMessage } = req.body;

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
        `${userId}__${userPokemonsIDFrom}`,
        `${userId}__${userPokemonsIDto}`,
      );

      if (!newUserPokemon) {
        res.status(404).json({
          status: 'fail',
          message: "The user doesn't own this pokemon",
        });
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
