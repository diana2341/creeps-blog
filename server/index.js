const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start(); // Make sure to await server start

  server.applyMiddleware({ app });


  const PORT = process.env.APOLLO_SERVER_PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Apollo Server is running at http://localhost:${PORT}/graphql`);
  });
};

startServer().catch((error) => {
  console.error('Error starting Apollo Server:', error);
});
