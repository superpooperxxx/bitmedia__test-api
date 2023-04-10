// eslint-disable-next-line no-shadow
import { Request, Response } from 'express';
// import UserPokemon from '../models/userPokemonModel';
import getUserAddress from '../utils/getUserAddress';
import { restoreMessage } from '../utils/restoreMessage';
import UserPokemon from '../models/userPokemonModel';

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
