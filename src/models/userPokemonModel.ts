import mongoose from 'mongoose';

const userPokemonSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    pokemonId: {
      type: String,
      required: true,
    },
    addedAt: {
      type: Date,
      required: true,
    },
    evolvedAt: {
      type: Date,
    },
  },
  {
    collection: 'userPokemons',
  },
);

const UserPokemon = mongoose.model('UserPokemon', userPokemonSchema);

export default UserPokemon;
