import { z } from "zod";
import { mutation$, error$ } from "@solid-mediakit/prpc";
import { rateLimitMW } from "~/server/prpc";
import { db, votes } from "~/server/db";

export const voteMutation = mutation$({
  mutationFn: async ({ payload, ctx$ }) => {
    if (ctx$.deez) {
      return error$("Rate limit exceeded. Please try again later.");
    }

    await db.insert(votes).values({
      votedForId: payload.votedFor,
      votedAgainstId: payload.votedAgainst,
    });
    return {
      refetch_pokemon: true,
    };
  },

  key: "poke-vote",
  schema: z.object({
    votedFor: z.number().gt(0).lte(493),
    votedAgainst: z.number().gt(0).lte(493),
  }),
  middleware: [rateLimitMW],
});
