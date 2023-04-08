import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  // Вернуть покемонов из таблицы pokemons с пагинацией
  // КАК ПРАВИЛЬНО СДЕЛАТЬ ПАГИНАЦИЮ ?
  res.send('Pokemons');
});

export default router;
