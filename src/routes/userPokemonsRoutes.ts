import express from 'express';
import {
  addPokemonToUser,
  getUserPokemons,
} from '../controllers/userPokemonsController';

const router = express.Router();

router.get('/:userId', getUserPokemons);

router.post('/evolve', (req, res) => {
  // ЧТО ТАКОЕ signedMessage ?
  // + сохранение в базе данных
  res.send('Pokemons');
});

router.post('/add', addPokemonToUser);

export default router;
