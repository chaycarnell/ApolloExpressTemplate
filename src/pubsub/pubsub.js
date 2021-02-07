const { RedisPubSub } = require('graphql-redis-subscriptions');
const redis = require('redis');
const subscriptions = require('./pubsub.subscriptions');

// Get URL segments from REDIS URL
const urlSegments = new URL(process.env.REDIS);
const options = {
  url: process.env.REDIS,
  host: urlSegments.hostname,
  user: urlSegments.username,
  password: urlSegments.password,
  port: urlSegments.port,
};

// Init Redis pubsub from options
const pubsub = new RedisPubSub({
  publisher: redis.createClient(options),
  subscriber: redis.createClient(options),
});

// Emit an example update to redis pubsub
const publishExampleUpdate = (update) =>
  pubsub.publish(subscriptions.EXAMPLE_UPDATE, { exampleUpdate: update });

module.exports = {
  pubsub,
  subscriptions,
  publishExampleUpdate,
};
