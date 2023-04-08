import express from 'express';
import { addPokemonToUser } from '../controllers/userPokemonsController';

const router = express.Router();

router.get('/', (req, res) => {
  // Возвращает покемонов для определенного пользователя с пагинацией.
  // Наверно нужно принимать userID
  res.send('Pokemons');
});

router.post('/evolve', (req, res) => {
  // ЧТО ТАКОЕ signedMessage ?
  // + сохранение в базе данных
  res.send('Pokemons');
});

router.post('/add', addPokemonToUser);

export default router;
