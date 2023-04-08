import express, { Application } from 'express';
import cors from 'cors';
import pokemonsRouter from './routes/pokemonsRoutes';
import userPokemonsRouter from './routes/userPokemonsRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/pokemons', pokemonsRouter);
app.use('/api/user-pokemons', userPokemonsRouter);

export default app;
