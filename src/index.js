const express = require("express");
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServer } = require("apollo-server-express");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const db = require("./config/connection");

(async function () {
  const app = express();

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  server.applyMiddleware({ app });

  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );

  const PORT = process.env.PORT || 4000;

  db.once("open", () => {
    httpServer.listen(PORT, () =>
      console.log(`Server is now running on http://localhost:${PORT}/graphql`)
    );
  });
})();
