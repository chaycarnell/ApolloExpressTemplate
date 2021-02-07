require('module-alias/register');
require('dotenv').config();
// Libs
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);

const port = process.env.PORT || 3001;
const logger = require('@utils/logger');
// Express config
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === 'production' ? undefined : false,
  }),
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const publicRoutes = require('@api/routes/public');
const privateRoutes = require('@api/routes/private');

const { connectMongo } = require('@db/config');
const { validateRequest } = require('@utils/auth');
const { initApollo } = require('./apolloServer');

// Apply routes
app.use('/api/public', publicRoutes);
app.use('/api/private', validateRequest, privateRoutes);

// Initialise Apollo
initApollo(server, app);

// Connect to mongo
connectMongo((mongoError) => {
  if (mongoError) throw mongoError;
  logger.info('Server connected to MongoDB');
  server.listen(port, (serverError) => {
    if (serverError) throw serverError;
    logger.info(`Server is listening on ${port}`);
  });
});
