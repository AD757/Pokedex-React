import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home } from "./components/Home";
import { PokemonSearchResult } from "./components/PokemonSearchResult";

import GlobalStyles from "./styles/GlobalStyles";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:pokemonName" exact component={PokemonSearchResult} />
      </Switch>
      <GlobalStyles />
    </BrowserRouter>
  );
};

export default Routes;
