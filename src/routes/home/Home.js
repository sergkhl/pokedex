import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import PokemonList from '../../components/PokemonList';

class Home extends React.Component {
  static propTypes = {
    pokemon: PropTypes.shape({
      count: PropTypes.number.isRequired,
      limit: PropTypes.number.isRequired,
      offset: PropTypes.number.isRequired,
      previous: PropTypes.string,
      next: PropTypes.string,
      results: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        types: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired
        })).isRequired
      })).isRequired
    })
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
