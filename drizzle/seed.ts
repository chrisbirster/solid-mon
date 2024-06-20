import { PokemonClient } from "pokenode-ts";
import { db } from "~/server/db";
import { pokemon } from "./schema";

const doBackfill = async () => {
  try {
    const pokeApi = new PokemonClient();
    const allPokemon = await pokeApi.listPokemons(0, 493);

    const formattedPokemon = allPokemon.results.map((p, index) => ({
      id: index + 1,
      name: (p as { name: string }).name,
      spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
    }));

    await db.insert(pokemon).values(formattedPokemon);
  } catch (error) {
    console.error("Error during backfill:", error);
  }
};

doBackfill();
