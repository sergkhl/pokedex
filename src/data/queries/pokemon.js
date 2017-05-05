import { GraphQLList as List, GraphQLID as ID } from 'graphql';
import fetch from 'isomorphic-fetch';
import Pokemon from '../types/PokemonType';

// pokeapi.co

const allPokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=5';
const pokemonByTypeUrl = 'http://pokeapi.co/api/v2/type/';

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const getAllPokemon = () => {
  return fetch(allPokemonUrl)
    .then(response => response.json())
    .then((data) => {
      return new Promise((resolve, reject) => {
        if (!data.results) {
          reject();
        }
        lastFetchTask = null;

        let promises = [];
        data.results.forEach((result) => {
          promises.push(fetch(result.url).then(response => response.json()));
        });

        Promise.all(promises).then(resolve, reject);
      });
    })

};

const getPokemonByType = (typeId) => {
  return fetch(pokemonByTypeUrl + typeId)
    .then(response => response.json())
    .then((data) => {
      return new Promise((resolve, reject) => {
        if (!data.pokemon) {
          reject();
        }

        lastFetchTask = null;

        let promises = [];
        data.pokemon.slice(0,5).forEach((result) => {
          promises.push(fetch(result.pokemon.url).then(response => response.json()));
        });

        Promise.all(promises).then(resolve, reject);
      });
    });
};

const pokemon = {
  type: new List(Pokemon),
  args: {
    typeId: { type: ID }
  },
  resolve(root, args) {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if ((new Date() - lastFetchTime) > 1000) {

      let req = args.typeId ? getPokemonByType(args.typeId) : getAllPokemon();

      lastFetchTime = new Date();
      lastFetchTask = req
        .then((data) => {
          items = data;
          return items;
        })
        .catch((err) => {
          lastFetchTask = null;
          throw err;
        });

      if (items.length) {
        return items;
      }

      return lastFetchTask;
    }

    return items;
  },
};

export default pokemon;
