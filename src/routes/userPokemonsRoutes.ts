import express from 'express';
import {
  addPokemonToUser,
  evolvePokemon,
  getUserPokemons,
} from '../controllers/userPokemonsController';

const router = express.Router();

router.get('/:userId', getUserPokemons);
router.patch('/evolve', evolvePokemon);
router.post('/add', addPokemonToUser);

export default router;
