import { z } from "zod";
import { helloBuilder } from "~/server/prpc";

export const helloQuery = helloBuilder
  .input(
    z.object({
      hello: z.string(),
    }),
  )
  .query$(({ payload, ctx$ }) => {
    if (payload.hello === "hello") {
      return ctx$.hello;
    }
    return ctx$.world;
  }, "myNewQuery");
