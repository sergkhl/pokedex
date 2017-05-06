/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PokemonList from '../../components/PokemonList';
import Layout from '../../components/Layout';

export default {

  path: '/',

  async action({fetch, params, query}) {
    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: `{ pokemon(limit: ${query.limit || 10}, offset: ${query.offset || 0}){ limit,offset,count,next,previous,results{name,avatar,types{id,name,url}} } }`,
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
