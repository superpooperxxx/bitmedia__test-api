import express from 'express';

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

router.post('/add', (req, res) => {
  // {pokemonsID: “id”, signedMessage: “0xc6dfdcffc341...”}
  res.send('Pokemons');
});

export default router;
