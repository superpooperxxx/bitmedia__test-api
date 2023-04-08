import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    abilities: {
      type: [String],
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    evolution: {
      type: [String],
      required: true,
    },
  },
  {
    collection: 'pokemons',
  },
);

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;
