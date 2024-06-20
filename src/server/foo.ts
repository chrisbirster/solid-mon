import { cache } from "@solidjs/router";
import { db } from "~/server/db";

export const getFoo = cache(async function getFoo() {
  "use server";
  const response = await db.query.foo.findFirst();
  console.log(">>>>> response");
  console.log(response);
  return response;
}, "foo-data");
