// eslint-disable-next-line no-shadow
import { Request, Response } from 'express';
import UserPokemon from '../models/userPokemonModel';

export const addPokemonToUser = async (req: Request, res: Response) => {
  // Потом рзберусь после разработки
  try {
    const newUserPokemon = await UserPokemon.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        userPokemon: newUserPokemon,
      },
    });
  } catch {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};
