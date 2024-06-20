import { builder$ } from "@solid-mediakit/prpc";

export const helloBuilder = builder$()
  .middleware$(() => {
    return {
      hello: "world",
    };
  })
  .middleware$((ctx) => {
    return {
      ...ctx,
      world: "nutz",
    };
  });
