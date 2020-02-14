const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');

const Users = require('../models/user');
const Secrets = require('../models/secret');

const SecretsType = new GraphQLObjectType({
  name: 'Secrets',
  fields: {
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    secretType: { type: GraphQLString },
    secret: { type: GraphQLString }
  },
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    token: { type: new GraphQLNonNull(GraphQLString) },
    secretId: { type: new GraphQLNonNull(GraphQLString) },
    secrets: {
      type: GraphQLList(SecretsType),
      resolve(parent, args) {
        const { id: userId } = parent;
        return Secrets.find({ userId });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSecret: {
      type: SecretsType,
      args: {
        secretType: { type: GraphQLString },
        secret: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve (parent, { secretType, secret, userId }) {
        const newSecret = new Secrets({
          userId,
          secretType,
          secret,
        });
        newSecret.save();
      },
    },
    removeSecret: {
      type: SecretsType,
      args: {
        secretId: { type: GraphQLID }
      },
      resolve (parent, { secretId }) {
        return Secrets.findByIdAndRemove(secretId);
      }
    }
  },
});

const Query = new GraphQLObjectType ({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: { token: { type: GraphQLString } },
      resolve(parent, args) {
        const { token } = args;
        return Users.findOne({ token });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
