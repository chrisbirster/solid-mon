import { Show, For } from "solid-js";
import { Title } from "@solidjs/meta";
import { type RouteDefinition, createAsync } from "@solidjs/router";

import { getPokemonVotesResults } from "~/server/pokemon";

export const route = {
  load: () => {
    getPokemonVotesResults();
  },
} satisfies RouteDefinition;

export default function Results() {
  const pokemonVotes = createAsync(() => getPokemonVotesResults());
  return (
    <div class="flex flex-col items-center">
      <Title>Most Solid Pokemon Results</Title>
      <h2 class="text-2xl p-4">Results</h2>
      <div class="flex flex-col w-full max-w-2xl border">
        <Show when={pokemonVotes()} fallback={<p>Loading...</p>}>
          {(data) => (
            <For each={data().pokemon}>
              {(pokemon, i) => (
                <div class="flex flex-col items-center">
                  <div class="flex flex-col w-full max-w-2xl border">
                    <PokemonListing pokemon={pokemon} rank={i() + 1} />
                  </div>
                </div>
              )}
            </For>
          )}
        </Show>
      </div>
    </div>
  );
}

const PokemonListing = ({ pokemon, rank }: { pokemon; rank }) => {
  return (
    <div class="relative flex border-b p-2 items-center justify-between">
      <div class="flex items-center">
        <div class="flex items-center pl-4">
          <img src={pokemon.spriteUrl} width={64} height={64} />
          <div class="pl-2 capitalize">{pokemon.name}</div>
          {/* <p class="pl-2">{pokemon.votePercent} votes</p> */}
        </div>
      </div>
      <div class="absolute top-0 left-0 z-20 flex items-center justify-center px-2 font-semibold text-white bg-gray-600 border border-gray-500 shadow-lg rounded-br-md">
        {rank}
      </div>
    </div>
  );
};
