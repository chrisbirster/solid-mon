import { Title } from "@solidjs/meta";
import { Show } from "solid-js";
import { getPokePairQuery } from "~/server/pokemon/pokemon.queries";
import PokemonListing from "~/components/PokemonListing";

const btn =
  "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

export default function Home() {
  const pokemon = getPokePairQuery();

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
                vote={() => {}}
                disabled={pokemon.isLoading}
              />
              <div class="p-8 italic text-xl">{"or"}</div>
              <PokemonListing
                pokemon={data().secondPokemon}
                vote={() => {}}
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
