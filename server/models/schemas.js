const graphql = require ('graphql');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var User = buildSchema(`
  type Query {
    hello: String
  }
`);

var User = new graphql.GraphQLObjectType({
  name: 'user',
  fields: function () {
    return {
      id: {
        type: graphql.GraphQLInt
      },
      name: {
        type: graphql.GraphQLString
      },
      age: {
        type: graphql.GraphQLInt
      },
      species: {
        type: graphql.GraphQLString
     },
     interests: {
       type: graphql.GraphQLList//array?
     }
    }
  }
});
var Post = new GraphQLObjectType({
  name: 'Post',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLString
    },
    content: {
      type: GraphQLString
    }
  }
});

module.exports = {
  User: User,
  Post: Post
}
