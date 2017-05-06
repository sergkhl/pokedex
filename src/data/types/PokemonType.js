import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as Int,
  GraphQLNonNull as NonNull,
  GraphQLList as List
} from 'graphql';


const PokemonType = new ObjectType({
  name: 'PokemonType',
  fields: {
    name: { type: new NonNull(StringType) },
    url: { type: new NonNull(StringType) },
    id: {
      type: new NonNull(StringType),
      resolve: (type) => {
        let match = type.url.match(/type\/(\d+)\//);
        return match[1];
      }
    }
  }
});

const Pokemon = new ObjectType({
  name: 'Pokemon',
  fields: {
    // url: { type: new NonNull(StringType) },
    name: { type: new NonNull(StringType) },
    types: {
      type: new List(PokemonType),
      resolve: p => p.types.map(type => type.type)
    },
    avatar: {
      type: new NonNull(StringType),
      resolve: p => p.sprites.front_default
    },
    // pubDate: { type: new NonNull(StringType) },
    // content: { type: StringType },
  },
});

const PokemonResourceList = new ObjectType({
  name: 'PokemonResourceList',
  fields: {
    limit: { type: new NonNull(Int) },
    offset: { type: new NonNull(Int) },
    count: { type: new NonNull(Int) },
    typeId: { type: Int },
    typeName: { type: StringType },
    next: { type: StringType },
    previous: { type: StringType },
    results: { type: new List(Pokemon)}
  }
});

export default PokemonResourceList;
