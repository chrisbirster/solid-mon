import { Show, type VoidComponent } from "solid-js";
import { Title } from "@solidjs/meta";
import { Pokemon } from "~/server/db";
import { getPokemonVotesQuery } from "~/server/pokemon/pokemon.queries";

const Results: VoidComponent<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const pokemonVotes = getPokemonVotesQuery();
  return (
    <div class="flex flex-col items-center">
      <Title>Most Solid Pokemon Results</Title>
      <h2 class="text-2xl p-4">Results</h2>
      <div class="flex flex-col w-full max-w-2xl border">
        <Show when={pokemonVotes.data} fallback={<p>Loading...</p>}>
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
};

export default Results;

const generateCountPercent = (pokemon: any) => {
  const { votesForId, votesAgainstId } = pokemon;
  if (votesForId + votesAgainstId === 0) {
    return 0;
  }
  return (votesForId / (votesForId + votesAgainstId)) * 100;
};

type Props = {
  pokemon: Pokemon;
  rank: number;
};

const PokemonListing: VoidComponent<Props> = ({ pokemon, rank }) => {
  return (
    <div class="relative flex border-b p-2 items-center justify-between">
      <div class="flex items-center">
        <div class="flex items-center pl-4">
          <img
            src={pokemon.spriteUrl!}
            width={64}
            height={64}
            class="animate-fade-in"
            alt={pokemon.name!}
          />
          <div class="pl-2 capitalize">{pokemon.name}</div>
        </div>
      </div>
      <div class="pr-4">{generateCountPercent(pokemon).toFixed(2) + "%"}</div>
      <div class="absolute top-0 left-0 z-20 flex items-center justify-center px-2 font-semibold text-white bg-gray-600 border border-gray-500 shadow-lg rounded-br-md">
        {rank}
      </div>
    </div>
  );
};
