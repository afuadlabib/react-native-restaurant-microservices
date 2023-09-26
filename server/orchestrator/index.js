import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { itemResolvers, itemTypeDefs } from './schema/item.schema.js';
import { userResolvers, userTypeDefs } from './schema/user.schema.js';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';

const server = new ApolloServer({
  typeDefs: [itemTypeDefs, userTypeDefs],
  resolvers: [itemResolvers, userResolvers],
  cache: new InMemoryLRUCache({
    maxSize: Math.pow(2, 20) * 100,
    ttl: 120000,
  }),
  introspection: true
});

const { url } = await startStandaloneServer(server, {
  listen: {port: process.env.PORT || 4000},
});

console.log(`🚀  Server ready at: ${url}`);
