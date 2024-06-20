import { Show, type VoidComponent } from "solid-js";
import { helloQuery } from "~/server/hello/hello.queries";
import { fooQuery } from "~/server/foo/foo.queries";
import { getPokePairQuery } from "~/server/pokemon/pokemon.queries";

const Results: VoidComponent = () => {
  const hello = helloQuery(() => ({
    hello: "deez",
  }));

  const foo = fooQuery(() => ({
    bar: "there",
  }));

  const pokemon = getPokePairQuery();

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
      </p>
      <Show when={foo.data} fallback={<p>Loading...</p>}>
        {(data) => <div>{data().bar}</div>}
      </Show>
      <Show when={pokemon.data} fallback={<p>Loading...</p>}>
        {(data) => <div>{JSON.stringify(data())}</div>}
      </Show>
      <div>{hello.data}</div>
    </main>
  );
};

export default Results;
