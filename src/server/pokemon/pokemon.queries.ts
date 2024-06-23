import { query$ } from "@solid-mediakit/prpc";
import { db, votesFor, votesAgainst, pokemon } from "~/server/db";
import { getOptionsForVote } from "~/server/pokemon";
import { sql } from "drizzle-orm";

// const fakeData = [
//   {
//     id: 2,
//     name: "ivysaur",
//     spriteUrl:
//       "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
//   },
//   {
//     id: 261,
//     name: "poochyena",
//     spriteUrl:
//       "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/261.png",
//   },
// ];
//
export const getPokePairQuery = query$({
  queryFn: async () => {
    const [first, second] = getOptionsForVote();
    const pair = await db.query.pokemon.findMany({
      where: (pokemon, { inArray }) => inArray(pokemon.id, [first, second]),
    });

    if (pair.length !== 2) throw new Error("Failed to find two pokemon");

    return { firstPokemon: pair[0], secondPokemon: pair[1] };
    // return { firstPokemon: fakeData[0], secondPokemon: fakeData[1] };
  },
  key: "get-poke-pair",
});

export const getPokemonVotesQuery = query$({
  queryFn: async () => {
    // const pokemonVotes = await db
    //   .select({
    //     id: pokemon.id,
    //     name: pokemon.name,
    //     spriteUrl: pokemon.spriteUrl,
    //     votesFor: sql<number>`COUNT(votesFor.voted_for_id)`.mapWith(Number),
    //     votesAgainst: sql<number>`COUNT(votesAgainst.voted_against_id)`.mapWith(
    //       Number,
    //     ),
    //   })
    //   .from(pokemon)
    //   .leftJoin(votesFor, sql`${pokemon.id} = votedFor.voted_for_id`)
    //   .leftJoin(
    //     votesAgainst,
    //     sql`${pokemon.id} = votedAgainst.voted_against_id`,
    //   )
    //   .groupBy(pokemon.id, pokemon.name, pokemon.spriteUrl)
    //   .orderBy(sql`votesFor DESC`);

    const pokemonVotes = sql.raw(
      `
SELECT
  p.id,
  p.name,
  p.sprite_url,
  COUNT(v.voted_for_id) AS votesFor,
  COUNT(v2.voted_against_id) AS votesAgainst
FROM
  pokemon p
  LEFT JOIN votes v ON p.id = v.voted_for_id
  LEFT JOIN votes v2 ON p.id = v2.voted_against_id
GROUP BY
  p.id,
  p.name,
  p.sprite_url
ORDER BY
  votesFor DESC;
`,
    );

    const sortedPokemon = await db.run(pokemonVotes);
    const sortedReults = sortedPokemon.toJSON();

    return {
      sortedReults,
    };
  },
  key: "get-pokemon-results",
});
