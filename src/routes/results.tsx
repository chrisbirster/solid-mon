import { For, type VoidComponent } from "solid-js";

import { createAsync, type RouteDefinition } from "@solidjs/router";
import { cache } from "@solidjs/router";

import { db } from "~/server/db";
import { foo } from "../../drizzle/schema";

const getFoo = cache(async function getFoo() {
  "use server";
  const response = await db.select().from(foo).execute();
  console.log("response");
  console.log(response);
  return response;
}, "foo-data");

export const route = {
  load: () => getFoo(),
} satisfies RouteDefinition;

const Results: VoidComponent = () => {
  const foos = createAsync(() => getFoo());

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Results Page
      </h1>
      <p class="mt-8">
        Visit{" "}
        <a
          href="https://solidjs.com"
          target="_blank"
          class="text-sky-600 hover:underline"
        >
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
      <p class="my-4">
        <span>Results Page</span>
        <For each={foos()} fallback={<div>Loading...</div>}>
          {(foo) => (
            <div>
              <div>{foo.bar}</div>
            </div>
          )}
        </For>
      </p>
    </main>
  );
};

export default Results;
