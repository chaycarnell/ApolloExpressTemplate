const { MongoClient } = require('mongodb');
let _db;

module.exports = {
  connectMongo: callback => {
    MongoClient.connect(
      process.env.MONGODB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        _db = client.db();
        return callback(err);
      }
    );
  },
  db: () => _db,
  collections: {
    EXAMPLE: 'EXAMPLE'
  }
};
