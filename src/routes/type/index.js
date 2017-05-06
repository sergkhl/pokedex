import React from 'react';
import Layout from '../../components/Layout';
import PokemonList from '../../components/PokemonList';

export default {

  path: '/type/:id',

  async action({fetch, params, query}) {
    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `{ pokemon(typeId: ${params.id}, limit: ${query.limit || 10}, offset: ${query.offset || 0}){limit,offset,count,typeId,typeName,next,previous,results{name,avatar,types{id,name,url}}} }`,
      }),
    });
    const {data, errors} = await resp.json();
    if (errors) {
      throw new Error(JSON.stringify(errors));
    }
    return {
      title: 'Pokedex',
      component: <Layout><PokemonList pokemon={data.pokemon}/></Layout>,
    };
  },

};
