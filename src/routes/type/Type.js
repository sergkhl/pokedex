import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Type.css';
import PokemonList from '../../components/PokemonList';

class Home extends React.Component {
  static propTypes = {
    // news: PropTypes.arrayOf(PropTypes.shape({
    //   title: PropTypes.string.isRequired,
    //   link: PropTypes.string.isRequired,
    //   content: PropTypes.string,
    // })).isRequired,
  };

  componentDidMount() {
    //
  }

  render() {
    return (
      <div className={s.root}>
        <PokemonList pokemon={this.props.pokemon} />
      </div>
    );
  }
}

export default withStyles(s)(Home);
