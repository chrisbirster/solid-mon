import { Title } from "@solidjs/meta";
import { Show } from "solid-js";
import { type RouteDefinition, createAsync, useAction } from "@solidjs/router";
import PokemonListing from "~/components/PokemonListing";
import { getPokePair, voteMutation } from "~/server/pokemon";

export const route = {
  load: () => getPokePair(),
} satisfies RouteDefinition;

export default function Home() {
  const pokemon = createAsync(() => getPokePair());
  const castVote = useAction(voteMutation);

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <div class="h-screen w-screen flex flex-col items-center relative">
        <Title>Most Solid Pokemon</Title>
        <div class="text-2xl text-center pt-8">
          Which Pokémon is more Solid?
        </div>
        <div class="h-48" />
        <Show when={pokemon()} fallback={<p>Loading...</p>}>
          {(data) => {
            return (
              <div class="bg-indigo-100 p-8 flex justify-between items-center max-w-2xl rounded-lg flex-col md:flex-row animate-fade-in">
                <PokemonListing
                  pokemon={data().firstPokemon}
                  vote={async () => {
                    console.log("voted");
                    await castVote({
                      votedFor: data().firstPokemon.id,
                      votedAgainst: data().secondPokemon.id,
                    });
                  }}
                  disabled={false}
                />
                <div class="p-8 italic text-xl">{"or"}</div>
                <PokemonListing
                  pokemon={data().secondPokemon}
                  vote={async () => {
                    console.log("voted");
                    await castVote({
                      votedFor: data().secondPokemon.id,
                      votedAgainst: data().firstPokemon.id,
                    });
                  }}
                  disabled={false}
                />
                <div class="p-2" />
              </div>
            );
          }}
        </Show>
      </div>
    </main>
  );
}
