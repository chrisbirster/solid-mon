import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as drizzle_schema from "../../drizzle/schema";

const client = createClient({
  // @ts-ignore
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export type Pokemon = drizzle_schema.Pokemon;
export const db = drizzle(client, { schema: drizzle_schema });
