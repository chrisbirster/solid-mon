import { Title } from "@solidjs/meta";
import { Show, createEffect } from "solid-js";
import {
  cache,
  type RouteDefinition,
  createAsync,
  useAction,
  useNavigate,
} from "@solidjs/router";
import PokemonListing from "~/components/PokemonListing";
import { getPokePair, voteMutation } from "~/server/pokemon";
import { getRequestEvent } from "solid-js/web";

const checkDeez = cache(async () => {
  "use server";
  const event = getRequestEvent();

  if (event?.locals.deez) {
    return true;
  }
  return false;
}, "check-deez");

export const route = {
  load: async () => {
    getPokePair();
    checkDeez();
  },
} satisfies RouteDefinition;

export default function Home() {
  const pokemon = createAsync(() => getPokePair());
  const castVote = useAction(voteMutation);
  const navigate = useNavigate();
  const deez = createAsync(() => checkDeez(), { initialValue: false });

  createEffect(() => {
    if (deez()) {
      navigate("blocked");
    }
  });

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
