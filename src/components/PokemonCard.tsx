import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import client from "../api/pokemonAPIClient";
import { ApiResponse, RouteParam, Precentage } from "../api/types";

const iterate = (array: any[], key: string) => {
  const newArray = array.map((item, index) => {
    if (index + 1 === array.length) {
      return item[key].name;
    }
    return item[key].name + ", ";
  });
  return newArray;
};

export const PokemonCard: React.FC = () => {
  const [pokemons, setPokemons] = useState<ApiResponse | null>();
  const { pokemonName } = useParams<RouteParam>();

  useEffect(() => {
    client.get<ApiResponse>(pokemonName).then(async (response) => {
      setPokemons(response.data);
    });
  }, []);

  return (
    <>
      {pokemons && (
        <Card>
          <CharacterContainer>
            <Image
              src={pokemons.sprites.other["official-artwork"].front_default}
              alt={pokemons.name + "image"}
            />
            <p>
              {pokemons.name} #{pokemons.id}
            </p>
          </CharacterContainer>

          <TexContainer>
            <Text>Weigth: {pokemons.weight} lbs</Text>
            <Text>Heigth: {pokemons.height} ft</Text>
            <Text>Base XP: {pokemons.base_experience}</Text>
            <Text>Abilities: {iterate(pokemons.abilities, "ability")}</Text>
            <Text>Types: {iterate(pokemons.types, "type")}</Text>
          </TexContainer>

          <StatsContainer>
            <h3>Stats</h3>
            <br />
            {pokemons?.stats.map((stat) => (
              <Stat percentage={stat.base_stat ?? 0} key={stat.stat.name}>
                <p>
                  {stat.stat.name} - {stat.base_stat}
                </p>
                <div className="progress">
                  <div className="bar" />
                </div>
              </Stat>
            ))}
          </StatsContainer>
        </Card>
      )}
    </>
  );
};

const Card = styled.div`
  width: 35vw;
  color: #fff;
  background-color: #333333;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  text-transform: capitalize;
  margin-top: 20px;

  @media (max-width: 1024px) {
    width: 50vw;
  }
  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const CharacterContainer = styled.div`
  text-align: center;
  margin-bottom: 8px;
  padding: 10px;
  > p {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const Image = styled.img`
  width: 200px;

  &:hover {
    animation: bounce 1.5s ease-out infinite;
    cursor: pointer;
  }

  @keyframes bounce {
    0% {
      transform: translateY(0px);
    }
    25% {
      transform: translateY(-10px);
    }
    50% {
      transform: translateY(0px);
    }
    75% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;

const TexContainer = styled.div`
  padding: 12px;
`;

const Text = styled.div`
  margin: 0 0 15px 0;
  font-size: 1.6rem;
  font-weight: bold;
`;

const StatsContainer = styled.div`
  padding: 10px;
`;

const Stat = styled.div<Precentage>`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  overflow: hidden;

  p {
    color: #fff;
    font-size: 1.6rem;
    font-weight: bold;
    width: 100%;
  }

  .progress {
    background: rgba(196, 196, 196, 0.3);
    width: 100%;
    height: 20px;
    border-radius: 12px;
    .bar {
      width: ${(props) => `${props.percentage}%`};
      height: 100%;
      border-radius: 24px;
      background: #e25e5e;
      background: ${(props) =>
        props.percentage && props.percentage >= 40 ? "#E2B55E" : ""};
      background: ${(props) =>
        props.percentage && props.percentage >= 50 ? "#D8E25E" : ""};
      background: ${(props) =>
        props.percentage && props.percentage >= 70 ? "#A0E25E" : ""};
    }
  }
`;
