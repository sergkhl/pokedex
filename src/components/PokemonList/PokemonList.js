import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PokemonList.css';
import Link from '../Link';

class PokemomList extends React.Component {
  static propTypes = {
    pokemon: PropTypes.shape({
      limit: PropTypes.number.isRequired,
      offset: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
      typeId: PropTypes.number,
      typeName: PropTypes.string,
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

  capitalizeFirstLetter(string) {
    if (!string || typeof string !== 'string') {
      return;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  filterList(event) {
    let items = this.props.pokemon.results;
    items = items.filter((item) => {
      let inputValue = event.target.value.toLowerCase();
      return item && item.name && item.name.toLowerCase().indexOf(inputValue) !== -1;
    });
    this.setState({pokemon: items});
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.setState({pokemon: this.props.pokemon.results});
  }

  // componentWillReceiveProps() {
  //   console.log('componentWillReceiveProps');
  //   this.setState({pokemon: this.props.pokemon.results});
  // }

  render() {
    const baseLink = this.props.pokemon.typeId ? `/type/${this.props.pokemon.typeId}` : '/';
    const limit = this.props.pokemon.limit;
    const nextOffset = this.props.pokemon.offset + limit;
    const prevOffset = this.props.pokemon.offset - limit;
    return (
      <div className={s.pokemonList}>
        <h1>{this.capitalizeFirstLetter(this.props.pokemon.typeName)} Pokemon</h1>
        <input className={s.pokemonList, s.search} type="text" placeholder="Search" onChange={this.filterList.bind(this)}/>
        <ul className={s.pokemonList, s.list}>
        {this.props.pokemon && this.props.pokemon.results.map(item => (
          <li key={item.name} className={s.pokemonList, s.listItem}>
            <h1 className={s.newsTitle}>
              <img alt={item.name} src={item.avatar}/>
              <a href={item.url}>{this.capitalizeFirstLetter(item.name)}</a>
            </h1>

            {item.types.map(type => (
              <span key={type.name} className={s.pokemonList, s.pokemonType}>
                <Link className={s.link} to={'/type/' + type.id}>{this.capitalizeFirstLetter(type.name)}</Link>
              </span>
            ))}
          </li>
        ))}
        </ul>
        <div className={s.pagination}>
          <Link className={s.link} to={baseLink + '?limit=' + limit + '&offset=' + prevOffset}>Previous</Link>
          <Link className={s.floatRight} to={baseLink + '?limit=' + limit + '&offset=' + nextOffset}>Next</Link>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(PokemomList);
