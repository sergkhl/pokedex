import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PokemonList.css';
import Link from '../Link';

class PokemomList extends React.Component {
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
      <div className={s.container}>
        <h1>Pokemon</h1>
        {this.props.pokemon && this.props.pokemon.map(item => (
          <article key={item.name} className={s.newsItem}>
            <h1 className={s.newsTitle}>
              <img alt={item.name} src={item.avatar} />
              <a href={item.url}>{item.name}</a>
            </h1>

            {item.types.map(type => (
              <div key={type.name} className={s.newsDesc}>
                <Link className={s.link} to={'/type/' + type.id}>{type.name}</Link>
              </div>
            ))}
          </article>
        ))}
      </div>
    );
  }
}

export default withStyles(s)(PokemomList);
