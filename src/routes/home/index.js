/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

export default {

  path: '/',

  async action({fetch}) {
    const resp = await fetch('/graphql', {
      body: JSON.stringify({
        query: '{ pokemon{name,avatar,types{id,name,url}} }',
      }),
    });
    const {data, errors} = await resp.json();
    if (errors) {
      throw new Error(JSON.stringify(errors));
    }

    return {
      title: 'Pokedex',
      component: <Layout><Home news={data.news} pokemon={data.pokemon}/></Layout>,
    };
  },

};
