import { query$ } from "@solid-mediakit/prpc";
import { z } from "zod";
import { db } from "~/server/db";

export const fooQuery = query$({
  queryFn: async ({ payload, event$ }) => {
    // playing around with the request
    // console.log(">>>> event$", event$);
    console.log(">>>> hey: ", payload.bar);
    const ua = event$.request.headers.get("user-agent");
    console.log({ ua });

    const foo = await db.query.foo.findFirst();
    console.log(">>>>> foo: ", foo);
    return foo;
  },
  key: "foo-new",
  schema: z.object({
    bar: z.string(),
  }),
});
