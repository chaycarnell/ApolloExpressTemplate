const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const { validateToken } = require('@utils/auth');
// Glue used for matching resolvers with type defs
const glue = require('schemaglue');
// Glue schemas/resolvers together
const { schema, resolver } = glue('src/resolvers');
// Error handler
const errorHandler = require('@utils/errorHandler');
// Initialise logging tooling
const logger = require('@utils/logger');
const LoggingPlugin = require('@utils/loggingPlugin');

// Initialise Apollo server
const initApollo = (server, app) => {
  const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers: resolver,
    playground: true,
    formatError: e => errorHandler(e),
    logger,
    plugins: [LoggingPlugin],
    subscriptions: {
      keepAlive: 1000,
      onConnect: async (connectionParams, webSocket, context) => {
        const user = await validateToken(connectionParams.authToken);
        if (!user) throw new AuthenticationError('you must be logged in');
      },
      onDisconnect: (webSocket, context) => {
        // ...
      }
    },
    context: async ({ req, connection }) => {
      if (connection) return connection.context;
      // get the user token from the headers
      const token = req.headers.authorization || null;
      // Decode JWT token to user user
      const user = await validateToken(token);
      // If no user throw auth error
      if (!user) throw new AuthenticationError('AUTHENTICATE');
      // Return validated user
      return user;
    }
  });
  // Middleware: GraphQL
  apolloServer.applyMiddleware({
    app
  });
  // Apply subscription handlers
  apolloServer.installSubscriptionHandlers(server);
};

module.exports = {
  initApollo
};
