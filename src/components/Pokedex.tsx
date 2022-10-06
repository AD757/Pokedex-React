import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import client from "../api/pokemonAPIClient";
import { PokedexInterface, PokemonCardProps } from "../api/types";

export const Pokedex = ({ url }: PokemonCardProps) => {
  const [pokemon, setPokemon] = useState<PokedexInterface | null>(null);

  const POKEDEX_URL = `${url}`;

  useEffect(() => {
    client.get(POKEDEX_URL).then((response) => {
      setPokemon(response.data);
    });
  }, []);

  if (pokemon?.sprites.front_default) {
    return (
      <Link to={pokemon?.name ?? pokemon?.id}>
        <Card>
          <img src={pokemon?.sprites.front_default} />
          <p>
            {pokemon?.name} #{pokemon?.id}
          </p>
        </Card>
      </Link>
    );
  }

  return <></>;
};

const Card = styled.div`
  cursor: pointer;
  display: inline-block;
  text-align: center;
  color: #fff;
  background-color: #333333;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  text-transform: capitalize;
  width: 195px;
  font-size: 2rem;
  font-weight: bold;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 1024px) {
    width: 30vw;
  }
  @media (max-width: 768px) {
    width: 40vw;
    font-size: 1.5rem;
  }
`;
