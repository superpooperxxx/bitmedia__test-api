import { getPokemonById } from '../services/pokemonsService';

export const restoreMessage = async (
  pokemonId: string,
  action: 'add' | 'evolve',
) => {
  const pokemon = await getPokemonById(pokemonId);

  switch (action) {
    case 'add':
      return `I want add ${pokemon.name} to my list`;

    case 'evolve': {
      const evolutionOfPokemon = await getPokemonById(pokemon.evolution[0]);

      return `I want evolve ${pokemon.name} to ${evolutionOfPokemon.name}`;
    }

    default:
      break;
  }
};
