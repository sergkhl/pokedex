/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import PokemonList from '../../components/PokemonList';

class Home extends React.Component {
  static propTypes = {
    pokemon: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      types: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
      })).isRequired
    })).isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <PokemonList pokemon={this.props.pokemon} />
      </div>
    );
  }
}

export default withStyles(s)(Home);
