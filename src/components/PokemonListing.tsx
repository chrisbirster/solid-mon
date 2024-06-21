import { VoidComponent } from "solid-js";
import { Pokemon } from "~/server/db";

const btn =
  "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

type Props = {
  pokemon: Pokemon;
  vote: () => void;
  disabled: boolean;
};

const PokemonListing: VoidComponent<Props> = (props) => {
  return (
    <div
      class="flex flex-col items-center transition-opacity"
      classList={{ "opacity-0": props.disabled }}
      key={props.pokemon.id}
    >
      <div class="text-xl text-center capitalize mt-[-0.5rem]">
        {props.pokemon.name}
      </div>
      <img
        src={props.pokemon.spriteUrl!}
        width={256}
        height={256}
        class="animate-fade-in"
        alt={props.pokemon.name!}
      />
      <button class={btn} onClick={props.vote} disabled={props.disabled}>
        Solid
      </button>
    </div>
  );
};

export default PokemonListing;
