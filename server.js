import * as env from './env'; // eslint-disable-line
import express from 'express';
import path from 'path';

import httpContext from 'express-http-context';
import { httpStatus, corsHandler, forceHttps } from './server/middleware/index';

import routes from './server/routes';
import { initDB, dropDB } from './server/db';
import { importData } from './server/importData';
import { API } from './server/settings';

export const app = express(),
  bodyParser = require('body-parser'),
  port = API.port;

const jsonParser = bodyParser.json();

app.use(bodyParser.json({ limit: '50mb' })); // For fixing unit tests (Load all questions)
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // For fixing unit tests

app.use(jsonParser);
app.use(forceHttps);
app.use(httpContext.middleware);
app.use(corsHandler);
app.use(httpStatus); // This middleware have to run before routes

app.use('/api', routes);

app.use(
  '/favicon.ico',
  express.static(path.join(__dirname, 'client/build/favicon.ico'))
);

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  initDB()
    .then(() => {
      dropDB();
    })
    .then(() => {
      console.log('Dropped DB');
      console.log('Added schema validation');
      importData();
    })
    .then(() => {
      console.log('Import data successfully');
      app.listen(port, () => {
        app.emit('appStarted');
        console.log('listening at port: ', port);
      });
    })
    .catch(err => {
      console.log('ImportData err: ', JSON.stringify(err));
    })
    .catch(err => {
      console.log('Dropping DB fail because of ' + JSON.stringify(err));
    });
} else {
  initDB()
    .then(() => {
      importData();
    })
    .then(() => {
      console.log('Import data successfully');
      app.listen(port, () => {
        app.emit('appStarted');
        console.log('listening at port: ', port);
      });
    })
    .catch(err => {
      console.log('ImportData err: ', JSON.stringify(err));
    });
}
