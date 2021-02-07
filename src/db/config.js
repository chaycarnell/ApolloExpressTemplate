const { MongoClient } = require('mongodb');

const { MONGODB_URI } = process.env;
let database;

const connectMongo = (callback) =>
  MongoClient.connect(
    MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      database = client.db();
      return callback(err);
    },
  );

const db = () => database;

const collections = {
  EXAMPLE: 'EXAMPLE',
};

module.exports = { connectMongo, db, collections };
