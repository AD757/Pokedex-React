export interface PokemonCardProps {
  url: string;
}

export interface PokedexInterface {
  id: number;
  name: string;
  count: number;
  sprites: {
    front_default: string | null;
  };
  results: Array<{ name: string; url: string }>;
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface Precentage {
  percentage?: number;
}

export interface Props {
  data: ApiResponse;
}

export interface RouteParam {
  pokemonName: string;
}

export interface Ability {
  ability: {
    name: string;
  };
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
}

export interface Type {
  type: {
    name: string;
  };
}

export interface ApiResponse {
  abilities: Ability[];
  stats: Stat[];
  types: Type[];
  name: string;
  id: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}
