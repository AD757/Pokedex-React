import axios from "axios";

const client = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon/",
});

export default client;
