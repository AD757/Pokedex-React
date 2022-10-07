import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import client from "../api/pokemonAPIClient";
import { ApiResponse, RouteParam } from "../api/types";
import BackIcon from "../assets/back-icon.svg";
import LoadingIcon from "../assets/loading.png";
import { PokemonCard } from "./PokemonCard";

export const PokemonSearchResult: React.FC = () => {
  const [pokemons, setPokemons] = useState<ApiResponse | null>();
  const { pokemonName } = useParams<RouteParam>();
  const history = useHistory();

  useEffect(() => {
    client.get<ApiResponse>(pokemonName).then(async (response) => {
      setPokemons(response.data);
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onClick={() => history.goBack()}>
          <img src={BackIcon} alt="Back button" width="48px" height="48px" />
        </BackButton>
      </Header>
      {!pokemons ? (
        <Loading>
          <img src={LoadingIcon} alt="loading icon" />
          <p>
            Could not find pokemon. Please check if you typed the name or id
            correctly.
          </p>
        </Loading>
      ) : (
        <PokemonCard />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  overflow-y: auto;
`;

const BackButton = styled.button`
  background-color: transparent;
`;

const Header = styled.header`
  width: 60vw;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 10rem auto 0;

  @media (max-width: 1024px) {
    margin-top: 5rem;
    width: 80vw;
  }

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60vw;
  margin: 20rem auto 0;

  @media (max-width: 768px) {
    margin-top: 10rem;
    width: 90vw;
  }

  > img {
    background-color: transparent;
    width: 5rem;
    animation-name: spinner;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  > p {
    background-color: #e25e5e;
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    margin-top: 5rem;
    border-radius: 12px;
    padding: 3rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.17);

    @media (max-width: 1024px) {
      width: 80vw;
    }

    @media (max-width: 768px) {
      width: 90vw;
      font-size: 2rem;
    }
  }

  @keyframes spinner {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
