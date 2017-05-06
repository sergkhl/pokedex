import { GraphQLList as List, GraphQLID as ID, GraphQLInt as Int } from 'graphql';
import fetch from 'isomorphic-fetch';
import PokemonResourceList from '../types/PokemonType';

// pokeapi.co

const allPokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
const pokemonByTypeUrl = 'http://pokeapi.co/api/v2/type/';

let resultData = {};
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const getAllPokemon = (limit, offset) => {
  return fetch(allPokemonUrl + '?limit=' + limit + '&offset=' + offset)
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

        Promise.all(promises).then((results) => {
          let result = Object.assign({limit, offset}, data, {results});
          resolve(result);
        }, reject);
      });
    })

};

const getPokemonByType = (typeId, limit, offset) => {
  return fetch(pokemonByTypeUrl + typeId)
    .then(response => response.json())
    .then((data) => {
      return new Promise((resolve, reject) => {
        if (!data.pokemon) {
          reject();
        }

        lastFetchTask = null;

        let promises = [];
        data.pokemon.slice(offset, offset + limit).forEach((result) => {
          promises.push(fetch(result.pokemon.url).then(response => response.json()));
        });

        Promise.all(promises).then((results) => {
          let result = {
            limit,
            offset,
            count: data.pokemon.length,
            typeName: data.name,
            typeId,
            previous: '',
            next: '',
            results
          };
          resolve(result);
        }, reject);
      });
    });
};

const pokemon = {
  type: PokemonResourceList,
  args: {
    typeId: { type: ID },
    limit: { type: Int },
    offset: { type: Int }
  },
  resolve(root, args) {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if ((new Date() - lastFetchTime) > 1000) {

      let req = args.typeId ? getPokemonByType(args.typeId, args.limit, args.offset) : getAllPokemon(args.limit, args.offset);

      lastFetchTime = new Date();
      lastFetchTask = req
        .then((data) => {
          resultData = data;
          return resultData;
        })
        .catch((err) => {
          lastFetchTask = null;
          throw err;
        });

      return lastFetchTask;
    }

    return resultData;
  },
};

export default pokemon;
