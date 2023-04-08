import express, { Application } from 'express';
import pokemonsRouter from './routes/pokemonsRoutes';
import userPokemonsRouter from './routes/userPokemonsRoutes';

const app: Application = express();

app.use('/api/pokemons', pokemonsRouter);
app.use('/api/user-pokemons', userPokemonsRouter);

export default app;
