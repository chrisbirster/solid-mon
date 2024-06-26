import { cache, action } from "@solidjs/router";
import { sql } from "drizzle-orm";

import { db, votes, Pokemon } from "~/server/db";

const MAX_DEX_ID = 493;

export const getRandomPokemon: (notThisOne?: number) => number = (
  notThisOne,
) => {
  const pokedexNumber = Math.floor(Math.random() * MAX_DEX_ID) + 1;

  if (pokedexNumber !== notThisOne) return pokedexNumber;
  return getRandomPokemon(notThisOne);
};

export const getOptionsForVote = () => {
  const firstId = getRandomPokemon();
  const secondId = getRandomPokemon(firstId);

  return [firstId, secondId];
};

const getPokePairData = async () => {
  "use server";
  const [first, second] = getOptionsForVote();
  const pair = await db.query.pokemon.findMany({
    where: (pokemon, { inArray }) => inArray(pokemon.id, [first, second]),
  });

  if (pair.length !== 2) throw new Error("Failed to find two pokemon");

  return { firstPokemon: pair[0], secondPokemon: pair[1] };
};

export const getPokePair = cache(getPokePairData, "get-poke-pair");

const submitVote = async ({
  votedFor,
  votedAgainst,
}: {
  votedFor: number;
  votedAgainst: number;
}) => {
  "use server";
  await db.insert(votes).values({
    votedForId: votedFor,
    votedAgainstId: votedAgainst,
  });
};

export const voteMutation = action(submitVote, "submit-vote");

const getPokemonVotesQuery = async () => {
  // TODO - convert to drizzle
  "use server";
  const pokemonVotesQuery = sql.raw(
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

  const sortedPokemonQuery = await db.run(pokemonVotesQuery);
  const sortedPokemonVotesData = await sortedPokemonQuery.toJSON();
  const processedPokemon = sortedPokemonVotesData.rows.map((pokemon: any) => {
    const [id, name, spriteUrl, votesFor, votesAgainst] = pokemon;
    const votePercent = generateCountPercent(votesFor, votesAgainst);
    return {
      id,
      name,
      spriteUrl,
      votesFor,
      votesAgainst,
      votePercent,
    };
  });

  return {
    pokemon: processedPokemon,
  };
};

export const getPokemonVotesResults = cache(
  getPokemonVotesQuery,
  "get-pokemon-results",
);

const generateCountPercent = (votesFor: number, votesAgainst: number) => {
  if (votesFor + votesAgainst === 0) {
    return 0;
  }
  return (votesFor / (votesFor + votesAgainst)) * 100;
};
