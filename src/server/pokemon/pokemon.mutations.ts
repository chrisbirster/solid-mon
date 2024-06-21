import { z } from "zod";
import { mutation$, error$ } from "@solid-mediakit/prpc";
import { rateLimitMW } from "~/server/prpc";

export const voteMutation = mutation$({
  mutationFn: ({ payload, ctx$ }) => {
    if (typeof payload.id !== "number" || payload.id < 0) {
      return error$("Something went wrong.");
    }

    if (ctx$.deez) {
      return error$("Rate limit exceeded. Please try again later.");
    }
    return `You have selected wisely: ${payload.id}`;
  },
  key: "poke-vote",
  schema: z.object({
    id: z.number(),
  }),
  middleware: [rateLimitMW],
});
