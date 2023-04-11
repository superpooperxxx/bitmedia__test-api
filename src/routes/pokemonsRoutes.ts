import express from 'express';
import { getPokemon, getPokemons } from '../controllers/pokemonsController';

const router = express.Router();

router.get('/', getPokemons);
router.get('/:pokemonId', getPokemon);

export default router;
