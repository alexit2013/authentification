const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router.js');
const middlewares = require('./middlewares');

require('dotenv').config();

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);

    // Use cors
    app.use(cors());

    // Combines logging info from request and response
    app.use(morgan('combined'));

    // Use bobyParser middleware
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());

    app.use(middlewares.checkTokenSetUser);

    // Mount the router at /api so all its routes start with /api
    app.use('/api', router);

    app.use(middlewares.notFound);
    app.use(middlewares.errorHandler);

    httpServer
      .listen(process.env.APP_PORT)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${process.env.APP_PORT}`);

        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

// *** previous code above this line ***

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close(err => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;
module.exports.initialize = initialize;