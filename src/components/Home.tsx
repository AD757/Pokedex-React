import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import client from "../api/pokemonAPIClient";
import styled from "styled-components";
import PokemonLogo from "../assets/pokemon-logo.png";
import { Pokedex } from "./Pokedex";
import { PokedexInterface } from "../api/types";
import LoadingIcon from "../assets/loading.png";

export const Home = () => {
  const [search, setSearch] = useState("");
  const history = useHistory();
  const location = useLocation();
  const [pokemonList, setPokemonList] = useState<PokedexInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const limit = 20;

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page") || "1", 10);
  const offset = (currentPage - 1) * limit;

  const POKEDEX_URL = `?limit=${limit}&offset=${offset}`;

  useEffect(() => {
    setIsLoading(true);
    client.get<PokedexInterface>(POKEDEX_URL).then((response) => {
      setPokemonList(response.data);
      setIsLoading(false);
    });
  }, [offset]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    history.push(`/${search.toLowerCase().trim()}`);
  };

  const handlePageChange = (newPage: number) => {
    history.push(`?page=${newPage}`);
  };

  const totalPages = Math.ceil((pokemonList?.count || 0) / limit);

  return (
    <Container>
      <Header>
        <img src={PokemonLogo} alt="Pokemon Logo" loading="lazy" />
      </Header>
      <SearchForm onSubmit={handleSubmit}>
        <h1>Search a Pokémon in Pokédex</h1>
        <div className="input">
          <input
            type="text"
            placeholder="Type Pokémon by name or ID (ex: 'Pikachu', '25')"
            autoComplete="off"
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
        </div>
      </SearchForm>
      <Heading>
        <p>Pokémon list</p>
      </Heading>
      {isLoading ? (
        <Loading>
          <img src={LoadingIcon} alt="loading icon" />
        </Loading>
      ) : (
        <PokemonContainer>
          {pokemonList?.results.map((i) => {
            return <Pokedex key={i.name} url={i.name} />;
          })}
        </PokemonContainer>
      )}
      <ButtonContainer>
        <StyledButton
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </StyledButton>
        <StyledButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </StyledButton>
        <PageNumber>{currentPage}</PageNumber>
        <StyledButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </StyledButton>
        <StyledButton
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 3rem;

  > h1 {
    font-size: 3rem;
    color: white;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
      font-size: 2rem;
      width: 90vw;
    }
  }
`;

const Header = styled.header`
  margin-top: 10rem;

  > img {
    width: 30vw;

    @media (max-width: 768px) {
      width: 90vw;
    }
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
  color: #fff;

  > h1 {
    font-size: 3rem;

    @media (max-width: 768px) {
      font-size: 2rem;
      width: 90vw;
      display: flex;
      justify-content: center;
    }
  }

  .input {
    display: flex;
    justify-content: center;
    width: 45vh;

    > input {
      cursor: pointer;
      font-size: 1.6rem;
      width: 45vh;
      height: 5vh;
      margin-top: 3rem;
      text-align: center;
      color: #24292e;
      border: none;
      outline: none;
      border-radius: 24px;

      @media (max-width: 768px) {
        font-size: 1.4rem;
        width: 40vh;
      }
    }
  }
`;

const Heading = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const PokemonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 3rem;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  color: black;
  background-color: white;
  margin: 0 10px;
  cursor: pointer;
  padding: 8px 16px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 12px;
  &:hover {
    background-color: #ddd;
    color: black;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const PageNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  background-color: #fff;
  color: #24292e;
  padding: 8px 16px;
  border-radius: 12px;
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
