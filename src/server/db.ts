import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as drizzle_schema from "../../drizzle/schema";

const client = createClient({
  // @ts-ignore
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export type Pokemon = drizzle_schema.Pokemon;
export const votes = drizzle_schema.votes;
export const pokemon = drizzle_schema.pokemon;
export const votesFor = drizzle_schema.votesFor;
export const votesAgainst = drizzle_schema.votesAgainst;
export const db = drizzle(client, { schema: drizzle_schema });
