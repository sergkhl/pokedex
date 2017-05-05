import React from 'react';
import Type from './Type';
import Layout from '../../components/Layout';

export default {

  path: '/type/:id',

  async action({fetch, params}) {
    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `{ pokemon(typeId: ${params.id}){name,avatar,types{id,name}} }`,
      }),
    });
    const {data, errors} = await resp.json();
    if (errors) {
      throw new Error(JSON.stringify(errors));
    }
    return {
      title: 'Pokemons',
      component: <Layout><Type pokemon={data.pokemon} id={params.id}/></Layout>,
    };
  },

};
