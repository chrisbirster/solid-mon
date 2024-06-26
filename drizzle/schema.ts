import {
  index,
  integer,
  sqliteTable,
  text,
  alias,
} from "drizzle-orm/sqlite-core";
import { sql, InferSelectModel, InferInsertModel } from "drizzle-orm";

export const foo = sqliteTable("foo", {
  bar: text("bar").notNull().default("Hey!"),
});

export const pokemon = sqliteTable("pokemon", {
  id: integer("id").notNull().primaryKey(),
  name: text("name"),
  spriteUrl: text("sprite_url"),
});

export type Pokemon = InferSelectModel<typeof pokemon>;

export const votes = sqliteTable(
  "votes",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    createdAt: integer("created_at").default(sql`CURRENT_TIMESTAMP`),
    votedForId: integer("voted_for_id").references(() => pokemon.id),
    votedAgainstId: integer("voted_against_id").references(() => pokemon.id),
  },
  (table) => {
    return {
      votedForIdx: index("voted_for_idx").on(table.votedForId),
      votedAgainstIdx: index("voted_against_idx").on(table.votedAgainstId),
    };
  },
);

export const votesFor = alias(votes, "votesFor");
export const votesAgainst = alias(votes, "votesAgainst");

export type Votes = InferInsertModel<typeof votes>;
