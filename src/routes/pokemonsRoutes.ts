import express from 'express';
import { getPokemons } from '../controllers/pokemonsController';

const router = express.Router();

router.get('/', getPokemons);

export default router;
