import { cache } from "@solidjs/router";
import { db } from "~/server/db";

export const getRandomPokemon = cache(async function getPokemon() {
  "use server";
  const response = await db.query.pokemon.findFirst();
  console.log("response");
  console.log(response);
  return response;
}, "one-pokemon");
