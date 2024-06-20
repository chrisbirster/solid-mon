import { query$ } from "@solid-mediakit/prpc";
import { db } from "~/server/db";
import { getOptionsForVote } from "~/server/pokemon";

const fakeData = [
  {
    id: 2,
    name: "ivysaur",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
  },
  {
    id: 261,
    name: "poochyena",
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/261.png",
  },
];

export const getPokePairQuery = query$({
  queryFn: async () => {
    // const [first, second] = getOptionsForVote();
    // const pair = await db.query.pokemon.findMany({
    //   where: (pokemon, { inArray }) => inArray(pokemon.id, [first, second]),
    // });
    //
    // if (pair.length !== 2) throw new Error("Failed to find two pokemon");
    //
    // return { firstPokemon: pair[0], secondPokemon: pair[1] };
    return { firstPokemon: fakeData[0], secondPokemon: fakeData[1] };
  },
  key: "get-poke-pair",
});
