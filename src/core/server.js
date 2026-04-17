const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const pinoHTTP = require('pino-http');
const mongoose = require('mongoose');

const config = require('./config');
const logger = require('./logger')('app');
const routes = require('../api/routes');
const { errorResponder, errorTypes } = require('./errors');

//  CONNECT MONGODB 
const uri = `${process.env.DB_CONNECTION}/${process.env.DB_NAME}`;

mongoose.connect(uri)
  .then(() => logger.info("MongoDB Connected"))
  .catch((err) => logger.error(err, "MongoDB connection error"));

const app = express();


app.enable('trust proxy');

// Enable CORS
app.use(cors());

// HTTP verbs override
app.use(require('method-override')());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(pinoHTTP({ logger }));

// Routes
app.use(`${config.api.prefix}`, routes());

// 404 handler
app.use((request, response, next) =>
  next(errorResponder(errorTypes.ROUTE_NOT_FOUND, 'Route not found'))
);

// Error logger
app.use((error, request, response, next) => {
  const ctx = {
    code: error.code,
    status: error.status,
    description: error.description,
  };

  if (error.stack) {
    ctx.stack = error.stack;
  }

  logger.error(ctx, error.toString());

  return next(error);
});

// Error response
app.use((error, request, response, next) =>
  response.status(error.status || 500).json({
    statusCode: error.status || 500,
    error: error.code || 'UNKNOWN_ERROR',
    description: error.description || 'Unknown error',
    message: error.message || 'An error has occurred',
  })
);

module.exports = app;