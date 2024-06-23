import { Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { type RouteDefinition, createAsync } from "@solidjs/router";

import { getPokemonVotesResults } from "~/server/pokemon";

const generateCountPercent = (pokemon: any) => {
  const { votesForId, votesAgainstId } = pokemon;
  if (votesForId + votesAgainstId === 0) {
    return 0;
  }
  return (votesForId / (votesForId + votesAgainstId)) * 100;
};

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
        <Show when={pokemonVotes} fallback={<p>Loading...</p>}>
          {(data) => {
            return (
              <>
                <div>{JSON.stringify(data())}</div>
              </>
            );
          }}
        </Show>
      </div>
    </div>
  );
}
