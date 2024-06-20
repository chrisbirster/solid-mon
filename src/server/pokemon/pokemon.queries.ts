import { query$ } from "@solid-mediakit/prpc";
import { db } from "~/server/db";
import { getOptionsForVote } from "~/server/pokemon";

export const getPokePairQuery = query$({
  queryFn: async () => {
    const [first, second] = getOptionsForVote();
    const pair = await db.query.pokemon.findMany({
      where: (pokemon, { inArray }) => inArray(pokemon.id, [first, second]),
    });

    if (pair.length !== 2) throw new Error("Failed to find two pokemon");
    return { firstPokemon: pair[0], secondPokemon: pair[1] };
  },
  key: "get-poke-pair",
});
