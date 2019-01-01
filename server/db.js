import MongoClient from 'mongodb';
import co from 'co';
import { DATABASE } from './settings';
import MongodbMemoryServer from 'mongodb-memory-server';

let state = {
  db: null
};

let client = null;

export const initDB = () => {
  return co(function*() {
    // Connection URL
    let url = DATABASE.urlConnection;
    if (process.env.NODE_ENV === 'test') {
      try {
        // Connection URL for unit test
        const mongod = new MongodbMemoryServer({
          binary: {
            version: '3.6.0',
            downloadDir: './mongodb-binaries'
          }
        });
        url = yield mongod.getConnectionString();
        client = yield MongoClient.connect(
          url,
          { useNewUrlParser: true }
        );
        const dbName = yield mongod.getDbName();
        state.db = client.db(dbName);
      } catch (e) {
        console.log('init MongodbMemoryServer err: ', e);
      }
    } else {
      // Use connect method to connect to the Server
      client = yield MongoClient.connect(
        url,
        { useNewUrlParser: true }
      );
      const index = url.lastIndexOf('/');
      const dbName = url.substring(index + 1);
      state.db = client.db(dbName);
    }
  });
};

export const getDB = () => {
  return state.db;
};

export const dropDB = () => {
  return state.db.dropDatabase();
};

export const closeDB = () => {
  if (state.db) {
    client.close(function() {
      state.db = null;
    });
  }
};

export const getCollectionNames = () => {
  return state.db.getCollectionNames;
};

export const addSchemaValidation = () => {
  return co(function*() {});
};
