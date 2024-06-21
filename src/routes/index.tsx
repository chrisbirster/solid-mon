import { Title } from "@solidjs/meta";
import { Show } from "solid-js";
import { getPokePairQuery } from "~/server/pokemon/pokemon.queries";
import { voteMutation } from "~/server/pokemon/pokemon.mutations";
import PokemonListing from "~/components/PokemonListing";

export default function Home() {
  const pokemon = getPokePairQuery();
  const castVote = voteMutation(() => ({
    onError(error) {
      if (error.isZodError()) {
        console.log("zod error:", error.cause.fieldErrors);
      } else {
        console.log(error.message);
      }
    },
  }));

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <div class="h-screen w-screen flex flex-col justify-between items-center relative">
        <Title>Most Solid Pokemon</Title>
        <div class="text-2xl text-center pt-8">
          Which Pokémon is more Solid?
        </div>
        <Show when={pokemon.data} fallback={<p>Loading...</p>}>
          {(data) => (
            <div class="p-8 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in">
              <PokemonListing
                pokemon={data().firstPokemon}
                vote={() => castVote.mutate({ id: data().firstPokemon.id })}
                disabled={pokemon.isLoading}
              />
              <div class="p-8 italic text-xl">{"or"}</div>
              <PokemonListing
                pokemon={data().secondPokemon}
                vote={() => castVote.mutate({ id: data().secondPokemon.id })}
                disabled={pokemon.isLoading}
              />
              <div class="p-2" />
            </div>
          )}
        </Show>
      </div>
    </main>
  );
}
